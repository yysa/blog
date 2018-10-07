<template>
  <div>
    <el-row>
      <h2 class="title">文章表</h2>
      <el-button type="primary"  class="add fr" @click="addArticleShwo = true">添加文章</el-button>
    </el-row>
    <el-table
    :data="articleList"
    style="width: 100%">
    <el-table-column
      label="文章id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章分类id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.cid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章作者id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.aid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章标题"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章副标题"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.subtitle }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ timeChange(scope.row.create_time,4) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="修改时间"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ timeChange(scope.row.change_time,4) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作"
     min-width
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button> <!--@click="handleEdit(scope.$index, scope.row)-->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-row class="box">
       
          <el-button v-show="pre" type="primary" icon="el-icon-arrow-left" @click="pn--">上一页</el-button>
          <el-button v-show="next" type="primary" @click="pn++">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        
   </el-row>
    <AddArticle v-if="addArticleShwo" @close="close"></AddArticle>
    <EditArticle v-if="editArticleShwo" @close="close" :article="article"></EditArticle>
  </div>
</template>

<script>
import {getArticleList,delArticleItem,addEditArticle,checkLogin} from '../config/data.js'
import AddArticle from '../components/AddArticle';
import EditArticle from '../components/EditArticle';
import timeChange from '../config/date.js'
export default {
    data(){
      return {
        articleList: [],
        pn:1,
        next:true,
        pre:true,
        loading: true,
        addArticleShwo:false,
        editArticleShwo:false,
        article:{
          cid:'',
          aid:'',
          title:'',
          subtitle:'',
          content:'',
          carete_time:'',
          change_time:''
        },
        timeChange
      }
    },
    async created(){
        this.setArticleList('',1);
    },
    methods: {
      //查找文章列表
      async setArticleList(cid,pn){
        const loading = this.openFullScreen();
        let articleList = await getArticleList(cid,pn);
        setTimeout(()=>{
          if(articleList){
            loading.close();
          }
        },600);
        this.articleList = articleList.list;
        this.next = articleList.pageInfo?articleList.pageInfo.hasNextPage:false;
        this.pre = articleList.pageInfo?articleList.pageInfo.hasPrePage:false;
      },
      //开启全局加载动画
      openFullScreen() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        return loading;
      },
      close(flag){
        this.addArticleShwo = false;
        this.editArticleShwo = false;
        if(flag){
            this.setArticleList('',this.pn);
        }
      },
      handleEdit(index, row) {
        this.article = row;
        this.editArticleShwo = true;

      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await delArticleItem(row.id);
          if(result.errCode == 10017){
              this.setArticleList('',this.pn);
              this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    watch:{
      pn(nowpn){
        this.setArticleList('',nowpn);
      }
    },
    components:{
      AddArticle,
      EditArticle
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .box{
      text-align: center;
    }
    .title{
      font-size: 25px;
      float: left;
      margin:5px 0 20px 10px;
    }
    .add{
      margin: 5px 20px 20px 0;
    }
</style>

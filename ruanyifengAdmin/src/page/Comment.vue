<template>
  <div>
    <el-row>
      <h2 class="title">评论表</h2>
      <el-button type="primary"  class="add fr" @click="show=true;type=0">添加评论</el-button>
    </el-row>
    <el-table
    :data="commentList"
    style="width: 100%">
    <el-table-column
      label="评论id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.aid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="评论者"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.uname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="评论内容"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="评论者个人网站"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.u_web }}</span>
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
    <AddComment v-if="show" @close="close" :data="type?comment:null"></AddComment>
    </div>
</template>

<script>
import {getCommentList,delCommentItem,addEditComment} from '../config/data.js'
import AddComment from '../components/AddComment';
import timeChange from '../config/date.js'
export default {
    data(){
      return {
        commentList: [],
        pn:1,
        next:true,
        pre:true,
        loading: true,
        show:false,
        type:0,//0代表添加1代表编辑
        comment:{
          id:'',
          aid:'',
          uname:'',
          content:'',
          u_web:'',
          create_time:''
        }
      }
    },
    created(){
      this.setCommentList('',1);
    },
    methods: {
      //查找文章列表
      async setCommentList(cid,pn){
        const loading = this.openFullScreen();
        let commentList = await getCommentList(cid,pn);
        setTimeout(()=>{
          if(commentList.list){
            loading.close();
          }
        },600);
        this.commentList = commentList.list;
        this.next = commentList.pageInfo?commentList.pageInfo.hasNextPage:false;
        this.pre = commentList.pageInfo?commentList.pageInfo.hasPrePage:false;
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
      //关闭编辑框的回调
      close(flag){
        this.show = false;
        if(flag){
            this.setCommentList('',this.pn);
        }
      },
      //
      handleEdit(index, row) {
        this.type = 1;
        this.comment = row;
        this.show = true;
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await delCommentItem(row.id);
          if(result.errCode == 10017){
              this.setCommentList('',this.pn);
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
      },
      timeChange(time,type){
          return timeChange(time,type);
      }
    },
    watch:{
      pn(nowpn){
        this.setCommentList('',nowpn);
      }
    },
    components:{
      AddComment
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

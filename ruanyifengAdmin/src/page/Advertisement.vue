<template>
  <div>
    <el-row>
      <h2 class="title">广告表</h2>
      <el-button type="primary"  class="add fr" @click="show=true;type=0">添加广告</el-button>
    </el-row>
    <el-table
    :data="advertisementList"
    style="width: 100%">
    <el-table-column
      label="广告id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="广告分类id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.cid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="广告简介"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.aname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="图片地址"
      min-width
      align="center">
      <template slot-scope="scope">
        <img :src="URL.staticUrl+scope.row.url" alt="" style="max-width:100px;">
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
      label="开始时间"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ timeChange(scope.row.start_time,4) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="结束时间"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ timeChange(scope.row.end_time,4) }}</span>
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
    <AddAdvertisement v-if="show" @close="close" :data="type?advertisement:null"></AddAdvertisement>
    </div>
</template>

<script>
import {getAdvertisementList,delAdvertisementItem,addEditAdvertisement,delImg} from '../config/data.js'
import AddAdvertisement from '../components/AddAdvertisement';
import timeChange from '../config/date.js'
import URL from '../config/url.js'
export default {
    data(){
      return {
        advertisementList: [],
        pn:1,
        next:true,
        pre:true,
        loading: true,
        show:false,
        type:0,//0代表添加1代表编辑
        advertisement:{
          id:'',
          cid:'',
          aname:'',
          url:'',
          create_time:'',
          start_time:'',
          end_time:''
        },
        URL:URL
      }
    },
    created(){
      this.setAdvertisementList('',1);
    },
    methods: {
      //查找文章列表
      async setAdvertisementList(cid,pn){
        const loading = this.openFullScreen();
        let advertisementList = await getAdvertisementList(cid,pn);
        setTimeout(()=>{
          if(advertisementList.list){
            loading.close();
          }
        },600);
        this.advertisementList = advertisementList.list;
        this.next = advertisementList.pageInfo?advertisementList.pageInfo.hasNextPage:false;
        this.pre = advertisementList.pageInfo?advertisementList.pageInfo.hasPrePage:false;
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
            this.setAdvertisementList('',this.pn);
        }
      },
      //
      handleEdit(index, row) {
        this.type = 1;
        this.advertisement = row;
        this.show = true;
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //发请求
          let result = await delAdvertisementItem(row.id);
          if(result.errCode == 10017){
              this.setAdvertisementList('',this.pn);
              //删除数据库中的数据后删除对应的广告图片
              delImg(row.url.split('/').pop(),'ad');
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
        this.setAdvertisementList('',nowpn);
      }
    },
    components:{
      AddAdvertisement
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

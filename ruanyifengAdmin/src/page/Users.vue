<template>
  <div>
    <el-row>
      <h2 class="title">用户表</h2>
      <el-button type="primary"  class="add fr" @click="show=true;type=0">添加用户</el-button>
    </el-row>
    <el-table
    :data="usersList"
    style="width: 100%">
    <el-table-column
      label="用户id"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.user_name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="密码"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.password }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="昵称"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.nick }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="头像地址"
      min-width
      align="center">
      <template slot-scope="scope">
        <img :src="URL.staticUrl+scope.row.head_pic" alt="" style="max-width:100px;">
      </template>
    </el-table-column>
    <el-table-column
      label="注册时间"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ timeChange(scope.row.create_time,4) }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最后登录时间"
      min-width
      align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ timeChange(scope.row.last_time,4) }}</span>
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
    <AddUsers v-if="show" @close="close" :data="type?users:null"></AddUsers>
    </div>
</template>

<script>
import {getUsersList,delUsersItem,addEditUsers,delImg} from '../config/data.js'
import AddUsers from '../components/AddUsers';
import timeChange from '../config/date.js'
import URL from '../config/url.js'
export default {
    data(){
      return {
        usersList: [],
        pn:1,
        next:true,
        pre:true,
        loading: true,
        show:false,
        type:0,//0代表添加1代表编辑
        users:{
          id:'',
          user_name:'',
          password:'',
          head_pic:'',
          is_admin:'',
          create_time:'',
          last_time:''
        },
        URL:URL
      }
    },
    created(){
      this.setUsersList('',1);
    },
    methods: {
      //查找文章列表
      async setUsersList(cid,pn){
        const loading = this.openFullScreen();
        let usersList = await getUsersList(cid,pn);
        setTimeout(()=>{
          if(usersList.list){
            loading.close();
          }
        },600);
        this.usersList = usersList.list;
        this.next = usersList.pageInfo?usersList.pageInfo.hasNextPage:false;
        this.pre = usersList.pageInfo?usersList.pageInfo.hasPrePage:false;
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
            this.setUsersList('',this.pn);
        }
      },
      //
      handleEdit(index, row) {
        this.type = 1;
        this.users = row;
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
          let result = await delUsersItem(row.id);
          if(result.errCode == 10017){
              this.setUsersList('',this.pn);
              //删除数据库中的数据后删除对应的用户图片
              delImg(row.head_pic.split('/').pop(),'user');
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
        this.setUsersList('',nowpn);
      }
    },
    components:{
      AddUsers
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

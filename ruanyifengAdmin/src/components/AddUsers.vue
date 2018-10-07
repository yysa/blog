<template>
<div>
  <el-dialog title="修改/添加用户" :visible.sync="isShow1" :modal="show" :show-close="false" width="50%" :close-on-click-modal="false" >
  <el-form>
    <el-form-item label="用户名">
        <el-input v-model="users.user_name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
        <el-input v-model="users.password"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
        <el-input v-model="users.nick"></el-input>
    </el-form-item>
    <el-form-item label="用户头像">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="addFile"
        :on-remove="removeFile"
        :limit="1"
        :auto-upload="false"
        list-type="picture-card"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="注册时间">
        <el-date-picker
            v-model="users.create_time"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="最后登录时间">
        <el-date-picker
            v-model="users.last_time"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <div id="editor"></div>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>

<script>
import URL from '../config/url.js'
import {addEditUsers,delImg} from '../config/data.js';
export default {
    props:['show','data'],
    data(){
      return {
        users:{
          id:'',
          user_name:'',
          password:'',
          head_pic:'',
          is_admin:'',
          create_time:'',
          last_time:''
        },
        isShow1:true
      }
    },
    created(){
        this.users = this.data?JSON.parse(JSON.stringify(this.data)):this.users;
        
    },
    mounted(){
        
    },
    methods:{
      addFile(file){
        this.users.head_pic = file.raw;
      },
      removeFile(file){
        this.users.head_pic = '';
      },
      //取消
      cancel(){
        //关闭编辑框
        this.$emit('close',false);
      },
      //提交文章
      async submit(){
        //发送请求
        let data = await addEditUsers(this.users,this.data?'users/update':'users/add');
        console.log(data);
        if(data.errCode == 10017 || data.errCode == 10016){
          //编辑成功后且上传过图片后删除对应的图片
           if(typeof this.users.head_pic == 'object' && this.data && this.data.head_pic){
              delImg(this.data.head_pic.split('/').pop(),'user');
           }
          //成功关闭编辑框
           this.$emit('close',true);
           this.$message({
              message: data.errMsg,
              type: 'success'
          });
        }else{
            this.$message.error(data.errMsg);
        }
        
      }
     }
}
</script>

<style lang="scss" scoped>

</style>

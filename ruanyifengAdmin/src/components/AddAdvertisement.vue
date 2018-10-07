<template>
<div>
  <el-dialog title="修改/添加广告" :visible.sync="isShow1" :modal="isShow" :show-close="false" width="50%" :close-on-click-modal="false" >
  <el-form>
    <el-form-item label="广告简介">
        <el-input v-model="advertisement.aname"></el-input>
    </el-form-item>
    <el-form-item label="广告类型">
      <el-select v-model="advertisement.cid" placeholder="广告类型">
        <el-option v-for="(item,index) in categoryList" :key="index" :label="item.cname" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="广告图">
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
    <el-form-item label="创建时间">
        <el-date-picker
            v-model="advertisement.create_time"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="开始时间">
        <el-date-picker
            v-model="advertisement.start_time"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间">
        <el-date-picker
            v-model="advertisement.end_time"
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
import {addEditAdvertisement,getAllAdvertisementCategoryList,delImg} from '../config/data.js';
export default {
    props:['isShow','data'],
    data(){
      return {
        advertisement:{
           id:'',
            cid:'',
            aname:'',
            url:'',
            create_time:'',
            start_time:'',
            end_time:''
        },
        categoryList:[],
        isShow1:true
      }
    },
    created(){
        this.advertisement = this.data?JSON.parse(JSON.stringify(this.data)):this.advertisement;
        
    },
    mounted(){
        this.setAdvertisementCategoryList('');
    },
    methods:{
      async setAdvertisementCategoryList(id){
        let categoryList = await getAllAdvertisementCategoryList(id);
        this.categoryList = categoryList;
      },
      addFile(file){
        this.advertisement.url = file.raw;
      },
      removeFile(file){
        this.advertisement.url = '';
      },
      //取消
      cancel(){
        //关闭编辑框
        this.$emit('close',false);
      },
      //提交文章
      async submit(){
        //发送请求
        let data = await addEditAdvertisement(this.advertisement,this.data?'advertisement/update':'advertisement/add');
        if(data.errCode == 10016 || data.errCode == 10017){
          //编辑成功后且上传过图片后删除对应的图片
           if(typeof this.advertisement.url == 'object' && this.data && this.data.url){
              delImg(this.data.url.split('/').pop(),'ad');
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

<template>
<div>
  <el-dialog title="修改/添加文章类型" :visible.sync="isShow1" :modal="isShow" :show-close="false" width="50%" :close-on-click-modal="false" >
  <el-form>
    <el-form-item label="文章类型名称">
        <el-input v-model="articleCategory.cname"></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
        <el-date-picker
            v-model="articleCategory.create_time"
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
import {addEditArticleCategory,} from '../config/data.js';
export default {
    props:['isShow','data'],
    data(){
      return {
        articleCategory:{
          id:'',
          cname:'',
          create_time: ''
        },
        isShow1:true
      }
    },
    created(){
        this.articleCategory = this.data?JSON.parse(JSON.stringify(this.data)):this.articleCategory;
    },
    mounted(){
      
    },
    methods:{
      //取消
      cancel(){
        //关闭编辑框
        this.$emit('close',false);
      },
      //提交文章
      async submit(){
        //清空记录的上传图片
        //获取富文本的json形式的内容
        
        //获取富文本的html形式的内容
        
        //从json形式的数据中获取副标题
       
        //发送请求
        let data = await addEditArticleCategory(this.articleCategory,this.data?'articleCategory/update':'articleCategory/add');
        if(data.errCode == 10016 || data.errCode == 10017){
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

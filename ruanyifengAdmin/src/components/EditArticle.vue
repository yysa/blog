<template>
<div>
  <el-dialog title="编辑文章" :visible.sync="isShow1" :modal="isShow" :show-close="false" width="70%" :close-on-click-modal="false" :close="delImgs">
  <el-form>
    <el-form-item label="文章类型">
      <el-select v-model="eArticle.cid" placeholder="文章类型">
        <el-option v-for="(item,index) in categoryList" :key="index" :label="item.cname" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章标题">
        <el-input v-model="eArticle.title"></el-input>
    </el-form-item>
    <el-form-item label="作者id">
        <el-input v-model="eArticle.aid"></el-input>
    </el-form-item>
  </el-form>
  <div slot>
    <div id="editor"></div>
  </div>
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
import getText from '../config/getText'
import E from 'wangeditor';
var editor = null;
import {getAllArticleCategoryList,addEditArticle,delImg} from '../config/data.js';
export default {
    props:['isShow','article'],
    data(){
      return {
        eArticle:{
          id:'',
          cid:1,
          aid:1,
          title:'',
          subtitle:'',
          content:'',
          create_time: '',
          change_time: ''
        },
        isShow1:true,
        categoryList:[],
        editorContent:'',
        imgList:[],
      }
    },
    created(){
        this.eArticle = {
           id:this.article.id,
           cid:this.article.cid,
           aid:this.article.aid,
           title:this.article.title,
           subtitle:this.article.subtitle,
           content:this.article.content,
           create_time: this.article.create_time,
           change_time: this.article.change_time
        };
        this.setArticleCategoryList('');
    },
    mounted(){
      this.createEditor();
    },
    methods:{
      async setArticleCategoryList(id){
        let categoryList = await getAllArticleCategoryList(id);
        this.categoryList = categoryList;
      },
      //取消
      cancel(){
        //取消时删除掉文章中已上传的图片
        this.delImgs(this.imgList);
        //关闭编辑框
        this.$emit('close',false);
      },
      //提交文章
      async submit(){
        //清空记录的上传图片
        this.imgList = [];
        //获取富文本的json形式的内容
        let json = editor.txt.getJSON();
        //获取富文本的html形式的内容
        this.eArticle.content  = editor.txt.html();
        //从json形式的数据中获取副标题
        this.eArticle.subtitle = getText(json[0])?getText(json[0]):this.eArticle.subtitle;
        //发送请求
        this.eArticle.change_time = Date.now();
        let data = await addEditArticle(this.eArticle,'article/update');
        if(data.errCode == 10016){
          //成功关闭编辑框
           this.$emit('close',true);
           this.$message({
              message: data.errMsg,
              type: 'success'
          });
        }else{
            this.$message.error(data.errMsg);
        }
        
      },
      delImgs(images){
            //删除图片
            images.forEach(async function(item){
              //获取图片的文件名
                let imgname = item.split('/').pop();
                //删除图片
                delImg(imgname,'art');
            });
      },
      //初始化富文本编辑器
      createEditor(){
        var _this = this;
        editor = new E('#editor')
        editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];
        editor.customConfig.uploadImgServer = URL.apiUrl+'upload';

        editor.customConfig.uploadImgHooks = {
          success: function (xhr, editor, result) {
              _this.$message({
                  message: result.errMsg,
                  type: result.errno?'error':'success'
              });
              //记录上传的图片
              result.data.forEach(function(itme){
                 _this.imgList.push(itme);
              })
          },
          timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          }
        }
        editor.create();
        editor.txt.html(this.eArticle.content);
      }
     }
}
</script>

<style lang="scss" scoped>

</style>

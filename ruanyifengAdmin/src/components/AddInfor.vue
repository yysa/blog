<template>
<div>
  <el-dialog title="编辑/添加网站信息" :visible.sync="isShow1" :modal="show" :show-close="false" width="70%" :close-on-click-modal="false" :close="delImgs">
  <el-form>
    <el-form-item label="网站信息名称">
        <el-input v-model="infor.iname"></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
       <el-date-picker
            v-model="infor.create_time"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="修改时间">
        <el-date-picker
            v-model="infor.change_time"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间">
        </el-date-picker>
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
import {getAllInforCategoryList,addEditInfor,delImg} from '../config/data.js';
export default {
    props:['show','data'],
    data(){
      return {
        infor:{
          id:'',
          iname:'',
          content:'',
          create_time:'',
          change_time:''
        },
        isShow1:true,
        editorContent:'',
        imgList:[],
      }
    },
    created(){
        //判断this.data是否存在 可以确定是编辑还是添加
        this.infor = this.data?JSON.parse(JSON.stringify(this.data)):this.infor;
    },
    mounted(){
        this.createEditor();
    },
    methods:{
      //取消
      cancel(){
        //取消时删除掉网站信息中已上传的图片
        this.delImgs(this.imgList);
        //关闭编辑框
        this.$emit('close',false);
      },
      //提交网站信息
      async submit(){
        //清空记录的上传图片
        this.imgList = [];
        //获取富文本的html形式的内容
        this.infor.content  = editor.txt.html();
        //从json形式的数据中获取副标题
        //发送请求
        let data = await addEditInfor(this.infor,this.data?'infor/update':'infor/add');
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
        editor.txt.html(this.infor.content);
      }
     }
}
</script>

<style lang="scss" scoped>

</style>

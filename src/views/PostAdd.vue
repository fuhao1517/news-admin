<template>
  <div style="padding:30px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <div>
        <el-form-item label="内容">
          <VueEditor :config="config" style="background:#fff;" ref="vueEditor" />
        </el-form-item>
      </div>

      <el-form-item label="栏目">
        <!-- 栏目的数据来自后台 -->
        <el-checkbox-group v-model="form.categories">
          <el-checkbox
            v-for="(item,index) in allCate"
            :key="index"
            v-show="item.id !==999"
            :label="item.id"
            name="type"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="封面">
        <!-- action：上传图片的链接
        list-type: 声明当前是上传多张图片
        on-success： 图片上传成功的函数
        on-remove: 移除图片函数-->
        <el-upload
          action="http://localhost:3000/upload"
          name="file"
          :headers="{
            Authorization:token
          }"
          list-type="picture-card"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  name: "app",
  data() {
    return {
      /* 提交的表单的数据对象 */
      form: {
        title: "",
        content: "",
        /* 分类 */
        categories: [],
        /* 封面 */
        cover: [],
        type: 1
      },

      /* 栏目的列表 */
      allCate: [],
      /* token */
      token: JSON.parse(localStorage.getItem(`user`) || `{}`).token,
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert("http://localhost:3000" + res.data.url);
          }
        }
      }
    };
  },

  components: {
    VueEditor
  },

  methods: {
    onSubmit() {
      const { categories } = this.form;
      this.form.categories = [];

      /* 将栏目把数字转换成接口需要的对象 */
      categories.forEach(v => {
        this.form.categories.push({
          id: v
        });
      });

      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;

      this.$axios({
        url: "/post",
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") || `{}`).token
        },
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$message.success(message);
        location.reload();
      });
    },

    /* 移除图片时候触发的函数 */
    handleRemove(file, fileList) {
      const id = file.response.data.id;
      const arr = [];

      this.form.cover.forEach(v => {
        /* 从cover中删除掉已经移除的图片 */
        if (v.id !== id) {
          arr.push(v);
        }
      });
      this.form.cover = arr;
    },
    /* 图片上传成功的回调函数 */
    handleSuccess(res, file) {
      this.form.cover.push({
        id: res.data.id
      });
    }
  },

  mounted() {
    /* 请求栏目的数据 */
    this.$axios({
      url: "/category"
    }).then(res => {
      const { data } = res.data;
      this.allCate = data;
    });
  }
};
</script>

<style>
</style>
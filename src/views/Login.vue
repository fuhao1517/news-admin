<template>
  <el-row type="flex" justify="center" calign="middle" class="container">
    <!-- 登录表单的div -->
    <div class="form-wrap">
      <h3>登录</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model="form.pass"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      /* 表单的数据对象 */
      form: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    /* 提交表单 */
    submitForm() {
      console.log(this.form);
    }
  }
};
</script>

<style scoped lang="less" >
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;

  .form-wrap {
    margin: 200px auto;
    padding: 30px;
    border: 1px #ddd solid;
    border-radius: 10px;
    width: 425px;
    height: 188px;
    h3 {
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>
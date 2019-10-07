<template>
  <el-row type="flex" justify="center" calign="middle" class="container">
    <!-- 登录表单的div -->
    <div class="form-wrap">
      <h3>登录</h3>

      <!-- model：表单的数据对象  rules：表单的校验规则  -->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
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
        username: "",
        password: ""
      },
      // rules是表单校验规则
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    /* 提交表单 */
    submitForm() {
      /* validate方法是element的表单才有的 */
      this.$refs.form.validate(valid => {
        /* valid为真时候提交表单 */
        if (valid) {
          /* 请求登录接口 */
          console.log(123);
          
        }
      });
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
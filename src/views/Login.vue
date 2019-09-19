<template>
  <div class="dv">
    <el-container>
      <el-main class="box">
        <el-card class="box-card">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="name">
              <el-input
                type="username"
                v-model="ruleForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" style="width: 200px;">
              <el-input v-model="ruleForm.cap"></el-input>
              <span v-html="captchaImg" @click="click"></span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登陆</el-button
              >
              <el-button @click="register">注册</el-button>
              <el-button @click="pass">找回密码</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Land",
  components: {},
  props: {},
  data() {
    return {
      captchaImg: "",
      ruleForm: {
        name: "",
        pass: "",
        cap: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        cap: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击验证码重新获取验证码
    click() {
      this.$axios
        .req("api/users/graphical")
        .then(res => {
          console.log(res);
          if (res) {
            this.captchaImg = res.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    //跳转到注册页面
    register() {
      this.$router.push("/register");
    },
    //
    submitForm() {
      this.$axios
        .req("api/users/login", {
          username: this.ruleForm.name,
          password: this.ruleForm.pass,
          cap: this.ruleForm.cap
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 1) {
            this.$message({
              type: "erroy",
              message: "验证码错误"
            });
          }
          if (res.data.code === 500) {
            this.$message({
              type: "erroy",
              message: "用户不存在或密码错误"
            });
          }
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "登陆成功"
            });
            let user = res.data.data.user
            this.$store.state.user = user
            localStorage.setItem("user",JSON.stringify(user))
            this.$router.push("/");
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    pass(){
      this.$router.push("/retrieve")
    }
  },
  mounted() {
    //获取验证码,/captcha是获取验证码的接口
    this.$axios
      .req("api/users/graphical")
      .then(res => {
        console.log(res);
        if (res) {
          this.captchaImg = res.data;
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .dv {
    /*margin-left: 400px;*/
    /*margin-top: 100px;*/
    background: url("../assets/logo.png");
    width: 1300px;
    height: 600px;
  }
  .box{
    margin-left: 400px;
    margin-top: 100px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>

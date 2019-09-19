<template>
  <div class="dv">
    <el-container class="box">
      <el-card class="box-card">
        <el-form
          :model="ruleForm"
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
            <el-input type="password" v-model="ruleForm.pass"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              type="code"
              v-model="ruleForm.code"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="go">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        phone: "",
        email: "",
        code: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号码", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入正确的验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$axios
        .req("api/users/register", {
          username: this.ruleForm.name,
          password: this.ruleForm.pass,
          phone: this.ruleForm.phone,
          email: this.ruleForm.email,
          code: this.ruleForm.code
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: "erroy",
              message: "用户已存在"
            });
          }
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "注册成功"
            });
            this.$router.push("/login");
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    go() {
      let iphone = /^(?:(?:\+|00)86)?1\d{10}$/;
      // console.log(typeof this.ruleForm.phone)
      if (!this.ruleForm.phone.match(iphone)) {
        this.$message({
          type: "warning",
          message: "请输入正确的手机号"
        });
      } else {
        this.$message({
          type: "success",
          message: "发送成功"
        });
        this.$axios
          .req("api/users/sendMsg", {
            phone: this.ruleForm.phone
          })
          .then(res => {
            console.log(res);
          })
          .catch();
      }
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.dv {
  width: 1300px;
  height: 600px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  margin-top: 150px;
  margin-left: 400px;
}
</style>

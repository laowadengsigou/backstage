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
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">立即登陆</el-button>
              <el-button @click="zhao">找回密码</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "retrieve",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        name: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    zhao() {
      this.$axios
        .req("api/users/findPwd", {
          username: this.ruleForm.name,
          email: this.ruleForm.email
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "发送成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: "用户名不存在"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
      login(){

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

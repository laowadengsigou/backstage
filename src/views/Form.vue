<template>
  <div>
    <div v-if="this.flag === false">
      <div style="background-color: whitesmoke;margin-top: 15px">
        <div>请填写你的转账信息</div>
        <div>请务必是你本人操作，确认转账金额及收款人信息</div>
      </div>
      <div style="margin-top: 15px">
        <el-card class="box-card">
          <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
          </el-steps>
          <div v-show="active === 0">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="付款账号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="收款账户" required>
                <el-col :span="5">
                  <el-form-item prop="date1">
                    <el-select
                      v-model="ruleForm.region"
                      placeholder="请选择收款方式"
                    >
                      <el-option label="支付宝" value="shanghai"></el-option>
                      <el-option label="银行卡" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center"
                  >-</el-col
                >
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-input v-model="ruleForm.name1"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="付款人姓名" prop="name">
                <el-input v-model="ruleForm.name2"></el-input>
              </el-form-item>
              <el-form-item label="收款金额" prop="name">
                <el-input v-model="ruleForm.name3"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button style="margin-top: 12px;" @click="next"
                >下一步</el-button
              >
            </div>
          </div>
          <div v-show="active === 1">
            <div style="margin-left: 400px;">
              <div style="background-color: gainsboro;width: 420px">
                <i class="el-icon-warning"></i
                >确认收款后，资金将直接打入对方账号，无法退回<i
                  style="margin-left: 20px"
                  class="el-icon-circle-close"
                ></i>
              </div>
              <div>收款人:{{ ruleForm.name }}</div>
              <div>收款账户:{{ ruleForm.name1 }}</div>
              <div>付款人姓名{{ ruleForm.name2 }}</div>
              <div>收款金额:{{ ruleForm.name3 }}</div>
            </div>
            <div style="margin-left: 350px;margin-top: 30px">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
              >
                <el-form-item label="支付密码" prop="pass">
                  <el-input
                    v-model="ruleForm.name4"
                    style="width: 300px;"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="margin-left: 400px">
              <el-button type="primary" @click="ti">提交</el-button>
              <el-button style="margin-top: 12px;" @click="nexts"
                >上一步</el-button
              >
            </div>
          </div>
          <div v-show="active === 2">
            <div style="text-align: center">
              <div>
                <img
                  src="../assets/成功.png"
                  alt=""
                  style="width: 80px;height: 80px;"
                />
              </div>
              <div>操作成功</div>
              <div>预计两小时到账</div>
            </div>
            <div style="margin-left: 450px;margin-top: 30px">
              <div>付款账户:{{ ruleForm.name }}</div>
              <div>收款账户:{{ ruleForm.name1 }}</div>
              <div>付款人姓名::{{ ruleForm.name2 }}</div>
              <div>收款金额:{{ ruleForm.name3 }}</div>
            </div>
            <div style="margin-left: 450px;margin-top: 30px">
              <el-button @click="look">查看账单</el-button>
              <el-button type="primary" @click="and">再转一笔</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else style="margin-top: 100px;margin-left: 400px">
      <el-card class="box-card1">
        <div slot="header" class="clearfix">
          <span>账单详情</span>
        </div>
        <div id="printTest" class="text item">
          <div style="margin-top: 10px">付款账户:{{ ruleForm.name }}</div>
          <div style="margin-top: 10px">收款账户:{{ ruleForm.name1 }}</div>
          <div style="margin-top: 10px">收款人姓名:{{ ruleForm.name2 }}</div>
          <div style="margin-top: 10px">收款金额:{{ ruleForm.name3 }}</div>
        </div>
        <div>
          <el-button type="primary" @click="out">返回首页</el-button>
          <el-button type="success" v-print="'#printTest'">打印</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      flag: false,
      ruleForm: {
        name: "",
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        region: "",
        date1: "",
        date2: ""
      },
      rules: {
        name: [{ required: true, message: "请输入付款账号", trigger: "blur" }],
        region: [
          { required: true, message: "请选择收款账户", trigger: "change" }
        ],
        name1: [{ required: true, message: "请输入收款账户", trigger: "blur" }],
        name2: [
          { required: true, message: "请输入付款人姓名", trigger: "blur" }
        ],
        name3: [{ required: true, message: "请输入收款金额", trigger: "blur" }],
        name4: [
          {
            type: Number,
            required: true,
            message: "请输入支付密码",
            trigger: "blur"
          },
          { min: 6, max: 6, message: "请输入正确的支付密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    next() {
      this.active = 1;
    },
    nexts() {
      this.active = 0;
    },
    ti() {
      this.active = 2;
    },
    and() {
      this.active = 0;
    },
    look() {
      this.flag = true;
    },
    out() {
      this.flag = false;
      this.active = 0;
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card1 {
  width: 480px;
}
</style>

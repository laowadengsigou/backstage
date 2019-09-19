<template>
  <div class="home">
    <div style="display: flex">
      <div
        style="margin-top: 20px;flex: 1;background-color: gainsboro;height: 120px"
        v-for="(item, index) in HomeArr1"
        :key="index"
        @click="click(index)"
      >
        <!--        <el-card class="box-card">-->
        <div style="display: flex">
          <div style="width: 100px">
            <div>
              {{ item.name }}
            </div>
            <div>${{ item.price }}</div>
          </div>
          <div>
            <Progress
              v-if="item.isShow"
              key="animation-model1"
              :isAnimation="true"
              :isRound="true"
              :width="width"
              :radius="radius"
              :progress="item.percentage"
              :barColor="item.barColor"
              :duration="duration"
              :delay="delay"
              :timeFunction="timeFunction"
              :backgroundColor="backgroundColor"
            ></Progress>
            <Progress
              v-show="item.isShow === false"
              key="animation-Model2"
              :isAnimation="true"
              :isRound="true"
              :width="width"
              :radius="radius"
              :progress="progress"
              :barColor="backgroundColor"
              :duration="duration"
              :delay="delay"
              :timeFunction="timeFunction"
              :backgroundColor="backgroundColor"
            ></Progress>
          </div>
        </div>
        <div class="ab">
          <div style="margin-left: 7px">{{ item.percentage }}%</div>
          <div>完成率</div>
        </div>

        <!--        </el-card>-->
      </div>
    </div>
    <div style="display:flex">
      <div class="box">
        <div class="live">利润(万)</div>
        <div>
          <ve-wordcloud
            :data="chartData"
            :settings="chartSettings"
          ></ve-wordcloud>
        </div>
      </div>
      <div class="dv">
        <div
          style="display: flex;margin-top: 10px;border-bottom:1px solid gray;"
        >
          <div>个人动态</div>
          <div class="but">
            <el-button type="primary" @click="dialogVisible = true"
              >添加动态</el-button
            >
          </div>
        </div>
        <div class="block">
          <el-date-picker v-model="value1" type="date" placeholder="选择日期" @change="changeDate">
          </el-date-picker>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form :model="form">
            <el-form-item label="动态类型" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择动态类型">
                <el-option
                  :label="item.lists"
                  :value="item.value2"
                  v-for="(item, index) in list"
                ></el-option>
              </el-select>
            </el-form-item>
            <div v-if="form.region === 2">
              <el-form-item label="相关汇报人" :label-width="formLabelWidth">
                <el-select v-model="form.name" placeholder="请选择汇报人">
                  <el-option
                    :label="item.name"
                    :value="index + 1"
                    v-for="(item, index) in na"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item label="详情内容" :label-width="formLabelWidth">
              <el-input v-model="form.tet" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ok">确 定</el-button>
          </span>
        </el-dialog>
        <div v-for="(item, index) in arr" style="border-bottom: 1px solid black">
          <div style="margin-top: 20px">
            <span>{{ item.classification }}</span>
            <span style="margin-left: 450px">{{ item.username }}</span>
          </div>
          <div v-if="item.reportUsers.length > 0" style="margin-top: 10px">
            汇报人:{{ item.reportUsers[0] }}
          </div>
          <div style="margin-top: 10px">
            <span>动态:{{ item.dynamic }}</span>
            <span style="margin-left: 350px">发布于{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
    <Investigation></Investigation>
  </div>
</template>

<script>
  import Investigation from "../components/Investigation"
import Progress from "../components/circle-progress";
export default {
  name: "home",
  components: {
    Progress,
    Investigation
  },
  props: {},
  data() {
    this.chartSettings = {
      color: [],
      sizeMin: 12,
      sizeMax: 30
    };
    return {
      date: "",
      dynamic: [], //动态
      user: {},
      na: [],
      list: [
        {
          value2: 1,
          lists: "个人心情"
        },
        {
          value2: 2,
          lists: "工作汇报"
        },
        {
          value2: 3,
          lists: "公司相关"
        },
        {
          value2: 4,
          lists: "其他事物"
        }
      ],
      form: {
        name: "",
        tet: "",
        region: ""
      },
      formLabelWidth: "120px",
      dialogVisible: false,
      value1: "",
      chartData: {
        columns: ["name", "price"],
        rows: []
      },
      isDurationModel: true, // 是否打开持续缓动模式
      isShow: true,
      width: 90,
      radius: 10,
      progress: 70,
      duration: 1000,
      delay: 20,
      barColor: "#F2AE57",
      backgroundColor: "#FFE8CC",
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)",

      intervalTimer: null, // 持续模式，循环计时器
      durationTime: 60, // 持续模式总时长
      HomeArr1: [
        {
          name: "本月应收（元）",
          price: 0,
          percentage: 0,
          barColor: "#F2AE57",
          backgroundColor: "#FFE8CC",
          isShow: true,
          startVal: 0,
          hrBc: "background-color: #F2AE57"
        },
        {
          name: "待收款（元）",
          price: 0,
          percentage: 0,
          barColor: "#19fa28",
          backgroundColor: "#FFE8CC",
          isShow: false,
          startVal: 0,
          hrBc: "background-color: #19fa28"
        },
        {
          name: "客单价/合同（元）",
          price: 0,
          percentage: 0,
          barColor: "#17abe3",
          backgroundColor: "#FFE8CC",
          isShow: false,
          startVal: 0,
          hrBc: "background-color: #17abe3"
        }
      ],
      tabNum: 0,
      arr: []
    };
  },
  methods: {
    qwe() {
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
    },
    click(index) {
      this.HomeArr1.forEach(item => {
        item.isShow = false;
      });
      this.HomeArr1[index].isShow = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //添加动态
    ok() {
      this.dialogVisible = false;
      let names = [];
      // let time = this.$dayjs(this.value1).format('YYYY年MM月DD日')
      let type = this.list[this.form.region - 1].lists;
      // console.log(this.na);
      console.log(this.form.name);
      if (this.form.name) {
        names = this.na[this.form.name].name;
      }

      // console.log(names);
      // console.log(this.form.text);
      // console.log(time);
      // console.log(type);
      // console.log(names);
      this.$axios
        .req("api/addDynamic", {
          username: this.user.username,
          date: this.value1,
          dynamic: this.form.tet,
          classification: type,
          reportUsers: names
        })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeDate (val) {
      console.log(val);
      val = this.$dayjs(val).format('YYYY年MM月DD日')
      this.arr = this.dynamic.filter(item => {
        return item.date === val
      })
    }
  },
  mounted() {
    //时间等于当前时间
    this.value1 = Date.now();
    //存在loca里面的数据
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
    console.log(this.user);
    //随机数
    this.$axios.req("api/getData").then(res => {
      res.data.data.forEach((item, index) => {
        this.HomeArr1[index].price = item.price;
        this.HomeArr1[index].percentage = parseInt(item.percentage);
      });
      // this.list = res.data.data;
      // console.log(res);
      // console.log(this.HomeArr1);
    });
    //城市
    this.$axios
      .req("api/getCitys")
      .then(res => {
        this.chartData.rows = res.data.data;
        res.data.data.map(item => {
          this.chartSettings.color.push(item.colors);
        });
        // console.log(this.chartData.rows);
        // console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
    //随即名
    this.$axios
      .req("api/getVal")
      .then(res => {
        this.na = res.data.data;
        // console.log(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
    //获取动态
    this.$axios
      .req("api/getDynamic")
      .then(res => {
        res.data.data.map(item => {
          item.date = this.$dayjs(item.date).format("YYYY年MM月DD日");
        });
        this.dynamic = res.data.data
        let val = this.$dayjs(this.value1).format("YYYY年MM月DD日")
        this.arr = this.dynamic.filter(item => {
          return item.date === val
        })
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
.ab {
  position: absolute;
  margin-left: 120px;
  top: 150px;
}
.live {
  border-bottom: 1px solid gray;
  margin-top: 10px;
  margin-left: 5px;
  height: 40px;
}
.box {
  margin-top: 50px;
  width: 50%;
  background-color: gainsboro;
}
.dv {
  margin-top: 50px;
  margin-left: 30px;
  background-color: gainsboro;
  width: 600px;
}
.but {
  margin-left: 430px;
}

</style>

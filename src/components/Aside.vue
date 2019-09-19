<template>
  <div>
    <!--    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
    <!--      <el-radio-button :label="false">展开</el-radio-button>-->
    <!--      <el-radio-button :label="true">收起</el-radio-button>-->
    <!--    </el-radio-group>-->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="1" @click="shou">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
        <span class="New-NEW" v-show="showNew1">new</span>
      </el-menu-item>
      <el-menu-item index="2" @click="day">
        <i class="el-icon-date"></i>
        <span slot="title">日程管理</span>
        <span class="New-NEW" v-show="showNew2">new</span>
      </el-menu-item>
      <el-menu-item index="3" @click="tong">
        <i class="el-icon-setting"></i>
        <span slot="title">通讯录</span>
        <span class="New-NEW" v-show="showNew3">new</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">组织员工</span>
          <span class="New-NEW" v-show="showNew4">new</span>
        </template>
        <el-menu-item-group>
          <!--          <span slot="title">分组一</span>-->
          <el-menu-item index="4-1" @click="offer">offer管理</el-menu-item>
          <el-menu-item index="4-2" @click="people">人员信息</el-menu-item>
          <el-menu-item index="4-3" @click="money">薪资管理</el-menu-item>
        </el-menu-item-group>
        <!--        <el-submenu index="1-4">-->
        <!--          <span slot="title">选项4</span>-->
        <!--          <el-menu-item index="1-4-1">选项1</el-menu-item>-->
        <!--        </el-submenu>-->
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">表单页</span>
          <span class="New-NEW" v-show="showNew5">new</span>
        </template>
        <el-menu-item-group>
          <!--          <span slot="title">分组一</span>-->
          <el-menu-item index="5-1" @click="form">分布表单</el-menu-item>
          <!--          <el-menu-item index="1-2">选项2</el-menu-item>-->
        </el-menu-item-group>
        <!--        <el-submenu index="1-4">-->
        <!--          <span slot="title">选项3</span>-->
        <!--          <el-menu-item index="1-4-1">选项1</el-menu-item>-->
        <!--        </el-submenu>-->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  props: {},
  data() {
    return {
      blur: [],
      showNew1: "",
      showNew2: "",
      showNew3: "",
      showNew4: "",
      showNew5: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    shou() {
      this.$router.push("/");
    },
    day(){
      this.$router.push("/Days")
    },
    tong() {
      this.$router.push("/Mail");
    },
      people(){
        this.$router.push("/good/Personnel")
      },
      form(){
        this.$router.push("/goods/Form")
      },
    offer(){
      this.$router.push("/good/Offer")
    },
    money(){
      this.$router.push("/good/Money")
    }
  },
  mounted() {
    this.$axios
      .req("api/new")
      .then(res => {
        this.blur = res.data.data;
        this.showNew1 = res.data.data[0].showNew;
        this.showNew2 = res.data.data[1].showNew;
        this.showNew3 = res.data.data[2].showNew;
        this.showNew4 = res.data.data[3].showNew;
        this.showNew5 = res.data.data[4].showNew;
        // console.log(this.blur);
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  position: relative;
}
.New-NEW {
  color: firebrick;
  font-size: 14px;
  position: absolute;
  top: 0px;
  right: 10%;
}
</style>

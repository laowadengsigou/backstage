<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <div v-if="$route.path !=='/'">
        <el-breadcrumb-item  v-for="(item, index) in list" :key="index">{{item.meta.title }}</el-breadcrumb-item>
      </div>

    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      msg: ""
    };
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {
    $route(val) {
        console.log(val)
        if (val.path !== '/') {
            this.list = val.matched
        }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss"></style>

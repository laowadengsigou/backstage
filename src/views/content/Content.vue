<template>
  <div>
      <el-container>
          <el-header> <Header></Header> </el-header>
          <el-container>
              <el-aside width="200px"> <Aside></Aside></el-aside>
              <el-main><Breadcrumb></Breadcrumb><router-view /></el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
    import Header from "../../components/Header"
    import Aside from "../../components/Aside"
    import Breadcrumb from "../../components/Breadcrumb"
export default {
  name: "Content",
  components: {
      Header,
      Aside,
    Breadcrumb
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
    .el-header{
        padding: 0;
    }
</style>

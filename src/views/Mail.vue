<template>
  <div>

    <div style="display: flex;margin-top: 30px">
      <div>
        <el-card class="box-card">
          <el-tree :data="tree" @node-click="handleNodeClick"></el-tree>
        </el-card>
      </div>
      <div>
        <el-row type="flex" class="row-bg" justify="space-around">
          <div>
            <el-col
              :span="8"
              v-for="(item, index) in list.slice(
                page * (currentPage - 1),
                page * currentPage
              )"
            >
              <el-card class="box-cards">
                <div>
                  <div class="top">
                    <div>
                      <img :src="item.img" alt="" style="border-radius: 50%" />
                    </div>
                    <div style="margin-left: 20px">
                      <div>{{ item.name }}</div>
                      <div>{{ item.regions }}/{{ item.positions }}</div>
                      <div style="display: flex">
                        <div
                          v-for="(item1, index1) in item.label"
                          :key="index1"
                          class="item1"
                          :style="'background-color:' + item1.color"
                          v-show="item1.text"
                        >
                          {{ item1.text }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="margin-top: 20px">
                    <div>邮箱:{{ item.email }}</div>
                    <div>办公电话:{{ item.tel }}</div>
                    <div>手机号码:{{ item.phone }}</div>
                    <div>性别:{{ item.gender }}</div>
                    <div>QQ:{{ item.qq }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>
    <div class="block">
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tree from "./tree";


export default {
  name: "Mail",
  components: {
  },
  props: {},
  data() {
    return {
      tree: tree.data,
      list: [],
      currentPage: 1,
      page: 10,
        arr:[]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
      handleNodeClick(data) {
          this.list = this.arr
          if(!data.children){
              let arr = this.list.filter(item=>{
                  return JSON.stringify(item).indexOf(data.label) !== -1
              })
              this.list = arr
          }
          console.log(data);
      }
  },
  mounted() {
    this.$axios
      .req("api/mail")
      .then(res => {
        this.list = res.data.data;
          this.arr = res.data.data;
        // console.log(res);
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
.box-card {
  width: 250px;
}
.box-cards {
  width: 330px;
}
.item1 {
  margin-left: 5px;
  font-size: 13px;
  width: 60px;
  line-height: 20px;
  text-align: center;
  border-radius: 25px;
  color: white;
}
.top {
  display: flex;
  border-bottom: 1px solid gainsboro;
}
</style>

<template>
  <div>
    <div class="dv">
      <div class="dv1">
        <div><i class="el-icon-s-custom"></i></div>
        <div style="font-weight: 700">人员信息</div>
      </div>
      <div>
          <div v-if="flag === false" class="dv2">
              <div class="but"><el-button type="primary" @click="go">批量转正申请</el-button></div>
              <div class="but"><el-button type="primary">导出</el-button></div>
          </div>
          <div v-else class="dv2">
              <div class="but"><el-button type="primary" @click="ok">确认</el-button></div>
              <div class="but"><el-button type="primary" @click="gos">取消</el-button></div>
              <div class="but"><el-button type="primary">导出</el-button></div>
          </div>
      </div>
    </div>
    <div class="dv3">
      <div class="but">
        <el-button type="primary" plain round @click="click"
          >全部员工</el-button
        >
      </div>
      <div class="but">
        <el-button type="primary" plain round @click="click1"
          >考核中员工</el-button
        >
      </div>
      <div class="but">
        <el-button type="primary" plain round @click="click2"
          >已转正员工</el-button
        >
      </div>
    </div>
    <div>
      <el-table
        :data="arr.slice(page * (currentPage - 1), page * currentPage)"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="number" label="工号" width="120" sortable>
        </el-table-column>
        <el-table-column prop="mechanism" label="机构" width="120">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="120">
        </el-table-column>
        <el-table-column
          prop="start"
          label="试用期开始日期"
          width="180"
          sortable
        >
        </el-table-column>
        <el-table-column prop="out" label="结束期开始日期" width="180" sortable>
        </el-table-column>
        <el-table-column prop="states" label="转正审批状态" width="180">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="click(scope.row)"
              >编辑试用期</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
        :total="arr.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personnel",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      currentPage: 1,
      page: 20,
      arr: [],
        flag:false,
        list:[]
    };
  },
  methods: {
      ok(){
        this.list.map(item=>{
            item.states = "审核通过"
        })
          console.log(this.list);
      },
      go(){
        this.flag = true
          this.arr = this.tableData.filter(item=>{
              return JSON.stringify(item).indexOf("审批中") !== -1
          })
      },
      gos(){
        this.flag = false
          this.list = []
      },
    handleSizeChange(val) {
      this.page = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //全部员工
    click() {
        this.flag = false
      this.arr = this.tableData;
      // console.log(this.arr);
    },
    //考核中员工
    click1() {
        this.flag = false
      this.arr = this.tableData.filter(item => {
        return JSON.stringify(item).indexOf("审批中") !== -1;
      });
      // console.log(this.arr);
    },
    //已转正员工
    click2() {
        this.flag = false
      this.arr = this.tableData.filter(item => {
        return JSON.stringify(item).indexOf("审批通过") !== -1;
      });
    },
      handleSelectionChange(row){
          this.list = row
          console.log(row);
      }
  },
  mounted() {
    this.$axios
      .req("api/people")
      .then(res => {
        this.tableData = res.data.data;
        this.arr = res.data.data;
        console.log(res);
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
  display: flex;
  margin-top: 10px;
}
.dv1 {
  display: flex;
  margin-top: 5px;
  margin-left: 10px;
}
.dv2 {
  display: flex;
  margin-left: 850px;
}
.but {
  margin-left: 15px;
}
.dv3 {
  display: flex;
}
</style>

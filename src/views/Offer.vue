<template>
  <div>
    <div style="display: flex;margin-top: 20px">
      <div style="font-weight: 700">offer管理</div>
      <div style="margin-left: 900px">
        <el-button type="primary">新建offer</el-button>
        <el-button type="primary">转移状态</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-card class="box-card">
        <div>
          <el-button type="primary" round>待发offer</el-button>
          <el-button type="primary" round>已发offer</el-button>
          <el-button type="primary" round>已接受offer</el-button>
          <el-button type="primary" round>已拒绝offer</el-button>
          <el-button type="primary" round>已入职offer</el-button>
        </div>
        <div>
          <el-table
            ref="multipleTable"
            :data="
              tableData3.slice(page * (currentPage - 1), page * currentPage)
            "
            tooltip-effect="dark"
            style="width: 100%"
            :row-style="{ height: height1 }"
            :cell-style="{ padding: padding1 }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              v-for="(item, index) in offerManageArr2"
              :key="index"
              :prop="item.type"
              :label="item.label"
              width="auto"
            >
            </el-table-column>
            <el-table-column width="150" label="操作" align="center">
              <template slot="header">
                <el-popover placement="bottom" width="200" trigger="click">
                  <div class="dv">
                    <el-popover placement="left" width="200" trigger="click">
                      <el-table
                        ref="multipleTable"
                        :data="offerManageArr3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :show-header="false"
                        :row-style="{ height: '20px' }"
                        :cell-style="{ padding: '0px' }"
                        @selection-change="handleSelectionChange1"
                      >
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="label" width="80">
                        </el-table-column>
                      </el-table>
                      <el-button
                        size="mini"
                        type="primary"
                        style="margin-left: 120px"
                        @click="pushs"
                        >确定</el-button
                      >
                      <div slot="reference">添加显示字段</div>
                    </el-popover>
                    <el-popover placement="left" width="200" trigger="click">
                      <el-table
                        ref="multipleTable"
                        :data="offerManageArr2"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :show-header="false"
                        :row-style="{ height: '20px' }"
                        :cell-style="{ padding: '0px' }"
                        @selection-change="handleSelectionChange2"
                      >
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="label" width="80">
                        </el-table-column>
                      </el-table>
                      <el-button
                        size="mini"
                        type="primary"
                        style="margin-left: 120px"
                        @click="dele"
                        >确定</el-button
                      >
                      <div style="margin-left: 30px" slot="reference">
                        删除显示字段
                      </div>
                    </el-popover>
                  </div>
                  <div>选择间距类型</div>
                  <div style="display: flex;justify-content: space-around">
                    <div :class="{ dv1: num === 0 }" @click="one">紧凑</div>
                    <div :class="{ dv1: num === 1 }" @click="two">适中</div>
                    <div :class="{ dv1: num === 2 }" @click="three">宽松</div>
                  </div>
                  <i
                    class="el-icon-setting"
                    style="font-size: 20px"
                    slot="reference"
                  ></i>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData3.length"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Offer",
  components: {},
  props: {},
  data() {
    return {
      num: 1,
      currentPage: 1,
      page: 10,
      tableData3: [],
      multipleSelection: [], //添加
      multipleSelection1: [], //删除
      offerManageArr1: [
        {
          type: "name",
          label: "姓名"
        },
        {
          type: "email",
          label: "个人邮箱"
        },
        {
          type: "certificates",
          label: "证件类型"
        },
        {
          type: "number",
          label: "证件号码"
        },
        {
          type: "approvals",
          label: "offer状态"
        },
        {
          type: "date",
          label: "出生日期"
        },
        {
          type: "native",
          label: "籍贯"
        },
        {
          type: "Nation",
          label: "民族"
        },
        {
          type: "phone",
          label: "电话"
        },
        {
          type: "tel",
          label: "座机电话"
        },
        {
          type: "gender",
          label: "性别"
        },
        {
          type: "qq",
          label: "QQ"
        },
        {
          type: "regions",
          label: "部门"
        },
        {
          type: "positions",
          label: "职位"
        },
        {
          type: "marriages",
          label: "婚姻状态"
        },
        {
          type: "age",
          label: "年龄"
        },
        {
          type: "Education",
          label: "学历"
        },
        {
          type: "newdate",
          label: "入职时间"
        },
        {
          type: "work",
          label: "工作地点"
        }
      ],
      offerManageArr2: [], //删除显示字段
      offerManageArr3: [], //添加显示字段
      height1: "60px",
      padding1: "0px"
    };
  },
  methods: {
    handleSelectionChange() {},
    //添加显示字段
    handleSelectionChange1(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //删除显示字段
    handleSelectionChange2(val) {
      this.multipleSelection1 = val;
    },
    handleSizeChange(val) {
      this.page = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    one() {
      this.num = 0;
      this.height1 = "20px";
    },
    two() {
      this.num = 1;
      this.height1 = "60px";
    },
    three() {
      this.num = 2;
      this.height1 = "100px";
    },
    //添加显示字段操作
    pushs() {
      this.multipleSelection.map(item => {
        this.offerManageArr2.push(item);
        this.offerManageArr3 = this.offerManageArr3.filter(item1 => {
          return JSON.stringify(item1).indexOf(item.label) === -1;
        });
      });
    },
    //删除显示字段操作
    dele() {
      this.multipleSelection1.map(item => {
        this.offerManageArr3.push(item);
        this.offerManageArr2 = this.offerManageArr2.filter(item1 => {
          return JSON.stringify(item1).indexOf(item.label) === -1;
        });
      });
    }
  },
  mounted() {
    this.$axios
      .req("api/list")
      .then(res => {
        this.tableData3 = res.data.data;
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
    this.offerManageArr2 = this.offerManageArr1.slice(0, 9);
    this.offerManageArr3 = this.offerManageArr1.slice(
      9,
      this.offerManageArr1.length
    );
    console.log(this.offerManageArr3);
  },
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
  padding: 18px 0;
}
.dv {
  display: flex;
  color: blue;
  border-bottom: 1px solid gainsboro;
  height: 30px;
}
.dv1 {
  color: blue;
}
</style>

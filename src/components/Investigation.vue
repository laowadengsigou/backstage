<template>
  <div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>网站问卷调查</span>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="问卷名称" width="180">
          </el-table-column>
          <el-table-column prop="text" label="问卷描述" width="180">
          </el-table-column>
          <el-table-column prop="newdate" label="创建时间" sortable>
          </el-table-column>
          <el-table-column prop="olddate" label="截止时间" sortable>
          </el-table-column>
          <el-table-column prop="topic" label="问卷主题">
            <template slot-scope="scope">
              <el-tag disable-transitions>{{ scope.row.topic }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="websiteName"
            label="网站名称"
            :filter-method="filterTag"
            :filters="[
              { text: '百度', value: '百度' },
              { text: '豆瓣', value: '豆瓣' },
              { text: '掘金', value: '掘金' },
              { text: 'Githup', value: 'Githup' }
            ]"
          >
            <template slot-scope="scope">
              <el-tag disable-transitions :type="scope.row.type">{{
                scope.row.websiteName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
            <el-button type="primary" @click="click(scope.row)"
              >查看网站详情</el-button
            >
              </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog
      title="复制地址"
      :visible.sync="dialogFormVisible"
      @opened="open"
    >
      <el-form :model="form">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width:550px"
          ></el-input>
          <el-button type="danger" class="tag-read" style="margin-left: 20px" :data-clipboard-text="form.name" @click="copy">复制</el-button>
        </el-form-item>
      </el-form>
      <div>
        如无法使用上方复制按钮，请选择内容后，使用Ctrl + C
        复制。也可扫描下方二维码或右键保存二维码进行访问。
      </div>
      <div id="qrcode" class="two"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import Clipboard from 'clipboard';
export default {
  name: "Investigation",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "0px",
      form: {
        name: ""
      },
    };
  },
  methods: {
    click(row) {
      this.dialogFormVisible = true;
      this.form.name = row.texts
      console.log(row);
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    open() {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode("qrcode", {
        width: 200,
        height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
        text: this.form.name
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
    },
    copy() {
      let clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        // success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
        this.$message({
          type:"success",
          message:"复制成功"
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
  },
  mounted() {
    this.$axios
      .req("api/check")
      .then(res => {
        this.tableData = res.data.data;
        this.tableData.map(item => {
          if (item.websiteName === "Githup") {
            this.$set(item, "type", "info");
            this.$set(item, "texts", "https://Githup.com/");
          } if (item.websiteName === "百度") {
            this.$set(item, "type", "success");
            this.$set(item, "texts", "https://baidu.com/");
          } if (item.websiteName === "掘金") {
            this.$set(item, "type", "warning");
            this.$set(item, "texts", "https://juejin.com/");
          } if (item.websiteName === "豆瓣") {
            this.$set(item, "type", "danger");
            this.$set(item, "texts", "https://douban.com/");
          }
        });
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
.two {
  margin-left: 35%;
  margin-top: 10%;
}
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
.card {
  margin-top: 20px;
}
</style>

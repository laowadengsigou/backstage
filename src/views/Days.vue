<template>
  <div>
    <div>
      <lunar-full-calendar
        :events="events"
        :config="config"
      >
      </lunar-full-calendar>
      <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "Days",
  components: {},
  props: {},
  data() {
    return {
      events: [
        {
          title: "事件内容", // 事件内容
          start: "2019-05-20 09:00:00", // 事件开始时间
          end: "2019-05-21 12:00:00", // 事件结束时间
          color: "rgba(9, 9, 9, 0.2)" // 事件的显示颜色
        }
      ],
      config: {
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        locale: "zh-cn",
        editable: false, //是否允许修改事件
        selectable: false,
        eventLimit: 4, //事件个数
        allDaySlot: false, //是否显示allDay
        defaultView: "month", //显示默认视图
        eventClick: this.eventClick, //点击事件
        dayClick: this.dayClick ,//点击日程表上面某一天
      },
      dialogVisible: false
    };
  },
  methods: {
    // 点击事件
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    // 点击当天
    dayClick(day, jsEvent) {
      console.log("dayClick", day, jsEvent);
      this.dialogVisible = true
      console.log(this.dialogVisible);
    },
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>

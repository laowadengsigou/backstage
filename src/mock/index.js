import Mock from "mockjs";

Mock.mock("api/new", "get", {
  code: 200,
  msg: "success",
  "data|5": [
    {
      showNew: "@boolean()"
    }
  ]
});

Mock.mock("api/getData", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      price: "@natural(100, 1000000)",
      percentage: "@natural(0, 100)"
    }
  ]
});

Mock.mock("api/getCitys", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      name: "@city()",
      colors: "@color()",
      price: "@natural(1, 100)"
    }
  ]
});

Mock.mock("api/getVal", "get", {
  code: 200,
  msg: "success",
  "data|20": [
    {
      name: "@cname()",
      value: "@increment"
    }
  ]
});

//首页底部
Mock.mock("api/check", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      name: "@cword(2,4)",
      text: "@cword(2,5)",
      olddate: "@date()",
      newdate: '@date("yyyy-MM-dd")',
      "topic|1": ["未发布", "已发布", "已截止"],
      "websiteName|1": ["百度", "豆瓣", "掘金", "Github"]
    }
  ]
});

//通讯录
let genders = ["男", "女"];
let region = [
  "成都分公司",
  "北京分公司",
  "上海分公司",
  "哈尔滨公司",
  "微易",
  "郑州公司",
  '"测试部门"',
  "财务部",
  "地州区",
  "盒马项目组",
  "成都区",
  "贵州区",
  "电商部",
  "综合管理部",
  "全民营销项目组",
  "单团部",
  "新销售业务部",
  "欧洲组",
  "中东非组",
  "票务组",
  "外联部",
  "西南总经理办公室",
  "市场营销部",
  "单团计调部",
  "票务部",
  "南亚计调部",
  "欧洲散拼计调部",
  "签证部",
  "东南亚事业部",
  "产品组",
  "途牛组",
  "携程组",
  "其他电商组",
  "资料组",
  "运营支持组",
  "京津组",
  "河北组",
  "太原公司",
  "内蒙古组"
];
let position = ["经理", "主管", "员工", "实习生"];
Mock.mock("api/mail", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: "@increment(1)",
      name: "@cword(2,4)",
      img: "@dataImage(80x80,@name)",
      phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
      qq: /^[1-9][0-9]{4,10}$/,
      gender: () => {
        let i = parseInt(Math.random() * genders.length);
        return genders[i];
      },
      regions: () => {
        let i = parseInt(Math.random() * region.length);
        return region[i];
      },
      positions: () => {
        let i = parseInt(Math.random() * position.length);
        return position[i];
      },
      label: [
        {
          color: "@color",
          text: "@cword(0, 3)"
        },
        {
          color: "@color",
          text: "@cword(0, 3)"
        },
        {
          color: "@color",
          text: "@cword(0, 3)"
        }
      ]
    }
  ]
});

//人员信息
let state = ["审批通过", "审批未通过", "审批中"];
Mock.mock("api/people", "get", {
  code: 200,
  mag: "success",
  "data|200": [
    {
      name: "@cword(2,4)", //随机姓名
      number: "@natural(1000, 9999)", //随机工号
      mechanism: "区域中心", //机构
      department: () => {
        //部门
        let i = parseInt(Math.random() * region.length);
        return region[i];
      },
      start: "@date('yyyy-MM-dd')", //日期
      out: "@date('yyyy-MM-dd')",
      states: () => {
        let i = parseInt(Math.random() * state.length);
        return state[i];
      },
      posts: () => {
        let i = parseInt(Math.random() * position.length);
        return position[i];
      }
    }
  ]
});

//offer管理
// let genders = ["男", "女"];
// let region = [
//   "成都分公司",
//   "北京分公司",
//   "上海分公司",
//   "哈尔滨公司",
//   "微易",
//   "郑州公司",
//   '"测试部门"',
//   "财务部",
//   "地州区",
//   "盒马项目组",
//   "成都区",
//   "贵州区",
//   "电商部",
//   "综合管理部",
//   "全民营销项目组",
//   "单团部",
//   "新销售业务部",
//   "欧洲组",
//   "中东非组",
//   "票务组",
//   "外联部",
//   "西南总经理办公室",
//   "市场营销部",
//   "单团计调部",
//   "票务部",
//   "南亚计调部",
//   "欧洲散拼计调部",
//   "签证部",
//   "东南亚事业部",
//   "产品组",
//   "途牛组",
//   "携程组",
//   "其他电商组",
//   "资料组",
//   "运营支持组",
//   "京津组",
//   "河北组",
//   "太原公司",
//   "内蒙古组"
// ];
// let position = ["经理", "主管", "员工", "实习生"];
let marriage = ["已婚", "未婚"];
let approval = ["待发", "已发", "已接受", "已拒绝", "已入职"];
let education = ["初中", "高中", "大专", "本科", "硕士", "博士", "博士以上"];
Mock.mock("api/list", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      name: "@cword(2,4)",
      phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
      gender: () => {
        let i = parseInt(Math.random() * genders.length);
        return genders[i];
      },
      qq: /^[1-9][0-9]{4,10}$/,
      regions: () => {
        let i = parseInt(Math.random() * region.length);
        return region[i];
      },
      positions: () => {
        let i = parseInt(Math.random() * position.length);
        return position[i];
      },
      native: "@city()",
      marriages: () => {
        let i = parseInt(Math.random() * marriage.length);
        return marriage[i];
      },
      certificates: "@cword(2,4)",
      number: "@natural()",
      date: '@date("yyyy-MM-dd")',
      approvals: () => {
        let i = parseInt(Math.random() * approval.length);
        return approval[i];
      },
      age: "@natural(18,60)",
      Education: () => {
        let i = parseInt(Math.random() * education.length);
        return education[i];
      },
      newdate: '@date("yyyy-MM-dd")',
      Nation: "@cword(2,5)",
      work: "@city()"
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Content from "./views/content/Content";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Content,
      meta: {
        title: "首页"
      },
      children: [
        {
          path: "",
          component: Home
        }
      ]
    },
    {
      path: "/Days",
      name: "Days",
      component: Content,
      meta: {
        title: "日程管理"
      },
      children: [
        {
          path: "",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Days.vue")
        }
      ]
    },
    {
      path: "/Mail",
      name: "mail",
      component: Content,
      meta: {
        title: "通讯录"
      },
      children: [
        {
          path: "",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Mail.vue")
        }
      ]
    },
    {
      path: "/good",
      name: "good",
      component: Content,
      meta: {
        title: "组织员工"
      },
      children: [
        {
          path: "personnel",
          component: () => import("./views/Personnel.vue"),
          meta: {
            title: "人员信息"
          }
        },
        {
          path: "money",
          component: () => import("./views/Money.vue"),
          meta: {
            title: "薪资管理"
          }
        },
        {
          path: "offer",
          component: () => import("./views/Offer.vue"),
          meta: {
            title: "offer管理"
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    },
    {
      path: "/retrieve",
      name: "retrieve",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/retrieve.vue")
    },
    {
      path: "/goods",
      name: "goods",
      component: Content,
      meta: {
        title: "组织员工"
      },
      children: [
        {
          path: "form",
          component: () =>
            import(/* webpackChunkName: "about" */ "./views/Form.vue"),
          meta: {
            title: "分布表单"
          }
        }
      ]
    }
  ]
});

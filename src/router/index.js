import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: (resolve) => require(['@/components/Page'], resolve),
      redirect: '/search',
      children: [
        {
          path: '/search',
          name: 'search',
          component: (resolve) => require(['@/components/Search'], resolve)
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: (resolve) => require(['@/components/Test'], resolve)
    }
  ]
})

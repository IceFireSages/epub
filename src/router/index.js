import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Ebook from '@/components/Ebook.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      /*component: HelloWorld*/
      component:Ebook
    },
    {
      path:'/ebook',
      name:'ebook',
      component:Ebook
    }
  ]
})

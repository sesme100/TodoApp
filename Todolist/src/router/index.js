import Vue from 'vue'
import Router from 'vue-router'
import TodoHeader from '@/components/TodoHeader'

Vue.use(Router)

export default new Router({ /*라우터 등록되는 컴포넌트 */
  routes: [{
    path: '/',
    name: 'TodoHeader',
    component: TodoHeader
  }]
})

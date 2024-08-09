import { createRouter, createWebHistory } from 'vue-router'
import CreateTask from './components/createTask.vue'
import Tasks from './components/AppTasks.vue'
import TaskBody from './components/TaskBody.vue'
import NotFound from './components/NotFound.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Tasks },
    { path: '/create', component: CreateTask },
    {
      path: '/task/:taskId?',
      component: TaskBody,
      props: true
    },
    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

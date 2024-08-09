<template>
  <div>
    <div class="navbar">
      <h1>Freelance</h1>
      <ul class="navbar-menu">
        <li><router-link to="/">Все задачи</router-link></li>
        <li><router-link to="/create">Создать</router-link></li>
      </ul>
    </div>

    <app-loader v-if="loader"></app-loader>

    <div class="container with-nav" v-else>
      <router-view
      :tasks="tasks"
      @add="createTask"
      :activeCount="activeCount"
      ></router-view>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import AppLoader from '../../app3/src/AppLoader.vue'

export default {
  data () {
    return {
      tasks: [],
      name: '',
      taskStatus: 'smallprimary',
      taskDate: '',
      taskContent: '',
      activeCount: 0,
      loader: false
    }
  },
  methods: {
    async loadTasks () {
      try {
        this.loader = true
        const { data } = await axios.get('https://vuecreatetask-default-rtdb.firebaseio.com/tasks.json')
        this.tasks = Object.keys(data).map(key => {
          return {
            id: key,
            taskName: data[key].taskName,
            taskStatus: data[key].taskStatus,
            taskDate: data[key].taskDate.split('-').reverse().join('.'),
            taskContent: data[key].taskContent
          }
        })
        this.activeCount = 0
        for (let index = 0; index < this.tasks.length; index++) {
          if (this.tasks[index].taskStatus === 'smallprimary') {
            this.activeCount++
          }
        }
        this.loader = false
      } catch (e) {
        console.log(e.message)
        this.loader = false
      }
    },
    async createTask (inputName, inputDate, inputContent, status) {
      const response = await fetch('https://vuecreatetask-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskName: inputName,
          taskStatus: this.taskStatus,
          taskDate: inputDate,
          taskContent: inputContent
        })
      })
      const firebaseData = await response.json()
      this.tasks.push({
        taskName: inputName,
        id: firebaseData.name,
        taskStatus: this.taskStatus,
        taskDate: inputDate
      })
      this.$router.push('/')
      this.loadTasks()
    }
  },
  mounted () {
    this.loadTasks()
  },
  provide () {
    return {
    }
  },
  components: { AppLoader }
}
</script>

<style lang="scss">
</style>

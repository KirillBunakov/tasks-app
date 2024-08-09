<template>
  <div class="card" v-if="task">
    <h2>{{ task.taskName }}</h2>
    <p>Статус: &nbsp;<button class="btn" :class="task.taskStatus">{{ task.taskStatus === 'smallwarning' ? 'Выполняется' : task.taskStatus === 'smalldanger' ? 'Отменен' : task.taskStatus === 'smalldone' ? 'Завершен' : 'Активен' }}
      </button></p>
    <h4>Дэдлайн: {{ task.taskDate }}</h4>
    <h4><strong>Описание: </strong>{{ task.taskContent }}</h4>
    <div>
      <button class="btn" @click="toWork">Взять в работу</button>
      <button class="btn primary" @click="done">Завершить</button>
      <button class="btn danger" @click="cancelled">Отменить</button>
    </div>
  </div>
  <div v-else>
    <NotFound :taskId="taskId">Задача с id: "{{ taskId }}" не существует</NotFound>
  </div>
</template>
<script>
import axios from 'axios'
import NotFound from './NotFound.vue'

export default {
  props: ['tasks', 'taskId'],
  data () {
    return {
      newStatus: ''
    }
  },
  methods: {
    async toWork () {
      this.task.taskStatus = 'smallwarning'
      this.newStatus = 'smallwarning'
      await axios.put(`https://vuecreatetask-default-rtdb.firebaseio.com/tasks/${this.taskId}.json`, {
        taskContent: this.task.taskContent,
        taskDate: this.task.taskDate,
        taskName: this.task.taskName,
        taskStatus: this.newStatus
      })
    },
    async done () {
      this.task.taskStatus = 'smalldone'
      this.newStatus = 'smalldone'
      await axios.put(`https://vuecreatetask-default-rtdb.firebaseio.com/tasks/${this.taskId}.json`, {
        taskContent: this.task.taskContent,
        taskDate: this.task.taskDate,
        taskName: this.task.taskName,
        taskStatus: this.newStatus
      })
    },
    async cancelled () {
      this.task.taskStatus = 'smalldanger'
      this.newStatus = 'smalldanger'
      await axios.put(`https://vuecreatetask-default-rtdb.firebaseio.com/tasks/${this.taskId}.json`, {
        taskContent: this.task.taskContent,
        taskDate: this.task.taskDate,
        taskName: this.task.taskName,
        taskStatus: this.newStatus
      })
    }
  },
  computed: {
    task () {
      return this.tasks.find(e => e.id === this.taskId)
    }
  },
  components: { NotFound }
}
</script>

<style lang="scss" scoped>
.tasks-title{
  color: white;
  }

.task_header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.task_header .btn{
  height: 100%;
}

.task_header h2{
  margin-bottom: 5px;
}

.btn.smallwarning{
  background: #fff;
  color: #c25205;
  border-color: #c25205;
}

.btn.smalldanger{
  background: #fff;
  color: #e53935;
  border-color: #e53935;
}

.btn.smallprimary {
  background: #fff;
  color: #42b983;
  border-color: #42b983;
}
.btn.smalldone {
  background: #fff;
  color: #42b983;
  border-color: #42b983;
}
</style>

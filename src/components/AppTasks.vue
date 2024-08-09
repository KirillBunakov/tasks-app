<!-- eslint-disable vue/require-v-for-key -->

<template>
  <div class="container with-nav">
    <h2 class="tasks-title">Всего активных задач: {{ activeCount }}</h2>
    <div class="card" v-for="task in tasks" :key="task.id">
      <div class="task_header">
        <h2>{{ task.taskName }}</h2>
        <button class="btn" :class="task.taskStatus">
          {{ task.taskStatus === 'smallwarning' ? 'Выполняется' : task.taskStatus === 'smalldanger' ? 'Отменен' : task.taskStatus === 'smalldone' ? 'Завершен' : 'Активен' }}
          </button>
      </div>
      <hr>
      <small><p>{{ task.taskDate }}</p></small>
      <router-link :to="'/task/'+task.id" :taskId="$route.params.id">
        <button class="btn primary">Посмотреть</button>
      </router-link>
    </div>
    <div class="card" v-if="tasks.length === 0">
      <p>Добавьте первую заметку</p>
      <router-link to="/create"><button class="btn">Создать</button></router-link>
    </div>
  </div>
</template>

<script>

export default {
  props: ['tasks', 'activeCount'],
  data () {
    return {
    }
  },
  computed: {
  },
  components: {

  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    console.log(from)
    next()
  }
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

<template>
  <div class="">
    <h2 class="q" v-if="taskId"><slot></slot></h2>
    <div class="card" v-else>
    <h3 class="notFoundPage">Такой страницы нет, перейдите на главную <router-link to="/"><button class="btn">Перейти</button></router-link></h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ['taskId']
}
</script>

<style lang="scss" scoped>
div{
  color: white;
}
.notFoundPage{
  color: black;
}

.card{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>

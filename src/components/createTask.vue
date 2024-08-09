<template>
  <div class="container with-nav">
    <div class="card">
      <h1>Создать новую задачу</h1>
      <form action="" class="form-control">
        <label for="taskName">Название задачи</label>
        <input type="text" id="taskName" v-model="inputName" placeholder="Введите название задачи">

        <label for="taskDate">Дата дэдлайна</label>
        <input type="date" v-model="inputDate" id="taskDate">

        <label for="taskContent">Описание</label>
        <textarea id="taskContent" v-model="inputContent" placeholder="Введите описание задачи"></textarea>
      </form>
      <button class="btn primary" @click="$emit('add', inputName, inputDate, inputContent)" :disabled="inputName.length <= 3 || inputContent.length < 10 || inputDate === ''">Создать</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['add'],
  data () {
    return {
      inputName: '',
      inputDate: '',
      inputContent: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

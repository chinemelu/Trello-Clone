<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-starts justify-between px-4">
      <input 
        type="text" 
        :value="task.name" 
        class="p-2 mr-2 block text-xl font-bold"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      >
       <textarea
        class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')" 
        @keyup.enter="updateTaskProperty($event, 'description')"
      /> 
    </div>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    }
  },
  computed: {
    ...mapGetters(['getTask']),
    task() {
      return  this.getTask(this.$route.params.id)
    }
  },
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>

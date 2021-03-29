<template>
  <BaseDrop @drop="moveTaskOrColumn">
    <BaseDrag
      class="column"
      :transferData="{
        type: 'column',
        fromColumnIndex: columnIndex   
      }"
    >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <ColumnTask
            v-for="(task, $taskIndex) of column.tasks" 
            :key="$taskIndex"
            :task="task"
            :column="column"
            :columnIndex="columnIndex"
            :taskIndex="$taskIndex"
            :board="board"   
          />

          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
    </BaseDrag>
  </BaseDrop>
</template>

<script>
import ColumnTask from '@/components/ColumnTask';
import BaseDrag from '@/components/BaseDrag';
import BaseDrop from '@/components/BaseDrop';
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin';
export default {
  components: {
    ColumnTask,
    BaseDrag,
    BaseDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = '';
    },
  },
}
</script>

<style lang="css" scoped>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
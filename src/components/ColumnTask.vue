<template>
  <div>
    <div 
      class="task" 
      draggable
      @dragstart="pickupTask($event, taskIndex, columnIndex)"
      @click="goToTask(task)"
      @dragover.prevent
      @dragenter.prevent
      @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
      >
      <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
      <p 
        v-if="task.description"
        class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </div> 
  </div>
</template>

<script>
  export default {
    props: {
      column: {
        type: Object ,
        required: true
      },
      task: {
        type: Object,
        required: true
      },
      taskIndex: {
        type: Number,
        required: true
      },
      columnIndex: {
        type: Number,
        required: true
      },
      board: {
        type: Object,
        required: true
      }
    },
    methods: {
      moveTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex) {
        const type = e.dataTransfer.getData('type')
        if (type === 'task') {
          // if the user drops the task on a part of the board that has no listener, put the task at the end
          this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
        } else {
          this.moveColumn(e, toColumnIndex)
        }
      },
      pickupTask(e, taskIndex, fromColumnIndex) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('from-task-index', taskIndex);
        e.dataTransfer.setData('from-column-index', fromColumnIndex);
        e.dataTransfer.setData('type', 'task')
      },
      moveTask(e, toTasks, toTaskIndex) {
        const fromColumnIndex = e.dataTransfer.getData('from-column-index');
        const fromTasks = this.board.columns[fromColumnIndex].tasks;
        const fromTaskIndex = e.dataTransfer.getData('from-task-index');

        this.$store.commit('MOVE_TASK', {
          fromTasks,
          fromTaskIndex,
          toTasks,
          toTaskIndex
        })
      },
      goToTask(task) {
        this.$router.push({ name: 'task', params: { id: task.id }})
      },
    },
  }
</script>

<style lang="css" scoped>
.task { 
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
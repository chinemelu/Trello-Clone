const movingTasksAndColumnsMixin = {
  props: {
    column: {
      type: Object ,
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
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex =e.dataTransfer.getData('from-column-index');
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex,
      })
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
  },
};

export default movingTasksAndColumnsMixin
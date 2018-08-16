import * as _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import taskListActions from "../../actions/taskList.actions";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  componentWillMount() {
    this.debouncedUpdateTodaysTasks = _.debounce(
      this.props.taskListActions.updateTodaysTasks,
      300
    );
    this.debouncedUpdateYesterdaysTasks = _.debounce(
      this.props.taskListActions.updateYesterdaysTasks,
      300
    );
  }

  handleAddItem(e, isForToday) {
    const { tasks } = this.props;
    this.props.taskListActions.addItem(tasks, isForToday);
  }

  handleRemoveItem(e, isForToday) {
    const {
      yesterdaysTasks,
      todaysTasks,
      task: { taskId }
    } = this.props;
    this.props.taskListActions.removeItem(
      yesterdaysTasks,
      todaysTasks,
      taskId,
      isForToday
    );
  }

  updateTasks(name) {
    const { todaysTasks, yesterdaysTasks, taskId, isForToday } = this.props;
    const currentTask = { name, taskId };
    const tasks = isForToday ? todaysTasks : yesterdaysTasks;
    const updatedTaskList = tasks.map(
      task => (task.taskId === taskId ? currentTask : task)
    );
    return isForToday
      ? this.debouncedUpdateTodaysTasks(updatedTaskList)
      : this.debouncedUpdateYesterdaysTasks(updatedTaskList);
  }

  getTaskComponent(task, isForToday = false) {
    const { taskId } = task;
    const taskKey = isForToday
      ? `todaysTasks-${taskId}`
      : `yesterdaysTasks-${taskId}`;
    return (
      <TaskItem
        key={taskKey}
        taskId={taskId}
        task={task}
        tasks={this.props.tasks}
        handleRemoveItem={this.handleRemoveItem}
        updateTasks={this.updateTasks}
        isForToday={isForToday}
      />
    );
  }

  render() {
    const { tasks, isForToday, classType, key, label } = this.props;
    const taskComponents = tasks.map((task, index) =>
      this.getTaskComponent(task, isForToday)
    );
    const containerClass = `${key}`;
    const listContainerClass = `task-box ${classType}`;
    const taskListClass = `tasks ${classType}`;
    return (
      <div className={containerClass}>
        <span className="text">{label}</span>
        <div className={listContainerClass}>
          <ul className={taskListClass}>{taskComponents}</ul>
          <button
            className="add-item"
            onClick={e => this.handleAddItem(e, isForToday)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ today }) => ({
  todaysTasks: today.tasks.todaysTasks,
  yesterdaysTasks: today.tasks.yesterdaysTasks
});

const mapDispatchToProps = dispatch => ({
  taskListActions: bindActionCreators(taskListActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);

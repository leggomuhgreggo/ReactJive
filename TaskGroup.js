import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";

import { addTask } from "./redux";
import TaskItem from "./TaskItem";

class TaskGroup extends PureComponent {
  handleAddButtonClick = taskProps => {
    this.props.handleAddTask && this.props.handleAddTask(taskProps);
  };

  render() {
    const { taskIds, taskGroupType } = this.props;

    return (
      <Fragment>
        <span className="text">{groupLabel}</span>

        <ul className="task-list">
          {taskIds.map(id => (
            <li className="task-item layout-row">
              <TaskItem key={id} id={id} />
            </li>
          ))}
        </ul>

        <button className="add-item" onClick={this.handleAddButtonClick}>
          +
        </button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleAddTask: taskProps => dispatch(addTask(taskProps))
});

export default connect(
  null,
  mapDispatchToProps
)(TaskGroup);

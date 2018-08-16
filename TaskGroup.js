import React, { Component } from "react";
import TaskList from "../taskList/TaskList";

class TaskGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const last24Text = "Yesterday (Last 24)";
    const this24Text = "Today (This 24)";
    return (
      <div className="task-set-container">
        <TaskList
          key={"last-24"}
          label={last24Text}
          classType={"yesterday"}
          isForToday={true}
        />
        <TaskList
          key={"this-24"}
          label={this24Text}
          classType={"today"}
          isForToday={true}
        />
      </div>
    );
  }
}

export default TaskGroup;

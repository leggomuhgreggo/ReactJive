import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { getTodaysTaskIds, getYesterdaysTaskIds } from "./redux";
import TaskGroup from "./TaskGroup";

class UpcomingTasks extends PureComponent {
  render() {
    return (
      <div className="task-set-container">
        <div className="task-group-container todays-tasks-container">
          <TaskGroup groupLabel="Today's Tasks" taskIds={todaysTaskIds} />
        </div>
        <div className="task-group-container yesterdays-tasks-container">
          <TaskGroup
            groupLabel="Yesterday's Tasks"
            taskIds={yesterdaysTaskIds}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({
  todaysTaskIds: getTodaysTaskIds(tasks),
  yesterdaysTaskIds: getYesterdaysTaskIds(tasks)
});

export default connect(mapStateToProps)(UpcomingTasks);

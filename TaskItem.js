import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { removeTask, updateTask, getTaskById } from "./redux";
import TextArea from "./TextArea";

class TaskItem extends PureComponent {
  handleTextAreaChange = value => {
    const { handleUpdateTask } = this.props;
    handleUpdateTask && debounce(handleUpdateTask({ value }));
  };
  handleRemoveButtonClick = () => {
    const { id, handleRemoveTask } = this.props;
    handleRemoveTask && handleRemoveTask(id);
  };

  render() {
    const { value } = this.props;
    return (
      <Fragment>
        <TextArea onChange={this.handleTextAreaChange} value={value} />
        <div className="button-container">
          <button
            className="remove-item"
            onClick={this.handleRemoveButtonClick}
          >
            X
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ tasks }, { id }) => ({
  ...getTaskById(tasks, id)
});

const mapDispatchToProps = dispatch => ({
  handleRemoveTask: id => dispatch(removeTask(id)),
  handleUpdateTask: task => dispatch(updateTask(task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem);

import * as _ from 'lodash'
import React, { Component } from 'react'

class TaskItem extends Component {
    constructor () {
        super()
    }

    handleInputChange (e) {
        const taskText = e.target.value
        // return this.props.isForToday
        //     ? this.updateTodayTasks(taskText)
        //     : this.updateYesterdayTasks(taskText)
        return this.props.updateTasks(taskText)
    }

    render () {
        return (
            <li className="task layout-row" key={this.props.taskKey}>
                <textarea onChange={e => this.handleInputChange(e)} value={this.props.task.name}></textarea>
                <div className="button-container">
                    <button className="remove-item" onClick={e => this.props.handleRemoveItem(e, this.props.isForToday)}>X</button>
                </div>
            </li>
        )
    }
}

export const TaskItem
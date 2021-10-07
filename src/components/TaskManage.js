import React, { Component } from 'react'
import Control from './Control'
import TasksList from './TasksList'

export default class TaskManage extends Component {

    toggleForm = () => {
        this.props.toggleForm(true)
    }

    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.toggleForm}
                >
                    <i className="bi bi-plus-lg"></i>
                    Click to add task
                </button>
                {/* Seacrh components */}
                <Control
                    handleSearch={this.props.handleSearch}
                    handleSort={this.props.handleSort}
                />
                <TasksList
                    tasks={this.props.tasks}
                    handleEdit={this.props.handleEdit}
                    handleRemove={this.props.handleRemove}
                    handleFilter={this.props.handleFilter}
                />
            </div>
        )
    }
}

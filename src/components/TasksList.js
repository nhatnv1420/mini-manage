import React, { Component } from "react"
import TaskItem from "./TaskItem"

export default class TaskList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            filterName: '',
            filterStatus: '',
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
        this.setState(prevState => {
            this.props.handleFilter(prevState.filterName, prevState.filterStatus)
        })
    }

    render() {
        const tasks = this.props.tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                {...task}
                handleEdit={this.props.handleEdit}
                handleRemove={this.props.handleRemove}
            />
        })
        const { filterName, filterStatus } = this.state
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Number</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input
                                    type="text"
                                    name="filterName"
                                    value={filterName}
                                    placeholder="Filter name"
                                    className="form-control"
                                    onChange={this.handleChange}
                                />
                            </td>
                            <td>
                                <select
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={this.handleChange}
                                    className="form-select"
                                >
                                    <option value="all">Show all</option>
                                    <option value="active">Show active</option>
                                    <option value="hide">Show hide</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {tasks}
                    </tbody>
                </table>
            </div>
        )
    }
}

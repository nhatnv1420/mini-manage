import React, { Component } from 'react'
import FormAddTask from './components/FormAddTask'
import TaskManage from './components/TaskManage'

import './App.css'
export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEdit: null,
            keySearch: '',
            fiter: {
                name: '',
                status: ''
            },
            sort: {
                name: '',
                value: '',
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        const initialTasks = JSON.parse(localStorage.getItem('tasks'))
        // If initialTasks có data, return tasks = data
        // Else return tasks = []
        const tasks = initialTasks ? initialTasks : []
        return {
            tasks: tasks,
        }
    }

    // componentWillMount = () => {
    //     const initialTasks = JSON.parse(localStorage.getItem('tasks'))
    //     // if initialTasks có data, return tasks = data
    //     // else return tasks = []
    //     const tasks = initialTasks ? initialTasks : []
    //     this.setState({ tasks: tasks })
    // }

    toggleForm = (status) => {
        this.setState({
            isDisplayForm: status,
            taskEdit: null
        })
    }

    handleAddTask = (task) => {
        // Thêm task mới vào cuối mảng this.state.tasks
        const { tasks } = this.state
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        this.setState({ tasks: tasks, taskEdit: null })
    }

    handleRemove = (id) => {
        if (window.confirm('Are you sure you want to remove')) {
            const index = this.findIndex(id)
            const tasks = this.state.tasks
            tasks.splice(index, 1)
            // const tasks = tasks.filter(task => task.id !== id)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            this.setState({ tasks: tasks })
        }

        this.toggleForm(false)
    }

    handleEdit = (id) => {
        const task = this.state.tasks.find(task => task.id === id)
        this.setState({
            taskEdit: task,
            isDisplayForm: true
        })
    }

    handlEditTask = (task) => {
        // Tim task === id và gán lại giá trị mới 
        const index = this.findIndex(task.id)
        const tasks = this.state.tasks
        tasks[index] = task
        localStorage.setItem('tasks', JSON.stringify(tasks))
        this.setState({
            tasks: tasks,
            isDisplayForm: false,
            taskEdit: null,
        })
    }

    findIndex = (id) => {
        return this.state.tasks.findIndex(task => task.id === id)
    }

    handleFilter = (filterName, filterStatus) => {
        this.setState({
            filter: {
                name: filterName.toLowerCase().trim(),
                status: filterStatus
            }
        })
    }

    handleSearch = (keySearch) => {
        this.setState({ keySearch: keySearch })
    }

    handleSort = ({ name, value }) => {
        this.setState({
            sort: {
                name: name,
                value: value
            }
        })
    }

    render() {
        // localStorage.removeItem('tasks')
        let { isDisplayForm, tasks, taskEdit, filter, keySearch, sort } = this.state
        if (filter) {
            tasks = tasks.filter(task => {
                switch (filter.status) {
                    case 'active':
                        return task.status === 'true'
                    case 'hide':
                        return task.status === ''
                    default:
                        if (filter.name) {
                            return task.name.toLowerCase().indexOf(filter.name) !== -1
                        }
                        return task
                }
            })
        }

        if (keySearch) {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(keySearch) !== -1
            })
        }

        if (sort.name) {
            const { name, value } = sort
            switch (name) {
                case 'name':
                    if (value === 1) {
                        tasks = tasks.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                    } else {
                        tasks = tasks.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)
                    }
                    break;
                case 'status':
                    if (value === 1) {
                        tasks = tasks.sort((a, b) => a.status.toLowerCase() > b.status.toLowerCase() ? -1 : 1)
                    } else {
                        tasks = tasks.sort((a, b) => a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1)
                    }
                    break;
                default:
                    break;
            }
        }

        return (
            <div className="container">
                <h1 className="heading">Tasks Management</h1>
                <div className="row">
                    <div className={isDisplayForm ? "col-4" : null} >
                        {isDisplayForm ?
                            <FormAddTask
                                toggleForm={this.toggleForm}
                                taskEdit={taskEdit}
                                handleAddTask={this.handleAddTask}
                                handlEditTask={this.handlEditTask}
                            /> : null}
                    </div>
                    <div className={isDisplayForm ? "col-8" : "col-12"} >
                        <TaskManage
                            isDisplayForm={isDisplayForm}
                            tasks={tasks}
                            taskEdit={taskEdit}
                            toggleForm={this.toggleForm}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                            handleFilter={this.handleFilter}
                            handleSearch={this.handleSearch}
                            handleSort={this.handleSort}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

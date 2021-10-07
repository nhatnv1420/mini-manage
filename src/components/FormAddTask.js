import React, { Component } from 'react'

export default class FormAddTask extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            status: '',
        }
    }

    UNSAFE_componentWillMount() {
        const tasks = this.props.taskEdit
        this.setState(tasks)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.taskEdit) {
            this.setState(nextProps.taskEdit)
        } else {
            this.setState({
                id: '',
                name: '',
                status: '',
            })
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value })
    }

    handleClear = () => {
        this.setState({ name: '', status: '' })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // Nếu  có id là TH lưu lại task
        const { id, name } = this.state
        if (id) {
            this.props.handlEditTask(this.state)
        }

        // Nếu không có id và có name là TH thêm mới task 
        else if (name) {

            // this.state.id = id
            this.setState({
                id: new Date().getTime().toString(),
            })
            // lấy State đã co id và truyền vào func Thêm
            this.setState(prevState => {
                this.props.handleAddTask(prevState)

                // Thêm thành công thì đóng form và clear form
                this.props.toggleForm(false)
                return {
                    id: '',
                    name: '',
                    status: '',
                }
            })
        }
    }

    render() {

        return (
            <form className="add-task" onSubmit={this.handleSubmit}>
                <span className="label-form">
                    {this.state.id ? 'Edit task' : 'Add task'}
                </span>
                <i
                    className="bi bi-x-lg toggleAddTask"
                    onClick={() => this.props.toggleForm(false)}
                ></i>
                <div>
                    <label className="form-label" htmlFor="name">Name task</label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.name}
                            className="form-control"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="form-label" htmlFor="status">Status</label>
                    <div className="input-group mb-3">
                        <select
                            id="status"
                            className="form-select"
                            name="status"
                            value={this.state.status}
                            onChange={this.handleChange}
                        >
                            <option value={true}>Active</option>
                            <option value={''}>Hide</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button
                            type="submit"
                            className="btn btn-success"
                        >

                            {this.state.id ? 'Save' : 'Add'}
                        </button>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={this.handleClear}
                        >Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}

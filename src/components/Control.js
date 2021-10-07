import React, { Component } from 'react'

export default class Control extends Component {
    constructor(props) {
        super(props)

        this.state = {
            keySearch: '',
            sort: {
                name: '',
                value: '',
            }
        }
    }

    handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({ [name]: value })
    }

    handleSort = (sortName, sortValue) => {
        this.setState({
            sort: {
                name: sortName,
                value: sortValue,
            }
        })

        this.setState(prevState => {
            this.props.handleSort(prevState.sort)
        })
        this.setState()
    }

    render() {
        const { name, value } = this.state.sort
        return (
            <div className="row mt-3">
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            name="keySearch"
                            placeholder="Search..."
                            onChange={this.handleChange}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.props.handleSearch(this.state.keySearch)}
                        >Search</button>
                    </div>
                </div>
                <div className="col-6">
                    <div className="nav-item dropdown">
                        <button className="btn btn-primary  dropdown-toggle" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Sort
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li
                                className={name === 'name' && value === 1 ? "dropdown-item sortActive" : "dropdown-item"}
                                onClick={() => this.handleSort('name', 1)}
                            >Name: A - Z</li>
                            <li
                                className={name === 'name' && value === 0 ? "dropdown-item sortActive" : "dropdown-item"}
                                onClick={() => this.handleSort('name', 0)}
                            >Name: Z - A</li>
                            <li
                                className={name === 'stats' && value === 1 ? "dropdown-item sortActive" : "dropdown-item"}
                                onClick={() => this.handleSort('status', 1)}
                            >Status: Active</li>
                            <li
                                className={name === 'status' && value === 0 ? "dropdown-item sortActive" : "dropdown-item"}
                                onClick={() => this.handleSort('status', 0)}
                            >Status: Hide</li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

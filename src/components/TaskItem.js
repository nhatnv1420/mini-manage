import React, { Component } from 'react'

export default class TaskItem extends Component {
    render() {
        const { id, index, name, status } = this.props;
        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{name}</td>
                    <td>
                        <span
                            type="span"
                            className={status ? 'btn-info state' : 'btn-danger state'}
                        >
                            {status ? 'Active' : 'Hide'}
                        </span>
                    </td>
                    <td>
                        <div className="row">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => this.props.handleEdit(id)}
                                >Edit</button>
                            </div>
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => this.props.handleRemove(id)}
                                >Delete</button>
                            </div>
                        </div>
                    </td>

                </tr>
            </React.Fragment>
        )
    }
}

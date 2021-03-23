import React, { Component } from 'react'
import { DeletEmp } from '../../Queries/Awarness Queries/Awarness'
import { Mutation } from 'react-apollo'
import { Button } from 'reactstrap'

export default class DeleteEmployee extends Component {
    constructor(props) {
        super(props)

    }



    render() {
        return (
            <Mutation mutation={DeletEmp} variables={{ employee_id: this.props.employeeId }}>
                {
                    (DeleEmployee, { data }) => {
                        return (
                            <Button color="danger" onClick={() => DeleEmployee()}>Delete</Button>

                        )
                    }
                }

            </Mutation>
        )
    }
}
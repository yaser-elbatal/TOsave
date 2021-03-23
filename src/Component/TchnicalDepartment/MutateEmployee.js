import React, { Component } from 'react'
import AddEmployeeForm from './AddEmployeeForm'
import { Mutation } from 'react-apollo';
import PopUp from '../Branches/PopUp';
import { AddEmployee } from '../../Queries/Techenical/techenical';

export class MutateEmployee extends Component {
    state = {
        updateData: {}
    }
    updatenewdata = newData => {

        this.setState({ updateData: { id: newData } });
    };


    updateHandle = updateEmployee => {
        const { updateData } = this.state
        const { DepId } = this.props

        updateEmployee({
            variables: { dep_id: DepId, userIds: updateData.id }
        });
    };

    render() {
        return (
            <Mutation mutation={AddEmployee}>
                {
                    (updateEmployee, { data }) => (
                        <PopUp
                            {...{
                                buttonLabel: "اضافه",
                                buttonColor: "success",
                                body: (
                                    <AddEmployeeForm
                                        data={this.props.data}
                                        clearData={this.clearData}
                                        updateData={this.updatenewdata}
                                    />
                                ),
                                submitLabel: "اضافه",
                                cancelLabel: "تراجع",
                                onSubmit: () => this.updateHandle(updateEmployee)
                            }}
                        />
                    )

                }

            </Mutation>
        )
    }
}

export default MutateEmployee

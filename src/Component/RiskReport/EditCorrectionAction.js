import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Edit_Correct } from '../../Queries/RiskAssmentsQuery/RiskAssments'
import PopUp from '../../views/Components/Custom/PopUp/PopUp';
import CreateCorrectiveAciton from './CreateCorrectiveAciton';

export class EditCorrectionAction extends Component {
    state = {
        updateData: {}
    };

    updateNewData = newData => {
        let updateData = this.state.updateData;

        this.setState({ updateData: { ...updateData, ...newData } });
    };

    createHandle = CreateComent => {
        CreateComent();
    };

    render() {
        console.log(this.props.data);

        const { comment, image, } = this.state.updateData;
        return (
            <Mutation mutation={Edit_Correct} variables={{ detail_id: this.props.data.detail_id, created_by: this.props.data.created_by, comment, image }}>
                {
                    (CreateComent, { data }) => {
                        return (
                            <PopUp
                                {...{
                                    buttonLabel: "اضافه حل للمشكله",
                                    buttonColor: "success",
                                    body: (
                                        <CreateCorrectiveAciton
                                            updatedData={this.updatedData}
                                        />
                                    ),
                                    submitLabel: "اضافه",
                                    cancelLabel: "تراجع",
                                    onSubmit: () => this.createHandle(CreateComent),


                                }}
                            />
                        )
                    }
                }

            </Mutation>
        )
    }
}

export default EditCorrectionAction

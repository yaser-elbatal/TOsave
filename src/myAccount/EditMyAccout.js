import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import Edit_Account from './EditQuery'
import PopUp from './PopUp';
import my_Acoount from './myAccountQuery';
import UpdateAccountForm from './UpdateAccountForm'
import _ from 'lodash'
import imgUpload from "./imgUpload"


export class EditMyAccout extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Admin: this.props.Admin[0],
            updateData: {},
        }
    }

    clearData = () => this.setState({ updatedData: {} });


    updateData = (accountNewData) => {
        let Admin = this.state.Admin;
        this.setState({
            Admin: { ...Admin, ...accountNewData }
        })
    }
    

    updateHandle = async(updateMyaccount) => {

        let Admin = this.state.Admin
        let accountNewData = this.state.updatedData;
        Admin = { ...Admin, ...accountNewData };
        let id = this.state.Admin.id

        if (this.state.Admin.file)
            await imgUpload(this.state.Admin.file, (u,l) => {
                console.log({u,l});
            })

        this.setState({ Admin });
        updateMyaccount()

    }

    

    
    render() {
        return (
            <Mutation mutation={Edit_Account} variables={{
                user_id: this.state.Admin.id,
                name: this.state.Admin.name,
                email: this.state.Admin.email,
                phone: this.state.Admin.phone,
                avatar: this.state.Admin.avatar

            }} 
            refetchQueries={[{ query: my_Acoount, variables: { user_id: this.state.Admin.id } }]}>
                {(updateMyaccount, { data }) => (
                    <React.Fragment>

                        <PopUp {...{
                            buttonLabel: "تعديل",
                            buttonColor: "success",
                            body: <UpdateAccountForm
                                data={this.state.Admin}
                                clearData={this.clearData}
                                updateData={this.updateData} />,
                            submitLabel: "تعديل",
                            cancelLabel: "تراجع",
                            onSubmit: async() => await this.updateHandle(updateMyaccount),
                        }} />
                    </React.Fragment>
                )


                }
            </Mutation>
        )
    }
}

export default EditMyAccout

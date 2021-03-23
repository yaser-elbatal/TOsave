import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import axios from "axios"
import CreateMemberForm from "./CreateMemberForm"
import { List_Members, Create_Member } from '../../../../../services/queries/Maintainance/Members';


export default class CreateMember extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdData: {}
        }
    }

    componentDidMount() {

    }

    updateData = (editedNewData) => {
        let createdData = this.state.createdData;
        this.setState({
            createdData: { ...createdData, ...editedNewData }
        })
    }

    createMemberAPI = async userData => {
        return await axios({
            method: "POST",
            data: userData,
            url: `http://62.171.164.224:3000/signup`,
            headers: { "content-type": `application/json` }
        });
    };

    createHandle = async (createMember) => {
        let createdData = { ...this.state.createdData, user_type: "company_user" }

        let createMemberAPI = await this.createMemberAPI(createdData);

        if (createMemberAPI.status == 200){
            createMember({
                variables: { company_id: this.props.companyId, user_id: createMemberAPI.data.id },
                refetchQueries: ['ListMembers']
            })}
    }


    render() {
        return (
            <Mutation mutation={Create_Member}>
                {(createMember, { data }) => {
                    return <CreateMemberForm updateData={this.updateData} onSubmit={() => { this.createHandle(createMember); this.props.toggle(); }} />
                }}
            </Mutation>
        );
    }
};
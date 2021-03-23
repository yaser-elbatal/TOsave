import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { List_Members, Update_Member } from "../../../../../services/queries/Maintainance/Members";
import _ from "lodash";
import axios from "axios"
import PopUp from "../../../Custom/PopUp/PopUp";
import UpdateMemberForm from "./UpdateMemberForm";
import { store as notificationStore } from 'react-notifications-component';

export default class UpdateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedData: _.pick(this.props.mem, [
        "id", "username", "active", "display_name",
      ]),
    };
  }

  componentDidMount() {
  }

  clearData = () => this.setState({ updatedData: {} });

  updateData = newData => {
    let updatedData = this.state.updatedData;
    this.setState({
      updatedData: { ...updatedData, ...newData }
    });
  };

  updatePasswordAPI = async userData => {
    return await axios({
      method: "POST",
      data: userData,
      url: `http://62.171.164.224:3000/changePassword`,
      headers: { "content-type": `application/json` }
    });
  };

  updateHandle = async updateMem => {

    let updatedData = this.state.updatedData
    let updatePasswordAPI = {};

    if (updatedData.password && updatedData.password == updatedData.confirmPassword)
      updatePasswordAPI = await this.updatePasswordAPI(
        _.pick(updatedData, ['username', 'password', 'confirmPassword',])
      );

    if ((updatePasswordAPI.status && updatePasswordAPI.status != 200) || (updatedData.password && updatedData.password != updatedData.confirmPassword))
      notificationStore.addNotification({
        // title: "Wonderful!",
        message: "خطأ فى تعديل كلمة المرور",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          // onScreen: true
        },
      })

    if (Object.keys(_.omit(updatedData, ['password', 'confirmPassword',])).length)
      updateMem({
        variables: _.pick(updatedData, ['id', 'username', 'display_name', 'active',]),
        refetchQueries: ['ListMembers']
      });
  };

  deleteHandle = updateMem => {
    console.log(this.state.updatedData);

    let updatedData = this.state.updatedData;
    updatedData.active = !updatedData.active;
    this.setState({ updatedData });


    updateMem({
      variables: { ...this.state.updatedData },
      refetchQueries: [`ListMembers`]
    });
  };

  render() {
    return (
      <Mutation mutation={Update_Member}>
        {(updateMem, { data }) => (
          <React.Fragment>
            <td>
              <PopUp
                {...{
                  buttonLabel: "تعديل",
                  buttonColor: "success",
                  body: (
                    <UpdateMemberForm
                      data={this.state.updatedData}
                      clearData={this.clearData}
                      updateData={this.updateData}
                    />
                  ),
                  submitLabel: "تعديل",
                  cancelLabel: "تراجع",
                  onSubmit: () => this.updateHandle(updateMem)
                }}
              />
            </td>
            <td>
              <button
                className={`btn btn-${!this.state.updatedData.active ? "warning" : "danger"}`}
                onClick={e => this.deleteHandle(updateMem)}
              >
                {!this.state.updatedData.active ? "تفعيل" : "إلغاء تفعيل"}
              </button>
            </td>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

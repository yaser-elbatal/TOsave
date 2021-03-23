import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Edit_Manager from "../../Queries/BranshesQuery/EditManager";
import Set_User_Type from "../../Queries/BranshesQuery/SetUserType";
import Get_employees from "../../Queries/BranshesQuery/BranchesEmployee";
import PopUp from "./PopUp";
import EditManagerForm from "./EditManagerForm";

export class EditManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      updateData: {},
      managers: { oldManager: "branchEmployee", newManager: "branchEmployee" }
    };
  }

  componentDidUpdate(prevState, prevProps) {
    let { data } = this.props
    if (JSON.stringify(prevProps.data) != JSON.stringify(data))
      this.setState({ data })
  }

  clearData = () => {
    this.setState({ updateData: {} });
  };

  updatenewdata = newData => {
    this.setState({ updateData: { id: newData } });
  };

  updateHandle = async (updateManager, updateOldManager, updateNewManager) => {
    let { updateData, data } = this.state

    this.setState({
      managers: {
        newManager: data.find(emp => emp.id == updateData.id).employee_user.id,
        oldManager:
          data.find(emp => emp.employee_user.user_type == 'b_manager') ?
            data.find(emp => emp.employee_user.user_type == 'b_manager').employee_user.id :
            false
      }, updateData: {},
    });

    let updMng = await updateManager();

    if (updMng) {
      updateNewManager();

      if (this.state.managers.oldManager)
        updateOldManager();
    }

  };

  render() {

    let { managers } = this.state

    return (
      <Mutation mutation={Set_User_Type} variables={{ id: managers.newManager, user_type: "branchManager" }} >
        {(updateNewManager, { data: d1 }) => (
          <Mutation mutation={Set_User_Type} variables={{ id: managers.oldManager, user_type: "branchManager" }} >
            {(updateOldManager, { data: d2 }) => (

              <Mutation
                mutation={Edit_Manager}
                variables={{
                  branch_id: this.props.branch_id,
                  employee_id:
                    this.state.updateData.id ||
                    this.props.manager && this.props.manager.emp_branch.branch_manager
                }}
              >
                {(updateManager, { data: d3 }) => (
                  <React.Fragment>
                    <PopUp
                      {...{
                        buttonLabel: "تعديل",
                        buttonColor: "success",
                        body: (
                          <EditManagerForm
                            data={this.state.data}
                            clearData={this.clearData}
                            updateData={this.updatenewdata}
                          />
                        ),
                        submitLabel: "اضافه",
                        cancelLabel: "تراجع",
                        onSubmit: () => this.updateHandle(updateManager, updateOldManager, updateNewManager)
                      }}
                    />
                  </React.Fragment>
                )}
              </Mutation>


            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default EditManager;

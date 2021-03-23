import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Edit_Branch from "../../Queries/BranshesQuery/EditBranch";
import Get_Detailes from "../../Queries/BranshesQuery/BranshDetailes";
import PopUp from "./PopUp";
import _ from "lodash";
import EditBranchForm from "./EditBranchForm";

export class EditBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: this.props.branch,
      loading: false,
      updateData: {}
    };
  }

  clearData = () => {
    this.setState({ updateData: {} });
  };

  updateData = NewData => {
    let branch = this.state.branch;
    this.setState({ branch: { ...branch, ...NewData } });
  };

  updateHandle = updatebranch => {
    let branch = this.state.branch;
    let updateData = this.state.updateData;
    branch = { ...branch, ...updateData };
    this.setState({ branch });

    updatebranch();
  };

  render() {
    return (
      <Mutation
        mutation={Edit_Branch}
        variables={{
          branch_id: this.state.branch.id,
          branch_number: this.state.branch.branch_number,
          name: this.state.branch.name,
          name_en: this.state.branch.name_en,
          contact_numbers: this.state.branch.contact_numbers,
          neighborhood: this.state.branch.neighborhood,
          about: this.state.branch.about
        }}
        refetchQueries={[
          {
            query: Get_Detailes,
            variables: { branch_id: this.state.branch.id }
          }
        ]}
      >
        {(updatebranch, { data }) => (
          <React.Fragment>
            <PopUp
              {...{
                buttonLabel: "تعديل",
                buttonColor: "success",
                body: (
                  <EditBranchForm
                    data={this.state.branch}
                    clearData={this.clearData}
                    updateData={this.updateData}
                  />
                ),
                submitLabel: "تعديل",
                cancelLabel: "تراجع",
                onSubmit: () => this.updateHandle(updatebranch)
              }}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default EditBranch;

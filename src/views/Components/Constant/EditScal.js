import React, { Component } from "react";
import Edit_scale from "./EditScaleQuery";
import { Mutation } from "react-apollo";
import Get_const from "./ConstanceQuery";
import PopUp from "./PopUp";
import EditUpdateForm from "./EditUpdateForm";

export class EditScal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataScal: this.props.DataScal,
      updateData: {}
    };
  }

  updateData = Updated => {
    let DataScal = this.state.DataScal;
    this.setState({ DataScal: { ...DataScal, ...Updated } });
  };

  HandalChange = editData => {
    let DataScal = this.state.DataScal;
    let updateData = this.state.updateData;
    DataScal = { ...DataScal, ...updateData };
    this.setState({ DataScal });

    editData();
  };
  render() {
    return (
      <Mutation
        mutation={Edit_scale}
        variables={{
          scalars_id: this.state.DataScal.id,
          organization_hour_price: this.state.DataScal.organization_hour_price,
          provider_to_home_price: this.state.DataScal.provider_to_home_price,
          sitter_hour_price: this.state.DataScal.sitter_hour_price,
          fine_minute_price: this.state.DataScal.fine_minute_price,
          app_percentage: this.state.DataScal.app_percentage
        }}
        refetchQueries={["Get_scrles"]}
      >
        {(editData, { data }) => {
          return (
            <React.Fragment>
              <PopUp
                {...{
                  buttonLabel: "تعديل",
                  buttonColor: "success",
                  body: (
                    <EditUpdateForm
                      data={this.state.DataScal}
                      clearData={this.clearData}
                      updateData={this.updateData}
                    />
                  ),
                  submitLabel: "تعديل",
                  cancelLabel: "تراجع",
                  onSubmit: () => this.HandalChange(editData)
                }}
              />
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default EditScal;

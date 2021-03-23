import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { AddTchnicalDepartment } from "../../Queries/Techenical/techenical";
import AddTechDepForm from "./AddTechDepForm";
import { validateNameAr, validateNameEn } from "../Validation";
import { store } from "react-notifications-component";

export class AddTechDep extends Component {
  state = {
    updatedate: {},
  };

  updateddate = (newData) => {
    let { updatedate } = this.state;
    this.setState({ updatedate: { ...updatedate, ...newData } });
  };

  _validate = () => {
    const { name, name_en } = this.state.updatedate;
    let nameAr = validateNameAr(name_en);
    let nameEn = validateNameEn(name);
    return nameAr || nameEn;
  };

  CreateHandle = (createDebart) => {
    if (this._validate()) {
      return store.addNotification({
        title: "تنبيه",
        message: this._validate(),
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }
    else {
      createDebart();

    }
  };

  render() {
    const { name, name_en } = this.state.updatedate;

    return (
      <Mutation mutation={AddTchnicalDepartment} variables={{ name, name_en }}>
        {(createDebart, { data }) => {
          return (
            <AddTechDepForm
              updatedate={this.updateddate}
              onSubmit={() => {
                this.CreateHandle(createDebart);
                this.props.toggle();
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

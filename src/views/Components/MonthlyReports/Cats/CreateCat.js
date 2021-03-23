import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  Create_Cat,
  Create_Private_Cat,
} from "../../../../services/queries/MonthlyReports/Cats";
import CreateCatForm from "./CreateCatForm";
import { store } from "react-notifications-component";
import {
  validateNameAr,
  validateNameEn,
  validateBranchNumber,
} from "../../../../Component/Validation";

export default class CreateCat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdData: {
        isGeneral: true,
      },
    };
  }

  updateData = (editedNewData) => {
    let createdData = this.state.createdData;
    this.setState({
      createdData: { ...createdData, ...editedNewData },
    });
  };

  _validate = () => {
    const { name, name_en, branchId, isGeneral } = this.state.createdData;
    let nameAr = validateNameAr(name_en);
    let nameEn = validateNameEn(name);
    let branch = "";
    if (isGeneral) {
      return nameAr || nameEn;
    } else {
      branch = validateBranchNumber(branchId);
      return nameAr || nameEn || branch;
    }
  };

  createHandle = (createCat) => {
    console.log("state", this.state.createdData);

    if (this._validate())
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
    createCat({
      variables: this.state.createdData.isGeneral
        ? {
          name: this.state.createdData.name,
          name_en: this.state.createdData.name_en,
        }
        : {
          name: this.state.createdData.name,
          name_en: this.state.createdData.name_en,
          branchId: this.state.createdData.branchId,
        },
      refetchQueries: [`ListCats`],
    });
  };

  render() {
    return (
      <Mutation
        mutation={
          this.state.createdData.isGeneral ? Create_Cat : Create_Private_Cat
        }
      >
        {(createCat, { data }) => {
          return (
            <CreateCatForm
              updateData={this.updateData}
              onSubmit={() => {
                this.createHandle(createCat);
                this.props.toggle();
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

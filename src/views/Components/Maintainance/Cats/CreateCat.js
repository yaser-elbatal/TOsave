import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Create_Cat } from "../../../../services/queries/Maintainance/MaintainanceReports/Cats";
import CreateCatForm from "./CreateCatForm";
import { store } from "react-notifications-component";
import {
  validateNameAr,
  validateNameEn,
} from "../../../../Component/Validation";

export default class CreateCat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdData: {},
    };
  }

  componentDidMount() {}

  updateData = (editedNewData) => {
    let createdData = this.state.createdData;
    this.setState({
      createdData: { ...createdData, ...editedNewData },
    });
  };

  _validate = () => {
    const { name, name_ar } = this.state.createdData;
    let nameAr = validateNameAr(name_ar);
    let nameEn = validateNameEn(name);
    return nameAr || nameEn;
  };

  createHandle = (createCat) => {
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
      variables: { ...this.state.createdData },
      refetchQueries: [`ListCats`],
    });
  };

  render() {
    return (
      <Mutation mutation={Create_Cat}>
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

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Create_City } from "../../../services/queries/Cities";
import CreateCityForm from "./CreateCityForm";
import { store } from "react-notifications-component";
import { validateNameAr, validateNameEn } from "../../../Component/Validation";

export default class CreateCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdData: {},
    };
  }

  updateData = (editedNewData) => {
    let createdData = this.state.createdData;
    this.setState({
      createdData: { ...createdData, ...editedNewData },
    });
  };

  _validate = () => {
    const { name, name_en } = this.state.createdData;
    let nameAr = validateNameAr(name_en);
    let nameEn = validateNameEn(name);
    return nameAr || nameEn;
  };

  createHandle = (createCity) => {

    let val = this._validate()

    if (!val) {
      createCity({
        variables: { ...this.state.createdData },
        refetchQueries: [`ListCities`],
      });
    }
    else {
      return store.addNotification({
        title: "تنبيه",
        message: this._validate(),
        type: "danger",
        insert: "bottom",
        container: "center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    }




  };

  render() {
    return (
      <Mutation mutation={Create_City}>
        {(createCity, { data }) => {
          return (
            <CreateCityForm
              updateData={this.updateData}
              onSubmit={() => {
                this.createHandle(createCity);
                this.props.toggle();
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

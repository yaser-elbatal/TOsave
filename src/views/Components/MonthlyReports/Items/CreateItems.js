import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Create_Item } from "../../../../services/queries/MonthlyReports/Items";
import _ from "lodash";
import CreateItemForm from "./CreateItemForm";
import { store } from "react-notifications-component";
import {
  validateNameAr,
  validateNameEn,
  validateImagesNum,
} from "../../../../Component/Validation";

export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdData: {
        images_number: 1,
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
    const { name, name_en, images_number } = this.state.createdData;
    let nameAr = validateNameAr(name_en);
    let nameEn = validateNameEn(name);
    let imageNum = validateImagesNum(images_number);

    return nameAr || nameEn || imageNum;
  };

  createHandle = (createItem) => {
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
    createItem({
      variables: {
        ...this.state.createdData,
        category_id: this.props.category_id,
      },
      refetchQueries: [`ListItems`], //{ query: List_Areas, variables: {city_id: this.props.city_id} }
    });
  };

  render() {
    return (
      <Mutation mutation={Create_Item}>
        {(createItem, { data }) => {
          return (
            <CreateItemForm
              updateData={this.updateData}
              onSubmit={() => {
                this.createHandle(createItem);
                this.props.toggle();
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  Insert_Categories,
  List_Items,
  Insert_Items,
} from "../../../Queries/RiskAssmentsQuery/RiskAssments";
import CreateItemsForm from "./CreateItemForm";
import { store } from "react-notifications-component";
import {
  validateNameAr,
  validateNameEn,
  validateNormalState,
} from "../../Validation";

export class AddCategories extends Component {
  state = {
    updateData: {},
    summation: this.props.sum,
  };

  updateNewData = (newData) => {
    let updateData = this.state.updateData;

    this.setState({ updateData: { ...updateData, ...newData } });
  };

  _validate = () => {
    const { title, title_en, normal_state } = this.state.updateData;
    let nameAr = validateNameAr(title);
    let nameEn = validateNameEn(title_en);
    let normalState = validateNormalState(normal_state);
    return nameAr || nameEn || normalState;
  };

  createHandle = async (createItem) => {
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
    try {
      if (this.state.updateData.percentage != 0) {
        let created = await createItem();

        if (created)
          this.setState({
            summation:
              parseInt(this.state.summation) +
              parseInt(this.state.updateData.percentage),
          });
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  render() {
    const { title, title_en, normal_state, percentage } = this.state.updateData;
    return (
      <Mutation
        mutation={Insert_Items}
        variables={{
          title,
          title_en,
          normal_state,
          category_id: this.props.category_id,
          percentage,
        }}
      >
        {(createItem, { data }) => {
          return (
            <CreateItemsForm
              updateData={this.updateNewData}
              sum={this.state.summation}
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

export default AddCategories;

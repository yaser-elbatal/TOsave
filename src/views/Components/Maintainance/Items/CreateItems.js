import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Create_Item } from "../../../../services/queries/Maintainance/MaintainanceReports/Items";
import _ from "lodash";
import CreateItemForm from "./CreateItemForm";
import { store } from "react-notifications-component";
import {
  validateNameAr,
  validateNameEn,
} from "../../../../Component/Validation";

export default class CreateItem extends Component {
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
    const { name, name_ar } = this.state.createdData;
    let nameAr = validateNameAr(name_ar);
    let nameEn = validateNameEn(name);

    return nameAr || nameEn;
  };

  createHandle = (createItem) => {
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

    let createdData = this.state.createdData;
    let fast = createdData.fast;
    delete createdData.fast;

    let items = [];

    if (fast) {
      items = fast.split("\n").map((e) => {
        let tex = e.split("*");
        return {
          category_id: parseInt(this.props.category_id),
          name_ar: tex[0],
          name: tex[1],
        };
      });
    } else {
      items = [
        { ...createdData, category_id: parseInt(this.props.category_id) },
      ];
    }

    createItem({
      variables: { items },
      refetchQueries: [`ListItems`],
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

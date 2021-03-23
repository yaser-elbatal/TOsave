import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  Create_Company,
  List_Companies,
} from "../../../../services/queries/Maintainance/Companies";
import CreateCatForm from "./CreateCompanyForm";
import { store } from "react-notifications-component";
import {
  validateNeighbor,
  validateAvatar,
  validateCompany,
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
    const { avatar, company_name, neighborhood } = this.state.createdData;
    let companyName = validateCompany(company_name);
    let neighbor = validateNeighbor(neighborhood);
    let image = validateAvatar(avatar);

    return companyName || neighbor || image;
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
      refetchQueries: [{ query: List_Companies }],
    });
    this.props.toggle();
  };

  render() {
    return (
      <Mutation mutation={Create_Company}>
        {(createCat, { data }) => {
          return (
            <CreateCatForm
              updateData={this.updateData}
              onSubmit={() => {
                this.createHandle(createCat);
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Insert_Categories } from "../../../Queries/RiskAssmentsQuery/RiskAssments";
import CreateCategoriesForm from "./CreateCategoriesForm";

export class AddCategories extends Component {
  state = {
    updateData: {},
    summation: this.props.sum,
  };

  updateNewData = newData => {
    let updateData = this.state.updateData;

    this.setState({ updateData: { ...updateData, ...newData } });
  };

  createHandle = async createItem => {

    try {
      if (this.state.updateData.precentage != 0) {
        let created = await createItem();

        if (created)
          this.setState({
            summation: parseInt(this.state.summation) + parseInt(this.state.updateData.precentage)
          })
      }

    } catch (error) {

    }

  };

  render() {

    const { name, name_en, precentage } = this.state.updateData;

    return (
      <Mutation
        mutation={Insert_Categories}
        variables={{
          name,
          name_en, precentage
        }}
      >
        {(createItem, { data }) => {
          return (
            <CreateCategoriesForm
              addedPercentage={this.state.addedPercentage}
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

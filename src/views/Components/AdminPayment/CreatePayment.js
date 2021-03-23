import React, { Component } from "react";
import CreatePaymentForm from "./CreatePaymentForm";
import { Mutation } from "react-apollo";
import { Create_payment, UPDTE_PAYMENT } from "./CreatePaymentQuery";
import EditMyAccout from "../../../myAccount/EditMyAccout";
import { loadPartialConfig } from "@babel/core";

export class CreatePayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdData: {}
    };
  }

  updateData = editedNewData => {
    let createdData = this.state.createdData;
    this.setState({
      createdData: { ...createdData, ...editedNewData }
    });
  };

  createHandle = async (CreatePayment, updateID) => {
    let CREATE_PAYMENT = await CreatePayment({
      variables: { ...this.state.createdData },
      refetchQueries: [`getPaymentInfo`]
    });
    let {
      data: {
        insert_payment_info: { returning }
      }
    } = CREATE_PAYMENT;
    await updateID({
      variables: { user_id: this.props.user_id, payment_id: returning[0].id },
      refetchQueries: [`getPaymentInfo`]
    });
  };

  render() {
    return (
      <div>
        <Mutation mutation={Create_payment}>
          {
            (CreatePayment, { data }) => {
              return (
                <Mutation mutation={UPDTE_PAYMENT}>
                  {(updateID, mu) => (
                    <CreatePaymentForm
                      updateData={this.updateData}
                      onSubmit={() => {
                        this.createHandle(CreatePayment, updateID)
                        this.props.toggle();
                      }} />)
                  }
                </Mutation>
              );
            }}
        </Mutation>
      </div>
    );
  }
}

export default CreatePayment;

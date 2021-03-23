import React, { Component } from "react";
import PopUp from "../../../Component/Branches/PopUp";
import { Mutation } from "react-apollo";
import Edit_payment from "./EditQuery";
import AdminPaymentQuery from "./AdminPaymentQuery";
import UpdateForm from "./UpdateForm";
import _ from "lodash";

export class EditPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: _.omit(this.props.payment, ["__typename"]),
      updateData: {}
    };
  }

  clearData = () => this.setState({ updateData: {} });

  updateData = paymentnewData => {
    let payment = this.state.payment;
    this.setState({ payment: { ...payment, ...paymentnewData } });
  };

  updateHandle = updatePayment => {
    let payment = this.state.payment;
    let paymentnewData = this.state.updateData;
    payment = { ...payment, ...paymentnewData };
    this.setState({ payment });
    updatePayment();
  };

  render() {
    let user_id = JSON.parse(localStorage.getItem("AnnatLogin")).id;

    return (
      <Mutation
        mutation={Edit_payment}
        variables={{
          payment_id: this.state.payment.id,
          holder_name: this.state.payment.holder_name,
          cvc: this.state.payment.cvc,
          card_number: this.state.payment.card_number,
          month: this.state.payment.month,
          year: this.state.payment.year
        }}
        refetchQueries={[
          { query: AdminPaymentQuery, variables: { user_id: user_id } }
        ]}
      >
        {(updatePayment, { data }) => (
          <React.Fragment>
            <PopUp
              {...{
                buttonLabel: "تعديل",
                buttonColor: "success",
                body: (
                  <UpdateForm
                    data={this.state.payment}
                    clearData={this.clearData}
                    updateData={this.updateData}
                  />
                ),
                submitLabel: "تعديل",
                cancelLabel: "تراجع",
                onSubmit: () => this.updateHandle(updatePayment)
              }}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default EditPayment;

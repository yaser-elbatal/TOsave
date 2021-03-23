import React, { Component } from "react";
import { Edit_items } from "../../../Queries/RiskAssmentsQuery/RiskAssments";
import PopUp from "../../../views/Components/Custom//PopUp/PopUp";
import UpdateItemsForm from "./UpdateItemsForm";
import { Mutation } from "react-apollo";

export class EditItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      risk: this.props.Ris,
      updateData: {}
    };
  }

  updatedData = categoriesNewData => {
    let risk = this.state.risk;
    this.setState({ risk: { ...risk, ...categoriesNewData } });
  };

  clearData = () => {
    this.setState({ updateData: {} });
  };

  deleteHandle = changeData => {
    let { risk } = this.state;

    this.setState({ risk: { ...risk, isNeglected: !risk.isNeglected } }, () =>
      changeData()
    );
  };
  updateHandle = changedata => {
    let risk = this.state.risk;
    // let categoriesNewData = this.state.updateData;
    risk = { ...risk, };

    this.setState({ risk }, () => changedata());
    console.log(risk);

  };

  render() {
    return (
      <Mutation
        mutation={Edit_items}
        variables={{
          item_id: this.state.risk.id,
          title: this.state.risk.title,
          title_en: this.state.risk.title_en,
          normal_state: this.state.risk.normal_state,
          isNeglected: this.state.risk.isNeglected,
          percentage: this.state.risk.percentage
        }}
      >
        {(changeData, { data }) => (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <PopUp
              {...{
                buttonLabel: "تعديل",
                buttonColor: "success",
                body: (
                  <UpdateItemsForm
                    data={this.state.risk}
                    clearData={this.clearData}
                    updatedData={this.updatedData}
                  />
                ),
                submitLabel: "تعديل",
                cancelLabel: "تراجع",
                onSubmit: () => this.updateHandle(changeData)
              }}
            />
            <button
              style={{ opacity: this.state.risk.isNeglected ? ".5" : "1" }}
              className={`btn btn-${
                this.state.risk.isNeglected ? "warning" : "danger"
                }`}
              onClick={e => this.deleteHandle(changeData)}
            >
              {this.state.risk.isNeglected ? "استرجاع" : "حذف"}
            </button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditItems;

import React, { Component } from "react";
import {
  Edit_Categories,
  Get_categories
} from "../../../Queries/RiskAssmentsQuery/RiskAssments";
import PopUp from "../../../views/Components/Custom//PopUp/PopUp";
import UpdateCategoriesForm from "./UpdateCategoriesForm";
import { Mutation } from "react-apollo";

export class EditRiskCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      risk: this.props.Ris,
      updateData: {},
      sum: this.props.sum
    };
  }

  updatedData = categoriesNewData => {
    let risk = this.state.risk;
    this.setState({ risk: { ...risk, ...categoriesNewData } });
  };

  updateHandle = async changeData => {

    let { risk } = this.state;
    risk = { ...risk };
    this.setState({ risk });

    if (risk.precentage != 0) {

      let Handleupdate = await changeData();
      if (Handleupdate)

        this.setState({ sum: parseInt(this.state.sum) + parseInt(risk.precentage) })
    }



  }

  clearData = () => {
    this.setState({ updateData: {} });
  };

  deleteHandle = changeData => {
    let { risk } = this.state;

    this.setState({ risk: { ...risk, isNeglected: !risk.isNeglected } }, () =>
      changeData()
    );
  };

  render() {
    return (
      <Mutation
        mutation={Edit_Categories}
        variables={{
          category_id: this.state.risk.id,
          name: this.state.risk.name,
          name_en: this.state.risk.name_en,
          isNeglected: this.state.risk.isNeglected,
          precentage: this.state.risk.precentage
        }}
      >
        {(changeData, { data }) => (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <PopUp
              {...{
                buttonLabel: "تعديل",
                buttonColor: "success",
                body: (
                  <UpdateCategoriesForm
                    data={this.state.risk}
                    clearData={this.clearData}
                    updatedData={this.updatedData}
                    sum={this.state.sum}
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

export default EditRiskCategories;

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Update_Company, List_Companies } from "../../../../services/queries/Maintainance/Companies";
import _ from "lodash";
import PopUp from "../../Custom/PopUp/PopUp";
import UpdateComForm from "./UpdateCompanyForm";

export default class UpdateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.com.repsCount.aggregate.count,
      selectedN: this.props.com.neighborhood,
      com: _.pick(this.props.com, [
        "id", "avatar", "isNeglected", "company_name", "neighborhood"
      ]),
      updatedData: {}
    };
  }

  componentDidMount() {

  }

  clearData = () => this.setState({ updatedData: {} });

  updateData = comNewData => {
    if (comNewData.neighborhood)
      this.setState({ selectedN: comNewData })
    else {
      let com = this.state.com;
      this.setState({
        com: { ...com, ...comNewData }
      });
    }
  };

  updateHandle = updateCom => {

    let com = { ...this.state.com, ...this.state.selectedN };
    updateCom({
      variables: com,
      refetchQueries: [{ query: List_Companies, }]
    });
  };

  deleteHandle = updateCom => {
    let com = this.state.com;
    com.isNeglected = !com.isNeglected;
    this.setState({ com });


    updateCom({
      variables: { ...this.state.com },
      refetchQueries: [`ListCompanies`]
    });
  };

  render() {
    return (
      <Mutation mutation={Update_Company}>
        {(updateCom, { data }) => (
          <React.Fragment>
            <td>
              <PopUp
                {...{
                  buttonLabel: "تعديل",
                  buttonColor: "success",
                  body: (
                    <UpdateComForm
                      data={this.state.com}
                      clearData={this.clearData}
                      updateData={this.updateData}
                    />
                  ),
                  submitLabel: "تعديل",
                  cancelLabel: "تراجع",
                  onSubmit: () => this.updateHandle(updateCom)
                }}
              />
            </td>
            <td>
              {!this.state.count && (
                <button
                  className={`btn btn-${this.state.com.isNeglected ? "warning" : "danger"}`}
                  onClick={e => this.deleteHandle(updateCom)}
                >
                  {this.state.com.isNeglected ? "استرجاع" : "حذف"}
                </button>
              )}
            </td>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

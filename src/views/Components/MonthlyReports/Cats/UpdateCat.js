import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  List_Cats,
  Update_Cat
} from "../../../../services/queries/MonthlyReports/Cats";
import _ from "lodash";
import PopUp from "../../Custom/PopUp/PopUp";
import UpdateCatForm from "./UpdateCatForm";

export default class UpdateCat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.cat.items.aggregate.count,
      cat: _.omit(this.props.cat, [
        "created_at",
        "__typename",
        "monthely_report_categories",
        "items"
      ]),
      updatedData: {}
    };
  }

  componentDidMount() { }

  clearData = () => this.setState({ updatedData: {} });

  updateData = catNewData => {
    let cat = this.state.cat;
    this.setState({
      cat: { ...cat, ...catNewData }
    });
  };

  updateHandle = updateCat => {
    let cat = this.state.cat;
    let catNewData = this.state.updatedData;
    cat = { ...cat, ...catNewData };
    this.setState({ cat });
    updateCat({
      variables: { ...this.state.cat },
      refetchQueries: [{ query: List_Cats }]
    });
  };

  deleteHandle = updateCat => {
    let cat = this.state.cat;
    cat.isNeglected = !cat.isNeglected;
    this.setState({ cat });
    updateCat({
      variables: { ...this.state.cat },
      refetchQueries: [`ListCats`]
    });
  };

  render() {
    return (
      <Mutation mutation={Update_Cat}>
        {(updateCat, { data }) => (
          <React.Fragment>
            <td>
              <PopUp
                {...{
                  buttonLabel: "تعديل",
                  buttonColor: "success",
                  body: (
                    <UpdateCatForm
                      data={this.state.cat}
                      clearData={this.clearData}
                      updateData={this.updateData}
                    />
                  ),
                  submitLabel: "تعديل",
                  cancelLabel: "تراجع",
                  onSubmit: () => this.updateHandle(updateCat)
                }}
              />
            </td>
            <td>
              {!this.state.count && (
                <button
                  className={`btn btn-${
                    this.state.cat.isNeglected ? "warning" : "danger"
                    }`}
                  onClick={e => this.deleteHandle(updateCat)}
                >
                  {this.state.cat.isNeglected ? "استرجاع" : "حذف"}
                </button>
              )}
            </td>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

import React, { Component } from "react";
import { Query } from "react-apollo";
import Error from "../../Custom/Error/Error";
import DrpDwn from "../../Custom/DropDown/DropDown";
import Loader from "../../Custom/Loader/Loader";
import { Get_Branches } from "../../../../Queries/BranshesQuery/BranchesList";

export default class SelectBranch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectBranch: 0,
    };
  }

  onChangeBranch = (obj) => {
    this.setState({
      selectBranch: parseInt(obj.id),
    });
    this.props.onChange(obj.id);
  };

  render() {
    return (
      <Query query={Get_Branches}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;
          if (data) {
            return (
              <div
                style={{ marginBottom: "15px", flex: "auto", display: "flex" }}
              >
                <span style={{ marginLeft: "10px" }}>
                  <DrpDwn
                    data={[{ id: 0, value: "اختر فرع" }, ...data.branch]}
                    selectedId={this.state.selectBranch}
                    color="instagram"
                    onChange={this.onChangeBranch}
                  />
                </span>
              </div>
            );
          } else return <span></span>;
        }}
      </Query>
    );
  }
}

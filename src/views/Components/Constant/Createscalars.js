import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Creat_scal from "./CreatescalarsQuery";
import UpdateForm from "./upateForm";

export class Createscalars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdata: {}
    };
  }
  UpdateData = editData => {
    let createdata = this.state.createdata;

    this.setState({ createdata: { ...createdata, ...editData } });
  };
  HandleChange = createScal => {
    createScal({
      variables: { ...this.state.createdata },
      refetchQueries: [`Get_scrles`]
    });
  };

  render() {
    return (
      <Mutation mutation={Creat_scal}>
        {(createScal, { data }) => {
          return (
            <UpdateForm
              UpdateData={this.UpdateData}
              onSubmit={() => {
                this.HandleChange(createScal);
                this.props.toggle();
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default Createscalars;

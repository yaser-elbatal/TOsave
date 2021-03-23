import React, { Component } from "react";
import { Input, FormGroup } from "reactstrap";
import { Mutation } from "react-apollo";
import { insert_comment } from "../../Queries/RiskAssmentsQuery/RiskAssments";

export default class AddComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ""
    };
  }

  sendComment = sendCmnt => {
    let vars = {
      created_by: this.props.user_id,
      risk_report: parseInt(this.props.report_id),
      comment: this.state.comment,
      images: ""
    };

    sendCmnt({ variables: vars });
    this.setState({ comment: "" });
  };

  handleComment = e => {
    this.setState({ comment: e.target.value });
  };

  render() {
    return (
      <Mutation mutation={insert_comment}>
        {(sendCmnt, { data }) => {
          return (
            <div>
              <FormGroup>
                <Input
                  type="textarea"
                  onChange={this.handleComment}
                  value={this.state.comment}
                  placeholder="اكتب تعليقاً ..."
                  name="comment"
                  id="exampleText"
                />
              </FormGroup>
              <FormGroup>
                <button
                  className="btn btn-info"
                  onClick={e => {
                    e.preventDefault();
                    this.sendComment(sendCmnt);
                  }}
                  name="send"
                  id="send"
                >
                  إرسال
                </button>
              </FormGroup>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

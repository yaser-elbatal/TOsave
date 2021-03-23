import React, { Component } from 'react';
import { Input, FormGroup, Form } from 'reactstrap';
import { Mutation } from 'react-apollo';
import { Create_Comment } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports'


export default class CreateCity extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comment: "",
    }
  }


  sendComment = (sendCmnt) => {
    let vars = {
      created_by: this.props.user_id,
      order_life_cycle: parseInt(this.props.reportId),
      comment: this.state.comment,
      file: ''
    };

    sendCmnt({ variables: vars });
    this.setState({ comment: "" })
  }


  onChangeComment = e => {
    this.setState({ comment: e.target.value })
  }


  render() {
    console.log(this.props);
    return (
      <Mutation mutation={Create_Comment}>
        {(sendCmnt, { data }) => {
          return (
            <div className="addComment">
              <FormGroup>
                <Input type="textarea" style={{ minHeight: "38px" }} onChange={this.onChangeComment} value={this.state.comment} placeholder="اكتب تعليقاً ..." name="comment" id="exampleText" />
              </FormGroup>
              <FormGroup>
                <button className="btn btn-info" onClick={(e) => { e.preventDefault(); this.sendComment(sendCmnt); }} name="send" id="send">إرسال</button>
              </FormGroup>
            </div>
          )
        }}
      </Mutation>
    );
  }
};
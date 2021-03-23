import React, { Component } from 'react';
import { Input, FormGroup, Form } from 'reactstrap';
import { Mutation } from 'react-apollo';
import { Create_Comment } from '../../../../services/queries/MonthlyReports/Reports'


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
      detail_id: this.props.detail_id,
      config_id: this.props.config_id,
      comment: this.state.comment,
      images: "",
    };

    sendCmnt({ variables: vars });
    this.setState({ comment: "" })
  }


  handleComment = e => {
    this.setState({ comment: e.target.value })
  }


  render() {
    return (
      <Mutation mutation={Create_Comment}>
        {(sendCmnt, { data }) => {
          return (
            <div className="addComment">
              <FormGroup>
                <Input type="textarea" onChange={this.handleComment} value={this.state.comment} placeholder="اكتب تعليقاً ..." name="comment" id="exampleText" />
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
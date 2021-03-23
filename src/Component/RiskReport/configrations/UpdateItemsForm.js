import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export class UpdateCategoriesForm extends Component {
  changeHandle = e => {
    this.props.updatedData({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="name">الاسم باللغة العربية</Label>
          <Input
            type="text"
            name="title"
            defaultValue={this.props.data.title}
            onChange={this.changeHandle}
            id="title"
            placeholder="الاسم باللغة العربية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">الاسم باللغة الإنجليزية</Label>
          <Input
            type="text"
            name="title_en"
            defaultValue={this.props.data.title_en}
            onChange={this.changeHandle}
            id="title_en"
            placeholder="الاسم باللغة الإنجليزية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">النسبه</Label>
          <Input
            type="number"
            name="percentage"
            defaultValue={this.props.data.percentage}
            onChange={this.changeHandle}
            id="percentage"
            placeholder="النسبه"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">الحاله</Label>
          <Input
            type="text"
            name="normal_state"
            defaultValue={this.props.data.normal_state}
            onChange={this.changeHandle}
            id="normal_state"
            placeholder="الاسم باللغة الإنجليزية"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default UpdateCategoriesForm;

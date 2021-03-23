import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export class UpdateForm extends Component {
  changeHandle = e => {
    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Form>
        {/* <FormGroup>
          <Label for="payment_id">#</Label>
          <Input
            type="number"
            name="payment_id"
            defaultValue={this.props.data.id}
            onChange={this.changeHandle}
            id="payment_id"
            disabled
          />
        </FormGroup> */}
        <FormGroup>
          <Label for="holder_name">اسم المالك</Label>
          <Input
            type="text"
            name="holder_name"
            defaultValue={this.props.data.holder_name}
            onChange={this.changeHandle}
            id="name"
            placeholder=" الاسم"
          />
        </FormGroup>
        <FormGroup>
          <Label for="card_number">رقم البطاقه</Label>
          <Input
            type="number"
            name="card_number"
            defaultValue={this.props.data.card_number}
            onChange={this.changeHandle}
            id="card"
            placeholder="رقم البطاقه"
          />
        </FormGroup>
        <FormGroup>
          <Label for="cvc">رمز التحقق</Label>
          <Input
            type="text"
            name="cvc"
            onChange={this.changeHandle}
            defaultValue={this.props.data.cvc}
            placeholder="رمز التحقق"
          />
        </FormGroup>
        <FormGroup>
          <Label for="month">الشهر</Label>
          <Input
            type="number"
            name="month"
            onChange={this.changeHandle}
            defaultValue={this.props.data.month}
            placeholder="الشهر"
          />
        </FormGroup>
        <FormGroup>
          <Label for="year">السنه</Label>
          <Input
            type="number"
            name="year"
            onChange={this.changeHandle}
            defaultValue={this.props.data.year}
            placeholder="السنه"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default UpdateForm;

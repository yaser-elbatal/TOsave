import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class CreatePaymentForm extends Component {
  constructor(props) {
    super(props);

    if (this.props.clearData) this.props.clearData();
  }

  changeHandle = e => {
    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });
  };

  createHandle = e => {
    e.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="holderName">الاسم</Label>
          <Input
            type="text"
            name="holderName"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder="الاسم"
          />
        </FormGroup>
        <FormGroup>
          <Label for="cardName">رقم البطاقه</Label>
          <Input
            type="number"
            name="cardName"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder=" رقم البطافه "
          />
        </FormGroup>
        <FormGroup>
          <Label for="cvc">رمز التحقق</Label>
          <Input
            type="text"
            name="cvc"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder="  رمز التحقق"
          />
        </FormGroup>
        <FormGroup>
          <Label for="month">الشهر</Label>
          <Input
            type="number"
            name="month"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder="الشهر"
          />
        </FormGroup>
        <FormGroup>
          <Label for="year">السنه</Label>
          <Input
            type="number"
            name="year"
            onChange={this.changeHandle}
            defaultValue=""
            placeholder="YYYY"
          />
        </FormGroup>

        <button className="btn btn-primary" onClick={this.createHandle}>
          إضافة
        </button>
      </Form>
    );
  }
}

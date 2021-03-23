import React, { Component, createRef } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class CreateCategoriesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sum: this.props.sum,
      resetPercentageToZeroRef: "0",
    }
  }



  changeHandle = e => {
    const { sum } = this.state

    if ((e.target.name == "precentage")) {

      if (parseInt(e.target.value) >= (100 - sum))
        e.target.value = (100 - sum)
      this.setState({ resetPercentageToZeroRef: e.target.value })
    }

    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });
  }

  createHandle = e => {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit();
    this.setState({ resetPercentageToZeroRef: "0" })

  };

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.sum != this.props.sum)
      this.setState({ sum: this.props.sum })
  }


  render() {
    const { sum, } = this.state

    return (
      <Form>
        <FormGroup>
          <Label for="name">الاسم باللغة العربية</Label>
          <Input
            type="text"
            name="name"
            onChange={this.changeHandle}
            defaultValue=""
            id="name"
            placeholder="الاسم باللغة العربية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name_en">الاسم باللغة الإنجليزية</Label>
          <Input
            type="text"
            name="name_en"
            onChange={this.changeHandle}
            defaultValue=""
            id="name_en"
            placeholder="الاسم باللغة الإنجليزية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="precentage"> النسبه </Label>
          <Input
            type="number"
            name="precentage"
            onChange={this.changeHandle}
            value={this.state.resetPercentageToZeroRef}
            id="precentage"
            placeholder="النسبه"
            max={100 - sum}
            min={0}
          />
        </FormGroup>


        <button disabled={this.state.sum == 100} className="btn btn-primary" onClick={this.createHandle}>
          إضافة
        </button>
      </Form>

    );
  }
}

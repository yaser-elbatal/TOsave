import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default class CreateItemsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: this.props.sum,
      resetPercentageToZeroRef: "0",
    }
  }

  changeHandle = e => {
    const { sum } = this.state

    if ((e.target.name == "percentage")) {

      if (parseInt(e.target.value) >= (100 - sum))
        e.target.value = (100 - sum)
      this.setState({ resetPercentageToZeroRef: e.target.value })
    }

    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });

  };

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
          <Label for="title">الاسم باللغة العربية</Label>
          <Input
            type="text"
            name="title"
            onChange={this.changeHandle}
            defaultValue=""
            id="title"
            placeholder="الاسم باللغة العربية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="title_en">الاسم باللغة الإنجليزية</Label>
          <Input
            type="text"
            name="title_en"
            onChange={this.changeHandle}
            defaultValue=""
            id="title_en"
            placeholder="الاسم باللغة الإنجليزية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="normal_state"> الحاله الطبيعه</Label>
          <Input
            type="text"
            name="normal_state"
            onChange={this.changeHandle}
            defaultValue=""
            id="normal_state"
            placeholder="  الحاله"
          />
        </FormGroup>
        <FormGroup>
          <Label for="percentage"> النسبه</Label>
          <Input
            type="number"
            name="percentage"
            onChange={this.changeHandle}
            value={this.state.resetPercentageToZeroRef}
            id="percentage"
            placeholder="النسبه"
            max={100 - sum}
            min={0}
          />
        </FormGroup>

        <button className="btn btn-primary" onClick={this.createHandle}>
          إضافة
        </button>
      </Form>
    );
  }
}

import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export class UpdateCategoriesForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sum: this.props.sum,
      precentage: this.props.data.precentage

    }
  }

  changeHandle = e => {
    const { sum } = this.state
    const { precentage } = this.state


    if (e.target.name == "precentage") {
      if (parseInt(e.target.value) > (100 - (sum - precentage)))
        e.target.value = (100 - (sum - precentage))

    }

    if (this.props.updatedData)

      this.props.updatedData({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.sum != this.props.sum)
      this.setState({ sum: this.props.sum })
  }


  render() {

    const { precentage, sum } = this.state
    console.log(sum + "const");
    console.log(precentage + "const");



    return (
      <Form>
        <FormGroup>
          <Label for="name">الاسم باللغة العربية</Label>
          <Input
            type="text"
            name="name"
            defaultValue={this.props.data.name}
            onChange={this.changeHandle}
            id="name"
            placeholder="الاسم باللغة العربية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name_en">الاسم باللغة الإنجليزية</Label>
          <Input
            type="text"
            name="name_en"
            defaultValue={this.props.data.name_en}
            onChange={this.changeHandle}
            id="name_en"
            placeholder="الاسم باللغة الإنجليزية"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">النسبه</Label>
          <Input
            type="number"
            name="precentage"
            defaultValue={this.props.data.precentage}
            onChange={this.changeHandle}
            max={100 - (sum - precentage)}
            min={0}
            id="precentage"
            placeholder="النسبه"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default UpdateCategoriesForm;

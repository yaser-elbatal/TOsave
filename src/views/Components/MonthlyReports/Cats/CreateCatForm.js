import React, { Component } from "react";
import { Form, FormGroup, ButtonGroup, Button, Label, Input } from "reactstrap";
import SelectBranch from "./SelectBranch";

export default class CreateCatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGeneral: true,
      branchId: "",
    };
    if (this.props.clearData) this.props.clearData();
  }

  changeHandle = (e) => {
    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });
  };

  createHandle = (e) => {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit();
  };

  handleSelect = (id) => {
    // this.setState({ branchId: id });
    this.props.updateData({ branchId: id });
  };

  render() {
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
          <ButtonGroup>
            <Button
              onClick={() => {
                this.props.updateData({ isGeneral: true });
                this.setState({ isGeneral: true });
              }}
              active
            >
              عام
            </Button>
            <Button
              onClick={() => {
                this.props.updateData({ isGeneral: false });
                this.setState({ isGeneral: false });
              }}
            >
              خاص
            </Button>
          </ButtonGroup>
        </FormGroup>
        {!this.state.isGeneral && (
          <FormGroup>
            <Label for="neighborhood">اختر الفرع</Label>
            <SelectBranch onChange={this.handleSelect} />
          </FormGroup>
        )}
        <button className="btn btn-primary" onClick={this.createHandle}>
          إضافة
        </button>
      </Form>
    );
  }
}

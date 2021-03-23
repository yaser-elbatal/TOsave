import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export class EditUpdateForm extends Component {
  changeHandle = e => {
    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="holder_name">سعر المركز</Label>
          <Input
            type="number"
            name="organization_hour_price"
            defaultValue={this.props.data.organization_hour_price}
            onChange={this.changeHandle}
          />
        </FormGroup>
        <FormGroup>
          <Label for="sitter_hour_price">سعرالساعه لمزود الخدمه:</Label>
          <Input
            type="number"
            name="sitter_hour_price"
            defaultValue={this.props.data.sitter_hour_price}
            onChange={this.changeHandle}
          />
        </FormGroup>
        <FormGroup>
          <Label for="provider_to_home_price">
            سعر مزود الخدمه لذهاب للمنزل:
          </Label>
          <Input
            type="number"
            name="provider_to_home_price"
            defaultValue={this.props.data.provider_to_home_price}
            onChange={this.changeHandle}
          />
        </FormGroup>
        <FormGroup>
          <Label for=" fine_minute_price">سعر الغرامه بالدقيقه</Label>
          <Input
            type="number"
            name="fine_minute_price"
            defaultValue={this.props.data.fine_minute_price}
            onChange={this.changeHandle}
          />
        </FormGroup>
        <FormGroup>
          <Label for=" app_percentage">نسبه ربح التطبيق</Label>
          <Input
            type="number"
            name="app_percentage"
            defaultValue={this.props.data.app_percentage}
            onChange={this.changeHandle}
          />
        </FormGroup>
      </Form>
    );
  }
}

export default EditUpdateForm;

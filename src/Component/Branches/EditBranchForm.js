import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export class EditBranchForm extends Component {
  changeHandle = e => {
    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="branch_number">رقم الفرع</Label>
          <Input
            type="text"
            name="branch_number"
            defaultValue={this.props.data.branch_number}
            onChange={this.changeHandle}
            placeholder=" رقم الفرع"
          />
        </FormGroup>
        <FormGroup>
          <Label for="name"> الاسم باللغه العربيه</Label>
          <Input
            type="text"
            name="name"
            defaultValue={this.props.data.name}
            onChange={this.changeHandle}
            placeholder="الاسم بالعربي "
          />
        </FormGroup>
        <FormGroup>
          <Label for="name_en"> الاسم باللغه الاجنبيه</Label>
          <Input
            type="text"
            name="name_en"
            onChange={this.changeHandle}
            defaultValue={this.props.data.name_en}
            placeholder="الاسم "
          />
        </FormGroup>
        {/* <FormGroup>
          <Label for="branch_manager"> المدير</Label>
          <Input
            type="text"
            name="branch_manager"
            onChange={this.changeHandle}
            defaultValue={
              this.props.data.branch_manager === "null"
                ? "لم يحدد بعد"
                : this.props.data.branch_manager
            }
            placeholder="اسم المدير "
          />
        </FormGroup> */}
        <FormGroup>
          <Label for="contact_numbers">جهات الاتصال</Label>
          <Input
            type="text"
            name="contact_numbers"
            onChange={this.changeHandle}
            defaultValue={this.props.data.contact_numbers}
            placeholder="جهات الاتصال"
          />
        </FormGroup>
        <FormGroup>
          <Label for="neighborhood">الأحياء</Label>
          <Input
            type="number"
            name="neighborhood"
            onChange={this.changeHandle}
            defaultValue={this.props.data.neighborhood}
            placeholder="الاحياء"
          />
        </FormGroup>
        <FormGroup>
          <Label for="about">الوصف</Label>
          <Input
            type="text"
            name="about"
            onChange={this.changeHandle}
            defaultValue={this.props.data.about}
            placeholder="الوصف"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default EditBranchForm;

import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import DrpDwn from "../Custom/DropDown/DropDown";

export default class CreateCatForm extends Component {
  constructor(props) {
    super(props);

    if (this.props.clearData) this.props.clearData();
  }

  componentDidMount() {
    if (this.props.updateData && this.props.dropdownData)
      this.props.updateData({
        dropdown: {
          [this.props.dropdownData.fieldName]: parseInt(
            this.props.dropdownData.data[0].id
          ),
        },
      });
  }

  selectHandle = (e) => {
    if (this.props.updateData)
      this.props.updateData({
        dropdown: { [this.props.dropdownData.fieldName]: parseInt(e.id) },
      });
  };

  changeHandle = (e) => {
    if (this.props.updateData)
      this.props.updateData({ [e.target.name]: e.target.value });
  };

  createHandle = (e) => {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit();
  };

  render() {
    return (
      <Form>
        {this.props.dropdownData && (
          <FormGroup>
            <DrpDwn
              data={this.props.dropdownData.data}
              color="primary"
              onChange={this.selectHandle}
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label for="username">اسم الدخول</Label>
          <Input
            type="text"
            name="username"
            onChange={this.changeHandle}
            id="username"
            placeholder="اسم الدخول"
          />
        </FormGroup>
        <FormGroup>
          <Label for="display_name">الاسم المعروض</Label>
          <Input
            type="text"
            name="display_name"
            onChange={this.changeHandle}
            id="display_name"
            placeholder="الاسم المعروض"
          />
        </FormGroup>
        {this.props.dropdownData &&
          this.props.dropdownData.fieldName == "branch_id" && (
            <Fragment>
              <FormGroup>
                <Label for="email">البريد الإلكترونى</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.changeHandle}
                  id="email"
                  placeholder="البريد الإلكترونى"
                />
              </FormGroup>
              <FormGroup>
                <Label for="employee_number">رقم الموظف</Label>
                <Input
                  type="number"
                  min="1"
                  name="employee_number"
                  onChange={this.changeHandle}
                  id="employee_number"
                  placeholder="رقم الموظف"
                />
              </FormGroup>
            </Fragment>
          )}
        <FormGroup>
          <Label for="password">كلمة السر</Label>
          <Input
            type="password"
            name="password"
            onChange={this.changeHandle}
            id="password"
            placeholder="كلمة السر"
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">تأكيد كلمة السر</Label>
          <Input
            type="password"
            name="confirmPassword"
            onChange={this.changeHandle}
            id="confirmPassword"
            placeholder="تأكيد كلمة السر"
          />
        </FormGroup>
        <FormGroup>
          <Label for="myPassword">أدخل كلمة السر الخاصة بك</Label>
          <Input
            type="password"
            name="myPassword"
            onChange={this.changeHandle}
            id="myPassword"
            placeholder="أدخل كلمة السر الخاصة بك"
          />
        </FormGroup>
        <button className="btn btn-primary" onClick={this.createHandle}>
          إضافة
        </button>
      </Form>
    );
  }
}

import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


export default class CreateCatForm extends Component {
    constructor(props) {
        super(props);

        if (this.props.clearData)
            this.props.clearData();
    }


    changeHandle = (e) => {
        if (this.props.updateData)
            this.props.updateData({ [e.target.name]: e.target.value })
    }

    createHandle = (e) => {
        e.preventDefault();
        this.props.onSubmit && this.props.onSubmit();
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="username">اسم الموظف</Label>
                    <Input type="text" name="username" onChange={this.changeHandle}  id="username" placeholder="اسم الموظف" />
                </FormGroup>
                <FormGroup>
                    <Label for="display_name">الاسم المعروض</Label>
                    <Input type="text" name="display_name" onChange={this.changeHandle}  id="display_name" placeholder="الاسم المعروض" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">كلمة السر</Label>
                    <Input type="password" name="password" onChange={this.changeHandle}  id="password" placeholder="كلمة السر" />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">تأكيد كلمة السر</Label>
                    <Input type="password" name="confirmPassword" onChange={this.changeHandle}  id="confirmPassword" placeholder="تأكيد كلمة السر" />
                </FormGroup>
                <button className="btn btn-primary" onClick={this.createHandle} >إضافة</button>
            </Form>
        );
    }
}
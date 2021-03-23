import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, } from 'reactstrap';
import DrpDwn from "../Custom/DropDown/DropDown"



export default class UpdateCatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    changeHandle = (e) => {
        if (this.props.updateData)
            this.props.updateData({ [e.target.name]: e.target.value })
    }

    selectHandle = (e) => {
        if (this.props.updateData)
            this.props.updateData({ [this.props.dropdownData.fieldName]: parseInt(e.id) })
    }

    render() {
        let { user, position, dropdownData } = this.props
        return (
            <Form>
                {dropdownData && (user.user_type != "b_manager") &&
                    <FormGroup>
                        <DrpDwn data={dropdownData.data} selectedId={position.id} color="primary" onChange={this.selectHandle} />
                    </FormGroup>
                }
                <FormGroup>
                    <Label for="username">اسم الدخول</Label>
                    <Input type="text" name="username" defaultValue={user.username} onChange={this.changeHandle} id="username" placeholder="اسم الدخول" />
                </FormGroup>
                <FormGroup>
                    <Label for="display_name">الاسم المعروض</Label>
                    <Input type="text" name="display_name" defaultValue={user.display_name} onChange={this.changeHandle} id="display_name" placeholder="الاسم المعروض" />
                </FormGroup>
                {dropdownData && dropdownData.fieldName == "branch_id" &&
                    <Fragment>
                        <FormGroup>
                            <Label for="email">البريد الإلكترونى</Label>
                            <Input type="email" name="email" defaultValue={user.email} onChange={this.changeHandle} id="email" placeholder="البريد الإلكترونى" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="employee_number">رقم الموظف</Label>
                            <Input type="number" min="1" name="employee_number" defaultValue={user.employee_number} onChange={this.changeHandle} id="employee_number" placeholder="رقم الموظف" />
                        </FormGroup>
                    </Fragment>
                }
                <FormGroup>
                    <Label for="password">كلمة السر</Label>
                    <Input type="password" name="password" onChange={this.changeHandle} id="password" placeholder="كلمة السر" />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">تأكيد كلمة السر</Label>
                    <Input type="password" name="confirmPassword" onChange={this.changeHandle} id="confirmPassword" placeholder="تأكيد كلمة السر" />
                </FormGroup>
                <FormGroup>
                    <Label for="myPassword">أدخل كلمة السر الخاصة بك</Label>
                    <Input type="password" name="myPassword" onChange={this.changeHandle} id="myPassword" placeholder="أدخل كلمة السر الخاصة بك" />
                </FormGroup>
            </Form>
        );
    }
}
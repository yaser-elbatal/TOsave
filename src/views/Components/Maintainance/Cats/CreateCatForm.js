import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, } from 'reactstrap';


export default class CreateCatForm extends Component {
    constructor(props) {
        super(props);

        if (this.props.clearData)
            this.props.clearData();
    }

    componentDidMount() {
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
                    <Label for="name_ar">الاسم باللغة العربية</Label>
                    <Input type="text" name="name_ar" onChange={this.changeHandle} defaultValue="" id="name_ar" placeholder="الاسم باللغة العربية" />
                </FormGroup>
                <FormGroup>
                    <Label for="name">الاسم باللغة الإنجليزية</Label>
                    <Input type="text" name="name" onChange={this.changeHandle} defaultValue="" id="name" placeholder="الاسم باللغة الإنجليزية" />
                </FormGroup>
                <button className="btn btn-primary" onClick={this.createHandle} >إضافة</button>
            </Form>
        );
    }
}
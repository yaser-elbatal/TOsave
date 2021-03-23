import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, } from 'reactstrap';


export default class CreateItemForm extends Component {
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
                    <Label for="name">الاسم باللغة العربية</Label>
                    <Input type="text" name="name" onChange={this.changeHandle} defaultValue="" id="name" placeholder="الاسم باللغة العربية" />
                </FormGroup>
                <FormGroup>
                    <Label for="name_en">الاسم باللغة الإنجليزية</Label>
                    <Input type="text" name="name_en" onChange={this.changeHandle} defaultValue="" id="name_en" placeholder="الاسم باللغة الإنجليزية" />
                </FormGroup>
                <FormGroup>
                    <Label for="images_number">عدد الصور</Label>
                    <Input type="number" name="images_number" onChange={this.changeHandle} min="1" defaultValue="1" id="images_number" placeholder="عدد الصور" />
                </FormGroup>
                <button class="btn btn-primary" onClick={this.createHandle} >إضافة</button>
            </Form>
        );
    }
}
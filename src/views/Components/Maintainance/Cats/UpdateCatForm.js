import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, } from 'reactstrap';


export default class UpdateCatForm extends Component {
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

    render() {
        console.log(this.props.data);

        return (
            <Form>
                <FormGroup>
                    <Label for="name_ar">الاسم باللغة العربية</Label>
                    <Input type="text" name="name_ar" defaultValue={this.props.data.name_ar} onChange={this.changeHandle} id="name_ar" placeholder="الاسم باللغة العربية" />
                </FormGroup>
                <FormGroup>
                    <Label for="name">الاسم باللغة الإنجليزية</Label>
                    <Input type="text" name="name" defaultValue={this.props.data.name} onChange={this.changeHandle} id="name" placeholder="الاسم باللغة الإنجليزية" />
                </FormGroup>

            </Form>
        );
    }
}
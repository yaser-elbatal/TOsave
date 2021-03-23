import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, } from 'reactstrap';


export default class UpdateNeighborhoodForm extends Component {
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
        return (
            <Form>
                <FormGroup>
                    <Label for="name">الاسم باللغة العربية</Label>
                    <Input type="text" name="name" defaultValue={this.props.data.name} onChange={this.changeHandle} id="name" placeholder="الاسم باللغة العربية" />
                </FormGroup>
                <FormGroup>
                    <Label for="name_en">الاسم باللغة الإنجليزية</Label>
                    <Input type="text" name="name_en" defaultValue={this.props.data.name} onChange={this.changeHandle} id="name_en" placeholder="الاسم باللغة الإنجليزية" />
                </FormGroup>
            </Form>
        );
    }
}
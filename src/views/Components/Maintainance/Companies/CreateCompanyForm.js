import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import SelectNeighbour from "../../SelectNeighbour/SelectNeighbour"


export default class CreateCatForm extends Component {
    constructor(props) {
        super(props);

        if (this.props.clearData)
            this.props.clearData();
    }

    componentDidMount() {
        this.props.updateData({ avatar: "" })
    }


    changeHandle = (e) => {
        if (this.props.updateData)
            this.props.updateData({ [e.target.name]: e.target.value })
    }

    createHandle = (e) => {
        e.preventDefault();
        this.props.onSubmit && this.props.onSubmit();
    }

    handleSelect = (e) => {
        this.props.updateData({ neighborhood: e.neighborhood ? e.neighborhood : false })
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="company_name">اسم الشركة</Label>
                    <Input type="text" name="company_name" onChange={this.changeHandle} defaultValue="" id="company_name" placeholder="اسم الشركة" />
                </FormGroup>
                <FormGroup>
                    <Label for="company_name">اختر المكان</Label>
                    <SelectNeighbour onChange={this.handleSelect} />
                </FormGroup>
                <FormGroup>
                    <Label for="avatar">صورة الشركة</Label>
                    <CustomInput type="file" onChange={this.changeHandle} id="avatar" name="avatar" />
                </FormGroup>
                <button className="btn btn-primary" onClick={this.createHandle} >إضافة</button>
            </Form>
        );
    }
}
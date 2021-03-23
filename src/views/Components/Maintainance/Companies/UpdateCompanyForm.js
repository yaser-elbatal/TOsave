import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import SelectNeighbour from "../../SelectNeighbour/SelectNeighbour"



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


    handleSelect = (e) => {
        this.props.updateData({ neighborhood: e.neighborhood ? e.neighborhood : false });
    }


    render() {

        return (
            <Form>
                <FormGroup>
                    <Label for="company_name">اسم الشركة</Label>
                    <Input type="text" name="company_name" defaultValue={this.props.data.company_name} onChange={this.changeHandle} id="company_name" placeholder="اسم الشركة" />
                </FormGroup>
                <FormGroup>
                    <Label>اختر المكان</Label>
                    <SelectNeighbour neighborhoodId={this.props.data.neighborhood} onChange={this.handleSelect} />
                </FormGroup>
                <FormGroup>
                    <Label for="avatar">صورة الشركة</Label>
                    <CustomInput type="file" onChange={this.changeHandle} id="avatar" name="avatar" />
                </FormGroup>
            </Form>
        );
    }
}
import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Button, ButtonToolbar, ButtonGroup } from 'reactstrap';


export default class CreateItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fast: "",
            radioSelected: true,
        }

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

    fastHandle = (e) => {
        this.setState({ fast: e.target.value })
        if (this.props.updateData)
            this.props.updateData({ fast: e.target.value })
    }


    render() {
        return (
            <Form>
                <ButtonToolbar className="float-right" aria-label="Toolbar with button groups" style={{ marginBottom: "20px" }}>
                    <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: true, })} active={this.state.radioSelected === true}>الادخال الفردى</Button>
                        <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: false, })} active={this.state.radioSelected === false}>الادخال المتعدد</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                {
                    (this.state.radioSelected) ?
                        (<Fragment>
                            <FormGroup>
                                <Label for="name_ar">الاسم باللغة العربية</Label>
                                <Input type="text" name="name_ar" onChange={this.changeHandle} defaultValue="" id="name_ar" placeholder="الاسم باللغة العربية" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">الاسم باللغة الإنجليزية</Label>
                                <Input type="text" name="name" onChange={this.changeHandle} defaultValue="" id="name" placeholder="الاسم باللغة الإنجليزية" />
                            </FormGroup>
                        </Fragment>) :
                        <FormGroup>
                            <Label for="fast">الادخال السريع للعناصر</Label>
                            <Input type="textarea" onChange={this.fastHandle} value={this.state.fast} placeholder="الادخال السريع للعناصر ... الاسم بالعربية*الاسم بالانجليزية" name="fast" id="fast" />
                        </FormGroup>
                }
                <button className="btn btn-primary" onClick={this.createHandle} >إضافة</button>
            </Form>
        );
    }
}
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, } from 'reactstrap';


export default class UpdateCityForm extends Component {
    constructor(props) {
        super(props);
      

        if (this.props.clearData)
            this.props.clearData();
    }

 

    changeHandle = (e) => {
        if (this.props.updateData)
            this.props.updateData({ [e.target.name]: e.target.value })
    }

    onChangeHandler=e=>{
        if (this.props.updateData)
            this.props.updateData({[e.target.name]: e.target.files[0] })
    }


    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="name">الاسم</Label>
                    <Input type="text" name="name" defaultValue={this.props.data.name} onChange={this.changeHandle} id="name" placeholder="الاسم" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">البريد الالكتروني</Label>
                    <Input type="email" name="email" defaultValue={this.props.data.email} onChange={this.changeHandle} id="email" placeholder="البريد الالكتورني" />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">الجوال</Label>
                    <Input type="number" name="phone" defaultValue={this.props.data.phone} onChange={this.changeHandle} id="name" placeholder="الجوال" />
                </FormGroup>
                <FormGroup>
                    <Label for="avatar">الصوره</Label>
                    <Input type="file" name="avatar" onChange={this.onChangeHandler}/>
                    {/* <Button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</Button>  */}

                    {/* <Input type="file" name="avatar"  onChange={this.changeHandle} defaultValue={this.props.data.avatar} id="avatar" placeholder="  الصوره" accept="image/x-png,image/gif,image/jpeg" /> */}

                </FormGroup>
            </Form>
        );
    }
}
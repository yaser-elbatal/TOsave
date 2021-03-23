import React from 'react'
import { Form, FormGroup, Label, Input } from "reactstrap";


function AddTechDepForm(props) {

    const changeHandle = e => {
        if (props.updatedate)
            props.updatedate({ [e.target.name]: e.target.value });
    }
    const createHandle = e => {

        e.preventDefault();

        props.onSubmit && props.onSubmit();
    }

    return (
        <Form>
            <FormGroup>
                <Label for="name_ar">الاسم باللغة العربية</Label>
                <Input
                    type="text"
                    name="name"
                    onChange={changeHandle}
                    defaultValue=""
                    id="name"
                    placeholder="الاسم باللغة العربية"
                />
            </FormGroup>
            <FormGroup>
                <Label for="name">الاسم باللغة الإنجليزية</Label>
                <Input
                    type="text"
                    name="name_en"
                    onChange={changeHandle}
                    defaultValue=""
                    id="name_en"
                    placeholder="الاسم باللغة الإنجليزية"
                />
            </FormGroup>



            <button className="btn btn-primary" onClick={createHandle}>
                إضافة
        </button>
        </Form>
    )
}

export default AddTechDepForm

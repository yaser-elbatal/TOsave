import React from 'react'
import { Form, FormGroup, Label, Input } from "reactstrap";


export default function CreateCorrectiveAciton(props) {
    const changeHandle = e => {
        if (props.updateData)
            props.updateData({ [e.target.name]: e.target.value });

    };

    return (
        <Form>
            <FormGroup>
                <Label for="comment">التعليق</Label>
                <Input
                    type="text"
                    name="comment"
                    onChange={changeHandle}
                    placeholder="التعليق"
                />
            </FormGroup>
            <FormGroup>
                <Label for="image">الصوره</Label>
                <Input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={changeHandle}
                    placeholder="الصوره"
                />
            </FormGroup>

        </Form>
    )
}

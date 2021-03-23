import React, { useState } from 'react'
import { Form, FormGroup, Label, Input } from "reactstrap";
import SelectNeighbour from "../../views/Components/SelectNeighbour/SelectNeighbour"
import BranchCompany from './BranchCompany';
import logo from '../../assets/img/default.png'



export default function CreateBranchForm(props) {

    const changeHandle = e => {
        if (props.updateData)
            props.updateData({ [e.target.name]: e.target.value });
        console.log(e);
    };



    const createHandle = e => {
        e.preventDefault();
        props.onSubmit && props.onSubmit();
    };

    const handleSelect = (e) => {


        props.updateData({ neighborhood: e.neighborhood ? e.neighborhood : false })
    }



    const [{ alt, src }, setImg] = useState({
        src: logo,
        alt: 'Upload an Image'
    });

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }
    }


    return (
        <Form>
            <FormGroup>
                <Label for="name">اسم الفرع باللغة العربية</Label>
                <Input
                    type="text"
                    name="name"
                    onChange={changeHandle}
                    defaultValue=""
                    placeholder="الاسم باللغة العربية"
                />
            </FormGroup>
            <FormGroup>
                <Label for="name_en">الاسم باللغة الإنجليزية</Label>
                <Input
                    type="text"
                    name="name_en"
                    onChange={changeHandle}
                    defaultValue=""
                    placeholder="الاسم باللغة الإنجليزية"
                />
            </FormGroup>
            <FormGroup>
                <Label for="about"> الوصف </Label>
                <Input
                    type="text"
                    name="about"
                    onChange={changeHandle}
                    defaultValue=""
                    id="about"
                    placeholder="  الوصف"
                />
            </FormGroup>
            <FormGroup>
                <Label for="contact_numbers"> رقم الاتصال </Label>
                <Input
                    type="text"
                    name="contact_numbers"
                    onChange={changeHandle}
                    defaultValue=""
                    id="contact_numbers"
                    placeholder="  رقم الاتصال"
                />
            </FormGroup>
            <FormGroup>
                <Label for="neighborhood">اختر الحي</Label>
                <SelectNeighbour onChange={handleSelect} />
            </FormGroup>
            <FormGroup>
                <Label for="branchnumber"> رقم الفرع </Label>
                <Input
                    type="number"
                    name="branchnumber"
                    onChange={changeHandle}
                    defaultValue=""
                    id="branchnumber"
                    placeholder=" رقم الفرع"
                />
            </FormGroup>
            {/* <FormGroup>
                <Label for="avatar"> الصوره </Label>
                <Input
                    type="text"
                    name="avatar"
                    onChange={changeHandle}
                    defaultValue=""
                    id="avatar"
                    placeholder="  الصوره"
                />

            </FormGroup> */}

            <FormGroup>
                <Label for="branch_manager"> مدير الفرع </Label>
                <Input
                    type="number"
                    name="branch_manager"
                    onChange={changeHandle}
                    defaultValue=""
                    id="branch_manager"
                    placeholder="مدير الفرع"
                />

            </FormGroup>
            <FormGroup>
                <Label for="avatar">  الصوره </Label>
                <Input
                    type="file"
                    name="avatar"
                    onChange={changeHandle, handleImg}
                    accept=".png, .jpg, .jpeg"

                    defaultValue=""
                    id="avatar"
                    placeholder=" الصوره"
                />

                <img src={src} alt={alt} className="form-img__img-preview" style={{ width: '50px', height: '50px' }} />

            </FormGroup>
            {/* <label htmlFor="photo" className="form-img__file-label">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="#56ceef" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                    <circle cx="12" cy="10" r="3" />
                    <circle cx="12" cy="12" r="10" />
                </svg>
            </label> */}
            {/* <form method="post" action="post" enctype="multipart/form-data">
                <input type="file" name="image" /><br /><br />
                <button type="submit" name="upload">Upload</button>
            </form> */}
            {/* <FormGroup>
                <Label for="branchnumber"> شركه الصيانه </Label>
                <BranchCompany updateData={props.updateData} />

            </FormGroup> */}

            <button className="btn btn-primary" onClick={createHandle}>
                إضافة
            </button>
        </Form>
    );
}



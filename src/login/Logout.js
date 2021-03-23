import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import logo from '../../../assets/img/brand/logo.png'
import axios from 'axios'
import { Label } from 'reactstrap';
import Modal from "./Modal";
import {logout} from "./loginData"

class Login extends Component {
  constructor(props) {
    super(props);
    logout();
  }

  
  render() {

    let lgoutProps = {
      clearEditedData: ()=>{},      
      a: false,
      data: {},
      color: "primary",
      confirm: ()=>{this.lgout()},
      buttonLabel: "",
      buttonClass: "btn-warning btn-sm",
      modalBody: <span>هل تريد الخروج؟</span>,
      modalTitle: "",
      submitLabel: "خروج",
      cancel: ()=>{ this.props.history.go(-1) },
      triggered: true
    }

    return (
      <div id="logout" hidden={true}><Modal {...lgoutProps} /></div>
    )
  }
}

export default (Login);

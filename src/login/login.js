import React, { Component } from "react";
import { Link } from "react-router-dom";
import { store } from 'react-notifications-component';

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert
} from "reactstrap";
// import logo from '../../../assets/img/brand/logo.png'
import axios from "axios";
import { Label } from "reactstrap";
import { login, authed } from "./loginData";
import logo from "../assets/img/toSave.jpg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auzenticated: { token: "", username: "" },
      user: { username: "", password: "" },
      submitDisabled: true,
      // rem: false,
      err: ""
    };

    authed();
  }

  handleChange = e => {

    let user = this.state.user;
    user[e.target.name] = e.target.value;
    let otherField = e.target.name == "username" ? "password" : "username";

    this.setState({
      user,
      submitDisabled: !(e.target.value && user[otherField]) || false
    });

  }

  handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleLogin();
    }
  };

  handleLogin = async e => {

    try {

      let data = this.state.user;
      const response = await login(data);

      console.log(response);


      if (response && response.data.roles.includes("admin")) {
        localStorage.setItem("sacoAdmin", JSON.stringify({ token: response.data.token, id: response.data.id, username: response.data.username }));
        this.props.history.push("/");
      }

    }
    catch (ex) {
      if (ex.response && ex.response.status === 400 && ex.response.status != 200) {

        let error = this.state.err

        error = store.addNotification({
          title: "Wrong",
          message: "Check UserName or Password",
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
          }
        });

        this.setState({ err: error });
        return;
      }
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center" style={{ backgroundColor: '#55B7A9' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4" style={{ backgroundColor: '#E8F3F8' }}>
                  <img
                    src={logo}
                    style={{
                      maxWidth: "300px",
                      maxHeight: "270px",
                      marginRight: "auto",
                      marginLeft: "auto"
                    }}
                  />
                  <CardBody style={{ backgroundColor: '#E8F3F8' }}>
                    <Form
                      onSubmit={this.handleLogin}
                      onKeyDown={this.handleKeyDown}
                    >
                      <p className="text-muted">الدخول للحساب</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="username"
                          onChange={this.handleChange}
                          placeholder="ادخل اسم المستخدم"
                          autoComplete="username"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                          placeholder="كلمة السر"
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                      </InputGroup>
                      <Row className="justify-content-center">

                        <Button
                          id="submit"
                          size="lg"
                          disabled={this.state.submitDisabled}
                          color="success"
                          onClick={this.handleLogin}
                        >
                          دخول
                          </Button>

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

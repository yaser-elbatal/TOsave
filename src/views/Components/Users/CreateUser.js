import React, { Component } from "react";
import { Mutation } from "react-apollo";
import axios from "axios";
import CreateUserForm from "./CreateUserForm";
import {
  Add_Member_To_Branch,
  Add_Member_To_Company,
  Add_Member_To_Department,
} from "../../../services/queries/Users";
import {
  validateNameAr,
  validatePassword,
  validateTwoPasswords,
} from "../../../Component/Validation";
import { store } from "react-notifications-component";
import { Alert } from 'reactstrap';

export default class CreateMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdData: {
        display_name: "",
        myPassword: "",
        confirmPassword: "",
      },
      data: {},
    };
  }

  componentDidMount() {
    let data = false;
    switch (this.props.type) {
      case "admin":
        data = {
          userType: "admin",
          createMutation: false,
          listAfterUpdateQuery: "ListAdmins",
        };
        break;
      case "engineer":
        data = {
          userType: "engineer",
          createMutation: false,
          listAfterUpdateQuery: "ListEngineers",
        };
        break;
      case "branches":
        data = {
          userType: "b_employee",
          createMutation: Add_Member_To_Branch,
          listAfterUpdateQuery: "ListBranchesUsers",
        };
        break;
      case "maintainance":
        data = {
          userType: "company_user",
          createMutation: Add_Member_To_Company,
          listAfterUpdateQuery: "ListCompanyUsers",
        };
        break;
      case "departments":
        data = {
          userType: "tech_user",
          createMutation: Add_Member_To_Department,
          listAfterUpdateQuery: "ListDepartmentUsers",
        };
        break;
    }

    this.setState({ data });
  }

  updateData = (editedNewData) => {
    let createdData = this.state.createdData;
    this.setState({ createdData: { ...createdData, ...editedNewData } });
  };

  createUserAPI = async (userData) => {
    return await axios({
      method: "POST",
      data: userData,
      url: `http://tosafe.trendsgcc.com:3000/signup`,
      headers: {
        "content-type": `application/json`,
        'authorization': '62c0c6cacf66f3cdff5b34db8615ded4'
      },
    });
  };

  checkUserAPI = async (username, password) => {
    return await axios({
      method: "POST",
      data: { username, password },
      url: `http://tosafe.trendsgcc.com:3000/checkUser`,
      headers: {
        "content-type": `application/json`,
        'authorization': `62c0c6cacf66f3cdff5b34db8615ded4`
      },
    });
  };

  _validate = () => {
    const {
      display_name,
      myPassword,
      confirmPassword,
      password,
    } = this.state.createdData;
    let displayName = validateNameAr(display_name);
    let twoPassConfirm = validateTwoPasswords(password, confirmPassword);
    let pass = validatePassword(myPassword);
    return displayName || twoPassConfirm || pass;
  };

  createHandle = async (createUserMut) => {
    console.log("CreatedData", this.state.createdData);
    console.log("this.state.data.userType", this.state.data.userType);

    if (this._validate())
      return store.addNotification({
        title: "تنبيه",
        message: this._validate(),
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });

    try {
      let adminUsername = localStorage.getItem("sacoAdmin")
        ? JSON.parse(localStorage.getItem("sacoAdmin")).username
        : "";

      let checkUserAPI = await this.checkUserAPI(
        adminUsername,
        this.state.createdData.myPassword
      );

      if (checkUserAPI.status == 200) {
        let {
          username,
          display_name,
          password,
          confirmPassword,
        } = this.state.createdData;
        let createUserAPI = await this.createUserAPI({
          username,
          display_name,
          password,
          confirmPassword,
          user_type: this.state.data.userType,
        });

        if (
          createUserAPI.status == 200 &&
          !["admin", "engineer"].includes(this.state.data.userType)
        ) {
          createUserMut({
            variables: {
              ...(this.props.type == "branches" && {
                email: this.state.createdData.email,
                employee_number: this.state.createdData.employee_number,
              }),
              ...this.state.createdData.dropdown,
              user_id: createUserAPI.data.id,
            },
          });
        }
      }
    } catch (error) {
      console.log("error", error.message);
      if (error.message == "Request failed with status code 404") {
        return <Alert color="danger">
          كلمة المرور الخاصة بالادمن غير صحيحة
          </Alert>
        // store.addNotification({
        //   title: "تنبيه",
        //   message: "كلمة المرور الخاصة بالادمن غير صحيحة",
        //   type: "danger",
        //   insert: "top",
        //   container: "top-right",
        //   animationIn: ["animated", "fadeIn"],
        //   animationOut: ["animated", "fadeOut"],
        //   dismiss: {
        //     duration: 3000,
        //     onScreen: true,
        //   },
        // });

      } else {
        return <Alert color="danger">
          {
            error.message
          }
        </Alert>
        // store.addNotification({
        //   title: "تنبيه",
        //   message: error.message,
        //   type: "danger",
        //   insert: "top",
        //   container: "top-right",
        //   animationIn: ["animated", "fadeIn"],
        //   animationOut: ["animated", "fadeOut"],
        //   dismiss: {
        //     duration: 3000,
        //     onScreen: true,
        //   },
        // });
      }
    }
  };

  render() {
    return this.state.data.createMutation ? (
      <Mutation mutation={this.state.data.createMutation}>
        {(createUserMut, { data }) => {
          return (
            <CreateUserForm
              dropdownData={this.props.dropdownData}
              updateData={this.updateData}
              onSubmit={() => {
                this.createHandle(createUserMut);
                this.props.toggle();
              }}
            />
          );
        }}
      </Mutation>
    ) : (
        <CreateUserForm
          dropdownData={this.props.dropdownData}
          updateData={this.updateData}
          onSubmit={() => {
            this.createHandle();
            this.props.toggle();
          }}
        />
      );
  }
}

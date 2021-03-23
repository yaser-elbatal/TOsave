import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import { Subscription } from "react-apollo";
import {
  List_Admins,
  List_Engineers,
  List_Branches_Users,
  List_Department_Users,
  List_Company_Users,
  Update_Member_In_Branch,
  Update_Member_In_Company,
  Update_Member_In_Department,
  Update_User,
  Add_Member_To_Branch,
  Add_Member_To_Company,
  Add_Member_To_Department,
  List_Users_Types,
  Dropdowns,
} from "../../../services/queries/Users";
import Loader from "../Custom/Loader/Loader";
import Error from "../Custom/Error/Error";
import NoResults from "../Custom/NoResults/NoResults";
import EditUser from "./UpdateUser";
import Collapse from "../Custom/Collapse/Collapse";
import Tabs from "../Custom/Tabs/Tabs";
import CreateUser from "./CreateUser";

export default class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: false,
    };
  }

  componentDidMount() {
    let query = false;
    switch (this.props.type) {
      case "admin":
        query = List_Admins;
        break;
      case "engineer":
        query = List_Engineers;
        break;
      case "branches":
        query = List_Branches_Users;
        break;
        // case "maintainance":
        //   query = List_Company_Users;
        break;
      case "departments":
        query = List_Department_Users;
        break;
    }

    this.setState({ query });
  }

  getUserType = (user_type) => {
    switch (user_type) {
      case "admin":
        return "مسؤول";
      case "engineer":
        return "مهندس صيانة";
      case "b_manager":
        return "مدير فرع";
      case "b_employee":
        return "موظف فرع";
      // case "company_user":
      //   return "موظف صيانة";
      case "tech_user":
        return "تقني";
    }
  };

  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map((dat) => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  }

  UserRow = ({ index, user, position, dropdownData }) => {
    return (
      <tr key={index} style={{ opacity: !user.isActivated ? 0.5 : 1 }}>
        <th scope="row">{index}</th>
        <td>
          {!user.avatar ? (
            "لا يوجد"
          ) : (
              <div className="avatar">
                <img
                  src={
                    !user.avatar.split("").includes("http")
                      ? `https://${user.avatar}`
                      : user.avatar
                  }
                  style={{ width: "36px", height: "36px" }}
                  className="img-avatar"
                />
                <span
                  className={`avatar-status badge-${
                    user.isActivated ? "primary" : "danger"
                    }`}
                ></span>
              </div>
            )}
        </td>
        <td>{user.display_name}</td>
        {/* <td><Link to={userLink}>{user.display_name}</Link></td> */}
        <td>{user.username}</td>
        <td>{new ListUsers().getUserType(user.user_type)}</td>
        {position &&
          (position.__typename == "branch" ? (
            <td>
              <b>
                <Link to={`/branches/${position[Object.keys(position)[1]]}`}>
                  {position[Object.keys(position)[0]]}
                </Link>
              </b>
            </td>
          ) : (
              <td>
                <b>{position[Object.keys(position)[0]]}</b>
              </td>
            ))}
        {this.props.type == "branches" && (
          <Fragment>
            <td>{user.email}</td>
            <td>{user.employee_number}</td>
          </Fragment>
        )}
        <td>{new ListUsers().getDate(user.created_at)}</td>
        <EditUser
          userType={user.user_type}
          dropdownData={dropdownData || false}
          user={user}
          position={position || false}
          type={this.props.type}
        />
      </tr>
    );
  };

  render() {
    let { query } = this.state,
      { type, dropdownData } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            {query && (
              <Subscription subscription={query}>
                {({ loading, error, data }) => {
                  if (loading) return <Loader />;
                  if (error) return <Error />;

                  if (Object.keys(data).length) {
                    let users = data[Object.keys(data)[0]];

                    let mainTab = (
                      <div>
                        <Collapse
                          buttonLabel={<b>أضف جديد +</b>}
                          body={
                            <CreateUser
                              dropdownData={dropdownData}
                              type={this.props.type}
                            />
                          }
                        />
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }}>
                              <i className="fa fa-map-marker"></i>
                            </span>
                            <b>عرض الموظفين</b>
                          </CardHeader>
                          <CardBody>
                            <Table
                              responsive
                              hover
                              style={{ textAlign: "center" }}
                            >
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الصورة</th>
                                  <th scope="col">الاسم المعروض</th>
                                  <th scope="col">اسم الدخول</th>
                                  <th scope="col">الوظيفة</th>
                                  {[
                                    "branches",
                                    "maintainance",
                                    "departments",
                                  ].includes(type) && (
                                      <Fragment>
                                        <th scope="col">
                                          {type == "branches"
                                            ? "الفرع"
                                            : type == "maintainance"
                                              ? "شركة الصيانة"
                                              : type == "departments"
                                                ? "القسم"
                                                : ""}
                                        </th>
                                        {type == "branches" && (
                                          <Fragment>
                                            <th scope="col">البريد الإلكترونى</th>
                                            <th scope="col">رقم الموظف</th>
                                          </Fragment>
                                        )}
                                      </Fragment>
                                    )}
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {users.map((user, index) => {
                                  let userObj = user.user_type
                                    ? user
                                    : user[Object.keys(user)[0]],
                                    position = user.user_type
                                      ? false
                                      : user[Object.keys(user)[1]];

                                  if (type == "branches")
                                    userObj = {
                                      ...userObj,
                                      email: user.email,
                                      employee_number: user.employee_number,
                                    };

                                  if (userObj.isActivated)
                                    return (
                                      <this.UserRow
                                        index={index + 1}
                                        key={index}
                                        user={userObj}
                                        position={position}
                                        dropdownData={dropdownData}
                                      />
                                    );
                                })}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </div>
                    );

                    let secondaryTab = (
                      <div>
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }}>
                              <i className="fa fa-map-marker"></i>
                            </span>
                            <b>عرض الموظفين</b>
                          </CardHeader>
                          <CardBody>
                            <Table
                              responsive
                              hover
                              style={{ textAlign: "center" }}
                            >
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الصورة</th>
                                  <th scope="col">الاسم المعروض</th>
                                  <th scope="col">اسم الدخول</th>
                                  <th scope="col">الوظيفة</th>
                                  {[
                                    "branches",
                                    "maintainance",
                                    "departments",
                                  ].includes(type) && (
                                      <Fragment>
                                        <th scope="col">
                                          {type == "branches"
                                            ? "الفرع"
                                            : type == "maintainance"
                                              ? "شركة الصيانة"
                                              : type == "departments"
                                                ? "القسم"
                                                : ""}
                                        </th>
                                        {type == "branches" && (
                                          <Fragment>
                                            <th scope="col">البريد الإلكترونى</th>
                                            <th scope="col">رقم الموظف</th>
                                          </Fragment>
                                        )}
                                      </Fragment>
                                    )}
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {users.map((user, index) => {
                                  let userObj = user.user_type
                                    ? user
                                    : user[Object.keys(user)[0]],
                                    position = user.user_type
                                      ? false
                                      : user[Object.keys(user)[1]];

                                  if (type == "branches")
                                    userObj = {
                                      ...userObj,
                                      email: user.email,
                                      employee_number: user.employee_number,
                                    };
                                  if (!userObj.isActivated)
                                    return (
                                      <this.UserRow
                                        index={index + 1}
                                        key={index}
                                        user={userObj}
                                        position={position}
                                      />
                                    );
                                })}
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </div>
                    );

                    let dataTabs = [
                      {
                        label: <b>موظفين مفعلين</b>,
                        body: mainTab,
                      },
                      {
                        label: <b>موظفين غير مفعلين</b>,
                        body: secondaryTab,
                      },
                    ];

                    return <Tabs data={dataTabs} />;
                  } else
                    return (
                      <div>
                        <Collapse
                          buttonLabel={<b>أضف جديد +</b>}
                          body={
                            <CreateUser
                              appindNewUser={this.appindNewUser}
                              dropdownData={this.props.dropdownData}
                              type={this.props.type}
                            />
                          }
                        />
                        <NoResults />
                      </div>
                    );
                }}
              </Subscription>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

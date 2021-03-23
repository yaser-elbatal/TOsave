import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Alert } from "reactstrap";
import Get_list from "../../Queries/BranshesQuery/BranchesList";
import { Subscription, Query } from "react-apollo";

import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import ModalImage from "react-modal-image";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import CreateBranch from "./CreateBranch";
import Collapse from '../../views/Components/Custom/Collapse/Collapse';
import logo from '../../assets/img/default.png'

class BranchesList extends Component {


  render() {
    return (
      <React.Fragment>
        <Collapse
          buttonLabel={<b>فرع جديد +</b>}
          body={<CreateBranch />}
        />
        <Query query={Get_list}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                  <Loader />
                </div>
              );
            if (error) return <Error />;

            if (data.branch.length) {
              return (
                <div className="animated fadeIn" >
                  <Row>
                    <Col>
                      <Card>
                        <CardHeader style={{ backgroundColor: "white" }}>
                          <i className="fa fa-align-justify"></i>
                           الفروع
                      </CardHeader>
                        <CardBody style={{ backgroundColor: '#F0FDFD' }}>
                          <Table
                            responsive
                            hover
                            style={{
                              textAlign: "center",
                              fontFamily: "'El Messiri', sans-serif",
                              border: "1px solid #EDC9Af"
                            }}
                          >
                            <thead style={{ backgroundColor: '#C1EDEA', }}>
                              <tr>
                                <th scope="col">#</th>
                                {/* <th scope="col">صوره الفرع</th> */}
                                <th scope="col">اسم الفرع</th>
                                <th scope="col"> مدير الفرع</th>
                                <th scope="col">رقم الفرع</th>
                                <th scope="col">الوصف</th>
                                <th scope="col">التفاصيل</th>
                              </tr>
                            </thead>
                            <tbody style={{ backgroundColor: 'white' }}>
                              {data.branch.map((branch, ind) => {
                                return (
                                  <tr key={ind}>
                                    <th scope="row">{branch.id}</th>
                                    {/* <td>
                                      <div
                                        style={{
                                          maxWidth: "38px",
                                          borderRadius: "50em",
                                          margin: "auto",
                                          cursor: "pointer"
                                        }}
                                      >
                                        <ModalImage
                                          className="img-avatar"
                                          smallSrcSet={<img src={branch.avatar} defaultValue={logo} defaultChecked={true} alt={'logo'} onError={'../../assets/img/default.png'} />}
                                          large={branch.avatar}
                                          alt={branch.name}

                                        />
                                      </div>
                                    </td> */}

                                    <td>{branch.name}</td>


                                    <td>
                                      {branch.branch_manager_emp && branch.branch_manager_emp.employee_user == null ? "لم يتم تحديديه بعد"
                                        : branch.branch_manager_emp.employee_user && branch.branch_manager_emp.employee_user.display_name}
                                    </td>
                                    <td>{branch.branch_number}</td>
                                    <td>{branch.about}</td>

                                    <td>
                                      <Link
                                        className="btn btn-primary"
                                        style={{
                                          cursor: "pointer",
                                          color: "white"
                                        }}
                                        to={`/branches/${branch.id}`}
                                      >
                                        {" "}
                                        التفاصيل{" "}
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              );
            } else
              return (
                <Alert color="warning">
                  <NoResults />{" "}
                </Alert>
              );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default BranchesList;

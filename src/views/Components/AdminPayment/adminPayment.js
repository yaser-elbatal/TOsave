import React, { Component } from "react";
import { Query } from "react-apollo";
import getPayment from "./AdminPaymentQuery";
import Loader from "../Custom/Loader/Loader";
import Error from "../Custom/Error/Error";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import EditPayment from "./EditPayment";
import CreatePayment from "./CreatePayment";
import Collapse from "../Custom/Collapse/Collapse";

export class adminPayment extends Component {
  render() {
    const user_id = JSON.parse(localStorage.getItem("AnnatLogin")).id;
    console.log(user_id);

    return (
      <Query query={getPayment} variables={{ user_id: user_id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;
          console.log(data.user);

          const payment = data.user[0].user_payment_info;
          console.log(payment);

          return !payment ? (
            <div>
              {" "}
              <Collapse
                buttonLabel={<b>حساب جديد +</b>}
                body={<CreatePayment user_id={user_id} />}
              />
            </div>
          ) : (
            <div className="animated fadeIn">
              {
                <div>
                  <Row key={data.user.id}>
                    <Col lg={6}>
                      <Card>
                        <CardHeader>
                          <strong>
                            <i className="icon-info pr-1"></i> بيانات الحساب
                          </strong>
                        </CardHeader>
                        <CardBody>
                          <Table>
                            <tbody style={{ fontSize: "15px" }}>
                              {
                                <React.Fragment>
                                  <tr>
                                    <td> اسم المالك: </td>
                                    <td>{payment.holder_name}</td>
                                  </tr>
                                  <tr>
                                    <td> رقم البطافه: </td>
                                    <td>{payment.card_number}</td>
                                  </tr>
                                  <tr>
                                    <td> رمز التحقق: </td>
                                    <td>{payment.cvc}</td>
                                  </tr>
                                  <tr>
                                    <td> الشهر/السنه : </td>
                                    <td>
                                      {payment.year}/{payment.month}
                                    </td>
                                  </tr>

                                  <tr>
                                    <td></td>
                                    <td>
                                      <EditPayment payment={payment} />
                                    </td>
                                  </tr>
                                </React.Fragment>
                              }
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </div>
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default adminPayment;

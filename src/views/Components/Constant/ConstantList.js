import React, { Component } from "react";
import Get_const from "./ConstanceQuery";
import { Query } from "react-apollo";
import Loader from "../Custom/Loader/Loader";
import Error from "../Custom/Error/Error";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import Collapse from "../Custom/Collapse/Collapse";
import Createscalars from "./Createscalars";
import EditScal from "./EditScal";

export class ConstantList extends Component {
  render() {
    return (
      <Query query={Get_const}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;

          const getDate = isoDate => {
            let date = new Date(isoDate).toLocaleString();
            date = date
              .split(",")[0]
              .split("/")
              .map(dat => (dat < 10 && "0" + dat) || dat);
            date = date[1] + "/" + date[0] + "/" + date[2];

            return date;
          };

          const DataScal = data.scalars[0];
          console.log(DataScal);

          return !DataScal ? (
            <div>
              <Collapse buttonLabel={<b> جديد +</b>} body={<Createscalars />} />
            </div>
          ) : (
            <div className="animated fadeIn">
              {
                <div>
                  <Row key={data.scalars.id}>
                    <Col lg={6}>
                      <Card>
                        <CardHeader>
                          <strong>
                            <i className="icon-info pr-1"></i> ثوابت النظام
                          </strong>
                        </CardHeader>
                        <CardBody>
                          <Table>
                            <tbody style={{ fontSize: "15px" }}>
                              {
                                <React.Fragment>
                                  <tr>
                                    <td> تاريخ الانشاء: </td>
                                    <td>{getDate(DataScal.created_at)}</td>
                                  </tr>
                                  <tr>
                                    <td> سعر المركز: </td>
                                    <td>{DataScal.organization_hour_price}</td>
                                  </tr>
                                  <tr>
                                    <td> سعرالساعه لمزود الخدمه: </td>
                                    <td>{DataScal.sitter_hour_price}</td>
                                  </tr>
                                  <tr>
                                    <td> سعر مزود الخدمه لذهاب للمنزل: </td>
                                    <td>{DataScal.provider_to_home_price}</td>
                                  </tr>
                                  <tr>
                                    <td> سعر الغرامه بالدقيقه: </td>
                                    <td>{DataScal.fine_minute_price}</td>
                                  </tr>
                                  <tr>
                                    <td> نسبه ربح التطبيق: </td>
                                    <td>
                                      {DataScal.app_percentage}
                                      <span>%</span>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td></td>
                                    <td>
                                      <EditScal DataScal={DataScal} />
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

export default ConstantList;

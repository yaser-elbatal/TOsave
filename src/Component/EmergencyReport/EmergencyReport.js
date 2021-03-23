import React, { Component } from "react";
import { Query } from "react-apollo";
import { EmergenctReportDetailes } from "../../Queries/EmergencyQuery/EmergencyQuery";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import { Row, Col, Card, CardHeader, CardBody, Table, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import ViewVidImg from "./ViewVidImg";

export class EmergencyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
    };
  }
  componentDidMount() {
    this.setState({ filter: this.props.filter });
  }

  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.props;
    if (filter != prevProps.filter) this.setState({ filter });
    console.log(filter);
  }

  render() {
    return (
      <Query
        query={EmergenctReportDetailes}
        variables={{
          filter: this.state.filter
            ? {
              emergency_report_department: {
                department_id: { _eq: parseInt(this.state.filter) },
              },
            }
            : {},
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;
          if (data.emergency_report.length) {
            const getDate = (isoDate) => {
              let date = new Date(isoDate).toLocaleString();
              date = date
                .split(",")[0]
                .split("/")
                .map((dat) => (dat < 10 && "0" + dat) || dat);
              date = date[1] + "/" + date[0] + "/" + date[2];

              return date;
            };

            return (
              <div className="animated fadeIn" style={{ marginTop: "100px" }}>
                <Row>
                  <Col xl={12}>
                    <Card>
                      <CardHeader>
                        <i
                          style={{ fontSize: "30px", color: "red" }}
                          className="fa fa-ambulance"
                        ></i>
                        <b>تقارير الطواريء</b>
                      </CardHeader>
                      <CardBody>
                        <Table responsive hover>
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th
                                scope="col"
                                style={{ textAlign: "center", margin: "auto" }}
                              >
                                الوصف
                              </th>
                              <th scope="col">تاريخ الانشاء</th>
                              <th scope="col">اخرتحديث</th>
                              <th
                                scope="col"
                                style={{ textAlign: "center", margin: "auto" }}
                              >
                                فرع
                              </th>
                              <th scope="col" style={{ textAlign: "center" }}>
                                الحي
                              </th>
                              <th scope="col">موظف التقرير</th>
                              <th scope="col">متعلقات التقرير</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.emergency_report && data.emergency_report.map((em) => {

                              let neighborhoodNameAr =

                                em.emergency_report_branch
                                  .branch_neighborhood == null
                                  ? ""
                                  : em.emergency_report_branch
                                    .branch_neighborhood.name;
                              let neighborhoodNameEn =
                                em.emergency_report_branch
                                  .branch_neighborhood == null
                                  ? ""
                                  : em.emergency_report_branch
                                    .branch_neighborhood.name_en;

                              return (
                                <tr key={em.id}>
                                  <th>{em.id}</th>
                                  <td style={{ fontSize: "15px" }}>
                                    <Badge
                                      style={{ padding: "10px" }}
                                      color="info"
                                    >
                                      {em.description}
                                    </Badge>
                                  </td>
                                  <td>{getDate(em.created_at)}</td>
                                  <td>{getDate(em.updated_at)}</td>
                                  <td>
                                    <Badge
                                      style={{ padding: "10px" }}
                                      color="success"
                                    >
                                      <span>
                                        ({em.emergency_report_branch.name_en})-(
                                        {em.emergency_report_branch.name})
                                      </span>
                                    </Badge>
                                  </td>
                                  <td>
                                    <Badge
                                      style={{ padding: "10px" }}
                                      color="primary"
                                    >
                                      <span>
                                        {`(${neighborhoodNameAr})-(${neighborhoodNameEn})`}
                                      </span>
                                    </Badge>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/user/${em.emergency_report_user.id}`}
                                    >
                                      {em.emergency_report_user.display_name}
                                    </Link>
                                    <p>
                                      ({em.emergency_report_user.user_type})
                                    </p>
                                  </td>
                                  <td>
                                    <ViewVidImg assets={em.assets} />
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
          } else return <NoResults />;
        }}
      </Query>
    );
  }
}

export default EmergencyReport;

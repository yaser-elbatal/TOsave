import React, { Component } from "react";
import { Query } from "react-apollo";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import { Table, CardHeader, CardBody, Badge, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { IncidentReport } from "../../Queries/IncidentQuery/IncidentReportQuery";

export class IncidentReportList extends Component {
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
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <Query
          query={IncidentReport}
          variables={{
            filter: this.state.filter
              ? { branch_id: { _eq: parseInt(this.state.filter) } }
              : {},
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) {
              console.log("Error In IncidentReportList", error);
              return <Error />;
            }
            if (data.incident_report.length) {
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
                <Card>
                  <CardHeader>
                    <Badge
                      color="danger"
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        padding: "15px",
                      }}
                    >
                      <i className="fa fa-user"></i> تقارير الاصابه
                    </Badge>
                  </CardHeader>
                  <CardBody>
                    <Table
                      dark
                      striped
                      bordered
                      style={{ textAlign: "center" }}
                    >
                      <thead>
                        <tr>
                          <th> # </th>
                          <th>فرع</th>
                          <th style={{ marginRight: "20px" }}>
                            تاريخ انشاء التقرير
                          </th>
                          <th>وقت الحادثه</th>
                          <th>اخر تحديث</th>
                          <th>اسم المنشأ</th>
                          <th>التفاصيل</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.incident_report.map((inc) => {
                          return (
                            <tr key={inc.id}>
                              <th>{inc.id}</th>
                              <td style={{ marginLeft: "30px" }}>
                                <Badge
                                  color="info"
                                  style={{
                                    padding: "10px",
                                    fontSize: "15px",
                                    textAlign: "center",
                                  }}
                                >
                                  {inc.incident_branch.name}
                                </Badge>
                              </td>
                              <td>{getDate(inc.created_at)}</td>
                              <td>{inc.incident_date}</td>
                              <td>{getDate(inc.updated_at)}</td>

                              {/* <td>
                                <Link to={`/user/${inc.created_by.id}`}>
                                  {inc.created_by &&
                                    inc.created_by.employee_user.display_name}
                                </Link>
                              </td> */}

                              <td>
                                <Link
                                  to={`/user/${inc.incident_report_user.id}`}
                                >
                                  {inc.incident_report_user &&
                                    inc.incident_report_user.display_name}
                                </Link>
                              </td>

                              <td>
                                <Link
                                  to={`/incident/${inc.id}`}
                                  className="btn btn-success"
                                >
                                  عرض
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              );
            } else return <NoResults />;
          }}
        </Query>
      </div>
    );
  }
}

export default IncidentReportList;

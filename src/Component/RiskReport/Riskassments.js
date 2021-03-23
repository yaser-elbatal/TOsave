import React, { Component } from "react";
import { Subscription } from "react-apollo";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import { Link } from "react-router-dom";

import { CardHeader, Badge, Table } from "reactstrap";
import { Risk_Assments } from "../../Queries/RiskAssmentsQuery/RiskassmentsList";

export class RiskassmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchId: false
    };
  }
  componentDidMount() {
    this.setState({ branchId: this.props.branchId });
  }

  componentDidUpdate(prevProps, prevState) {
    const { branchId } = this.props;
    if (branchId != prevProps.branchId) this.setState({ branchId });

    console.log(branchId);
  }


  render() {
    return (
      <div>
        <Subscription subscription={Risk_Assments} variables={{
          filterBranch: this.state.branchId ? { branch_id: { "_eq": parseInt(this.state.branchId) } } : {}
        }}>

          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <Error />;

            if (data.risk_assessment.length) {
              const getDate = isoDate => {
                let date = new Date(isoDate).toLocaleString();
                date = date
                  .split(",")[0]
                  .split("/")
                  .map(dat => (dat < 10 && "0" + dat) || dat);
                date = date[1] + "/" + date[0] + "/" + date[2];

                return date;
              };
              return (
                <React.Fragment>
                  <CardHeader>
                    <Badge
                      color="info"
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        padding: "15px"
                      }}
                    >
                      <i className="fa fa-flag"></i> تقييم المخاطر
                    </Badge>
                  </CardHeader>
                  <Table dark striped bordered style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th> # </th>
                        <th>اسم الفرع</th>

                        {/* <th style={{ marginRight: "20px" }}>المنشأ</th> */}
                        <th>تاريخ الانشاء</th>
                        <th>اخر تحديث</th>
                        <th>الحاله</th>
                        <th>التفاصيل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.risk_assessment.map(ris => {
                        return (
                          <tr key={ris.id}>
                            <th>{ris.id}</th>
                            <td>
                              <Link to={`/branches/${ris.branch_id}`}>
                                {ris.risk_assessment_branch &&
                                  ris.risk_assessment_branch.name}
                              </Link>
                            </td>
                            {/* <td>
                              <Link to={`/users/${ris.created_by}`}>
                                {ris.created_by}
                              </Link>
                            </td> */}

                            <td>{getDate(ris.created_at)}</td>
                            <td>{getDate(ris.updated_at)}</td>
                            <td style={{ marginLeft: "30px" }}>
                              <Badge
                                color={
                                  ris.state == "history" ? "danger" : "primary"
                                }
                                style={{
                                  padding: "10px",
                                  fontSize: "15px",
                                  textAlign: "center"
                                }}
                              >
                                {ris.state == "history" ? "قديمة" : "جديده"}
                              </Badge>
                            </td>

                            <td>
                              <Link
                                to={`/risk/${ris.id}`}
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
                </React.Fragment>
              );
            } else return <NoResults />;
          }}
        </Subscription>
      </div>
    );
  }
}

export default RiskassmentsList;

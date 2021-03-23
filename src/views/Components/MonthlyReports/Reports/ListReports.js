import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { Query } from "react-apollo";
import { List_Braches_Have_Reports } from "../../../../services/queries/MonthlyReports/Reports";
import Loader from "../../Custom/Loader/Loader";
import Error from "../../Custom/Error/Error";
import NoResults from "../../Custom/NoResults/NoResults";
import DrpDwn from "../../Custom/DropDown/DropDown";
import ReportsTable from "./ReportsTable";

export default class ListReports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      selectedBranchId: 0,
      selectedStatus: 0,
      selectedDate: 0,
    };
  }

  componentDidMount() { }

  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map((dat) => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  }

  onChange1 = (obj) => this.setState({ selectedBranchId: obj.id });
  onChange2 = (obj) => this.setState({ selectedStatus: obj.id });
  onChange3 = (obj) => this.setState({ selectedDate: obj.value });

  render() {
    console.log(this.state.selectedDate);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Braches_Have_Reports}>
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) {
                  console.log("Error", error);

                  return <Error />;
                }

                if (data.branches.length) {
                  let dropdownBranches = data.branches.map((brnch) => ({
                    id: brnch.monthely_branch.id,
                    value: `${brnch.monthely_branch.name_en} | ${brnch.monthely_branch.name}`,
                  })),
                    branchId =
                      this.state.selectedBranchId == 0
                        ? false
                        : this.state.selectedBranchId;

                  let dropdowBStatus = [
                    { id: 1, value: `جديد` },
                    { id: 2, value: `تحت المراجعة` },
                    { id: 3, value: `معتمد` },
                  ],
                    selectedStatus =
                      this.state.selectedStatus == 0
                        ? false
                        : this.state.selectedStatus;

                  let dropdownDates = data.locations
                    .filter(
                      (elm, i, arr) =>
                        arr.findIndex(
                          (f) => f.month == elm.month && f.year == elm.year
                        ) === i
                    )
                    .map((dt, ind) => ({
                      id: ind + 1,
                      value: `${dt.month}/${dt.year}`,
                    })),
                    selectedDate =
                      this.state.selectedDate == 0 ||
                        !this.state.selectedDate.split("").includes("/")
                        ? false
                        : this.state.selectedDate;

                  return (
                    <div>
                      <Row>
                        <Col xl={12}>
                          <div
                            style={{
                              marginBottom: "15px",
                              display: "inline-flex",
                            }}
                          >
                            <span style={{ marginLeft: "10px" }}>
                              <DrpDwn
                                data={[
                                  { id: 0, value: "كل الفروع" },
                                  ...dropdownBranches,
                                ]}
                                color="instagram"
                                onChange={this.onChange1}
                              />
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                              <DrpDwn
                                data={[
                                  { id: 0, value: "كل الحالات" },
                                  ...dropdowBStatus,
                                ]}
                                color="instagram"
                                onChange={this.onChange2}
                              />
                            </span>
                            <span>
                              <DrpDwn
                                data={[
                                  { id: 0, value: "كل التواريخ" },
                                  ...dropdownDates,
                                ]}
                                color="instagram"
                                onChange={this.onChange3}
                              />
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={12}>
                          <ReportsTable
                            branchId={branchId}
                            status={selectedStatus}
                            date={selectedDate}
                          />
                        </Col>
                      </Row>
                    </div>
                  );
                } else return <NoResults />;
              }}
            </Query>
          </Col>
        </Row>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Query } from "react-apollo";
import { filterBranch } from "../../Queries/IncidentQuery/IncidentReportQuery";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import { Row, Col } from "reactstrap";
import DrpDwn from "../../views/Components/Custom/DropDown/DropDown";
import IncidentReportList from "./IncidentReportList";

export class IncidentRebort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slectedBranchId: 0,
    };
  }
  onChange = (obj) => {
    this.setState({ slectedBranchId: obj.id });
  };

  componentDidMount() {
    console.log("this.state.slectedBranchId", this.state.slectedBranchId);
  }

  render() {
    return (
      <Query query={filterBranch}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;
          if (data.incident_report.length) {
            let branchIncidentRebort = data.incident_report.map((inc) => ({

              id: data.incident_report.incident_branch && inc.incident_branch.id,
              value: data.incident_report.incident_branch && `${inc.incident_branch.name}|${inc.incident_branch.name_en}`,
            }));
            return (
              <div>
                <Row>
                  <Col>
                    <DrpDwn
                      data={[
                        { id: 0, value: "كل الفروع" },
                        ...branchIncidentRebort,
                      ]}
                      color="instagram"
                      onChange={this.onChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <IncidentReportList
                      filter={
                        this.state.slectedBranchId == 0
                          ? false
                          : this.state.slectedBranchId
                      }
                    />
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

export default IncidentRebort;

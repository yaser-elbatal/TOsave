import React, { Component } from "react";
import { Col, Row, Table } from "reactstrap";
import { Query } from "react-apollo";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import DrpDwn from "../../views/Components/Custom/DropDown/DropDown";
import RiskassmentsList from "./Riskassments";
import { Branches_Have_Reports } from "../../Queries/RiskAssmentsQuery/RiskassmentsList";

export default class RiskReportDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      slectedBranchId: 0
    };
  }

  componentDidMount() { }

  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map(dat => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  }

  onChange = obj => this.setState({ slectedBranchId: obj.id });

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={Branches_Have_Reports}>
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <Error />;

                if (data.risk_assessment.length) {
                  let dropdownBranches = data.risk_assessment.map(mnthRep => ({
                    id: mnthRep.risk_assessment_branch.id,
                    value: `${mnthRep.risk_assessment_branch.name} | ${mnthRep.risk_assessment_branch.name_en}`
                  }));

                  return (
                    <div>
                      <Row>
                        <Col xl={12}>
                          <div style={{ marginBottom: "15px" }}>
                            <DrpDwn
                              data={[{ id: 0, value: "كل الفروع" }, ...dropdownBranches]}
                              color="instagram"
                              onChange={this.onChange}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={12}>
                          <RiskassmentsList
                            branchId={
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
          </Col>
        </Row>
      </div>
    );
  }
}

import React from 'react'
import ItemsBranchStatistic from './ItemsBranchStatistic'
import ImageStatistic from './ImageStatistic'
import { Subscription } from 'react-apollo'
import NoResults from '../../../views/Components/Custom/NoResults/NoResults'
import { allRisk } from '../../../Queries/RiskAssmentsQuery/RiskStatisticsQuery'
import DrpDwn from "../../../views/Components/Custom/DropDown/DropDown";
import { Col, Row, } from "reactstrap";
import Loader from '../../../views/Components/Custom/Loader/Loader'
import Error from '../../../views/Components/Custom/Error/Error'
import { Component } from 'react'


export default class RiskStatistic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      selectedBranchId: false,
      selectedDate: { id: 0 },
    };
  }

  componentDidMount() { }



  onChange = obj => this.setState({ selectedBranchId: obj.id });
  onChange3 = obj => this.setState({ 'selectedDate': obj })

  render() {
    return (
      <Subscription subscription={allRisk}>
        {
          ({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <Error />;
            if (data.risk_assessment.length) {

              let dropdownDates = data.risk_assessment.filter((elm, i, arr) => arr.findIndex(f => (f.created_at).split('T')[0].split('-')[1].split('0')[1] == (elm.created_at).split('T')[0].split('-')[1].split('0')[1]) === i)
                .map((dt, ind) => (
                  { id: (ind + 1), value: `${(dt.created_at).split('T')[0].split('-')[0]}` + '-' + `${(dt.created_at).split('T')[0].split('-')[1]}` }
                )),
                selectedDate = (this.state.selectedDate.id == "0") ? false : this.state.selectedDate.value

              let dropdownBranches = data.risk_assessment.map(mnthRep => ({
                id: mnthRep.risk_assessment_branch.id,
                value: `${mnthRep.risk_assessment_branch.name_en} | ${mnthRep.risk_assessment_branch.name}`
              })),
                selectedBranchId = this.state.selectedBranchId == "0" ? false : this.state.selectedBranchId
              console.log({ selectedDate, branchid: selectedBranchId });

              return (
                <div>
                  <Row>
                    <Col xl={12}>
                      <div style={{ marginBottom: "15px", flex: "auto", display: "flex" }} >
                        <span style={{ marginLeft: "10px" }}>
                          <DrpDwn
                            data={[{ id: 0, value: "كل الفروع" }, ...dropdownBranches]}
                            color="instagram"
                            onChange={this.onChange}
                          />
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          <DrpDwn data={[{ id: 0, value: "كل التواريخ" }, ...dropdownDates]} color="instagram" onChange={this.onChange3} />
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={12}>
                      <ItemsBranchStatistic branchId={selectedBranchId}
                        date={selectedDate} />
                      <ImageStatistic branchId={selectedBranchId} date={selectedDate} />
                    </Col>
                  </Row>
                </div>
              )



            } else return <NoResults />
          }
        }




      </Subscription>
    )
  }
}

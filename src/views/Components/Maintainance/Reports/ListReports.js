import React, { Component } from 'react';
import { Col, Row, } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Branches_Companies } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import DrpDwn from "../../Custom/DropDown/DropDown"
import ReportsTable from "./ReportsTable"


export default class ListReports extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      slectedBranchId: false,
      slectedCompanyId: false,
    }

  }

  componentDidMount() {
  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

  onChange = obj => this.setState({ slectedBranchId: obj.id })
  onChange2 = obj => this.setState({ slectedCompanyId: obj.id })

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Branches_Companies}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.order_type_display.length) {


                    // dropdownCompanies = data.maintainance_company.map(mComp => (
                    //   { id: mComp.id, value: `${mComp.company_name}` })
                    // );
                    let
                      dropdownBranches = data.order_type_display.map(brnch => (
                        { id: brnch.id, value: `${brnch.name} | ${brnch.name_en}` })
                      )



                    return (
                      <div>
                        <Row>
                          <Col xl={12}>
                            <div style={{ marginBottom: "15px", display: "inline-flex" }}>
                              <span style={{ marginLeft: "10px" }}>
                                <DrpDwn data={[{ id: 0, value: "نوع الصيانه" }, ...dropdownBranches]} color="instagram" onChange={this.onChange} />
                              </span>
                              {/* <span style={{ marginLeft: "10px" }}>
                                <DrpDwn data={[{ id: 0, value: "كل الشركات" }, ...dropdownCompanies]} color="instagram" onChange={this.onChange2} />
                              </span> */}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12}>
                            <ReportsTable branchId={this.state.slectedBranchId} companyId={this.state.slectedCompanyId} />
                          </Col>
                        </Row>
                      </div>
                    )
                  }
                  else return (<NoResults />);
                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}
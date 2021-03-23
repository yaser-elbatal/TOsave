import React, { Component, useCallback } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Subscription } from 'react-apollo';
import { BrowserRouter, Link } from 'react-router-dom';
import { List_Report_Comments } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import ImgModal from "react-modal-image";
import AddComment from "./AddComment";



let tdHeadStyle = { width: "25%", textAlign: "right", fontWeight: "700" },
  tdStyle = { width: "75%", textAlign: "right", }

export default class TabComments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reportId: false,
      mutation: 0,
      OrderId: null
    }

  }

  componentDidMount() {
    this.setState({ reportId: this.props.reportId })
  }


  getDate = (isoDate) => {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

  render() {
    let { data } = this.props;

    console.log(data);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div
              className="commentContainer"
              style={{
                maxHeight: "300px", overflow: "scroll", overflowX: "hidden", paddingLeft: "12px",
                paddingRight: "12px", marginBottom: "12px", border: "1px solid rgb(200, 206, 211)",
              }}>

              <div>
                <Table
                  responsive
                  borderless
                  hover
                  style={{ textAlign: "center" }}
                >
                  {
                    data.map(reb => {
                      return (
                        reb.maintenance_report_lifeCycle.map(re => {


                          return (
                            <div>


                              <tbody>
                                <tr>
                                  <td style={tdHeadStyle}>الحدث</td>
                                  <td style={tdStyle}>{re.action} </td>
                                </tr>
                                <tr>
                                  <td style={tdHeadStyle}>تاريخ الحدث</td>
                                  <td style={tdStyle}>{this.getDate(re.value)} </td>
                                </tr>
                              </tbody>
                              {
                                re.orderLifeCycleComment.map(cmnt => {
                                  return (
                                    <Card style={{ marginTop: "5px" }}>
                                      <CardHeader>
                                        <div style={{ display: '-webkit-flex' }}>
                                          <div style={{ display: "inline" }}>
                                            <div className="avatar">
                                              <img
                                                src={
                                                  cmnt.orderLifeCycle_comment_user.avata &&
                                                    !cmnt.orderLifeCycle_comment_user.avatar.includes("http") ?
                                                    `https://${cmnt.orderLifeCycle_comment_user.avatar}` :
                                                    cmnt.orderLifeCycle_comment_user.avatar
                                                }
                                                style={{ width: "36px", height: "36px" }}
                                                className="img-avatar"
                                              />
                                              <span
                                                className={`avatar-status badge-${
                                                  cmnt.orderLifeCycle_comment_user.isActivated ? "primary" : "danger"
                                                  }`}
                                              ></span>
                                            </div>
                                            <div  >
                                              <BrowserRouter basename="/users" />
                                              <Link
                                                to={`/users/${cmnt.orderLifeCycle_comment_user.id}`}
                                              >{cmnt.orderLifeCycle_comment_user.display_name}</Link>
                                            </div>
                                          </div>
                                          <div style={{ position: "absolute", left: "12px", top: "17px" }}>
                                            <div className="small text-muted">تاريخ الرسالة {this.getDate(cmnt.created_at)}</div>
                                            <div className="small text-muted">تاريخ آخر تعديل {this.getDate(cmnt.updated_at)}</div>
                                          </div>
                                        </div>
                                      </CardHeader>
                                      <CardBody style={{ backgroundColor: "#e8e8e861" }}>
                                        {cmnt.comment && <div style={{ display: 'flex' }}><b>{cmnt.comment}</b></div>}
                                        {/* {cmnt.images &&
                                          <div style={{ display: "flex", flexWrap: "wrap", border: "1px solid #d6d6d6", marginTop: "5px" }}>
                                            {images}
                                          </div>
                                        } */}
                                      </CardBody>
                                    </Card>

                                  )
                                })
                              }
                            </div>

                          )
                        })

                      )
                    })
                  }

                </Table>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <AddComment user_id={JSON.parse(localStorage.sacoAdmin).id} reportId={this.props.reportId} />
          </Col>
        </Row>

      </div>

    )
  }
}



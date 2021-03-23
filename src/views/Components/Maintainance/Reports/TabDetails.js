import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Report_Details, List_Items_Cats } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import TableDetails from "./TableDetails"
import { config } from 'aws-sdk';
import { Badge } from 'react-bootstrap';



export default class DetailsQuery extends Component {

  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]
    return date;
  }


  render() {

    let { data } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            {data.map((dat, ind) => {
              return (
                <Card key={ind} style={{ marginTop: "5px" }}>
                  <CardHeader>
                    <span>
                      <b>{`${ind + 1} - التصنيف [${dat.maintenance_report_category.name_en}]`}</b>
                    </span>
                    {dat.isNeglected && (
                      <span style={{ marginRight: "10px" }}>
                        <Badge style={{ fontSize: "15px" }} color="danger">
                          تم حذف التصنيف
                    </Badge>
                      </span>
                    )}
                  </CardHeader>
                  <CardBody style={{ backgroundColor: "#e8e8e861" }}>
                    {data.map((itm, ind, itms) => (
                      <div
                        key={ind}
                        style={{
                          backgroundColor: "#E8F3F8",
                          padding: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "inline",
                              fontWeight: "600",
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <div style={{ marginLeft: "10px" }}>{`${
                              ind + 1
                              } - العنصر [${itm.maintenance_report_category.name}]`}</div>
                            {itm.isNeglected && (
                              <div style={{ marginLeft: "10px" }}>
                                <Badge style={{ fontSize: "15px" }} color="danger">
                                  تم حذف العنصر
                            </Badge>
                              </div>
                            )}
                          </div>
                          <div className="small text-muted">
                            تاريخ الإنشاء {this.getDate(itm.maintenance_report_category.created_at)}
                          </div>
                        </div>
                        <div
                          style={{ margin: "7px 7px 7px 0px" }}
                        >
                          <img
                            src={itm.maintenance_report_category.image}
                            style={{ width: "10%" }}
                          />
                        </div>


                      </div>
                    ))}
                  </CardBody>
                </Card>
              );
            })}
          </Col>
        </Row>
      </div>
    )
  }
}



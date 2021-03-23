import React, { Component, useCallback } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import { BrowserRouter, Link } from "react-router-dom";
import ImgModal from "react-modal-image";

export default class TabComments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  getDate = (isoDate) => {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map((dat) => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  };

  render() {
    let { data } = this.props;
    return (
      <div>
        {this.props.data.map((dat, ind) => {
          return (
            <Card key={ind} style={{ marginTop: "5px" }}>
              <CardHeader>
                <span>
                  <b>{`${ind + 1} - التصنيف [${dat.name_ar}]`}</b>
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
                {dat.items.map((itm, ind, itms) => (
                  <div
                    key={ind}
                    style={{
                      backgroundColor: "#f7e4c8",
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
                        } - العنصر [${itm.name_ar}]`}</div>
                        {itm.isNeglected && (
                          <div style={{ marginLeft: "10px" }}>
                            <Badge style={{ fontSize: "15px" }} color="danger">
                              تم حذف العنصر
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="small text-muted">
                        تاريخ الإنشاء {this.getDate(itm.created_at)}
                      </div>
                    </div>
                    <div style={{ fontWeight: 500, padding: "15px" }}>
                      عدد الأجزاء التى تم تغييرها ({itm.details.amount})
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  }
}

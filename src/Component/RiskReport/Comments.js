import React, { Component } from "react";
import { Get_Comments } from "../../Queries/RiskAssmentsQuery/RiskAssments";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import { Subscription } from "react-apollo";
import ImgModal from "react-modal-image";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { BrowserRouter, Link } from "react-router-dom";
import AddComments from "./AddComment";

export class Comments extends Component {
  render() {
    return (
      <div>
        <Subscription
          subscription={Get_Comments}
          variables={{ report_id: this.props.reportId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <Error />;
            const getDate = isoDate => {
              let date = new Date(isoDate).toLocaleString();
              date = date
                .split(",")[0]
                .split("/")
                .map(dat => (dat < 10 && "0" + dat) || dat);
              date = date[1] + "/" + date[0] + "/" + date[2];

              return date;
            };

            if (data.risk_assessment_report_comments.length) {
              return (
                <div>
                  {data.risk_assessment_report_comments.map((cmnt, ind) => {
                    let images = cmnt.images
                      .split(",")
                      .filter(Boolean)
                      .map((img, ind) => {
                        let editedImg = !img.includes("http")
                          ? `https://${img}`
                          : img;
                        return (
                          <div
                            key={ind}
                            style={{ width: "40px", margin: "7px 7px 7px 0px" }}
                          >
                            <ImgModal
                              small={editedImg}
                              large={editedImg}
                              alt={`صورة توضيحية - ${ind + 1}`}
                            />
                          </div>
                        );
                      });

                    return (
                      <Card key={ind} style={{ marginTop: "5px" }}>
                        <CardHeader>
                          <div>
                            <div style={{ display: "inline" }}>
                              <div className="avatar">
                                <img
                                  src={
                                    cmnt.risk_assessment_report_comments_user
                                      .avatar
                                  }
                                  style={{ width: "36px", height: "36px" }}
                                  className="img-avatar"
                                />
                                <span
                                  className={`avatar-status badge-${
                                    cmnt.risk_assessment_report_comments_user
                                      .active
                                      ? "primary"
                                      : "danger"
                                  }`}
                                ></span>
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  right: "75px",
                                  top: "18px"
                                }}
                              >
                                <BrowserRouter basename="/users" />
                                <Link
                                  to={`/users/${cmnt.risk_assessment_report_comments_user.id}`}
                                >
                                  {
                                    cmnt.risk_assessment_report_comments_user
                                      .username
                                  }
                                </Link>
                              </div>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: "12px",
                                top: "17px"
                              }}
                            >
                              <div className="small text-muted">
                                تاريخ الرسالة {getDate(cmnt.created_at)}
                              </div>
                              <div className="small text-muted">
                                تاريخ آخر تعديل {getDate(cmnt.updated_at)}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardBody style={{ backgroundColor: "#e8e8e861" }}>
                          {cmnt.comment && (
                            <div>
                              <b>{cmnt.comment}</b>
                            </div>
                          )}
                          {cmnt.images && (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                border: "1px solid #d6d6d6",
                                marginTop: "5px"
                              }}
                            >
                              {images}
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
              );
            } else return <NoResults />;
          }}
        </Subscription>
        <Row>
          <Col xl={12}>
            <AddComments
              user_id={JSON.parse(localStorage.sacoAdmin).id}
              report_id={this.props.reportId}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Comments;

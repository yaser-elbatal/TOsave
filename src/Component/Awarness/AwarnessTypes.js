import React, { Component } from "react";
import { Subscription } from "react-apollo";
import { AwarnesDetailes } from "../../Queries/Awarness Queries/Awarness";
import Error from "../../views/Components/Custom/Error/Error";
import Loader from "../../views/Components/Custom/Loader/Loader";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import Tabs from "../../views/Components/Custom/Tabs/Tabs";
import { Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

import { CardHeader, Badge, Table, Button } from "reactstrap";

export class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      //
      photoIndex: 0,
      showImages: null,
    };
  }

  componentDidMount() {
    this.setState({ filter: this.props.filter });
  }

  componentDidUpdate() {
    const { filter } = this.props;
    if (filter != this.state.filter) this.setState({ filter });
  }

  render() {
    const { photoIndex, showImages } = this.state;

    // console.log("showImages", showImages);
    return (
      <Subscription
        subscription={AwarnesDetailes}
        variables={{
          filter:
            this.state.filter == "All Training" || !this.state.filter
              ? {}
              : { training_category: { _eq: this.state.filter } },
        }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                <Loader />
              </div>
            );
          if (error) return <Error />;

          if (data.training_report.length) {
            console.log("data.training_report", data.training_report);


            const getDate = (isoDate) => {
              let date = new Date(isoDate).toLocaleString();
              date = date
                .split(",")[0]
                .split("/")
                .map((dat) => (dat < 10 && "0" + dat) || dat);
              date = date[1] + "/" + date[0] + "/" + date[2];

              return date;
            };

            let mainTab = (
              <Table dark striped bordered style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th> # </th>
                    <th>نوع التدريب</th>
                    <th style={{ marginRight: "20px" }}>تاريخ الانشاء</th>
                    <th>وقت الحدوث</th>
                    <th>اخر تحديث</th>
                    <th>اسم الفرع</th>
                    <th>الصور</th>
                    <th>التفاصيل</th>
                  </tr>
                </thead>
                <tbody>
                  {data.training_report.map((ris) => {
                    const images = ris.avatar ? ris.avatar.split(",") : null;
                    const employesLength =
                      ris.training_employees_aggregate.aggregate.count;
                    if (ris.status == 0)
                      return (
                        <tr key={ris.id}>
                          <th>{ris.id}</th>
                          <td style={{ marginLeft: "30px" }}>
                            <Badge
                              color="success"
                              style={{
                                padding: "10px",
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {ris.training_category}
                            </Badge>
                          </td>
                          <td>{getDate(ris.created_at)}</td>
                          <td>{ris.occured_at}</td>
                          <td>{getDate(ris.updated_at)}</td>

                          <td>
                            <Link to={`/branches/${ris.branch}`}>
                              {ris.training_branch && ris.training_branch.name}
                            </Link>
                          </td>

                          <td>
                            {images ? (
                              <Button
                                className="btn btn-success"
                                onClick={(e) => {
                                  this.setState({
                                    showImages: images,
                                  });
                                }}
                              >
                                عرض الصور
                              </Button>
                            ) : (
                                <span>لا يوجد صور</span>
                              )}
                            {this.state.showImages && (
                              <Lightbox
                                reactModalStyle={{
                                  overlay: {
                                    zIndex: 9999,
                                  },
                                }}
                                className="img-avatar"
                                mainSrc={showImages[photoIndex]}
                                nextSrc={
                                  showImages[
                                  (photoIndex + 1) % showImages.length
                                  ]
                                }
                                prevSrc={
                                  showImages[
                                  (photoIndex + showImages.length - 1) %
                                  showImages.length
                                  ]
                                }
                                alt={ris.name}
                                onCloseRequest={() =>
                                  this.setState({ showImages: null })
                                }
                                onMovePrevRequest={() =>
                                  this.setState({
                                    photoIndex:
                                      (photoIndex + showImages.length - 1) %
                                      showImages.length,
                                  })
                                }
                                onMoveNextRequest={() =>
                                  this.setState({
                                    photoIndex:
                                      (photoIndex + 1) % showImages.length,
                                  })
                                }
                                closeLabel="إغلاق"
                              />
                            )}
                          </td>
                          <td>
                            {employesLength > 0 ? (
                              <Link
                                to={`/Aware/${ris.id}`}
                                className="btn btn-success"
                              >
                                عرض
                              </Link>
                            ) : (
                                <span>لا يوجد</span>
                              )}
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </Table>
            );
            let secondaryTab = (
              <Table dark striped bordered style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th> # </th>
                    <th>نوع التدريب</th>

                    <th style={{ marginRight: "20px" }}>تاريخ الانشاء</th>
                    <th>وقت الحدوث</th>
                    <th>اخر تحديث</th>
                    <th>اسم الفرع</th>
                    <th>الصور</th>
                    <th>التفاصيل</th>
                  </tr>
                </thead>
                <tbody>
                  {data.training_report.map((ris) => {
                    const images = ris.avatar ? ris.avatar.split(",") : null;
                    const employesLength =
                      ris.training_employees_aggregate.aggregate.count;
                    if (ris.status == 1)
                      return (
                        <tr key={ris.id}>
                          <th>{ris.id}</th>
                          <td style={{ marginLeft: "30px" }}>
                            <Badge
                              color="success"
                              style={{
                                padding: "10px",
                                fontSize: "15px",
                                textAlign: "center",
                              }}
                            >
                              {ris.training_category}
                            </Badge>
                          </td>
                          <td>{getDate(ris.created_at)}</td>
                          <td>{ris.occured_at}</td>
                          <td>{getDate(ris.updated_at)}</td>

                          <td>
                            <Link to={`/branches/${ris.branch}`}>
                              {ris.training_branch && ris.training_branch.name}
                            </Link>
                          </td>

                          <td>
                            {images ? (
                              <Button
                                className="btn btn-success"
                                onClick={(e) => {
                                  this.setState({
                                    showImages: images,
                                  });
                                }}
                              >
                                عرض الصور
                              </Button>
                            ) : (
                                <span>لا يوجد صور</span>
                              )}
                            {this.state.showImages && (
                              <Lightbox
                                reactModalStyle={{
                                  overlay: {
                                    zIndex: 9999,
                                  },
                                }}
                                className="img-avatar"
                                mainSrc={`https://${showImages[photoIndex]}`}
                                nextSrc={
                                  showImages[
                                  (photoIndex + 1) % showImages.length
                                  ]
                                }
                                prevSrc={
                                  showImages[
                                  (photoIndex + showImages.length - 1) %
                                  showImages.length
                                  ]
                                }
                                alt={ris.name}
                                onCloseRequest={() =>
                                  this.setState({ showImages: null })
                                }
                                onMovePrevRequest={() =>
                                  this.setState({
                                    photoIndex:
                                      (photoIndex + showImages.length - 1) %
                                      showImages.length,
                                  })
                                }
                                onMoveNextRequest={() =>
                                  this.setState({
                                    photoIndex:
                                      (photoIndex + 1) % showImages.length,
                                  })
                                }
                                closeLabel="إغلاق"
                              />
                            )}
                          </td>

                          <td>
                            {employesLength > 0 ? (
                              <Link
                                to={`/Aware/${ris.id}`}
                                className="btn btn-success"
                              >
                                عرض
                              </Link>
                            ) : (
                                <span>لا يوجد</span>
                              )}
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </Table>
            );

            let dataTabs = [
              {
                label: <b>التقارير الجديده</b>,
                body: mainTab,
              },
              {
                label: <b>التقارير المنتهيه</b>,
                body: secondaryTab,
              },
            ];

            return <Tabs data={dataTabs} />;
          } else return <NoResults />;
        }}
      </Subscription>
    );
  }
}

export default Training;

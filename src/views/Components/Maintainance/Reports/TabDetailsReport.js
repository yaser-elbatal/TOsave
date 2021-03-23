import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import { Query, Subscription } from "react-apollo";
import { List_Report_Details_Report, List_Reports } from "../../../../services/queries/Maintainance/MaintainanceReports/Reports";
import Loader from "../../Custom/Loader/Loader";
import Error from "../../Custom/Error/Error";
import NoResults from "../../Custom/NoResults/NoResults";
import ModalImage from "react-modal-image";

let getDate = (isoDate) => {
  let date = new Date(isoDate).toLocaleString();
  date = date
    .split(",")[0]
    .split("/")
    .map((dat) => (dat < 10 && "0" + dat) || dat);
  date = date[1] + "/" + date[0] + "/" + date[2];

  return date;
};

let tdHeadStyle = { width: "25%", textAlign: "right", fontWeight: "700" },
  tdStyle = { width: "75%", textAlign: "right", }

export default class DetailsQuery extends Component {

  constructor(props) {
    super(props);
  }




  ReportRow({ rep }) {

    return (
      <React.Fragment>

        <Row>
          <Col xl={12}>
            <Card>

              <CardBody style={{ backgroundColor: '#E8F3F8', }}>
                <Table
                  responsive
                  borderless
                  hover
                  style={{ textAlign: "center" }}
                >
                  <tbody>
                    <tr>
                      <td style={tdHeadStyle}>الفرع</td>
                      <td style={tdStyle}>
                        <Link to={`/branches/${rep.maintainance_branch.id}`}>
                          {rep.maintainance_branch.name}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td style={tdHeadStyle}>الوصف</td>
                      <td style={tdStyle}>
                        {rep.description}
                      </td>
                    </tr>
                    <tr>
                      <td style={tdHeadStyle}>تاريخ الصيانة</td>
                      <td style={tdStyle}>{getDate(rep.created_at)}</td>
                    </tr>
                    <tr>
                      <td style={tdHeadStyle}>حاله الطلب</td>
                      <td style={tdStyle}><Badge style={{ fontSize: "15px" }} color={rep.status == 'new' ? "primary" : "success"}>{rep.status}</Badge></td>
                    </tr>
                    <tr>
                      <td style={tdHeadStyle}> العنوان</td>
                      <td style={tdStyle}>{rep.title}</td>
                    </tr>

                    <tr>
                      <td style={tdHeadStyle}> نوع التقرير</td>
                      <td style={tdStyle}>{rep.orderType == 'so' ? 'طلب توريد' : 'طلب صيانه'}</td>
                    </tr>
                  </tbody>

                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                صور التقرير العدد (
                          {rep.images.split(",").length})
              </CardHeader>
              <CardBody>

                <div style={{ margin: "7px 7px 7px 0px", width: '10%' }}
                >
                  {
                    rep.images == null ?
                      <ModalImage
                        className="img-avatar"
                        smallSrcSet="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                        large="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                      />
                      :
                      <ModalImage
                        className="img-avatar"
                        smallSrcSet={rep.images}
                        large={rep.images} />
                  }
                </div>


                {/* <div
                  style={{ margin: "7px 7px 7px 0px" }}
                >
                  <img
                    src={rep.images}
                    style={{ width: "10%" }}
                  />
                </div> */}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>

    )
  }

  render() {

    let { data } = this.props

    console.log(data);



    return (
      <div className="animated fadeIn">

        {

          data.length == 0 ?
            <NoResults />
            :


            (
              <div>

                {
                  data.map((rep, index) =>
                    <this.ReportRow key={index} rep={{ ...rep, index, }} />
                  )}

              </div>
            )
        }


      </div>
    );
  }
}

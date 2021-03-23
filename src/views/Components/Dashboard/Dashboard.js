import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, CardGroup } from 'reactstrap';
import { Query } from 'react-apollo';
import { Get_Dashboard_Data } from '../../../services/queries/Dashboard';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import NoResults from "../Custom/NoResults/NoResults"
import Widget01 from "../../Widgets/Widget01"
import Widget04 from "../../Widgets/Widget04"


class DisplayDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: <div></div>,
      timer: {}
    }
  }

  componentDidMount() {

    let data = <Query query={Get_Dashboard_Data} fetchPolicy="no-cache" >
      {
        ({ loading, error, data, }) => {
          if (loading) return (<Loader />);
          if (error) return (<Error />);

          if (data) {

            let users = data.user

            delete data.user

            //map on 'data' to extract data in flat level
            Object.keys(data).map(key => data[key] = data[key].aggregate ? data[key].aggregate.count : data[key]);

            data = {
              ...data,
              admin: users.filter(user => user.user_type == "admin").length,
              manager: users.filter(user => user.user_type == "manager").length,
              employee: users.filter(user => ["b_employee", "b_manager"].includes(user.user_type)).length,
              company_user: users.filter(user => user.user_type == "company_user").length,
              tech_user: users.filter(user => user.user_type == "tech_user").length,
            }

            let {
              admin,
              manager,
              employee,
              company_user,
              tech_user,
              maintainance_report_new,
              maintainance_report_finished,
              incident_report_new,
              incident_report_old,
              monthely_report_new,
              monthely_report_reviewing,
              monthely_report_submitted,
              training_report_new,
              training_report_finished,
              training_report_cancel,
              risk_assessment_new,
              risk_assessment_history,
              emergency_report,
              branch,
              technical_department,
              maintainance_company,
              city,
              area,
              neighborhood,
            } = data,

              allUsers = admin + manager + employee + company_user + tech_user,
              maintainance_report = maintainance_report_new + maintainance_report_finished,
              incident_report = incident_report_new + incident_report_old,
              monthely_report = monthely_report_new + monthely_report_reviewing + monthely_report_submitted,
              training_report = training_report_new + training_report_finished + training_report_cancel,
              risk_assessment = risk_assessment_new + risk_assessment_history


            return (
              <div className="animated fadeIn">
                <Row>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 color="primary" variant="inverse" value={`${maintainance_report_new * 100 / maintainance_report}`}
                      header={`${maintainance_report_new}`} mainText="تقارير صيانة جديدة" smallText={`${Math.round(maintainance_report_new * 100 / maintainance_report)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 color="success" variant="inverse" value={`${maintainance_report_finished * 100 / maintainance_report}`}
                      header={`${maintainance_report_finished}`} mainText="تقارير صيانة منتهية" smallText={`${Math.round(maintainance_report_finished * 100 / maintainance_report)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 color="primary" variant="inverse" value={`${incident_report_new * 100 / incident_report}`}
                      header={`${incident_report_new}`} mainText="تقارير الحوادث الجديدة" smallText={`${Math.round(incident_report_new * 100 / incident_report)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="3">
                    <Widget01 color="success" variant="inverse" value={`${incident_report_old * 100 / incident_report}`}
                      header={`${incident_report_old}`} mainText="تقارير الحوادث القديمة" smallText={`${Math.round(incident_report_old * 100 / incident_report)}%`} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="primary" variant="inverse" value={`${monthely_report_new * 100 / monthely_report}`}
                      header={`${monthely_report_new}`} mainText="تقارير شهرية جديدة"
                      smallText={`${Math.round(monthely_report_new * 100 / monthely_report)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="warning" variant="inverse" value={`${monthely_report_reviewing * 100 / monthely_report}`}
                      header={`${monthely_report_reviewing}`} mainText="تقارير شهرية تحت المراجعة"
                      smallText={`${Math.round(monthely_report_reviewing * 100 / monthely_report)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="primary" variant="inverse" value={`${monthely_report_submitted * 100 / monthely_report}`}
                      header={`${monthely_report_submitted}`} mainText="تقارير شهرية معتمدة"
                      smallText={`${Math.round(monthely_report_submitted * 100 / monthely_report)}%`} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="primary" variant="inverse" value={`${training_report_new * 100 / training_report}`}
                      header={`${training_report_new}`} mainText="تقارير تدريب جديدة"
                      smallText={`${Math.round(training_report_new * 100 / training_report)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="success" variant="inverse" value={`${training_report_finished * 100 / training_report}`}
                      header={`${training_report_finished}`} mainText="تقارير تدريب منتهية"
                      smallText={`${Math.round(training_report_finished * 100 / training_report)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="danger" variant="inverse" value={`${training_report_cancel * 100 / training_report}`}
                      header={`${training_report_cancel}`} mainText="تقارير تدريب ملغية"
                      smallText={`${Math.round(training_report_cancel * 100 / training_report)}%`} />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="primary" variant="inverse" value={`${risk_assessment_new * 100 / risk_assessment}`}
                      header={`${risk_assessment_new}`} mainText="تقارير مخاطر جديدة"
                      smallText={`${Math.round(risk_assessment_new * 100 / risk_assessment)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="success" variant="inverse" value={`${risk_assessment_history * 100 / risk_assessment}`}
                      header={`${risk_assessment_history}`} mainText="تقارير مخاطر قديمة"
                      smallText={`${Math.round(risk_assessment_history * 100 / risk_assessment)}%`} />
                  </Col>
                  <Col xs="12" sm="6" lg="4">
                    <Widget01 color="info" variant="inverse" value={100}
                      header={`${emergency_report}`} mainText="تقارير الطوارئ"
                      smallText="." />
                  </Col>
                </Row>
                <CardGroup className="mb-4">
                  <Widget04 icon="icon-people" color="info" header={`${admin}`} value={`${admin * 100 / allUsers}`}>المسؤلين</Widget04>
                  <Widget04 icon="icon-people" color="success" header={`${manager}`} value={`${manager * 100 / allUsers}`}>المدرين</Widget04>
                  <Widget04 icon="icon-people" color="warning" header={`${employee}`} value={`${employee * 100 / allUsers}`}>الموظفين</Widget04>
                  <Widget04 icon="icon-people" color="primary" header={`${company_user}`} value={`${company_user * 100 / allUsers}`}>مهندسي الصيانة</Widget04>
                  <Widget04 icon="icon-people" color="danger" header={`${tech_user}`} value={`${tech_user * 100 / allUsers}`}>الفنيين</Widget04>
                </CardGroup>
                <CardGroup className="mb-4">
                  <Widget04 icon="fa fa-university" color="info" header={`${branch}`} value={100}>الفروع</Widget04>
                  <Widget04 icon="fa fa-university" color="success" header={`${technical_department}`} value={100}>أقسام الدعم الفنى</Widget04>
                  {/* <Widget04 icon="fa fa-university" color="warning" header={`${technical_department}`} value={100}>شركات الصيانة</Widget04> */}
                </CardGroup>
                <CardGroup className="mb-4">
                  <Widget04 icon="fa fa-map-marker" color="success" header={`${city}`} value={100}>المدن</Widget04>
                  <Widget04 icon="fa fa-map-marker" color="warning" header={`${area}`} value={100}>المناطق</Widget04>
                  <Widget04 icon="fa fa-map-marker" color="primary" header={`${neighborhood}`} value={100}>الأحياء</Widget04>
                </CardGroup>
              </div>
            );
          }
          else return (<div><NoResults /></div>);
        }
      }
    </Query>,
      timer = setInterval(() => this.setState({ data }), 20000);

    this.setState({ data, timer })

  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }


  render() {

    return (<div>{this.state.data}</div>
    )
  }
}

export default DisplayDashboard;
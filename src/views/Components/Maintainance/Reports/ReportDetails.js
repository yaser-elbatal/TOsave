import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tabs from "../../Custom/Tabs/Tabs"
import TabDetails from "./TabDetails"
import TabComments from "./TabComments"
import TabDetailsReport from "./TabDetailsReport"
import "./print.css"
import Loader from '../../Custom/Loader/Loader';
import Error from "../../Custom/Error/Error"
import NoResults from '../../Custom/NoResults/NoResults';
import { List_Reports_Detailes } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import { Subscription } from 'react-apollo';



export default class ListItems extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      mutation: 0,
      Reportdata: {}

    }

  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]
    return date;
  }




  printHandler = () => {
    window.print();
  }

  render() {
    console.log(this.props);

    return (
      <div className="animated fadeIn">
        <Subscription
          subscription={List_Reports_Detailes}
          variables={{ reportId: this.props.match.params.id, }}
        >
          {
            ({ loading, error, data, }) => {
              if (loading) return (<Loader />);
              if (error) return (<Error />);



              if (data.maintainance_report.length) {

                let dataTabs = [
                  {
                    label: <b>تفاصيل التقرير</b>,
                    body: <TabDetailsReport data={data.maintainance_report} />
                  },
                  {
                    label: <b>تفاصيل العناصر</b>,
                    body: <TabDetails data={data.maintainance_report} />
                  },
                  {
                    label: <b>التعليقات</b>,
                    body: <TabComments data={data.maintainance_report} reportId={this.props.match.params.id} />
                  },
                ]

                return (
                  <Row>
                    <Col xl={12}>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", position: "relative", float: "left" }}>
                        <button className="btn btn-primary" onClick={this.printHandler}>طباعة التقرير</button>
                      </div>

                      <div style={{ marginBottom: "15px" }}><Tabs data={dataTabs} /></div>
                    </Col>
                  </Row>
                )
              }
              else {
                return <NoResults />
              }
            }}
        </Subscription>
      </div>
    )
  }
}



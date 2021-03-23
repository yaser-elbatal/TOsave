import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tabs from "../../Custom/Tabs/Tabs"
import TabDetails from "./TabDetails"
// import TabComments from "./TabComments"



export default class ListItems extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      mutation: 0,
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


  display = () => {
    let dataTabs = [
      {
        label: <b>التفاصيل</b>,
        body: <TabDetails reportId={this.props.match.params.id} />
      },
      {
        label: <b>التعليقات</b>,
        // body: <TabComments reportId={this.props.match.params.id} />
      },
    ]

    return (<div style={{ marginBottom: "15px" }}><Tabs data={dataTabs} /></div>);
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            {/* {this.display()} */}
            <TabDetails reportId={this.props.match.params.id} />
          </Col>
        </Row>
      </div>
    )
  }
}



import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { List_Areas } from '../../../services/queries/Areas';
import queryString from "querystring"
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import NoResults from "../Custom/NoResults/NoResults"
import EditArea from "./UpdateArea"
import Collapse from "../Custom/Collapse/Collapse"
import Tabs from "../Custom/Tabs/Tabs"
import CreateArea from "./CreateArea"



class ListAreas extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      mutation: 0,
    }

  }

  componentDidMount() {
    this.setState({
      qString: JSON.parse(JSON.stringify(queryString.parse(this.props.location.search)).replace(`{"?`, `{"`)),
    })
  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

  AreaRow(props) {
    const area = props.area,
      ind = props.index,
      areaLink = `/neighbourhoods?area=${area.id}&name=${area.name}`

    return (
      <tr key={area.id.toString()} style={{ opacity: area.isNeglected ? .5 : 1, }}>
        <th scope="row">{area.id}</th>
        <td>{area.name}</td>
        <td>{area.name_en}</td>
        <td>{new ListAreas().getDate(area.created_at)}</td>
        <td><Link className="btn btn-primary" to={areaLink}>عرض</Link></td>
        <EditArea area={area} />
      </tr>
    )
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Areas} variables={{ city_id: parseInt(this.state.qString.city) }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.area.length) {

                    let mainTab = (
                      <div>
                        <Collapse
                          buttonLabel={<b>منطقة جديدة +</b>}
                          body={<CreateArea city_id={this.state.qString.city} />}
                        />
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>مناطق مدينة {this.state.qString.name}</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col">الأحياء</th>
                                  <th scope="col"> </th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.area.map((area, index) => {
                                    if (!area.isNeglected)
                                      return <this.AreaRow key={index} area={area} />
                                  })
                                }
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </div>
                    );

                    let secondaryTab = (
                      <div>
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>مناطق مدينة {this.state.qString.name}</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col">الأحياء</th>
                                  <th scope="col"> </th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.area.map((area, index) => {
                                    if (area.isNeglected)
                                      return <this.AreaRow key={index} area={area} />
                                  })
                                }
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </div>
                    );

                    let dataTabs = [
                      {
                        label: <b>المناطق</b>,
                        body: mainTab
                      },
                      {
                        label: <b>المحذوفات</b>,
                        body: secondaryTab
                      },
                    ]

                    return (<Tabs data={dataTabs} />);
                  }
                  else return (
                    <div>
                      <Collapse
                        buttonLabel={<b>منطقة جديدة +</b>}
                        body={<CreateArea city_id={this.state.qString.city} />}
                      />
                      <NoResults />
                    </div>
                  );
                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListAreas;

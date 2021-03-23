import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Neighborhood } from '../../../services/queries/Neighbours';
import queryString from "querystring"
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import NoResults from "../Custom/NoResults/NoResults"
import EditNeighborhood from "./UpdateNeighbour"
import Collapse from "../Custom/Collapse/Collapse"
import Tabs from "../Custom/Tabs/Tabs"
import CreateNeighbour from "./CreateNeighbour"



class ListNeighborhoods extends Component {

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

  NeighborhoodRow(props) {
    const neighborhood = props.neighborhood
    const ind = props.index

    return (
      <tr key={neighborhood.id.toString()} style={{opacity: neighborhood.isNeglected? .5: 1, }}>
        <th scope="row">{neighborhood.id}</th>
        <td>{neighborhood.name}</td>
        <td>{neighborhood.name_en}</td>
        <td>{new ListNeighborhoods().getDate(neighborhood.created_at)}</td>
        <td><EditNeighborhood neighborhood={neighborhood} /> </td>
      </tr>
    )
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query  query={List_Neighborhood} variables={{ area_id: parseInt(this.state.qString.area) }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.neighborhood.length) {

                    let mainTab = (
                      <div>
                        <Collapse
                        buttonLabel={<b>حي جديد +</b>}
                        body={<CreateNeighbour area_id={this.state.qString.area} />}
                      />
                        <Card>
                        <CardHeader>
                          <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>أحياء منطقة {this.state.qString.name}</b>
                        </CardHeader>
                        <CardBody>
                          <Table responsive hover style={{ textAlign: "center" }}>
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">الاسم باللغة العربية</th>
                                <th scope="col">الاسم باللغة الانجليزية</th>
                                <th scope="col">تاريخ الإنشاء</th>
                                <th scope="col"> </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                  data.neighborhood.map((neighborhood, index) => {
                                    if (!neighborhood.isNeglected)
                                      return <this.NeighborhoodRow key={index} neighborhood={neighborhood} />
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
                          <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>أحياء منطقة {this.state.qString.name}</b>
                        </CardHeader>
                        <CardBody>
                          <Table responsive hover style={{ textAlign: "center" }}>
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">الاسم باللغة العربية</th>
                                <th scope="col">الاسم باللغة الانجليزية</th>
                                <th scope="col">تاريخ الإنشاء</th>
                                <th scope="col"> </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                  data.neighborhood.map((neighborhood, index) => {
                                    if (neighborhood.isNeglected)
                                      return <this.NeighborhoodRow key={index} neighborhood={neighborhood} />
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
                        label: <b>الأحياء</b>,
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
                    buttonLabel={<b>حي جديد +</b>}
                    body={<CreateNeighbour area_id={this.state.qString.area} />}
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

export default ListNeighborhoods;

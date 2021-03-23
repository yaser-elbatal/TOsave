import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Cities } from '../../../services/queries/Cities';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import NoResults from "../Custom/NoResults/NoResults"
import EditCity from "./UpdateCity"
import Collapse from "../Custom/Collapse/Collapse"
import Tabs from "../Custom/Tabs/Tabs"
import CreateCity from "./CreateCity"


class ListCities extends Component {

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

  CityRow(props) {
    const city = props.city,
      ind = props.index,
      cityLink = `/areas?city=${city.id}&name=${city.name}`

    return (
      <tr key={city.id.toString()} style={{ opacity: city.isNeglected ? .5 : 1, }}>
        <th scope="row">{city.id}</th>
        <td>{city.name}</td>
        <td>{city.name_en}</td>
        <td>{new ListCities().getDate(city.created_at)}</td>
        <td><Link className="btn btn-primary" to={cityLink}>عرض</Link></td>
        <EditCity city={city} />
      </tr>
    )
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Cities}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) {
                    console.log(error);
                    return (<Error />);
                  }

                  if (data.city.length) {

                    let mainTab = (
                      <div>
                        <Collapse
                          buttonLabel={<b>مدينة جديدة +</b>}
                          body={<CreateCity />}
                        />
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>المدن</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col">المناطق</th>
                                  <th scope="col"> </th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.city.map((city, index) => {
                                    if (!city.isNeglected)
                                      return <this.CityRow key={index} city={city} />
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
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>المدن</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col">المناطق</th>
                                  <th scope="col"> </th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.city.map((city, index) => {
                                    if (city.isNeglected)
                                      return <this.CityRow key={index} city={city} />
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
                        label: <b>المدن</b>,
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
                        buttonLabel={<b>مدينة جديدة +</b>}
                        body={<CreateCity />}
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

export default ListCities;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Cats } from '../../../../services/queries/MonthlyReports/Cats';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import EditCat from "./UpdateCat"
import Collapse from "../../Custom/Collapse/Collapse"
import Tabs from "../../Custom/Tabs/Tabs"
import CreateCat from "./CreateCat"


export default class ListCats extends Component {

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

  CatRow(props) {
    const cat = props.cat,
      ind = props.index,
      catLink = `/monthlyItems?cat=${cat.id}&name=${cat.name}`

    return (
      <tr key={cat.id.toString()} style={{ opacity: cat.isNeglected ? .5 : 1, }}>
        <th scope="row">{ind}</th>
        <td>{cat.name}</td>
        <td>{cat.name_en}</td>
        <td>{new ListCats().getDate(cat.created_at)}</td>
        <td><Link className="btn btn-primary" to={catLink}>عرض</Link></td>
        <EditCat cat={cat} />
      </tr>
    )
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Cats}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) {
                    console.log(error);
                    return (<Error />);
                  }

                  if (data.monthely_report_categories.length) {

                    let mainTab = (
                      <div>
                        <Collapse
                          buttonLabel={<b>تصنيف جديد +</b>}
                          body={<CreateCat />}
                        />
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>التصنيفات</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col">العناصر</th>
                                  <th scope="col"> </th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.monthely_report_categories.map((cat, index) => {
                                    if (!cat.isNeglected)
                                      return <this.CatRow key={index} cat={cat} />
                                  })
                                }
                              </tbody>
                            </Table>
                          </CardBody>
                        </Card>
                      </div>
                    );
                    console.log(data);

                    let secondaryTab = (
                      <div>
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>التصنيفات</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col">العناصر</th>
                                  <th scope="col"> </th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.monthely_report_categories.map((cat, index) => {
                                    if (cat.isNeglected)
                                      return <this.CatRow key={index} cat={cat} />
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
                        label: <b>التصنيفات</b>,
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
                        buttonLabel={<b>تصنيف جديد +</b>}
                        body={<CreateCat />}
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
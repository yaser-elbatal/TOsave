import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Items } from '../../../../services/queries/MonthlyReports/Items';
import queryString from "querystring"
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import UpdateItem from "./UpdateItem"
import Collapse from "../../Custom/Collapse/Collapse"
import Tabs from "../../Custom/Tabs/Tabs"
import CreateItems from "./CreateItems"



export default class ListItems extends Component {

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

  ItemRow(props) {
    const item = props.item
    const ind = props.index

    return (
      <tr key={item.id.toString()} style={{ opacity: item.isNeglected ? .5 : 1, }}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.name_en}</td>
        <td>{item.images_number}</td>
        <td>{new ListItems().getDate(item.created_at)}</td>
        <td><UpdateItem item={item} /> </td>
      </tr>
    )
  }


  render() {

    return (
      <div className="animated fadeIn">
        <div
          style={{ marginBottom: "15px", fontSize: "25px", fontWeight: "500", border: "1px solid #bababa", padding: "5px", }}
        >
          عناصر تصنيف {this.state.qString.name} للتقارير الشهرية
        </div>
        <Row>
          <Col xl={12}>
            <Query query={List_Items} variables={{ category_id: parseInt(this.state.qString.cat) }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) {
                    console.log(error); return (<Error />);
                  }

                  if (data.monthely_report_item_config.length) {

                    let mainTab = (
                      <div>
                        <Collapse
                          buttonLabel={<b>عنصر جديد +</b>}
                          body={<CreateItems category_id={this.state.qString.cat} />}
                        />
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>عناصر التصنيف {this.state.qString.name}</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">عدد الصور</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.monthely_report_item_config.map((item, index) => {
                                    if (!item.isNeglected)
                                      return <this.ItemRow key={index} item={item} />
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
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>عناصر التصنيف {this.state.qString.name}</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الاسم باللغة العربية</th>
                                  <th scope="col">الاسم باللغة الانجليزية</th>
                                  <th scope="col">عدد الصور</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.monthely_report_item_config.map((item, index) => {
                                    if (item.isNeglected)
                                      return <this.ItemRow key={index} item={item} />
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
                        label: <b>العناصر</b>,
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
                        buttonLabel={<b>عنصر جديد +</b>}
                        body={<CreateItems category_id={this.state.qString.cat} />}
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



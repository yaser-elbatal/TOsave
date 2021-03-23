import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Companies } from '../../../../services/queries/Maintainance/Companies';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import EditCom from "./UpdateCompany"
import Collapse from "../../Custom/Collapse/Collapse"
import Tabs from "../../Custom/Tabs/Tabs"
import CreateCat from "./CreateCompany"
import ListBranches from "./ListBranches"
import PopUp from "../../Custom/PopUp/PopUp";


export default class ListCompanies extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

  CompanyRow(props) {
    const com = props.com,
      ind = props.index + 1,
      repLink = `/maintainanceReports?id=${com.id}&name=${com.company_name}`,
      memLink = `/maintainanceCompanyMembers?companyId=${com.id}&companyName=${com.company_name}`

    return (
      <tr key={ind} style={{ opacity: com.isNeglected ? .5 : 1, }}>
        <th scope="row">{ind}</th>
        <td>
          <div className="avatar">
            <img
              src={com.avatar}
              style={{ width: "36px", height: "36px" }}
              className="img-avatar"
            />
          </div>
        </td>
        <td>{com.company_name}</td>
        <td>{`${com.place.name} / ${com.place.neighbor_area.name} / ${com.place.neighbor_area.area_city.name}`}</td>
        {/* <td>{new ListCompanies().getDate(com.created_at)}</td> */}
        <td>{new ListCompanies().getDate(com.updated_at)}</td>
        <td>
          <PopUp
            {...{
              buttonLabel: "عرض",
              buttonColor: "warning",
              body: (<ListBranches company_id={com.id} company_name={com.company_name} />
              ),
              footer: false,
            }}
          />
        </td>
        <td>
          {
            !com.repsCount.aggregate.count ? <b>{"لا يوجد"}</b> :
              <Link className="btn btn-primary" to={repLink}>عرض</Link>
          }
        </td>
        <td><Link className="btn btn-info" to={memLink}>عرض</Link></td>
        <EditCom com={{ ...com, neighborhood: com.place.id }} />
      </tr>
    )
  }


  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Companies}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.maintainance_company.length) {

                    let mainTab = (
                      <div>
                        <Collapse
                          buttonLabel={<b>شركة جديدة +</b>}
                          body={<CreateCat />}
                        />
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>عرض الشركات</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">صورة الشركة</th>
                                  <th scope="col">الاسم</th>
                                  <th scope="col">المكان</th>
                                  {/* <th scope="col">تاريخ الإنشاء</th> */}
                                  <th scope="col">تاريخ آخر تحديث</th>
                                  <th scope="col">الفروع</th>
                                  <th scope="col">التقارير</th>
                                  <th scope="col">الأعضاء</th>
                                  <th scope="col"> </th>
                                  <th scope="col"> </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.maintainance_company.map((com, index) => {
                                    if (!com.isNeglected)
                                      return <this.CompanyRow index={index} key={index} com={com} />
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
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>عرض الشركات</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">صورة الشركة</th>
                                  <th scope="col">الاسم</th>
                                  <th scope="col">المكان</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col">تاريخ آخر تحديث</th>
                                  <th scope="col">الفروع</th>
                                  <th scope="col">التقارير</th>
                                  <th scope="col">الأعضاء</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data.maintainance_company.map((com, index) => {
                                    if (com.isNeglected)
                                      return <this.CompanyRow index={index} key={index} com={com} />
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
                        label: <b>الشركات</b>,
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
                        buttonLabel={<b>شركة جديدة +</b>}
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
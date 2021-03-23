import React, { Component } from 'react';
import { Link, } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Members } from '../../../../../services/queries/Maintainance/Members';
import Loader from "../../../Custom/Loader/Loader"
import Error from "../../../Custom/Error/Error"
import NoResults from "../../../Custom/NoResults/NoResults"
import EditMem from "./UpdateMember"
import Collapse from "../../../Custom/Collapse/Collapse"
import Tabs from "../../../Custom/Tabs/Tabs"
import CreateMember from "./CreateMember"
import querystring from "querystring"


export default class ListMembers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      qString: false
    }
  }

  componentDidMount() {
    this.setState({
      qString: JSON.parse(JSON.stringify(querystring.parse(this.props.location.search)).replace(`{"?`, `{"`)),
    })
  }




  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

  MemberRow(props) {
    const
      { mem, } = props,
      ind = props.index + 1,
      memLink = `/users?mtab=3&stab=${mem.active?"0":"1"}`

    return (
      <tr key={ind} style={{ opacity: !mem.active ? .5 : 1, }}>
        <th scope="row">{ind}</th>
        <td>
          <div className="avatar">
            <img
              src={mem.avatar}
              style={{ width: "36px", height: "36px" }}
              className="img-avatar"
            />
          </div>
        </td>
        <td>
          <Link to={memLink}>{mem.display_name}</Link>
        </td>
        <td>{mem.username}</td>
        <td>{new ListMembers().getDate(mem.created_at)}</td>
        <EditMem mem={mem} />
      </tr>
    )
  }


  render() {
    let { companyId, companyName } = this.state.qString
    companyId = parseInt(companyId)
    return (
      <div className="animated fadeIn">
        <div
          style={{ marginBottom: "15px", fontSize: "25px", fontWeight: "500", border: "1px solid #bababa", padding: "5px", }}
        >
          {companyName}
        </div>
        <Row>
          <Col xl={12}>
            <Query query={List_Members} variables={{ company_id: companyId }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.company_users.length) {
                    let users = data.company_users;

                    let mainTab = (
                      <div>
                        <Collapse
                          buttonLabel={<b>موظف جديد +</b>}
                          body={<CreateMember companyId={companyId} />}
                        />
                        <Card>
                          <CardHeader>
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>عرض الموظفين</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">الصورة</th>
                                  <th scope="col">الاسم</th>
                                  <th scope="col">اسم الدخول</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  users.map((mem, index) => {
                                    if (mem.company_users_user.active)
                                      return (
                                        <this.MemberRow
                                          index={index}
                                          key={index}
                                          mem={mem.company_users_user} />
                                      )
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
                            <span style={{ fontSize: "20px" }} ><i className="fa fa-map-marker"></i></span> <b>عرض الموظفين</b>
                          </CardHeader>
                          <CardBody>
                            <Table responsive hover style={{ textAlign: "center" }}>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">صورة الموظف</th>
                                  <th scope="col">الاسم</th>
                                  <th scope="col">اسم الدخول</th>
                                  <th scope="col">تاريخ الإنشاء</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  users.map((mem, index) => {
                                    if (!mem.company_users_user.active)
                                      return (
                                        <this.MemberRow
                                          index={index}
                                          key={index}
                                          mem={mem.company_users_user} />
                                      )
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
                        label: <b>موظفين مفعلين</b>,
                        body: mainTab
                      },
                      {
                        label: <b>موظفين غير مفعلين</b>,
                        body: secondaryTab
                      },
                    ]

                    return (<Tabs data={dataTabs} />);

                  }
                  else return (
                    <div>
                      <Collapse
                        buttonLabel={<b>موظف جديد +</b>}
                        body={<CreateMember companyId={companyId} />}
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
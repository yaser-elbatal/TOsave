import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import { Create_General, Get_General, Update_General } from '../../../services/queries/Generals';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import NoResults from "../Custom/NoResults/NoResults"
import Tabs from "../Custom/Tabs/Tabs"
import RichTextEditor from "../Custom/RichTextEditor/RichTextEditor"
import queryString from "querystring"
import _ from "lodash"


class ListGeneral extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: "",
      title: {},
      updatedData: {},
    }

  }


  componentDidMount() {
    let key = this.props.match.path.includes("aboutUs")? "aboutUs": "privacyPolicy";

    this.setState({
      key,
      title: key == "aboutUs" ?
        { en: "About Us", ar: "من نحن" } :
        { en: "Privacy Policy", ar: "شروط الخصوصية" },
    })

  }

  async componentWillReceiveProps() {
    let key = this.props.match.path.includes("aboutUs")? "aboutUs": "privacyPolicy";

    this.setState({
      key,
      title: key == "aboutUs" ?
        { en: "About Us", ar: "من نحن" } :
        { en: "Privacy Policy", ar: "شروط الخصوصية" },
    })
  }

  resultAr = (text) => {
    this.setState({
      updatedData: { ...this.state.updatedData, value_ar: text }
    })
  }

  resultEn = (text) => {
    this.setState({
      updatedData: { ...this.state.updatedData, value_en: text }
    })
  }

  render() {
    
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={Get_General} variables={{ key: this.state.key }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.settings) {
                    let general = data.settings.length ? data.settings[0] :
                      { 'key': this.state.key, 'value_ar': "", 'value_en': "" };

                    general = _.pick(general, ['key', 'value_ar', 'value_en',])


                    let mainTab = (
                      <div style={{ direction: "ltr" }}>
                        <RichTextEditor text={general.value_ar || ""} result={this.resultAr} />
                      </div>
                    )

                    let secondaryTab = (
                      <div style={{ direction: "ltr" }}>
                        <RichTextEditor text={general.value_en || ""} result={this.resultEn} />
                      </div>
                    )

                    let dataTabs = [
                      {
                        label: <b>{this.state.title.ar}</b>,
                        body: mainTab
                      },
                      {
                        label: <b>{this.state.title.en}</b>,
                        body: secondaryTab
                      },
                    ]

                    let createOrUpdate = data.settings.length ? Update_General : Create_General;

                    let ret = (
                      <div>
                        <Tabs data={dataTabs} />
                        <Mutation mutation={createOrUpdate}>
                          {(updateGeneral, { data }) => (
                            <div>
                              <button style={{ marginTop: "10px" }} onClick={() => {
            

                                updateGeneral({
                                  variables: { ...general, ...this.state.updatedData },
                                  refetchQueries: [`GetSetting`]
                                })
                              }} className="btn btn-primary" >تعديل</button>
                            </div>
                          )}
                        </Mutation>
                      </div>
                    )
                    return ret;

                  }
                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListGeneral;


/*
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import { Create_General, Get_General, Update_General } from '../../../services/queries/Generals';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import Tabs from "../Custom/Tabs/Tabs"
import RichTextEditor from "../Custom/RichTextEditor/RichTextEditor"
import queryString from "querystring"
import _ from "lodash"


class ListGeneral extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: "",
      title: {},
      updatedData: {},
    }

  }


  componentDidMount() {

    let key = JSON.parse(JSON.stringify(queryString.parse(this.props.location.search)).replace(`{"?`, `{"`)).key;

    this.setState({
      key,
      title: key == "aboutUs" ?
        { en: "About Us", ar: "من نحن" } :
        { en: "Privacy Policy", ar: "شروط الخصوصية" },
    })

  }


  componentDidUpdate(){
    if(this.state.key != JSON.parse(JSON.stringify(queryString.parse(this.props.location.search)).replace(`{"?`, `{"`)).key){
      let key = JSON.parse(JSON.stringify(queryString.parse(this.props.location.search)).replace(`{"?`, `{"`)).key;
      this.setState({
       key,
       title: key == "aboutUs" ?
         { en: "About Us", ar: "من نحن" } :
         { en: "Privacy Policy", ar: "شروط الخصوصية" },
     })
    }
  }


  resultAr = (text) => {
    this.setState({
      updatedData: { ...this.state.updatedData, value_ar: text }
    })
  }

  resultEn = (text) => {
    this.setState({
      updatedData: { ...this.state.updatedData, value_en: text }
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={Get_General} variables={{ key: this.state.key }}>
              {
                ({ loading, error, data, refetch }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.settings) {
                    let stngs = data.settings
                    
                    // refetch({ key: this.state.key });

                    let general = stngs.length ? stngs[0] :
                      { 'key': this.state.key, 'value_ar': "", 'value_en': "" };

                    general = _.pick(general, ['key', 'value_ar', 'value_en',])


                    let mainTab = (
                      <div style={{ direction: "ltr" }}>
                        <RichTextEditor text={general.value_ar || ""} result={this.resultAr} />
                      </div>
                    )

                    let secondaryTab = (
                      <div style={{ direction: "ltr" }}>
                        <RichTextEditor text={general.value_en || ""} result={this.resultEn} />
                      </div>
                    )

                    let dataTabs = [
                      {
                        label: <b>{this.state.title.ar}</b>,
                        body: mainTab
                      },
                      {
                        label: <b>{this.state.title.en}</b>,
                        body: secondaryTab
                      },
                    ]

                    let createOrUpdate = stngs.length ? Update_General : Create_General;

                    let ret = (
                      <div>
                        <Tabs data={dataTabs} />
                        <Mutation mutation={createOrUpdate}>
                          {(updateGeneral, { data }) => (
                            <div>
                              <button style={{ marginTop: "10px" }} onClick={() => {
                                updateGeneral({
                                  variables: { ...general, ...this.state.updatedData },
                                  refetchQueries: [`GetSetting`]
                                })
                              }} className="btn btn-primary" >تعديل</button>
                            </div>
                          )}
                        </Mutation>
                      </div>
                    )
                    return ret;

                  }
                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListGeneral;

*/

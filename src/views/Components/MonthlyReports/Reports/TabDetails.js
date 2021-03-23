import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Query } from 'react-apollo';
import { List_Report_Details, Get_Config_Of_Detail } from '../../../../services/queries/MonthlyReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import TableDetails from "./TableDetails"



export default class DetailsQuery extends Component {

  manipulationData = (details, configs) => {

    let cats = configs.map(c => c.monthely_report_item_config_category);
    cats = cats.filter((cat, ind) => cats.findIndex(ct => ct.id === cat.id) === ind);//get unique cats by id

    let configsEdited = configs.map(con => {
      con.details = details.find(det => det.config_id == con.id)
      return con;
    });

    let data = cats.map(cat => {
      cat.items = configsEdited
        .filter(ce => ce.monthely_report_item_config_category.id == cat.id);

      return cat;
    })

    return <TableDetails data={data} />
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Query query={List_Report_Details} variables={{ monthely_report_id: parseInt(this.props.reportId) }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) { return (<Error />); }

                  if (data.monthely_report_details.length) {

                    let details = data.monthely_report_details,
                      configIds = details.map(det => det.config_id);

                    return <Query query={Get_Config_Of_Detail} variables={{ ids: configIds }}>
                      {
                        ({ loading, error, data }) => {
                          if (loading) return (<Loader />);
                          if (error) { return (<Error />); }

                          if (data.monthely_report_item_config.length) {
                            let configs = data.monthely_report_item_config;

                            return this.manipulationData(details, configs);
                          }
                          else return <NoResults />;

                        }
                      }
                    </Query>
                  }
                  else return <NoResults />;

                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}



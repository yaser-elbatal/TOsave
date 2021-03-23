import React, { Component } from "react";
import { Query, Subscription } from "react-apollo";
import { List_Items } from "../../../Queries/RiskAssmentsQuery/RiskAssments";
import Loader from "../../../views/Components/Custom/Loader/Loader";
import Error from "../../../views/Components/Custom/Error/Error";
import { Card, CardBody, CardHeader, Table, Badge } from "reactstrap";
import NoResults from "../../../views/Components/Custom/NoResults/NoResults";
import EditItems from "./EditItems";
import Collapse from "../../../views/Components/Custom/Collapse/Collapse";
import CreateItems from "./CreateItems";

export class itemsDetailes extends Component {
  render() {
    return (

      <Subscription
        subscription={List_Items}
        variables={{ category_id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;

          const getDate = isoDate => {
            let date = new Date(isoDate).toLocaleString();
            date = date
              .split(",")[0]
              .split("/")
              .map(dat => (dat < 10 && "0" + dat) || dat);
            date = date[1] + "/" + date[0] + "/" + date[2];

            return date;
          };

          if (data.risk_assessment_category_items.length) {
            console.log(data);

            return (
              <React.Fragment>
                <Collapse
                  buttonLabel={<b>عنصر جديد +</b>}
                  body={<CreateItems category_id={this.props.match.params.id} sum={data.risk_assessment_category_items.map(e => e.percentage).reduce((acc, elm) => elm + acc, 0)} />} />

                <Card>
                  <CardHeader>
                    <span style={{ fontSize: "20px" }}>
                      <i className="fa fa-map-marker"></i>
                    </span>
                    <b>عناصر التصنيفات </b>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover style={{ textAlign: "center" }}>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">الاسم باللغة العربية</th>
                          <th scope="col">الاسم باللغة الانجليزية</th>
                          <th scope="col">اخر تعديل </th>
                          <th scope="col"> النسبه</th>

                          <th scope="col"> الحاله</th>
                          <th> </th>
                          <th scope="col"> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.risk_assessment_category_items.map(
                          (ris, index) => {
                            return (
                              <tr
                                key={index}
                                style={{
                                  opacity: ris.isNeglected ? 0.5 : 1
                                }}
                              >
                                <th scope="row">{ris.id}</th>
                                <td>{ris.title}</td>
                                <td>{ris.title_en}</td>
                                <td>{getDate(ris.updated_at)}</td>
                                <td><Badge color="info" style={{ padding: "10px" }}>{ris.percentage}%</Badge></td>
                                <td><span >{ris.normal_state}</span></td>
                                <td>
                                  <EditItems
                                    Ris={ris}
                                    data={data.risk_assessment_category_items}
                                    category_id={this.props.match.params.id}
                                  />
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </React.Fragment>

            );
          } else return (
            <React.Fragment>
              <Collapse buttonLabel={<b> اضافه تصنيف +</b>} body={<CreateItems category_id={this.props.match.params.id} sum={0} />} />
              <NoResults />
            </React.Fragment>
          )
        }}
      </Subscription>
    );
  }
}

export default itemsDetailes;

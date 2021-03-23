import React, { Component } from "react";
import { Subscription } from "react-apollo";
import { Get_categories } from "../../../Queries/RiskAssmentsQuery/RiskAssments";
import NoResults from "../../../views/Components/Custom/NoResults/NoResults";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import { Link } from "react-router-dom";
import Error from "../../../views/Components/Custom/Error/Error";
import Loader from "../../../views/Components/Custom/Loader/Loader";
import EditRiskCategories from "./EditRiskCategories";
import AddCategories from "./AddCategories";
import Collapse from "../../../views/Components/Custom/Collapse/Collapse";
import { Badge } from "reactstrap";

export class categories extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (


      <Subscription subscription={Get_categories}>
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

          if (data.risk_assessment_category.length) {
            return (
              <React.Fragment>

                <Collapse
                  buttonLabel={<b> اضافه تصنيف +</b>}

                  body={<AddCategories
                    sum={data.risk_assessment_category.map(e => e.precentage).reduce((acc, elm) => elm + acc, 0)} />} />
                <Card>
                  <CardHeader>
                    <span style={{ fontSize: "20px" }}>
                      <i className="fa fa-map-marker"></i>
                    </span>{" "}
                    <b>التصنيفات</b>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover style={{ textAlign: "center" }}>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">الاسم باللغة العربية</th>
                          <th scope="col">الاسم باللغة الانجليزية</th>
                          <th scope="col"> النسبه</th>
                          <th scope="col">تاريخ الإنشاء</th>
                          <th scope="col">العناصر</th>
                          <th scope="col"> </th>
                          <th scope="col"> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.risk_assessment_category.map((ris, index) => {

                          return (
                            <tr
                              key={index}
                              style={{
                                opacity: ris.isNeglected ? 0.5 : 1
                              }}
                            >
                              <th scope="row">{ris.id}</th>
                              <td>{ris.name}</td>
                              <td>{ris.name_en}</td>
                              <td><Badge color="secondary" style={{ padding: "15px", textAlign: "center" }}>%{ris.precentage}</Badge></td>

                              <td>{getDate(ris.created_at)}</td>
                              <td>
                                <Link
                                  className="btn btn-primary"
                                  to={`/Riskcategoris/${ris.id}`}
                                >
                                  عرض
                                </Link>
                              </td>
                              <td>
                                {" "}
                                <EditRiskCategories Ris={ris} sum={data.risk_assessment_category.map(e => e.precentage).reduce((acc, elm) => elm + acc, 0)} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </React.Fragment>

            );
          } else return (
            <React.Fragment>
              <Collapse buttonLabel={<b> اضافه تصنيف +</b>} body={<AddCategories sum={0} />} />
              <NoResults />
            </React.Fragment>)


        }}
      </Subscription>
    );
  }
}

export default categories;

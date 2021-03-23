import React, { Component } from "react";
import { Query } from "react-apollo";
import { Get_detailes } from "../../Queries/RiskAssmentsQuery/RiskAssments";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";

import { CardBody, Card, Badge, CardHeader } from "reactstrap";
import RiskItemesDetailes from "./RiskItemesDetailes";
import Accordion from "../../views/Components/Custom/Accordion/Accordion";

export class RiskDetailes extends Component {
  constructor(props) {
    super(props);
  }

  printHandler = () => {
    window.print();
  };

  render() {
    const getDate = (isoDate) => {
      let date = new Date(isoDate).toLocaleString();
      date = date
        .split(",")[0]
        .split("/")
        .map((dat) => (dat < 10 && "0" + dat) || dat);
      date = date[1] + "/" + date[0] + "/" + date[2];
      return date;
    };
    // console.log(this.props.reportId);

    return (
      <Query query={Get_detailes} variables={{ reportId: this.props.reportId }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;

          if (data.risk_assessment_category.length) {
            // let dataAcc = data.risk_assessment_category.map((risk, indx) => {
            //   let title = (
            //     <div style={{ display: "contents" }}>
            //       <div>
            //         <h6>
            //           التصنيف:<span> [{risk.name_ar}]</span>
            //         </h6>
            //         <div>
            //           <Badge
            //             color="warning"
            //             style={{ padding: "5px", fontSize: "15px" }}
            //           >
            //             %{risk.precentage}
            //           </Badge>
            //           : النسبه
            //         </div>
            //       </div>
            //     </div>
            //   );

            //   let body = (
            //     <RiskItemesDetailes
            //       reportId={this.props.reportId}
            //       data={risk.category_items}
            //     />
            //   );
            //   return { title, body };
            // });

            return (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={this.printHandler}
                  >
                    طباعة التقرير
                  </button>
                </div>
                <Card>
                  <CardHeader style={{ color: "#117243", fontSize: "25px" }}>
                    <img
                      src={
                        data.risk_assessment_by_pk.risk_assessment_branch.avatar
                      }
                      style={{ width: "38px", height: "38px" }}
                      className="img-avatar"
                      alt="pic"
                    />
                    تقارير فرع :
                    {data.risk_assessment_by_pk.risk_assessment_branch.name}

                  </CardHeader>

                  <CardBody style={{ width: "100%" }}>
                    {/* <Accordion rightTitle={true} data={dataAcc} /> */}
                    {data.risk_assessment_category.map((risk, indx) => {
                      return (
                        <div>
                          <div style={{ display: "contents" }}>
                            <div
                              style={{
                                backgroundColor: "aliceblue",
                                padding: 10,
                                marginBottom: 10,
                                borderRadius: 10,
                              }}
                            >
                              <h6>
                                التصنيف:<span> [{risk.name}]</span>
                              </h6>
                              <div>
                                النسبة:
                                <Badge
                                  color="warning"
                                  style={{ padding: "5px", fontSize: "15px" }}
                                >
                                  %{risk.precentage}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <RiskItemesDetailes
                            reportId={this.props.reportId}
                            data={risk.category_items}
                          />
                        </div>
                      );
                    })}
                  </CardBody>
                </Card>
              </>
            );
          } else return <NoResults />;
        }}
      </Query>
    );
  }
}

export default RiskDetailes;

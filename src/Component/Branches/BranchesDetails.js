import React, { Component } from "react";
import { Query } from "react-apollo";
import Error from "../../views/Components/Custom/Error/Error";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Get_Detailes from "../../Queries/BranshesQuery/BranshDetailes";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import EditBranch from "./EditBranch";

export class BranchesDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      src: props.src,
      errored: false,
    };
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.fallbackSrc,
        errored: true,
      });
    }
  }

  render() {

    const { src } = this.state;
    const {
      src: _1,
      fallbackSrc: _2,
      ...props
    } = this.props;


    return (
      <Query
        query={Get_Detailes}
        variables={{ branch_id: parseInt(this.props.branchId) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error)
            return (

              <Error />
            );

          const getDate = isoDate => {
            let date = new Date(isoDate).toLocaleString();
            date = date
              .split(",")[0]
              .split("/")
              .map(dat => (dat < 10 && "0" + dat) || dat);
            date = date[1] + "/" + date[0] + "/" + date[2];

            return date;
          };

          const branch = data.branch[0];

          if (data.branch.length)
            return (
              <Card >
                <CardHeader style={{ backgroundColor: "#26B0A5", }}>
                  <span
                    style={{
                      color: "#E6F6F5",
                      fontFamily: "italic",
                      fontSize: "25px"
                    }}
                  >
                    فرع :{branch.name}
                  </span>
                </CardHeader>
                <CardBody style={{ padding: "0" }}>
                  <Table responsive striped hover>
                    <tbody
                      style={{
                        fontSize: "15px",
                        fontFamily: "sans-serif",
                      }}
                      key={branch.id}
                    >
                      {
                        <React.Fragment>
                          <tr>
                            <td scope="col">رقم الفرع</td>
                            <td>{branch.branch_number}</td>
                          </tr>
                          <tr>
                            <td scope="col"> الاسم بالغه العربيه</td>
                            <td>{branch.name} </td>
                          </tr>
                          <tr>
                            <td scope="col"> الاسم بالغه الاجنبيه</td>
                            <td>{branch.name_en} </td>
                          </tr>
                          {/* <tr>
                            <td scope="col"> مدير الفرع</td>
                            <td>
                              {branch.branch_manager == null
                                ? "لم يحدد بعد"
                                : branch.branch_manager}
                            </td>
                          </tr> */}

                          <tr>
                            <td scope="col">جهات الاتصال</td>
                            <td>{branch.contact_numbers} </td>
                          </tr>
                          <tr>
                            <td scope="col">الحي</td>
                            <td>{branch.branch_neighborhood.name} </td>
                          </tr>
                          <tr>
                            <td scope="col">المدينه</td>
                            <td>{branch.branch_neighborhood.neighborhood_area.area_city.name} </td>
                          </tr>

                          <tr>
                            <td scope="col"> تاريخ الانشاء</td>
                            <td>{getDate(branch.created_at)} </td>
                          </tr>
                          <tr>
                            <td scope="col"> اخر تحديث</td>
                            <td>{getDate(branch.updated_at)} </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                width: "25%",
                                textAlign: "right",
                                fontWeight: "700"
                              }}
                            >
                              الوصف
                            </td>
                            <td style={{ width: "75%", textAlign: "right" }}>
                              <Badge style={{ fontSize: "15px", margin: "auto" }} color={"success"}   >
                                {branch.about}
                              </Badge>
                            </td>
                          </tr>
                          {/* <tr></tr> */}

                          <tr style={{ textAlign: "center" }}>
                            <td>
                              <EditBranch branch={branch} />
                            </td>
                            <td></td>
                          </tr>
                        </React.Fragment>
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            );
          else return <div>there is no users</div>;
        }}
      </Query>
    );
  }
}

export default BranchesDetails;

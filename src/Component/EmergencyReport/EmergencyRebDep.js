import React, { Component } from "react";
import { Query } from "react-apollo";
import { EmergencyDepartment } from "../../Queries/EmergencyQuery/EmergencyQuery";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import DrpDwn from "../../views/Components/Custom/DropDown/DropDown";
import EmergencyReport from "./EmergencyReport";
import { Row, Col } from "reactstrap";

export class EmergencyRebDep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slectedDep: 0,
    };
  }
  onChange = (obj) => {
    this.setState({ slectedDep: obj.id });
  };
  render() {
    return (
      <Query query={EmergencyDepartment}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <Error />;
          if (data.emergency_department.length) {
            let EmergencyDepartment = data.emergency_department.map((em) => ({
              id: em.department_id,
              value: `${em.emergency_department_technical_department.name_en}|${em.emergency_department_technical_department.name}`,
            }));

            return (
              <div>
                <Row>
                  <Col>
                    <DrpDwn
                      data={[
                        { id: 0, value: "كل الاقسام" },
                        ...EmergencyDepartment,
                      ]}
                      color="instagram"
                      onChange={this.onChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <EmergencyReport
                      filter={
                        this.state.slectedDep == 0
                          ? false
                          : this.state.slectedDep
                      }
                    />
                  </Col>
                </Row>
              </div>
            );
          } else return <NoResults />;
        }}
      </Query>
    );
  }
}

export default EmergencyRebDep;

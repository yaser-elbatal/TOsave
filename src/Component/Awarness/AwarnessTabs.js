import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import { Query } from "react-apollo";
import { AwarnesType } from "../../Queries/Awarness Queries/Awarness";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import { Row, Col } from "reactstrap";
import DrpDwn from "../../views/Components/Custom/DropDown/DropDown";
import Training from "./AwarnessTypes";

export class AwarnessTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      slectedRebort: 0,
    };
  }

  onChange = (obj) => this.setState({ slectedRebort: obj.value });

  render() {
    return (
      <Query query={AwarnesType}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                <Loader />
              </div>
            );
          if (error) return <Error />;
          if (data.training_report.length) {
            let AwareTypeDrbDwn = data.training_report.map((type, index) => ({
              id: index + 1,
              value: type.training_category,
            }));

            return (
              <div>
                <Row>
                  <Col xl={12}>
                    <div style={{ marginBottom: "15px" }}>
                      <DrpDwn
                        data={[
                          { id: 0, value: "All Training" },
                          ...AwareTypeDrbDwn,
                        ]}
                        selectedReport="0"
                        color="instagram"
                        onChange={this.onChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12}>
                    <Training
                      filter={
                        this.state.slectedRebort == 0
                          ? false
                          : this.state.slectedRebort
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
export default AwarnessTabs;

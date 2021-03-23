import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Badge } from "reactstrap";
import "react-tabs/style/react-tabs.css";
import RiskDetailes from "./RiskDetailes";
import Comments from "./Comments";

const AssessmentTabs = props => {
  const id = props.match.params.id;

  return (
    <Tabs>
      <TabList style={{ fontSize: "20px" }}>
        <Tab>
          <i className="fa fa-file"></i> تفاصيل التقرير
        </Tab>
        <Tab>
          <i className="fa fa-comment"></i> التعليقات
        </Tab>
      </TabList>

      <TabPanel>
        <RiskDetailes reportId={id} />
      </TabPanel>
      <TabPanel>
        <Comments reportId={id} />
      </TabPanel>
    </Tabs>
  );
};
export default AssessmentTabs;

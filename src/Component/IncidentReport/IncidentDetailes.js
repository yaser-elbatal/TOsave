import React from "react";
import { Query } from "react-apollo";
import { IncidentDetail } from "../../Queries/IncidentQuery/IncidentReportQuery";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import Tabs from "../../views/Components/Custom/Tabs/Tabs";
import CorrectiveIncident from "./CorrectiveIncident";
import IncidentTable from "./IncidentTable";

function IncidentDetailes(props) {
  const printHandler = () => {
    window.print();
  };

  return (
    <Query
      query={IncidentDetail}
      variables={{ incRebID: props.match.params.id }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) return <Error />;
        if (data.incident_report.length) {
          let incidentReport = data.incident_report[0];
          let mainTab = <IncidentTable incidentReport={incidentReport} />;
          let secondaryTab = (
            <CorrectiveIncident incRebID={props.match.params.id} />
          );
          let dataTabs = [
            {
              label: <b>تفاصيل التقرير</b>,
              body: mainTab,
            },
            {
              label: <b>اجرائات السلامه </b>,
              body: secondaryTab,
            },
          ];
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                }}
              >
                <button className="btn btn-primary" onClick={printHandler}>
                  طباعة التقرير
                </button>
              </div>
              <Tabs data={dataTabs} />
            </>
          );
        } else return <NoResults />;
      }}
    </Query>
  );
}

export default IncidentDetailes;

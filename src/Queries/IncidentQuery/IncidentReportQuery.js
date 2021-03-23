import gql from "graphql-tag";

// export const IncidentReport = gql`
//   query IncidentRebort($filter: incident_report_bool_exp!) {
//     incident_report(where: $filter) {
//       id
//       branch_id
//       created_at
//       incident_date
//       incident_description
//       updated_at
//       created_by {
//         id
//         employee_user {
//           display_name
//         }
//       }
//       incident_branch {
//         name_ar
//       }
//     }
//   }
// `;

export const IncidentReport = gql`
  query IncidentRebort($filter: incident_report_bool_exp!) {
    incident_report(where: $filter) {
      id
      branch_id
      created_at
      incident_date
      incident_description
      updated_at
      incident_branch {
        name_en
        name
        id
      }
      created_by
      incident_report_user {
        display_name
        id
      }
    }
  }
`;
export const filterBranch = gql`
  query IncidentReport {
    incident_report(distinct_on: branch_id) {
      incident_branch {
        id
        name
        name_en
      }
    }
  }
`;
// export const IncidentDetail = gql`
//   query IncidentDet($incRebID: Int!) {
//     incident_report(where: { id: { _eq: $incRebID } }) {
//       id
//       branch_id
//       created_at
//       employee_signature
//       engineer_action_taken
//       engineer_reported_to_dept
//       engineer_signature
//       reported_for_manager
//       incident_date
//       incident_description
//       manager_action_to_prevent
//       manager_incident_cause
//       manager_require_revision
//       manager_signature
//       occurence_location
//       report_for
//       reported_for_manager
//       status
//       updated_at
//       what_could_be_done_to_prevent_this
//       what_were_you_doing
//       witnesses_names
//       your_action
//       chance_of_occurence
//       anyone_injured
//       incident_branch {
//         name
//         id
//       }

//       created_by {
//         employee_user {
//           display_name
//           id
//         }
//       }
//     }
//   }
// `;

export const IncidentDetail = gql`
  query IncidentDet($incRebID: Int!) {
    incident_report(where: { id: { _eq: $incRebID } }) {
      id
      branch_id
      created_at
      employee_signature
      engineer_action_taken
      engineer_reported_to_dept
      engineer_signature
      reported_for_manager
      incident_date
      incident_description
      manager_action_to_prevent
      manager_incident_cause
      manager_require_revision
      manager_signature
      occurence_location
      report_for
      reported_for_manager
      status
      updated_at
      what_could_be_done_to_prevent_this
      what_were_you_doing
      witnesses_names
      your_action
      chance_of_occurence
      anyone_injured
      incident_branch {
        name
        id
      }
      incident_report_user {
        id
        display_name
      }
    }
  }
`;
export const CorrectivAction = gql`
  query Correct($incRebort: Int!) {
    incident_corrective_actions(
      where: { incident_report: { _eq: $incRebort } }
    ) {
      action
      created_at
      due_date
      incident_report
      updated_at
      id
    }
  }
`;
export const GetIncCount = gql`
  subscription GetRebCount {
    incident_report_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
`;
export const GetIncBrCount = gql`
  subscription MySubscription {
    incident_report_aggregate {
      nodes {
        incident_branch {
          name
          id
        }
      }
    }
  }
`;
export const GetInjuredBranch = gql`
  subscription GetInguredBr {
    incident_report_aggregate {
      nodes {
        anyone_injured
        incident_branch {
          id
          name
        }
      }
    }
  }
`;

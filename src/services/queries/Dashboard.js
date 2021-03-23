import gql from 'graphql-tag';


export const Get_Dashboard_Data = gql`

query GetDashboardData {
  branch: branch_aggregate {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  emergency_report:  emergency_report_aggregate {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  incident_report_new: incident_report_aggregate(where: { status: { _eq: 0 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  incident_report_old: incident_report_aggregate(where: { status: { _eq: 1 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  monthely_report_new: monthely_report_aggregate(where: { status: { _eq: 0 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  monthely_report_reviewing: monthely_report_aggregate(where: { status: { _eq: 1 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  monthely_report_submitted: monthely_report_aggregate(where: { status: { _eq: 2 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  risk_assessment_new: risk_assessment_aggregate(where: { state: { _eq: "new" } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  risk_assessment_history: risk_assessment_aggregate(where: { state: { _eq: "history" } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  technical_department: technical_department_aggregate {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  training_report_new: training_report_aggregate(where: { status: { _eq: 0 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  training_report_finished: training_report_aggregate(where: { status: { _eq: 1 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  training_report_cancel: training_report_aggregate(where: { status: { _eq: 2 } }) {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
  user {
    user_type
  }
 area: area_aggregate {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
 city:  city_aggregate {
    aggregate {
      count(columns: id, distinct: true)
    }
  }
 neighborhood: neighborhood_aggregate {
    aggregate {
      count(columns: id, distinct: true)
    }
  }


maintainance_report_new: maintainance_report_aggregate(where: { status: { _eq: new } }) {
  aggregate {
    count(columns: id, distinct: true)
  }
}
maintainance_report_finished: maintainance_report_aggregate(where: { status: { _eq: done } }) {
  aggregate {
    count(columns: id, distinct: true)
  }
}
}
`



// maintainance_company: maintainance_company_aggregate {
//   aggregate {
//     count(columns: id, distinct: true)
//   }
// }




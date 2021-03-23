import gql from "graphql-tag";

export const AwarnesType = gql`
  query TrainingSubscription {
    training_report(distinct_on: training_category) {
      training_category
    }
  }
`;

// export const AwarnesDetailes = gql`
// subscription TrainingSubscription($filter: training_report_bool_exp!) {
//   training_report(where: $filter) {
//     branch
//     id
//     report_scan
//     occured_at
//     status
//     training_category
//     updated_at
//     created_at
//     training_branch {
//       name
//       name_ar
//     }
//   }
// }
// `
export const AwarnesDetailes = gql`
  subscription TrainingSubscription($filter: training_report_bool_exp!) {
    training_report(where: $filter) {
      branch
      id
      report_scan
      occured_at
      status
      training_category
      updated_at
      created_at
      training_branch {
        name
        name_en
      }
      avatar
      training_employees_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const EmployeeNum = gql`
  subscription TrainingSubscription($report_id: Int!) {
    training_report_employees(
      where: { training_report_id: { _eq: $report_id } }
    ) {
      employee
      signature
      training_employee {
        employee_number
        email
        updated_at
        created_at
        employee_user {
          avatar
          display_name
        }
      }
    }
  }
`;
export const DeletEmp = gql`
  mutation deleteTrainingEmployee($employee_id: Int!) {
    delete_training_report_employees(
      where: { employee: { _eq: $employee_id } }
    ) {
      affected_rows
    }
  }
`;
export const GetCount = gql`
  subscription Count {
    training_report_aggregate {
      aggregate {
        count(columns: id, distinct: true)
      }
    }
  }
`;
export const GetBranchStat = gql`
  subscription TrainBranch {
    training_report_aggregate {
      nodes {
        training_branch {
          id
          name
        }
      }
    }
  }
`;
export const GetEmployeeCount = gql`
  subscription GetRepEm {
  training_report_employees {
  
    training_report_id
    training_report_employees_training_report {
      training_category
      id
    }
  }
}

`;

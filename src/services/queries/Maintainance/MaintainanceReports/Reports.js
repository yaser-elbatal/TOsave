import gql from "graphql-tag";

export const List_Branches_Companies = gql`
query getOrderType {
  order_type_display {
    name
    name_en
    id
  }
}
`;

export const List_Reports = gql`
  subscription getMaintainanceReportWithFilter($filter: maintainance_report_bool_exp!, $limit: Int!) {
  maintainance_report(where: $filter, limit: $limit, order_by: {id: asc}) {
    maintainance_branch {
      name
      name_en
      id
    }
    description
    created_at
    id
    updated_at
    status
    maintenance_report_lifeCycle {
      action
      value
      orderLifeCycleComment {
        comment
        file
        created_by
      }
      id
    }
    maintenance_report_category {
      image
      name
      name_en
      isNeglected
      isLogistic
      created_at
      updated_at
    }
    title
    images
  }
}

`;

export const List_Reports_Detailes = gql`
subscription getMaintainanceReportDetailsWithFilter($reportId: Int!) {
  maintainance_report(where: {id: {_eq: $reportId}}) {
    maintainance_branch {
      name
      name_en
    }
    maintenance_report_lifeCycle {
      action
      value
      orderLifeCycleComment {
        comment
        file
        created_by
        created_at
        orderLifeCycle_comment_user {
          avatar
          isActivated
          id
          display_name
        }
        updated_at
      }
      id
      created_at
      updated_at
    }
    maintenance_report_category {
      image
      name
      name_en
      isNeglected
      isLogistic
      created_at
      updated_at
    }
    description
    images
    status
    title
    created_at
    orderType
  }
}



`;

export const List_Items_Cats = gql`
  query ListItemsCats($ids: [Int!]) {
    maintainance_items(where: { id: { _in: $ids } }) {
      name_ar
      isNeglected
      id
      created_at
      maintainance_items_category {
        id
        isNeglected
        name_ar
      }
    }
  }
`;

export const List_Report_Details_Report = gql`
  query ListReportDetailsReport($report_id: Int!) {
    report: maintainance_report(where: { id: { _eq: $report_id } }) {
      visit_type
      updated_at
      system_type
      problem_solution
      problem_description
      maintainance_date
      images
      status
      created_at
      branch: maintainance_report_branch {
        name_ar
        id
      }
      company: maintainance_report_company {
        id
        company_name
      }
      maintainance_report_items_aggregate {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;
export const getEngineers = gql`

query getEngineers {
  user(where: { user_type: { _eq: engineer } }) {
    display_name
    id
    avatar
    isActivated
  }
}
`

export const List_Report_Details = gql`
  query ListReportDetails($report_id: Int!) {
    maintainance_report(where: { id: { _eq: $report_id } }) {
      visit_type
      updated_at
      system_type
      problem_solution
      problem_description
      maintainance_date
      images
      status
      created_at
      maintainance_report_branch {
        name_ar
        id
      }
      maintainance_report_company {
        id
        company_name
      }
      maintainance_report_items {
        id
        item_id
        amount
      }
      maintainance_report_items_aggregate {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;

export const List_Report_Comments = gql`
  subscription ListReportComments($reportId: Int!) {
    maintainance_report_comments(
      where: { maintainance_report: { _eq: $reportId } }
    ) {
      comment
      created_at
      created_by
      id
      images
      updated_at
      maintainance_comment_user {
        active
        avatar
        id
        display_name
      }
    }
  }
`;

export const Create_Comment = gql`
 mutation orderLifeCycleComment(  $file: String!
    $comment: String!
    $created_by: uuid!
    $order_life_cycle: Int!) {
  insert_orderLifeCycle_comment(objects: {comment: $comment, created_by: $created_by, file: $file, orderLifeCycle_id:  $order_life_cycle}) {
    affected_rows
  }
}
`;

export const List_Reports_Statistics_1 = gql`
  query ListReportsStatistics1 {
    reports: maintainance_report {
      date: maintainance_date
      status
      branch: maintainance_report_branch {
        id
        name: name_ar
      }
      company: maintainance_report_company {
        id
        name: company_name
      }
      items: maintainance_report_items_aggregate {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
  }
`;

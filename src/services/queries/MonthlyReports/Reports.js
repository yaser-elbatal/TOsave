import gql from "graphql-tag";

export const List_Braches_Have_Reports = gql`
  query ListBrachesHaveReports {
    branches: monthely_report(distinct_on: branch_id) {
      monthely_branch {
        id
        name
        name_en
      }
    }

    locations: monthely_report {
      month
      year
    }
  }
`;

export const List_Report_Details = gql`
  query ListReportDetails($monthely_report_id: Int!) {
    monthely_report_details(
      where: { monthely_report_id: { _eq: $monthely_report_id } }
    ) {
      comment
      config_id
      created_at
      id
      images
      updated_at
    }
  }
`;

export const Get_Config_Of_Detail = gql`
  query GetConfigOfDetail($ids: [Int!]) {
    monthely_report_item_config(where: { id: { _in: $ids } }) {
      id
      name_en
      isNeglected
      images_number
      created_at
      monthely_report_item_config_category {
        name_en
        isNeglected
        id
      }
    }
  }
`;

export const List_Reports = gql`
  query ListReports($filterBranch: monthely_report_bool_exp!, $limit: Int!) {
  monthely_report(order_by: {id: desc}, where: $filterBranch, limit: $limit) {
    year
    updated_at
    status
    month
    id
    created_at
    monthely_branch {
      id
      name
    }
   
    created_by
  }
}


`;

export const List_Detail_Comments = gql`
  subscription ListReportComments($detail_id: Int!) {
    monthely_report_comments(where: { detail_id: { _eq: $detail_id } }) {
      comment
      created_at
      created_by
      id
      images
      updated_at
      comment_user {
        isActivated
        avatar
        id
        username
      }
      monthely_report_comments_config {
        name_en
      }
    }
  }
`;

export const Update_Item = gql`
  mutation updateItem(
    $id: Int!
    $images_number: Int!
    $name: String!
    $name_en: String!
    $isNeglected: Boolean!
  ) {
    update_monthely_report_item_config(
      where: { id: { _eq: $id } }
      _set: {
        name: $name
        images_number: $images_number
        name_en: $name_en
        isNeglected: $isNeglected
      }
    ) {
      affected_rows
    }
  }
`;

export const Create_Comment = gql`
  mutation CreateComment(
    $images: String!
    $comment: String!
    $created_by: uuid!
    $detail_id: Int!
    $config_id: Int!
  ) {
    insert_monthely_report_comments(
      objects: {
        images: $images
        comment: $comment
        created_by: $created_by
        detail_id: $detail_id
        config_id: $config_id
      }
    ) {
      affected_rows
    }
  }
`;

export const List_Reports_Statistics_1 = gql`
  query ListReportsStatistics1 {
    monthely_report {
      month
      status
      year
      branch_id
      created_at
      monthely_branch {
        name_en
      }
    }
  }
`;

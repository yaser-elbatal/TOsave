import gql from "graphql-tag";

export const Risk_Assments = gql`
  subscription Get_risk($filterBranch: risk_assessment_bool_exp!) {
  risk_assessment(order_by: {id: asc}, where: $filterBranch) {
    branch_id
    created_at
    id
    state
    updated_at
   
    risk_assessment_branch {
      name
      name_en
    }
    created_by
  }
}


`;
export const Branches_Have_Reports = gql`
  query ListBrachesHaveReports {
    risk_assessment(distinct_on: branch_id) {
      risk_assessment_branch {
        name_en
        name
        id
      }
    }
  }
`;

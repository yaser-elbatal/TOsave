import gql from 'graphql-tag'


export const allRisk = gql`
subscription ListBrachesHaveReports {
  risk_assessment(distinct_on: branch_id) {
    created_at
    id
    risk_assessment_branch {
      name_en
      name
      id
    }
   
  }
}


`
// subscription Getrisk($filterBranch: risk_assessment_bool_exp!) {
//   risk_assessment(order_by: { id: asc }, where: $filterBranch) {
//     branch_id
//     created_at
//     id

//     risk_assessment_branch {
//       name
//     }
//   }
// }

export const itemsSta = gql`

query Get_risk($filterBranch: risk_assessment_bool_exp!) {
    risk_assessment(order_by: {id: asc}, where: $filterBranch) {
      branch_id
      id
      created_at
      risk_assessment_branch {
        name_en
        id
        name
      }
      risk_assessment_details {
        status
        risk_assessment_item {
          percentage
          title
          id
          category_id
        }
        
      }
    }
  }
`
export const GetCategories = gql`
query GetCat ($item_id:[Int!]) {
  risk_assessment_category(distinct_on: id, where: {category_items: {id: {_in: $item_id}}}) {
    
    precentage
    id
  }
}
`
export const wrongStat = gql`
query risk($filterBranch: risk_assessment_bool_exp!) {
  risk_assessment(order_by: {id: asc}, where: $filterBranch) {
    branch_id
    id
    risk_assessment_branch {
      id
      name
    }
    risk_assessment_details(where: {status: {_eq: false}}) {
      id
      image
      status
    }
    created_at
  }
}
`
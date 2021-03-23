import gql from 'graphql-tag';



export const List_Companies = gql` 
query ListCompanies {
  maintainance_company(order_by: {updated_at: desc}) {
    id
    avatar
    company_name
    created_at
    updated_at
    isNeglected
    repsCount:company_maintainance_report_aggregate {
      aggregate {
        count(columns: id, distinct: true)
      }
    }
    place:maintainance_company_neighborhood {
      id
      name
      neighbor_area {
        id
        name
        area_city {
          id
          name
        }
      }
    }
  }
}
  `;


export const Update_Company = gql`
mutation UpdateCompany ($id: Int!, $avatar: String!, $company_name: String!, $isNeglected:Boolean!, $neighborhood: Int!) {
    update_maintainance_company(
      where: {id: {_eq: $id}}, _set: {avatar: $avatar, company_name: $company_name,
        isNeglected: $isNeglected, neighborhood: $neighborhood}) {
    affected_rows
  }
 }
`;


export const Create_Company = gql`
mutation AddCompany($avatar: String!, $company_name: String!, $neighborhood: Int!) {
  insert_maintainance_company(objects: {neighborhood: $neighborhood, company_name: $company_name, avatar: $avatar
  }) { affected_rows }
}
`;

export const List_Branches = gql`
query ListBranches($company_id: Int!) {
  company_maintain_branches(where: {company_id: {_eq: $company_id}}) {
    relation_branches {
      id
      name_ar
      neighborhood: branch_neighborhood {
        name
        area: neighbor_area {
          name
          city: area_city {
            name
          }
        }
      }
    }
  }
}
`;
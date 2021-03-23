import gql from 'graphql-tag';



export const List_Members = gql`
query ListMembers($company_id: Int!) {
  company_users(where: {company_id: {_eq: $company_id}}) {
    company_users_user {
      username
      user_type
      created_at
      display_name
      active
      avatar
      password
      id
    }
  }
}
  `;

export const Create_Member = gql`
    mutation CreateMember($company_id: Int!, $user_id: uuid!) {
      insert_company_users(objects: {company_id: $company_id, user_id: $user_id
      }) { affected_rows }
    }
  `;


export const Update_Member = gql`
mutation UpdateMember ($id: uuid!, $username: String!, $display_name:String!, $active: Boolean!,) {
    update_user(
      where: {id: {_eq: $id}}, _set: {username: $username, display_name: $display_name active: $active,}) {
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
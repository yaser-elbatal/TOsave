import gql from 'graphql-tag'

export const TechnicalSubs = gql`
subscription Tech {
  technical_department {
    id
    name
    name_en
    created_at
    updated_at
    technical_department_user {
      department_user_user {
       
        id
      }
    }
  }
}
  
`
export const techEmployee = gql`
subscription Tech($depId: Int!) {
    technical_department(where: {id: {_eq: $depId}}) {
      id
      technical_department_user {
        department_user_user {
          isActivated
          avatar
          created_at
          display_name
          id
          user_type
        }
        id
      }
    }
  }
  
`
export const AddTchnicalDepartment = gql`
  mutation addTechnicalDepartment ($name:String,$name_en:String!) {
    insert_technical_department(objects: {name_en: $name_en, name: $name}) {
      affected_rows
    }
  }
`

export const AllUser = gql`
subscription getDepartmentUsers ($dep_user_ids:[uuid!]){
  user(where: {user_type: {_eq: techUser}, _and: {id: {_nin: $dep_user_ids}}}) {
    id
    avatar
    username
    user_type
    display_name
    isActivated
  }
}
`

export const AddEmployee = gql`
mutation MyMutation($dep_id: Int!, $userIds: [uuid!]) {
  __typename
  update_department_user(where: {user_id: {_in: $userIds}}, _set: {department_id: $dep_id}) {
    affected_rows
  }
}
`
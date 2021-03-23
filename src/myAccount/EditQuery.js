import gql from 'graphql-tag'

export const Edit_Account =gql`
mutation updateUser($user_id: uuid!,$name:String!,$email:String!,$avatar:String!,$phone:String!) {
  update_user(where: {id: {_eq: $user_id}}, _set: {
    avatar: $avatar,
    name: $name,
    email: $email,
    phone: $phone,
    }) {
    affected_rows
  }
 }
`
export default Edit_Account;
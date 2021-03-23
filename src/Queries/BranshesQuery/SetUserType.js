import gql from "graphql-tag";

const Set_User_Type = gql`
  mutation updateUserManager($id: uuid!, $user_type: user_type_enum!) {
    update_user(
      where: { id: { _eq: $id } }
      _set: { user_type: $user_type }
    ) {
      affected_rows
    }
  }
`;

export default Set_User_Type;
import gql from "graphql-tag";

const Edit_Manager = gql`
  mutation updateBranchManager($branch_id: Int!, $employee_id: Int!) {
    update_branch(
      where: { id: { _eq: $branch_id } }
      _set: { branch_manager: $employee_id }
    ) {
      affected_rows
    }
  }
`;
export default Edit_Manager;

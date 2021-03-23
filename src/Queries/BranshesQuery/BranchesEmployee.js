import gql from "graphql-tag";

const Get_employees = gql`
subscription getBranchEmployee($branch_id: Int!) {
  employee(where: {branch_id: {_eq: $branch_id}, employee_user: { isActivated: {_eq: true}}}, order_by: {id: asc}) {
    email
    employee_number
    id
    emp_branch {
      branch_manager
      avatar
      id
    }
    employee_user {
      id
      user_type
      avatar
      display_name
    }
  }
}


`;
export default Get_employees;

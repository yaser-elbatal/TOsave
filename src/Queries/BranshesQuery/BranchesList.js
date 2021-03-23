import gql from "graphql-tag";

const Get_list = gql`
  query Get_list {
    branch(order_by: { id: asc }) {
      branch_manager
      branch_number
      id
      name
      name_en
      avatar
      about
      branch_manager_emp {
        employee_user {
          display_name
        }
      }
    }
  }
`;
export default Get_list;

export const Get_Branches = gql`
  query Get_Branches {
    branch(order_by: { id: asc }) {
      branch_number
      id
      value: name_en
    }
  }
`;

export const AddBranch = gql`
 mutation addBranch($about: String!, $avatar: String!, $branchnumber: Int!, $name: String!, $name_en: String!, $contact_numbers: String!, $neighborhood: Int!, $branch_manager: Int!) {
  insert_branch(objects: {about: $about, avatar: $avatar, branch_number: $branchnumber, name: $name, name_en: $name_en, contact_numbers: $contact_numbers, neighborhood: $neighborhood, branch_manager: $branch_manager}) {
    returning {
      id
    }
  }
}
`;
export const MaintainComp = gql`
  query MyQuery {
    maintainance_company {
      company_name
      id
      isNeglected
    }
  }
`;

export const EditCompBranch = gql`
  mutation MyMutation($companyId: Int!, $BranchId: Int!) {
    __typename
    insert_company_maintain_branches(
      objects: { branch_id: $companyId, company_id: $BranchId }
    ) {
      affected_rows
    }
  }
`;

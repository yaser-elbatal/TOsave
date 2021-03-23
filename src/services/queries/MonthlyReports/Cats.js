import gql from "graphql-tag";

export const List_Cats = gql`
  query ListCats {
    monthely_report_categories(order_by: { created_at: desc }) {
      id
      created_at
      isNeglected
      name
      name_en
      
      items: category_items_aggregate {
        aggregate {
          count(columns: id, distinct: true)
        }
      }
    }
  }
`;

export const Update_Cat = gql`
  mutation UpdateCat(
    $id: Int!
    $name: String
    $name_en: String
    $isNeglected: Boolean!
  ) {
    update_monthely_report_categories(
      where: { id: { _eq: $id } }
      _set: { name: $name, name_en: $name_en, isNeglected: $isNeglected }
    ) {
      affected_rows
    }
  }
`;

export const Create_Cat = gql`
  mutation AddCat($name: String, $name_en: String, ) {
    insert_monthely_report_categories(
      objects: { name: $name, name_en: $name_en, is_general: true ,isNeglected:false}
    ) {
      affected_rows
    }
  }
`;

export const Create_Private_Cat = gql`
  mutation AddCat($name: String, $name_en: String, $branchId: Int) {
    insert_monthely_report_categories(
      objects: {
        name: $name
        name_en: $name_en
        monthely_report_categories_branch: { data: { branch_id: $branchId } }
        is_general: false,
        isNeglected:false
      }
    ) {
      affected_rows
    }
  }
`;

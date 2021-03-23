import gql from 'graphql-tag';

export const List_Items = gql`
  query ListItems($category_id: Int!) {
    monthely_report_item_config(where: {category_id: {_eq: $category_id}},order_by: {id: desc}) {
        created_at
        images_number
        isNeglected
        name
        name_en
        id
    }
  }
`;

export const Update_Item = gql`
mutation updateItem($id: Int!, $images_number: Int!, $name: String!, $name_en: String!,$isNeglected:Boolean!) {
    update_monthely_report_item_config(where: {id: {_eq: $id}}, _set: {name: $name,images_number: $images_number, name_en: $name_en, isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;

export const Create_Item = gql`
mutation addItem($category_id: Int!, $images_number: Int!, $name: String, $name_en: String) {
  insert_monthely_report_item_config(objects: {category_id: $category_id,images_number: $images_number, name: $name, name_en: $name_en,isNeglected:false}) {
    affected_rows
  }
 }
`;
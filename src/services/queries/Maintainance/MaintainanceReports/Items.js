import gql from 'graphql-tag';

export const List_Items = gql`
query ListItems($category_id: Int!) {
  maintainance_items(where: {category_id: {_eq: $category_id}}, order_by: {id: desc}) {
    created_at
    isNeglected
    name
    name_ar
    id
  }
}
`;

export const Update_Item = gql`
mutation UpdateItem($id: Int!, $name: String!, $name_ar: String!,$isNeglected:Boolean!) {
  update_maintainance_items (where: {id: {_eq: $id}}, _set: {name: $name, name_ar: $name_ar, isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;

export const Create_Item = gql`
mutation AddItem($items:[maintainance_items_insert_input!]!) {
  insert_maintainance_items(objects: $items) {
    affected_rows
  }
 }
`;
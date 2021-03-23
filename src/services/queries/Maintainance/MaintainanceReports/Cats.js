import gql from 'graphql-tag';



export const List_Cats = gql` 
query ListCats {
  cats: maintainance_items_category(order_by: {created_at: desc}) {
    id
    created_at
    isNeglected
    name
    name_en
    items:  maintainance_items_category_maintainance_items_aggregate{
      aggregate {
        count(columns: id, distinct: true)
      }
    }
  }
}
  `;


export const Update_Cat = gql`
mutation UpdateCat($id: Int!, $name: String, $name_ar: String,$isNeglected:Boolean!) {
  update_maintainance_items_category(where: {id: {_eq: $id}}, _set: {name: $name, name_ar: $name_ar,
    isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;


export const Create_Cat = gql`
mutation AddCat($name: String, $name_ar: String) {
  insert_maintainance_items_category(objects: {name: $name, name_ar: $name_ar}) {
    affected_rows
  }
 }
`;
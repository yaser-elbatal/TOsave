import gql from 'graphql-tag';

export const List_Neighborhood = gql`
  query ListNeighborhood($area_id: Int!) {
    neighborhood(where: {area_id: {_eq: $area_id}},order_by: {id: asc}) {
        id
        name
        name_en
        area_id
        created_at
        isNeglected
    }
  }
`;

export const Update_Neighborhood = gql`
mutation updateNeighborhood($id: Int!, $name: String, $name_en: String, $area_id: Int!,$isNeglected:Boolean!) {
  update_neighborhood(where: {id: {_eq: $id}}, _set: {name: $name, name_en: $name_en, area_id: $area_id, isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;

export const Create_Neighborhood = gql`
mutation addNeighborhood($area_id: Int!, $name: String, $name_en: String) {
  insert_neighborhood(objects: {area_id: $area_id, name: $name, name_en: $name_en}) {
    affected_rows
  }
 }
`;
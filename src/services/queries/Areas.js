import gql from 'graphql-tag';

export const List_Areas = gql`
  query ListAreas($city_id: Int!) {
  area(where: {city_id: {_eq: $city_id}}, order_by: {id: asc}) {
    id
    name
    name_en
    city_id
    created_at
    isNeglected
 
    area_neighborhood_aggregate {
      aggregate {
        count
      }
    }
  }
}


`;

export const Update_Area = gql`
mutation updateArea($id: Int!, $name: String, $name_en: String, $city_id: Int!,$isNeglected:Boolean!) {
  update_area(where: {id: {_eq: $id}}, _set: {name: $name, name_en: $name_en, city_id: $city_id, isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;

export const Create_Area = gql`
mutation addArea($city_id: Int!, $name: String, $name_en: String) {
  insert_area(objects: {city_id: $city_id, name: $name, name_en: $name_en}) {
    affected_rows
  }
 }
`;
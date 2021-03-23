import gql from 'graphql-tag';


export const List_Cities = gql` 
  query ListCities {
    city(order_by: {id: asc}) {
      id
      name
      area: city_areas {
        id
        name
        neighbor: area_neighborhood {
          id
          name
        }
      }
    }
  }
  `;
import gql from "graphql-tag";

const Get_Detailes = gql`
query Get_detailes($branch_id: Int) {
  branch(where: {id: {_eq: $branch_id}}) {
    branch_manager
    branch_number
    id
    name
    avatar
    about
    contact_numbers
    created_at
    name_en
    neighborhood
    updated_at
    branch_neighborhood {
      name
      name_en
      neighborhood_area {
        area_city {
          name
        }
      }
    }
  }
}


`;
export default Get_Detailes;

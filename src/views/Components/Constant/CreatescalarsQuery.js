import gql from "graphql-tag";
const Creat_scal = gql`
  mutation addScalars(
    $organization_hour_price: Int!
    $provider_to_home_price: Int!
    $sitter_hour_price: Int!
    $fine_minute_price: Int
    $app_percentage: Int!
  ) {
    insert_scalars(
      objects: {
        organization_hour_price: $organization_hour_price
        provider_to_home_price: $provider_to_home_price
        sitter_hour_price: $sitter_hour_price
        fine_minute_price: $fine_minute_price
        app_percentage: $app_percentage
      }
    ) {
      affected_rows
    }
  }
`;
export default Creat_scal;

import gql from "graphql-tag";

const Get_const = gql`
  query Get_scrles {
    scalars {
      id
      created_at
      updated_at
      organization_hour_price
      provider_to_home_price
      sitter_hour_price
      fine_minute_price
      app_percentage
    }
  }
`;
export default Get_const;

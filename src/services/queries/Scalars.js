import gql from 'graphql-tag';

export const Get_Scalars = gql`
  query GetScalars{
    scalars{
        organization_hour_price
        provider_to_home_price
        sitter_hour_price
    }
  }
`;
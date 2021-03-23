import gql from 'graphql-tag';


//get privacy policy or about us according to key => privacyPolicy | aboutUs
export const Get_General = gql`
  query GetSetting($key: String!) {
    settings(where: {key: {_eq: $key}}) {
        id
        key
        value_ar
        value_en
        updated_at
    }
  }
`;


export const Update_General =gql`
mutation updateSetting($key: String!, $value_ar: String, $value_en: String) {
  update_settings(where: {key: {_eq: $key}}, _set: {value_ar: $value_ar, value_en: $value_en}) {
    affected_rows
  }
 }
`;

export const Create_General=gql`
mutation createSetting($key: String, $value_ar: String, $value_en: String) {
  insert_settings(objects: {key: $key, value_ar: $value_ar, value_en: $value_en}) {
    affected_rows
  }
 }
`;
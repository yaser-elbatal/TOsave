import gql from 'graphql-tag'

const Edit_payment =gql`
mutation updatePaymentInfo($payment_id: Int!,$year:Int!,$month:Int!,$holder_name:String!,$cvc:String!,$card_number:Int!) {
  update_payment_info(where: {id: {_eq: $payment_id}}, _set: {year: $year, month: $month, holder_name: $holder_name, cvc: $cvc, card_number: $card_number}) {
    affected_rows
  }
}
`
export default Edit_payment
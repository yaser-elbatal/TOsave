import gql from 'graphql-tag'

const getPayment = gql`

query getPaymentInfo ($user_id:uuid!) {
    user(where: {id: {_eq: $user_id}}) {
      user_payment_info {
        card_number
        cvc
        holder_name
        id
        month
        year
      }
    }
  }`
  export default getPayment;
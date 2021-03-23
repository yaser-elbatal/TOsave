import gql from 'graphql-tag'

export const Create_payment =gql`
mutation addPaymentInfo ($year:Int!,$month:Int!,$holderName:String,$cvc:String,$cardName:Int!) {
    insert_payment_info(objects: {year: $year, month: $month, holder_name: $holderName, cvc: $cvc, card_number:$cardName }) {
      returning {
        id
        card_number
        cvc
        holder_name
        month
        year
      }
    }
   }`
   export const UPDTE_PAYMENT = gql`
	mutation updateUserPayment($user_id: uuid!, $payment_id: Int!) {
		update_user(
			where: { id: { _eq: $user_id } }
			_set: { payment_id: $payment_id }
		) {
			affected_rows
		}
	}
`



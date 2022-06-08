import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from './StripeForm'

const PUBLIC_KEY="pk_test_51L6DfWDPpkIdPfskMojIaHJjDnavoUYm999lrgs1FUo56SQqn5M7zBepcFgsCun1Sg0Ug5VMnC3VkWXnKgaun33700KLnIcnak"
const stripeTestPromise=loadStripe(PUBLIC_KEY)
export default function StripeContainer() {
  return (
    
        <Elements stripe={stripeTestPromise}>
    <PaymentForm/>
        </Elements>
      
  )
}

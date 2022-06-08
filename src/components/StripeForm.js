import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useState } from 'react'
const CARD_OPTIONS={
    iconStyle:"solid",
    style:{
        base:{
            iconColor:'blue',
            color:"black",
            fontWeight:500,
        },
        invalid:{
            iconColor:'black',
            color:"blue",
        }
    }
}
export default function PaymentForm() {
    const [success, setsuccess] = useState(false)
    const stripe = useStripe()
    const element = useElements()

    const handlesubmit = async e => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: element.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 1000,
                    id
                })
                if (response.data.success) {
                    console.log("successfull payment")
                    setsuccess(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log(error.message)
        }
    }
    return (
        <>
        {!success?
        <form onSubmit={handlesubmit}>
            <fieldset >
                <div>
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>:<div><h2>payment done</h2></div>}
        </>
    )
}

import axios from "axios"
import { useEffect, useState } from "react";
import { OrderItem } from "./OrderItem";    

export function OrderSummary({ cart, loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([])


    useEffect(() => {
        const fetchDeliveryOptions = async () => {
            const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
            setDeliveryOptions(response.data)
        }
        fetchDeliveryOptions()


    }, [])



    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id == cartItem.deliveryOptionId
                })


                


                return (
                    <OrderItem key={cartItem.id} cartItem={cartItem} loadCart={loadCart} deliveryOptions={deliveryOptions} selectedDeliveryOption={selectedDeliveryOption} /> 
                )
            })}

        </div>
    )
}
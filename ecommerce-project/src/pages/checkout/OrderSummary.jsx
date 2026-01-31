import dayjs from "dayjs"
import axios from "axios"
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/money"
import { DelivereyOptions } from "./DeliveryOptions";

export function OrderSummary({ cart }) {
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
                    <div key={cartItem.id} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM, D")}
                        </div>

                        <div className="cart-item-details-grid">
                            <img className="product-image"
                                src={cartItem.product.image} />

                            <div className="cart-item-details">
                                <div className="product-name">
                                    {cartItem.product.name}
                                </div>
                                <div className="product-price">
                                    {formatMoney(cartItem.product.priceCents)}

                                </div>
                                <div className="product-quantity">
                                    <span>
                                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                    </span>
                                    <span className="update-quantity-link link-primary">
                                        Update
                                    </span>
                                    <span className="delete-quantity-link link-primary">
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div className="delivery-options">
                                <DelivereyOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
                            </div>

                        </div>
                    </div>
                )
            })}

        </div>
    )
}
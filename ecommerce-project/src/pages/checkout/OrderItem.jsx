import dayjs from "dayjs"
import axios from "axios"
import { useState } from "react";
import { formatMoney } from "../../utils/money"
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderItem({ cartItem, loadCart, deliveryOptions, selectedDeliveryOption }) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`, {

        })
        await loadCart()
    }
    const handleUpdate = async () => {
        if (isUpdate) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            })
            await loadCart()
        }
        setIsUpdate(!isUpdate)
    }
    const handleUpdateQuantity = (event) => {
        setQuantity(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleUpdate()
        }
        else if (event.key === "Escape") {
            setQuantity(cartItem.quantity)
            setIsUpdate(!isUpdate)

        }
    }

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
                            Quantity:

                            {isUpdate
                                ? (<input type="text"
                                    style={{ width: "50px" }}
                                    value={quantity}
                                    onChange={handleUpdateQuantity}
                                    onKeyDown={handleKeyDown} />)
                                : ""}

                            <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary"
                            onClick={handleUpdate}>
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary"
                            onClick={deleteCartItem}>
                            Delete
                        </span>
                    </div>
                </div>

                <div className="delivery-options">
                    <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
                </div>

            </div>

        </div>
    )
}
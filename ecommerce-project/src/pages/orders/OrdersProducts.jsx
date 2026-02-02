import dayjs from "dayjs";
import axios from "axios";
import { Link } from "react-router"
import { Fragment } from "react";

export function OrderProducts({ order, loadCart }) {

    return (
        <div className="order-details-grid">
            {order.products.map((orderProduct) => {
                const addToCart = async () => {
                    await axios.post("/api/cart-items", {
                        productId: orderProduct.product.id,
                        quantity: 1
                    })
                    await loadCart();
                }
                return (
                    <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                            <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                            <div className="product-name">
                                {orderProduct.product.name}
                            </div>
                            <div className="product-delivery-date">
                                Arriving on: {dayjs(orderProduct.estiamtedDeliveryTImeMS).format("MMMM, D")}
                            </div>
                            <div className="product-quantity">
                                Quantity: 1
                            </div>
                            <button className="buy-again-button button-primary">
                                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                <span className="buy-again-message"
                                    onClick={addToCart}>Add to Cart</span>
                            </button>
                        </div>

                        <div className="product-actions">
                            <Link to="/tracking">
                                <button className="track-package-button button-secondary">
                                    Track package
                                </button>
                            </Link>
                        </div>
                    </ Fragment>


                )
            })}

        </div>
    );
};
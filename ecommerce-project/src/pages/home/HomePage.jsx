import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "../../styles/HomePage.css";

// const response =  await fetch("http://localhost:3000/api/products")
// let products;
// if (response.status === 200){
//     products = await response.json()
// }
// else{
//     products = []
// }

export function HomePage({ cart }) {
    const [products, setProducts] = useState([])


    useEffect(() => {
        axios.get("/api/products")
            .then((response) => {
                setProducts(response.data)
            });


    }, [])
    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">

        <ProductsGrid products={products} />

            </div>
        </>
    );
};
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
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

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([])
    const [ searchParams ] = useSearchParams();
    const search = searchParams.get('search')


    useEffect(() => {
        const getHomeData = async () => {
            if(search){
                const response = await axios.get(`/api/products?search=${search}`)
            setProducts(response.data)
            }
            else{
                const response = await axios.get("/api/products")
                setProducts(response.data)
            }
        };
        getHomeData();
        
    }, [search])
    return (
        <>
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">

        <ProductsGrid products={products} loadCart={loadCart} />

            </div>
        </>
    );
};
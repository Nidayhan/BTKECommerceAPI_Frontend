"use client";
import { useParams } from "next/navigation";

export default function ProductDetailPage(){
    const params = useParams();

    return (

        <h1>Product Details -- {params.id} </h1>


    );
}
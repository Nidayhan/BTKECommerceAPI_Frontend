'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Parent } from "./Components/Parent";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategories } from "@/lib/redux/features/categorySlice";
import Link from "next/link";
import Navbar from "./Components/Navbar";
import { fetchProductsByCategoryId } from "@/lib/redux/features/productSlice";
export default function Home() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category);
  const products = useAppSelector((state) => state.product);

  const [count,setCount] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn,setIsLoggedIn] = useState(true);
  const [name,setName] = useState("");
  const [users,setUsers] = useState([
    {id:1,name:'Semih',Exam1:90,Exam2:80},
    {id:2,name:'Zeynep',Exam1:85,Exam2:95},
    {id:3,name:'Nida',Exam1:78,Exam2:88},
    {id:4,name:'Mahmut',Exam1:92,Exam2:81},
    {id:5,name:'Onur',Exam1:74,Exam2:89},
  ])


  useEffect(()=>{
   dispatch(fetchCategories());
   dispatch(fetchProductsByCategoryId());
  },[dispatch])


  const filterForCategory = (categoryId:string|undefined) => {
    dispatch(fetchProductsByCategoryId(categoryId));
  }



  
  const goToLoginPage = () => {
    router.push("/Login");
  }
  
  useEffect(()=>{
    console.log("Component Mounted");

  },[])


useEffect(()=>{
    console.log("When Changed Count Trigger This" , count);

  },[count])


  function Sum(text:String,a:number,b:number){
    return text + ": " + (a + b); 
  }

  function CalculateAvg(a:number,b:number){
    return (a + b)/2; 
  }

  const multiple = (a:number,b:number) => {
    return a * b;
  }


  if(categories.isLoading){
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-white" style={{color:'black'}}>
        <h1> Loading... </h1>
      </div>
    )
  }

  console.log("categories:",categories);


  return (
 
  
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            BTK Akademi E-Ticaret Platformuna Hoş Geldiniz
          </h1>
          <p className="text-white text-lg mb-6">
            En kaliteli ürünleri en uygun fiyatlarla bulabileceğiniz modern e-ticaret platformu
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Ürünleri İncele
          </Link>
        </div>

        {/* Categories */}
        {categories.categories && categories.categories?.data.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.categories.data.map((category) => (
                <div
                  key={category.id}
                  onClick={()=>filterForCategory(category.id)}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center"
                >
                  <h3 className="font-semibold text-gray-900">{category.categoryName}</h3>
                  <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Products */}
       <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          {products.isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : products.products && products.products?.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.products?.data.slice(0, 8).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    {product.productImages[0]?.imageUrl && (
                      <img
                        src={`https://localhost:7230${product.productImages[0]?.imageUrl}`}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.productName}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.productDescription}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">
                        {product.price.toFixed(2)} ₺
                      </span>
                      {/* <span className="text-sm text-gray-500">{product.categoryName}</span> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">Henüz ürün bulunmamaktadır.</p>
            </div>
          )}
        </div> 
      </main>
    </div>
   
  );
}
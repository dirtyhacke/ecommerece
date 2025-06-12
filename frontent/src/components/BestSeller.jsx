import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller,setBestSeller]= useState([]);
    
    useEffect(()=>{
        //console.log("Products from context:", products);
        const bestProduct=products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));

    },[products]);

  return (
    <div className='my-5'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Explore our best-selling products, loved by customers for their quality, value, and style! From trending gadgets to everyday essentials, these top picks are flying off the shelves. Don’t miss out—grab yours before they’re gone! 🛒🔥
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          bestseller.map((item,index)=>(
            <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
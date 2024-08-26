import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({productList}) => {
  return (
    <div className='pt-10'>
      <h2 className='text-green-600 font-bold text-2xl'>Shop</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 pt-5'>
        {productList.map((product,index)=>(
          <ProductItem product={product}/>
        ))}
      </div>
    </div>
  )
}

export default ProductList
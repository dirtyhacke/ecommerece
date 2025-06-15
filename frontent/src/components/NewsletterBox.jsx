import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandiler =(event) =>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20%off</p>
        <p className='text-gray-400 mt-3'>📣 Subscribe & Save!
Join our style community today and get an exclusive 20% OFF your first purchase.
Be the first to discover new arrivals, seasonal collections, and special offers — straight to your inbox.
✨ Fashion never looked this rewarding.

</p>
        <form onSubmit={onSubmitHandiler}className='w-full sm:w1/2 flex items-center gap-3 max-auto my-6 border pl-3'>
            <input type="email" placeholder='enter your email' className='w-full sm:flex-1 outline-none'  required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox
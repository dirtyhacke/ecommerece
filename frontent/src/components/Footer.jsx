import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo}alt="" className='mb-5 w-32'/>
                <p className='w-full md:w-2/3 text-gray-600'>
                    At The Style Lab, we bring you the freshest trends in modern fashion — bold prints, cozy textures, and timeless essentials. Curated with love for those who dress to express.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+918590053568</li>
                    <li>swarajcn774@gmail.com</li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>
                Copywrite 2025@swarajcn@774 -All Right Reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer
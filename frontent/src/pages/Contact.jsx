import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewletterBox from '../components/NewsletterBox'
const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt=""  className='w-full md:max-w-[480px]'/>
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>OUR STORE</p>
            <p className='text-gray-500'>671532 MALAKKALLU <br/>KASARAGOD , KERALA ,INDIA</p>
            <p className='text-gray-500'> TEL : + 91 8590053568 <br />EMAIL: thestylelab@gmail.com</p>
            <p className='font-semibold text-xl text-gray-600'>CAREES AT THE STYLE LAB</p>
            <p className='text-gray-500'> LEARN MORE ABOUT OUR TEAMS AND JOB OPENINGS.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-amber-100 transition-all duration-500'>EXPLORE JOB</button>
        </div>
      </div>
      <NewletterBox/>
    </div>
  )
}

export default Contact
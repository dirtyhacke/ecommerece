import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const about = () => {
  return (
    <div className="px-4">
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      
      {/* About Section */}
      <div className='my-10 flex flex-col md:flex-row gap-6 md:gap-12'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Us" />
        
        {/* Responsive Text Section */}
        <div className='flex flex-col justify-center gap-4 w-full text-gray-600 text-center md:text-left'>
          <p className='leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className='leading-relaxed'>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p className='leading-relaxed'>
            To provide the best quality service with integrity and innovation.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4 text-center'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-6 md:px-12 py-8 flex flex-col gap-3 text-center md:text-left'>
          <b>Quality Assurance</b>
          <p className='text-gray-600 leading-relaxed'>We ensure that every product meets the highest quality standards.</p>
        </div>

        <div className='border px-6 md:px-12 py-8 flex flex-col gap-3 text-center md:text-left'>
          <b>Convenience</b>
          <p className='text-gray-600 leading-relaxed'>Easy access, quick delivery, and a seamless shopping experience.</p>
        </div>

        <div className='border px-6 md:px-12 py-8 flex flex-col gap-3 text-center md:text-left'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600 leading-relaxed'>Our support team is always here to help with any inquiries.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default about;

import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandier = async (e) => {
    e.preventDefault();


    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subcategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})
      
      if (response.data.success) {
        toast.success(response.data.message);
     
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else{
        
        toast.error(response.data.message)
        
      }
  
    } catch (error) {
      console.log(error);
      toast.error(error.message) 
    }
  }

  return (
    <form className='flex flex-col w-full items-start gap-3'  onSubmit={onSubmitHandier}>
      <div className=''>
        <p className='mb-2'>Upload image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />

            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />

            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />

            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />

            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>

        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type here' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Write content here' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2' >Product category</p>
          <select className='w-full px-3 py-2' onChange={(e) => setCategory(e.target.value)}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'> Sub category</p>
          <select className='w-full px-3 py-2' onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottonwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="EthnicWear">EthnicWear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='999' required/>
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("FreeSize") ? prev.filter(item => item !== "FreeSize") : [...prev, "FreeSize"])}>
            <p className={`${sizes.includes("FreeSize") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>FreeSize</p>
          </div>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes For kids</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
          <div onClick={() => setSizes(prev => prev.includes("0-3 Months") ? prev.filter(item => item !== "0-3 Months") : [...prev, "0-3 Months"])}>
            <p className={`${sizes.includes("0-3 Months") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer `}>0-3 Months</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("9-12 Monts") ? prev.filter(item => item !== "9-12 Monts") : [...prev, "9-12 Monts"])}>
            <p className={`${sizes.includes("9-12 Monts") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>9-12 Monts</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("6-12 Months") ? prev.filter(item => item !== "6-12 Months") : [...prev, "6-12 Months"])}>
            <p className={`${sizes.includes("6-12 Months") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>6-12 Months</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("12-18 Months") ? prev.filter(item => item !== "12-18 Months") : [...prev, "12-18 Months"])}>
            <p className={`${sizes.includes("12-18 Months") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>12-18 Months</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("18-24 Months") ? prev.filter(item => item !== "18-24 Months") : [...prev, "18-24 Months"])}>
            <p className={`${sizes.includes("18-24 Months") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>18-24 Months</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("0-1 Year") ? prev.filter(item => item !== "0-1 Year") : [...prev, "0-1 Year"])}>
            <p className={`${sizes.includes("0-1 Year") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>0-1 Year</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("1-2 Years") ? prev.filter(item => item !== "1-2 Years") : [...prev, "1-2 Years"])}>
            <p className={`${sizes.includes("1-2 Years") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>1-2 Years</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("2-2 Years") ? prev.filter(item => item !== "2-2 Years") : [...prev, "2-2 Years"])}>
            <p className={`${sizes.includes("2-2 Years") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>2-2 Years</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("2-3 Years") ? prev.filter(item => item !== "2-3 Years") : [...prev, "2-3 Years"])}>
            <p className={`${sizes.includes("2-3 Years") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>2-3 Years</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("") ? prev.filter(item => item !== "3-4 Years") : [...prev, "3-4 Years"])}>
            <p className={`${sizes.includes("3-4 Years") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>3-4 Years</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("4-5 Years") ? prev.filter(item => item !== "4-5 Years") : [...prev, "4-5 Years"])}>
            <p className={`${sizes.includes("4-5 Years") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>4-5 Years</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("FreeSize") ? prev.filter(item => item !== "FreeSize") : [...prev, "FreeSize"])}>
            <p className={`${sizes.includes("FreeSize") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>FreeSize</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>

        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>

      </div>
      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
    
  )
  
}

export default Add
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
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <p className='mb-2'> Sub category</p>
          <select className='w-full px-3 py-2' onChange={(e) => setSubCategory(e.target.value)}>
            <option value="Topwear">Topwear</option>
            <option value="Bottonwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="EthnicWear">EthnicWear</option>
            <option value="WomensInner">WomensInner</option>
            <option value="MensInner">MensInner</option>
            <option value="WesternWear">WesternWear</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='999' required/>
        </div>
      </div>
      <div>
        <p className='mb-2'>Common Product Sizes</p>
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
          <div onClick={() => setSizes(prev => prev.includes("XS") ? prev.filter(item => item !== "XS") : [...prev, "XS"])}>
            <p className={`${sizes.includes("XS") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XS</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("FreeSize") ? prev.filter(item => item !== "FreeSize") : [...prev, "FreeSize"])}>
            <p className={`${sizes.includes("FreeSize") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>FreeSize</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("UnStiched") ? prev.filter(item => item !== "UnStiched") : [...prev, "UnStiched"])}>
            <p className={`${sizes.includes("UnStiched") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>UnStiched</p>
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
          <div onClick={() => setSizes(prev => prev.includes("5-6 Year") ? prev.filter(item => item !== "5-6 Year") : [...prev, "5-6 Year"])}>
            <p className={`${sizes.includes("5-6 Year") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>5-6 Year</p>
          </div>
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes in Inches</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
          <div onClick={() => setSizes(prev => prev.includes("30") ? prev.filter(item => item !== "30") : [...prev, "30"])}>
            <p className={`${sizes.includes("30") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>30</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("32") ? prev.filter(item => item !== "32") : [...prev, "32"])}>
            <p className={`${sizes.includes("32") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>32</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("34") ? prev.filter(item => item !== "34") : [...prev, "34"])}>
            <p className={`${sizes.includes("34") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>34</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("36") ? prev.filter(item => item !== "36") : [...prev, "36"])}>
            <p className={`${sizes.includes("36") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>36</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("38") ? prev.filter(item => item !== "38") : [...prev, "38"])}>
            <p className={`${sizes.includes("38") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>38</p>
          </div>
           <div onClick={() => setSizes(prev => prev.includes("28") ? prev.filter(item => item !== "28") : [...prev, "28"])}>
            <p className={`${sizes.includes("28") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>28</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("28") ? prev.filter(item => item !== "26") : [...prev, "26"])}>
            <p className={`${sizes.includes("26") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>26</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("40") ? prev.filter(item => item !== "40") : [...prev, "40"])}>
            <p className={`${sizes.includes("40") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>40</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("46") ? prev.filter(item => item !== "46") : [...prev, "46"])}>
            <p className={`${sizes.includes("46") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>46</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("48") ? prev.filter(item => item !== "48") : [...prev, "48"])}>
            <p className={`${sizes.includes("48") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>48</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("20") ? prev.filter(item => item !== "20") : [...prev, "20"])}>
            <p className={`${sizes.includes("20") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>20</p>
          </div>
        </div>
      </div>
      {/*innerwear-section */}
      <div>
        <p className='mb-2'>Product Sizes in CM</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
          <div onClick={() => setSizes(prev => prev.includes("75cm") ? prev.filter(item => item !== "75cm") : [...prev, "75cm"])}>
            <p className={`${sizes.includes("75cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>75cm</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("80cm") ? prev.filter(item => item !== "80cm") : [...prev, "80cm"])}>
            <p className={`${sizes.includes("80cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>80cm</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("100cm") ? prev.filter(item => item !== "100cm") : [...prev, "100cm"])}>
            <p className={`${sizes.includes("100cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>100cm</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("85cm") ? prev.filter(item => item !== "85cm") : [...prev, "85cm"])}>
            <p className={`${sizes.includes("85cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>85cm</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("90cm") ? prev.filter(item => item !== "90cm") : [...prev, "90cm"])}>
            <p className={`${sizes.includes("90cm") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>90cm</p>
          </div>
        </div>
      </div>
      {/*for bed sheet */}
      <div>
        <p className='mb-2'>Product Sizes BedSheet</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
          <div onClick={() => setSizes(prev => prev.includes("Single") ? prev.filter(item => item !== "Single") : [...prev, "Single"])}>
            <p className={`${sizes.includes("Single") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Single</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("Crib") ? prev.filter(item => item !== "Crib") : [...prev, "Crib"])}>
            <p className={`${sizes.includes("Crib") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Crib</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("Double") ? prev.filter(item => item !== "Double") : [...prev, "Double"])}>
            <p className={`${sizes.includes("Double") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Double</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("Queen") ? prev.filter(item => item !== "Queen") : [...prev, "Queen"])}>
            <p className={`${sizes.includes("Queen") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>Queen</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("King") ? prev.filter(item => item !== "King") : [...prev, "King"])}>
            <p className={`${sizes.includes("King") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>King</p>
          </div>
        </div>
      </div>
       <div>
        <p className='mb-2'>Product Sizes in bust size</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-col<option value="Others">Others</option>s-4 gap-2 '>
          {/* bras women inner */}
           <div onClick={() => setSizes(prev => prev.includes("28A") ? prev.filter(item => item !== "30A") : [...prev, "28A"])}>
            <p className={`${sizes.includes("28A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>28A</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("30A") ? prev.filter(item => item !== "30A") : [...prev, "30A"])}>
            <p className={`${sizes.includes("30A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>30A</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("32A") ? prev.filter(item => item !== "32A") : [...prev, "32A"])}>
            <p className={`${sizes.includes("32A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>32A</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("34A") ? prev.filter(item => item !== "34A") : [...prev, "34A"])}>
            <p className={`${sizes.includes("34A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>34A</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("36A") ? prev.filter(item => item !== "36A") : [...prev, "36A"])}>
            <p className={`${sizes.includes("36A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>36A</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("38A") ? prev.filter(item => item !== "38A") : [...prev, "38A"])}>
            <p className={`${sizes.includes("38A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>38A</p>
          </div>
           <div onClick={() => setSizes(prev => prev.includes("28B") ? prev.filter(item => item !== "28B") : [...prev, "28B"])}>
            <p className={`${sizes.includes("28B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>28B</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("30B") ? prev.filter(item => item !== "30B") : [...prev, "30B"])}>
            <p className={`${sizes.includes("30B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>30B</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("32B") ? prev.filter(item => item !== "32B") : [...prev, "32B"])}>
            <p className={`${sizes.includes("32B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>32B</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("34B") ? prev.filter(item => item !== "34B") : [...prev, "34B"])}>
            <p className={`${sizes.includes("34B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>34B</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("36B") ? prev.filter(item => item !== "36B") : [...prev, "36B"])}>
            <p className={`${sizes.includes("36B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>36B</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("38B") ? prev.filter(item => item !== "38B") : [...prev, "38B"])}>
            <p className={`${sizes.includes("38B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>3B8</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("28C") ? prev.filter(item => item !== "28C") : [...prev, "28C"])}>
            <p className={`${sizes.includes("28C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>28C</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("30C") ? prev.filter(item => item !== "30C") : [...prev, "30C"])}>
            <p className={`${sizes.includes("30C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>30C</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("32C") ? prev.filter(item => item !== "32C") : [...prev, "32C"])}>
            <p className={`${sizes.includes("32C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>32C</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("34C") ? prev.filter(item => item !== "34C") : [...prev, "34C"])}>
            <p className={`${sizes.includes("34C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>34C</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("36C") ? prev.filter(item => item !== "36C") : [...prev, "36C"])}>
            <p className={`${sizes.includes("36C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>36C</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("38C") ? prev.filter(item => item !== "38C") : [...prev, "38C"])}>
            <p className={`${sizes.includes("38C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>38C</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("48C") ? prev.filter(item => item !== "48C") : [...prev, "48C"])}>
            <p className={`${sizes.includes("48C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>48C</p>
          </div>
            <div onClick={() => setSizes(prev => prev.includes("42C") ? prev.filter(item => item !== "42C") : [...prev, "42C"])}>
            <p className={`${sizes.includes("42C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>38C</p>
          </div>
            <div onClick={() => setSizes(prev => prev.includes("40C") ? prev.filter(item => item !== "40C") : [...prev, "40C"])}>
            <p className={`${sizes.includes("40C") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>38C</p>
          </div>
          <div  onClick={() => setSizes(prev => prev.includes("48A") ? prev.filter(item => item !== "48A") : [...prev, "48A"])}>
            <p className={`${sizes.includes("48A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>48A</p>
          </div>
            <div onClick={() => setSizes(prev => prev.includes("42A") ? prev.filter(item => item !== "42A") : [...prev, "42A"])}>
            <p className={`${sizes.includes("42A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>42A</p>
          </div>
            <div onClick={() => setSizes(prev => prev.includes("40A") ? prev.filter(item => item !== "40A") : [...prev, "40A"])}>
            <p className={`${sizes.includes("40A") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>40A</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("48B") ? prev.filter(item => item !== "48B") : [...prev, "48B"])}>
            <p className={`${sizes.includes("48B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>48B</p>
          </div>
            <div onClick={() => setSizes(prev => prev.includes("42B") ? prev.filter(item => item !== "42B") : [...prev, "42B"])}>
            <p className={`${sizes.includes("42B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>42B</p>
          </div>
            <div onClick={() => setSizes(prev => prev.includes("40B") ? prev.filter(item => item !== "40B") : [...prev, "40B"])}>
            <p className={`${sizes.includes("40B") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>40B</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-3'>
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white hover:bg-stone-700 rounded-2xl'>ADD</button>
    </form>
  )
}
export default Add
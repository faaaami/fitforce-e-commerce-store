import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Herosection from './Herosection'
import Catogories from './Catogories'
import ProductCard from '../Components/ProductCard'
import Products from './Products'
import Footer from '../Components/Footer'
import FeaturedProducts from './FeaturedProducts'
import WhyChoose from './WhyChoose'
import Testimonials from './Testimonials'




const Home = () => {
  
  return (
    <>
    <Navbar/>
    <div className='bg-black'>
   
     <Herosection/>
     <Catogories/>
     <FeaturedProducts/>
     <WhyChoose/>
     <Testimonials/>
    
    <Footer/>
     
    </div>
    </>
  )
}

export default Home

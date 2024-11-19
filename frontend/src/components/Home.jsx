import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllUserJobs from '@/hooks/useGetAllUserJobs'

function Home() {
  //useGetAllJobs();
  useGetAllUserJobs()
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if (user && user.role === 'recruiter'){
      navigate("/admin/companies")
    }
  },[])
  return (
    <div>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    <Footer/>
    </div>
  )
}

export default Home
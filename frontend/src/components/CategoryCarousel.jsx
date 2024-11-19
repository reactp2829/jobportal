import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
function CategoryCarousel() {
  const category = [
    "Frontend Developers",
    "Backend Developers",
    "Data Science",
    "Big Data",
    "Application Developers",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) =>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
        {
            category.map((cat, index)=>(
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button  onClick ={()=>searchJobHandler(cat)} className="rounded-full border border-gray-300 gap-2">{cat}</Button>
                </CarouselItem>
            ))
        }         
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;

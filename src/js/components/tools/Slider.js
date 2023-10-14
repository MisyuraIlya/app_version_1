import React, { Component, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const Slider = (props) => {

  const ref = useRef(null);

  const onSwiper = (swiper) => {}

  const onSlideChange = () => {
    if (!props.autoplay) return false;
    setTimeout(() => {
      if (ref.current !== null && ref.current.swiper !== null) {
        let running = ref.current.swiper.autoplay.running;
        if (!running) {
          ref.current.swiper.autoplay.start();
        }
      }
    }, props.speed + 500);
  }

  const points = [320,480,640,800,960,1120,1280,1440,1600,1760,1920];

  const getBreakPoints = () => {
    if (!props.responsive) return null;
    let res = {};
    // props.responsive.map((element, index) =>{
    //   res.[Object.keys(element)[0]] = {
    //     slidesPerView: Object.values(element)[0]
    //   }
    // });
    return res;
  }

  return(
    <Swiper
      ref={ref}
      className={props.className}
      spaceBetween={props.spaceBetween ? props.spaceBetween : 0}
      slidesPerView={props.slidesPerView}
      autoplay={props.autoplay}
      loop={props.loop}
      speed={props.speed}
      navigation
      pagination={props.pagination ? { clickable: true } : false}
      onSwiper={(swiper) => onSwiper(swiper)}
      onSlideChange={() => onSlideChange()}
      >
     {props.children.map((element, index) => {
       return <SwiperSlide key={index}>{element}</SwiperSlide>
     })}
   </Swiper>
  );
}

export default Slider;

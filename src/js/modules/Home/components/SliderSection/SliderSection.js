import React, {useState, useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const SliderSection = ({title, array, toShow = 5, column = 1}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const ref = useRef(null);

    const goNext = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
          ref.current.swiper.slideNext();
          setActiveIndex(ref.current.swiper.activeIndex);
        }
      };
    const goPrev = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slidePrev();
            setActiveIndex(ref.current.swiper.activeIndex);
        }
    };

    const param = {
    slidesPerView: toShow,
    slidesPerColumn: column,
    slidesPerColumnFill: 'row',
    breakpoints: {
        1400: {
        slidesPerView: 5,
        slidesPerColumn: 1
        },
        1000: {
        slidesPerView: 5,
        slidesPerColumn: 1
        },
        600: {
        slidesPerView: 2,
        slidesPerColumn: 1
        },
        0: {
        slidesPerView: 2,
        slidesPerColumn: 1
        }
    }};

    return (
        <div className="products-sale product-list cat-list">
            <div className="title-wrapper">
                <h1 className="title">
                    {title &&
                        <span>{title}</span>                
                    }
                </h1>
                <div className="referal-cont">
                    {/* <NavLink to={res.link}>
                        <p>{res.linkTitle}</p>
                    </NavLink> */}
                </div>
            </div>
            <div className="items images images-slider images-slider-cont">
                <Swiper ref={ref} {...param} >
                    {array?.map((element, index) => {
                        return (
                        <SwiperSlide key={index} className="product-item">
                            <div className={"wrapper"}>
                                <NavLink to={`/client/catalog/${element?.id}/0/0?page=1`}>
                                    <div className="img-cont">.
                                        {/* IMPLEMENT IMAGE PATH */}
                                        <img className="img" src={element?.MediaObject?.filePath ? globalFileServer + "categories/" + element?.MediaObject?.filePath : globalFileServer + 'placeholder.jpg'} />
                                    </div>
                                    <div className="prod-data-cont">
                                        <h3 className="p-title">{element?.title}</h3>
                                    </div>
                                </NavLink>
                            </div>
                        </SwiperSlide>
                        );
                    })}
                </Swiper>
                {array?.length > toShow && (
                <div className="swiper-navigation">
                    <button
                        className="swiper-nav prev"
                        onClick={goPrev}
                        data-disabled={activeIndex == 0 ? true : false}
                    >
                    <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </button>
                    <button
                        className="swiper-nav next"
                        onClick={goNext}
                        data-disabled={
                            activeIndex == array.length - (toShow * column) - 2 ? true : false
                        }
                    >
                        <span className="material-symbols-outlined">arrow_back_ios</span>
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};

export default SliderSection;
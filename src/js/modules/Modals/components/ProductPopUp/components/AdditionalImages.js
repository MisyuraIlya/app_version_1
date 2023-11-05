import { Swiper, SwiperSlide } from 'swiper/react';
import React, {useState, useEffect, useRef} from 'react';
import useSelectedProduct from '../../../store/SelectedProductStore';

const AdditionalImages = () => {
    const {selectedProd,changeDefaultImage} = useSelectedProduct()
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef(null);

 
    useEffect(() => {
        setTimeout(() => {
        ref.current.swiper.update();
        }, 350);
    }, [
    ]);

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
    let width = window.innerWidth;
    let toShow = 5;
    let column = 1;

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
        }
    };

    return (
    <div className="additional-imgs-slider">
        <div className="items images images-slider images-slider-cont">
          <Swiper ref={ref} {...param} >
            {selectedProd?.imagePath?.map((element, index) => {
              return (
                <SwiperSlide key={index} className="product-item">
                    <div className={"wrapper sliderImg-main-cont"} onClick={()=> changeDefaultImage(element?.mediaObject?.filePath)}>
                        <div className="img-cont">
                            {element?.mediaObject?.filePath ?
                            <img className="img" src={globalFileServer + 'products/' + element?.mediaObject?.filePath }/>
                            :
                            <img className="img" src={globalFileServer + 'placeholder.jpg'}/>
                            }
                        </div>
                    </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
            <div className="swiper-navigation">
              <button
                className="swiper-nav prev"
                onClick={goPrev}
                data-disabled={activeIndex == 0 ? true : false}
              >
                <span className="material-symbols-outlined" style={{position:'relative',background:'none'}}>arrow_forward_ios</span>
              </button>
              <button
                className="swiper-nav next"
                onClick={goNext}
                data-disabled={
                  activeIndex == selectedProd?.imagePath - (toShow * column) - 2 ? true : false
                }
              >
                <span className="material-symbols-outlined" style={{position:'relative',background:'none'}}>arrow_back_ios</span>
              </button>
            </div>
        </div>
    </div>
    );
};

export default AdditionalImages;
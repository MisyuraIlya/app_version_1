import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { Parallax, Background } from 'react-parallax';
//import Swiper from 'react-id-swiper';
import UserContext from '../../UserContext';
import SweetAlert from 'sweetalert2';
import ContactUs from './Contacts.js'
import LogoMedias from '../tools/LogoMedias.js';
import ContactFooter from '../tools/ContactFooter.js';
import ProductAddToCartCatalog from "./productPage/ProductAddToCartCatalog";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import GalaxyVideo from './GalaxyVideo';

//SwiperCore.use([Autoplay]);

const ShowCase = res => {

	const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);

	const items = [
		{
			Img: '1.png'
		}
	];

	useEffect(() => {
    setTimeout(() => {
      ref.current.swiper.update();
      ref.current.swiper.autoplay.start();
    }, 350);
  }, [res.app.state.cart]);

  const ref = useRef(null);

  let settings = {
    slidesPerView: 1,
    slidesPerView: 1,
    loop: true,
    speed: 1000/*,
    autoplay: true*/
  };
  let toShow = 1;
  const goNext = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slideNext();
      ref.current.swiper.autoplay.start();
    }
  };
  const goPrev = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slidePrev();
      ref.current.swiper.autoplay.start();
    }
  };

	return(
		<div className="showcase">
			<div className="images images-slider">
	      <Swiper ref={ref} {...settings}>
	        {items.map((element, index) => {
	          return (
	            <SwiperSlide key={index} className="item">
								<div className="wrapper">
									<img src={globalFileServer + 'home/banner/' + element.Img} />
								</div>
                {/*
								<div className="masc">
                  <div className="img">
                    <img src={globalFileServer + 'logo.png'} />
                  </div>
								</div>
                */}
	            </SwiperSlide>
	          );
	        })}
	      </Swiper>
				<Fragment>
					<button className="prev" onClick={goPrev}>
						<img src={globalFileServer + 'icons/arrow-backward.svg'} />
					</button>
					<button className="next" onClick={goNext}>
						<img src={globalFileServer + 'icons/arrow-forward.svg'} />
					</button>
				</Fragment>
			</div>
    </div>
	);
}

const ProductsSale = res => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);

  const ref = useRef(null);

  const app = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      ref.current.swiper.update();
    }, 350);
  }, [res.appState.cart]);

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

  const getLowPrice = (price) => {
    let total = parseFloat(price) / 10;
    let val = "גרם 100 / " + total.toFixed(1);
    return val;
  };
  const getWeightPrice = (price) => {
    let total = parseFloat(price);
    let val = 'ק"ג / ' + total.toFixed(1);
    return val;
  };

  const setActiveProduct = id => {
    setActive(id);
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
        slidesPerView: 4,
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
	let lang = res.appState.lang;
  return (
    <div className="products-sale product-list">
      <div className="title-wrapper">
        <h1 className="title">
          <span>{res.title}</span>
        </h1>
        <div className="referal-cont">
          <NavLink to={res.link}>
            <p>{res.linkTitle}</p>
          </NavLink>
        </div>
      </div>
      <div className="items images images-slider-cont">
        <Swiper ref={ref} {...param} >
          {res.items.map((element, index) => {

						let inCart = res.appState.productsInCart.filter(item => item.Products.CatalogNumber == element.CatalogNumber);
						let productSales = res.appState.productSales.length ? res.appState.productSales.filter(item => item.ForCatalogNum == element.CatalogNumber) : [];
						let diffQuantity = res.appState.productSalesDiffQuan.filter(item => item.ProdId == element.Id && item.Quantity != null);
						let maam = res.appState.user.Type == 2 ? 1 : 1;
						let image = res.appState.images.length ? res.appState.images.filter(item => item == element.CatalogNumber) : [];
						let type;

						if((inCart.length && !("UnitChosen" in inCart[0])) ||  (inCart.length == 0)){
							element.Unit == 2 ? type = " לק״ג" : type = " ליחידה"
						}else if((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 0)))){
							type = " ליחידה";
						}else if((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 1)))){
							type = " לאריזות"
						}else if((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 2)))){
							type = " לק״ג";
						}
            type = '';
            return (
              <SwiperSlide key={index} className="product-item main-product-wrapper-cont home">
								<div className={!element.ActualQuan ? "wrapper main-product-wrapper" : "main-product-wrapper wrapper disable"}>
									{(productSales.length || diffQuantity.length) && !element.Status ?
										<div onClick={() => this.setState({info: element})} className="flip-card">
											<div className="flip-card-inner">
												<div className="flip-card-front">
													<img src={globalFileServer + 'icons/percent.svg'} />
												</div>
												<div className="flip-card-back">
													<img src={globalFileServer + 'icons/info-white.svg'} />
												</div>
											</div>
										</div>
									: null}
									<div onClick = {() => this.setState({selectedProd:element, ProductPopUp:true})}>
										<div className="img-cont">
											<img className="img"
                        src={element.Img ? globalFileServer + 'products/' + element.Img : globalFileServer + 'logo.png'}
                        onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}/>
										</div>
										<div className="prod-data-cont">
											<h3 className="p-title">{lang=="he" ? element.Title : element.Description}</h3>
											<div>
												{(res.appState.user && res.appState.user.Id) ||  (!res.appState.user && !localStorage.role && res.appState.priceNoLogin == "1") ?
													<div className="price-main-cont">
														{element.Price && element.Price != '0' ?
															<div className="price-cont">
																<div className="price-subCont">
																	{(inCart.length && (("UnitChosen" in inCart[0] && (inCart[0].UnitChosen == 0 || inCart[0].UnitChosen == 2)) ||  (!("UnitChosen" in inCart[0])))) || (inCart.length == 0) ?
																		<h3 className="price">{(parseFloat(element.Price) * maam).toFixed(1) + type}</h3>
																	:
																		<h3 className="price">{(parseFloat(element.Price) * parseInt(element.PackQuan) * maam).toFixed(1) + type}</h3>
																	}
																</div>
																{parseFloat(element.OrgPrice) > element.Price ?
																<div className="orgPrice-subCont">
																	<div className="price-widh-discount">
																		{(inCart.length && (("UnitChosen" in inCart[0] && (inCart[0].UnitChosen == 0 || inCart[0].UnitChosen == 2)) ||  (!("UnitChosen" in inCart[0])))) || (inCart.length == 0) ?
																			<h3 className="old-price">{(parseFloat(element.OrgPrice) * maam).toFixed(1)}</h3>
																		:
																			<h3 className="old-price">{(parseFloat(element.OrgPrice) * parseInt(element.PackQuan) * maam).toFixed(1)}</h3>
																		}
																	</div>
																</div>
															:null}
															</div>
														:null}
													</div>
												:null}
											</div>
										</div>
									</div>
									{/*.Type || res.appState.b2cAvailiable*/}
									{(res.appState.user || res.appState.b2cAvailiable)  && !element.ActualQuan && element.Price != 0 ?
									<div className={inCart.length ? "add-to-cart in-cart catalog after-add" : "add-to-cart not-in-cart catalog before-add"}>
										<ProductAddToCartCatalog
											inCart={inCart}
											element={element}
											{...res.appProps}
										/>
									</div>
									:null}
								</div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {res.items.length > toShow ? (
          <div className="swiper-navigation">
            <button
              className="swiper-nav prev"
              onClick={goPrev}
              data-disabled={activeIndex == 0 ? true : false}
            >
              <img src={globalFileServer + "icons/arrow-backward.svg"} />
            </button>
            <button
              className="swiper-nav next"
              onClick={goNext}
              data-disabled={
                activeIndex == res.items.length - (toShow * column) - 2 ? true : false
              }
            >
              <img src={globalFileServer + "icons/arrow-forward.svg"} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};


const CategorySale = res => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);

  const ref = useRef(null);

  //const app = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      ref.current.swiper.update();
    }, 350);
  }, [res.appState.cart]);

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
	let lang = res.appState.lang;
  let catsLvl1 = res.items.filter((item) => {return item.LvlNumber == "1"});

  return (
    <div className="products-sale product-list cat-list">
      <div className="title-wrapper">
        <h1 className="title">
          <span>{res.title}</span>
        </h1>
        <div className="referal-cont">
          <NavLink to={res.link}>
            <p>{res.linkTitle}</p>
          </NavLink>
        </div>
      </div>
      <div className="items images images-slider images-slider-cont">
        <Swiper ref={ref} {...param} >
          {catsLvl1.map((element, index) => {

            return (
              <SwiperSlide key={index} className="product-item">
								<div className={!element.ActualQuan ? "wrapper" : "wrapper disable"}>
                  <NavLink to={'/category/catalog/' + element.Id + '/0/0/1/0/' + lang}>
										<div className="img-cont">
											<img className="img" src={element.Img ? globalFileServer + "categories/" + element.Img : globalFileServer + 'placeholder.jpg'} />
										</div>
										<div className="prod-data-cont">
											<h3 className="p-title">{lang=="he" ? element.Title : element.Decription}</h3>
										</div>
									</NavLink>
								</div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {catsLvl1.length > toShow ? (
          <div className="swiper-navigation">
            <button
              className="swiper-nav prev"
              onClick={goPrev}
              data-disabled={activeIndex == 0 ? true : false}
            >
              <img src={globalFileServer + "icons/arrow-backward.svg"} />
            </button>
            <button
              className="swiper-nav next"
              onClick={goNext}
              data-disabled={
                activeIndex == catsLvl1.length - (toShow * column) - 2 ? true : false
              }
            >
              <img src={globalFileServer + "icons/arrow-forward.svg"} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const BrandsSale = res => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);

  const ref = useRef(null);

  //const app = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      ref.current.swiper.update();
    }, 350);
  }, [res.appState.cart]);

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
	let lang = res.appState.lang;

  return (
    <div className="products-sale product-list brands">
      <div className="title-wrapper">
        <h1 className="title">
          <span>{res.title}</span>
        </h1>
        <div className="referal-cont">
          <NavLink to={res.link}>
            <p>{res.linkTitle}</p>
          </NavLink>
        </div>
      </div>
      <div className="items images images-slider images-slider-cont">
        <Swiper ref={ref} {...param} >
          {res.items.map((element, index) => {

            return (
              <SwiperSlide key={index} className="product-item">
								<div className={"wrapper brand-main-cont"}>
                  <NavLink to={'/category/brand=' + element.val + '/0/0/0/1/0/' + lang}>
{/*
                	<div className="img-cont">
											<img className="img" src={element.Extra1 ? globalFileServer + 'brands/' + element.Extra1 : globalFileServer + 'placeholder.jpg'} />
										</div>
  */}
										<div className="prod-data-cont">
											<h3 className="p-title">{lang=="he" ? element.val : element.val}</h3>
										</div>
									</NavLink>
								</div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {res.items.length > toShow ? (
          <div className="swiper-navigation">
            <button
              className="swiper-nav prev"
              onClick={goPrev}
              data-disabled={activeIndex == 0 ? true : false}
            >
              <img src={globalFileServer + "icons/arrow-backward.svg"} />
            </button>
            <button
              className="swiper-nav next"
              onClick={goNext}
              data-disabled={
                activeIndex == res.items.length - (toShow * column) - 2 ? true : false
              }
            >
              <img src={globalFileServer + "icons/arrow-forward.svg"} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default class Home extends Component {
	state = {
		showCase: [],
		products: [],
		parallax: [],
		departments: [],
		imageText: [],
		contacts: [],
    ContactBtm: [],
    ContactFormInputs: [],
		about: [],
    name:"",
    mail:"",
    phone:"",
    msg:"",
    preload: false,
    bestSellers:[],
    newArrivals:[],
    brands:[]
	};
	componentDidMount = () => {
		setTimeout(() => window.scrollTo(0, 0), 100);
		this.getItems();
	}

	getItems = async () => {

    let user = false;
		localStorage.user ? user = JSON.parse(localStorage.user) : null;
		let val = {
      'action': 'home'
    };
		user ? val.priceFor = user.Type : null;
    user ? val.priceCode = user.PriceList : null;
    user ? val.userId = user.Id : null;
    user ? val.userExtId = user.ExId : null;
    localStorage.role ? val.admin = true : null;


    let valAjax = {
			funcName: 'home',
	    point: 'products_per_category_view',
      val: val
		};
		try {
	    const data = await this.props.ajax(valAjax);
      let dataVal = JSON.parse(data)
      //debugger;
      this.setState({
        bestSellers:dataVal.BestSellers,
        newArrivals:dataVal.NewArrivals,
        brands:dataVal.Brands
      });

	  } catch(err) {
	    //this.props.connectionError('connection error GetSales');
      console.log('connection error GetSales');
	  }
  };




	setType = () => {}
	render(){
		let lang;
    if(this.props.state.lang){
      lang = this.props.state.lang;
    }
		let appState = this.props.state;
    let props = this.props;
		let constant = this.props.returnConstant;
		return (
			<div className="home-page">
        <section id="page1-my" className="section entry-section">
          <div className={localStorage.user || localStorage.agent || localStorage.role ? "video-wrapper" : "video-wrapper no-margin"}>
            {!this.state.activeSection ? <GalaxyVideo /> : null}
            <div className="scroll-down-cont">
              {/* <img src={globalFileServer + '/mouse.svg'} /> */}
            </div>
          </div>
{/*
          {window.innerWidth >= 1150 ?
            <div className="video-wrapper">
              {!this.state.activeSection ? <GalaxyVideo /> : null}
              <div className="scroll-down-cont">
                <img src={globalFileServer + '/mouse.svg'} />
              </div>
            </div>
          :
            <div className="video-wrapper">
              {!this.state.activeSection ?
                <div className="pre-showcase">
                  <img src={globalFileServer + 'ios_mobile.jpeg'} onError={(e) => (e.target.src =globalFileServer + "placeholder.jpg")}/>
                </div>
              : null}
            </div>
          }
*/}
          <div className={this.state.showcase ? "showcase animated fadeInDown" : "showcase"}>
            {/* <h1 className="h1-1">{lang == 'he' ? 'argentools' : 'A.P.I CHURI DISTRIBUTION'}</h1> */}
            {/* <h1 className="h1-2">{lang == 'he' ? 'חליטות תה מיוחדות ומוצרי ומארזי חליטות תה מהודרים לקהל הפרטי והעסקי' : 'Import, marketing and distribution of toiletries, cosmetics and perfumes'}</h1> */}
            {localStorage.user || localStorage.agent || localStorage.role ? 
              <NavLink to={'/category/catalog/0/0/0/1/0/' + lang}>
                <div className="button-cls">
                    <p>{lang == 'he' ? 'לקטלוג המלא' : 'View Catalog'}</p>
                </div>
              </NavLink>
            :null}
          </div>
        </section>


        { localStorage.user && this.props.state.categories.length ?
          <CategorySale
            items={this.props.state.categories}
            appProps={this.props}
            appState={appState}
            products={appState.products}
            increaseCart={this.props.increaseCart}
            decreaseCart={this.props.decreaseCart}
            addToCart={this.props.addToCart}
            setType={this.setType}
            title={lang == 'he' ? 'קטלוג מוצרים' : 'Catalog'}
            linkTitle={lang == 'he' ? 'כל הקטגוריות' : 'All Categories'}
            link={'/category/catalog/0/0/0/1/0/' + lang}

          />
        :null}

        {(localStorage.user || localStorage.agent ) && this.state.bestSellers && this.state.bestSellers.length ?
          <ProductsSale
            items={this.state.bestSellers}
            appProps={this.props}
            appState={appState}
            increaseCart={this.props.increaseCart}
            decreaseCart={this.props.decreaseCart}
            addToCart={this.props.addToCart}
            setType={this.setType}
            title={lang == 'he' ? 'הנמכרים ביותר' : 'Best Sellers'}
            linkTitle={lang == 'he' ? 'כל המוצרים' : 'All Products'}
            link={'/category/best/0/0/0/1/0/' + lang}
          />
        : null}

        {(localStorage.user || localStorage.agent ) && this.state.newArrivals && this.state.newArrivals.length ?
          <ProductsSale
            items={this.state.newArrivals}
            appProps={this.props}
            appState={appState}
            increaseCart={this.props.increaseCart}
            decreaseCart={this.props.decreaseCart}
            addToCart={this.props.addToCart}
            setType={this.setType}
            title={lang == 'he' ? 'חדש!' : 'New In!'}
            linkTitle={lang == 'he' ? 'כל המוצרים' : 'All Products'}
            link={'/category/new/0/0/0/1/0/' + lang}
          />
        : null}

        {(localStorage.user || localStorage.agent) && this.state.brands && this.state.brands.length ?
          <BrandsSale
            items={this.state.brands}
            appProps={this.props}
            appState={appState}
            products={appState.products}
            increaseCart={this.props.increaseCart}
            decreaseCart={this.props.decreaseCart}
            addToCart={this.props.addToCart}
            setType={this.setType}
            title={lang == 'he' ? 'סדרות' : 'Brands'}
            linkTitle={lang == 'he' ? 'כל הסדרות' : 'All Brands'}
            link={'brands/0/' + lang}

          />
        :null}

				<ContactFooter lang={lang} props={this.props}/>
          
    	</div>
		)
	}
}

import ReactDOM from "react-dom";
import React, { Component, Fragment, useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from "react-router-dom";
import {Helmet} from "react-helmet";
import ProductInfo from "./ProductInfo";
import MyCropper from "../../tools/MyCropper";
import LoadImage from '../../tools/LoadImage';
import TablePopUp from "../../tools/TablePopUp";

import ProductAddToCart from "./ProductAddToCart";
import ProductChangePrice from "./ProductChangePrice";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { CatalogServices } from "../../../modules/Catalog/services/catalog.services";


let arrayGLB = [];


const AdditionalImg = res => {
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
    <div className="additional-imgs-slider">
      <div className="items images images-slider images-slider-cont">
        <Swiper ref={ref} {...param} >
          {res.items.map((element, index) => {

            return (
              <SwiperSlide key={index} className="product-item">
								<div className={"wrapper sliderImg-main-cont"} onClick={()=> res.setChosenImg(element)}>
                	<div className="img-cont">
										<img className="img" src={element ? globalFileServer + 'products/' + element : globalFileServer + 'placeholder.jpg'}
                    onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}/>
                                                        
									</div>
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



export default class ProductPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			products: [],
			info: false,
      preload: false,
      dateNew: '',
      imageModal: false,
      attrObj:[],
      chosenImg:false,
      allImages:[],
      myProduct:[],
      tablePopUp:false
		}
		this.close = this.close.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
    this.setPreload = this.setPreload.bind(this);
    this.unsetPreload = this.unsetPreload.bind(this);

	}
	componentDidMount(){
    let dateNew = new Date;
		dateNew = dateNew.toLocaleTimeString().slice(0, -3);
		this.setState({dateNew});
		this.getProduct();
	}
	componentWillReceiveProps(nextProps) {
		// if (this.props.match.params.id != nextProps.match.params.id) {
		// 	this.setState({info: false});
		// 	this.getProduct(nextProps.match.params.id);
		// }
	}
	componentWillUnmount(){
		// let tmpParams = {
		// 	Id: false,
		// 	SubId: false
		// };
		// this.props.setMatch(tmpParams);
	}
	getProduct = async(id)=>{
      let selectedProd = this.props.state.selectedProd;

      this.setState({preload:true});

  		let user = false;
  		localStorage.user ? user = JSON.parse(localStorage.user) : null;

  		let val = {
        'b2cPriceCode': this.props.state.b2cPriceCode,
        'priceNoLogin': this.props.state.priceNoLogin,
        'action': 'productPopUp',
        'catalogNumber': this.props.state.selectedProd.CatalogNumber
      };
  		user ? val.priceFor = user.Type : null;
      user ? val.priceCode = user.PriceList : null;
      user ? val.userId = user.Id : null;
      user ? val.userExtId = user.ExId : null;
      localStorage.role ? val.admin = true : null;
      localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;
      if(this.props.overwriteExtId){
        val.userExtId = this.props.overwriteExtId;
      }
      const valAjax = {
        funcName: '',
        point: 'products_per_category_view',
        val: val
      };

      try {
        const data = await this.props.props.ajax(valAjax);
        let encodeData = JSON.parse(data);
        let attrObj = encodeData.AttrObj;
        let allImages = [];
        let chosenImg;

        if(encodeData.allImages && encodeData.allImages.length){
          chosenImg = encodeData.allImages[0].Img;
          encodeData.allImages.map((item) => {
            allImages.push(item.Img);
          })
        }
  			this.setState({ attrObj, allImages, chosenImg, myProduct: encodeData.OnHand[0]});

        this.setState({preload:false});
      } catch(err) {
        console.log('connection error GetSales');
        this.setState({preload:false});
      }



			// setTimeout(() => window.scrollTo(0, 0), 100);

	}

  uploadImg(data){
		let params = {
			token: localStorage.token,
			role: localStorage.role,
			Folder: data.folder,
			FileName: data.itemId,
			Img: data.img,
			ItemId: data.itemId
		};
		$.ajax({
			url: globalServer + 'upload_img_product.php',
			type: 'POST',
			data: params
		}).done(function(d, data) {
			if(data.result == "success") {
        this.unsetPreload();
        let dateNew = new Date;
    		dateNew = dateNew.toLocaleTimeString().slice(0, -3);
    		this.setState({dateNew});
        this.props.props.addImgToGlbArr(d.itemId);
        $("#img"+d.itemId).css({"background-image":"url("+ globalFileServer + "products/" + d.itemId + ".jpg?" + dateNew +")"});
			}
		}.bind(this, data)).fail(function() {
       console.log('error');
       this.unsetPreload();
     });
	}
  setPreload(){
    this.setState({preload: true});
  }
  unsetPreload(){
    this.setState({preload: false});
  }
	close(){
    // alert("boom");
    // this.props.closePropdPop();
  }

  deleteImage(catalogNum){
    let params = {
			fileName: catalogNum+".jpg",
      token: localStorage.token,
      role: localStorage.role
		};
		$.ajax({
			url: globalServer + 'delete_img.php',
			type: 'POST',
			data: params
		}).done(function(catalogNum, data) {
			if(data.result == "success") {
        this.props.props.removeImgFromGlbArr(catalogNum);
        let dateNew = new Date;
    		dateNew = dateNew.toLocaleTimeString().slice(0, -3);
    		this.setState({dateNew});
        $("#img"+catalogNum).css({"background-image":"url("+ globalFileServer + "products/product.jpg" +")"});
			}
		}.bind(this, catalogNum)).fail(function() {
       console.log('error');
     });
  }

  setChosenImg = (ele) => {
    this.setState({chosenImg: ele})
  }

  selectInput(id, param){
    setTimeout(() => {
      $(param+id).select();
    }, 300);
  }

  shareImage = () => {


    let message = 'שיתוף לינק לתמונה \n';
    message += 'מק״ט: ' + this.props.state.selectedProd.CatalogNumber + '\n';
    message += 'מוצר: ' + this.props.state.selectedProd.Title + '\n';
    message += 'לינק: '
    message += globalFileServer + "products/" + this.state.chosenImg;
    window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(message));
    //window.open('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message.split(' ').join('%20'));

    
    /*
    const shareData = {
      title: "MDN",
      text: "Learn web development on MDN!",
      url: "https://developer.mozilla.org",
      };

      const btn = document.querySelector("button");
      const resultPara = document.querySelector(".result");

      // Share must be triggered by "user activation"
      btn.addEventListener("click", async () => {
        try {
          await navigator.share(shareData);
          resultPara.textContent = "MDN shared successfully";
        } catch (err) {
          resultPara.textContent = `Error: ${err}`;
        }
      });

    */

  }

  openLink = () =>{
    let imageURL = globalFileServer + "products/" + this.state.chosenImg;

    if (this.props.props.state.appId == "") {
      var win = window.open(imageURL, '_blank');
    } else {
      var ref = cordova.InAppBrowser.open(imageURL, '_system', 'location=yes');
    }
  }

  setUpAjaxBeforeFunc = async(action) =>{
    let selectedProd = this.props.state.selectedProd;


    let user = false;
    localStorage.user ? user = JSON.parse(localStorage.user) : null;

    let val = {
      'catalogNumber': this.props.state.selectedProd.CatalogNumber
    };
    user ? val.userExtId = user.ExId : null;
    localStorage.role ? val.admin = true : null;
    localStorage.agentExId ? val.agentExId = localStorage.agentExId : null;

    if(this.props.overwriteExtId){
      val.userExtId = this.props.overwriteExtId;
    }
    const valAjax = {
      funcName: '',
      point: 'products_per_category_view',
      val: val
    };

    this.setState({preload:true});
    valAjax.val.action = action;
    try {
      // const data = await this.props.props.ajax(valAjax);
      const data = await CatalogServices.PurchaseHistoryPerUser(val.userExtId, val.catalogNumber);
      console.log('data',data)
      // let encodeData = JSON.parse(data);
      this.setState({preload:false, tablePopUp:data.data});

    } catch(err) {
      console.log('connection error GetSales');
      this.setState({preload:false});
    }
  }
 
	render(){
    let inCart = this.props.props.state.productsInCart.filter(item => item.Products.CatalogNumber == this.props.state.selectedProd.CatalogNumber);
    let productSales = this.props.props.state.productSales.length ? this.props.props.state.productSales.filter(item => item.ForCatalogNum == this.props.state.selectedProd.CatalogNumber) : [];
    let diffQuantity = this.props.props.state.productSalesDiffQuan.filter(item => item.ProdId == this.props.state.selectedProd.Id && item.Quantity != null);
    let maam = !this.props.props.state.user.Type ? 1 : 1;
    let image = this.props.props.state.images.length ? this.props.props.state.images.filter(item => item == this.props.state.selectedProd.CatalogNumber) : [];
    let type;
    let singleHeb = " ליחידה";
    let packHeb = " למארז";
    if((inCart.length && !("UnitChosen" in inCart[0])) ||  (inCart.length == 0)){
      this.props.state.selectedProd.Unit == 2 ? type = " לק״ג" : type = " ליחידה"
    }else if((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 0)))){
      type = " ליחידה";

    }else if((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 1)))){
      type = " למארז"
    }else if((inCart.length && (("UnitChosen" in inCart[0] && inCart[0].UnitChosen == 2)))){
      type = " לק״ג";
    }
    let lang = 'he';
    if(this.props.lang){
      lang = this.props.lang;
    }else if(this.props.state.lang){
      lang = this.props.state.lang;
    }
    if(lang != 'he'){
      type = " Per Unit";
    }

    let priceListGroup='';
    if(this.props.state.selectedProd && this.props.state.selectedProd.PriceListGroup){
      switch(this.props.state.selectedProd.PriceListGroup){
        case '1':
        priceListGroup = 'מחיר אחרון';
        break;
        case '2':
        priceListGroup = 'מחיר לקוח';
        break;
        case '3':
        priceListGroup = 'הצעת מחיר';
        break;
      }
    }

    let props = Object.assign({}, this.props);

    let stockQuant = this.props.state.selectedProd.OnHandPreview;

    let calcVatPrice =parseFloat((parseFloat(this.props.state.selectedProd.Price) * this.props.props.state.defaults.MaamDecimal).toFixed(1));


    return(

			<div className="product-page">
        {this.state.tablePopUp ? ReactDOM.createPortal(
          <div className="my-modal prod-info">
            <div className="modal-wrapper animated">
              <div className="close-cont">
                <div
                  onClick={() => this.setState({tablePopUp: !this.state.tablePopUp})}
                  className="close">
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
              <TablePopUp {...this} lang={lang}/>
            </div>
            <div onClick={this.close} className="overflow"></div>
          </div>,
          document.getElementById('modal-root')
        ) : null}
        
        {this.state.preload ?
          <div className="spinner-wrapper">
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        : null}
        {this.state.imageModal ? ReactDOM.createPortal(
          <div className="modai-image animated">
            <div onClick={() => this.setState({imageModal: false})} className="close">
              <span className="material-symbols-outlined">close</span>
            </div>
            <div className="img-wrapper">
              <img src={globalFileServer + 'products/' + this.state.imageModal} />
            </div>
          </div>,
          document.getElementById('modal-root')
        ): null}
				<div className="product-wrapper flex-container">
          <div className="col-lg-5 image flex-container">
            {this.state.chosenImg ? 
            <>
              <span className="material-symbols-outlined span1" onClick={()=>this.shareImage()}>share</span>
              <span className="material-symbols-outlined span2" onClick={()=>this.openLink()}>link</span>
            </>
            :null}
            <img className="img  col-lg-12" src={globalFileServer + "products/" + this.state.chosenImg}
              onError={(e) => e.target.src = globalFileServer + 'logo.png'}
              onClick={()=> this.setState({imageModal: this.state.chosenImg})}
            />
            <div className="additional-img-cont col-lg-11">
              {this.state.allImages && this.state.allImages.length > 1 ?

                <AdditionalImg
                  items={this.state.allImages}
                  appProps={this.props}
                  appState={this.state}
                  setChosenImg={this.setChosenImg}
                />
              : null}
            </div>
          </div>
					<div className="col-lg-7 info-p">
						<div className="product-details">
							<div className="share"></div>
							<div className="name">

								<h2>{lang == "he" ? this.props.state.selectedProd.Title : this.props.state.selectedProd.Description}</h2>
{/*
                {this.props.state.selectedProd.Description ?
  								<div className="details">
  									<p>{this.props.state.selectedProd.Description}</p>
  								</div>
  							: null}
*/}
                {this.props.state.selectedProd.CatalogNumber ?
                  <div className="prod-info-cont flex-container">
                    <div className="col-lg-3">
                      <p className="c-title">{lang == "he" ? 'מספר קטלוגי' : 'Sku'}</p>
                    </div>
                    <div className="col-lg-9">
                      <p className="c-nomber">{this.props.state.selectedProd.CatalogNumber}</p>
                    </div>
                  </div >
                :null}
                 {this.props.state.selectedProd.ResellPrice ?
                  <div className="prod-info-cont flex-container">
                    <div className="col-lg-3">
                      <p className="c-title">{lang == "he" ? 'מחיר לצרכן' : 'Resell Price'}</p>
                    </div>
                    <div className="col-lg-9">
                      <p className="c-nomber rtl">{parseFloat(this.props.state.selectedProd.ResellPrice).toFixed(1)}</p>
                    </div>
                  </div >
                :null}
                {this.props.state.selectedProd.PackQuan ?
                  <div className="prod-info-cont flex-container">
                    <div className="col-lg-3">
                      <p className="c-title pack_quan">{lang == "he" ? 'יחידות במארז' : 'Units In Box'}</p>
                    </div>
                    <div className="col-lg-9">
                      <p className="c-nomber rtl">{this.props.state.selectedProd.PackQuan}</p>
                    </div>
                  </div >
                :null}
                 {this.props.state.selectedProd.Extra7 ?
                  <div className="prod-info-cont flex-container">
                    <div className="col-lg-3">
                      <p className="c-title pack_quan">{lang == "he" ? 'יחידות במשטח' : 'Units In Box'}</p>
                    </div>
                    <div className="col-lg-9">
                      <p className="c-nomber rtl">{this.props.state.selectedProd.Extra7}</p>
                    </div>
                  </div >
                :null}

                {this.props.state.selectedProd.InnerPack ?
                  <div className="prod-info-cont flex-container">
                    <div className="col-lg-3">
                      <p className="c-title pack_quan">{lang == "he" ? 'Inner' : 'Units In Box'}</p>
                    </div>
                    <div className="col-lg-9">
                      <p className="c-nomber rtl">{this.props.state.selectedProd.PackQuan}</p>
                    </div>
                  </div >
                :null}

                {this.props.state.selectedProd.MasterCarton ?
                  <div className="prod-info-cont flex-container">
                    <div className="col-lg-3">
                      <p className="c-title pack_quan">{lang == "he" ? 'Master' : 'Units In Box'}</p>
                    </div>
                    <div className="col-lg-9">
                      <p className="c-nomber rtl">{this.props.state.selectedProd.PackQuan}</p>
                    </div>
                  </div >
                :null}
                
              
                

              


                {this.state.attrObj && this.state.attrObj.length > 0 ? this.state.attrObj.map((attrEle,attrInd) => {
                  return(
                    <div key={attrInd} className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        {attrEle.MainAttr.ExtId == 48 ? 
                          <a href={attrEle.SubAttr.Val} target="_blank">
                            <img src={globalFileServer + 'icons/youtube.jpg'} />
                          </a>
                        :
                          <p className="c-title">{lang == "he" ? attrEle.MainAttr.Value : ''}</p>

                        }
                      </div>
                      <div className="col-lg-9">
                        {!attrEle.MainAttr.Extra3 ? 
                          <p className="c-nomber rtl">{attrEle.SubAttr.Val}</p>
                        :null}
                        {/*
                          <a href={attrEle.SubAttr.Val} target="_blank">
                            <span className="ExtendBtn material-symbols-outlined">visibility</span>
                          </a>
                        */}
                      </div>
                    </div >
                  )
                }):null}
                

                {this.state.myProduct && Object.keys(this.state.myProduct).length && localStorage.agent ?
                  <>
                    <div className="devider"></div>
                    <div className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        <p className="c-title">{lang == "he" ? "מלאי מחסן" : ''}</p>
                      </div>
                      <div className="col-lg-9">
                          <p className="c-nomber">{this.state.myProduct.OnHandWareHouse}</p>
                      </div>
                    </div >
                    <div className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        <p className="c-title">{lang == "he" ? "מלאי מוקצה" : ''}</p>
                      </div>
                      <div className="col-lg-9">
                          <p className="c-nomber">{this.state.myProduct.OnHandOpenOrders}</p>
                          {this.state.myProduct.OnHandOpenOrders && parseInt(this.state.myProduct.OnHandOpenOrders) > 0 && JSON.parse(localStorage.agent).Super ?
                            <span onClick={()=>this.setUpAjaxBeforeFunc('getOnHandOpenOrdersList')} className="ExtendBtn material-symbols-outlined">visibility</span>
                          :null}
                      </div>
                    </div >
                    <div className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        <p className="c-title">{lang == "he" ? "ממתין לאישור" : ''}</p>
                      </div>
                      <div className="col-lg-9">
                          <p className="c-nomber">{this.state.myProduct.OnHandInternalWaitingOrders}</p>
                          {this.state.myProduct.OnHandInternalWaitingOrders && parseInt(this.state.myProduct.OnHandInternalWaitingOrders) > 0 && JSON.parse(localStorage.agent).Super ?
                            <span onClick={()=>this.setUpAjaxBeforeFunc('getOnHandInternalWaitingOrders')} className="ExtendBtn material-symbols-outlined">visibility</span>
                          :null}

                      </div>
                    </div >
                    <div className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        <p className="c-title">{lang == "he" ? "כמות בדרך" : ''}</p>
                      </div>
                      <div className="col-lg-9">
                          <p className="c-nomber">{this.state.myProduct.OnHandFutureOrdersItems}</p>
                          {this.state.myProduct.OnHandFutureOrdersItems && parseInt(this.state.myProduct.OnHandFutureOrdersItems) > 0 && localStorage.agent ?
                            <span onClick={()=>this.setUpAjaxBeforeFunc('getFutureOrdersList')} className="ExtendBtn material-symbols-outlined">visibility</span>
                          :null}
                      </div>
                    </div >
                    <div className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        <p className="c-title">{lang == "he" ? "זמין למכירה" : ''}</p>
                      </div>
                      <div className="col-lg-9">
                          <p className="c-nomber">{this.state.myProduct.OnHand}</p>
                      </div>
                    </div >

                  </>
                  
                :null}

                {this.state.myProduct && Object.keys(this.state.myProduct).length && (localStorage.user || this.props.overwriteExtId) ?
                  <>
                  <div className="devider"></div>
                    <div className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        <p className="c-title">{lang == "he" ? "היסטוריית רכישה" : ''}</p>
                      </div>
                      <div className="col-lg-9">
                          <span onClick={()=>this.setUpAjaxBeforeFunc('getPurchaseHistoryPerUser')} className="ExtendBtn material-symbols-outlined">visibility</span>
                      </div>
                    </div >
                    </>
                :null}

                
                <div className="devider"></div>

                {localStorage.user && !this.props.overwriteExtId ? 
                   <>
                      {this.props.state.selectedProd.RePrice ? 
                        <div className="prod-info-cont flex-container">
                            <div className="col-lg-3">
                              <p className="c-title">{lang == "he" ? "מחיר ליח' מקורי" : ''}</p>
                            </div>
                            <div className="col-lg-9">
                                <p className="c-nomber rtl">{this.props.state.selectedProd.PriceCalcNoChange ? (parseFloat(this.props.state.selectedProd.PriceCalcNoChange) * maam).toFixed(1) : this.props.state.selectedProd.OrgPrice}</p>
                            </div>
                          </div >
                      :null}
                       <div className="prod-info-cont input-cont flex-container">
                        <div className="col-lg-3">
                          <p className="c-title">{lang == "he" ? "הנחה" : ''}</p>
                        </div>
                        <div className="col-lg-9">
                          {localStorage.agent && localStorage.user && this.props.props.state.selectedMode ? 
                            <input id={"inputDiscount_"+this.props.state.selectedProd.Id}
                            type="number"
                            onClick={()=> this.selectInput(this.props.state.selectedProd.Id, "#inputDiscount_")}
                            onChange={this.props.props.agentRepriceDiscount.bind(this, this.props.state.selectedProd)}
                            onBlur={this.props.props.agentRepriceValidate.bind(this,this.props.state.selectedProd)}
                            value={parseFloat((100-(parseFloat(this.props.state.selectedProd.Price) * 100 /parseFloat(this.props.state.selectedProd.OrgPrice))).toFixed(1))}
                          />
                          :
                            <p className="c-nomber rtl">{parseFloat((100-(parseFloat(this.props.state.selectedProd.Price) * 100 /parseFloat(this.props.state.selectedProd.OrgPrice))).toFixed(1))}</p>
                          }
                        </div>
                      </div >
                      
                      <div className="prod-info-cont input-cont flex-container">
                        <div className="col-lg-3">
                          <p className="c-title">{lang == "he" ? "מחיר ליח'" : ''}</p>
                        </div>
                        <div className="col-lg-9">
                          {localStorage.agent && localStorage.user && this.props.props.state.selectedMode ? 
                            <input id={"inputPrice_"+this.props.state.selectedProd.Id}
                            type="number"
                            onClick={()=> this.selectInput(this.props.state.selectedProd.Id,"#inputPrice_")}
                            onChange={this.props.props.agentReprice.bind(this, this.props.state.selectedProd)}
                            onBlur={this.props.props.agentRepriceValidate.bind(this,this.props.state.selectedProd)}

                            value={parseFloat(parseFloat(this.props.state.selectedProd.Price).toFixed(1))}
                          />
                          :
                            <p className="c-nomber rtl">{parseFloat(parseFloat(this.props.state.selectedProd.Price).toFixed(1))}</p>
                          }
                        </div>
                      </div >
                      <div className="prod-info-cont input-cont flex-container">
                        <div className="col-lg-3">
                          <p className="c-title">{lang == "he" ? "כולל מע״מ" : ''}</p>
                        </div>
                        <div className="col-lg-9">
                          {localStorage.agent && localStorage.user && this.props.props.state.selectedMode ? 
                            <input id={"inputPriceVat_"+this.props.state.selectedProd.Id}
                            type="number"
                            onClick={()=> this.selectInput(this.props.state.selectedProd.Id, "#inputPriceVat_")}
                            onChange={this.props.props.agentRepriceIncVat.bind(this, this.props.state.selectedProd)}
                            onBlur={this.props.props.agentRepriceValidate.bind(this,this.props.state.selectedProd)}
                            value={calcVatPrice}
                          />
                          :
                            <p className="c-nomber rtl">{calcVatPrice}</p>
                          }
                        </div>
                      </div >


                    </>
                :null}


                {localStorage.user && !this.props.overwriteExtId ? 
                    <div className="prod-info-cont flex-container">
                      <div className="col-lg-3">
                        <p className="c-title">{lang == "he" ? "מחיר למארז" : ''}</p>
                      </div>
                      <div className="col-lg-9">
                        <p className="c-nomber rtl">{(parseFloat(this.props.state.selectedProd.Price) * parseInt(this.props.state.selectedProd.PackQuan) * maam).toFixed(1)}</p>
                      </div>
                    </div >
                :null}



							</div>

              <div className="flex-container bottom-flex">
                {this.props.state.selectedProd.Price ?
                  <div className="price-cont col-lg-8">
                   
                  </div>
                :null}

                <div className="add-cont col-lg-4">
                  {this.props.state.selectedProd.Price && this.props.props.state.selectedMode && (this.props.props.state.user || this.props.props.state.b2cAvailiable) ?
                    <div className="actions flex-container">
                      {inCart.length ?
                        <div className="added">
                          <img src={globalFileServer + 'icons/in_cart.png'}/>
                          <p>{lang == 'he' ? 'נוסף לסל' : 'Added To Cart'}</p>
                        </div>
                      :null}
                      {parseInt(this.props.state.selectedProd.OnHand) != 0 ? 
                       <>
                        <div className={inCart.length ? "add-to-cart" : "add-to-cart not-in-cart"}>
                          
                            <ProductAddToCart
                              inCart={inCart}
                              element={this.props.state.selectedProd}
                              lang={lang}
                              {...props}
                            />
                        
                        </div>

                        <div className="sum-cont">
                          <h3 className="h3-1">{lang == 'he' ? "סה״כ: " : "Total:"}</h3>
                          {(inCart.length && (("UnitChosen" in inCart[0] && (inCart[0].UnitChosen == 0 || inCart[0].UnitChosen == 2)) ||  (!("UnitChosen" in inCart[0])))) || (inCart.length == 0) ?
                            <h3 className="h3-2">{inCart.length ? (((parseFloat(this.props.state.selectedProd.Price) * maam))*inCart[0].Quantity).toFixed(1) : "0"}</h3>
                          :
                            <h3 className="h3-2">{inCart.length ? (((parseFloat(this.props.state.selectedProd.Price) * maam))*inCart[0].Quantity * parseFloat(this.props.state.selectedProd.PackQuan).toFixed(1)).toFixed(1) : "0"}</h3>
                          }
                        </div>
                        </>
                       :
                       <div className="added">
                          <span className="material-symbols-outlined">info</span>
                          <p className="red">{lang == 'he' ? 'אזל המלאי' : 'Added To Cart'}</p>
                        </div>
                       }
                    </div>
                  :null}
                </div>
              </div>
						</div>

					</div>

				</div>

        <div>
          {(productSales.length || diffQuantity.length) && this.props.props.state.user.Type ?
            <div className="sales-info">
              <ProductInfo {...this} />
            </div>
          :null}
        </div>

			</div>
		)
	}
}

import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import UserContext from '../../UserContext';
import ContactFooter from '../tools/ContactFooter.js'

export default class PromotionPage extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}
	componentDidMount(){
		setTimeout(() => window.scrollTo(0, 0), 100);

	}
	render(){
		return (
			<div className="page-container promotion-page">
        <div className="page-sub-container">
  				<div className="heading">
  				</div>
          <div className="prom-body-cont flex-container">
            <div className="prom-body-right-cont col-lg-8">
              <div className="prom-body-right-subcont">
                <div className="text-cont">
                  <h1>הגיע הזמן להתקדם לאונליין!</h1>
                  <h3>מערכת הזמנות חדשנית המותאמת לכל מכשיר, הכוללת בין היתר את היתרונות הבאים:</h3>
                  <p>חשיפה לכלל מגוון המוצרים שעדיין לא הכרתם.</p>
                  <p>ניתן לשדר הזמנה בכל שעה ומכל מקום.</p>
                  <p>חוסך לכם זמן יקר ע״י אפשרות להעתקת הזמנה קודמת.</p>
                  <p>חסכון כספי ע״י חשיפה למבצי מכר ייעודיים לאתר ולאפליקציה.</p>
                  <p>אפשרות תשלום באשראי.</p>
                </div>
                <div className="links-main-cont flex-container">
                  <h3 className="col-lg-12">לחץ למעבר לפלטפורמה הרצויה:</h3>
                  <a className="links-sub-cont col-lg-4" href={'https://churishop.co.il'} target="_blank">
                    <img src={globalFileServer + 'promotionPage/web.jpeg'} />
                  </a>
                  <a className="links-sub-cont col-lg-4" href={'https://apps.apple.com/us/app/%D7%97%D7%95%D7%A8%D7%99-%D7%A7%D7%95%D7%9E%D7%A1%D7%98%D7%99%D7%A7%D7%94/id1550975442'} target="_blank">
                    <img src={globalFileServer + 'promotionPage/ios.jpeg'} />
                  </a>
                  <a className="links-sub-cont col-lg-4" href={'https://play.google.com/store/apps/details?id=com.food.churishop'} target="_blank">
                    <img src={globalFileServer + 'promotionPage/android.jpeg'} />
                  </a>
                </div>
              </div>
            </div>
            <div className="prom-body-left-cont col-lg-4">
              <div className="img-cont">
                <img src={globalFileServer + 'promotionPage/delivery_image.png'} />
              </div>
            </div>
          </div>
        </div>
			</div>
		)
  }
}

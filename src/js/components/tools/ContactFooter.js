import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import UserContext from '../../UserContext';
import SweetAlert from 'sweetalert2';


const PHeb1 = `
<p>

עמוד זה מיועד ליצירת קשר בלבד ואינו בא
להחליף ייעוץ על ידי גורמים מקצועיים.
מדי-מרקט אינה יכולה לתת מענה לשאלות
מתחום הרפואה. ככל שיש לך שאלה
בתחומים אלו, אנו ממליצים  להתייעץ עם
הרופא המטפל.
</p>
`;

const ContactUsForm = params => {

  	const [name, SetName] = useState('');
  	const [mail, SetMail] = useState('');
  	const [company, SetCompany] = useState('');
    const [phone, SetPhone] = useState('');


  	const [msg, SetMsg] = useState('');
    const [contactActive, SetContactActive] = useState(0);
    const [contactPopUpActive, SetContactPopUpActive] = useState(false);
    const [contactPopObj, SetContactPopObj] = useState({'Name':"",'Mail':"",'Phone':"",'ProdTitle':"",'DueDate':"", 'Atzva':"", 'Message':""});
    const [dumi, SetDumi]= useState(false);
    const [preload, SetPreload]= useState(false);
    const [inputInfoHover, SetInputInfoHover]= useState(false);



    	const app = useContext(UserContext);
    	let constant = app.returnConstant;


    	const showError = () => {
    		SweetAlert({
    			title: 'פרטים חסרים',
    			type: 'error',
    			showConfirmButton: false,
    			timer: 5000
    		}).then(function () {}.bind(this)).catch(SweetAlert.noop);
    	}

      const close = () => {

        SetContactPopObj({'Name':"",'Mail':"",'Phone':"",'ProdTitle':"",'DueDate':"", 'Atzva':"", 'Message':""});
        SetContactPopUpActive(false);
        params.SetContactPopUpActive();
      }
      const open = () => {
        SetContactPopUpActive(true);
      }
      const setInputState = (param, val) => {
        contactPopObj[param] = val;
        SetContactPopObj(contactPopObj);
        SetDumi(JSON.stringify(contactPopObj));
      }

      const sendPopFormFunc = () => {
        if(contactPopObj.Name != "" && contactPopObj.Mail != "" && contactPopObj.Phone != "" && contactPopObj.ProdTitle != "" && contactPopObj.Message != ""){
          SetPreload(true);
          let valMail = {
            siteName: params.regConstants.constants.SITE_NAME,
            from: params.regConstants.constants.FROM_MAIL,
            to: params.regConstants.constants.TO_MAIL,
            name: contactPopObj.Name,
            mail: contactPopObj.Mail,
            phone: contactPopObj.Phone,
            prodTitle: contactPopObj.ProdTitle,
            dueDate: contactPopObj.DueDate,
            atzva: contactPopObj.Atzva,
            message: contactPopObj.Message
          };


          $.ajax({
            url: 'https://statos.co/statos_web_mail/send_from_contacts_b2b.php',
            type: 'POST',
            data: valMail,
            dataType: "json",
          }).done(function(d) {

            SweetAlert({
              title: app.state.lang == "he" ? 'הודעה נשלחה בהצלחה' : 'Message was sent successfully',
              type: 'success',
              showConfirmButton: false,
              timer: 4000
            }).catch(SweetAlert.noop);
              close();
              SetContactPopObj({'Name':"",'Mail':"",'Phone':"",'ProdTitle':"",'DueDate':"", 'Atzva':"", 'Message':""});
              SetPreload(false);
          }.bind(this)).fail(function() {
             SetPreload(false);
          }.bind(this));
        }else{

          SweetAlert({
            title: app.state.lang == "he" ? 'אנא מלא את כל השדות החובה' : "Please fill in all fields",
            type: 'info',
            showConfirmButton: false,
            timer: 4000
          }).catch(SweetAlert.noop);
        }
      }


      return(
    		<div className="contact-us">
          {preload ?
            <div className="spinner-wrapper">
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          : null}
    			<div className="container">
            {ReactDOM.createPortal(
    					<div className="my-modal contact-pop">
    						<div className="modal-wrapper animated">
                  <div className="close-cont">
      							<div onClick={close} className="close">
      								<img src={globalFileServer + 'icons/close-dark.svg'} />
      							</div>
                  </div>
                  <div className="wrapper">
                    <div className="sup-wrapper">
                      <img className="h1-img" src={globalFileServer + '/Raport_icon_black.png'} />
                      <h1>{app.state.lang == "he" ? "דיווח תופעות לוואי" : ""}</h1>
                      <p dangerouslySetInnerHTML={app.state.lang == "he" ? {__html: PHeb1} : null}></p>
                      <div className="inputs-cont">
                        <div className="input-div">
                          <p>{app.state.lang == "he" ? "שם מלא" : ""}</p>
                          <input
                            type="text"
                            value={contactPopObj.Name ? contactPopObj.Name : ""}
                            placeholder=""
                            onChange={(e) => setInputState("Name", e.target.value)}
                          />

                        </div>

                        <div className="input-div">
                          <p>{app.state.lang == "he" ? "כתובת מייל" : ""}</p>
                          <input
                            type="text"
                            value={contactPopObj.Mail ? contactPopObj.Mail : ""}
                            placeholder=""
                            onChange={(e) => setInputState("Mail", e.target.value)}
                          />
                        </div>

                        <div className="input-div">
                          <p>{app.state.lang == "he" ? "מספר טלפון" : ""}</p>
                          <input
                            type="text"
                            value={contactPopObj.Phone ? contactPopObj.Phone : ""}
                            placeholder=""
                            onChange={(e) => setInputState("Phone", e.target.value)}
                          />

                        </div>
                        <div className="input-div">
                          <p>{app.state.lang == "he" ? "שם המוצר" : ""}</p>
                          <input
                            type="text"
                            value={contactPopObj.ProdTitle ? contactPopObj.ProdTitle : ""}
                            placeholder=""
                            onChange={(e) => setInputState("ProdTitle", e.target.value)}
                          />
                          <div className="info-cont">
                            <img
                              onMouseEnter={() => SetInputInfoHover("ProdTitle")}
                              onMouseLeave={() => SetInputInfoHover(false)}
                              src={globalFileServer + '/icons/contact/input_info.svg'} alt=""/>
                          </div>

                          {inputInfoHover == "ProdTitle" ?
                            <div className="info-value-cont">
                              <p className="info-value">{app.state.lang == "he" ? "שם המוצר והמינון המופיעים על גבי האריזה" : ""}</p>
                            </div>
                          :null}

                        </div>

                        <div className="input-div">
                          <p>{app.state.lang == "he" ? "שם המוצר" : ""}</p>
                          <input
                            type="text"
                            value={contactPopObj.DueDate ? contactPopObj.DueDate : ""}
                            placeholder=""
                            onChange={(e) => setInputState("DueDate", e.target.value)}
                          />

                        </div>

                        <div className="input-div">
                          <p>{app.state.lang == "he" ? "תאריך תפוגה" : ""}</p>
                          <input
                            type="text"
                            value={contactPopObj.Atzva ? contactPopObj.Atzva : ""}
                            placeholder=""
                            onChange={(e) => setInputState("Atzva", e.target.value)}
                          />
                          <div className="info-cont">
                            <img
                              onMouseEnter={() => SetInputInfoHover("Atzva")}
                              onMouseLeave={() => SetInputInfoHover(false)}
                              src={globalFileServer + '/icons/contact/input_info.svg'} alt=""/>
                          </div>

                          {inputInfoHover == "Atzva" ?
                            <div className="info-value-cont">
                              <p className="info-value">{app.state.lang == "he" ? "LOT / BATCH" : ""}</p>
                            </div>
                          :null}
                        </div>
                        <textarea
      										placeholder=""
      										type="text"
      										value={contactPopObj.Message ? contactPopObj.Message : ""}
      										placeholder={app.state.lang == "he" ? "הערות" : ""}
      										onChange={(e) => setInputState('Message', e.target.value)}
      										id="Msg"
        								/>

                      </div>
                      <button onClick={sendPopFormFunc}>{constant('CONTACT_FORM_BTN')}</button>
                    </div>
                  </div>
    						</div>
    						<div onClick={close} className="overflow"></div>
    					</div>,
    					document.getElementById('modal-root')
    				) }
    			</div>
    		</div>
    	);
}


export default class ContactFooter extends Component {
	state = {
		contacts: [],
    ContactBtm: [],
    ContactFormInputs: [],
		about: [],
    name:"",
    mail:"",
    phone:"",
    msg:"",
    preload: false,
    contactPopUpActive: false,
    company:""
	};
	componentDidMount = () => {
		setTimeout(() => window.scrollTo(0, 0), 100);
	}


  SetContactPopUpActive = () => {
    this.setState({contactPopUpActive:false})

  }

  sendForm = () =>{

    if(this.state.name != "" && this.state.mail != "" && this.state.phone != "" && this.state.msg != ""){
      this.setState({preload:true});

      let valMail = {
        siteName: globalSiteName,
        from: this.props.props.state.defaults.statosMail,
        to: this.props.props.state.defaults.toMail,
        name: this.state.name,
        mail: this.state.mail,
        phone: this.state.phone,
        company: this.state.company,
        message: this.state.msg
      };

      $.ajax({
        url: 'https://statos.co/statos_web_mail/send_from_contacts_b2b.php',
        type: 'POST',
        data: valMail,
        dataType: "json",
      }).done(function(d) {

        SweetAlert({
          title: 'הודעה נשלחה בהצלחה',
          type: 'success',
          showConfirmButton: false,
          timer: 4000
        }).catch(SweetAlert.noop);

        this.setState({name:"",mail:"",phone:"",msg:"",company:"",preload:false});

      }.bind(this)).fail(function() {
         console.log('error');
         this.setState({preload:false});
      }.bind(this));
    }else{
      SweetAlert({
        title: 'אנא מלא את כל השדות',
        type: 'info',
        showConfirmButton: false,
        timer: 4000
      }).catch(SweetAlert.noop);
    }

  }


	render(){
		let lang;
    if(this.props.lang){
      lang = this.props.lang;
    }

    let number = '+972504201412';
    //let number = '+972584018761';
    let message = 'היי, אני פונה אליכם דרך האתר. האם תוכלו לעזור לי ?';
    let subject = 'היי, אני פונה אליכם דרך האתר. האם תוכלו לעזור לי ?';
		return (
      <div className="contact-footer" id="contact-footer">
        <div className="container">
          <div className="main-sub-cont">
            <div className="sub-cont flex-container">
              {this.state.contactPopUpActive ?
                <ContactUsForm SetContactPopUpActive={()=> this.SetContactPopUpActive()}/>
              :null}
{/*
              <div className="col-lg-2 map-cont">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.5996732666895!2d34.96860451561274!3d32.10710358117942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d30c199a82f45%3A0x56fb2b1bd39426be!2sHaMelacha%20St%2020%2C%20Rosh%20Haayin!5e0!3m2!1sen!2sil!4v1606141120855!5m2!1sen!2sil"
                  frameBorder="0"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
              </div>
*/}

              <div className="col-lg-5 cont-about-us">
                <div className="cont-about-us-cont">
                  <div className="h2-cont">
                    <h2>{lang == 'he' ? 'אודותינו' : 'About Us'}</h2>
                  </div>
                  {lang == 'he' ?
                    <>
                      {/* <p>חברת BFL סחר בע"מ (Brands for Life), מתמחה בייבוא ושיווק סדרות ייחודיות ואיכותיות של כלי בישול ואביזרים משלימים למטבח המקצועי והפרטי, ממגוון מותגים מובילים בעולם.</p> */}
                      {/* <p>במשך שנים, התמחתה החברה בפיתוח ועיצוב כלי בישול תחת המותג argentools , אשר במהרה נתפס בעיני הצרכן הישראלי כשם נרדף לאיכות, אלגנטיות ופונקציונליות. ב 2018- מותג הבית של החברה אף זכה בפעם השנייה בפרס "מוצר השנה" בקטגוריית "סירים ומחבתות" על קולקציית EDGE המפורסמת שלו.</p> */}
                      {/* <p>מוצרי argentools משווקים במאות נקודות מכירה, רשתות מתמחות ומקצועיות, ועדי עובדים ומועדוני צרכנות, אתרי סחר שונים, לצד חנויות רשת הנושאות את שם המותג, ואתר בית שהפך תוך זמן קצר לאתר כלי הבית המוביל בישראל.</p> */}
                    </>
                  :
                    <>
                      <p>Churi Cosmetics, began its journey in 1978 as an import and distribution company of cosmetics, perfumes and toiletries intended for sale in the private market and in the marketing chains in Israel.</p>
                      <p>Churi Cosmetics provides service to over 2000 points of sale starting from private stores, mini markets, supermarkets, kibbutzim and ending with wholesalers and one of the leading marketing chains in the Israeli market.</p>
                      <p>The distribution system of Churi Cosmetics covers the entire State of Israel from Dan to Eilat and allows each of the company's customers to receive professional and efficient service</p>
                    </>
                  }
                </div>
              </div>

              <div className="col-lg-4 form-cont">
                <div className="form">
                  <div className="wr">
                    <div className="input-group">
                      <input
                        type="text"
                        value={this.state.name ? this.state.name : ""}
                        placeholder={lang == "he" ? "שם": "Name"}
                        onChange={(e) => this.setState({name: e.target.value})}
                        id="Name"
                      />
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        value={this.state.mail ? this.state.mail : ""}
                        placeholder={lang == "he" ? "מייל": "Email"}
                        onChange={(e) => this.setState({mail: e.target.value})}
                        id="Mail"
                      />
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        value={this.state.phone ? this.state.phone : ""}
                        placeholder={lang == "he" ? "טלפון": "Phone"}
                        onChange={(e) => this.setState({phone: e.target.value})}
                        id="Tel"
                      />
                    </div>
                  {/*  <div className="input-group">
                      <input
                        type="text"
                        value={this.state.company ? this.state.company : ""}
                        placeholder={lang == "he" ? "חברה": ""}
                        onChange={(e) => this.setState({company: e.target.value})}
                        id="Tel"
                      />
                    </div>*/}
                    <div className="input-group">
                      <textarea
                        placeholder={lang == "he" ? "הודעה": "Message"}
                        type="text"
                        value={this.state.msg ? this.state.msg : ""}
                        onChange={(e) => this.setState({msg: e.target.value})}
                        id="Msg"
                      />
                    </div>
                    <div className="button-wrapper">
                      <button onClick={()=> this.sendForm()}>{lang == "he" ? "שלח" : "Send"}</button>
                    </div>
                  </div>
                </div>
              </div>




              <div className="col-lg-3 info-cont">
                <div className="contact-info">
                  <div className="flex-container row-cont">
                    <div className="col-lg-2">
                      <div className="img">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <ul>
                        <li className="title"> {lang == "he" ? "כתובת:": "Address:"}</li>
                        <li> "בית שאול" - רח' השר חיים שפירא 13 ראשל"צ , ת.ד. 5095, מיקוד: 7570415</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex-container row-cont">
                    <div className="col-lg-2">
                      <div className="img">
                      <span className="material-symbols-outlined">call</span>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <ul>
                        <li className="title">{lang == "he" ? "טלפון:": "Phone:"}</li>
                        <li>03-6815516</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex-container row-cont">
                    <div className="col-lg-2">
                      <div className="img">
                        <span className="material-symbols-outlined">alternate_email</span>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <ul>
                        <li className="title">{lang == "he" ? "אימייל:": "Email:"}</li>
                        <li>makita@argentools.co.il</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex-container row-cont">
                    <div className="col-lg-2">
                      <div className="img">
                      </div>
                    </div>
                    <div className="col-lg-10 a-class">
                      <a className="privacy a-class" href={globalFileServer + 'policy_form.pdf'} target="_blank">
                        <span className="login">{lang == "he" ? 'תנאי שימוש' : "Privacy Policy"}</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex-container row-cont">
                    <div className="col-lg-2">
                      <div className="img">
                      </div>
                    </div>
                    <div className="col-lg-10 a-class">
                      <a className="privacy" href={globalFileServer + 'negishut.pdf'} target="_blank">
                        <span className="login">{lang == "he" ? 'הצהרת נגישות' : 'Accessibility statement'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>


                {/*
              <div className="col-lg-4 social-cont">
                <div className="social">
                  <div className="network-cont">
                    <div className="network-subcont flex-container">
                      <div className="img-cont col-lg-12">
                        <img src={globalFileServer + 'ew_logo.jpg'} alt=""/>
                      </div>
                      <div className="img-cont col-lg-12">
                        <img src={globalFileServer + 'icons/whatsapp_icon.png'} alt=""/>
                      </div>

                      <div className="img-cont col-lg-12">
                        <img src={globalFileServer + 'icons/facebooc_icon.png'} alt=""/>
                      </div>
                      <div className="img-cont col-lg-12">
                        <img src={globalFileServer + 'icons/instagram_icon.png'} alt=""/>
                      </div>



                    </div>
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
		)
	}
}

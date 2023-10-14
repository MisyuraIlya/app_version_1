import React, { Component, Fragment, useState, useEffect, useContext } from "react";
import SweetAlert from "sweetalert2";
import Modal from "../../tools/Modal";
import Preload from "../../tools/Preload";
import UserContext from '../../../UserContext';

const SuccessDelivery = () => {
  useEffect(() => {
    let el = document.getElementById('body');
		el.classList.add('modal-open');
		return () => {
			el.classList.remove('modal-open');
		}
	}, []);
  const app = useContext(UserContext);
  return(
    <Modal>
      <div className="check-address-main">
		    <div className="popup" id="payPopup">
		      <div className="popup-wrapper animated zoomIn">
		        <div onClick={app.closeAddressPop} className="close">
		          <img src={globalFileServer + "icons/close-dark.svg"} />
		        </div>
		        <div className="wrapp">
		          <div className="img">
		            <img src={globalFileServer + 'client_logo.jpg'} alt=""/>
		          </div>
		          <h3>בינגו! נתראה בקרוב!</h3>
							<div className="button">
								<p onClick={app.closeAddressPop}>כניסה לחנות</p>
							</div>
		        </div>
		      </div>
		    </div>
		  </div>
    </Modal>
  );
}

const ErrorDelivery = () => {
  const [mail, setMail] = useState('');
  const [preload, setPreload] = useState('');
  useEffect(() => {
    let el = document.getElementById('body');
		el.classList.add('modal-open');
		return () => {
			el.classList.remove('modal-open');
		}
	}, []);
  const app = useContext(UserContext);

  const sendMail = () => {
    if (mail && mail.includes('@')) {
      setPreload(true);
      let val = {
        mail: mail
      };
      $.ajax({
        url: "https://statos.co/statos_web_mail/send_mail_chefcall.php",
        type: "POST",
        data: val,
      }).done(
          function (data) {
            setPreload(false);
            SweetAlert({
    					title: 'ההודעה נשלחה בהצלחה',
    					type: 'success',
    					showConfirmButton: false,
    					timer: 4000
    				}).then(function(res) {
    					app.closeAddressPop();
    				}.bind(this)).catch(SweetAlert.noop);
          }.bind(this)
        ).fail(function () {
          console.log("error");
        });
    };
  }

  return(
    <Modal>
      <div className="check-address-main">
		    <div className="popup" id="payPopup">
          <Preload preload={preload} />
		      <div className="popup-wrapper animated zoomIn">
		        <div onClick={app.closeAddressPop} className="close">
		          <img src={globalFileServer + "icons/close-dark.svg"} />
		        </div>
		        <div className="wrapp">
		          <div className="img">
		            <img src={globalFileServer + 'client_logo.jpg'} alt=""/>
		          </div>
		          <pre>
                אנו מתנצלים, עדיין לא מגיעים עד אליכם,
                אבל עוד נהייה! מבטיחים לעדכן! השאירו מייל...
                בינתיים מוזמנים אלינו, אנחנו כאן 7 ימים בשבוע!
              </pre>
							<div className="inputs mail">
								<div className="input auto-complite">
			            <input
                    id="new_mail"
			              type="text"
			              className={mail ? "form-control active" : "form-control"}
			              placeholder=""
                    value={mail}
                    onChange={e => setMail(e.target.value)}
			            />
			            <label htmlFor="new_mail">כתובת מייל</label>
                  <div className="new-button" onClick={sendMail}>
                    <p>שלח</p>
                  </div>
			          </div>
							</div>
		        </div>
		      </div>
		    </div>
		  </div>
    </Modal>
  );
}

export default class CheckAddressPop extends Component {
  state = {
    town: false,
    street: false,
    lat: false,
    lng: false,
    streetNumber: "",
    place: false,
    popup: false
  };
  componentDidMount = () => {
    $("body").addClass("fix");
    $("#root").addClass("blur");
    this.initAPI();
  };
  componentWillUnmount = () => {
    $("body").removeClass("fix");
    $("#root").removeClass("blur");
  };
  initAPI = async() => {
    var input = document.getElementById("autocomplete_search");
    var options = {
      componentRestrictions: { country: "IL" },
      types: ["address"],
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener("place_changed", async() => {
      var place = autocomplete.getPlace();
      this.setState({ place });

      const valAjax = {
        funcName: 'getItems',
        point: 'polygon'
      };
      debugger;
      try {
        let data = await this.props.props.ajax(valAjax);

        let polygons = data.Polygons;
        polygons.map((item) => {
          item.Coord = JSON.parse(item.Coord);
        });
        //  			this.setState({polygons});

        let neib = [];
        let exist = false;

        if (place) {
          let coord = new google.maps.LatLng(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );

          polygons.map((item) => {
            let opts = {
              paths: item.Coord,
              strokeColor: "#ff0000",
              strokeOpacity: 0.8,
              strokeWeight: 3,
              fillColor: "#ff0000",
              fillOpacity: 0.2,
            };
            let newPolygon = new google.maps.Polygon(opts);
            exist = google.maps.geometry.poly.containsLocation(
              coord,
              newPolygon
            );
            exist ? neib.push(item) : null;
          });
          if (neib.length) {
            localStorage.AddressOk = true;
            this.setState({popup: 1});
          } else {
            this.setState({popup: 2});
          }
        }
      } catch(err) {
        console.log('connection error initAPI');
      }


    });
    autocomplete.setComponentRestrictions({ country: ["IL"] });
  };
  render() {
		return (
      <Fragment>
        {!this.state.popup ?
          <div className="check-address-main">
    		    <div className="popup" id="payPopup">
    		      <div className="popup-wrapper animated zoomIn">
    		        <div onClick={this.props.props.closeAddressPop} className="close">
    		          <img src={globalFileServer + "icons/close-dark.svg"} />
    		        </div>
    		        <div className="wrapp">
    		          <div className="img">
    		            <img src={globalFileServer + 'client_logo.jpg'} alt=""/>
    		          </div>
    		          <h3>
    		            <span>רגע לפני שמתחילים</span>
    		            <span>תבדקו אותנו במפה</span>
    		          </h3>
    							<div className="inputs">
    								<div className="input auto-complite">
    			            <input
    			              id="autocomplete_search"
    			              required
    			              pattern=".*\S.*"
    			              name="autocomplete_search"
    			              type="text"
    			              className="form-control"
    			              placeholder=""
    			            />
    			            <label htmlFor="autocomplete_search">רחוב, עיר</label>
    			          </div>
    							</div>
    		        </div>
    		      </div>
    		    </div>
    		  </div>
        :<Fragment>
          {this.state.popup === 1 ? <SuccessDelivery /> : <ErrorDelivery />}
        </Fragment>}
      </Fragment>
		);
  }
}

import React, {Component} from 'react';
import SweetAlert from 'sweetalert2';

let start = false;

export default class PayPopup extends Component {
	constructor(props){
		super(props);
		this.state = {
			date: false,
			time: false,
			error: false
		}
		//this.getTime = this.getTime.bind(this);
		this.recievingMessages = this.recievingMessages.bind(this);
	}
	componentDidMount(){
		$('body').addClass('fix');
		$('#root').addClass('blur');
		//this.getTime();
		window.addEventListener('message', this.recievingMessages, true);
	}
	componentWillUnmount(){
		$('body').removeClass('fix');
		$('#root').removeClass('blur');
		window.removeEventListener('message', this.recievingMessages, true);
	}
	recievingMessages(e){
		if (e.data && e.data.res === 'SuccessVerifon' ) {
debugger;
			//this.props.splitPaymentsPay(e.data.data, false);
		//	this.props.closePayPopup();
    //  this.props.OrderSuccess();
      //e.data.id
			//this.props.reSign();
		}

		if (e.data == 'ErrorVerifon' ) {
      this.props.closePayPopup();
			SweetAlert({
				title: 'העסקה נכשלה',
				text: 'אנא בדקו את פרטי הכרטיס או נסו כרטיס אחר',
				type: 'error',
			}).then(function () {

			}.bind(this)).catch(SweetAlert.noop);
		}
		if (e.data === 'CancelVerifon' ) {
			this.props.closePayPopup();
		}
	}

	render() {
    let total;

    total = Math.abs(this.props.state.finalTotal);
    total = 6;
		return (
			<div className="pay-popup">
				<div className="popup" id="payPopup">
					<div className="popup-wrapper">
						<div className="wrapp">
							<div onClick={this.props.closePayPopup} className="close-popup">
								<img src={globalFileServer + 'icons/close.svg'} alt="" />
							</div>
							<div className="pay-popup-wrapper">
								{/*<iframe
									id='pay_iframe'
									src={
										"https://direct.tranzila.com/hamazon1/iframenew.php?sum=5&currency=1&lang=il&cred_type=1&sum="+ total +"&user_id=" + localStorage.id + "&date=" + this.state.date + "&time=" + this.state.time
									}>
									<p>Your browser does not support iframes.</p>
								</iframe>*/}
                <iframe
                  id='pay_iframe'
                  src={
                    "https://direct.tranzila.com/chefcall/iframenew.php?currency=1&cred_type=1&lang=il&tranmode=AK&buttonLabel="
                    +'בצע תשלום'
                    +"&sum="+ total + this.props.state.orderVal
                  }>
                  <p>Your browser does not support iframes.</p>
                </iframe>
							</div>
						</div>
					</div>//VK
				</div>
			</div>
		);
	}
}

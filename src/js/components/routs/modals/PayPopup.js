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
    this.getItems();

	}
	componentWillUnmount(){
		$('body').removeClass('fix');
		$('#root').removeClass('blur');
		window.removeEventListener('message', this.recievingMessages, true);
	}
	recievingMessages(e){
		if (e.data && e.data.res === 'SuccessVerifon' ) {
		    this.props.closePayPopup();
        this.props.OrderSuccess();
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

  getItems = async() => {
		let orderVal = this.props.state.orderVal;

		let val = {
			funcName: 'generateUrl',
      userId: orderVal.userId,
      Amount: orderVal.sumToPay,
      ordSpecialId: orderVal.ordSpecialId,
      userId: orderVal.userId,
      payerName: orderVal.payerName
		};

    const valAjax = {
      funcName: 'generateUrl',
      point: 'max',
      val: val
    };

    try {
      let data = await this.props.props.ajax(valAjax);

      if(data.updatedCart){
        SweetAlert({
          title: 'שים לב, סל הקניות שלך עודכן',
          text: 'אנא בדוק את השינויים שבוצעו',
          type: 'info',
        }).then(function () {
          location.reload();
        }.bind(this)).catch(SweetAlert.noop);
      }else{
        this.setState({url: data.url});
      }
    } catch(err) {
      console.log('connection error getItems');
    }


	}


  getOrderVal = () => {

		let orderVal = this.props.state.orderVal;

		let val = {
      Amount: orderVal.sumToPay,
      userId: orderVal.userId,
      ordSpecialId: orderVal.ordSpecialId,
      payerName: orderVal.payerName
      //Amount: 1,
		};
		return JSON.stringify(val);
	}

	render() {
    let total;

    total = Math.abs(this.props.state.finalTotal);
    //total = 6;
		return (
			<div className="pay-popup">
				<div className="popup" id="payPopup">
					<div className="popup-wrapper">
						<div className="wrapp">
							<div onClick={this.props.closePayPopup} className="close-popup">
								<img src={globalFileServer + 'icons/close.svg'} alt="" />
							</div>
              <div className="wrapper">
								{this.state.url ?
                  <iframe src={'https://terminal-3.co.il/iframe?val=' + this.getOrderVal()} framborder="0"></iframe>
							 	: null}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

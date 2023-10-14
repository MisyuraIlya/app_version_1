import React, {Component} from 'react';
import SweetAlert from 'sweetalert2';

const Heading = params => {
	return(
		<div className="heading">
			<div className="flex-container">
				<div className="col-lg-6">
					<p>סה"כ לתשלום:</p>
				</div>
				<div className="col-lg-6">
					<p className="price">{params.data.finalTotal}</p>
				</div>
			</div>
		</div>
	);
}

export default class PayPopup extends Component {
	state = {}
	componentDidMount = () => {
		$('body').addClass('fix');
		$('#root').addClass('blur');
		window.addEventListener('message', this.recievingMessages, true);
	}
	componentWillUnmount = () => {
		$('body').removeClass('fix');
		$('#root').removeClass('blur');
		window.removeEventListener('message', this.recievingMessages, true);
	}
	recievingMessages = e => {
		if (e.data && e.data.res === 'SuccessVerifon' ) {
			debugger;
		}
	}
	render() {
		return (
			<div className="pay-popup-max">
				<div className="popup" id="payPopup">
					<div className="popup-wrapper">
						<div className="wrapp">
							<div onClick={this.props.closePayPopup} className="close-popup">
								<img src={globalFileServer + 'icons/close.svg'} alt="" />
							</div>
							<div className="wrapper">
								<Heading data={this.props.state} />
								<div className="cards">
									<div className="cards-wrapper">
										<div className="card-front">
											<div className="wrapp">
												<input
													type="text"
													className="full"
													placeholder="Card number"
													autoComplete="off"
													maxLength="23"
												/>
												<div className="valid flex-container">
													<div className="col-lg-2">
														<input
															type="text"
															className="small"
															placeholder="YY"
															maxLength="2"
														/>
													</div>
													<div className="col-lg-2">
														<p className="separator">/</p>
													</div>
													<div className="col-lg-2">
														<input
															type="text"
															className="small"
															placeholder="MM"
															maxLength="2"
														/>
													</div>
													<div className="col-lg-6">
														<p className="desc">VALID THRU</p>
													</div>
												</div>
												<input
													type="text"
													className="full"
													placeholder="Card Holder"
													autoComplete="off"
													maxLength="30"
												/>
											</div>
										</div>
										<div className="card-back">
											<div className="separator"></div>
											<div className="wrapp">
												<input
													type="text"
													placeholder="CVC"
													maxLength="3"
												/>
												<p>3 digits on the back of the card</p>
											</div>
										</div>
									</div>
								</div>
								<div className="pay">
									<button>בצע תשלום</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

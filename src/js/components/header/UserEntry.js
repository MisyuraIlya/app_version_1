import React, { Component } from 'react';
import SweetAlert from 'sweetalert2';
import moment from 'moment';
import AuthButton from '../../modules/Auth/components/AuthButton'
import { AuthService } from '../../modules/Auth/services/auth.service';
import NewB2bForm from '../../modules/Auth/components/NewB2bForm/NewB2bForm';
import { onErrorAlert, onSuccessAlert } from '../../agents/utils/sweetAlert';

export default class UserEntry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: false,
			hp: "",
			extId: "",
			phone: "",
			email: "",
			name: "",
			pass: "",
			confirmPass: "",
			termsAndConditions: false,
			rememberMe: true,
			mailError: false,
			passError: false,
			forgotPass: false,
			accessToken: "",
			userID: "",
			requestCode: "",
			type: "buyer",
			preload: false,
			moment: moment(),
			registration: false,
			newUserType: "",
			actionToPerform: "",
			b2bconnection: false,
			b2buser: [],
			secretCode: '',
			companyName:'',
			town: '',
			address:''


		}
		this.emptyData = this.emptyData.bind(this);

	}
	componentWillMount() {
		localStorage.logMail ? this.setState({ email: localStorage.logMail }) : null;
		localStorage.logPass ? this.setState({ pass: localStorage.logPass }) : null;
		$('body').addClass('fix');
		$('main, footer, .fixed-menu, .top, .logo, .navigation-container, .copyright').addClass('blur');

		this.setState({ actionToPerform: this.props.action });
		if (this.props.action == "register") {
			this.setState({ newUserType: "b2b" });
		}

		// window.addEventListener('keydown', this.enterListener, true);

	}

	// enterListener = (event) => {
	// 	if (event.keyCode == 13) {
	// 		this.signIn()
	// 	}
	// }

	componentWillUnmount() {
		$('body').removeClass('fix');
		$('main, footer, .fixed-menu, .top, .logo, .navigation-container, .copyright').removeClass('blur');
	}

	restorePass = async () => {
		if (this.state.pass == this.state.confirmPass) {
			let val = { 'UserCod': this.state.requestCode, 'pass': this.state.pass };

			const valAjax = {
				funcName: '',
				point: 'restore_password',
				val: val
			};
			try {
				const data = await this.props.headProps.ajax(valAjax);

				if (data.result == "success") {
					SweetAlert({
						title: 'הסיסמה עודכנה בהצלחה',
						text: '',
						type: 'success',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () {
						this.setState({ forgotPass: false });
					}.bind(this)).catch(SweetAlert.noop);
				}
				if (data.result == "not-found") {
					SweetAlert({
						title: 'קוד האיפוס אינו תקין',
						text: 'אנא נסה שנית',
						type: 'error',
						timer: 3000,
						showConfirmButton: false,
					}).catch(SweetAlert.noop);
				}

			} catch (err) {
				console.log('connection error b2b_registration');
			}


		} else {
			SweetAlert({
				title: 'סיסמה אינה תואמת',
				text: 'אנא נסה שנית',
				type: 'error',
				timer: 3000,
				showConfirmButton: false,
			}).catch(SweetAlert.noop);
		}
	}
	sendPassStatos =(mail, random)=> {
		let val = { 'Random': random, 'Mail': mail, 'SiteUrl': location.origin, 'SiteName': globalSiteName };
		$.ajax({
			url: 'https://statos.co/statos_web_mail/restore_pass_glb.php',
			type: 'POST',
			data: val,
		}).done(function (data) {
		}.bind(this)).fail(function () { console.log("error"); });
	}
	sendPass = async () => {

		let val = {
			'Email': this.state.email, 'siteUrl': entry
		};
		const valAjax = {
			funcName: '',
			point: 'forgot_pass',
			val: val
		};

		try {
			const data = await this.props.headProps.ajax(valAjax);

			if (data.result == "success") {
				if (data.mail) {
					this.sendPassStatos(data.mail, data.random);
					SweetAlert({
						title: 'קוד הבקשה נשלח לכתובת המייל',
						text: 'יש לעבור לתיבת הדואר',
						type: 'success',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () {

						this.setState({ forgotPass: 'stepTwo', pass: "" });
					}.bind(this)).catch(SweetAlert.noop);
				} else {
					SweetAlert({
						title: 'מייל לא קיים',
						text: 'אנא פנה לשירות תמיכה',
						type: 'error',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () {
					}.bind(this)).catch(SweetAlert.noop);
				}
			}
			if (data.result == "not-found") {
				SweetAlert({
					title: 'משתמש לא קיים',
					text: 'אנא נסה שנית',
					type: 'error',
					timer: 3000,
					showConfirmButton: false,
				}).catch(SweetAlert.noop);
			}

		} catch (err) {
			console.log('connection error b2b_registration');
		}




	}
	signIn = async () => {
		debugger
		$('#password').blur();
		let val = {
			userName: this.state.email,
			password: this.state.pass,
			funcName: '',
			point: 'sign_in',
		};

		if (this.state.email != '' && this.state.pass != '') {

			try {
				const data = await this.props.headProps.ajax(val);
				if (data.result == "success") {
					let siteVer = localStorage.siteVer;

					if (data.role == "super_user") {
						localStorage.clear();
						localStorage.setItem('adminId', data.adminId);
						localStorage.setItem('name', data.name);
						localStorage.setItem('role', data.role);
						localStorage.setItem('sessionId', data.sessionId);
						localStorage.setItem('token', data.token);
						localStorage.setItem('logMail', this.state.email);
						localStorage.setItem('logPass', this.state.pass);
					} else if (data.role == "agent") {
						localStorage.clear();
						localStorage.setItem('agent', data.agent);
						localStorage.setItem('agentExId', data.agentExId);
						localStorage.setItem('agentName', data.agentName);
						localStorage.setItem('agentToken', data.agentToken);
						localStorage.setItem('sessionId', data.sessionId);
						localStorage.setItem('logMail', this.state.email);
						localStorage.setItem('logPass', this.state.pass);
					} else {
						let user = JSON.parse(data.user);
						localStorage.setItem('user', data.user);
						localStorage.setItem('sessionId', data.sessionId);
						localStorage.setItem('token', data.token);
						localStorage.setItem('logMail', this.state.email);
						localStorage.setItem('logPass', this.state.pass);
						localStorage.setItem('selectedMode', 1);
					}
					localStorage.siteVer = siteVer;

					location.reload();
				}
				if (data.result == "not-found") {
					SweetAlert({
						title: 'שם משתמש או סיסמה אינם נכונים',
						text: 'אנא נסה שנית או שחזר סיסמה',
						type: 'error',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () { }.bind(this)).catch(SweetAlert.noop);
				}

			} catch (err) {
				console.log('connection error sign in');
			}
		} else {
			SweetAlert({
				title: 'אנא מלא את השדות המבוקשים',
				text: '',
				type: 'error',
				timer: 3000,
				showConfirmButton: false,
			}).then(function () { }.bind(this)).catch(SweetAlert.noop);
		}


	}
	register = async () => {
		let validMail = this.validateEmail(this.state.email);
		if (validMail && this.state.pass == this.state.confirmPass) {
			let date = new Date();
			try {
				this.setState({ preload: true });
				const data = await AuthService.RegisterUser(this.state.b2buser.Id,this.state.email,this.state.phone,this.state.pass,this.state.secretCode)
				if(data.status === 'success'){
					onSuccessAlert(data.message)
					this.signIn();
				} else {
					onErrorAlert(data.message)
				}
			} catch (err) {
				console.log('connection error b2b_registration');
			} finally {
				this.setState({ preload: false });
			}

		} else {
			!validMail ? this.setState({ mailError: true }) : null;
			this.state.pass !== this.state.confirmPass ? this.setState({ passError: true }) : null;
		}
	}
	emptyData() {
		SweetAlert({
			title: 'פרטים חסרים',
			text: 'אנא מלא את כל השדות ואשר את תנאי השימוש',
			type: 'info',
			timer: 4000,
			showConfirmButton: false,
		});
	}
	isANumber(str) {
		if (/^\d+$/.test(str) || str == "") { return true; } else { return false; }
	}
	validateEmail(email) {
		if (email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
			return true;
		} else {
			return false;
		}
	}
	checkB2bConn = async () => {
		if (this.state.extId != '' && this.state.phone != '') {
			this.setState({ preload: true });

			try {
				const data = await AuthService.validationUser(this.state.extId, this.state.phone)
				if(data.status === 'success'){
					this.setState({ b2buser: data.data.user , b2bconnection: true, email: '', pass: '' });
					onSuccessAlert(data.message)
				} else {
					onErrorAlert(data.message)
				}
			} catch (err) {
				console.log('connection error findb2bclient');
			} finally {
				this.setState({  email: '', pass: '' });
				this.setState({ preload: false });
			}
		}




	}

	registerNewClient = async () => {
		if (this.state.companyName != '' && this.state.phone != ''&& this.state.email != '' && this.state.town != '' && this.state.address != '' && this.state.name != '' && this.state.password != '') {
			this.setState({ preload: true });


			try {
				const data = AuthService.registerNewClient(
					this.state.companyName, 
					this.state.phone,
					this.state.email,
					this.state.town,
					this.state.address,
					this.state.name,
					this.state.password
					)
				this.setState({ preload: false });
				debugger;
				if (data.result == "success") {
					SweetAlert({
						title: 'קוד סודי נשלח לנייד',
						text: 'אנא המשיכו בהזנת הנתונים',
						type: 'success',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () { });
					this.setState({ b2buser: data.user, b2bconnection: true, email: '', pass: '' });
				} else if (data.result == "multiple") {
					SweetAlert({
						title: 'נמצאו מספר סניפים לעסק הנ״ל ונדרשת הגדרת מנהל',
						text: 'אנא צרו קשר להקמת משתמש זה',
						type: 'info',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () { });
				} else if (data.result == "registered") {
					SweetAlert({
						title: 'לקוח מחובר. אנא היכנס בתור משתמש קיים.',
						text: 'במידה ואינך זוכר את הסיסמה באפשרותך לשחזרה',
						type: 'info',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () { });
				} else if (data.result == "notFound") {
					SweetAlert({
						title: 'פרטי העסק לא נמצאו',
						text: 'אנא צור קשר',
						type: 'info',
						timer: 3000,
						showConfirmButton: false,
					}).then(function () { });
				}
			} catch (err) {
				//this.props.connectionError('connection error GetSales');
				this.setState({ preload: false });

				console.log('connection error findb2bclient');
			}
		} else {
			SweetAlert({
				title: 'אנא הזן את כל השדות',
				text: '',
				type: 'info',
				timer: 3000,
				showConfirmButton: false,
			}).then(function () { });
		}
	}
	render() {
		let action = this.props.action;
		let lang = this.props.lang;

		return (
			<div className="popup" id="userEntry">
				{this.state.preload ?
					<div className="spinner-wrapper">
						<div className="spinner">
							<div className="bounce1"></div>
							<div className="bounce2"></div>
							<div className="bounce3"></div>
						</div>
					</div>
					: null}
				<div className="popup-wrapper">
					<div className="wrapp">
						<div onClick={() => this.props.close()} className="close-popup">
							<img src={globalFileServer + 'icons/close-dark.svg'} alt="" />
						</div>
						<div className="user-entry-wrapper">
							{this.state.actionToPerform == "" ?
								<div className="action-to-perform">
									<h3>ברוכים הבאים! נא לבחור סוג משתמש</h3>
									<ul>
										<li onClick={() => this.setState({ actionToPerform: "login" })} className={this.state.login ? 'active' : null}><div className='existing-user-btn'>כניסה</div></li>
										<li onClick={() => this.setState({ actionToPerform: "register", newUserType: "b2b" })} className={!this.state.login ? 'active' : null}><div>הרשמה</div></li>
									</ul>
								</div>
								: null}
							{this.state.actionToPerform == "register" && this.state.newUserType == "b2c" ?
								<h3>מלא את הפרטים הבאים</h3>
								: null}
							<div className="user-entry">

								{this.state.actionToPerform == "login" ?
									<div className="login">
										<img className="user_icon" src={globalFileServer + 'user_icon.png'} />
										<h3>{lang == "he" ? "כניסה" : "Log In"}</h3>
										<div className="input-cont">
											<p>{lang == "he" ? "מייל" : "Email"}</p>
											<input type="text" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
										</div>
										<div className="input-cont">
											<p>{lang == "he" ? "סיסמה" : "Password"}</p>
											<input id="password" type="password" onChange={(e) => this.setState({ pass: e.target.value })} value={this.state.pass} />
										</div>

										<div className="actions">
											{this.state.pass && this.state.pass ?
												<div className="send btn-cont">
													{/* <button onClick={() => this.signIn()}>{lang == "he" ? 'כניסה' : "Login"}</button> */}
													<AuthButton isLogin={this.state.login} username={this.state.email} password={this.state.pass}></AuthButton>
												</div>
												:
												<div className="accept btn-cont">
													<button>כניסה</button>
												</div>
											}
										</div>
										<p onClick={() => this.setState({ forgotPass: "stepOne" })} className="forgot-pass">{lang == "he" ? 'שחזר סיסמה' : 'Recover Password'}</p>
										{this.state.forgotPass ?
											<div className="forgot-pass-wrapp">
												<div className="forgot-password">
													<div className="cancel">
														<div onClick={() => this.setState({ forgotPass: false })}>
															<img src={globalFileServer + 'icons/close.svg'} alt="" />
														</div>
													</div>
													{this.state.forgotPass == "stepOne" ?
														<div>
															<h3>{lang == "he" ? "אנא הקלידו את כתובת המייל שלכם" : 'Please fill your Email'}</h3>
															<input type="text" onChange={(e) => this.setState({ email: e.target.value })} placeholder={lang == "he" ? "אימייל" : "Email"} value={this.state.email} />
															<button onClick={this.sendPass}>{lang == "he" ? "שלח" : "Send"}</button>
														</div> : null}
													{this.state.forgotPass == "stepTwo" ?
														<div>
															<h3>{lang == "he" ? "אנא הקלד קוד הבקשה וסיסמה חדשה" : "Fill the secret code"} </h3>
															<input type="text" onChange={(e) => this.setState({ requestCode: e.target.value })} placeholder={lang == "he" ? "קוד הבקשה" : "Secret Pass"} value={this.state.requestCode} />
															<input type="text" onChange={(e) => this.setState({ pass: e.target.value })} placeholder={lang == "he" ? "סיסמה חדשה" : "New Password"} value={this.state.pass} />
															<input type="text" onChange={(e) => this.setState({ confirmPass: e.target.value })} placeholder={lang == "he" ? "אימות סיסמה חדשה" : "Confirm Password"} value={this.state.confirmPass} />
															<button onClick={this.restorePass}>{lang == "he" ? "שלח" : "Send"}</button>
														</div> : null}
												</div>
											</div>
											: null}
										<div className="new-cust-cont">
											<p className="new-cust-title">{lang == "he" ? "טרם נרשמת?" : "Not Signed Up?"}  </p>
											<p onClick={() => this.setState({ actionToPerform: "register", newUserType: "b2b" })} className="new-cust-button">{lang == "he" ? "לחץ כאן להרשמה" : "Press here to Sign Up"}</p>
										</div>
									</div>
									: null}
									
								{this.state.actionToPerform == "register" ?
									<div className="register">
										{this.state.newUserType == "" ?
											<div className="action-to-perform">
												<h3>אנא בחר סוג לקוח</h3>
												<ul>
													<li onClick={() => this.setState({ newUserType: "b2c" })} className={this.state.login ? 'active' : null}><div>לקוח פרטי</div></li>
													<li onClick={() => this.setState({ newUserType: "b2b" })} className={!this.state.login ? 'active' : null}><div>לקוח עסקי</div></li>
												</ul>
											</div>
											: null}

										{!this.state.accessToken && this.state.newUserType == "b2c" ?
											<div>

												<input type="text" onChange={(e) => this.setState({ email: e.target.value })} placeholder="מייל" value={this.state.email} />
												<input type="text" onChange={(e) => this.setState({ name: e.target.value })} placeholder="שם" value={this.state.name} />

												<input type="number"
													onChange={(e) => this.isANumber(e.target.value) ? this.setState({ phone: e.target.value }) : null}
													name="phone" placeholder="טלפון" value={this.state.phone}
												/>

												<input type="password"
													className={this.state.passError ? "error" : null}
													onChange={(e) => this.state.passError ? this.setState({ pass: e.target.value, passError: false }) : this.setState({ pass: e.target.value })}
													name="pass" placeholder="סיסמה" value={this.state.pass}
												/>
												<input type="password"
													className={this.state.passError ? "error" : null}
													onChange={(e) => this.state.passError ? this.setState({ confirmPass: e.target.value, passError: false }) : this.setState({ confirmPass: e.target.value })}
													name="confirmPass" placeholder="אימות סיסמה" value={this.state.confirmPass}
												/>

												<div className="terms-and-conditions">
													<div className="checkboxes-and-radios">
														<input type="checkbox"
															onChange={(e) => this.setState({ termsAndConditions: e.target.checked })}
															name="checkbox-cats" checked={this.state.termsAndConditions}
															id="checkbox-3" value="3" />
														<label htmlFor="checkbox-3"></label>
													</div>
													<span>אנא קרא והסכם <a target="_blank" href={globalFileServer + 'privacy_policy.pdf'}>לתנאי השימוש</a></span>
												</div>
												<div className="actions">
													{this.state.email && this.state.name && this.state.phone && this.state.pass && this.state.confirmPass && this.state.termsAndConditions ?
														<div className="send">
															<button onClick={() => this.register()}>צור חשבון</button>
														</div>
														:
														<div className="accept">
															<button onClick={() => this.emptyData()}>צור חשבון</button>
														</div>
													}
													<div className="cancel">
														<button onClick={() => this.props.close()}>ביטול</button>
													</div>
												</div>
											</div>
											:
											null
										}

										{this.state.newUserType == "b2b" && !this.state.b2bconnection ?
											<div className="connect-b2b-form">
												<img className="user_icon" src={globalFileServer + 'user_icon.png'} />
												<h3>{lang == "he" ? "הרשמה" : "Sign Up"}</h3>

												<div className="input-cont">
													<p>{lang == "he" ? "מס' לקוח פנימי" : "External Id"}</p>
													<input type="text" onChange={(e) => this.setState({ extId: e.target.value })} name="user_name" value={this.state.extId} />
												</div>
												<div className="input-cont">
													<p>{lang == "he" ? "טלפון" : "Phone Number"}</p>
													<input type="text" onChange={(e) => this.setState({ phone: e.target.value })} name="user_name" value={this.state.phone} />
												</div>
												<div className="accept">
													<button onClick={() => this.checkB2bConn()}>{lang == "he" ? "בדיקה" : "Check"}</button>
												</div>
												{/* <div className="accept">
													<button onClick={() => this.setState({ actionToPerform: "register", newUserType: "b2b_new" })}>{lang == "he" ? "לקוח חדש?" : "new client?"}</button>
												</div> */}
											</div>
											: null}

										{this.state.newUserType == "b2b_new" && !this.state.b2bconnection ?
											<NewB2bForm/>
										: null}
										{this.state.newUserType == "b2b" && this.state.b2bconnection ?
											<div className="register-with-facebook">

												<img className="user_icon" src={globalFileServer + 'user_icon.png'} />
												<h3>{this.state.b2buser.Name}</h3>
												<div className="input-cont">
													<p>{lang == "he" ? "כתובת מייל" : "Email"}</p>
													<input type="text" onChange={(e) => this.setState({ email: e.target.value })} name="user_name" value={this.state.email} className={this.state.mailError ? "error" : null} />
												</div>
												<div className="input-cont">
													<p>{lang == "he" ? "קוד סודי" : "secret code"}</p>
													<input
														className={this.state.passError ? "error" : null}
														onChange={(e) => this.state.secretCode ? this.setState({ secretCode: e.target.value, passError: false }) : this.setState({ secretCode: e.target.value })}
														name="pass" value={this.state.secretCode}
													/>
												</div>
												<div className="input-cont">
													<p>{lang == "he" ? "סיסמה" : "Password"}</p>
													<input type="password"
														className={this.state.passError ? "error" : null}
														onChange={(e) => this.state.passError ? this.setState({ pass: e.target.value, passError: false }) : this.setState({ pass: e.target.value })}
														name="pass" value={this.state.pass}
													/>
												</div>
												<div className="input-cont">
													<p>{lang == "he" ? "אימות סיסמה" : "Password Confirmation"}</p>
													<input type="password"
														className={this.state.passError ? "error" : null}
														onChange={(e) => this.state.passError ? this.setState({ confirmPass: e.target.value, passError: false }) : this.setState({ confirmPass: e.target.value })}
														name="confirmPass" value={this.state.confirmPass}
													/>
												</div>
												<div className="terms-and-conditions">
													<div className="checkboxes-and-radios">
														<input type="checkbox"
															onChange={(e) => this.setState({ termsAndConditions: e.target.checked })}
															name="checkbox-cats" checked={this.state.termsAndConditions}
															id="checkbox-3" value="3" />
														<label htmlFor="checkbox-3"></label>
													</div>
													<span>{lang == "he" ? "קראתי ואני מסכים " : "Read and agree to"}<a target="_blank" href={globalFileServer + 'policy_form.pdf'}>{lang == "he" ? " לתנאי השימוש " : "Privacy Policy"}</a></span>
												</div>
												<div className="actions">
													{this.state.email && 
														<div className="send">
															<button onClick={() => this.register()}>{lang == "he" ? 'צור חשבון' : 'Sign Up'}</button>
														</div>

													}
												</div>
											</div>
											: null
										}
									</div>
									: null}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

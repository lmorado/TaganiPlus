import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Wizard, Steps, Step} from 'react-albus'
import { withRouter, Redirect } from 'react-router-dom'
import {
	Col,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
	Alert,
	FormGroup,
	FormText
} from 'reactstrap';
import { doRegister } from '../../actions/register'
import { parseNumber } from '../../utils/helpers'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'

import { StyledContainer, StyledButton, StyledLabel, StyledForm, StyledHeader, StyledPage, RedContainer, TaganiHeader, ParaStyle, ResendButton, BigButton } from './styles'
import ProgressBar from './ProgressBar';

const registerFormattedMessage = {
	firstname: <FormattedMessage id="Accounts.Firstname" defaultMessage="Firstname" />,
	lastname: <FormattedMessage id="Accounts.Lastname" defaultMessage="Lastname" />,
	birthday: <FormattedMessage id="Accounts.Birthday" defaultMessage="Birthday" />,
	gender: <FormattedMessage id="Accounts.Gender" defaultMessage="Gender" />,
	homenumber: <FormattedMessage id="Accounts.HomeNumber" defaultMessage="Home Number" />,
	mobilephone: <FormattedMessage id="Accounts.MobilePhone" defaultMessage="Mobile Phone" />,

	emailaddress: <FormattedMessage id="Accounts.EmailAdress" defaultMessage="Email Adress" />,
	confirmemailaddress: <FormattedMessage id="Accounts.ConfirmEmailAddress" defaultMessage="Confirm Email Address" />,
	password: <FormattedMessage id="Accounts.Password" defaultMessage="Password" />,
	confirmpassword: <FormattedMessage id="Accounts.ConfirmPassword" defaultMessage="Confirm Password" />,

	mailingaddress1: <FormattedMessage id="Accounts.MailingAdress1" defaultMessage="Mailing Adress 1" />,
	mailingaddress2: <FormattedMessage id="Accounts.MailingAdress2" defaultMessage="Mailing Adress 2" />,
	barangay: <FormattedMessage id="Accounts.Barangay" defaultMessage="Barangay" />,
	municipality: <FormattedMessage id="Accounts.Municipality" defaultMessage="City/Municipality" />,
	province: <FormattedMessage id="Accounts.Province" defaultMessage="Province/Region" />,
	postalcode: <FormattedMessage id="Accounts.PostalCode" defaultMessage="ZIP/Postal Code" />,
	country: <FormattedMessage id="Accounts.Country" defaultMessage="Country" />,

	iagree: <FormattedMessage id="Accounts.IAgree" defaultMessage="I have read and accept the Privacy Policy. I also agree with the Terms and Conditions to use this service." />,

	username: <FormattedMessage id="Global.Username" defaultMessage="Username" />,
	register: <FormattedMessage id="Global.Register" defaultMessage="Register" />,
	captcha: <FormattedMessage id="Global.Captcha" defaultMessage="Captcha" />,
	didnotmatch: <FormattedMessage id="Global.DidNotMatch" defaultMessage="did not match" />,
	isrequired: <FormattedMessage id="Global.IsRequired" defaultMessage="is required" />,
	enteremailaddress: <FormattedMessage id="Register.EnterEmailAddress" defaultMessage="Enter your email address" />,
	forgotpassword: <FormattedMessage id="Register.ForgotPassword" defaultMessage="Forgot password?" />,
	signintya: <FormattedMessage id="Register.SignInTYA" defaultMessage="Register a New Account" />,
}


class Register extends Component {

	constructor(props) {

		super(props)

		this.state = {
			firstname: null,
			lastname: null,
			birthday: null,
			gender: null,
			homenumber: null,
			mobilephone: null,

			emailaddress: null,
			confirmemailaddress: null,
			password: null,
			confirmpassword: null,

			mailingaddress1: null,
			mailingaddress2: null,
			barangay: null,
			municipality: null,
			province: null,
			postalcode: null,
			country: null,
			
			iagree: null,

			username: '',
			submitted: false,
			captcha: '',
			captchaRand: Math.floor(1000 + Math.random() * 9000),
			passwordFieldType: 'password',
			isCaptchaDidNotMatch: false,
			captchaReset: false,
			showErrorModal: false,
			isMultipleSession: true,

			percentage:25,

			errors: {
				firstname: '',
				lastname: '',
				birthday: '',
				gender: '',
				homenumber: '',
				mobilephone: '',
				emailaddress: '',
				confirmemailaddress: '',
				password: '',
				confirmpassword: '',
				mailingaddress1: '',
				mailingaddress2: '',
				barangay: '',
				municipality: '',
				province: '',
				postalcode: '',
				country: '',
				iagree: '',
			}
		}
	}

	componentWillReceiveProps(prevProps) {
		if (this.props.hasError !== prevProps.hasError) {
			this.setState({
				captcha: '',
				submitted: false,
				captchaReset: true,
				captchaRand: Math.floor(1001 + Math.random() * 9001),
			})
		}
	}

	componentDidMount() {
		const isUserForcedLogout = getLocalStorage('userForcedLogout')
		const isMultiSession = getLocalStorage('MultiSession')

		if (isMultiSession || isUserForcedLogout) {

			isMultiSession ?
				this.setState({
					isMultipleSession: true,
					showErrorModal: true
				}) :

				this.setState({
					isMultipleSession: false,
					showErrorModal: true
				})
		}
	}


	handleChange = (e) => {
		e.preventDefault();
		const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
		const validDate = RegExp(/^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/i);
		const validNumber = RegExp(/^(\+639\d\d\d\d\d\d\d\d\d)$/i)
		const { name, value} = e.target
		let errors = this.state.errors;

		switch (name) {
			case 'firstname': 
			  errors.firstname = 
				value.length < 2
				  ? 'First Name must be atleast 2 characters long!'
				  : '';
			  break;
			case 'lastname': 
			  errors.lastname = 
				value.length < 2
				  ? 'Last Name must be atleast 2 characters long!'
				  : '';
			  break;
			case 'birthday': 
			  errors.birthday = 
			  	validDate.test(value)
				  ? 'Date is invalid!'
				  : '';
			  break;
			case 'homenumber': 
			  errors.homenumber = 
			  	value.length < 3
				  ? 'Home Number is invalid!'
				  : '';
			  break;
			case 'mobilephone': 
			  errors.mobilephone = 
			  	validNumber.test(value)
				  ? 'Mobile PHone Number is invalid!'
				  : '';
			  break;
			case 'emailaddress': 
			  errors.emailaddress = 
				validEmailRegex.test(value)
				  ? 'Email Address is invalid!'
				  : '';
			  break;
			case 'confirmemailaddress': 
			  errors.confirmemailaddress = 
				validEmailRegex.test(value) && value == this.state.emailaddress
				  ? 'Email Address is invalid!'
				  : '';
			  break;
			case 'password': 
			  errors.password = 
				value.length < 8
				  ? 'Password must be 8 characters long!'
				  : '';
			  break;
			case 'confirmpassword': 
			  errors.confirmpassword = 
				value.length < 8 && value == this.state.password
				  ? 'Password must be 8 characters long!'
				  : '';
			  break;
			default:
			  break;
		  }
		this.setState({ [e.target.name]: e.target.value })
		this.setState({errors, [name]: value}, ()=> {
			console.log(errors)
		})
	}

	toggleMultipleRegisterModal = () => {
		this.setState({ showErrorModal: !this.state.showErrorModal });
		removeLocalStorage('userForcedLogout')
		removeLocalStorage('MultiSession')
	}

	handleValidation(){
		let formIsValid = true;
	}

	handleRegister = (e) => {
		e.preventDefault()
		const { doRegister } = this.props
		this.setState({ submitted: true })

		if(this.handleValidation()){
			doRegister();
			this.setState({
				isCaptchaDidNotMatch: false
			})
		}else{
			this.setState({
				isCaptchaDidNotMatch: true
			})
		}
	}


	togglePassword = e => {
		if (e.target.id === 'passwordEye') {
			this.setState({
				passwordFieldType: this.state.passwordFieldType === 'password' ? 'input' : 'password'
			})
		}
	}

	toggleConfirmPassword = e => {
		if (e.target.id === 'passwordEye') {
			this.setState({
				confirmpasswordFieldType: this.state.confirmpasswordFieldType === 'password' ? 'input' : 'password'
			})
		}
	}

	// for mobile only
	isNumber = (e) => {
		/* allowing backspace(8) and enter(13) */
		if (e.keyCode === 8 || e.keyCode === 13) {
			return true
		} else {
			let reg = new RegExp('[0-9]+$');
			return reg.test(e.key);
		}
	}

	render() {

		const { 
			firstname,
			lastname,
			birthday,
			gender,
			homenumber,
			mobilephone,
		
			emailaddress,
			confirmemailaddress,
			password,
			confirmpassword,
			passwordFieldType, 
			confirmpasswordFieldType, 

			mailingaddress1,
			mailingaddress2,
			barangay,
			municipality,
			province,
			postalcode,
			country,

			submitted,
			iagree,
		} = this.state
		const { message, hasError, loading } = this.props
		if (this.props.userId) {
			return <Redirect to='/security-code' />
		}

		return (
			<IntlProvider locale="en">
			<StyledPage>
			<TaganiHeader></TaganiHeader>
			<RedContainer>
			<Wizard>
				<Steps>
				<Step
					id="first"
					render={({ next }) => (
						<StyledContainer>
							<Col md="4" style={{position:'absolute', right:'250px'}}>
								<ProgressBar percentage={this.state.percentage}/>
							</Col>
							<div style={{ display: 'block', height: '65px', margin: 'auto', paddingBottom: '24px' }}></div>
							<StyledForm>
								<StyledHeader>{registerFormattedMessage.signintya}</StyledHeader>
								<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
								<FormGroup>
									<StyledLabel>{registerFormattedMessage.firstname} :</StyledLabel>
									<InputGroup className={(submitted && !firstname ? ' has-error' : '')}>
										<FormattedMessage id="Accounts.Firstname" defaultMessage="Firstname" >
											{firstnamefm =>
												<Input
													type="text"
													name="firstname"
													isrequired='true'
													onChange={this.handleChange, this.handleValidation}
													placeholder={firstnamefm}
													value={firstname}
													
												 />}
										</FormattedMessage>
									</InputGroup>
									{submitted && !firstname &&
										<FormText className="help-block red-normal">{registerFormattedMessage.firstname} {registerFormattedMessage.isrequired}</FormText>
									}
								</FormGroup>
								<FormGroup>
									<StyledLabel>{registerFormattedMessage.lastname} :</StyledLabel>
									<InputGroup className={(submitted && !lastname ? ' has-error' : '')}>
										<FormattedMessage id="Accounts.Lastname" defaultMessage="Lastname" >
											{lastnamefm =>
												<Input
													type="text"
													name="lastname"
													onChange={this.handleChange}
													placeholder={lastnamefm}
													value={lastname} />}
										</FormattedMessage>
									</InputGroup>
									{submitted && !lastname &&
										<FormText className="help-block red-normal">{registerFormattedMessage.lastname} {registerFormattedMessage.isrequired}</FormText>
									}
								</FormGroup>
								<FormGroup >
									<Row>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.birthday} :</StyledLabel>
											<InputGroup className={(submitted && !birthday ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.Birthday" defaultMessage="Birthday" >
													{birthdayfm =>
														<Input
															type="date"
															name="birthday"
															onChange={this.handleChange}
															placeholder={birthdayfm}
															value={birthday} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !birthday &&
												<FormText className="help-block red-normal">{registerFormattedMessage.birthday} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.gender} :</StyledLabel>
											<InputGroup className={(submitted && !gender ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.Gender" defaultMessage="Gender" >
													{genderfm =>
														<Input
															type="select"
															name="gender"
															onChange={this.handleChange}
															placeholder={genderfm}
															value={gender} 
														>
															<option value="1">Male</option>
															<option value="2">Female</option>
														</Input>
													
													}
												</FormattedMessage>
											</InputGroup>
											{submitted && !gender &&
												<FormText className="help-block red-normal">{registerFormattedMessage.gender} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Row>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.homenumber} :</StyledLabel>
											<InputGroup className={(submitted && !homenumber ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.HomeNumber" defaultMessage="Home Number" >
													{homenumberfm =>
														<Input
															type="number"
															name="homenumber"
															onChange={this.handleChange}
															placeholder={homenumberfm}
															value={homenumber} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !homenumber &&
												<FormText className="help-block red-normal">{registerFormattedMessage.homenumber} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.mobilephone} :</StyledLabel>
											<InputGroup className={(submitted && !mobilephone ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.MobilePhone" defaultMessage="Mobile Phone" >
													{mobilephonefm =>
														<Input
															type="number"
															name="mobilephone"
															onChange={this.handleChange}
															placeholder={mobilephonefm}
															value={mobilephone} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !mobilephone &&
												<FormText className="help-block red-normal">{registerFormattedMessage.mobilephone} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Row>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.emailaddress} :</StyledLabel>
											<InputGroup className={(submitted && !emailaddress ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.EmailAddress" defaultMessage="Email Address" >
													{emailaddressfm =>
														<Input
															type="text"
															name="emailaddress"
															onChange={this.handleChange}
															placeholder={emailaddressfm}
															value={emailaddress} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !emailaddress &&
												<FormText className="help-block red-normal">{registerFormattedMessage.emailaddress} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.confirmemailaddress} :</StyledLabel>
											<InputGroup className={(submitted && !confirmemailaddress ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.ConfirmEmailAddress" defaultMessage="Confirm Email Address" >
													{confirmemailaddressfm =>
														<Input
															type="text"
															name="confirmemailaddress"
															onChange={this.handleChange}
															placeholder={confirmemailaddressfm}
															value={confirmemailaddress} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !confirmemailaddress &&
												<FormText className="help-block red-normal">{registerFormattedMessage.confirmemailaddress} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Row>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.password} :</StyledLabel>
											<InputGroup className={(submitted && !password ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.Password" defaultMessage="Password" >
													{passwordfm =>
														<Input
															type={(passwordFieldType === 'password') ? 'password' : 'text'}
															name="password"
															onChange={this.handleChange}
															value={password}
															placeholder={passwordfm} />
													}
												</FormattedMessage>
				
												<InputGroupAddon addonType="append">
													<InputGroupText>
														<i id="passwordEye" onClick={this.togglePassword} className={`fa ${(passwordFieldType === 'password') ? `fa-eye-slash` : `fa-eye`} fa-lg`}></i>
													</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
											{submitted && !password &&
												<FormText className="help-block red-normal">{registerFormattedMessage.password} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
										<Col>
											<StyledLabel>{registerFormattedMessage.confirmpassword} :</StyledLabel>
											<InputGroup className={(submitted && !confirmpassword ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.ConfirmPassword" defaultMessage="Confirm Password" >
													{confirmpasswordfm =>
														<Input
															type={(confirmpasswordFieldType === 'password') ? 'password' : 'text'}
															name="confirmpassword"
															onChange={this.handleChange}
															value={confirmpassword}
															placeholder={confirmpasswordfm} />
													}
												</FormattedMessage>
												<InputGroupAddon addonType="append">
													<InputGroupText>
														<i id="passwordEye" onClick={this.toggleConfirmPassword} className={`fa ${(confirmpasswordFieldType === 'password') ? `fa-eye-slash` : `fa-eye`} fa-lg`}></i>
													</InputGroupText>
												</InputGroupAddon>
				
											</InputGroup>
											{submitted && !confirmpassword &&
												<FormText className="help-block red-normal">{registerFormattedMessage.confirmpassword} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
									</Row>
								</FormGroup>
								<Row style={{ transition: "all 1s ease-in-out", marginTop: 15}}>
									<Col md="10"></Col>
									<Col md="2">
										<StyledButton
											color="primary"
											style={{ width: "100px" }}
											disabled={loading}
											onClick={next}
										>
											Next
										</StyledButton>
									</Col>
								</Row>
							</StyledForm>
						</StyledContainer>
					)}
				/>
				<Step
					id="second"
					render={({ next }) => (
						<StyledContainer>
							<Col md="4" style={{position:'absolute', right:'250px'}}>
								<ProgressBar percentage={this.state.percentage}/>
							</Col>
							<div style={{ display: 'block', height: '65px', margin: 'auto', paddingBottom: '24px' }}></div>
							<StyledForm onSubmit={this.handleRegister}>
								<FormGroup>
									<StyledLabel>{registerFormattedMessage.mailingaddress1} : (Street Address)</StyledLabel>
									<InputGroup className={(submitted && !mailingaddress1 ? ' has-error' : '')}>
										<FormattedMessage id="Accounts.MailingAddress" defaultMessage="Mailing Address" >
											{mailingaddress1fm =>
												<Input
													type="text"
													name="mailingaddress1"
													onChange={this.handleChange}
													placeholder={mailingaddress1fm}
													value={mailingaddress1} />}
										</FormattedMessage>
									</InputGroup>
									{submitted && !mailingaddress1 &&
										<FormText className="help-block red-normal">{registerFormattedMessage.mailingaddress1} {registerFormattedMessage.isrequired}</FormText>
									}
								</FormGroup>
								<FormGroup>
									<StyledLabel>{registerFormattedMessage.mailingaddress2} : (Apartment, suite, building, floor, village, etc.)</StyledLabel>
									<InputGroup className={(submitted && !mailingaddress2 ? ' has-error' : '')}>
										<FormattedMessage id="Accounts.MailingAddress" defaultMessage="Mailing Address" >
											{mailingaddress2fm =>
												<Input
													type="text"
													name="mailingaddress2"
													onChange={this.handleChange}
													placeholder={mailingaddress2fm}
													value={mailingaddress2} />}
										</FormattedMessage>
									</InputGroup>
									{submitted && !mailingaddress2 &&
										<FormText className="help-block red-normal">{registerFormattedMessage.mailingaddress2} {registerFormattedMessage.isrequired}</FormText>
									}
								</FormGroup>
								<FormGroup>
									<Row>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.province} :</StyledLabel>
											<InputGroup className={(submitted && !province ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.Province" defaultMessage="Province/Region" >
													{provincefm =>
														<Input
															type="select"
															name="province"
															onChange={this.handleChange}
															placeholder={provincefm}
															value={province} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !province &&
												<FormText className="help-block red-normal">{registerFormattedMessage.province} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.municipality} :</StyledLabel>
											<InputGroup className={(submitted && !municipality ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.Municipality" defaultMessage="City/Municipality" >
													{municipalityfm =>
														<Input
															type="select"
															name="municipality"
															onChange={this.handleChange}
															placeholder={municipalityfm}
															value={municipality} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !municipality &&
												<FormText className="help-block red-normal">{registerFormattedMessage.municipality} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Row>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.barangay} :</StyledLabel>
											<InputGroup className={(submitted && !barangay ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.Barangay" defaultMessage="Barangay" >
													{barangayfm =>
														<Input
															type="select"
															name="barangay"
															onChange={this.handleChange}
															placeholder={barangayfm}
															value={barangay} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !barangay &&
												<FormText className="help-block red-normal">{registerFormattedMessage.barangay} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
										<Col md="6">
											<StyledLabel>{registerFormattedMessage.postalcode} :</StyledLabel>
											<InputGroup className={(submitted && !postalcode ? ' has-error' : '')}>
												<FormattedMessage id="Accounts.PostalCode" defaultMessage="ZIP/Postal Code" >
													{postalcodefm =>
														<Input
															type="text"
															name="postalcode"
															onChange={this.handleChange}
															placeholder={postalcodefm}
															value={postalcode} />}
												</FormattedMessage>
											</InputGroup>
											{submitted && !postalcode &&
												<FormText className="help-block red-normal">{registerFormattedMessage.postalcode} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<StyledLabel>{registerFormattedMessage.country} :</StyledLabel>
									<InputGroup className={(submitted && !country ? ' has-error' : '')}>
										<FormattedMessage id="Accounts.Country" defaultMessage="Country" >
											{countryfm =>
												<Input
													type="text"
													name="country"
													onChange={this.handleChange}
													placeholder={countryfm}
													value={country} />}
										</FormattedMessage>
									</InputGroup>
									{submitted && !country &&
										<FormText className="help-block red-normal">{registerFormattedMessage.country} {registerFormattedMessage.isrequired}</FormText>
									}
								</FormGroup>
								{hasError && message &&
									<Alert color="danger">
										{message}
									</Alert>
								}
								<Row style={{ transition: "all 1s ease-in-out", marginTop: 15}}>
									<Col>
										<Input 
											type="checkbox"
											name="iagree"
											onChange={this.handleChange}
											value={iagree}
										/>
										<p>{registerFormattedMessage.iagree}</p>
									</Col>
									<Col>
										<StyledButton
											color="primary"
											style={{ 
												width: "100px"
											}}
											disabled={loading}
											onClick={next}
										>
											{registerFormattedMessage.register}
										</StyledButton>
									</Col>
								</Row>
							</StyledForm>
						</StyledContainer>
					)}
				/>
				<Step
					id="third"
					render={({ next }) => (
						<StyledContainer>
							<Col md="4" style={{position:'absolute', right:'250px'}}>
								<ProgressBar percentage={this.state.percentage+25}/>
							</Col>
							<div style={{ display: 'block', height: '65px', margin: 'auto', paddingBottom: '24px' }}></div>
							<StyledForm>
								<StyledHeader>You're almost there!</StyledHeader>
								<div style={{ display: 'block', height: '50px', margin: 'auto', paddingBottom: '24px' }}></div>
								<Row>
									<ParaStyle>We just need to verify your email address to complete your Tagani PLUS sign-up. The confirmation email has been sent to:<b>{this.state.emailaddress}</b></ParaStyle>
									<ParaStyle>Just click on the link in that email to complete your registration. If you don't see it, you may need to check your spam folder.</ParaStyle>
									<ParaStyle>Still can't find the email? </ParaStyle>
									<ResendButton
										color="primary"
										style={{ width: "100px", float:'center' }}
										disabled={loading}
									>
										Resend Email
									</ResendButton>
								</Row>
								<div style={{ display: 'block', height: '50px', margin: 'auto', paddingBottom: '24px' }}></div>
								<Row style={{ transition: "all 1s ease-in-out", marginTop: 15}}>
									<Col md="10"></Col>
									<Col md="2">
										<StyledButton
											color="primary"
											style={{ width: "100px" }}
											disabled={loading}
											onClick={next}
										>
											Next
										</StyledButton>
									</Col>
								</Row>
							</StyledForm>
						</StyledContainer>
					)}
				/>
				</Steps>
			</Wizard>
			</RedContainer>
			</StyledPage>
			</IntlProvider>
			
		);
	}
}

PropTypes.Register = {
	message: PropTypes.string,
	hasError: PropTypes.bool,
	loading: PropTypes.bool,
	userId: PropTypes.number
}

const mapStateToProps = state => ({
	hasError: state.auth.hasError,
	message: state.auth.message,
	authenticatedOnRegister: state.auth.authenticatedOnRegister,
	loading: state.auth.loading,
	userId: state.auth.userId,
})


const mapDispatchToProps = dispatch => ({
	doRegister: (username, password) => dispatch(doRegister(username, password))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))


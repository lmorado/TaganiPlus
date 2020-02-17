import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StepWizard from 'react-step-wizard'
import {Wizard, Steps, Step} from 'react-albus'
import { withRouter, Link, Redirect } from 'react-router-dom'
import {
	Button,
	Col,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
	Alert,
	FormGroup,
	FormText,
	Modal,
	ModalBody
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
		this.setState({ [e.target.name]: e.target.value })
	}

	toggleMultipleRegisterModal = () => {
		this.setState({ showErrorModal: !this.state.showErrorModal });
		removeLocalStorage('userForcedLogout')
		removeLocalStorage('MultiSession')
	}

	handleRegister = (e) => {
		e.preventDefault()
		const { username, password, captcha, captchaRand } = this.state
		const { doRegister } = this.props

		this.setState({ submitted: true })

		this.setState({
			captchaRand: Math.floor(1000 + Math.random() * 9000)
		})

		if (username && password && captcha && parseNumber(captchaRand) === parseNumber(captcha)) {
			doRegister(username, password);
			this.setState({
				isCaptchaDidNotMatch: false
			})
		}
		else if (!captcha) {
			this.setState({
				captcha: '',
				captchaReset: false,
			})

			if ((username || password)) {
				this.setState({
					captchaReset: false,
					isCaptchaDidNotMatch: false,
				})
			}
		}
		else if (parseNumber(captchaRand) !== parseNumber(captcha)) {
			if (!captcha) {
				this.setState({
					captcha: '',
					isCaptchaDidNotMatch: false,
					captchaReset: true
				})
			} else {
				this.setState({
					captcha: '',
					isCaptchaDidNotMatch: true,
					captchaReset: true
				})
			}
		}
		else {
			this.setState({
				captcha: '',
				captchaReset: true,
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

			mailingaddress1,
			mailingaddress2,
			barangay,
			municipality,
			province,
			postalcode,
			country,

			submitted,
			iagree,
			isMultipleSession,
			SW,
			demo
		} = this.state
		const { message, hasError, loading } = this.props
		if (this.props.userId) {
			return <Redirect to='/security-code' />
		}

		return (
			<IntlProvider locale="en">
			<Wizard>
				<Steps>
				<Step
					id="first"
					render={({ next }) => (
						<StyledPage style={{height:'150vh'}}>
						<TaganiHeader></TaganiHeader>
						<RedContainer>
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
													onChange={this.handleChange}
													placeholder={firstnamefm}
													value={firstname} />}
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
															<option>Male</option>
															<option>Female</option>
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
															type={(passwordFieldType === 'password') ? 'password' : 'text'}
															name="confirmpassword"
															onChange={this.handleChange}
															value={confirmpassword}
															placeholder={confirmpasswordfm} />
													}
												</FormattedMessage>
												<InputGroupAddon addonType="append">
													<InputGroupText>
														<i id="passwordEye" onClick={this.togglePassword} className={`fa ${(passwordFieldType === 'password') ? `fa-eye-slash` : `fa-eye`} fa-lg`}></i>
													</InputGroupText>
												</InputGroupAddon>
				
											</InputGroup>
											{submitted && !confirmpassword &&
												<FormText className="help-block red-normal">{registerFormattedMessage.confirmpassword} {registerFormattedMessage.isrequired}</FormText>
											}
										</Col>
									</Row>
								</FormGroup>
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
															type="text"
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
															type="text"
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
															type="text"
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
											onClick={() => {
												next();
												this.setState({percentage: this.state.percentage+25})
											}}
										>
											{registerFormattedMessage.register}
										</StyledButton>
									</Col>
								</Row>
							</StyledForm>
						</StyledContainer>
						</RedContainer>
						</StyledPage>
					)}
				/>
				<Step
					id="second"
					render={({ next, previous }) => (
						<StyledPage>
						<TaganiHeader></TaganiHeader>
						<RedContainer>
						<StyledContainer>
							<Col md="4" style={{position:'absolute', right:'250px'}}>
								<ProgressBar percentage={this.state.percentage}/>
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
									<Col md="8"></Col>
									<Col md="2">	
										<StyledButton
											color="primary"
											style={{ width: "100px" }}
											disabled={loading}
											onClick={() => {
												previous();
												this.setState({percentage: this.state.percentage-25})
											}}
										>
											Previous
										</StyledButton>
									</Col>
									<Col md="2">
										<StyledButton
											color="primary"
											style={{ width: "100px" }}
											disabled={loading}
											onClick={() => {
												next();
												this.setState({percentage: this.state.percentage+25})
											}}
										>
											Next
										</StyledButton>
									</Col>
								</Row>
							</StyledForm>
						</StyledContainer>
						</RedContainer>
						</StyledPage>

					)}
				/>
				<Step
					id="third"
					render={({ next, previous }) => (
						<StyledPage>
						<TaganiHeader></TaganiHeader>
						<RedContainer>
						<StyledContainer>
							<Col md="4" style={{position:'absolute', right:'250px'}}>
								<ProgressBar percentage={this.state.percentage}/>
							</Col>
							<div style={{ display: 'block', height: '65px', margin: 'auto', paddingBottom: '24px' }}></div>
							<StyledForm onSubmit={this.handleLogin}>
								<StyledHeader>Tagani Support Center</StyledHeader>
								<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
								<Row>
									<Col md="3">
										<img src="https://tagani.ph/wp-content/uploads/2019/12/Group-6-Copy-4.jpg" style={{ width: 150, height: 150, borderRadius:75 }} />
									</Col>
									<Col md="9">
										<StyledHeader style={{color:'#363636'}}>Hi, {this.state.firstname}! My name is Annie.</StyledHeader>
										<ParaStyle style={{padding:'0'}}>I will be your dedicated Tagani Partner. I am here to help you get started and grow your agribusiness through Tagani PLUS! You can ﬁnd my contact details below, so feel free to contact me if you need help.</ParaStyle>
									</Col>
								</Row>
								<Row>
									<Col md="3"></Col>
									<Col md="5">
										<ParaStyle style={{padding:'0'}}><b>Phone:</b> +639176578884 </ParaStyle>
										<ParaStyle style={{padding:'0'}}><b>Landline:</b> +63(02)86324741 </ParaStyle>
										<ParaStyle style={{padding:'0'}}><b>Email:</b> annie@tagani.ph,support@tagani.ph </ParaStyle>
									</Col>
									<Col md="4">
										<ResendButton
											color="primary"
											style={{ width: "100%", height: "50%"}}
											disabled={loading}
										>
											Download
										</ResendButton>
									</Col>
								</Row>
								<Row style={{ transition: "all 1s ease-in-out", marginTop: 15 }}>
									<Col md="8"></Col>
									<Col md="2">
										<StyledButton
											color="primary"
											style={{ width: "100px" }}
											disabled={loading}
											onClick={() => {
												previous();
												this.setState({percentage: this.state.percentage-25})
											}}
										>
											Previous
										</StyledButton>
									</Col>
									<Col md="2">
										<StyledButton
											color="primary"
											style={{ width: "100px" }}
											disabled={loading}
											onClick={() => {
												next();
												this.setState({percentage: this.state.percentage+15})
											}}
										>
											Get Started
										</StyledButton>
									</Col>
								</Row>
							</StyledForm>
						</StyledContainer>
						</RedContainer>
						</StyledPage>
					)}
				/>
				<Step
					id="fourth"
					render={({ previous }) => (
						<StyledPage>
						<TaganiHeader></TaganiHeader>
						<RedContainer>
						<StyledContainer>
							<Col md="4" style={{position:'absolute', right:'250px'}}>
								<ProgressBar percentage={this.state.percentage}/>
							</Col>
							<div style={{ display: 'block', height: '65px', margin: 'auto', paddingBottom: '24px' }}></div>
							<StyledForm onSubmit={this.handleLogin}>
								<StyledHeader>Welcome to Tagani, {this.state.firstname}! </StyledHeader>
								<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
								<ParaStyle style={{padding:'0'}}>In order to access more Tagani PLUS features, you need to accomplish the following assessments. <b>Annie</b>, your dedicated Tagani Partner, will be in contact with you to guide you in the process.</ParaStyle>
								<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
								<Row>
								<Col md="4">
									<BigButton>
										<i className="fa fa-user-o fa-5x"></i>
										<h4>Entrepreneurial Profile</h4>
									</BigButton>
								</Col>
								<Col md="4">
									<BigButton>
										<i className="fa fa-map-marker fa-5x"></i>
										<h4>Site Profile</h4>
									</BigButton>
								</Col>
								<Col md="4">
									<BigButton>
										<i className="fa fa-search fa-5x"></i>
										<h4>Site Audit</h4>
									</BigButton>
								</Col>
								</Row>
								<Row style={{ transition: "all 1s ease-in-out", marginTop: 15 }}>
									<Col md="10"></Col>
									<Col md="2">
										<StyledButton
											color="primary"
											style={{ width: "100px" }}
											disabled={loading}
											onClick={() => {
												previous();
												this.setState({percentage: this.state.percentage-15})
											}}
										>
											Back
										</StyledButton>
									</Col>
								</Row>
							</StyledForm>
						</StyledContainer>
						</RedContainer>
						</StyledPage>
					)}
				/>
				</Steps>
			</Wizard>
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


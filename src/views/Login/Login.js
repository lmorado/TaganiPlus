import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
import { doLogin } from '../../actions/auth'
import { parseNumber } from '../../utils/helpers'
<<<<<<< HEAD
import { FormattedMessage, IntlProvider } from 'react-intl'
=======
import { FormattedMessage } from 'react-intl'
>>>>>>> feature/tag-01/equipment
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage'

import { StyledContainer, StyledButton, StyledLabel, StyledForm, StyledHeader, StyledSubheade, StyledPage, RedContainer } from './styles'

const loginFormattedMessage = {
	username: <FormattedMessage id="Accounts.Username" defaultMessage="Username" />,
	password: <FormattedMessage id="Global.Password" defaultMessage="Password" />,
	login: <FormattedMessage id="Global.Login" defaultMessage="Login" />,
	captcha: <FormattedMessage id="Global.Captcha" defaultMessage="Captcha" />,
	didnotmatch: <FormattedMessage id="Global.DidNotMatch" defaultMessage="did not match" />,
	isrequired: <FormattedMessage id="Global.IsRequired" defaultMessage="is required" />,
	enteremailaddress: <FormattedMessage id="Login.EnterEmailAddress" defaultMessage="Enter your email address" />,
	forgotpassword: <FormattedMessage id="Login.ForgotPassword" defaultMessage="Forgot password?" />,
	signintya: <FormattedMessage id="Login.SignInTYA" defaultMessage="Sign In to your account" />,
}


class Login extends Component {

	constructor(props) {

		super(props)

		this.state = {
			username: '',
			password: '',
			submitted: false,
			captcha: '',
			captchaRand: Math.floor(1000 + Math.random() * 9000),
			passwordFieldType: 'password',
			isCaptchaDidNotMatch: false,
			captchaReset: false,
			showErrorModal: false,
			isMultipleSession: true,
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

	toggleMultipleLoginModal = () => {
		this.setState({ showErrorModal: !this.state.showErrorModal });
		removeLocalStorage('userForcedLogout')
		removeLocalStorage('MultiSession')
	}

	handleLogin = (e) => {
		e.preventDefault()
		const { username, password, captcha, captchaRand } = this.state
		const { doLogin } = this.props

		this.setState({ submitted: true })

		this.setState({
			captchaRand: Math.floor(1000 + Math.random() * 9000)
		})

		if (username && password && captcha && parseNumber(captchaRand) === parseNumber(captcha)) {
			doLogin(username, password);
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

		const { username, password, submitted, captcha, captchaRand, passwordFieldType, isCaptchaDidNotMatch, captchaReset, isMultipleSession } = this.state
		const { message, hasError, loading } = this.props
		if (this.props.userId) {
			return <Redirect to='/security-code' />
		}

		return (
<<<<<<< HEAD
			<IntlProvider locale="en">
=======
>>>>>>> feature/tag-01/equipment
			<StyledPage>
				<RedContainer>
					<StyledContainer>
						<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
						<StyledForm onSubmit={this.handleLogin}>
							<h1>{loginFormattedMessage.login}</h1>
							<p className="text-muted">{loginFormattedMessage.signintya}</p>
							<FormGroup>
								<StyledLabel>{loginFormattedMessage.username}</StyledLabel>
								<InputGroup className={(submitted && !username ? ' has-error' : '')}>
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="icon-user"></i>
										</InputGroupText>
									</InputGroupAddon>

									<FormattedMessage id="Accounts.Username" defaultMessage="Username" >
										{usernamefm =>
											<Input
												type="text"
												name="username"
												onChange={this.handleChange}
												placeholder={usernamefm}
												value={username} />}
									</FormattedMessage>

								</InputGroup>
								{submitted && !username &&
									<FormText className="help-block red-normal">{loginFormattedMessage.username} {loginFormattedMessage.isrequired}</FormText>
								}
							</FormGroup>

							<FormGroup>
								<StyledLabel>{loginFormattedMessage.password}</StyledLabel>
								<InputGroup className={(submitted && !password ? ' has-error' : '')}>

									<FormattedMessage id="Global.Password" defaultMessage="Password" >
										{pwd =>
											<Input
												type={(passwordFieldType === 'password') ? 'password' : 'text'}
												name="password"
												onChange={this.handleChange}
												value={password}
												placeholder={pwd} />
										}
									</FormattedMessage>

									<InputGroupAddon addonType="append">
										<InputGroupText>
											<i id="passwordEye" onClick={this.togglePassword} className={`fa ${(passwordFieldType === 'password') ? `fa-eye-slash` : `fa-eye`} fa-lg`}></i>
										</InputGroupText>
									</InputGroupAddon>

								</InputGroup>
								{submitted && !password &&
									<FormText className="help-block red-normal">{loginFormattedMessage.password} {loginFormattedMessage.isrequired}</FormText>
								}
							</FormGroup>

							<FormGroup>
								<StyledLabel>{loginFormattedMessage.captcha}</StyledLabel>
								<Row>
									<Col md="6">

										<InputGroup className={((!isCaptchaDidNotMatch && submitted && !captcha && !captchaReset) || (isCaptchaDidNotMatch && submitted && parseNumber(captchaRand) !== parseNumber(captcha)) ? ' has-error' : '')} style={{ marginBottom: 16 }}>
											<FormattedMessage id="Global.Captcha" defaultMessage="Captcha" >
												{captchaPlaceholder =>
													<Input
														name="captcha"
														onChange={this.handleChange}
														type='number'
														onKeyDown={e => !this.isNumber(e) && e.preventDefault()}
														value={captcha}
														placeholder={captchaPlaceholder} />
												}
											</FormattedMessage>

										</InputGroup>
										{!isCaptchaDidNotMatch && submitted && !captcha &&
											<span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{loginFormattedMessage.captcha} {loginFormattedMessage.isrequired}</span>
										}

										{isCaptchaDidNotMatch && submitted && parseNumber(captchaRand) !== parseNumber(captcha) &&
											<span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>Captcha did not match</span>
										}

									</Col>

									<Col md="6">
										<InputGroup style={{ marginBottom: 16 }}>
											<Input
												className="align-center"
												type="text"
												onChange={this.handleChange}
												value={captchaRand}
												disabled />
										</InputGroup>
									</Col>
								</Row>
							</FormGroup>

							{hasError && message &&
								<Alert color="danger">
									{message}
								</Alert>
							}

							<Row style={{ transition: "all 1s ease-in-out", marginTop: 15 }}>
								<Col xs="6">
									{/* <Link to="/password-reset">
										<span className="px-0" style={{ display: 'block', paddingTop: 5 }}>{loginFormattedMessage.forgotpassword}</span>
									</Link> */}
									&nbsp;
								</Col>
								<Col xs="6" className="text-right">
									<Button
										color="primary"
										style={{ width: "100px" }}
										disabled={loading}
									>
										{loginFormattedMessage.login}
									</Button>
								</Col>
							</Row>
						</StyledForm>


						<Modal className='modal-dialog modal-dialog-centered' isOpen={this.state.showErrorModal} toggle={this.toggleMultipleLoginModal}>
							<ModalBody className="red-modal">
								<div>
									<div style={{ display: 'flex', justifyContent: 'center' }}>
										<div>
											<label style={{ fontSize: "16px", fontFamily: 'Arial', fontWeight: "bold", marginLeft: "5px", marginTop: "15px" }}>
												{isMultipleSession ?
													<FormattedMessage id="Logout.MultiLogin" defaultMessage="Multiple Login." />
													: <FormattedMessage id="Logout.SessionExpiredPrompt" defaultMessage="Session Expired." />}
											</label>
										</div>
									</div>
									<div style={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>
										<label style={{ fontSize: "14px", fontFamily: 'Arial', textAlign: "center" }}>
											{isMultipleSession ?
												<FormattedMessage id="Logout.MultiSession" defaultMessage="Another session logged in. This session has been logged out." />
												: <FormattedMessage id="Logout.SessionExpired" defaultMessage="Your session has expired. Please login." />}
										</label>
									</div>
									<div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
										<div>
											<Button className='modal-button-responsiveness confirm-yellow-button' onClick={this.toggleMultipleLoginModal}> OK </Button>
										</div>
									</div>
								</div>
							</ModalBody>
						</Modal>

					</StyledContainer>
				</RedContainer>
			</StyledPage>
<<<<<<< HEAD
			</IntlProvider>
=======
>>>>>>> feature/tag-01/equipment
		);
	}
}

PropTypes.Login = {
	message: PropTypes.string,
	hasError: PropTypes.bool,
	loading: PropTypes.bool,
	userId: PropTypes.number
}

const mapStateToProps = state => ({
	hasError: state.auth.hasError,
	message: state.auth.message,
	authenticatedOnLogin: state.auth.authenticatedOnLogin,
	loading: state.auth.loading,
	userId: state.auth.userId,
})


const mapDispatchToProps = dispatch => ({
	doLogin: (username, password) => dispatch(doLogin(username, password))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
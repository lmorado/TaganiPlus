import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardGroup,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
	Alert
} from 'reactstrap';
import { connect } from 'react-redux'
import { doValidatePin, doCreatePin } from '../../actions/securityCode'
import { FormattedMessage } from 'react-intl'

const securityCodeFormattedMessage = {
	onetimepin: <FormattedMessage id="Login.OneTimePin" defaultMessage="One Time Pin" />,
	proceed: <FormattedMessage id="Login.Proceed" defaultMessage="Proceed" />,
	securitycodeinstruction: <FormattedMessage id="Login.SecurityCodeInstruction" defaultMessage="Please enter security code that we've sent to your email/text message" />,
	entersecuritycode: <FormattedMessage id="Login.EnterSecurityCode" defaultMessage="Enter security code" />,
	pleasewait: <FormattedMessage id="Global.PleaseWait" defaultMessage="Please Wait..." />,
	securitycode: <FormattedMessage id="Login.SecurityCode" defaultMessage="Security code" />,
	didnotmatch: <FormattedMessage id="Global.DidNotMatch" defaultMessage="did not match" />,
	isrequired: <FormattedMessage id="Global.IsRequired" defaultMessage="is required" />,
	confirmsecuritycode: <FormattedMessage id="Login.ConfirmSecurityCode" defaultMessage="Confirm security code" />,
	seccodepwinstruction: <FormattedMessage id="Login.SecCodePwInstruction" defaultMessage="The input value must be between 6-8 characters" />,
	createotp: <FormattedMessage id="Login.CreateOTP" defaultMessage="Please Create One Time Pin" />,
	otpinstruction: <FormattedMessage id="Login.OTPinstruction" defaultMessage="Please create a security code to keep your account secure" />
}

class SecurityCode extends Component {

	componentWillReceiveProps(prevProps) {
		if (this.props.hasError !== prevProps.hasError) {
			this.setState({ securityCode: '', securityCode2: '', submitted: false })
		}
	}

	state = {
		securityCode: '',
		securityCode2: '',
		submitted: false,
	}

	handleChange = (e) => {
		if (e.target.name === 'securityCode' || e.target.name === 'securityCode2') {
			let regex = new RegExp('^[0-9]*$');
			if (regex.test(e.target.value)) {
				this.setState({
					[e.target.name]: e.target.value,
				})
			}
		} else {
			this.setState({
				[e.target.name]: e.target.value
			})
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { securityCode, securityCode2 } = this.state
		this.setState({ submitted: true })
		if (securityCode && securityCode2 && securityCode === securityCode2) {
			this.props.dispatch(doCreatePin(securityCode))
		}
		else if (securityCode) {
			this.props.dispatch(doValidatePin(securityCode))
		}
	}

	render() {
		const { securityCode, submitted, securityCode2 } = this.state
		const { hasError, message, loading } = this.props
		const isFirstTimeLogin = localStorage.getItem('isFirstTimeLogin');
		const currentUserId = localStorage.getItem('userId');
		const userToken = localStorage.getItem('userToken');

		if (!this.props.userId) {
			return <Redirect to='/login' />
		}

		if (!currentUserId && userToken) {
			window.location.reload();
		}

		if (!currentUserId && !userToken) {
			window.location.reload();
		}

		if (loading) {
			return <div>{securityCodeFormattedMessage.pleasewait}</div>
		}


		const securityLength = JSON.parse(isFirstTimeLogin) ? (securityCode.length < 6 || securityCode.length > 8 || !(securityCode === securityCode2)) ? true : false : (securityCode.length < 6 || securityCode.length > 8) ? true : false

		return (
			<div className="app flex-row align-items-center">
				<Container>
					<Row className="justify-content-center">
						<Col md="6">
							<CardGroup>
								<Card className="p-4">
									<CardBody>

										{JSON.parse(isFirstTimeLogin) ? <Form onSubmit={this.handleSubmit}>
											<h1> {securityCodeFormattedMessage.createotp}</h1>
											<p className="text-muted">{securityCodeFormattedMessage.otpinstruction}</p>
											<InputGroup className={(submitted && !securityCode ? ' has-error' : '123')} style={{ marginBottom: 16 }}>
												<InputGroupAddon addonType="prepend">
													<InputGroupText><i className="fa fa-lock"></i></InputGroupText>
												</InputGroupAddon>
												<FormattedMessage id="Login.EnterSecurityCode" defaultMessage="Enter security code">
													{placeholder =>
														<Input
															id="securityCode"
															name="securityCode"
															placeholder={placeholder}
															onChange={this.handleChange}
															value={securityCode} />
													}
												</FormattedMessage>
											</InputGroup>
											<InputGroup className={(submitted && !securityCode ? ' has-error' : '123')} style={{ marginBottom: 16 }}>
												<InputGroupAddon addonType="prepend">
													<InputGroupText><i className="fa fa-lock"></i></InputGroupText>
												</InputGroupAddon>
												<FormattedMessage id="Login.ConfirmSecurityCode" defaultMessage="Confirm security code">
													{placeholder =>
														<Input
															id="securityCode2"
															name="securityCode2"
															placeholder={placeholder}
															onChange={this.handleChange}
															value={securityCode2} />
													}
												</FormattedMessage>

											</InputGroup>

											{submitted && !securityCode &&
												<span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{securityCodeFormattedMessage.securitycode} {securityCodeFormattedMessage.isrequired}</span>
											}
											{securityCode && (securityCode.length > 8 || securityCode.length < 6) &&
												<span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{securityCodeFormattedMessage.seccodepwinstruction}</span>
											}
											{securityCode && securityCode2 && securityCode !== securityCode2 && !(securityCode.length > 8 || securityCode.length < 6) &&
												<span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{securityCodeFormattedMessage.securitycode} {securityCodeFormattedMessage.didnotmatch}</span>
											}

											{hasError && message &&
												<Alert color="danger">
													{message}
												</Alert>
											}

											<Row style={{ transition: "all 1s ease-in-out", marginTop: 15 }}>
												<Col xs="6">
													<Button
														color="success"
														onClick={(this.Submit)}
														disabled={securityLength} >
														{securityCodeFormattedMessage.proceed}
													</Button>
												</Col>
											</Row>
										</Form> :

											<Form onSubmit={this.handleSubmit}>
												<h1>{securityCodeFormattedMessage.onetimepin}</h1>
												<InputGroup className={(submitted && !securityCode ? ' has-error' : '123')} style={{ marginBottom: 16 }}>
													<InputGroupAddon addonType="prepend">
														<InputGroupText><i className="fa fa-lock"></i></InputGroupText>
													</InputGroupAddon>
													<FormattedMessage id="Login.EnterSecurityCode" defaultMessage="Enter security code">
														{placeholder =>
															<Input
																id="securityCode"
																name="securityCode"
																placeholder={placeholder}
																onChange={this.handleChange}
																value={securityCode} />
														}
													</FormattedMessage>
												</InputGroup>

												{submitted && !securityCode &&
													<span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{securityCodeFormattedMessage.securitycode} {securityCodeFormattedMessage.isrequired}</span>
												}
												{securityCode && (securityCode.length > 8 || securityCode.length < 6) &&
													<span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{securityCodeFormattedMessage.seccodepwinstruction}</span>
												}
												{hasError && message &&
													<Alert color="danger">
														{message}
													</Alert>
												}

												<Row style={{ transition: "all 1s ease-in-out", marginTop: 15 }}>
													<Col xs="6">
														<Button
															color="success"
															onClick={this.Submit}
															disabled={securityLength} >
															{securityCodeFormattedMessage.proceed}
														</Button>
													</Col>
												</Row>
											</Form>
										}
									</CardBody>
								</Card>
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	message: state.securityCode.message,
	loading: state.securityCode.loading,
	hasError: state.securityCode.hasError,
	userId: state.auth.userId,
})

PropTypes.SecurityCode = {
	hasError: PropTypes.bool,
	message: PropTypes.string,
	loading: PropTypes.bool
}

export default withRouter(connect(mapStateToProps)(SecurityCode))


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Button, Alert } from 'reactstrap'
import InputText from '../../../components/InputText'
import InputPassword from '../../../components/InputPassword'
import { formatCurrency, usernameRegex } from '../../../utils/helpers'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { FormattedMessage } from 'react-intl'
import { getCopyUserDetails } from '../../../actions/members/copyUserAction'
import { usernameIsRequired, creditsShouldNotExceed, passwordMinimum, passwordIsRequired, creditIsRequired, maxCredit } from '../../../utils/actionsTranslation'


class CopyUser extends Component {

	static propTypes = {
		loading: PropTypes.bool,
		error: PropTypes.bool,
		errorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
		data: PropTypes.object,
		userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		agentUsername: PropTypes.object,
		addLoading: PropTypes.bool,
		addError: PropTypes.bool,
		addErrorMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
		copyUserSubmitted: PropTypes.bool,
	}

	componentDidMount() {
		this.props.getCopyUserDetails(this.props.userId)
	}

	renderError = (field, limitValue) => {

		const {
			copy_username, copy_password, copy_credit, copy_name, copy_telephone,
			copyUserSubmitted, isPaymentModeCash, ut
		} = this.props

		let result = ''

		let phoneRegex = new RegExp('^((([0-9]+))|([0-9]+))[-\s\.]?[0-9]+[-\s\.]?[0-9]+$');

		switch (field) {
			case 'copy_credit':
				if ((copyUserSubmitted && !copy_credit && !isPaymentModeCash) || (copyUserSubmitted && !copy_credit && isPaymentModeCash && ut === 'Agent')) {
					result = creditIsRequired()
				} else if ((copy_credit > limitValue && !isPaymentModeCash) || (copy_credit > limitValue && isPaymentModeCash && ut === 'Agent')) {
					result = `${creditsShouldNotExceed()} ${formatCurrency(limitValue)}`
				}
				break
			case 'copy_username':
				if (copyUserSubmitted && !copy_username) {
					result = usernameIsRequired()
				} else if (copyUserSubmitted && !usernameRegex.test(copy_username)) {
					result = "Please use only letters (a-z), numbers (0-9), and special characters dash (-) and underscore (_)"
				}
				else if (copyUserSubmitted && copy_username.length > 15) {
					result = "Username must not be over 15 characters"
				}
				break
			case "copy_password":
				if (copyUserSubmitted && !copy_password) {
					result = passwordIsRequired()
				} else if (copyUserSubmitted && copy_password.length < 8) {
					result = passwordMinimum()
				}
				break
			case 'copy_name': result = (copyUserSubmitted && !copy_name) ? "Name is required" : null; break
			case 'copy_telephone':
				if (copyUserSubmitted && copy_telephone && !phoneRegex.test(copy_telephone)) {
					result = "Telephone number is invalid"
				}
				if (copyUserSubmitted && copy_telephone && copy_telephone.length < 7) {
					result = "Telephone must be at least 7 characters"
				}
				else if (copyUserSubmitted && copy_telephone && copy_telephone.length > 15)
					result = "Telephone must not be over 15 characters"
				break
			default: return null
		}
		return result
	}


	componentDidUpdate(prevProps) {
		if (prevProps.data !== this.props.data) {
			if (this.props.data) {
				this.props.updateCopyUserName(this.props.data.username)
			}
		}
	}

	render() {
		const {
			handleChange, addLoading, addError, addErrorMsg,
			loading, error, errorMsg, data, agentUsername, handleSubmit, clearValue, userId,
			copy_username, copy_password, copy_credit, copy_name, copy_telephone, copyUserSubmitted, userType,
			userTypeId,
			isPaymentModeCash,
			ut
		} = this.props

		const copyUsername = (agentUsername) ? userTypeId === 20 ? agentUsername.mainAccount : agentUsername.username : null


		if (loading || addLoading) return <p>{formattedMessages.pleasewait}</p>
		if (error) return <Alert color="danger">{errorMsg}</Alert>

		return (
			<div>

				{addError && <Alert color="danger">{addErrorMsg.statusName}</Alert>}

				<form onSubmit={handleSubmit}>
					<Row style={{ marginBottom: 10 }}>
						<Col md='12'>
							<input type="hidden" name="copyUserId" value={(userId) ? userId : 0} />
							<input type="hidden" name="premadeUsername" value={copyUsername} />
							<FormattedMessage id="Accounts.Username" defaultMessage="Username" >
								{usernamefm =>
									<InputText
										name="copy_username"
										labelName={usernamefm}
										defValue={(copy_username && copyUserSubmitted) ? copy_username : copy_username}
										placeholder={usernamefm}
										prependText={copyUsername}
										handleChange={handleChange}
										className={(this.renderError('copy_username', copyUsername) ? 'error' : '')}
										error={this.renderError('copy_username', copyUsername)}
									/>}
							</FormattedMessage>
						</Col>
					</Row>
					<Row style={{ marginBottom: 10 }}>
						<Col md='12'>
							<InputPassword
								name="copy_password"
								labelName={formattedMessages.password}
								placeholder='Password'
								appendClass={true}
								handleChange={handleChange}
								defValue={copy_password}
								className={(this.renderError('copy_password') ? 'error' : '')}
								error={this.renderError('copy_password')}
							/>
						</Col>
					</Row>
					{!isPaymentModeCash || (isPaymentModeCash && ut === "Agent") ? <Row style={{ marginBottom: 10 }}>
						<Col md='12'>
							<FormattedMessage id="Global.Credit" defaultMessage="Credit" >
								{creditfm =>
									<InputText
										type="number"
										name="copy_credit"
										labelName={creditfm}
										defValue={copy_credit}
										placeholder={creditfm}
										prependClass="fa fa-money fa-lg"
										handleChange={handleChange}
										hint={`${maxCredit()} = ${formatCurrency(data.maxCredit)}`}
										className={(this.renderError('copy_credit', data.maxCredit) ? 'error' : '')}
										error={this.renderError('copy_credit', data.maxCredit)}
									/>}</FormattedMessage>
						</Col>
					</Row> : null}
					<Row style={{ marginBottom: 10 }}>
						<Col md='12'>
							<FormattedMessage id="Global.Name" defaultMessage="Name" >
								{namefm =>
									<InputText
										name="copy_name"
										labelName={namefm}
										defValue={copy_name}
										placeholder={namefm}
										prependClass="fa fa-user-o fa-lg"
										handleChange={handleChange}
										className={(this.renderError('copy_name') ? 'error' : '')}
										error={this.renderError('copy_name')}
									/>}</FormattedMessage>
						</Col>
					</Row>
					<Row style={{ marginBottom: 10 }}>
						<Col md='12'>
							<FormattedMessage id="Global.Telephone" defaultMessage="Telephone" >
								{telephoneFM =>
									<InputText
										name="copy_telephone"
										labelName={telephoneFM}
										defValue={copy_telephone}
										placeholder={telephoneFM}
										prependClass="fa fa-phone fa-lg"
										handleChange={handleChange}
										className={(this.renderError('copy_telephone') ? 'error' : '')}
										error={this.renderError('copy_telephone')}
									/>}</FormattedMessage>
						</Col>
					</Row>
					<Row style={{ marginBottom: 10 }}>
						<Col md='12'>
							<div className="align-right">
								<Button color="secondary"
									style={{ marginRight: 10 }}
									onClick={clearValue}>
									{formattedMessages.close}
								</Button>

								<Button color="success" disabled={loading}>{formattedMessages.save}</Button>
							</div>
						</Col>
					</Row>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loading: state.getCopyUser.loading,
	error: state.getCopyUser.error,
	errorMsg: state.getCopyUser.errorMsg,
	data: state.getCopyUser.data,
	userId: (state.modal.modalProps.userInfo !== 0) ? state.modal.modalProps.userInfo : 0,
	agentUsername: state.securityCode.user,
	addLoading: state.addCopyUser.loading,
	addError: state.addCopyUser.error,
	addErrorMsg: state.addCopyUser.errorMsg,
	userType: (state.modal.modalProps.title) ? state.modal.modalProps.title : '',
	userTypeId: state.securityCode.user.userTypeId
})

const mapDispatchToProps = dispatch => ({
	getCopyUserDetails: (userId) => dispatch(getCopyUserDetails(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CopyUser)

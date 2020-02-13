import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
import InputText from '../../components/InputText'
import InputPassword from '../../components/InputPassword'
import { formatCurrency, phoneRegex, emailRegex, usernameRegex, nameRegex } from '../../utils/helpers'
import styled from 'styled-components'
import { passwordFM, PasswordInstruction, cashFM } from './translation'
import { FormattedMessage } from 'react-intl'
import {
    maxCredit, usernameIsRequired, passwordIsRequired, nameIsRequired,
    creditIsRequired, passwordMinimum, creditsShouldNotExceed
} from '../../utils/actionsTranslation'
const Label = styled.label`
    display: inline-block;
    margin-bottom: 0.5rem;
    min-height: 15px;
    margin-top:1px;
`
class AddMemberInformation extends Component {

    renderError = (field) => {
        const { securityCode, credit, password, name, telephone, username, isSubmitted, userMaxCredit, creditDisabled, email, chatName } = this.props
        let result = ''

        switch (field) {
            case "username":
                if (isSubmitted && !username) {
                    result = usernameIsRequired()
                }
                else if (isSubmitted && !usernameRegex.test(username)) {
                    result = "Please use only letters (a-z), numbers (0-9), and special characters dash (-) and underscore (_)"
                } else if (isSubmitted && username.length > 15) {
                    result = "Username must not be over 15 characters"
                }
                break
            case "password":
                if (isSubmitted && !password) {
                    result = passwordIsRequired()
                } else if (isSubmitted && password.length < 8) {
                    result = passwordMinimum()
                }
                break
            case "securityCode":
                if (isSubmitted && !securityCode) {
                    result = "Security code is required"
                } else if (isSubmitted && securityCode.length < 6) {
                    result = "Security code must be at least 6 digits"
                } else if (isSubmitted && securityCode.length > 8) {
                    result = "Security code must not be greater than 8 digits"
                }
                break
            case "credit":
                if (isSubmitted && !credit && !creditDisabled) {
                    result = creditIsRequired()
                }
                else if (credit >= 100000000 && !creditDisabled) {
                    result = `${creditsShouldNotExceed()} ${formatCurrency(userMaxCredit < 100000000 ? userMaxCredit : 100000000)}`
                }
                else if (credit > userMaxCredit && !creditDisabled) {
                    result = `${creditsShouldNotExceed()} ${formatCurrency(userMaxCredit)}`
                }
                break
            case "name":
                if (isSubmitted && !name) {
                    result = nameIsRequired()
                }
                else if (isSubmitted && !nameRegex.test(name)) {
                    result = "Please use only letters (a-z) and special characters dash (-) and period (.)"
                }
                else if (isSubmitted && name.length > 30) {
                    result = "Name must not be over 30 characters"
                } break
            case 'telephone':
                if (isSubmitted && telephone && !phoneRegex.test(telephone)) {
                    result = "Telephone number is invalid"
                }
                if (isSubmitted && telephone && telephone.length < 7) {
                    result = "Telephone must be at least 7 characters"
                }
                else if (isSubmitted && telephone && telephone.length > 15)
                    result = "Telephone must not be over 15 characters"
                break
            case "email":
                if (isSubmitted && !email) result = "E-mail is required"
                else if (isSubmitted && !emailRegex.test(email)) result = "Invalid Email";
                else if (isSubmitted && email.length > 40) result = "Email must not be greater than 40 characters"; break
            case "chatName": if (isSubmitted && !chatName) result = "Chat name is required";
            else if (isSubmitted && chatName.length < 6) result = "Chat name must be at least 6 characters";
            else if (isSubmitted && chatName.length > 20) result = "Chat name must not be greater than 20 characters"; break

            default: return result
        }

        return result
    }

    render() {
        const {
            handleChange, userMaxCredit,
            credit, password, name, telephone, username,
            agentUsername, userType,
            creditDisabled, cmHandleChange  /*email, chatName*/,
            autoFocused,
            focusedInput
        } = this.props


        //const chatApp = ['Skype', 'Line', 'Viber', 'WhatsApp', 'Facebook Messenger', 'Telegram', 'IMO', 'Weebo', 'KakaoTalk', 'WeChat']

        const typeOfUser = userType === 'Member' ? 6 : 6

        return (
            <div style={{ marginBottom: 20 }}>
                <Row style={{ width: '100%' }}>
                    <Col lg="6" md="6" sm="12" className="col-centered">
                        <FormattedMessage id="Accounts.Username" defaultMessage="Username" >
                            {usernamefm =>
                                <InputText
                                    name="username"
                                    labelName={usernamefm}
                                    handleChange={handleChange}
                                    className={(this.renderError('username') ? 'error' : '')}
                                    placeholder={usernamefm}
                                    defValue={username}
                                    prependText={agentUsername}
                                    error={this.renderError('username')}
                                    isFocused={autoFocused}
                                    focusedInput={focusedInput}
                                />}
                        </FormattedMessage>
                    </Col>
                    <Col lg="6" md="6" sm="12" className="col-centered">
                        <FormattedMessage id="Global.Credit" defaultMessage="Credit" >
                            {creditFM =>
                                <InputText
                                    type="number"
                                    name="credit"
                                    labelName={creditFM}
                                    handleChange={handleChange}
                                    className={(this.renderError('credit') ? 'error red-disable' : 'red-disable')}
                                    placeholder={creditFM}
                                    defValue={credit}
                                    error={this.renderError('credit')}
                                    hint={creditDisabled ? 'N/A' : userMaxCredit === undefined ? `${maxCredit()} = ${formatCurrency(0)}` : `${maxCredit()} = ${formatCurrency(userMaxCredit === undefined ? '' : userMaxCredit)}`}
                                    isDisabled={creditDisabled}
                                />}
                        </FormattedMessage>
                    </Col>
                </Row>
                <Row style={{ width: '100%' }}>
                    <Col sm='12' md={`${typeOfUser}`} lg='3'>
                        <InputPassword
                            name="password"
                            labelName={passwordFM}
                            handleChange={handleChange}
                            placeholder="Password"
                            appendClass={true}

                            defValue={password}
                            className={(this.renderError('password') ? 'error' : '')}
                            hint={PasswordInstruction}
                            error={this.renderError('password')}
                        />
                    </Col>

                    <Col lg="3" md="6" sm="12">
                        <FormattedMessage id="Global.Name" defaultMessage="Name" >
                            {nameFM =>
                                <InputText
                                    name="name"
                                    labelName={nameFM}
                                    handleChange={(handleChange)}
                                    className={(this.renderError('name') ? 'error' : '')}
                                    placeholder={nameFM}
                                    prependClass="fa fa-user-o fa-lg"
                                    defValue={name}
                                    error={this.renderError('name')}
                                />}
                        </FormattedMessage>
                    </Col>

                    <Col lg="3" md="6" sm="12">
                        <FormattedMessage id="Global.Telephone" defaultMessage="Telephone" >
                            {telephoneFM =>
                                <InputText
                                    name="telephone"
                                    labelName={telephoneFM}
                                    handleChange={handleChange}
                                    className={(this.renderError('telephone') ? 'error' : '')}
                                    placeholder={telephoneFM}
                                    prependClass="fa fa-phone fa-lg"
                                    defValue={telephone}
                                    error={this.renderError('telephone')}
                                />}
                        </FormattedMessage>
                    </Col>

                    {userType === 'Member' &&
                        <Col lg="3" md="6" sm="12" style={{ marginTop: '28px' }}>
                            <Label className="cnt">
                                {cashFM}
                                <input
                                    type="checkbox"
                                    name="cash_market_checkbox"
                                    checked={creditDisabled}
                                    onClick={cmHandleChange}
                                    onChange={() => { }}
                                />
                                <span className="checkmark"></span>
                            </Label>
                        </Col>
                    }
                </Row>
            </div>
        )
    }
}

PropTypes.AddMemberInformation = {
    handleChange: PropTypes.func,
    userMaxCredit: PropTypes.number.isRequired,
    agentUsername: PropTypes.string
}

export default AddMemberInformation
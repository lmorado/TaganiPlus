import React, { Component } from 'react'
import styled from 'styled-components'
import { Row, Col, Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import InputText from '../../../components/InputText'
import InputPassword from '../../../components/InputPassword'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
const Label = styled.label`
    display: flex;
    align-items: center;
    span {
        padding-left: 10px;
    }
`

class AddSubUserInformation extends Component {

    static propTypes = {
        handleSubmitSubUser: PropTypes.func,
        handleChange: PropTypes.func,
        loading: PropTypes.bool,
        error: PropTypes.bool,
        errorMsg: PropTypes.string,
        username: PropTypes.string,
        memberDetails: PropTypes.object,
        agentUsername: PropTypes.oneOfType([
            PropTypes.string, PropTypes.object])
    }

    renderError = (field) => {

        const { sub_name, sub_password, sub_username, isSubmitted } = this.props

        let result = ''
        switch (field) {
            case 'sub_name': result = (!sub_name && isSubmitted) ? "This field is required." : ''; break
            case 'sub_password':
                if (isSubmitted && !sub_password) {
                    result = "Password is required"
                } else if (isSubmitted && sub_password.length < 5) {
                    result = "Password should be at least 5 characters"
                } else if (isSubmitted && sub_password.length > 15) {
                    result = "Password should be at most 15 characters"
                }
                break
            case 'sub_username': result = (!sub_username && isSubmitted) ? "This field is required." : ''; break
            default: return null
        }
        return result
    }


    render() {

        const {
            sub_name, sub_password, sub_username,
            member_management, member_management_readOnly, forecast, total_bets, reports, payments,
            isSubmitted, handleChange,
            error, errorMsg, agentUsername
        } = this.props

        if (error) return <p>{errorMsg}</p>


        return (
            <div style={{ marginBottom: 20 }}>
                <Row>
                    <Col md="4">
                        <input type="hidden" name="agent_username" value={agentUsername.username} />
                        <FormattedMessage id="Accounts.Username" defaultMessage="Username" >
                            {username =>
                                <InputText
                                    name="sub_username"
                                    labelName={username}
                                    handleChange={handleChange}
                                    className={(isSubmitted && !sub_username ? 'error' : '')}
                                    placeholder={username}
                                    defValue={sub_username}
                                    prependText={agentUsername.username}
                                    error={this.renderError('sub_username')}
                                    isFocused
                                />}</FormattedMessage>

                        <Row style={{ marginTop: 10 }}>
                            <Col md="12">
                                <InputPassword
                                    name="sub_password"
                                    labelName={formattedMessages.password}
                                    handleChange={handleChange}
                                    placeholder="Password"
                                    appendClass={true}
                                    defValue={sub_password}
                                    className={(this.renderError('sub_password') ? 'error' : '')}
                                    hint={formattedMessages.PasswordInstruction}
                                    error={this.renderError('sub_password')}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col md="4">
                        <Row>
                            <Col md="12">
                                <FormattedMessage id="Global.Name" defaultMessage="Name" >
                                    {name =>
                                        <InputText
                                            name="sub_name"
                                            labelName={name}
                                            handleChange={handleChange}
                                            className={(this.renderError('sub_name') ? 'error' : '')}
                                            placeholder={name}
                                            prependClass="fa fa-user-o fa-lg"
                                            defValue={sub_name}
                                            error={this.renderError('sub_name')}
                                        />}
                                </FormattedMessage>
                            </Col>
                        </Row>
                    </Col>

                    <Col md="4">
                        <h4 style={{ marginBottom: 20 }}>{formattedMessages.subuserPreference}</h4>
                        <Label>
                            <input
                                type="checkbox"
                                name="dashboard"
                                checked={true}
                                disabled={true}
                            />
                            <span>{formattedMessages.dashboard}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="accounts"
                                checked={true}
                                disabled={true}
                            />
                            <span>{formattedMessages.accounts}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="announcements"
                                checked={true}
                                disabled={true}
                            />
                            <span>{formattedMessages.announcements}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="member_management"
                                onChange={handleChange}
                                checked={member_management}
                            />
                            <span>{formattedMessages.memberManagement}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="member_management_readOnly"
                                onChange={handleChange}
                                checked={member_management_readOnly}
                            />
                            <span>{formattedMessages.memberManagementReadOnly}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="forecast"
                                onChange={handleChange}
                                checked={forecast}
                            />
                            <span>{formattedMessages.forecast}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="total_bets"
                                onChange={handleChange}
                                checked={total_bets}
                            />
                            <span>{formattedMessages.totalBets}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="reports"
                                onChange={handleChange}
                                checked={reports}
                            />
                            <span>{formattedMessages.reports}</span>
                        </Label>
                        <Label>
                            <input
                                type="checkbox"
                                name="payments"
                                onChange={handleChange}
                                checked={payments}
                            />
                            <span>{formattedMessages.payments}</span>
                        </Label>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddSubUserInformation

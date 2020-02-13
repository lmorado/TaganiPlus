import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Label
} from 'reactstrap'
import InputText from '../../../components/InputText'
import InputSelect from '../../../components/InputSelect'
import { hypenToUnderscore, formatCurrency } from '../../../utils/helpers'
import VerticalHeaderActions from './VerticalHeaderActions'
import PositionTaking from './PositionTaking'
import MemberPositionTaking from './MemberPositionTaking';
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { FormattedMessage } from 'react-intl'
import { maximumAmountIsRequired, minimumAmountIsRequired, valueShouldBeAtLeast, valueShouldNotExceed, maxIs, minIs } from '../../../utils/actionsTranslation'
export default class Parlay extends Component {

    static propTypes = {
        isSubmitted: PropTypes.bool,
        parlay_pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_minBet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_maxBet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_maxPayoutPerTicket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_com_2: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_com_3_4: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_com_5_6: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_com_7_8: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        parlay_com_9_10: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        handleChange: PropTypes.func,
        data: PropTypes.object,
        enableParlayForm: PropTypes.bool,
        toggleParlay: PropTypes.func
    }

    renderError = (field, limitValue, altLimitValue) => {
        const {
            isSubmitted, parlay_pt,
            parlay_minBet, parlay_maxBet, parlay_maxPayoutPerTicket,
            enableParlayForm,
            pt_0_pt_3,
            pt_0_received_pt_3,
            pt_0_forced_pt_3,
            pt_0_remaining_pt_3,
        } = this.props

        let result = ''

        switch (field) {
            case 'parlay_minBet':
                if (isSubmitted && !parlay_minBet && enableParlayForm) {
                    result = minimumAmountIsRequired()
                } else if (limitValue > Number(parlay_minBet) && enableParlayForm && parlay_minBet) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(limitValue)}`
                } else if (
                    (Number(parlay_minBet) > altLimitValue ||
                        Number(parlay_minBet) > Number(parlay_maxBet))
                    && enableParlayForm) {
                    if (Number(parlay_minBet) > Number(parlay_maxBet) &&
                        Number(parlay_maxBet) >= limitValue && parlay_maxBet <= altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(parlay_maxBet)}`
                    if (Number(parlay_minBet) > altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'parlay_maxBet':
                if (isSubmitted && !parlay_maxBet && enableParlayForm) {
                    result = maximumAmountIsRequired()
                } else if (Number(parlay_maxBet) > limitValue && enableParlayForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                } else if ((altLimitValue > Number(parlay_maxBet) ||
                    Number(parlay_minBet) > Number(parlay_maxBet))
                    && enableParlayForm && parlay_maxBet) {
                    if (Number(parlay_maxBet) > Number(parlay_minBet) && Number(parlay_minBet) < limitValue && parlay_minBet >= altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(parlay_minBet)}`
                    if (Number(parlay_maxBet) < altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'parlay_maxPayoutPerTicket':
                if (isSubmitted && !parlay_maxPayoutPerTicket && enableParlayForm) {
                    result = maximumAmountIsRequired()
                } else if (limitValue < Number(parlay_maxPayoutPerTicket) && enableParlayForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                }
                break
            case 'parlay_pt': result = (isSubmitted && !parlay_pt && enableParlayForm) ? "PT is required" : null; break
            case 'pt_0_pt_3': result = (isSubmitted && !(pt_0_pt_3 !== null && pt_0_pt_3 !== '') && enableParlayForm) ? "Select a value" : null; break
            case 'pt_0_received_pt_3': result = (isSubmitted && !(pt_0_received_pt_3 !== null && pt_0_received_pt_3 !== '') && enableParlayForm) ? "Select a value" : null; break
            case 'pt_0_forced_pt_3': result = (isSubmitted && !(pt_0_forced_pt_3 !== null && pt_0_forced_pt_3 !== '') && enableParlayForm) ? "Select a value" : null; break
            case 'pt_0_remaining_pt_3': result = (isSubmitted && !(pt_0_remaining_pt_3 !== null && pt_0_remaining_pt_3 !== '') && enableParlayForm) ? "Select a value" : null; break
            default: return null
        }
        return result
    }

    getValue = (field) => {
        const { parlay_com_2, parlay_com_3_4, parlay_com_5_6, parlay_com_7_8, parlay_com_9_10 } = this.props
        let result = ''
        switch (field) {
            case 'parlay_com_2': result = (parlay_com_2) ? parlay_com_2 : 0; break
            case 'parlay_com_3_4': result = (parlay_com_3_4) ? parlay_com_3_4 : 0; break
            case 'parlay_com_5_6': result = (parlay_com_5_6) ? parlay_com_5_6 : 0; break
            case 'parlay_com_7_8': result = (parlay_com_7_8) ? parlay_com_7_8 : 0; break
            case 'parlay_com_9_10': result = (parlay_com_9_10) ? parlay_com_9_10 : 0; break
            default: return null
        }
        return result
    }

    render() {
        const {
            handleChange, data, enableParlayForm, toggleParlay, resetParlayState, resetParlay,
            parlay_minBet, parlay_maxBet, parlay_maxPayoutPerTicket, maxValueParlay,
            userType,
        } = this.props

        return (
            <Row>
                <VerticalHeaderActions
                    toggleSwitch={toggleParlay}
                    isEnabled={enableParlayForm}
                    resetForm={resetParlay}
                    maxValueForm={maxValueParlay}
                />
                {userType === 'Agent' ?

                    <PositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableParlayForm}
                        {...this.props}
                    /> :

                    <MemberPositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableParlayForm}
                        {...this.props} />}

                <Col sm='6' xs='6' md="6" lg="6" xl='6' style={{ marginLeft: 12 }}>
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{formattedMessages.betsetting}</CardHeader>
                        <CardBody style={{ padding: '5px 20px' }}>
                            {data && data.betSettings.map((val, i) => {
                                return (
                                    <Row key={i}>
                                        <div style={{ position: 'relative', padding: '5px 15px 5px 15px' }}>
                                            <Row>
                                                <Col xs='12' sm='12' md="12" lg="12" xl='12'>
                                                    <Label style={{ position: 'absolute' }}>{formattedMessages.minMaxPerBetFm}</Label>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="parlay_minBet"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('parlay_minBet', val.minBet, val.maxBet) ? 'error' : '')}
                                                        error={this.renderError('parlay_minBet', val.minBet, val.maxBet)}
                                                        hint={`${minIs()} ${formatCurrency(val.minBet)}`}
                                                        isDisabled={(enableParlayForm) ? false : true}
                                                        defValue={parlay_minBet}
                                                    />
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="parlay_maxBet"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('parlay_maxBet', val.maxBet, val.minBet) ? 'error' : '')}
                                                        error={this.renderError('parlay_maxBet', val.maxBet, val.minBet)}
                                                        hint={`${maxIs()} ${formatCurrency(val.maxBet)}`}
                                                        isDisabled={(enableParlayForm) ? false : true}
                                                        defValue={parlay_maxBet}
                                                    />
                                                </Col>
                                                <Col xs='12' sm='12' md="12" lg="12" xl='12'>
                                                    <Label style={{ position: 'absolute' }}>{formattedMessages.maxPayoutPerTicket}</Label>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="parlay_maxPayoutPerTicket"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('parlay_maxPayoutPerTicket', val.maxPayoutPerTicket) ? 'error' : '')}
                                                        error={this.renderError('parlay_maxPayoutPerTicket', val.maxPayoutPerTicket)}
                                                        hint={`${maxIs()} ${formatCurrency(val.maxPayoutPerTicket)}`}
                                                        isDisabled={(enableParlayForm) ? false : true}
                                                        defValue={parlay_maxPayoutPerTicket}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Row>
                                )
                            })}
                        </CardBody>
                    </Card>
                </Col>

                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{formattedMessages.commissionsetting}</CardHeader>
                        <CardBody>
                            {data && data.commissions.map((val, i) => {
                                const comName = `parlay_com_${hypenToUnderscore(val.label)}`
                                return (
                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #eee', paddingBottom: 5 }} key={i}>
                                        <Col xs="6" md="6" sm="6" lg='3'>
                                            <strong>{formattedMessages.commission} {val.label}:</strong>
                                        </Col>
                                        <Col xs="6" md="6" sm="6" lg='2'>
                                            <InputSelect
                                                type="commission"
                                                handleChange={handleChange}
                                                endNumber={`${val.rate}`}
                                                name={comName}
                                                append="%"
                                                className={(this.renderError(`${comName}`) ? 'error' : '')}
                                                error={this.renderError(`${comName}`)}
                                                isDisabled={(enableParlayForm) ? false : true}
                                                value={(resetParlayState) ? 0 : this.getValue(comName)}
                                            />
                                        </Col>
                                    </Row>
                                )
                            })}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Label,
} from 'reactstrap'
import InputSelect from '../../../components/InputSelect'
import InputText from '../../../components/InputText'
import { formatCurrency } from '../../../utils/helpers'
import VerticalHeaderActions from './VerticalHeaderActions'
import PositionTaking from './PositionTaking'
import MemberPositionTaking from './MemberPositionTaking';
import { commissionSettingFm, commissionFm } from '../translation'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { maximumAmountIsRequired, minimumAmountIsRequired, valueShouldBeAtLeast, valueShouldNotExceed, maxIs, minIs } from '../../../utils/actionsTranslation'


export default class Cricket extends Component {

    static propTypes = {
        cricket_minPerTicket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        cricket_maxPerTicket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        cricket_minPerGame: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        cricket_maxPerGame: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isSubmitted: PropTypes.bool,
        commission: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        handleChange: PropTypes.func,
        data: PropTypes.object,
        enableCricketForm: PropTypes.bool,
        toggleCricket: PropTypes.func
    }

    renderError = (field, limitValue, altLimitValue) => {

        const {
            cricket_minPerTicket, cricket_maxPerTicket, cricket_maxPerGame, isSubmitted,
            enableCricketForm,
            pt_1_pt_8, pt_1_received_pt_8, pt_1_forced_pt_8, pt_1_remaining_pt_8,
            pt_2_pt_8, pt_2_received_pt_8, pt_2_forced_pt_8, pt_2_remaining_pt_8
        } = this.props


        let result = ''
        switch (field) {
            case 'cricket_minPerTicket':
                if (isSubmitted && !cricket_minPerTicket && enableCricketForm) {
                    result = minimumAmountIsRequired()
                } else if (limitValue > Number(cricket_minPerTicket) && enableCricketForm && cricket_minPerTicket) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(limitValue)}`
                } else if ((Number(cricket_minPerTicket) > altLimitValue || Number(cricket_minPerTicket) > Number(cricket_maxPerTicket)) && enableCricketForm) {
                    if (Number(cricket_minPerTicket) > Number(cricket_maxPerTicket) && Number(cricket_maxPerTicket) >= limitValue && cricket_maxPerTicket <= altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(cricket_maxPerTicket)}`
                    if (Number(cricket_minPerTicket) > altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'cricket_maxPerTicket':
                if (isSubmitted && !cricket_maxPerTicket && enableCricketForm) {
                    result = maximumAmountIsRequired()
                } else if (Number(cricket_maxPerTicket) > limitValue && enableCricketForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                } else if ((altLimitValue > Number(cricket_maxPerTicket) || Number(cricket_minPerTicket) > Number(cricket_maxPerTicket)) && enableCricketForm && cricket_maxPerTicket) {
                    if (Number(cricket_maxPerTicket) > Number(cricket_minPerTicket) && Number(cricket_minPerTicket) < limitValue && cricket_minPerTicket >= altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(cricket_minPerTicket)}`
                    if (Number(cricket_maxPerTicket) < altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'cricket_maxPerGame':
                if (isSubmitted && !cricket_maxPerGame && enableCricketForm) {
                    result = maximumAmountIsRequired()
                } else if (Number(cricket_maxPerGame) > limitValue && enableCricketForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                } else if (altLimitValue > Number(cricket_maxPerGame) && enableCricketForm && cricket_maxPerGame) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'pt_1_pt_8': result = (isSubmitted && !(pt_1_pt_8 !== null && pt_1_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            case 'pt_1_received_pt_8': result = (isSubmitted && !(pt_1_received_pt_8 !== null && pt_1_received_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            case 'pt_1_forced_pt_8': result = (isSubmitted && !(pt_1_forced_pt_8 !== null && pt_1_forced_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            case 'pt_1_remaining_pt_8': result = (isSubmitted && !(pt_1_remaining_pt_8 !== null && pt_1_remaining_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            case 'pt_2_pt_8': result = (isSubmitted && !(pt_2_pt_8 !== null && pt_2_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            case 'pt_2_received_pt_8': result = (isSubmitted && !(pt_2_received_pt_8 !== null && pt_2_received_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            case 'pt_2_forced_pt_8': result = (isSubmitted && !(pt_2_forced_pt_8 !== null && pt_2_forced_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            case 'pt_2_remaining_pt_8': result = (isSubmitted && !(pt_2_remaining_pt_8 !== null && pt_2_remaining_pt_8 !== '') && enableCricketForm) ? "Select a value" : null; break
            default: return null
        }
        return result
    }

    render() {


        const {
            handleChange, data, toggleCricket, enableCricketForm, resetCricket,
            cricket_minPerTicket, cricket_maxPerTicket, cricket_maxPerGame,
            cricket_commission, userType, togglePTSettings, toggleTakeRemaining
        } = this.props

        return (
            <Row>
                <VerticalHeaderActions
                    toggleSwitch={toggleCricket}
                    isEnabled={enableCricketForm}
                    resetForm={resetCricket}
                />

                {userType === 'Agent' ?
                    <PositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableCricketForm}
                        {...this.props}
                        cricket={true}
                        togglePTSettings={togglePTSettings}
                        toggleTakeRemaining={toggleTakeRemaining}
                    /> :

                    <MemberPositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableCricketForm}
                        cricket={true}
                        {...this.props}
                        togglePTSettings={togglePTSettings}
                    />}

                <Col sm='6' xs='6' md="6" lg="6" xl='6' >
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{formattedMessages.betsetting}</CardHeader>
                        <CardBody style={{ padding: '5px 20px' }}>
                            {data && data.betSettings.map((val, i) => {
                                return (
                                    <Row key={i}>
                                        <div style={{ position: 'relative', padding: '5px 15px 5px 15px' }}>
                                            <Row>
                                                <Col xs='12' sm='12' md="12" lg="12" xl='12'>
                                                    <Label style={{ position: 'absolute' }}>{formattedMessages.minMaxPerTicketFm}</Label>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <div>
                                                        <InputText
                                                            type="number"
                                                            name="cricket_minPerTicket"
                                                            handleChange={handleChange}
                                                            className={(this.renderError('cricket_minPerTicket', val.minPerTicket, val.maxPerTicket) ? 'error' : '')}
                                                            defValue={cricket_minPerTicket}
                                                            error={this.renderError('cricket_minPerTicket', val.minPerTicket, val.maxPerTicket)}
                                                            hint={`${minIs()} ${formatCurrency(val.minPerTicket)}`}
                                                            isDisabled={(enableCricketForm) ? false : true}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="cricket_maxPerTicket"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('cricket_maxPerTicket', val.maxPerTicket, val.minPerTicket) ? 'error' : '')}
                                                        defValue={cricket_maxPerTicket}
                                                        error={this.renderError('cricket_maxPerTicket', val.maxPerTicket, val.minPerTicket)}
                                                        hint={`${maxIs()} ${formatCurrency(val.maxPerTicket)}`}
                                                        isDisabled={(enableCricketForm) ? false : true}
                                                    />
                                                </Col>
                                                <Col xs='12' sm='12' md="12" lg="12" xl='12'>
                                                    <Label style={{ position: 'absolute' }}>{formattedMessages.maxPerGameFm}</Label>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="cricket_maxPerGame"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('cricket_maxPerGame', val.maxPerGame, cricket_maxPerTicket) ? 'error' : '')}
                                                        defValue={cricket_maxPerGame}
                                                        error={this.renderError('cricket_maxPerGame', val.maxPerGame, cricket_maxPerTicket)}
                                                        hint={`${minIs()} ${formatCurrency(cricket_maxPerTicket)} and ${maxIs()} ${formatCurrency(val.maxPerGame)}`}
                                                        isDisabled={(enableCricketForm) ? false : true}
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

                <Col sm='6' xs='6' md="6" lg="6" xl='6' >
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{commissionSettingFm}</CardHeader>
                        <CardBody>
                            {data && data.commissions.map((val, i) => {
                                return (
                                    <Row key={i}>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>{commissionFm}</label></Col>
                                        <Col xs="6" md="6" sm="6" lg='6' xl='3'>
                                            <InputSelect
                                                type="commission"
                                                handleChange={handleChange}
                                                endNumber={`${val.rate}`}
                                                name="cricket_commission"
                                                value={cricket_commission}
                                                append="%"
                                                className={(this.renderError('cricket_commission') ? 'error' : '')}
                                                error={this.renderError('cricket_commission')}
                                                isDisabled={(enableCricketForm) ? false : true}
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

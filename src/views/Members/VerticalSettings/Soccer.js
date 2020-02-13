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
import { subtractTwoValue, formatCurrency } from '../../../utils/helpers'
import VerticalHeaderActions from './VerticalHeaderActions'
import PositionTaking from './PositionTaking'
import MemberPositionTaking from './MemberPositionTaking';
import { commissionSettingFm, commissionFm } from '../translation'
import { FormattedMessage } from 'react-intl'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { maximumAmountIsRequired, minimumAmountIsRequired, valueShouldBeAtLeast, valueShouldNotExceed, maxIs, minIs } from '../../../utils/actionsTranslation'
export default class Soccer extends Component {

    static propTypes = {
        soccer_minPerTicket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        soccer_maxPerTicket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        soccer_minPerGame: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        soccer_maxPerGame: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isSubmitted: PropTypes.bool,
        commission: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        pt_1_pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        pt_1_forced_pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        handleChange: PropTypes.func,
        data: PropTypes.object,
        enableSoccerForm: PropTypes.bool,
        toggleSoccer: PropTypes.func
    }

    renderError = (field, limitValue, altLimitValue) => {
        const {
            soccer_minPerTicket, soccer_maxPerTicket, soccer_minPerGame, soccer_maxPerGame, isSubmitted,
            enableSoccerForm,
            pt_1_pt_1, pt_1_received_pt_1, pt_1_forced_pt_1, pt_1_remaining_pt_1,
            pt_2_pt_1, pt_2_received_pt_1, pt_2_forced_pt_1, pt_2_remaining_pt_1
        } = this.props


        let result = ''
        switch (field) {
            case 'soccer_minPerTicket':
                if (isSubmitted && !soccer_minPerTicket && enableSoccerForm) {
                    result = minimumAmountIsRequired()
                } else if (limitValue > Number(soccer_minPerTicket) && enableSoccerForm && soccer_minPerTicket) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(limitValue)}`
                } else if ((Number(soccer_minPerTicket) > altLimitValue || Number(soccer_minPerTicket) > Number(soccer_maxPerTicket)) && enableSoccerForm) {
                    if (Number(soccer_minPerTicket) > Number(soccer_maxPerTicket) && Number(soccer_maxPerTicket) >= limitValue && soccer_maxPerTicket <= altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(soccer_maxPerTicket)}`
                    if (Number(soccer_minPerTicket) > altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'soccer_maxPerTicket':
                if (isSubmitted && !soccer_maxPerTicket && enableSoccerForm) {
                    result = maximumAmountIsRequired()
                } else if (Number(soccer_maxPerTicket) > limitValue && enableSoccerForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                } else if ((altLimitValue > Number(soccer_maxPerTicket) || Number(soccer_minPerTicket) > Number(soccer_maxPerTicket)) && enableSoccerForm && soccer_maxPerTicket) {
                    if (Number(soccer_maxPerTicket) > Number(soccer_minPerTicket) && Number(soccer_minPerTicket) < limitValue && soccer_minPerTicket >= altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(soccer_minPerTicket)}`
                    if (Number(soccer_maxPerTicket) < altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'soccer_maxPerGame':
                if (isSubmitted && !soccer_maxPerGame && enableSoccerForm) {
                    result = maximumAmountIsRequired()
                } else if (Number(soccer_maxPerGame) > limitValue && enableSoccerForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                } else if (altLimitValue > Number(soccer_maxPerGame) && enableSoccerForm && soccer_maxPerGame) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'pt_1_pt_1': result = (isSubmitted && !(pt_1_pt_1 !== null && pt_1_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            case 'pt_1_received_pt_1': result = (isSubmitted && !(pt_1_received_pt_1 !== null && pt_1_received_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            case 'pt_1_forced_pt_1': result = (isSubmitted && !(pt_1_forced_pt_1 !== null && pt_1_forced_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            case 'pt_1_remaining_pt_1': result = (isSubmitted && !(pt_1_remaining_pt_1 !== null && pt_1_remaining_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            case 'pt_2_pt_1': result = (isSubmitted && !(pt_2_pt_1 !== null && pt_2_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            case 'pt_2_received_pt_1': result = (isSubmitted && !(pt_2_received_pt_1 !== null && pt_2_received_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            case 'pt_2_forced_pt_1': result = (isSubmitted && !(pt_2_forced_pt_1 !== null && pt_2_forced_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            case 'pt_2_remaining_pt_1': result = (isSubmitted && !(pt_2_remaining_pt_1 !== null && pt_2_remaining_pt_1 !== '') && enableSoccerForm) ? "Select a value" : null; break
            default: return null
        }
        return result
    }

    render() {
        const {
            handleChange, data, toggleSoccer, enableSoccerForm, resetSoccer,
            soccer_minPerTicket, soccer_maxPerTicket, soccer_maxPerGame,
            soccer_commission, maxValueSoccer, userType,
            enableCopyPT, togglePTSettings, copyPTChecked, toggleTakeRemaining
        } = this.props

        return (
            <Row>
                <VerticalHeaderActions
                    toggleSwitch={toggleSoccer}
                    isEnabled={enableSoccerForm}
                    resetForm={resetSoccer}
                    maxValueForm={maxValueSoccer} />

                {userType === 'Agent' ?
                    <PositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableSoccerForm}
                        {...this.props}
                        enableCopyPT={enableCopyPT}
                        enableCopyPTFrom={'Soccer'}
                        togglePTSettings={togglePTSettings}
                        copyPTChecked={copyPTChecked}
                        toggleTakeRemaining={toggleTakeRemaining}
                    /> :

                    <MemberPositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableSoccerForm}
                        {...this.props}
                        enableCopyPT={enableCopyPT}
                        enableCopyPTFrom={'Soccer'}
                        togglePTSettings={togglePTSettings}
                        copyPTChecked={copyPTChecked} />}

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
                                                            name="soccer_minPerTicket"
                                                            handleChange={handleChange}
                                                            className={(this.renderError('soccer_minPerTicket', val.minPerTicket, val.maxPerTicket) ? 'error' : '')}
                                                            defValue={soccer_minPerTicket}
                                                            error={this.renderError('soccer_minPerTicket', val.minPerTicket, val.maxPerTicket)}
                                                            hint={`${minIs()} ${formatCurrency(val.minPerTicket)}`}
                                                            isDisabled={(enableSoccerForm) ? false : true}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="soccer_maxPerTicket"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('soccer_maxPerTicket', val.maxPerTicket, val.minPerTicket) ? 'error' : '')}
                                                        defValue={soccer_maxPerTicket}
                                                        error={this.renderError('soccer_maxPerTicket', val.maxPerTicket, val.minPerTicket)}
                                                        hint={`${maxIs()} ${formatCurrency(val.maxPerTicket)}`}
                                                        isDisabled={(enableSoccerForm) ? false : true}
                                                    />
                                                </Col>
                                                <Col xs='12' sm='12' md="12" lg="12" xl='12'>
                                                    <Label style={{ position: 'absolute' }}>{formattedMessages.maxPerGameFm}</Label>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="soccer_maxPerGame"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('soccer_maxPerGame', val.maxPerGame, soccer_maxPerTicket) ? 'error' : '')}
                                                        defValue={soccer_maxPerGame}
                                                        error={this.renderError('soccer_maxPerGame', val.maxPerGame, soccer_maxPerTicket)}
                                                        hint={`${minIs()} ${formatCurrency(soccer_maxPerTicket)} and ${maxIs()} ${formatCurrency(val.maxPerGame)}`}
                                                        isDisabled={(enableSoccerForm) ? false : true}
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
                                                name="soccer_commission"
                                                value={soccer_commission}
                                                append="%"
                                                className={(this.renderError('soccer_commission') ? 'error' : '')}
                                                error={this.renderError('soccer_commission')}
                                                isDisabled={(enableSoccerForm) ? false : true}
                                            //isDisabled={((!enableSoccerForm) || val.rate === 0) ? true : false}
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

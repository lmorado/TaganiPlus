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

import Switch from 'react-switch'

import InputSelect from '../../../../components/InputSelect'
import InputText from '../../../../components/InputText'
import Input from '../../../../components/Input'
import VerticalHeaderActions from '../VerticalHeaderActions'
import { SwitchCheck } from '../../styles'

import { formatCurrency, hypenToUnderscore } from '../../../../utils/helpers'
import { formattedMessages } from '../../../../translations/formattedMessageTranslation'
import { maxIs, minIs } from '../../../../utils/actionsTranslation'
import { affirmation } from '../../translation'
import { maximumAmountIsRequired, minimumAmountIsRequired, valueShouldBeAtLeast, valueShouldNotExceed } from '../../../../utils/actionsTranslation'

const ON_COLOR = '#1f8443', OFF_COLOR = '#bf0505', TAKE_REMAINING = 'Take Remaining?'

export default class VerticalParlayUpdate extends Component {

    static = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
    }


    renderError = (field, limitValue, altLimitValue) => {
        const {
            isSubmitted,
            parlay_minBet, parlay_maxBet, parlay_maxPayoutPerTicket,
            enableParlayForm,
        } = this.props

        let result = ''

        switch (field) {
            case 'parlay_minBet':
                if (!parlay_minBet && enableParlayForm) {
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
        const { data, handleChange, userType,
            toggleParlay,
            parlay_minBet,
            parlay_maxBet,
            parlay_maxPayoutPerTicket,
            enableParlayForm,
            enableParlayFormChange } = this.props

        return (
            <Row>
                <VerticalHeaderActions
                    disabled={!enableParlayFormChange}
                    toggleSwitch={toggleParlay}
                    isEnabled={enableParlayForm}
                />

                {userType === 'Agent' &&
                    data && data.positionTaking.map((val, i) => {
                        return (
                            <Col xs='6' sm='6' md="6" lg="6" xl='6' key={i}>
                                <Card>
                                    <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                        {val.subCategoryName ? val.subCategoryName : "Position Taking"}
                                    </CardHeader>
                                    <CardBody>
                                        <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                            <Col xs='6' sm='6' md="6" lg="6" xl='4'>{formattedMessages.givePt}</Col>
                                            <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>

                                                <Input type="text"
                                                    handleChange={handleChange}
                                                    name={`pt_${val.subCategoryId}_pt_${data.categoryId}`}
                                                    value={(val.give) + ' %'}
                                                    disabled />

                                            </Col>
                                        </Row>

                                        <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }} >
                                            <Col xs='6' sm='6' md="6" lg="6" xl='4'>{formattedMessages.keepPt}</Col>
                                            <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                                <Input type="text"
                                                    handleChange={handleChange}
                                                    name={`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`}
                                                    value={(val.receive) + ' %'}
                                                    disabled />
                                            </Col>
                                        </Row>

                                        <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                            <Col xs='6' sm='6' md="6" lg="6" xl='4'>{formattedMessages.forcedpt}</Col>
                                            <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                                <Input type="text"
                                                    handleChange={handleChange}
                                                    name={`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`}
                                                    value={`${val.forced} % `}
                                                    disabled
                                                />

                                            </Col>
                                        </Row>

                                        <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                            <Col xs='6' sm='6' md="6" lg="6" xl='4'>{TAKE_REMAINING}</Col>
                                            <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                                <Switch
                                                    onChange={() => { }}
                                                    onColor={ON_COLOR}
                                                    offColor={OFF_COLOR}
                                                    checked={val.isTakeRemaining}
                                                    uncheckedIcon={<SwitchCheck>{affirmation.no}</SwitchCheck>}
                                                    checkedIcon={<SwitchCheck>{affirmation.yes}</SwitchCheck>}
                                                    className='noradius medium'
                                                    width={105}
                                                    disabled={true} />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}


                {userType === 'Member' && userType === 'Member' && data && data.positionTaking.map((val, i) => {
                    return (
                        <Col xs='6' sm='6' md="6" lg="6" xl='6' key={i}>
                            <Card>
                                <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                    {val.subCategoryName ? val.subCategoryName : "Position Taking"}

                                </CardHeader>
                                <CardBody>
                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>{formattedMessages.keepPt}</Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                            <Input type="text"
                                                handleChange={handleChange}
                                                name={`pt_${val.subCategoryId}_receive_pt_${data.categoryId}_member`}
                                                value={(val.receive) + ' %'}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}

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

                <Col xs='6' sm='6' md="6" lg="6" xl='6' >
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{formattedMessages.commissionsetting}</CardHeader>
                        <CardBody>
                            {data && data.commissions.map((val, i) => {
                                const comName = `parlay_com_${hypenToUnderscore(val.label)}`
                                return (
                                    <Row style={{ marginBottom: 3, borderBottom: '1px solid #eee', paddingBottom: 3 }} key={i}>
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                            <strong>{formattedMessages.commission} {val.label}:</strong>
                                        </Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                            <InputSelect
                                                type="commission"
                                                handleChange={handleChange}
                                                endNumber={`${val.rate}`}
                                                name={comName}
                                                append="%"
                                                className={(this.renderError(`${comName}`) ? 'error' : '')}
                                                error={this.renderError(`${comName}`)}
                                                isDisabled={(enableParlayForm) ? false : true}
                                                value={this.getValue(comName)}
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
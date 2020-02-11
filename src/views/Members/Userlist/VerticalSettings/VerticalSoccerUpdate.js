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
import VerticalHeaderActions from '../VerticalHeaderActions'
import Input from '../../../../components/Input'
import { SwitchCheck } from '../../styles'
import { formattedMessages } from '../../../../translations/formattedMessageTranslation'
import { formatCurrency } from '../../../../utils/helpers'
import { maxIs, minIs } from '../../../../utils/actionsTranslation'
import { affirmation } from '../../translation'
import { maximumAmountIsRequired, minimumAmountIsRequired, valueShouldBeAtLeast, valueShouldNotExceed } from '../../../../utils/actionsTranslation'

const ON_COLOR = '#1f8443', OFF_COLOR = '#bf0505', TAKE_REMAINING = 'Take Remaining?'

export default class VerticalSoccerUpdate extends Component {


    static = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
        isDisabled: PropTypes.bool,
    }

    renderError = (field, limitValue, altLimitValue) => {
        const {
            soccer_minPerTicket, soccer_maxPerTicket, soccer_maxPerGame,
            enableSoccerForm
        } = this.props

        let result = ''
        switch (field) {
            case 'soccer_minPerTicket':
                if (!soccer_minPerTicket && enableSoccerForm) {
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
                if (!soccer_maxPerTicket && enableSoccerForm) {
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
                if (!soccer_maxPerGame && enableSoccerForm) {
                    result = maximumAmountIsRequired()
                }
                else if (altLimitValue > Number(soccer_maxPerGame) && enableSoccerForm && soccer_maxPerGame) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                else if (Number(soccer_maxPerGame) > limitValue && enableSoccerForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                }
                break
            default: return null
        }
        return result
    }

    render() {
        const { data, handleChange, userType,
            toggleSoccer,
            soccer_minPerTicket,
            soccer_commission,
            soccer_maxPerTicket,
            soccer_maxPerGame,
            enableSoccerForm,
            enableSoccerFormChange } = this.props

        return (
            <Row>

                <VerticalHeaderActions
                    disabled={!enableSoccerFormChange}
                    toggleSwitch={toggleSoccer}
                    isEnabled={enableSoccerForm}
                />

                {userType === 'Agent' && <div style={{ width: '100%', display: 'flex' }}>
                    {data && data.positionTaking.map((val, i) => {
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
                                                    disabled
                                                    value={(val.give) + ' %'} />
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
                                                    value={(val.forced) + ' %'}
                                                    disabled />

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
                </div>}

                {userType === 'Member' && <div style={{ width: '100%', display: 'flex' }}>
                    {userType === 'Member' && data && data.positionTaking.map((val, i) => {
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
                </div>}


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
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{formattedMessages.commissionsetting}</CardHeader>
                        <CardBody>
                            {data && data.commissions.map((val, i) => {
                                return (
                                    <Row key={i}>
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.commission}</label></Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
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
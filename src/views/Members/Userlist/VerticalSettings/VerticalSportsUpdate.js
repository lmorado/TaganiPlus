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
import InputCheckbox from '../../../../components/InputCheckbox'
import { SwitchCheck } from '../../styles'
import Input from '../../../../components/Input'
import VerticalHeaderActions from '../VerticalHeaderActions'

import { formatCurrency } from '../../../../utils/helpers'
import { formattedMessages } from '../../../../translations/formattedMessageTranslation'
import { maxIs, minIs } from '../../../../utils/actionsTranslation'
import { affirmation } from '../../translation'
import { maximumAmountIsRequired, minimumAmountIsRequired, valueShouldBeAtLeast, valueShouldNotExceed } from '../../../../utils/actionsTranslation'

const ON_COLOR = '#1f8443', OFF_COLOR = '#bf0505', TAKE_REMAINING = 'Take Remaining?'

export default class VerticalSportsUpdate extends Component {
    static = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
        isDisabled: PropTypes.bool,
    }


    renderError = (field, limitValue, altLimitValue) => {
        const {
            sports_minPerTicket, sports_maxPerTicket, sports_maxPerGame, enableSportForm,
        } = this.props

        let result = ''

        switch (field) {
            case 'sports_minPerTicket':
                if (!sports_minPerTicket && enableSportForm) {
                    result = minimumAmountIsRequired()
                } else if (limitValue > Number(sports_minPerTicket) && enableSportForm && sports_minPerTicket) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(limitValue)}`
                } else if ((Number(sports_minPerTicket) > altLimitValue || Number(sports_minPerTicket) > Number(sports_maxPerTicket)) && enableSportForm) {
                    if (Number(sports_minPerTicket) > Number(sports_maxPerTicket) && Number(sports_maxPerTicket) >= limitValue && sports_maxPerTicket <= altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(sports_maxPerTicket)}`
                    if (Number(sports_minPerTicket) > altLimitValue)
                        result = `${valueShouldNotExceed()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'sports_maxPerTicket':
                if (!sports_maxPerTicket && enableSportForm) {
                    result = maximumAmountIsRequired()
                } else if (Number(sports_maxPerTicket) > limitValue && enableSportForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                } else if ((altLimitValue > Number(sports_maxPerTicket) || Number(sports_minPerTicket) > Number(sports_maxPerTicket)) && enableSportForm && sports_maxPerTicket) {
                    if (Number(sports_maxPerTicket) > Number(sports_minPerTicket) && Number(sports_minPerTicket) < limitValue && sports_minPerTicket >= altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(sports_minPerTicket)}`
                    if (Number(sports_maxPerTicket) < altLimitValue)
                        result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'sports_maxPerGame':
                if (!sports_maxPerGame && enableSportForm) {
                    result = maximumAmountIsRequired()
                } else if (altLimitValue > Number(sports_maxPerGame) && enableSportForm && sports_maxPerGame) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                } else if (Number(sports_maxPerGame) > limitValue && enableSportForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                }
                break
            default: return null
        }
        return result
    }

    render() {
        const { data, handleChange, userType, handleItemSelection, selectedItems,
            toggleSports,
            sports_minPerTicket, sports_maxPerTicket, sports_maxPerGame,
            enableSportForm,
            enableSportFormChange,
            sports_com
        } = this.props


        return (
            <Row>
                <VerticalHeaderActions
                    disabled={!enableSportFormChange}
                    toggleSwitch={toggleSports}
                    isEnabled={enableSportForm}
                />

                {userType === 'Agent' && data && data.positionTaking.map((val, i) => {
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


                {userType === 'Member' && data && data.positionTaking.map((val, i) => {
                    return (
                        <Col md="6" lg="6" key={i}>
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
                                                name={`pt_${val.subCategoryId}_remaining_pt_${data.categoryId}_member`}
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



                <Col xs='6' sm='6' md="6" lg="6" xl='6'>
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
                                                <Col xs='6' sm='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="sports_minPerTicket"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('sports_minPerTicket', val.minPerTicket, val.maxPerTicket) ? 'error' : '')}
                                                        error={this.renderError('sports_minPerTicket', val.minPerTicket, val.maxPerTicket)}
                                                        hint={`${minIs()} ${formatCurrency(val.minPerTicket)}`}
                                                        isDisabled={(enableSportForm) ? false : true}
                                                        defValue={sports_minPerTicket}
                                                    />
                                                </Col>
                                                <Col xs='6' sm='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="sports_maxPerTicket"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('sports_maxPerTicket', val.maxPerTicket, val.minPerTicket) ? 'error' : '')}
                                                        error={this.renderError('sports_maxPerTicket', val.maxPerTicket, val.minPerTicket)}
                                                        hint={`${maxIs()} ${formatCurrency(val.maxPerTicket)}`}
                                                        isDisabled={(enableSportForm) ? false : true}
                                                        defValue={sports_maxPerTicket}
                                                    />
                                                </Col>
                                                <Col xs='12' sm='12' md="12" lg="12" xl='12'>
                                                    <Label style={{ position: 'absolute' }}>{formattedMessages.maxPerGameFm}</Label>
                                                </Col>
                                                <Col xs='6' sm='6' md="6" lg="6" xl='6'>
                                                    <InputText
                                                        type="number"
                                                        name="sports_maxPerGame"
                                                        handleChange={handleChange}
                                                        className={(this.renderError('sports_maxPerGame', val.maxPerGame, sports_maxPerTicket) ? 'error' : '')}
                                                        error={this.renderError('sports_maxPerGame', val.maxPerGame, sports_maxPerTicket)}
                                                        hint={`${minIs()} ${formatCurrency(sports_maxPerTicket)} and ${maxIs()} ${formatCurrency(val.maxPerGame)}`}
                                                        isDisabled={(enableSportForm) ? false : true}
                                                        defValue={sports_maxPerGame}
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

                <Col xs='6' sm='6' md="6" lg="6" xl='6'>
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{formattedMessages.sportsRestrictionFm}</CardHeader>
                        <CardBody>
                            <Row>
                                {data && data.sportRestrictions.map((val, i) => {
                                    return (
                                        <Col className='sport-restriction-font' md="4" sm="4" key={i}>
                                            <InputCheckbox
                                                name={`sportRes_${val.sportId}`}
                                                label={`${val.sportName}`}
                                                checked={!val.isAllowed}
                                                onChange={(checked, name) => {
                                                    handleItemSelection(checked, name, val.sportId);
                                                }}
                                                checked={selectedItems.includes(val.sportId)}
                                                value={selectedItems.includes(val.sportId)}
                                                isDisable={(!val.isAllowed && !val.isEditable || !enableSportForm) ? true : false}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs='6' sm='6' md="6" lg="6" xl='6' >
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
                                                name="sports_com"
                                                append="%"
                                                className={(this.renderError('sports_com') ? 'error' : '')}
                                                error={this.renderError('sports_com')}
                                                isDisabled={(enableSportForm) ? false : true}
                                                value={sports_com}
                                            />
                                        </Col>
                                    </Row>
                                )
                            })}
                        </CardBody>
                    </Card>
                </Col>
            </Row >
        )
    }
}

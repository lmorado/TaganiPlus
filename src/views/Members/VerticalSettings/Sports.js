import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'

import Switch from 'react-switch'

import InputText from '../../../components/InputText'
import InputSelect from '../../../components/InputSelect'
import InputCheckbox from '../../../components/InputCheckbox'
import VerticalHeaderActions from './VerticalHeaderActions'
import { SwitchCheck } from '../styles'
import { formatCurrency } from '../../../utils/helpers'
import { commissionSettingFm, commissionFm, sportsRestrictionFm, affirmation } from '../translation'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { maximumAmountIsRequired, minimumAmountIsRequired, valueShouldBeAtLeast, valueShouldNotExceed, maxIs, minIs } from '../../../utils/actionsTranslation'

const ON_COLOR = '#1f8443', OFF_COLOR = '#bf0505', TAKE_REMAINING = 'Take Remaining?'
const Input = styled.input`
    display: block;
    width: 100%;
    height: calc(2.0625rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #5c6873;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e4e7ea;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    :focus {
        color: #5c6873;
        background-color: #fff;
        border-color: #8ad4ee;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(32,168,216,.25);
    }

    &.error {
        border: 1px solid red;
    }
 
    // // appending icons
    // position: relative;
    // flex: 1 1 auto;
    // //width: 1%;
    // margin-bottom: 0;

    &:disabled {
        cursor: not-allowed;
        pointer-events: all !important
    }
`


export default class Sports extends Component {
    state = {
        selectedItems: []
    }

    static propTypes = {
        isSubmitted: PropTypes.bool,
        sports_pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        sports_com: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        sports_minPerTicket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        sports_maxPerTicket: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        sports_maxPerGame: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        handleChange: PropTypes.func,
        data: PropTypes.object,
        handleItemSelection: PropTypes.func,
        enableSportForm: PropTypes.bool,
        toggleSport: PropTypes.func
    }


    renderError = (field, limitValue, altLimitValue) => {
        const {
            isSubmitted, sports_pt,
            sports_minPerTicket, sports_maxPerTicket, sports_maxPerGame, enableSportForm,
            pt_0_pt_2,
            pt_0_received_pt_2,
            pt_0_forced_pt_2,
            pt_0_remaining_pt_2
        } = this.props
        let result = ''

        switch (field) {
            case 'sports_minPerTicket':
                if (isSubmitted && !sports_minPerTicket && enableSportForm) {
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
                if (isSubmitted && !sports_maxPerTicket && enableSportForm) {
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
                if (isSubmitted && !sports_maxPerGame && enableSportForm) {
                    result = maximumAmountIsRequired()
                } else if (Number(sports_maxPerGame) > limitValue && enableSportForm) {
                    result = `${valueShouldNotExceed()} ${formatCurrency(limitValue)}`
                } else if (altLimitValue > Number(sports_maxPerGame) && enableSportForm && sports_maxPerGame) {
                    result = `${valueShouldBeAtLeast()} ${formatCurrency(altLimitValue)}`
                }
                break
            case 'sports_pt': result = (isSubmitted && !sports_pt && enableSportForm) ? "PT is required" : null; break
            case 'pt_0_pt_2': result = (isSubmitted && !(pt_0_pt_2 !== null && pt_0_pt_2 !== '') && enableSportForm) ? "Select a value" : null; break
            case 'pt_0_received_pt_2': result = (isSubmitted && !(pt_0_received_pt_2 !== null && pt_0_received_pt_2 !== '') && enableSportForm) ? "Select a value" : null; break
            case 'pt_0_forced_pt_2': result = (isSubmitted && !(pt_0_forced_pt_2 !== null && pt_0_forced_pt_2 !== '') && enableSportForm) ? "Select a value" : null; break
            case 'pt_0_remaining_pt_2': result = (isSubmitted && !(pt_0_remaining_pt_2 !== null && pt_0_remaining_pt_2 !== '') && enableSportForm) ? "Select a value" : null; break
            default: return null
        }
        return result
    }

    render() {
        const {
            handleChange, handleItemSelection,
            data, selectedItems, enableSportForm, toggleSport, sports_com,
            sports_minPerTicket, sports_maxPerTicket, sports_maxPerGame,
            resetSport, maxValueSport,
            userType, toggleTakeRemaining
        } = this.props

        return (
            <Row>
                <VerticalHeaderActions
                    toggleSwitch={toggleSport}
                    isEnabled={enableSportForm}
                    resetForm={resetSport}
                    maxValueForm={maxValueSport} />

                {userType === 'Agent' && data && data.positionTaking.map((val, i) => {
                    return (
                        <Col sm='6' xs='6' md="6" lg="6" xl='6' key={i}>
                            <Card>
                                <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                    {val.subCategoryName ? val.subCategoryName : formattedMessages.positiontaking}
                                </CardHeader>
                                <CardBody>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.givePt}</label></Col>
                                        <Col xs="6" md="6" sm="6" lg='6' xl='3'>
                                            <InputSelect
                                                type={'hasMinimum'}
                                                handleChange={handleChange}
                                                endNumber={`${val.maxGive}`}
                                                startNumber={`${val.minGive > 0 ? val.minGive : 0}`}
                                                name={`pt_${val.subCategoryId}_pt_${data.categoryId}`}
                                                value={this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`]}
                                                append="%"
                                                className={(this.renderError(`pt_${val.subCategoryId}_pt_${data.categoryId}`) ? 'error' : '')}
                                                error={this.renderError(`pt_${val.subCategoryId}_pt_${data.categoryId}`)}
                                                isDisabled={(enableSportForm) ? false : true}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }} >
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.keepPt}</label></Col>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <InputSelect
                                                type={'hasMinimum'}
                                                handleChange={handleChange}
                                                endNumber={Number(val.total - this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`])}
                                                startNumber={Number(val.uplineForced) - Number(this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`]) < 0 ? 0 :
                                                    Number(val.uplineForced) - Number(this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`])}
                                                name={`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`}
                                                value={this.props[`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`]}
                                                append="%"
                                                className={(this.renderError(`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`) ? 'error' : '')}
                                                error={this.renderError(`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`)}
                                                isDisabled={(enableSportForm) ? false : true}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.forcedpt}</label></Col>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <InputSelect
                                                handleChange={handleChange}
                                                endNumber={val.maxForced > this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`] ? this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`] : `${val.maxForced}`}
                                                name={`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`}
                                                value={this.props[`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`]}
                                                append="%"
                                                className={(this.renderError(`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`) ? 'error' : '')}
                                                error={this.renderError(`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`)}
                                                isDisabled={(enableSportForm) ? false : true}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>{TAKE_REMAINING}</label></Col>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <Switch
                                                onChange={() => toggleTakeRemaining(`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`)}
                                                onColor={ON_COLOR}
                                                offColor={OFF_COLOR}
                                                checked={this.props[`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`]}
                                                uncheckedIcon={<SwitchCheck>{affirmation.no}</SwitchCheck>}
                                                checkedIcon={<SwitchCheck>{affirmation.yes}</SwitchCheck>}
                                                className="noradius"
                                                width={105}
                                                disabled={(enableSportForm) ? false : true}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}


                {userType === 'Member' && data && data.positionTaking.map((val, i) => {
                    return (
                        <Col sm='6' xs='6' md="6" lg="6" xl='6' key={i}>
                            <Card>
                                <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                    {val.subCategoryName ? val.subCategoryName : "Position Taking"}
                                    {/* <span style={{ display: 'inline-block', paddingLeft: 10, fontSize: 11, fontWeight: 400 }}>Max({val.maxGive})</span> */}
                                </CardHeader>
                                <CardBody>
                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.keepPt}</label></Col>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <InputSelect
                                                handleChange={handleChange}
                                                type={'hasMinimum'}
                                                startNumber={`${val.minGive && val.minGive > 0 ? val.minGive : 0}`}
                                                endNumber={`${val.maxGive}`}
                                                name={`pt_${val.subCategoryId}_receive_pt_${data.categoryId}_member`}
                                                value={this.props[`pt_${val.subCategoryId}_receive_pt_${data.categoryId}_member`]}
                                                append="%"
                                                className={(this.renderError(`pt_${val.subCategoryId}_receive_pt_${data.categoryId}_member`) ? 'error' : '')}
                                                error={this.renderError(`pt_${val.subCategoryId}_receive_pt_${data.categoryId}_member`)}
                                                isDisabled={(enableSportForm) ? false : true}
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
                                                    <label style={{ position: 'absolute' }}>{formattedMessages.minMaxPerTicketFm}</label>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
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
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
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
                                                    <label style={{ position: 'absolute' }}>{formattedMessages.maxPerGameFm}</label>
                                                </Col>
                                                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
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

                <Col sm='6' xs='6' md="6" lg="6" xl='6'>
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{sportsRestrictionFm}</CardHeader>
                        <CardBody>
                            <Row>
                                {data && data.sportRestrictions.map((val, i) => {
                                    return (
                                        <Col className='sport-restriction-font' md="4" sm="4" key={i}>
                                            <InputCheckbox
                                                name={`sportRes_${val.sportId}`}
                                                label={`${val.sportName}`}
                                                onChange={(checked, name) => {
                                                    handleItemSelection(checked, name, val.sportId);
                                                }}
                                                checked={selectedItems.includes(val.sportId)}
                                                value={selectedItems.includes(val.sportId)}
                                                isDisable={(!val.isAllowed) ? true : false}
                                                formDisabled={(enableSportForm) ? false : true}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
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
            </Row>
        )
    }
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'


import InputSelect from '../../../components/InputSelect'
import VerticalHeaderActions from './VerticalHeaderActions'
import PositionTaking from './PositionTaking'
import MemberPositionTaking from './MemberPositionTaking';

import { SwitchCheck } from '../styles'
import { FormattedMessage } from 'react-intl'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { affirmation } from '../translation'
import styled from 'styled-components'

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


export default class LiveCasino extends Component {

    renderError = (field) => {

        const {
            isSubmitted, liveCasino_pt,
            enableLiveCasinoForm
        } = this.props

        let result = ''

        switch (field) {
            case 'liveCasino_pt': result = (isSubmitted && !liveCasino_pt && enableLiveCasinoForm) ? "PT is required" : null; break
            default: return null
        }

        return result
    }


    sortLiveCasinoVerticals = (data) => {
        if (data.positionTaking) {

            for (let i = 0; i < data.positionTaking.length; i++) {
                if (data.positionTaking[i].subCategoryId === 4) {
                    data.positionTaking[i].orderNo = 1;
                }

                if (data.positionTaking[i].subCategoryId === 2) {
                    data.positionTaking[i].orderNo = 2;
                }
            }
        }
        return {
            ...data,
            positionTaking: data.positionTaking.sort((a, b) => (a.orderNo > b.orderNo) ? 1 : -1)
        }
    }

    render() {

        const {
            handleChange,
            data, toggleLiveCasino, liveCasino_com,
            resetLiveCasino, enableLiveCasinoForm,
            maxValueLiveCasino,
            userType,
            toggleTakeRemaining,
            toggleBrandRestriction
        } = this.props

        let sortedData = { ...data }
        sortedData = this.sortLiveCasinoVerticals(sortedData)

        const col = '6'
        const rowWidth = '100%'

        return (
            <Row>
                <VerticalHeaderActions
                    toggleSwitch={toggleLiveCasino}
                    isEnabled={enableLiveCasinoForm}
                    resetForm={resetLiveCasino}
                    maxValueForm={maxValueLiveCasino} />

                {userType === 'Agent' &&
                    <Row style={{ marginLeft: 2, width: rowWidth, display: 'flex' }}>
                        {data && sortedData.positionTaking.map((val, i) => {
                            return (
                                <Col sm={col} xs={col} md={col} lg={col} xl={col} key={i}>
                                    <Card>
                                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                            {val.subCategoryName ? val.subCategoryName === 'MicroGaming' ? 'FG - Microgaming' : val.subCategoryName : formattedMessages.positiontaking}
                                        </CardHeader>
                                        <CardBody>

                                            <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.status}</label></Col>
                                                <Col md="6" sm="6" lg='6' xl='3'>

                                                    <select
                                                        name={`liveCasino_brandRestriction_${val.subCategoryId}`}
                                                        onChange={() => toggleBrandRestriction(`liveCasino_brandRestriction_${val.subCategoryId}`)}
                                                        value={this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === true ? '1' : '2'}
                                                        disabled={!enableLiveCasinoForm
                                                            || this.props[`liveCasino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }
                                                        style={{ minWidth: '105px' }}
                                                    >
                                                        <FormattedMessage id='Global.Enable' defaultMessage='Enabled' >
                                                            {enabled =>
                                                                <option value='1'>{enabled}</option>}
                                                        </FormattedMessage>

                                                        <FormattedMessage id='Global.Disabled' defaultMessage='Disabled' >
                                                            {enabled =>
                                                                <option value='2'>{enabled}</option>}
                                                        </FormattedMessage>
                                                    </select>
                                                </Col>
                                            </Row>

                                            <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.givePt}</label></Col>
                                                <Col md="6" sm="6" lg='6' xl='3'>
                                                    <InputSelect
                                                        type={'hasMinimum'}
                                                        handleChange={handleChange}
                                                        endNumber={`${val.maxGive}`}
                                                        startNumber={`${val.minGive && val.minGive > 0 ? val.minGive : 0}`}
                                                        name={`pt_${val.subCategoryId}_pt_${data.categoryId}`}
                                                        value={this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`]}
                                                        append="%"
                                                        className={(this.renderError(`pt_${val.subCategoryId}_pt_${data.categoryId}`) ? 'error' : '')}
                                                        error={this.renderError(`pt_${val.subCategoryId}_pt_${data.categoryId}`)}
                                                        isDisabled={!enableLiveCasinoForm || this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === false
                                                            || this.props[`liveCasino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }
                                                    />
                                                </Col>
                                            </Row>

                                            <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }} >
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.keepPt}</label></Col>
                                                <Col md="6" sm='6' lg='6' xl='3'>
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
                                                        isDisabled={!enableLiveCasinoForm ||
                                                            this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === false
                                                            || this.props[`liveCasino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }
                                                    />
                                                </Col>
                                            </Row>

                                            <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.forcedpt}</label></Col>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <InputSelect
                                                        handleChange={handleChange}
                                                        endNumber={val.maxForced > this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`] ? this.props[`pt_${val.subCategoryId}_pt_${data.categoryId}`] : `${val.maxForced}`}
                                                        name={`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`}
                                                        value={this.props[`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`]}
                                                        append="%"
                                                        className={(this.renderError(`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`) ? 'error' : '')}
                                                        error={this.renderError(`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`)}
                                                        isDisabled={!enableLiveCasinoForm || this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === false
                                                            || this.props[`liveCasino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }
                                                    />
                                                </Col>
                                            </Row>

                                            <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <label style={{ textAlign: 'center' }}>{TAKE_REMAINING}</label></Col>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <Switch
                                                        onChange={() => toggleTakeRemaining(`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`)}
                                                        onColor={ON_COLOR}
                                                        offColor={OFF_COLOR}
                                                        checked={this.props[`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`] ? this.props[`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`] : false}
                                                        uncheckedIcon={<SwitchCheck>{affirmation.no}</SwitchCheck>} // make this a styled component
                                                        checkedIcon={<SwitchCheck>{affirmation.yes}</SwitchCheck>}  // make this a styled component
                                                        className="noradius medium"
                                                        width={105}
                                                        disabled={!enableLiveCasinoForm || this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === false
                                                            || this.props[`liveCasino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }
                                                    />
                                                </Col>

                                                <Col md="6" sm='6' lg='6' xl='3'>

                                                </Col>
                                            </Row>

                                            <Row key={i} style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.commission}</label></Col>
                                                <Col md="6" sm='6' lg='6' xl='3'>
                                                    <InputSelect
                                                        type="commission"
                                                        handleChange={handleChange}
                                                        endNumber={`${val.rate}`}
                                                        name={`liveCasino_com_${val.subCategoryId}`}
                                                        append="%"
                                                        className={(this.renderError(`liveCasino_com_${val.subCategoryId}`) ? 'error' : '')}
                                                        error={this.renderError(`liveCasino_com_${val.subCategoryId}`)}
                                                        isDisabled={!enableLiveCasinoForm || this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === false
                                                            || this.props[`liveCasino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }

                                                        value={this.props[`liveCasino_com_${val.subCategoryId}`]}
                                                    />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                        }
                    </Row>}

                {
                    userType === 'Member' && data && sortedData.positionTaking.map((val, i) => {
                        return (
                            <Col sm='6' xs='6' md="6" lg="6" xl='6' key={i}>
                                <Card>
                                    <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                        {val.subCategoryName ? val.subCategoryName === 'MicroGaming' ? 'FG - Microgaming' : val.subCategoryName : "Position Taking"}
                                    </CardHeader>
                                    <CardBody>

                                        <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                            <Col md="6" sm='6' lg='6' xl='3'>
                                                <label style={{ textAlign: 'center' }}>{formattedMessages.status}</label></Col>
                                            <Col md="6" sm="6" lg='6' xl='3'>

                                                <select
                                                    name={`liveCasino_brandRestriction_${val.subCategoryId}`}
                                                    onChange={() => toggleBrandRestriction(`liveCasino_brandRestriction_${val.subCategoryId}`)}
                                                    value={this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === true ? '1' : '2'}
                                                    disabled={!(enableLiveCasinoForm)}
                                                    style={{ minWidth: '105px' }}
                                                >
                                                    <FormattedMessage id='Global.Enable' defaultMessage='Enabled' >
                                                        {enabled =>
                                                            <option value='1'>{enabled}</option>}
                                                    </FormattedMessage>

                                                    <FormattedMessage id='Global.Disabled' defaultMessage='Disabled' >
                                                        {enabled =>
                                                            <option value='2'>{enabled}</option>}
                                                    </FormattedMessage>
                                                </select>
                                            </Col>
                                        </Row>

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
                                                    isDisabled={(enableLiveCasinoForm) ? false : true}
                                                />
                                            </Col>
                                        </Row>

                                        <Row key={i} style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                            <Col md="6" sm='6' lg='6' xl='3'>
                                                <label style={{ textAlign: 'center' }}>{formattedMessages.commission}</label></Col>
                                            <Col md="6" sm='6' lg='6' xl='3'>
                                                <InputSelect
                                                    type="commission"
                                                    handleChange={handleChange}
                                                    endNumber={`${val.rate}`}
                                                    name={`liveCasino_com_${val.subCategoryId}`}
                                                    append="%"
                                                    className={(this.renderError(`liveCasino_com_${val.subCategoryId}`) ? 'error' : '')}
                                                    error={this.renderError(`liveCasino_com_${val.subCategoryId}`)}
                                                    isDisabled={!enableLiveCasinoForm || this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === false
                                                        || this.props[`liveCasino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                    }
                                                    value={this.props[`liveCasino_com_${val.subCategoryId}`]}
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row >
        )
    }
}
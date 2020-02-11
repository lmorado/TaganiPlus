import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'

import { FormattedMessage } from 'react-intl'
import Switch from 'react-switch'

import InputSelect from '../../../../components/InputSelect'
import VerticalHeaderActions from '../VerticalHeaderActions'
import Input from '../../../../components/Input'
import { SwitchCheck } from '../../styles'
import { formattedMessages } from '../../../../translations/formattedMessageTranslation'
import { affirmation } from '../../translation'

const ON_COLOR = '#1f8443', OFF_COLOR = '#bf0505', TAKE_REMAINING = 'Take Remaining?'


export default class VerticalCasinoUpdate extends Component {

    static = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
        isDisabled: PropTypes.bool,
    }


    sortGamesVerticals = (data) => {

        if (data.positionTaking) {

            for (let i = 0; i < data.positionTaking.length; i++) {

                if (data.positionTaking[i].subCategoryId === 10) {
                    data.positionTaking[i].orderNo = 1;
                }

                if (data.positionTaking[i].subCategoryId === 5) {
                    data.positionTaking[i].orderNo = 2;
                }


                if (data.positionTaking[i].subCategoryId === 7) {
                    data.positionTaking[i].orderNo = 3;
                }

                if (data.positionTaking[i].subCategoryId === 4) {
                    data.positionTaking[i].orderNo = 4;
                }
            }
        }

        return {
            ...data,
            positionTaking: data.positionTaking.sort((a, b) => (a.orderNo > b.orderNo) ? 1 : -1)
        }
    }

    render() {
        const { handleChange, data, userType, toggleCasino,
            enableCasinoForm,
            enableCasinoFormChange, toggleBrandRestriction
        } = this.props



        let sortedData = { ...data }
        sortedData = this.sortGamesVerticals(sortedData)

        return (
            <Row>

                <VerticalHeaderActions
                    disabled={!enableCasinoFormChange}
                    toggleSwitch={toggleCasino}
                    isEnabled={enableCasinoForm}
                />


                {userType === 'Agent' &&
                    <Row style={{ marginLeft: 2, width: '100%', display: 'flex' }}>
                        {data && sortedData.positionTaking.map((val, i) => {
                            return (
                                <Col xs='6' sm='6' md="6" lg="6" xl='6' key={i}>
                                    <Card>
                                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                            {val.subCategoryName ? val.subCategoryName : "Position Taking"}
                                        </CardHeader>
                                        <CardBody>

                                            <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.status}</label></Col>
                                                <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                                    <select
                                                        name={`casino_brandRestriction_${val.subCategoryId}`}
                                                        onChange={() => toggleBrandRestriction(`casino_brandRestriction_${val.subCategoryId}`)}
                                                        value={this.props[`casino_brandRestriction_${val.subCategoryId}`] === true ? '1' : '2'}
                                                        disabled={!(enableCasinoForm)
                                                            || this.props[`casino_brandRestriction_${val.subCategoryId}_isEditable`] === false
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
                                                        disabled
                                                        handleChange={handleChange}
                                                        name={`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`}
                                                        value={(val.receive) + ' %'} />
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

                                            <Row key={i} style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.commission}</label></Col>
                                                <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                                    <InputSelect
                                                        type="commission"
                                                        handleChange={handleChange}
                                                        endNumber={`${val.rate}`}
                                                        name={`casino_com_${val.subCategoryId}`}
                                                        append="%"
                                                        isDisabled={!enableCasinoForm || this.props[`casino_brandRestriction_${val.subCategoryId}`] === false
                                                            || this.props[`casino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }
                                                        value={this.props[`casino_com_${val.subCategoryId}`]}
                                                        style={{ width: '105px', padding: '0.375rem 0.75rem' }}
                                                    />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>}



                {userType === 'Member' &&
                    <Row style={{ marginLeft: 2, width: '100%', display: 'flex' }}>
                        {data && sortedData.positionTaking.map((val, i) => {
                            return (
                                <Col xs='6' sm='6' md="6" lg="6" xl='6' key={i}>
                                    <Card>
                                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                            {val.subCategoryName ? val.subCategoryName : formattedMessages.positiontaking}

                                        </CardHeader>
                                        <CardBody>

                                            <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.status}</label></Col>
                                                <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                                    <select
                                                        name={`casino_brandRestriction_${val.subCategoryId}`}
                                                        onChange={() => toggleBrandRestriction(`casino_brandRestriction_${val.subCategoryId}`)}
                                                        value={this.props[`casino_brandRestriction_${val.subCategoryId}`] === true ? '1' : '2'}
                                                        disabled={!(enableCasinoForm)
                                                            || this.props[`casino_brandRestriction_${val.subCategoryId}_isEditable`] === false
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

                                            <Row key={i} style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                                <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                                    <label style={{ textAlign: 'center' }}>{formattedMessages.commission}</label></Col>
                                                <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                                    <InputSelect
                                                        type="commission"
                                                        handleChange={handleChange}
                                                        endNumber={`${val.rate}`}
                                                        name={`casino_com_${val.subCategoryId}`}
                                                        append="%"
                                                        isDisabled={!enableCasinoForm || this.props[`casino_brandRestriction_${val.subCategoryId}`] === false
                                                            || this.props[`casino_brandRestriction_${val.subCategoryId}_isEditable`] === false
                                                        }
                                                        value={this.props[`casino_com_${val.subCategoryId}`]}
                                                        style={{ width: '105px', padding: '0.375rem 0.75rem' }}
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
            </Row>
        )
    }
}
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

export default class VerticalLiveCasinoUpdate extends Component {

    static = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
        isDisabled: PropTypes.bool,
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

        const { data, handleChange, userType,
            toggleLiveCasino,
            enableLiveCasinoForm,
            enableLiveCasinoFormChange,
            toggleBrandRestriction,
        } = this.props


        let sortedData = { ...data }
        sortedData = this.sortLiveCasinoVerticals(sortedData)


        return (
            <Row>
                <VerticalHeaderActions
                    disabled={!enableLiveCasinoFormChange}
                    toggleSwitch={toggleLiveCasino}
                    isEnabled={enableLiveCasinoForm}
                />

                {userType === 'Agent' && data && sortedData.positionTaking.map((val, i) => {
                    return (
                        <Col xs='6' sm='6' md="6" lg="6" xl='6' key={i}>
                            <Card>
                                <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                    {val.subCategoryName ? val.subCategoryName === 'MicroGaming' ? 'FG - Microgaming' : val.subCategoryName : "Position Taking"}
                                </CardHeader>
                                <CardBody>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.status}</label></Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                            <select
                                                name={`liveCasino_brandRestriction_${val.subCategoryId}`}
                                                onChange={() => toggleBrandRestriction(`liveCasino_brandRestriction_${val.subCategoryId}`)}
                                                value={this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === true ? '1' : '2'}
                                                disabled={!(enableLiveCasinoForm)
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
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>{formattedMessages.givePt}</Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>

                                            <Input type="text"
                                                handleChange={handleChange}
                                                name={`pt_${val.subCategoryId}_pt_${data.categoryId}`}
                                                value={`${val.give} % `}
                                                disabled
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }} >
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>{formattedMessages.keepPt}</Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                            <Input type="text"
                                                handleChange={handleChange}
                                                name={`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`}
                                                value={(val.receive) + ' %'} disabled />
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

                                    <Row key={i} style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.commission}</label></Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                            <InputSelect
                                                type="commission"
                                                handleChange={handleChange}
                                                endNumber={`${val.rate}`}
                                                name={`liveCasino_com_${val.subCategoryId}`}
                                                append="%"
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
                })}

                {userType === 'Member' && userType === 'Member' && data && sortedData.positionTaking.map((val, i) => {
                    return (
                        <Col xs='6' sm='6' md="6" lg="6" xl='6' key={i}>
                            <Card>
                                <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                    {val.subCategoryName ? val.subCategoryName === 'MicroGaming' ? 'FG - Microgaming' : val.subCategoryName : formattedMessages.positiontaking}
                                </CardHeader>
                                <CardBody>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col xs='6' sm='6' md="6" lg="6" xl='4'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.status}</label></Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                            <select
                                                name={`liveCasino_brandRestriction_${val.subCategoryId}`}
                                                onChange={() => toggleBrandRestriction(`liveCasino_brandRestriction_${val.subCategoryId}`)}
                                                value={this.props[`liveCasino_brandRestriction_${val.subCategoryId}`] === true ? '1' : '2'}
                                                disabled={!(enableLiveCasinoForm)
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
                                                name={`liveCasino_com_${val.subCategoryId}`}
                                                append="%"
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
                })}
            </Row>
        )
    }
}
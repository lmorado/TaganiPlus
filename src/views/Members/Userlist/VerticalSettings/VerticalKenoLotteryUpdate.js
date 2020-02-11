import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'

import Switch from 'react-switch'

import InputSelect from '../../../../components/InputSelect'
import VerticalHeaderActions from '../VerticalHeaderActions'
import Input from '../../../../components/Input'
import { SwitchCheck } from '../../styles'
import { formattedMessages } from '../../../../translations/formattedMessageTranslation'
import { affirmation } from '../../translation'

const ON_COLOR = '#1f8443', OFF_COLOR = '#bf0505', TAKE_REMAINING = 'Take Remaining?'

export default class VerticalKenoLotterUpdate extends Component {

    static = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
        isDisabled: PropTypes.bool,
    }

    render() {

        const { data, handleChange, userType,
            toggleKenoLottery,
            enableKenoLotteryForm,
            enableKenoLotteryFormChange,
            kenoLottery_com
        } = this.props

        return (
            <Row>
                <VerticalHeaderActions
                    disabled={!enableKenoLotteryFormChange}
                    toggleSwitch={toggleKenoLottery}
                    isEnabled={enableKenoLotteryForm}
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
                                    {val.subCategoryName ? val.subCategoryName : formattedMessages.positiontaking}
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

                <Col xs='6' sm='6' md="6" lg="6" xl='6'>
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
                                                name="kenoLottery_com"
                                                append="%"
                                                isDisabled={(enableKenoLotteryForm) ? false : true}
                                                value={kenoLottery_com}
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
import React, { Component } from 'react'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Tooltip
} from 'reactstrap'

import Switch from 'react-switch'

import InputSelect from '../../../components/InputSelect'
import { SwitchCheck } from '../styles'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { copyPtFm, copyHelpFm, affirmation } from '../translation'

const TAKE_REMAINING = 'Take Remaining?'

// const Input = styled.input`
//     display: block;
//     width: 100%;
//     height: calc(2.0625rem + 2px);
//     padding: 0.375rem 0.75rem;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     color: #5c6873;
//     background-color: #fff;
//     background-clip: padding-box;
//     border: 1px solid #e4e7ea;
//     transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

//     :focus {
//         color: #5c6873;
//         background-color: #fff;
//         border-color: #8ad4ee;
//         outline: 0;
//         box-shadow: 0 0 0 0.2rem rgba(32,168,216,.25);
//     }

//     &.error {
//         border: 1px solid red;
//     }

//     &:disabled {
//         cursor: not-allowed;
//         pointer-events: all !important
//     }
// `

export default class PositionTaking extends Component {


    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    static propTypes = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
        renderError: PropTypes.func,
        maxSoccerForm: PropTypes.bool,
        enableForm: PropTypes.bool,
    }


    render() {
        const {
            data, handleChange, renderError, enableForm,
            enableCopyPT, enableCopyPTFrom,
            togglePTSettings, copyPTChecked, casino,
            toggleTakeRemaining,
            cricket
        } = this.props

        const col = enableCopyPTFrom === 'Soccer' || cricket || casino ? '6' : '12'
        const rowWidth = enableCopyPTFrom === 'Soccer' || cricket || casino ? '100%' : '50%'

        return (
            <Row style={{ marginLeft: 2, width: rowWidth, display: 'flex' }}>
                {data && data.positionTaking.map((val, i) => {
                    return (
                        <Col sm={col} xs={col} md={col} lg={col} xl={col} key={i}>
                            <Card>
                                <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>
                                    {val.subCategoryName ? val.subCategoryName : formattedMessages.positiontaking}
                                </CardHeader>
                                <CardBody>
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
                                                className={(renderError(`pt_${val.subCategoryId}_pt_${data.categoryId}`) ? 'error' : '')}
                                                error={renderError(`pt_${val.subCategoryId}_pt_${data.categoryId}`)}
                                                isDisabled={(enableForm) ? false : true}
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
                                                className={(renderError(`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`) ? 'error' : '')}
                                                error={renderError(`pt_${val.subCategoryId}_receive_pt_${data.categoryId}`)}
                                                isDisabled={(enableForm) ? false : true}
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
                                                className={(renderError(`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`) ? 'error' : '')}
                                                error={renderError(`pt_${val.subCategoryId}_forced_pt_${data.categoryId}`)}
                                                isDisabled={(enableForm) ? false : true}
                                            />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: 10, borderBottom: '1px solid #c0c0c0', paddingBottom: 10 }}>
                                        <Col md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>{TAKE_REMAINING}</label></Col>
                                        <Col md="6" sm='6' lg='6' xl='3'>
                                            <Switch
                                                onChange={() => toggleTakeRemaining(`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`)}
                                                onColor="#1f8443"
                                                offColor="#bf0505"
                                                checked={this.props[`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`] ? this.props[`pt_${val.subCategoryId}_take_remaining_pt_${data.categoryId}`] : false}
                                                uncheckedIcon={<SwitchCheck>{affirmation.no}</SwitchCheck>} // make this a styled component
                                                checkedIcon={<SwitchCheck>{affirmation.yes}</SwitchCheck>}  // make this a styled component
                                                className="noradius medium"
                                                width={105}
                                                disabled={(enableForm) ? false : true}
                                            />
                                        </Col>

                                        <Col md="6" sm='6' lg='6' xl='3'>

                                        </Col>

                                        {enableCopyPTFrom === 'Soccer' && Number(data.categoryId) === 1 && Number(val.subCategoryId) === 1
                                            &&
                                            <div style={{ display: 'flex' }}>
                                                <div onClick={enableCopyPT && togglePTSettings} className={enableCopyPT ? 'copy-pt-enabled' : 'copy-pt-disabled'}>
                                                    {copyPTChecked ? <i className="fa fa-check check-icon" /> : <label className='check-icon'></label>}
                                                    {copyPtFm}
                                                </div>
                                                <i className="fa fa-info-circle fa-lg copyPTtooltip"
                                                    id="copyPTToolTip" ></i>

                                                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="copyPTToolTip" toggle={this.toggle}>
                                                    {copyHelpFm}
                                                </Tooltip>
                                            </div>
                                        }
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
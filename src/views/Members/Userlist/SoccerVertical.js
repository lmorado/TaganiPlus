import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'
import InputSelect from '../../../components/InputSelect'
import InputText from '../../../components/InputText'
import { subtractTwoValue, formatCurrency } from '../../../utils/helpers'
// import VerticalHeaderActions from './VerticalHeaderActions'
// // import PositionTaking from './PositionTaking'
// // import MemberPositionTaking from './MemberPositionTaking';


export default class SoccerVertical extends Component {

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
            commission, enableSoccerForm,
            pt_1_pt_1, pt_1_received_pt_1, pt_1_forced_pt_1, pt_1_remaining_pt_1,
            pt_2_pt_1, pt_2_received_pt_1, pt_2_forced_pt_1, pt_2_remaining_pt_1
        } = this.props


        let result = ''
        switch (field) {
            case 'soccer_minPerTicket':
                if (isSubmitted && !soccer_minPerTicket && enableSoccerForm && !soccer_maxPerTicket) {
                    result = "Minimum amount is required"
                } else if (limitValue > Number(soccer_minPerTicket) && enableSoccerForm && soccer_minPerTicket) {
                    result = `Value should be at least ${formatCurrency(limitValue)}`
                } else if ((Number(soccer_minPerTicket) > altLimitValue || Number(soccer_minPerTicket) > Number(soccer_maxPerTicket)) && enableSoccerForm) {
                    if(Number(soccer_minPerTicket) > Number(soccer_maxPerTicket) && Number(soccer_maxPerTicket) >= limitValue && soccer_maxPerTicket <= altLimitValue)
                    result = `Value should not exceed ${formatCurrency(soccer_maxPerTicket)}`
                    if( Number(soccer_minPerTicket) > altLimitValue)
                    result = `Value should not exceed ${formatCurrency(altLimitValue)}`
                }
                break
            case 'soccer_maxPerTicket':
                if (isSubmitted && !soccer_maxPerTicket && enableSoccerForm) {
                    result = "Maximum amount is required"
                } else if (Number(soccer_maxPerTicket) > limitValue && enableSoccerForm) {
                    result = `Value should not exceed ${formatCurrency(limitValue)}`
                } else if ((altLimitValue > Number(soccer_maxPerTicket) || Number(soccer_minPerTicket) > Number(soccer_maxPerTicket)) && enableSoccerForm && soccer_maxPerTicket) {
                    if(Number(soccer_maxPerTicket) > Number(soccer_minPerTicket) && Number(soccer_minPerTicket) < limitValue && soccer_minPerTicket >= altLimitValue)
                    result = `Value should be at least ${formatCurrency(soccer_minPerTicket)}`
                    if( Number(soccer_maxPerTicket) < altLimitValue)
                    result = `Value should be at least ${formatCurrency(altLimitValue)}`
                }
                break
            case 'soccer_minPerGame':
                if (isSubmitted && !soccer_minPerGame && enableSoccerForm) {
                    result = "Minimum amount is required"
                } else if (limitValue > Number(soccer_minPerGame) && enableSoccerForm && soccer_minPerGame) {
                    result = `Value should be at least ${formatCurrency(limitValue)}`
                } else if ((Number(soccer_minPerGame) > altLimitValue || Number(soccer_minPerGame) > Number(soccer_maxPerGame)) && enableSoccerForm) {
                    if(Number(soccer_minPerGame) > Number(soccer_maxPerGame) && Number(soccer_maxPerGame) >= limitValue && soccer_maxPerGame <= altLimitValue)
                    result = `Value should not exceed ${formatCurrency(soccer_maxPerGame)}`
                    if( Number(soccer_minPerGame) > altLimitValue)
                    result = `Value should not exceed ${formatCurrency(altLimitValue)}`
                }
                break
            case 'soccer_maxPerGame':
                if (isSubmitted && !soccer_maxPerGame && enableSoccerForm) {
                    result = "Maximum amount is required"
                } else if (Number(soccer_maxPerGame) > limitValue && enableSoccerForm) {
                    result = `Value should not exceed ${formatCurrency(limitValue)}`
                } else if ((altLimitValue > Number(soccer_maxPerGame) || Number(soccer_minPerGame) > Number(soccer_maxPerGame)) && enableSoccerForm && soccer_maxPerGame) {
                    if(Number(soccer_maxPerGame) > Number(soccer_minPerGame) && Number(soccer_minPerGame) < limitValue && soccer_minPerGame >= altLimitValue)
                    result = `Value should be at least ${formatCurrency(soccer_minPerGame)}`
                    if( Number(soccer_maxPerGame) < altLimitValue)
                    result = `Value should be at least ${formatCurrency(altLimitValue)}`
                }
                break
            case 'commission': result = (isSubmitted && !commission && enableSoccerForm) ? "Commission is required" : null; break
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
            handleChange, data, toggleSoccer, enableSoccerForm, resetSoccer, resetSoccerState,
            soccer_minPerTicket, soccer_maxPerTicket, soccer_minPerGame, soccer_maxPerGame,
            soccer_commission, maxValueSoccer, userType,
            enableCopyPT, togglePTSettings, copyPTChecked
        } = this.props


        return (
            <Row>
                {/* <VerticalHeaderActions
                    toggleSwitch={toggleSoccer}
                    isEnabled={enableSoccerForm}
                    resetForm={resetSoccer}
                    maxValueForm={maxValueSoccer} /> */}

                {/* {userType === 'Agent' ?
                    <PositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableSoccerForm}
                        {...this.props}
                        enableCopyPT={enableCopyPT}
                        enableCopyPTFrom={'Soccer'}
                        togglePTSettings={togglePTSettings}
                        copyPTChecked={copyPTChecked}
                    /> :

                    <MemberPositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableSoccerForm}
                        {...this.props}
                        enableCopyPT={enableCopyPT}
                        enableCopyPTFrom={'Soccer'}
                        togglePTSettings={togglePTSettings}
                        copyPTChecked={copyPTChecked} />} */}

                <Col md="12" lg="6">
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>Bet Setting</CardHeader>
                        <CardBody>
                            {data && data.betSettings.map((val, i) => {
                                return (
                                    <div key={i}>
                                        <Row>
                                            <Col md="6">
                                                <InputText
                                                    type="number"
                                                    name="soccer_minPerTicket"
                                                    labelName="Min/Max Per Ticket"
                                                    handleChange={handleChange}
                                                    className={(this.renderError('soccer_minPerTicket', val.minPerTicket, val.maxPerTicket) ? 'error' : '')}
                                                    defValue={soccer_minPerTicket}
                                                    error={this.renderError('soccer_minPerTicket', val.minPerTicket, val.maxPerTicket)}
                                                    hint={`Minimum is ${formatCurrency(val.minPerTicket)}`}
                                                    isDisabled={(enableSoccerForm) ? false : true}
                                                />
                                            </Col>
                                            <Col md="6">
                                                <InputText
                                                    type="number"
                                                    name="soccer_maxPerTicket"
                                                    handleChange={handleChange}
                                                    className={(this.renderError('soccer_maxPerTicket', val.maxPerTicket, val.minPerTicket) ? 'error' : '')}
                                                    defValue={soccer_maxPerTicket}
                                                    error={this.renderError('soccer_maxPerTicket', val.maxPerTicket, val.minPerTicket)}
                                                    hint={`Maximum is ${formatCurrency(val.maxPerTicket)}`}
                                                    isDisabled={(enableSoccerForm) ? false : true}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <InputText
                                                    type="number"
                                                    name="soccer_minPerGame"
                                                    labelName="Min/Max Per Game"
                                                    handleChange={handleChange}
                                                    className={(this.renderError('soccer_minPerGame', val.minPerGame, val.maxPerGame) ? 'error' : '')}
                                                    defValue={soccer_minPerGame}
                                                    error={this.renderError('soccer_minPerGame', val.minPerGame, val.maxPerGame)}
                                                    hint={`Minimum is ${formatCurrency(val.minPerGame)}`}
                                                    isDisabled={(enableSoccerForm) ? false : true}
                                                />
                                            </Col>
                                            <Col md="6">
                                                <InputText
                                                    type="number"
                                                    name="soccer_maxPerGame"
                                                    handleChange={handleChange}
                                                    className={(this.renderError('soccer_maxPerGame', val.maxPerGame, val.minPerGame) ? 'error' : '')}
                                                    defValue={soccer_maxPerGame}
                                                    error={this.renderError('soccer_maxPerGame', val.maxPerGame, val.minPerGame)}
                                                    hint={`Maximum is ${formatCurrency(val.maxPerGame)}`}
                                                    isDisabled={(enableSoccerForm) ? false : true}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })}
                        </CardBody>
                    </Card>
                </Col>
                <Col sm='6' xs='12' md="12" lg="6" xl='6' >
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>Commission Setting</CardHeader>
                        <CardBody>
                            {data && data.commissions.map((val, i) => {
                                return (
                                    <Row key={i}>
                                        <Col xs="6" md="6" sm='6' lg='6' xl='3'>
                                            <label style={{ textAlign: 'center' }}>Commission</label></Col>
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

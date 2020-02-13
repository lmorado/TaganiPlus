import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Button,
    Alert,
    Row,
    Col
} from 'reactstrap'

import { Capitalize } from '../../../utils/helpers'
import AccountDetailsTable from '../../../components/AccountDetailsTable'
import Tabs from '../../../components/Tabs'
import VerticalSoccerUpdate from './VerticalSettings/VerticalSoccerUpdate'
import VerticalCricketUpdate from './VerticalSettings/VerticalCricketUpdate'
import VerticalSportsUpdate from './VerticalSettings/VerticalSportsUpdate'
import VerticalParlayUpdate from './VerticalSettings/VerticalParlayUpdate'
import VerticalCasinoUpdate from './VerticalSettings/VerticalCasinoUpdate'
import VerticalVirtualUpdate from './VerticalSettings/VerticalVirtualUpdate'
import VerticalLiveCasinoUpdate from './VerticalSettings/VerticalLiveCasinoUpdate'
import VerticalKenoLotteryUpdate from './VerticalSettings/VerticalKenoLotteryUpdate'

import PaymentSettings from '../../../components/PaymentSettings'
import MaintenancePage from '../../../components/MaintenancePage'
import MemberSettings from '../../../components/MemberSettings'

import { getMemberDetails } from '../../../actions/members/memberDetailsAction'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { phoneRegex, nameRegex } from '../../../utils/helpers'

import {
    nameIsRequired
} from '../../../utils/actionsTranslation'


const CHECK_HIGHLIGHTED_FIELD = 'Please check highlighted field/s.', AT_LEAST_ONE_VERTICAL = 'You must enable at least 1 vertical.', FILL_OUT_VERTICAL = 'Please fill out the vertical settings or disable each form if not neccesarry.'

class ViewMemberDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isValidToSave: false,
        }

        this.props.getMemberDetails(this.props.userId)
    }


    renderError = (field) => {
        const { telephoneEdit, nameEdit } = this.props
        let result = ''

        switch (field) {
            case 'nameEdit':
                if (!nameEdit) {
                    result = nameIsRequired();
                } else if (nameEdit && (!nameRegex.test(nameEdit) || nameEdit.length > 30)) {
                    result = 'Name is invalid'
                }
                break
            case 'telephoneEdit':
                if (telephoneEdit && !phoneRegex.test(telephoneEdit)) {
                    result = 'Telephone number is invalid'
                }
                else if (telephoneEdit && (telephoneEdit.length > 15 || telephoneEdit.length < 7))
                    result = 'Telephone number is invalid'
                break
            default: return result
        }
        return result
    }

    render() {
        const {
            loadingMemberDetails, error, memberDetails, message, userType,
            handleUpdate,
            handleChange,
            nameEdit, telephoneEdit,
            toggleSwitch,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            clearValue,
            onSave,
            isFormTouched,
            toggleSoccer,
            toggleCricket,
            toggleSports,
            handleItemSelection,
            toggleParlay,
            toggleCasino,
            toggleLiveCasino,
            toggleKenoLottery,
            toggleVirtual,
            isSoccerValid,
            isCricketValid,
            isSportsValid,
            isParlayValid,
            isCasinoValid,
            isLiveCasinoIsValid,
            isKenoLotteryIsValid,
            isVirtualValid,
            enableSoccerForm, enableSportForm, enableParlayForm, enableCasinoForm,
            enableVirtualForm, enableLiveCasinoForm, enableKenoLotteryForm, toggleBrandRestriction
        } = this.props

        const nameValid = nameEdit && nameRegex.test(nameEdit) && nameEdit.length < 30
        const telephoneValid = !telephoneEdit || (phoneRegex.test(telephoneEdit) && telephoneEdit.length <= 15 &&
            telephoneEdit.length >= 7)
        const isDayValid = monday || tuesday || wednesday || thursday || friday || saturday || sunday || memberDetails.isCashPlayer
        const isVerticalsValid = isSoccerValid() && isSportsValid() & isParlayValid() && isCasinoValid() && isLiveCasinoIsValid() && isKenoLotteryIsValid() && isVirtualValid() && isCricketValid()
        const hasOneActiveVertical = enableSoccerForm || enableSportForm || enableParlayForm || enableCasinoForm || enableVirtualForm || enableLiveCasinoForm || enableKenoLotteryForm
        const isSaveAllowed = isVerticalsValid && hasOneActiveVertical && telephoneValid && nameValid && isDayValid

        if (loadingMemberDetails) return <div>{formattedMessages.pleasewait}</div>


        if (error) return <MaintenancePage message={message} />

        return (
            <div className='animated fadeIn' style={{ height: 700, overflowY: 'auto', overflowX: 'hidden' }}>

                {(!telephoneValid || !nameValid) &&
                    <Alert color='danger'> {CHECK_HIGHLIGHTED_FIELD} </Alert>
                }

                <AccountDetailsTable
                    memberDetails={memberDetails}
                    nameEdit={nameEdit}
                    handleChange={handleChange}
                    isEditAllowed={true}
                    telephoneEdit={telephoneEdit}
                    renderError={this.renderError}
                />

                {memberDetails.userType === 30 &&
                    <MemberSettings
                        handleChange={handleChange}
                        language={memberDetails.languageId}
                        lineType={memberDetails.lineType}
                        viewType={memberDetails.viewType}
                        oddsType={memberDetails.oddsFormat}
                        isEditable={false}
                    />
                }


                {!(monday || tuesday || wednesday || thursday || friday || saturday || sunday) && !memberDetails.isCashPlayer &&
                    <Alert color='danger'>{formattedMessages.transferdaywarning}</Alert>
                }

                {!memberDetails.isCashPlayer &&
                    <PaymentSettings
                        isDisabled={false}
                        monday={monday}
                        tuesday={tuesday}
                        wednesday={wednesday}
                        thursday={thursday}
                        friday={friday}
                        saturday={saturday}
                        sunday={sunday}
                        handleSwitchChange={toggleSwitch}
                    />
                }

                {!hasOneActiveVertical &&
                    <Alert color='danger'>{AT_LEAST_ONE_VERTICAL}</Alert>
                }

                {!isVerticalsValid &&
                    <Alert color='danger'>{FILL_OUT_VERTICAL}</Alert>
                }

                <Tabs minHeight='500'>
                    <div label={formattedMessages.soccer}>
                        <VerticalSoccerUpdate
                            handleUpdate={handleUpdate}
                            data={memberDetails.categorySoccer}
                            handleChange={handleChange}
                            toggleSoccer={toggleSoccer}
                            {...this.props}
                            userType={Capitalize(userType)}
                        />
                    </div>
                    <div label={formattedMessages.sports}>
                        <VerticalSportsUpdate
                            handleUpdate={handleUpdate}
                            data={memberDetails.categorySports}
                            handleChange={handleChange}
                            handleItemSelection={handleItemSelection}
                            toggleSports={toggleSports}
                            {...this.props}
                            userType={Capitalize(userType)}
                        />
                    </div>
                    <div label={formattedMessages.parlay}>
                        <VerticalParlayUpdate
                            handleUpdate={handleUpdate}
                            data={memberDetails.categoryParlay}
                            handleChange={handleChange}
                            toggleParlay={toggleParlay}
                            {...this.props}
                            userType={Capitalize(userType)}
                        />
                    </div>

                    <div label={formattedMessages.virtual}>
                        <VerticalVirtualUpdate
                            handleChange={handleChange}
                            data={memberDetails.categoryVirtual}
                            toggleVirtual={toggleVirtual}
                            {...this.props}
                            userType={Capitalize(userType)}
                        />
                    </div>

                    <div label='Live Casino'>
                        <VerticalLiveCasinoUpdate
                            handleChange={handleChange}
                            data={memberDetails.categoryLiveCasino}
                            toggleLiveCasino={toggleLiveCasino}
                            {...this.props}
                            userType={Capitalize(userType)}
                            toggleBrandRestriction={toggleBrandRestriction} />
                    </div>

                    <div label='Games'>
                        <VerticalCasinoUpdate
                            handleUpdate={handleUpdate}
                            handleChange={handleChange}
                            data={memberDetails.categoryGames}
                            toggleCasino={toggleCasino}
                            {...this.props}
                            userType={Capitalize(userType)}
                            toggleBrandRestriction={toggleBrandRestriction}
                        />
                    </div>

                    <div label={'Cricket'}>
                        <VerticalCricketUpdate
                            handleUpdate={handleUpdate}
                            data={memberDetails.categoryCricket}
                            handleChange={handleChange}
                            toggleCricket={toggleCricket}
                            {...this.props}
                            userType={Capitalize(userType)}
                        />
                    </div>

                    <div label='Keno/Lottery'>
                        <VerticalKenoLotteryUpdate
                            handleChange={handleChange}
                            data={memberDetails.categoryLotto}
                            toggleKenoLottery={toggleKenoLottery}
                            {...this.props}
                            userType={Capitalize(userType)} />
                    </div>
                </Tabs>

                <hr />

                <Row style={{ marginBottom: 10, marginRight: 5 }}>
                    <Col md='12'>
                        <div className='align-right'>
                            <Button color='secondary'
                                style={{ marginRight: 10 }}
                                onClick={clearValue}>
                                {formattedMessages.close}
                            </Button>
                            <Button onClick={onSave}
                                className='btn-danger'
                                disabled={!isFormTouched || !isSaveAllowed}>{formattedMessages.save}</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loadingMemberDetails: state.memberDetail.loading,
    error: state.memberDetail.error,
    message: state.memberDetail.message,
    userId: (state.modal.modalProps.userInfo !== 0) ? state.modal.modalProps.userInfo : '',
    memberDetails: state.memberDetail.details
})

const mapDispatchToProps = dispatch => ({
    getMemberDetails: (id) => dispatch(getMemberDetails(id)),
})

PropTypes.ViewMemberDetail = {
    loadingMemberDetails: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    message: PropTypes.string,
    userId: PropTypes.number.isRequired,
    memberDetails: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMemberDetail)

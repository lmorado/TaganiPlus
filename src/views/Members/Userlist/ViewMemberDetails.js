import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AccountDetailsTable from '../../../components/AccountDetailsTable'

import { getMemberDetails } from '../../../actions/members/memberDetailsAction'

import { Capitalize } from '../../../utils/helpers'

import Tabs from '../../../components/Tabs'

import VerticalSoccer from '../../../components/VerticalSoccer'
import VerticalSports from '../../../components/VerticalSports'
import VerticalParlay from '../../../components/VerticalParlay'
import VerticalCasino from '../../../components/VerticalCasino'
import VerticalVirtual from '../../../components/VerticalVirtual'
import VerticalLiveCasino from '../../../components/VerticalLiveCasino'
import VerticalKenoLottery from '../../../components/VerticalKenoLottery'
import VerticalCricket from '../../../components/VerticalCricket';

import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import PaymentSettings from '../../../components/PaymentSettings'
import MaintenancePage from '../../../components/MaintenancePage'
import MemberSettings from '../../../components/MemberSettings'


class ViewMemberDetails extends Component {

    componentDidMount() {
        this.props.dispatch(getMemberDetails(this.props.userId))
    }

    state = {
        monday: true
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggleSwitch = day => {
        const { memberDetails } = this.props
        if (day === 'mon') this.setState({ monday: !memberDetails.transferSettings.monday })
        else if (day === 'tue') this.setState({ tuesday: !memberDetails.transferSettings.tuesday })
        else if (day === 'wed') this.setState({ wednesday: !memberDetails.transferSettings.wednesday })
        else if (day === 'thu') this.setState({ thursday: !memberDetails.transferSettings.thursday })
        else if (day === 'fri') this.setState({ friday: !memberDetails.transferSettings.friday })
        else if (day === 'sat') this.setState({ saturday: !memberDetails.transferSettings.saturday })
        else if (day === 'sun') this.setState({ sunday: !memberDetails.transferSettings.sunday })
    }

    handleDailySched = () => this.setState({ monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: true, dailyPayment: true })
    handleWeeklySched = () => this.setState({ monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false, dailyPayment: false })

    render() {
        const { loadingMemberDetails, error, memberDetails, message, userType } = this.props

        if (loadingMemberDetails) return <div>{formattedMessages.pleasewait}</div>
        if (error) return <MaintenancePage message={message} />

        return (
            <div className='animated fadeIn' style={{ height: 700, overflowY: 'auto', overflowX: 'hidden' }}>

                <AccountDetailsTable
                    memberDetails={memberDetails} />

                {memberDetails.userType === 30 &&
                    <MemberSettings
                        isDisabled={false}
                        handleChange={() => { }}
                        language={memberDetails.languageId}
                        lineType={memberDetails.lineType}
                        viewType={memberDetails.viewType}
                        oddsType={memberDetails.oddsFormat}
                        isEditable={false}
                    />
                }

                {!memberDetails.isCashPlayer && <PaymentSettings
                    isDisabled={true}
                    {...memberDetails.transferSettings}
                    handleSwitchChange={this.toggleSwitch}
                    handleWeeklySched={this.handleWeeklySched}
                    handleDailySched={this.handleDailySched}
                />}

                <Tabs minHeight='500'>
                    <div label={formattedMessages.soccer}>
                        <VerticalSoccer handleChange={this.handleChange}
                            data={memberDetails.categorySoccer}
                            userType={Capitalize(userType)}
                            isFromProfile={false} />
                    </div>
                    <div label={formattedMessages.sports}>
                        <VerticalSports
                            userType={Capitalize(userType)}
                            handleChange={this.handleChange} data={memberDetails.categorySports}
                            isFromProfile={false} />
                    </div>
                    <div label={formattedMessages.parlay}>
                        <VerticalParlay
                            userType={Capitalize(userType)}
                            handleChange={this.handleChange} data={memberDetails.categoryParlay}
                            isFromProfile={false} />
                    </div>
                    <div label={formattedMessages.virtual}>
                        <VerticalVirtual
                            handleChange={this.handleChange}
                            userType={Capitalize(userType)}
                            data={memberDetails.categoryVirtual}
                            isFromProfile={false} />
                    </div>
                    <div label='Live Casino'>
                        <VerticalLiveCasino userType={Capitalize(userType)}
                            handleChange={this.handleChange} data={memberDetails.categoryLiveCasino}
                            isFromProfile={false} />
                    </div>
                    <div label='Games'>
                        <VerticalCasino
                            userType={Capitalize(userType)}
                            handleChange={this.handleChange} data={memberDetails.categoryGames}
                            isFromProfile={false} />
                    </div>
                    <div label={'Cricket'}>
                        <VerticalCricket handleChange={this.handleChange}
                            data={memberDetails.categoryCricket}
                            userType={Capitalize(userType)}
                            isFromProfile={false} />
                    </div>
                    <div label='Keno/Lottery'>
                        <VerticalKenoLottery userType={Capitalize(userType)}
                            handleChange={this.handleChange} data={memberDetails.categoryLotto}
                            isFromProfile={false} />
                    </div>

                </Tabs>
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

PropTypes.ViewMemberDetails = {
    loadingMemberDetails: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    message: PropTypes.string,
    userId: PropTypes.number.isRequired,
    memberDetails: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ViewMemberDetails)

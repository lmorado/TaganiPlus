import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    Col,
    Row,
    Table,
    CardHeader,
    CardFooter,
    Modal,
    ModalBody
} from 'reactstrap';
import { connect } from 'react-redux'
import { UIIcon } from '@song88/react-components'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import CopyUser from './CopyUser'
import Log from './Log'
import ViewMemberDetail from './ViewMemberDetail'
import ViewMemberDetails from './ViewMemberDetails'
import ResetPassword from '../../Account/ResetPassword'
import ManageCredit from './ManageCredit'
import ModalComponent from '../../../components/Modal'
import { splitItems, Capitalize, phoneRegex, nameRegex, hypenToUnderscore, usernameRegex, isNullOrUndefined } from '../../../utils/helpers'
import MaintenancePage from '../../../components/MaintenancePage'
import { getAgentLists, getAgentDownlineLists } from '../../../actions/members/userListAction'
import { updateMemberCredits } from '../../../actions/members/manageCreditAction'
import { updateUserStatus } from '../../../actions/members/updateUserStatus'
import { updateMember } from '../../../actions/members/updateMemberAction'
import { resetUserList } from '../../../actions/members/resetUserListAction'
import { resetUserListDownline } from '../../../actions/members/resetUserListDownlineAction'
import { resetCopyUser } from '../../../actions/members/resetCopyUser'
import { resetMemberCredit } from '../../../actions/members/resetMemberCredit'
import { addCopyUserDetails } from '../../../actions/members/copyUserAction'
import { showModal, hideModal } from '../../../actions/modal'
import { FormattedMessage } from 'react-intl'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import { getMemberDetails } from '../../../actions/members/memberDetailsAction'
import RenderMembers from './RenderMembers'
import RenderDownlines from './RenderDownlines';
import ToggleButton from '../../../components/ToggleButton'
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components';
import NewUsers from './NewUsers';
import MemberOutstanding from './MemberOutstanding';

const agentStatus = [
    { id: 100, name: 'Global.Normal' },
    { id: 200, name: 'Global.Locked' },
]

const memberStatus = [
    { id: 100, name: 'Global.Normal' },
    { id: 200, name: 'Global.Locked' },
    { id: 300, name: 'Global.NoBet' },
]

const userSortOrder = [
    { id: 'UsernameAscending', name: 'Members.SortbyUsernameAscending' },
    { id: 'UsernameDescending', name: 'Members.SortbyUsernameDescending' },
    { id: 'DateAscending', name: 'Global.SortbyCreateDateAscending' },
    { id: 'DateDescending', name: 'Members.SortbyCreateDateDescending' },
]

const ScrollableDiv = styled.div`
    height: 70vh;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-color: #790000 #F5F5F5;
    scrollbar-width: thin;
    background: #fff;

    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar
    {
        width: 6px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb
    {
        background-color: #790000;
        
    }

    .force-overflow
    {
        min-height: 450px;
    }
`

const userListURL = '/member-management/user-list'

class UserLists extends Component {

    constructor(props) {
        super(props);
        this.changeUserLevel = this.changeUserLevel.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this)
        this.toggleSoccer = this.toggleSoccer.bind(this)

        this.state = {
            userType: 'agent',
            downlinesUserType: 'agent',
            activeModal: '',
            updateCredit: '',
            creditLimit: '',
            submitted: false,
            submittedUname: false,
            downlinesSubmittedUname: false,
            userStatus: [],
            searchUserStatus: '0',
            downlineSearchUserStatus: '',
            selectedUserStatus: [],
            downlinesSelectedUserStatus: [],
            searchByUsername: '',
            downlinesSearchByUsername: '',
            clearValueState: false,
            searchUserSort: 'UsernameAscending',
            downlinesSearchUserSort: '',
            copyUserSubmitted: false,
            page: 1,
            pageSize: 20,
            downlinesPage: 1,
            currentLevel: 1,
            downlinesUserId: 0,
            downlineDetails: [],
            isPaymentModeCash: false,
            downlinesIsPaymentModeCash: false,
            copy_telephone: '',
            nameEdit: '',
            telephoneEdit: '',
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
            isPristine: true,
            isUpdateUserConfirmationModalVisible: false,
            isCloseConfirmationModalVisible: false,
            formTouched: false
        }
    }

    componentWillReceiveProps(prevProps) {
        if (this.state.submitted !== prevProps.submitted) {
            this.setState({ submitted: false, submittedUname: false, downlinesSubmittedUname: false })
        }
    }

    componentDidMount() {
        this.props.resetUserList();
        this.props.resetUserListDownline();
        this.props.resetCopyUser();

        this.props.resetMemberCredit(this.props.userId);

        const param = this.props.match.params
        const query = queryString.parse(this.props.location.search)
        this.setState({
            userType: param.defaultUserType,
            searchByUsername: query.username,
            searchUserSort: query.sortOrder ? query.sortOrder : this.state.searchUserSort,
            searchUserStatus: query.statusId ? query.statusId : this.state.searchUserStatus,
            isPaymentModeCash: (query.isPaymentModeCash && query.isPaymentModeCash.toLowerCase() === 'true') ? true : false,
            currentLevel: 1
        })

        this.props.getAgentLists(1, 20,
            param.defaultUserType, this.props.userId,
            query.statusId ? query.statusId : 0,
            query.username ? query.username : '', query.sortOrder ?
            query.sortOrder : 'UsernameAscending', query.isPaymentModeCash && query.isPaymentModeCash.toLowerCase() === 'true' ? true : false)
    }

    componentDidUpdate(prevProps) {
        window.onpopstate = (e) => {
            this.setState({ currentLevel: 1 })
            const param = this.props.match.params
            const query = queryString.parse(this.props.location.search)
            this.setState({
                userType: param.defaultUserType,
                searchByUsername: query.username ? query.username : '',
                searchUserSort: query.sortOrder ? query.sortOrder : 'UsernameAscending',
                searchUserStatus: query.statusId ? query.statusId : this.state.searchUserStatus,
                isPaymentModeCash: (query.isPaymentModeCash && query.isPaymentModeCash.toLowerCase() === 'true') ? true : false,
            })

            this.props.getAgentLists(1, 20, param.defaultUserType, this.props.userId, query.statusId, query.username, query.sortOrder,
                query.isPaymentModeCash && query.isPaymentModeCash.toLowerCase() === 'true' ? true : false)

            this.props.resetCopyUser()
            this.props.resetMemberCredit(this.props.userId);
        }

        if (prevProps.downlines && prevProps.downlines.details !== this.props.downlines.details) {
            if (this.props.downlines && this.props.downlines.details !== undefined && JSON.stringify(this.state.downlineDetails) !== JSON.stringify(this.props.downlines.details)) {
                this.setState({ downlineDetails: this.props.downlines.details })
            }
        }


        if (this.props.memberDetails != prevProps.memberDetails && this.props.memberDetails.name) {

            this.setState({
                nameEdit: this.props.memberDetails.name,
                telephoneEdit: this.props.memberDetails.telephoneNumber,
            })


            if (this.props.memberDetails && this.props.memberDetails.transferSettings) {
                let days = this.props.memberDetails.transferSettings;
                for (let key in days) {
                    if (days.hasOwnProperty(key)) {
                        this.setItemState(key, days[key])
                        this.setItemState(`${key}`, days[key])
                    }
                }
            }

            this.setSportsState()
            this.setSoccerState()
            this.setCricketState()
            this.setParlayState()
            this.setCasinoState()
            this.setVirtualState()
            this.setLiveCasinoState()
            this.setKenoLotteryState()
        }

        if (this.props.agents && this.props.agents.data && this.props.agents.data !== prevProps.agents.data) {
            this.setState({
                page: this.props.agents.currentPage
            })
        }

        if (this.props.downline && this.props.downline.data && this.props.downline.data !== prevProps.downline.data) {
            this.setState({
                downlinePage: this.props.downline.currentPage
            })
        }
    }

    resetPaymentSettings = () => {
        this.setState({
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        });
        return true;
    }

    /*Update Area*/


    /*Soccer*/
    setSoccerState = () => {
        if (this.props.memberDetails && this.props.memberDetails.categorySoccer) {

            this.setState({
                enableSoccerForm: this.props.memberDetails.categorySoccer.isEnabled,
                enableSoccerFormChange: this.props.memberDetails.categorySoccer.isEditable
            })

            this.props.memberDetails.categorySoccer.betSettings.map(item => {
                this.setState({ soccer_minPerTicket: item.minPerTicketRate })
                this.setState({ soccer_maxPerTicket: item.maxPerTicketRate })
                this.setState({ soccer_maxPerGame: item.maxPerGameRate })

                this.setState({ soccer_minPerTicketDefault: item.minPerTicket })
                this.setState({ soccer_maxPerTicketDefault: item.maxPerTicket })
                this.setState({ soccer_maxPerGameDefault: item.maxPerGame })
            })

            this.props.memberDetails.categorySoccer.commissions.map(item => {
                this.setState({ soccer_commission: item.rate })
            })
        }

        return true;
    }


    setCricketState = () => {
        if (this.props.memberDetails && this.props.memberDetails.categoryCricket) {

            this.setState({
                enableCricketForm: this.props.memberDetails.categoryCricket.isEnabled,
                enableCricketFormChange: this.props.memberDetails.categoryCricket.isEditable
            })

            this.props.memberDetails.categoryCricket.betSettings.map(item => {
                this.setState({ cricket_minPerTicket: item.minPerTicketRate })
                this.setState({ cricket_maxPerTicket: item.maxPerTicketRate })
                this.setState({ cricket_maxPerGame: item.maxPerGameRate })

                this.setState({ cricket_minPerTicketDefault: item.minPerTicket })
                this.setState({ cricket_maxPerTicketDefault: item.maxPerTicket })
                this.setState({ cricket_maxPerGameDefault: item.maxPerGame })
            })

            this.props.memberDetails.categoryCricket.commissions.map(item => {
                this.setState({ cricket_commission: item.rate })
            })
        }

        return true;
    }

    /*Sports*/
    setSportsState = () => {
        if (this.props.memberDetails.categorySports) {

            this.setState({
                enableSportForm: this.props.memberDetails.categorySports.isEnabled,
                enableSportFormChange: this.props.memberDetails.categorySports.isEditable
            })

            this.props.memberDetails.categorySports.betSettings.map(item => {
                this.setState({ sports_minPerTicket: item.minPerTicketRate })
                this.setState({ sports_maxPerTicket: item.maxPerTicketRate })
                this.setState({ sports_maxPerGame: item.maxPerGameRate })
                this.setState({ sports_minPerTicketDefault: item.minPerTicket })
                this.setState({ sports_maxPerTicketDefault: item.maxPerTicket })
                this.setState({ sports_maxPerGameDefault: item.maxPerGame })
            })

            this.props.memberDetails.categorySports.commissions.map(item => {
                this.setState({ sports_com: item.rate })
            })

            let selectedSports = this.props.memberDetails.categorySports.sportRestrictions.map((val) => {
                if (val.isAllowed === false) {
                    return val.sportId
                }
            })

            selectedSports = selectedSports.filter(x => !isNaN(x));
            this.setState({ selectedItems: selectedSports })
        }
        return true
    }

    /*Parlay*/
    setParlayState = () => {
        if (this.props.memberDetails && this.props.memberDetails.categoryParlay) {

            this.setState({
                enableParlayForm: this.props.memberDetails.categoryParlay.isEnabled,
                enableParlayFormChange: this.props.memberDetails.categoryParlay.isEditable
            })

            this.props.memberDetails.categoryParlay.betSettings.map(item => {
                this.setState({ parlay_minBet: item.minBetRate })
                this.setState({ parlay_maxBet: item.maxBetRate })
                this.setState({ parlay_maxPayoutPerTicket: item.maxPayoutPerTicketRate })
                this.setState({ parlay_minBetDefault: item.minBet })
                this.setState({ parlay_maxBetDefault: item.maxBet })
                this.setState({ parlay_maxPayoutPerTicketDefault: item.maxPayoutPerTicket })
            })

            this.props.memberDetails.categoryParlay.commissions.map(item => {
                this.setState({ [`parlay_com_${hypenToUnderscore(item.label)}`]: item.rate })
            });
        }
        return true
    }


    /*Casino*/
    setCasinoState = () => {
        const { memberDetails } = this.props

        if (memberDetails && memberDetails.categoryGames && memberDetails.categoryGames.positionTaking) {

            this.setState({
                enableCasinoForm: memberDetails.categoryGames.isEnabled,
                enableCasinoFormChange: memberDetails.categoryGames.isEditable
            })


            memberDetails.categoryGames.commissions.map((item) => {
                this.setItemState(`casino_com_${item.subCategoryId}`, item.rate);
            })


            memberDetails.categoryGames.brandRestrictions.map((item) => {
                this.setItemState(`casino_brandRestriction_${item.brandId}`, item.isAllowed);
                this.setItemState(`casino_brandRestriction_${item.brandId}_isEditable`, item.isEditable);
            })
        }
        return true
    }



    /*Live Casino / Slot*/
    setLiveCasinoState = () => {

        const { memberDetails } = this.props

        if (memberDetails && memberDetails.categoryLiveCasino) {

            this.setState({
                enableLiveCasinoForm: memberDetails.categoryLiveCasino.isEnabled,
                enableLiveCasinoFormChange: memberDetails.categoryLiveCasino.isEditable
            })

            memberDetails.categoryLiveCasino.commissions.map((item) => {
                this.setItemState(`liveCasino_com_${item.subCategoryId}`, item.rate);
            })

            memberDetails.categoryLiveCasino.brandRestrictions.map((item) => {
                this.setItemState(`liveCasino_brandRestriction_${item.brandId}`, item.isAllowed);
                this.setItemState(`liveCasino_brandRestriction_${item.brandId}_isEditable`, item.isEditable);
            })
        }
        return true
    }


    /*Virtual*/
    setVirtualState = () => {
        if (this.props.memberDetails && this.props.memberDetails.categoryVirtual) {

            this.setState({
                enableVirtualForm: this.props.memberDetails.categoryVirtual.isEnabled,
                enableVirtualFormChange: this.props.memberDetails.categoryVirtual.isEditable
            })

            this.props.memberDetails.categoryVirtual.commissions.map((item) => {
                this.setItemState(`virtual_com`, item.rate);
            })
        }
        return true
    }



    /*Keno Lottery / Lotto*/
    setKenoLotteryState = () => {
        if (this.props.memberDetails && this.props.memberDetails.categoryLotto) {
            this.setState({
                enableKenoLotteryForm: this.props.memberDetails.categoryLotto.isEnabled,
                enableKenoLotteryFormChange: this.props.memberDetails.categoryLotto.isEditable
            })
            this.props.memberDetails.categoryLotto.commissions.map((item) => {
                this.setItemState(`kenoLottery_com`, item.rate);
            })
        }
        return true
    }

    toggleSoccer = () => {
        let { enableSoccerFormChange, enableSoccerForm } = this.state
        if (enableSoccerFormChange) {
            this.setState({
                enableSoccerForm: !enableSoccerForm,
                isFormTouched: true
            })
            if (this.props.memberDetails && this.props.memberDetails.categorySoccer) {
                this.props.memberDetails.categorySoccer.betSettings.map(item => {
                    this.setState({ soccer_minPerTicket: item.minPerTicketRate })
                    this.setState({ soccer_maxPerTicket: item.maxPerTicketRate })
                    this.setState({ soccer_maxPerGame: item.maxPerGameRate })

                    this.setState({ soccer_minPerTicketDefault: item.minPerTicket })
                    this.setState({ soccer_maxPerTicketDefault: item.maxPerTicket })
                    this.setState({ soccer_maxPerGameDefault: item.maxPerGame })
                })
            }
        }
        return true
    }


    toggleCricket = () => {
        let { enableCricketFormChange, enableCricketForm } = this.state
        if (enableCricketFormChange) {
            this.setState({
                enableCricketForm: !enableCricketForm,
                isFormTouched: true
            })
            if (this.props.memberDetails && this.props.memberDetails.categoryCricket) {
                this.props.memberDetails.categoryCricket.betSettings.map(item => {
                    this.setState({ cricket_minPerTicket: item.minPerTicketRate })
                    this.setState({ cricket_maxPerTicket: item.maxPerTicketRate })
                    this.setState({ cricket_maxPerGame: item.maxPerGameRate })

                    this.setState({ cricket_minPerTicketDefault: item.minPerTicket })
                    this.setState({ cricket_maxPerTicketDefault: item.maxPerTicket })
                    this.setState({ cricket_maxPerGameDefault: item.maxPerGame })
                })
            }
        }
        return true
    }


    toggleSports = () => {
        let { enableSportFormChange, enableSportForm } = this.state
        if (enableSportFormChange) {
            this.setState({
                enableSportForm: !enableSportForm,
                isFormTouched: true
            })
            if (this.props.memberDetails && this.props.memberDetails.categorySports
                && this.props.memberDetails.categorySports.betSettings) {
                this.props.memberDetails.categorySports.betSettings.map(item => {

                    this.setState({ sports_minPerTicket: item.minPerTicketRate })
                    this.setState({ sports_maxPerTicket: item.maxPerTicketRate })
                    this.setState({ sports_maxPerGame: item.maxPerGameRate })

                    this.setState({ sports_minPerTicketDefault: item.minPerTicket })
                    this.setState({ sports_maxPerTicketDefault: item.maxPerTicket })
                    this.setState({ sports_maxPerGameDefault: item.maxPerGame })
                })
            }
        }
        return true
    }

    toggleParlay = () => {
        let { enableParlayFormChange, enableParlayForm } = this.state
        if (enableParlayFormChange) {
            this.setState({
                enableParlayForm: !enableParlayForm,
                isFormTouched: true
            })
            if (this.props.memberDetails && this.props.memberDetails.categoryParlay && this.props.memberDetails.categoryParlay.betSettings) {
                this.props.memberDetails.categoryParlay.betSettings.map(item => {
                    this.setState({ parlay_minBet: item.minBetRate })
                    this.setState({ parlay_maxBet: item.maxBetRate })
                    this.setState({ parlay_maxPayoutPerTicket: item.maxPayoutPerTicketRate })
                    this.setState({ parlay_minBetDefault: item.minBet })
                    this.setState({ parlay_maxBetDefault: item.maxBet })
                    this.setState({ parlay_maxPayoutPerTicketDefault: item.maxPayoutPerTicket })
                })
            }
        }
        return true
    }

    toggleCasino = () => {
        let { enableCasinoFormChange, enableCasinoForm } = this.state
        const { memberDetails } = this.props

        if (enableCasinoFormChange) {
            this.setState({
                enableCasinoForm: !enableCasinoForm,
                isFormTouched: true
            }, () => {

                if (!enableCasinoForm === true) {
                    memberDetails.categoryGames.brandRestrictions.map((item) => {
                        this.setItemState(`casino_brandRestriction_${item.brandId}`, item.isEditable ? true : false);
                    })
                }

            })
        }
        return true
    }

    toggleLiveCasino = () => {
        let { enableLiveCasinoFormChange, enableLiveCasinoForm } = this.state
        const { memberDetails } = this.props

        if (enableLiveCasinoFormChange) {
            this.setState({
                enableLiveCasinoForm: !enableLiveCasinoForm,
                isFormTouched: true
            }, () => {
                if (!enableLiveCasinoForm === true) {
                    memberDetails.categoryLiveCasino.brandRestrictions.map((item) => {
                        this.setItemState(`liveCasino_brandRestriction_${item.brandId}`, item.isEditable ? true : false);
                    })
                }
            })
        }
        return true
    }

    toggleVirtual = () => {
        let { enableVirtualFormChange, enableVirtualForm } = this.state
        if (enableVirtualFormChange) {
            this.setState({
                enableVirtualForm: !enableVirtualForm,
                isFormTouched: true
            })
        }
        return true
    }

    toggleKenoLottery = () => {
        let { enableKenoLotteryFormChange, enableKenoLotteryForm } = this.state
        if (enableKenoLotteryFormChange) {
            this.setState({
                enableKenoLotteryForm: !enableKenoLotteryForm,
                isFormTouched: true
            })
        }
        return true
    }

    handleItemSelection = (checked, name, value) => {
        this.setState(state => {
            if (name) {
                let items = state.selectedItems.slice()
                if (checked) {
                    items = items.concat([value])
                } else {
                    items = items.filter(id => id !== value)
                }
                return { selectedItems: items, isFormTouched: true }
            }
        })
    }

    setItemState = (item, state) => {
        this.setState({ [item]: state })
    }


    toggleBrandRestriction = name => {
        this.setState({ [name]: !this.state[name], isFormTouched: true })
    }

    isSoccerValid = () => {
        const { soccer_commission, soccer_minPerTicket, soccer_maxPerTicket, soccer_maxPerGame,
            soccer_minPerTicketDefault, soccer_maxPerTicketDefault, soccer_maxPerGameDefault,
            enableSoccerForm
        } = this.state


        let isValid = false
        if (!enableSoccerForm) isValid = true
        else if (soccer_commission !== null && soccer_minPerTicket && soccer_maxPerTicket && soccer_maxPerGame
            && Number(soccer_minPerTicket) >= Number(soccer_minPerTicketDefault)
            && Number(soccer_maxPerTicket) <= Number(soccer_maxPerTicketDefault)
            && Number(soccer_maxPerGame) >= Number(soccer_maxPerTicket)
            && Number(soccer_maxPerTicket) >= Number(soccer_minPerTicket)
            && Number(soccer_maxPerGameDefault) >= Number(soccer_maxPerGame)
        ) isValid = true

        return isValid
    }

    isCricketValid = () => {

        const { cricket_commission, cricket_minPerTicket, cricket_maxPerTicket, cricket_maxPerGame,
            cricket_minPerTicketDefault, cricket_maxPerTicketDefault, cricket_maxPerGameDefault,
            enableCricketForm
        } = this.state


        let isValid = false
        if (!enableCricketForm) isValid = true
        else if (cricket_commission !== null && cricket_minPerTicket && cricket_maxPerTicket && cricket_maxPerGame
            && Number(cricket_minPerTicket) >= Number(cricket_minPerTicketDefault)
            && Number(cricket_maxPerTicket) <= Number(cricket_maxPerTicketDefault)
            && Number(cricket_maxPerGame) >= Number(cricket_maxPerTicket)
            && Number(cricket_maxPerTicket) >= Number(cricket_minPerTicket)
            && Number(cricket_maxPerGameDefault) >= Number(cricket_maxPerGame)
        ) isValid = true

        return isValid

    }

    isSportsValid = () => {
        const { sports_com, sports_minPerTicket, sports_maxPerTicket, sports_maxPerGame,
            sports_minPerTicketDefault, sports_maxPerTicketDefault, sports_maxPerGameDefault,
            enableSportForm
        } = this.state

        let isValid = false

        if (!enableSportForm) isValid = true
        else if (sports_com !== null &&
            sports_minPerTicket &&
            sports_maxPerTicket &&
            sports_maxPerGame
            && Number(sports_minPerTicket) >= Number(sports_minPerTicketDefault)
            && Number(sports_maxPerTicket) <= Number(sports_maxPerTicketDefault)
            && Number(sports_maxPerGame) >= Number(sports_maxPerTicket)
            && Number(sports_maxPerTicket) >= Number(sports_minPerTicket)
            && Number(sports_maxPerGameDefault) >= Number(sports_maxPerGame)
        ) isValid = true

        return isValid
    }

    isParlayValid = () => {
        const { parlay_minBet, parlay_maxBet, parlay_maxPayoutPerTicket,
            parlay_com_2, parlay_com_3_4, parlay_com_5_6, parlay_com_7_8, parlay_com_9_10,
            parlay_minBetDefault,
            parlay_maxBetDefault,
            parlay_maxPayoutPerTicketDefault,
            enableParlayForm
        } = this.state

        let isValid = false

        if (!enableParlayForm) isValid = true
        else if (parlay_minBet && parlay_maxBet && parlay_maxPayoutPerTicket &&
            parlay_com_2 !== null && parlay_com_3_4 !== null && parlay_com_5_6 !== null && parlay_com_7_8 !== null
            && parlay_com_9_10 !== null
            && Number(parlay_minBet) >= Number(parlay_minBetDefault)
            && Number(parlay_maxBet) <= Number(parlay_maxBetDefault)
            && Number(parlay_maxPayoutPerTicket) <= Number(parlay_maxPayoutPerTicketDefault)
            && Number(parlay_maxBet) >= Number(parlay_minBet)
        ) isValid = true

        return isValid
    }

    isCasinoValid = () => {
        const {
            casino_com_10, casino_com_4,
            casino_com_5, casino_com_7,
            casino_brandRestriction_10,
            casino_brandRestriction_4,
            casino_brandRestriction_5,
            casino_brandRestriction_7,
            enableCasinoForm
        } = this.state

        let isValid = false
        if (!enableCasinoForm) isValid = true
        else if (casino_com_10 !== null &&
            casino_com_4 !== null && casino_com_7 !== null && casino_com_5 !== null
        ) isValid = true

        if (enableCasinoForm) {
            if (!casino_brandRestriction_10 && !casino_brandRestriction_4 && !casino_brandRestriction_5 && !casino_brandRestriction_7) {
                isValid = false
            }
        }

        return isValid
    }


    isVirtualValid = () => {
        const {
            virtual_com,
            enableVirtualForm
        } = this.state

        let isValid = false
        if (!enableVirtualForm) isValid = true
        else if (virtual_com !== null) isValid = true
        return isValid
    }


    isLiveCasinoIsValid = () => {
        const {
            enableLiveCasinoForm,
            liveCasino_brandRestriction_2,
            liveCasino_brandRestriction_4,
            liveCasino_com_2, liveCasino_com_4,
        } = this.state
        let isValid = false


        if (!enableLiveCasinoForm) isValid = true
        else if (liveCasino_com_2 !== null && liveCasino_com_4 !== null) {
            isValid = true
        }


        if (enableLiveCasinoForm) {
            if (!liveCasino_brandRestriction_2 && !liveCasino_brandRestriction_4) {
                isValid = false
            }
        }
        return isValid
    }

    isKenoLotteryIsValid = () => {
        const {
            kenoLottery_com,
            enableKenoLotteryForm
        } = this.state

        let isValid = false

        if (!enableKenoLotteryForm) isValid = true
        else if (kenoLottery_com !== null) isValid = true
        return isValid
    }


    toggleSwitch = day => {
        if (day === 'mon') this.setState({ monday: !this.state.monday })
        else if (day === 'tue') this.setState({ tuesday: !this.state.tuesday })
        else if (day === 'wed') this.setState({ wednesday: !this.state.wednesday })
        else if (day === 'thu') this.setState({ thursday: !this.state.thursday })
        else if (day === 'fri') this.setState({ friday: !this.state.friday })
        else if (day === 'sat') this.setState({ saturday: !this.state.saturday })
        else if (day === 'sun') this.setState({ sunday: !this.state.sunday })

        this.setState({
            isFormTouched: true
        })
    }


    updateCopyUserName = (data) => {
        this.setState({ copy_username: data })
    }

    updateUserTrigger = () => {

        let { nameEdit, telephoneEdit, monday, tuesday, wednesday, thursday, friday, saturday, sunday,
            enableSoccerForm, enableSportForm, enableParlayForm, enableCasinoForm, enableVirtualForm, enableLiveCasinoForm, enableKenoLotteryForm, enableCricketForm } = this.state
        let { memberDetails } = this.props
        let userIdToUpdate = this.props.modalUserId;
        let paymentDetailsValid = monday || tuesday || wednesday || thursday || friday || saturday || sunday || memberDetails.isCashPlayer
        let memberDetailsInvalid = !nameEdit || (nameEdit && (!nameRegex.test(nameEdit) || nameEdit.length > 30)) || (
            telephoneEdit && !phoneRegex.test(telephoneEdit))
            || (telephoneEdit && (telephoneEdit.length > 15 || telephoneEdit.length < 7) && !paymentDetailsValid)
        const isVerticalsValid = this.isSoccerValid() && this.isSportsValid() & this.isParlayValid() && this.isCasinoValid() && this.isLiveCasinoIsValid() && this.isKenoLotteryIsValid() && this.isVirtualValid() && this.isCricketValid()
        const hasOneActiveVertical = enableSoccerForm || enableSportForm || enableParlayForm || enableCasinoForm || enableVirtualForm || enableLiveCasinoForm || enableKenoLotteryForm || enableCricketForm

        if (!memberDetailsInvalid && hasOneActiveVertical && isVerticalsValid) {

            const { searchUserSort, searchUserStatus, userType, isPaymentModeCash,
                soccer_commission, soccer_minPerTicket, soccer_maxPerTicket, soccer_maxPerGame, enableSoccerFormChange,
                cricket_commission, cricket_minPerTicket, cricket_maxPerTicket, cricket_maxPerGame, enableCricketFormChange,
                sports_com, sports_minPerTicket, sports_maxPerTicket, sports_maxPerGame, enableSportFormChange,
                parlay_minBet, parlay_maxBet, parlay_maxPayoutPerTicket, parlay_com_2, parlay_com_3_4, parlay_com_5_6, parlay_com_7_8, parlay_com_9_10, enableParlayFormChange,
                enableCasinoFormChange,
                virtual_com, enableVirtualFormChange, enableLiveCasinoFormChange,
                kenoLottery_com, enableKenoLotteryFormChange, liveCasino_com_4, liveCasino_com_2, liveCasino_brandRestriction_4, liveCasino_brandRestriction_2,
                casino_brandRestriction_10,
                casino_brandRestriction_4,
                casino_brandRestriction_5,
                casino_brandRestriction_7,
                casino_com_10, casino_com_4,
                casino_com_5, casino_com_7,
            } = this.state
            const query = queryString.parse(this.props.location.search)

            const sportsRes = this.state.selectedItems ?
                this.state.selectedItems.map(item => {
                    return { 'sportId': item, 'isAllowed': false }
                }) : [];

            let data = {
                'userId': userIdToUpdate,
                'telephoneNumber': telephoneEdit,
                'chatApplicationId': 1,
                'chatName': 'testChatName',
                'emailAddress': 'testEmail@gmail.com',
                'name': nameEdit,
                'userType': memberDetails.userType,
                'isCashMarket': memberDetails.isCashPlayer,
                'transferSetting': {
                    'sunday': sunday,
                    'monday': monday,
                    'tuesday': tuesday,
                    'wednesday': wednesday,
                    'thursday': thursday,
                    'friday': friday,
                    'saturday': saturday
                },
                'categorySoccer': {
                    'isEnabled': enableSoccerFormChange ? enableSoccerForm : memberDetails.categorySoccer.isEnabled,
                    'commissionSoccer': {
                        'rate': Number(soccer_commission),
                    },
                    'betSettingSoccer': {
                        'minPerTicket': soccer_minPerTicket ? Number(soccer_minPerTicket) : 0,
                        'maxPerTicket': soccer_maxPerTicket ? Number(soccer_maxPerTicket) : 0,
                        'maxPerGame': soccer_maxPerGame ? Number(soccer_maxPerGame) : 0
                    },
                },
                'categoryCricket': {
                    'isEnabled': enableCricketFormChange ? enableCricketForm : memberDetails.categoryCricket.isEnabled,
                    'commissionCricket': {
                        'rate': Number(cricket_commission),
                    },
                    'betSettingCricket': {
                        'minPerTicket': cricket_minPerTicket ? Number(cricket_minPerTicket) : 0,
                        'maxPerTicket': cricket_maxPerTicket ? Number(cricket_maxPerTicket) : 0,
                        'maxPerGame': cricket_maxPerGame ? Number(cricket_maxPerGame) : 0
                    },
                },
                'categorySports': {
                    'isEnabled': enableSportFormChange ? enableSportForm : memberDetails.categorySports.isEnabled,
                    'commissionSports': {
                        'rate': Number(sports_com),
                    },
                    'betSettingSports': {
                        'minPerTicket': sports_minPerTicket ? Number(sports_minPerTicket) : 0,
                        'maxPerTicket': sports_maxPerTicket ? Number(sports_maxPerTicket) : 0,
                        'maxPerGame': sports_maxPerGame ? Number(sports_maxPerGame) : 0,
                    },
                    'sportRestrictions': sportsRes,
                },
                'categoryParlay': {
                    'isEnabled': enableParlayFormChange ? enableParlayForm : memberDetails.categoryParlay.isEnabled,
                    'commissionParlay': {
                        'commissionParlay2': {
                            'rate': Number(parlay_com_2),
                        },
                        'commissionParlay3To4': {
                            'rate': Number(parlay_com_3_4),
                        },
                        'commissionParlay5To6': {
                            'rate': Number(parlay_com_5_6),
                        },
                        'commissionParlay7To8': {
                            'rate': Number(parlay_com_7_8),
                        },
                        'commissionParlay9To10': {
                            'rate': Number(parlay_com_9_10),
                        }
                    },
                    'betSettingParlay': {
                        'minBet': parlay_minBet ? Number(parlay_minBet) : 0,
                        'maxBet': parlay_maxBet ? Number(parlay_maxBet) : 0,
                        'maxPayoutPerTicket': parlay_maxPayoutPerTicket ? Number(parlay_maxPayoutPerTicket) : 0,
                    },
                },
                'categoryGames': {
                    'isEnabled': enableCasinoFormChange ? enableCasinoForm : memberDetails.categoryGames.isEnabled,
                    'commissionGames': {
                        'commissionGamesMaverick': {
                            'rate': casino_com_10
                        },
                        'commissionGamesMicroGaming': {
                            'rate': casino_com_4
                        },
                        'commissionGamesNetEnt': {
                            'rate': casino_com_5
                        },
                        'commissionGamesPlayNGo': {
                            'rate': casino_com_7
                        }
                    },
                    'gamesBrandRestrictions': {
                        'isMaverickEnabled': casino_brandRestriction_10,
                        'isMicroGamingEnabled': casino_brandRestriction_4,
                        'isNetEntEnabled': casino_brandRestriction_5,
                        'isPlayNGoEbanled': casino_brandRestriction_7
                    },
                },
                'categoryVirtual': {
                    'isEnabled': enableVirtualFormChange ? enableVirtualForm : memberDetails.categoryVirtual.isEnabled,
                    'commissionVirtual': {
                        'rate': Number(virtual_com),
                    },
                },
                'categoryLiveCasino': {
                    'isEnabled': enableLiveCasinoFormChange ? enableLiveCasinoForm : memberDetails.categoryLiveCasino.isEnabled,
                    'commissionLiveCasino': {
                        'commissionLiveCasinoMicroGaming': {
                            'rate': liveCasino_com_4
                        },
                        'commissionLiveCasinoJoker': {
                            'rate': liveCasino_com_2
                        },
                    },
                    "liveCasinoBrandRestrictions": {
                        "isMicroGamingEnabled": liveCasino_brandRestriction_4,
                        "isJokerEnabled": liveCasino_brandRestriction_2
                    },
                },
                'categoryLotto': {
                    'isEnabled': enableKenoLotteryFormChange ? enableKenoLotteryForm : memberDetails.categoryLotto.isEnabled,
                    'commissionLotto': {
                        'rate': Number(kenoLottery_com),
                    },
                },
            }

            this.props.updateMember(data, 1, this.state.pageSize, this.props.userId, userType, searchUserStatus, query.username, searchUserSort, isPaymentModeCash);
            this.setState({
                page: 1,
                downlinePage: 1,
            })
        }

        return true
    }

    updateUser = () => {
        this.setState({
            isUpdateUserConfirmationModalVisible: true
        })
    }

    confirmUpdateUser = () => {
        this.updateUserTrigger()
        this.setState({
            isUpdateUserConfirmationModalVisible: false
        })
    }

    toggleUpdateUserConfirmationModal = () => {
        this.setState({ isUpdateUserConfirmationModalVisible: !this.state.isUpdateUserConfirmationModalVisible });
    }

    toggleCloseConfirmationModal = () => {
        this.setState({ isCloseConfirmationModalVisible: !this.state.isCloseConfirmationModalVisible });
    }


    confirmCloseConfirmationModal = () => {
        this.toggleCloseConfirmationModal()
        this.confirmClose()
    }

    confirmClose = () => {
        this.props.hideModal()
        this.setState({ copy_password: '', copy_securityCode: '', copy_name: '', copy_telephone: '', copy_credit: '' })
        this.setState({ clearValueState: true, submitted: false, copyUserSubmitted: false })
        this.setState({ updateCredit: '' })
        this.setState({ formTouched: false })
        this.setState({
            nameEdit: '',
            telephoneEdit: '',
        })
        this.props.resetCopyUser();
        this.props.resetMemberCredit(this.props.userId)
    }

    closeModal = () => {
        const { activeModal, currentLevel, isFormTouched } = this.state
        if (activeModal === 'details' && currentLevel === 1) {
            if (isFormTouched) {
                this.toggleCloseConfirmationModal()
            } else {
                this.confirmClose()
            }
        }
        else {
            this.confirmClose()
        }
    }

    onOpenModal(modal, modalTitle, userInfo, modalSize, showButton) {
        this.props.showModal({
            title: modalTitle,
            userInfo: userInfo,
            modalSize: modalSize,
            showButton: showButton,
        })
        this.setState({ isFormTouched: false })
        this.setState({ activeModal: modal })
    }

    handleSearchByUserStatus = e => {
        const target = e.target
        const { searchByUsername, searchUserSort, userType, isPaymentModeCash } = this.state
        this.setState({ [target.name]: target.value })

        this.setState({ page: 1, downlinePage: 1 })

        this.props.resetUserList()
        if (target.value === '0') {
            this.getRequestUrl(1, 20, target.value, searchByUsername, searchUserSort, userType, isPaymentModeCash)
        } else {
            this.getRequestUrl(1, 20, target.value, searchByUsername, searchUserSort, userType, isPaymentModeCash)
        }

        this.setState({ searchByUsername: '', searchUserStatus: target.value, currentLevel: 1 })
    }

    handleSearchUserSort = e => {
        const target = e.target
        const { searchByUsername, searchUserStatus, userType, isPaymentModeCash } = this.state
        this.props.resetUserList()
        this.setState({ searchUserSort: target.value, page: 1, currentLevel: 1 })
        this.getRequestUrl(1, 20, searchUserStatus, searchByUsername, target.value, userType, isPaymentModeCash)
    }

    handleSearchSubmit = e => {
        e.preventDefault()
        const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state
        this.setState({ submittedUname: true, page: 1, currentLevel: 1 })
        this.props.resetUserList()
        this.setState({ page: 1, downlinePage: 1 })
        if (this.state.searchByUsername) {
            this.getRequestUrl(1, 20, searchUserStatus, this.state.searchByUsername, searchUserSort, userType, isPaymentModeCash)
        } else {
            this.getRequestUrl(1, 20, searchUserStatus, '', searchUserSort, userType, isPaymentModeCash)
        }
    }

    handleChangeUserType = e => {

        const { searchUserSort, isPaymentModeCash } = this.state

        e.preventDefault()
        this.props.resetUserList()
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
            userType: e.target.value,
            page: 1,
            currentLevel: 1,
        })

        this.props.resetCopyUser()
        this.props.resetMemberCredit(this.props.userId);

        this.getRequestUrl(1, 20, 0, '', searchUserSort, e.target.value, isPaymentModeCash)
    }


    handlePaymentModeChange = () => {

        const { searchUserStatus, searchUserSort, searchByUsername, userType } = this.state
        let newPaymentMode = this.state.isPaymentModeCash === 'false' ? true : !this.state.isPaymentModeCash
        this.props.resetUserList();
        this.setState({
            isPaymentModeCash: newPaymentMode,
            page: 1
        });

        this.getRequestUrl(1, 20, searchUserStatus, searchByUsername, searchUserSort, userType, newPaymentMode)
    }

    clearUsername = e => {
        e.preventDefault()
        const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state
        this.setState({ searchByUsername: '' })
        this.setState({ page: 1, downlinePage: 1 })
        this.getRequestUrl(1, 20, searchUserStatus, '', searchUserSort, userType, isPaymentModeCash)
    }

    getUserQuery = (statusId, username, sortOrder, isPaymentModeCash) => {
        const params = { statusId: statusId, username: username, sortOrder: sortOrder, isPaymentModeCash: isPaymentModeCash }
        const searchString = queryString.stringify(params)
        return searchString
    }

    handleUpdateUserStatus = e => {
        const target = e.target
        const name = target ? splitItems(target.name, 1) : 0
        this.setState({ page: 1 })
        this.props.updateUserStatus(name, target.value, this.props.userId)
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            clearValueState: false,
            isFormTouched: true,
        })
    }

    submitMemberCredits = e => {
        e.preventDefault()
        this.setState({ submitted: true })

        const creditLimit = e.target.creditLimit.value
        const remainingBalance = e.target.hiddenRemainingBalance.value
        const currentCredit = e.target.hiddenCredit.value
        const hiddenOutstanding = e.target.hiddenOutstanding.value
        const hiddenMode = e.target.hiddenMode.value

        const maxCredit = this.props.currentUserDetails ? this.props.currentUserDetails.remainingCredit : 0

        if (creditLimit && this.state.updateCredit && Number(creditLimit) >= 0
            && (Number(currentCredit) + Number(maxCredit) >= Number(creditLimit))
            && creditLimit != currentCredit
            && Number(remainingBalance) >= Number(this.state.updateCredit)
            && Number(currentCredit) - Number(this.state.updateCredit) >= Number(hiddenOutstanding)
            && hiddenMode === 'Decrease'
        ) {
            const user_id = e.target.userId.value
            const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state
            const query = queryString.parse(this.props.location.search)

            this.props.updateMemberCredits(user_id, creditLimit, this.props.userId,
                1, this.state.pageSize, this.props.userId,
                userType, searchUserStatus, query.username, searchUserSort, isPaymentModeCash)

            this.setState({ submitted: false });
            this.setState({ updateCredit: '' })
            this.setState({ page: 1, downlinePage: 1 })
        }
        else if (creditLimit && this.state.updateCredit && Number(creditLimit) >= 0
            && (Number(currentCredit) + Number(maxCredit) >= Number(creditLimit))
            && creditLimit != currentCredit
            && hiddenMode === 'Increase'
        ) {
            const user_id = e.target.userId.value
            const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state
            const query = queryString.parse(this.props.location.search)

            this.props.updateMemberCredits(user_id, creditLimit, this.props.userId,
                1, this.state.pageSize, this.props.userId,
                userType, searchUserStatus, query.username, searchUserSort, isPaymentModeCash)

            this.setState({ submitted: false });
            this.setState({ updateCredit: '' })
            this.setState({ page: 1, downlinePage: 1 })
        }
    }


    /*Copy User*/

    submitCopyUser = e => {
        e.preventDefault()
        const { copy_password, copy_credit, copy_name, copy_telephone, userType, isPaymentModeCash } = this.state
        this.setState({ copyUserSubmitted: true })
        const user_id = e.target.copyUserId.value
        const copy_usernameDef = e.target.copy_username.value
        const premadeUsername = e.target.premadeUsername.value
        const maxCredit = this.props.copyUserData ? this.props.copyUserData.maxCredit : 0
        const userUsername = this.props.userTypeId === 20 ? premadeUsername + copy_usernameDef : premadeUsername + copy_usernameDef
        const isCopyUsernameValid = userUsername && usernameRegex.test(userUsername) && copy_usernameDef.length <= 15

        if (isCopyUsernameValid && userUsername && copy_password && !isPaymentModeCash && copy_credit && copy_name && user_id &&
            copy_credit <= maxCredit && copy_password.length >= 8 && isCopyUsernameValid
            && (!copy_telephone || (phoneRegex.test(copy_telephone) && copy_telephone.length >= 7 && copy_telephone.length <= 15))) {
            const data = {
                'copyUserId': `${user_id}`,
                'username': `${userUsername}`,
                'password': `${copy_password}`,
                'telephoneNumber': `${copy_telephone}`,
                'name': `${copy_name}`,
                'creditLimit': `${copy_credit}`,
                'createdBy': this.props.userId
            }
            const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state
            const query = queryString.parse(this.props.location.search)

            this.props.addCopyUserDetails(data, 1, this.state.pageSize, this.props.userId, userType, searchUserStatus, query.username, searchUserSort, isPaymentModeCash)
            this.setState({ copy_password: '', copy_securityCode: '', copy_name: '', copy_telephone: '', copy_credit: '' })
            this.setState({ copyUserSubmitted: false })
            this.setState({ page: 1, downlinePage: 1 })
        }

        if (isCopyUsernameValid && userUsername && copy_password && isPaymentModeCash && copy_name && user_id &&
            copy_password.length >= 8 && (!copy_telephone || (phoneRegex.test(copy_telephone) && copy_telephone.length >= 7 && copy_telephone.length <= 15)) && userType === 'member') {

            const data = {
                'copyUserId': `${user_id}`,
                'username': `${userUsername}`,
                'password': `${copy_password}`,
                'telephoneNumber': `${copy_telephone}`,
                'name': `${copy_name}`,
                'creditLimit': 0,
                'createdBy': this.props.userId
            }

            const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state
            const query = queryString.parse(this.props.location.search)
            this.setState({ copy_password: '', copy_securityCode: '', copy_name: '', copy_telephone: '', copy_credit: '' })
            this.props.addCopyUserDetails(data, 1, this.state.pageSize, this.props.userId, userType, searchUserStatus, query.username, searchUserSort, isPaymentModeCash)
            this.setState({ copyUserSubmitted: false })

            this.setState({ page: 1, downlinePage: 1 })
        }


        if (isCopyUsernameValid && copy_password && isPaymentModeCash && copy_name && user_id &&
            copy_credit && copy_credit <= maxCredit && copy_password.length >= 8 && (!copy_telephone || (phoneRegex.test(copy_telephone) && copy_telephone.length >= 7 && copy_telephone.length <= 15)) && userType === 'agent') {

            const data = {
                'copyUserId': `${user_id}`,
                'username': `${userUsername}`,
                'password': `${copy_password}`,
                'telephoneNumber': `${copy_telephone}`,
                'name': `${copy_name}`,
                'creditLimit': `${copy_credit}`,
                'createdBy': this.props.userId
            }

            const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state
            const query = queryString.parse(this.props.location.search)
            this.setState({ copy_password: '', copy_securityCode: '', copy_name: '', copy_telephone: '', copy_credit: '' })
            this.props.addCopyUserDetails(data, 1, this.state.pageSize, this.props.userId, userType, searchUserStatus, query.username, searchUserSort, isPaymentModeCash)
            this.setState({ copyUserSubmitted: false })

            this.setState({ page: 1, downlinePage: 1 })
        }
    }

    /*End Copy User*/

    handleOnPageChange(page) {
        const { agents } = this.props
        const { searchUserSort, searchUserStatus, userType, isPaymentModeCash } = this.state

        if (agents.pageCount >= page + 1) {
            this.setState({
                page: this.state.page + 1
            })
            this.getRequestUrl(page + 1, this.state.pageSize, searchUserStatus, this.state.searchByUsername, searchUserSort, userType, isPaymentModeCash, true)
        }
    }

    changeUserLevel(level, userId) {

        this.props.resetUserListDownline();

        this.setState({
            downlinesUserId: userId === this.props.userId ? 0 : userId,
            downlinesSubmittedUname: false,
            downlinePage: 1
        })

        this.setState({ currentLevel: level });

        if (level === 1) {
            const { userType, isPaymentModeCash, downlinesIsPaymentModeCash } = this.state

            this.setState({ isPaymentModeCash: downlinesIsPaymentModeCash })
            this.setState({
                searchUserSort: this.state.downlinesSearchUserSort,
                searchByUsername: this.state.downlinesSearchByUsername,
                searchUserStatus: this.state.downlineSearchUserStatus,
                userType: userType
            })

            this.setState({
                page: 1
            })

            if (isPaymentModeCash != downlinesIsPaymentModeCash) {
                this.getRequestUrl(1, 20, this.state.downlineSearchUserStatus,
                    this.state.downlinesSearchByUsername, this.state.downlinesSearchUserSort
                    , userType, downlinesIsPaymentModeCash)
            } else {
                this.getRequestUrl(1, 20, this.state.downlineSearchUserStatus,
                    this.state.downlinesSearchByUsername, this.state.downlinesSearchUserSort
                    , userType, downlinesIsPaymentModeCash)
            }
        } else if (level === 2 && this.state.currentLevel === 1) {

            const { searchUserStatus } = this.state

            this.setState({
                downlinesSearchUserSort: this.state.searchUserSort,
                downlinesSearchByUsername: this.state.searchByUsername,
                downlineSearchUserStatus: this.state.searchUserStatus,
                downlinesUserType: 'agent',
            })

            this.setState({ downlinesIsPaymentModeCash: this.state.isPaymentModeCash })

            this.props.getAgentDownlineLists(1, 20, userId, 10, searchUserStatus, this.state.searchByUsername, this.state.searchUserSort, this.state.isPaymentModeCash)
        }
        else {
            this.setState({
                downlinesUserType: 'agent',
            })

            this.props.getAgentDownlineLists(1, 20, userId, 10, this.state.downlineSearchUserStatus, this.state.searchByUsername, this.state.searchUserSort, this.state.downlinesIsPaymentModeCash)
        }
    }



    getRequestUrl = (page, pageSize, statusId, username, sortOrder, userType, isPaymentModeCash, isScroll = false) => {
        this.props.history.push(`${userListURL}/${userType}?${this.getUserQuery(statusId, username, sortOrder, isPaymentModeCash)}`)
        this.props.getAgentLists(page, pageSize, userType, this.props.userId, statusId, username, sortOrder, isPaymentModeCash, isScroll)
    }


    handleOnDownlinePageChange = (page) => {
        const { downlinesSearchUserSort, downlineSearchUserStatus, downlinesUserType, downlinesSearchByUsername, downlinesUserId, downlinesIsPaymentModeCash } = this.state
        const { downlines } = this.props

        if (downlines.pageCount >= page + 1) {
            this.setState({
                downlinePage: this.state.downlinePage + 1
            })
            this.props.getAgentDownlineLists(page + 1,
                20,
                downlinesUserId,
                downlinesUserType,
                downlineSearchUserStatus,
                downlinesSearchByUsername,
                downlinesSearchUserSort,
                downlinesIsPaymentModeCash,
                true)
        }
    }


    handleDownlineSearchSubmit = e => {
        const { downlinesSearchUserSort, downlineSearchUserStatus, downlinesUserType, downlinesSearchByUsername, downlinesUserId, downlinesIsPaymentModeCash } = this.state
        this.setState({ submittedUname: true, downlinePage: 1 });
        this.props.resetUserListDownline()
        this.setState({ downlinePage: 1 })
        if (this.state.downlinesSearchByUsername) {
            this.props.getAgentDownlineLists(1, 20, downlinesUserId, downlinesUserType, downlineSearchUserStatus, downlinesSearchByUsername, downlinesSearchUserSort, downlinesIsPaymentModeCash)
        } else {
            this.props.getAgentDownlineLists(1, 20, downlinesUserId, downlinesUserType, downlineSearchUserStatus, '', downlinesSearchUserSort, downlinesIsPaymentModeCash)
        }
    }

    handleSearchDownlineUserSort = e => {
        const target = e.target
        const { downlinesSearchByUsername, downlineSearchUserStatus, downlinesUserType, downlinesUserId, downlinesIsPaymentModeCash } = this.state
        this.props.resetUserListDownline()
        this.setState({ downlinesSearchUserSort: target.value })

        this.setState({ downlinePage: 1 })

        this.props.getAgentDownlineLists(1, 20, downlinesUserId, downlinesUserType, downlineSearchUserStatus, downlinesSearchByUsername, target.value, downlinesIsPaymentModeCash)
    }


    handleChangeDownlineUserType = e => {

        e.preventDefault()

        this.props.resetUserListDownline()

        const { downlinesSearchByUsername, downlineSearchUserStatus, downlinesSearchUserSort, downlinesUserId, downlines, downlinesIsPaymentModeCash } = this.state

        if (e.target.value === 'agent' && Number(downlineSearchUserStatus) === 300) {
            this.setState({
                downlineSearchUserStatus: 0
            })
        }

        this.setState({ [e.target.name]: e.target.value })

        this.props.getAgentDownlineLists(1, 20, downlinesUserId, e.target.value, e.target.value === 'agent' && Number(downlineSearchUserStatus) === 300 ? 0 : downlineSearchUserStatus, downlinesSearchByUsername, downlinesSearchUserSort, downlinesIsPaymentModeCash)

        this.setState({
            downlinesUserType: e.target.value,
            downlinePage: 1,
        })
    }


    handleSearchDownlineByUserStatus = e => {
        const target = e.target
        const { downlinesSearchByUsername, downlinesSearchUserSort, downlinesUserId, downlinesUserType, downlinesIsPaymentModeCash } = this.state
        this.setState({ [target.name]: target.value })
        this.props.resetUserListDownline()

        this.setState({ downlinePage: 1 })

        if (target.value === '0') {
            this.props.getAgentDownlineLists(1, 20, downlinesUserId, downlinesUserType, '0', downlinesSearchByUsername, downlinesSearchUserSort, downlinesIsPaymentModeCash)
        } else {
            this.props.getAgentDownlineLists(1, 20, downlinesUserId, downlinesUserType, e.target.value, downlinesSearchByUsername, downlinesSearchUserSort, downlinesIsPaymentModeCash)
        }

        this.setState({
            downlineSearchUserStatus: target.value
        })
    }



    handleDownlinePaymentModeChange = () => {
        let newPaymentMode = this.state.downlinesIsPaymentModeCash === 'false' ? true : !this.state.downlinesIsPaymentModeCash
        this.props.resetUserListDownline();

        this.setState({
            downlinesIsPaymentModeCash: newPaymentMode,
            downlinePage: 1,
        });

        const { downlinesSearchByUsername, downlinesSearchUserSort, downlinesUserId, downlinesUserType,
            downlineSearchUserStatus } = this.state

        this.props.getAgentDownlineLists(1, 20, downlinesUserId,
            downlinesUserType, downlineSearchUserStatus, downlinesSearchByUsername,
            downlinesSearchUserSort, newPaymentMode)
    }

    handleWaypointEnter() {
        const { page } = this.state
        this.handleOnPageChange(page)
    }

    handleDownlineWaypointEnter() {
        const { downlinePage } = this.state
        this.handleOnDownlinePageChange(downlinePage)
    }

    render() {

        const { userType, activeModal, userStatus, searchUserStatus,
            searchByUsername,
            searchUserSort, submittedUname,
            isPaymentModeCash,
            currentLevel,
            downlinesUserType,
            downlinesSearchByUsername,
            downlinesSubmittedUname,
            downlinesSearchUserSort,
            downlineSearchUserStatus,
            downlineDetails,
            downlinesIsPaymentModeCash,
            nameEdit,
            telephoneEdit,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            isFormTouched } = this.state

        let searchStatusOptions, downlineSearchStatusOptions = []

        const { loadingAgents, error, agents, message,
            downlines, loadingDownlines,
            downlinesUserId } = this.props

        const access = (this.props.access) ? JSON.parse(this.props.access) : null


        if (error) return <MaintenancePage message={message} />


        if (userType === 'agent') {
            searchStatusOptions = agentStatus
        } else {
            searchStatusOptions = memberStatus
        }

        if (downlinesUserType === 'agent') {
            downlineSearchStatusOptions = agentStatus
        } else {
            downlineSearchStatusOptions = memberStatus
        }

        if (currentLevel === 1) {
            return (
                <div className='animated fadeIn'>
                    <Card>
                        <CardHeader className='table-head' size='sm'>
                            <h5 style={{ display: 'inline-block', paddingTop: 4 }}>
                                {formattedMessages.manageMembersUserLists}
                            </h5>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs='12' lg='12'>
                                    <div className='form-row responsive' style={{ marginBottom: 20, marginLeft: 5 }}>
                                        <div className='row' style={{ marginRight: 18 }}>
                                            <div style={{ marginRight: 2, marginTop: 5, }}>
                                                <FormattedMessage id='Accounts.Username' defaultMessage='Username' >
                                                    {usernamefm =>
                                                        <input
                                                            name='searchByUsername'
                                                            className={(submittedUname && !searchByUsername) ? `form-control has-error` : `form-control`}
                                                            type='text'
                                                            placeholder={usernamefm}
                                                            value={searchByUsername}
                                                            onChange={this.handleChange}
                                                            style={{ height: 35, width: 179 }} />}

                                                </FormattedMessage>

                                                {submittedUname && !searchByUsername &&
                                                    <span style={{ color: 'red' }}>This field is required.</span>
                                                }
                                            </div>
                                        </div>

                                        <div className='row' style={{ marginRight: 18 }}>
                                            <div style={{}}>
                                                <Button style={{ width: 110, marginTop: 5 }} onClick={this.handleSearchSubmit} color='dark'>
                                                    <i className='fa fa-search fa-lg hide' /> {formattedMessages.search}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className='row' style={{ marginRight: 20, marginTop: 5 }}>
                                            <select style={{ height: 35, width: 250, background: '#fff' }} name='searchUserSort' onChange={this.handleSearchUserSort} value={searchUserSort}>
                                                {userSortOrder.map((item, i) => {
                                                    return <FormattedMessage id={item.name} defaultMessage='Order' key={i}>
                                                        {optionfm => <option value={item.id} key={item.id}>{optionfm}</option>}
                                                    </FormattedMessage>
                                                })}
                                            </select>
                                        </div>

                                        <div className='row' style={{ marginTop: 5 }}>
                                            <div style={{ marginRight: 5 }}>
                                                <select style={{ height: 35, width: 90, background: '#fff' }} name='userType' onChange={this.handleChangeUserType} value={userType}>
                                                    <FormattedMessage id='Members.Agent' defaultMessage='Agent' >
                                                        {agent =>
                                                            <option value='agent'>{agent}</option>}
                                                    </FormattedMessage>

                                                    <FormattedMessage id='Global.Member' defaultMessage='Member' >
                                                        {member =>
                                                            <option value='member'>{member}</option>}
                                                    </FormattedMessage>
                                                </select>
                                            </div>

                                            <div style={{ marginRight: 5 }}>
                                                <select style={{ height: 35, width: 90, background: '#fff' }} name='searchUserStatus'
                                                    onChange={this.handleSearchByUserStatus} value={searchUserStatus}>
                                                    <FormattedMessage id='Global.All' defaultMessage='All' >
                                                        {(option) => <option value='0'>{option}</option>}
                                                    </FormattedMessage>

                                                    {searchStatusOptions.map((item, i) => {
                                                        return <FormattedMessage id={item.name} defaultMessage='No Bet' key={i}>
                                                            {(option) => <option value={item.id} key={item.id}>{option}</option>}
                                                        </FormattedMessage>
                                                    })}
                                                </select>
                                            </div>

                                            <ToggleButton optionClicked={this.handlePaymentModeChange} option1={formattedMessages.credit} option2={formattedMessages.cash} isPaymentModeCash={isPaymentModeCash} />
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                {agents.rowCount === 0 &&
                                    <h5 style={{ marginLeft: 20 }}>{formattedMessages.noDataFound}</h5>
                                }
                                {agents.data && !loadingAgents &&
                                    <div style={{ width: '100%' }} className='table-bordered-dot'>
                                        {agents.length === 0 &&
                                            <h5 className='mt-3 fade show' style={{ marginLeft: 20 }}>{formattedMessages.noDataFound}</h5>
                                        }
                                        {agents.data.length !== 0 &&
                                            <ScrollableDiv>
                                                <Table style={{ backgroundColor: 'white' }} responsive size='sm' className='responsive-table'>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>{formattedMessages.username}</th>
                                                            <th>{formattedMessages.name}</th>
                                                            <th>{formattedMessages.nickName}  </th>
                                                            <th className='th-status'>{formattedMessages.status}</th>
                                                            {!loadingAgents && (isPaymentModeCash === false || isPaymentModeCash === 'false') &&
                                                                <th>{formattedMessages.credit}</th>
                                                            }

                                                            {!loadingAgents && userType === 'member' && (isPaymentModeCash === false || isPaymentModeCash === 'false') &&
                                                                <th className='align-right'>{formattedMessages.balance}</th>
                                                            }

                                                            {!loadingAgents && (isPaymentModeCash === false || isPaymentModeCash === 'false') &&
                                                                <th className='align-right'>{formattedMessages.availableCredit}</th>
                                                            }

                                                            {!loadingAgents && userType === 'member' && (isPaymentModeCash === true || isPaymentModeCash === 'true') &&
                                                                <th className='align-right'>{formattedMessages.availableBalance}</th>
                                                            }

                                                            {!loadingAgents && userType === 'member' &&
                                                                <th className='align-right'>Outstanding Bets</th>
                                                            }
                                                            {!loadingAgents && userType === 'agent' &&
                                                                <th className='align-right'>{formattedMessages.downline}</th>
                                                            }
                                                            <th className='align-center'>{formattedMessages.manage}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <RenderMembers
                                                            data={agents.data}
                                                            agents={agents}
                                                            userType={userType}
                                                            userStatus={userStatus}
                                                            onOpenModal={this.onOpenModal}
                                                            changeUserLevel={this.changeUserLevel}
                                                            isPaymentModeCash={isPaymentModeCash}
                                                            currentLevel={this.state.currentLevel}
                                                            handleUpdateUserStatus={this.handleUpdateUserStatus}
                                                        />
                                                    </tbody>
                                                </Table>
                                                <Waypoint
                                                    onEnter={() => this.handleWaypointEnter()}
                                                />
                                            </ScrollableDiv>
                                        }
                                    </div>
                                }
                            </Row>
                        </CardBody>
                    </Card>

                    <ModalComponent
                        onClose={this.closeModal}
                        onSaveLabel={
                            (activeModal !== 'logs')
                                ? formattedMessages.save : (activeModal === 'details') ? 'Edit' : ''}
                        userTypeId={this.props.userTypeId}
                        isAllowedToSave={this.props.userTypeId !== 20 || this.props.userTypeId === 20 && access.filter(x => x.value === 'member_management' && x.isChecked === true).length > 0}
                    >
                        {activeModal && activeModal === 'copy_agent' &&

                            <CopyUser
                                {...this.state}
                                handleChange={this.handleChange}
                                handleSubmit={this.submitCopyUser}
                                clearValue={this.closeModal}
                                modalSize='md'
                                isPaymentModeCash={isPaymentModeCash}
                                updateCopyUserName={this.updateCopyUserName}
                                ut={Capitalize(userType)} />

                        }

                        {activeModal && activeModal === 'cpassword' &&
                            <ResetPassword onClose={this.closeModal} isFromModal={true} />
                        }

                        {activeModal && activeModal === 'logs' &&
                            <Log />
                        }

                        {activeModal && activeModal === 'newUsers' &&
                            <NewUsers />
                        }

                        {activeModal && activeModal === 'outstandingBet' &&
                            <MemberOutstanding />
                        }

                        {activeModal && activeModal === 'details' && this.props.userTypeId !== 20 &&
                            <ViewMemberDetail
                                userType={Capitalize(userType)}
                                modalSize='x-lg'
                                up={this.updateUser}
                                nameEdit={nameEdit}
                                telephoneEdit={telephoneEdit}
                                handleChange={this.handleChange}
                                toggleSwitch={this.toggleSwitch}
                                monday={monday}
                                tuesday={tuesday}
                                wednesday={wednesday}
                                thursday={thursday}
                                friday={friday}
                                saturday={saturday}
                                sunday={sunday}
                                {...this.state}
                                clearValue={this.closeModal}
                                onSave={() => this.updateUser()}
                                isFormTouched={isFormTouched}
                                toggleSoccer={this.toggleSoccer}
                                toggleCricket={this.toggleCricket}
                                toggleSports={this.toggleSports}
                                handleItemSelection={this.handleItemSelection}
                                toggleParlay={this.toggleParlay}
                                toggleCasino={this.toggleCasino}
                                toggleLiveCasino={this.toggleLiveCasino}
                                toggleKenoLottery={this.toggleKenoLottery}
                                toggleVirtual={this.toggleVirtual}
                                isSoccerValid={this.isSoccerValid}
                                isCricketValid={this.isCricketValid}
                                isSportsValid={this.isSportsValid}
                                isParlayValid={this.isParlayValid}
                                isCasinoValid={this.isCasinoValid}
                                isLiveCasinoIsValid={this.isLiveCasinoIsValid}
                                isKenoLotteryIsValid={this.isKenoLotteryIsValid}
                                isVirtualValid={this.isVirtualValid}
                                toggleBrandRestriction={this.toggleBrandRestriction}
                            />
                        }

                        {activeModal && activeModal === 'details' && this.props.userTypeId === 20 &&
                            access.filter(x => x.value === 'member_management' && x.isChecked === true).length > 0 &&
                            <ViewMemberDetail
                                userType={Capitalize(userType)}
                                modalSize='x-lg'
                                up={this.updateUser}
                                nameEdit={nameEdit}
                                telephoneEdit={telephoneEdit}
                                handleChange={this.handleChange}
                                toggleSwitch={this.toggleSwitch}
                                monday={monday}
                                tuesday={tuesday}
                                wednesday={wednesday}
                                thursday={thursday}
                                friday={friday}
                                saturday={saturday}
                                sunday={sunday}
                                {...this.state}
                                clearValue={this.closeModal}
                                onSave={() => this.updateUser()}
                                isFormTouched={isFormTouched}
                                toggleSoccer={this.toggleSoccer}
                                toggleSports={this.toggleSports}
                                toggleCricket={this.toggleCricket}
                                handleItemSelection={this.handleItemSelection}
                                toggleParlay={this.toggleParlay}
                                toggleCasino={this.toggleCasino}
                                toggleLiveCasino={this.toggleLiveCasino}
                                toggleKenoLottery={this.toggleKenoLottery}
                                toggleVirtual={this.toggleVirtual}
                                isSoccerValid={this.isSoccerValid}
                                isCricketValid={this.isCricketValid}
                                isSportsValid={this.isSportsValid}
                                isParlayValid={this.isParlayValid}
                                isCasinoValid={this.isCasinoValid}
                                isLiveCasinoIsValid={this.isLiveCasinoIsValid}
                                isKenoLotteryIsValid={this.isKenoLotteryIsValid}
                                isVirtualValid={this.isVirtualValid}
                                toggleBrandRestriction={this.toggleBrandRestriction}
                            />
                        }

                        {activeModal && activeModal === 'details' && this.props.userTypeId === 20 &&
                            access.filter(x => x.value === 'member_management' && x.isChecked === true).length < 1 &&
                            <ViewMemberDetails
                                userType={currentLevel === 1 ? Capitalize(userType) : Capitalize(downlinesUserType)}
                                modalSize='x-lg'
                                clearValue={this.closeModal} />
                        }

                        {activeModal && activeModal === 'manage_credit' &&
                            <ManageCredit
                                {...this.state}
                                handleChange={this.handleChange}
                                handleSubmit={this.submitMemberCredits}
                                clearValue={this.closeModal}
                                remainingCredit={this.props.currentUserDetails.remainingCredit}
                            />
                        }


                    </ModalComponent>
                    <Modal className='modal-dialog modal-dialog-centered' isOpen={this.state.isUpdateUserConfirmationModalVisible} toggle={this.toggleUpdateUserConfirmationModal} style={{ maxWidth: '300px', height: '148px' }}>
                        <ModalBody className='red-modal'>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <UIIcon type='warning' size={60} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <label style={{ fontSize: '16px', fontFamily: 'Arial', fontWeight: 'bold', marginLeft: '5px', marginTop: '5px' }}> Confirm Changes</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>
                                    <label style={{ fontSize: '14px', fontFamily: 'Arial', textAlign: 'center', color: '#F9F2F2', opacity: '0.5', letterSpacing: '0.5px' }}> Your most recent changes will be saved.</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <Button className='modal-button-responsiveness confirm-yellow-button' onClick={() => this.confirmUpdateUser()}>{formattedMessages.save}</Button>
                                    </div>
                                    <div>
                                        <Button className='modal-button-responsiveness confirm-yellow-button' onClick={() => this.toggleUpdateUserConfirmationModal()}>{formattedMessages.cancel}</Button>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>

                    <Modal className='modal-dialog modal-dialog-centered' isOpen={this.state.isCloseConfirmationModalVisible} toggle={this.toggleCloseConfirmationModal} style={{ maxWidth: '300px', height: '148px' }}>
                        <ModalBody className='red-modal'>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div>
                                        <UIIcon type='warning' size={60} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <label style={{ fontSize: '16px', fontFamily: 'Arial', fontWeight: 'bold', marginLeft: '5px', marginTop: '5px' }}> Confirm close</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 0 }}>
                                    <label style={{ fontSize: '14px', fontFamily: 'Arial', textAlign: 'center', color: '#F9F2F2', opacity: '0.5', letterSpacing: '0.5px' }}> Without saving, your changes will be lost.</label>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <Button className='modal-button-responsiveness confirm-yellow-button' onClick={() => this.confirmCloseConfirmationModal()}>{formattedMessages.close}</Button>
                                    </div>
                                    <div>
                                        <Button className='modal-button-responsiveness confirm-yellow-button' onClick={() => this.toggleCloseConfirmationModal()}>{formattedMessages.cancel}</Button>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            )
        } else {
            return (<div className='animated fadeIn'>
                <Card>
                    <CardHeader className='table-head' size='sm'>
                        <h5 style={{ display: 'inline-block', paddingTop: 4 }}>{formattedMessages.manageMembersUserLists}
                            {downlineDetails && downlineDetails.map((item) => {
                                return <span style={{ cursor: 'pointer' }} onClick={this.changeUserLevel.bind(this, item.hierarchy, item.userId)}> / {item.username}  </span>
                            })}
                        </h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs='12' lg='12'>
                                <div className='form-row responsive' style={{ marginBottom: 20, marginLeft: 5 }}>
                                    <div className='row' style={{ marginRight: 18 }}>
                                        <div style={{ marginRight: 2, marginTop: 5, }}>
                                            <FormattedMessage id='Accounts.Username' defaultMessage='Username' >
                                                {usernamefm =>
                                                    <input
                                                        name='downlinesSearchByUsername'
                                                        className={(downlinesSubmittedUname && !downlinesSearchByUsername) ? `form-control has-error` : `form-control`}
                                                        type='text'
                                                        placeholder={usernamefm}
                                                        value={downlinesSearchByUsername}
                                                        onChange={this.handleChange}
                                                        style={{ height: 35, width: 179 }} />}
                                            </FormattedMessage>
                                        </div>
                                        <div style={{}}>
                                            <Button style={{ width: 110, marginTop: 5 }} onClick={this.handleDownlineSearchSubmit} color='dark'>
                                                <i className='fa fa-search fa-lg hide' /> {formattedMessages.search}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='row' style={{ marginRight: 20, marginTop: 5 }}>
                                        <select style={{ height: 35, width: 250, background: '#fff' }} name='downlinesSearchUserSort' onChange={this.handleSearchDownlineUserSort} value={downlinesSearchUserSort}>
                                            {userSortOrder.map(item => {
                                                return <FormattedMessage id={item.name} defaultMessage='Order'>
                                                    {option => <option value={item.id} key={item.id}>{option}</option>}
                                                </FormattedMessage>
                                            })}
                                        </select>
                                    </div>
                                    <div className='row' style={{ marginTop: 5 }}>
                                        <div style={{ marginRight: 5 }}>
                                            <select style={{ height: 35, width: 90, background: '#fff' }} name='downlinesUserType' onChange={this.handleChangeDownlineUserType} value={downlinesUserType}>
                                                <FormattedMessage id='Members.Agent' defaultMessage='Agent' >
                                                    {agent =>
                                                        <option value='agent'>{agent}</option>}
                                                </FormattedMessage>

                                                <FormattedMessage id='Global.Member' defaultMessage='Member' >
                                                    {member =>
                                                        <option value='member'>{member}</option>}
                                                </FormattedMessage>
                                            </select>
                                        </div>

                                        <div style={{ marginRight: 5 }}>
                                            <select style={{ height: 35, width: 90, background: '#fff' }} name='downlineSearchUserStatus' onChange={this.handleSearchDownlineByUserStatus} value={downlineSearchUserStatus}>
                                                <FormattedMessage id='Global.All' defaultMessage='All' >
                                                    {(option) => <option value='0'>{option}</option>}
                                                </FormattedMessage>
                                                {downlineSearchStatusOptions.map(item => {
                                                    return <FormattedMessage id={item.name} defaultMessage='No Bet' >
                                                        {(option) => <option value={item.id} key={item.id}>{option}</option>}
                                                    </FormattedMessage>
                                                })}
                                            </select>
                                        </div>

                                        <ToggleButton optionClicked={this.handleDownlinePaymentModeChange} option1={formattedMessages.credit} option2={formattedMessages.cash} isPaymentModeCash={downlinesIsPaymentModeCash} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {loadingDownlines &&
                                <h5 className='mt-3 fade show' style={{ marginLeft: 20 }}>{formattedMessages.pleasewait}</h5>
                            }
                            {downlines.rowCount === 0 &&
                                <h5 style={{ marginLeft: 20 }}>{formattedMessages.noDataFound}</h5>
                            }
                            {downlines.data && !loadingDownlines &&
                                <div style={{ width: '100%' }} className='table-bordered-dot'>
                                    {downlines.length === 0 &&
                                        <h5 className='mt-3 fade show' style={{ marginLeft: 20 }}>{formattedMessages.noDataFound}</h5>
                                    }
                                    {downlines.data.length !== 0 &&
                                        <ScrollableDiv>
                                            <Table style={{ backgroundColor: '#fff' }} responsive size='sm' className='responsive-table'>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>{formattedMessages.username}</th>
                                                        <th>{formattedMessages.name}</th>
                                                        <th>{formattedMessages.nickName}  </th>
                                                        <th style={{ width: 125 }}>{formattedMessages.status}</th>

                                                        {!loadingDownlines && (downlinesIsPaymentModeCash === false || downlinesIsPaymentModeCash === 'false') &&
                                                            <th>{formattedMessages.credit}</th>
                                                        }

                                                        {!loadingDownlines && downlinesUserType === 'member' && (downlinesIsPaymentModeCash === false || downlinesIsPaymentModeCash === 'false') &&
                                                            <th className='align-right'>{formattedMessages.balance}</th>
                                                        }

                                                        {!loadingDownlines && (downlinesIsPaymentModeCash === false || downlinesIsPaymentModeCash === 'false') &&
                                                            <th className='align-right'>{formattedMessages.availableCredit}</th>
                                                        }

                                                        {!loadingDownlines && downlinesUserType === 'member' && (downlinesIsPaymentModeCash === true || downlinesIsPaymentModeCash === 'true') &&
                                                            <th className='align-right'>{formattedMessages.availableBalance}</th>
                                                        }

                                                        {!loadingDownlines && downlinesUserType === 'member' &&
                                                            <th className='align-right'>Outstanding Bets</th>
                                                        }
                                                        {!loadingDownlines && downlinesUserType === 'agent' &&
                                                            <th className='align-right'>{formattedMessages.downline}</th>
                                                        }
                                                        <th className='align-center'>{formattedMessages.manage}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <RenderDownlines
                                                        data={downlines.data}
                                                        agents={downlines}
                                                        userType={downlinesUserType}
                                                        userStatus={downlinesUserId}
                                                        onOpenModal={this.onOpenModal}
                                                        changeUserLevel={this.changeUserLevel}
                                                        currentLevel={this.state.currentLevel}
                                                        handleUpdateUserStatus={this.handleUpdateUserStatus}
                                                        isPaymentModeCash={downlinesIsPaymentModeCash}

                                                    />
                                                </tbody>
                                            </Table>

                                            <Waypoint
                                                onEnter={() => this.handleDownlineWaypointEnter()}
                                            />
                                        </ScrollableDiv>
                                    }
                                </div>
                            }
                        </Row>
                    </CardBody>
                </Card>

                <ModalComponent
                    onClose={this.closeModal}
                    onSaveLabel={
                        (activeModal !== 'logs')
                            ? 'Save' : (activeModal === 'details') ? 'Edit' : ''}
                >
                    {activeModal && activeModal === 'logs' &&
                        <Log />
                    }
                    {activeModal && activeModal === 'newUsers' &&
                        <NewUsers />
                    }
                    {activeModal && activeModal === 'details' &&
                        <ViewMemberDetails
                            userType={currentLevel === 1 ? Capitalize(userType) : Capitalize(downlinesUserType)}
                            modalSize='x-lg' />
                    }
                    {activeModal && activeModal === 'outstandingBet' &&
                        <MemberOutstanding modalSize='lg'  />
                    }
                </ModalComponent>
            </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    loadingAgents: state.members.loading,
    agents: state.members.agents,
    error: state.members.error,
    downlines: state.membersDownline.agents,
    loadingDownlines: state.membersDownline.loading,
    downlinesError: state.membersDownline.error,
    message: state.members.message,
    userId: state.auth.userId,
    addCopyAgentSuccess: state.addCopyUser.success,
    copyUserData: state.getCopyUser.data,
    memberDetails: state.memberDetail.details,
    currentUserDetails: state.currentUser.details,
    modalUserId: (state.modal.modalProps.userInfo !== 0) ? state.modal.modalProps.userInfo : '',
    userTypeId: state.securityCode.user.userTypeId,
    access: state.securityCode.user.access,
})

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (modalProps) => {
        dispatch(showModal({ modalProps }))
    },
    getAgentLists: (page, pageSize, userType, id, statusId, username, sortOrder, isPaymentModeCash, isScroll) => dispatch(getAgentLists(page, pageSize, userType, id, statusId, username, sortOrder, isPaymentModeCash, isScroll)),
    getAgentDownlineLists: (page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash, isScroll) => dispatch(getAgentDownlineLists(page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash, isScroll)),
    updateMemberCredits: (user_id, creditLimit, modifiedBy, page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash) => dispatch(updateMemberCredits(user_id,
        creditLimit, modifiedBy, page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash)),
    updateUserStatus: (id, status, modifiedBy) => dispatch(updateUserStatus(id, status, modifiedBy)),
    addCopyUserDetails: (data, page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash) => dispatch(addCopyUserDetails(data, page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash)),
    resetUserList: () => dispatch(resetUserList()),
    resetUserListDownline: () => dispatch(resetUserListDownline()),
    resetCopyUser: () => dispatch(resetCopyUser()),
    resetMemberCredit: (userId) => dispatch(resetMemberCredit(userId)),
    getMemberDetails: (userId) => dispatch(getMemberDetails(userId)),
    updateMember: (data, page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash) => dispatch(updateMember(data, page, pageSize, id, userType, statusId, username, sortOrder, isPaymentModeCash))
})

PropTypes.UserLists = {
    loadingAgents: PropTypes.bool.isRequired,
    agents: PropTypes.object.isRequired,
    downlines: PropTypes.object.isRequired,
    hideModal: PropTypes.func,
    showModal: PropTypes.func,
    getAgentLists: PropTypes.func.isRequired,
    getAgentDownlineLists: PropTypes.func.isRequired,
    updateMemberCredits: PropTypes.func.isRequired,
    updateUserStatus: PropTypes.func.isRequired,
    addCopyUserDetails: PropTypes.func.isRequired,
    resetUserList: PropTypes.func.isRequired,
    resetUserListDownline: PropTypes.func.isRequired,
    resetCopyUser: PropTypes.func.isRequired,
    resetMemberCredit: PropTypes.func.isRequired,
    getMemberDetails: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
    userId: PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLists)
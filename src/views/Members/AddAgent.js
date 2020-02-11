import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Alert
} from 'reactstrap'

import { FormattedMessage } from 'react-intl'

import CopyUser from './Userlist/CopyUser'
import PaymentSettings from './PaymentSettings'
import ModalComponent from '../../components/Modal'
import AddMemberInformation from './AddMemberInformation'
import VerticalSettings from './VerticalSettings/VerticalSettings'
import ButtonsHeader from './ButtonsHeader'
import { showModal, hideModal } from '../../actions/modal'
import { getCreateMemberSetup } from '../../actions/members/createMemberDetails'
import { resetAddMember } from '../../actions/members/resetAddMemberAction'
import { doAddMember } from '../../actions/members/addMemberAction'
import { Capitalize, hypenToUnderscore, emailRegex, phoneRegex, usernameRegex, nameRegex, isNullOrUndefined } from '../../utils/helpers'
import MaintenancePage from '../../components/MaintenancePage'
import MemberSettings from './MemberSettings';
import { copyPtFm } from './translation';

const formattedMessages = {
	agent: <FormattedMessage id='Members.Agent' defaultMessage='Agent' />,
	member: <FormattedMessage id='Global.Member' defaultMessage='Member' />,
	save: <FormattedMessage id='Global.Save' defaultMessage='Save' />,
	verticalWarning: <FormattedMessage id='Global.VerticalWarning' defaultMessage='Please fill out the vertical settings or disable each form if not neccesarry' />,
	transferDayWarning: <FormattedMessage id='Global.TransferDayWarning' defaultMessage='Must select at least one transfer day' />,
	userCreateSuccess: <FormattedMessage id='Members.UserCreateSuccess' defaultMessage='User successfully added' />,
	pleaseWait: <FormattedMessage id='Global.PleaseWait' defaultMessage='Please wait...' />,
	manageMembers: <FormattedMessage id='Global.ManageMembers' defaultMessage='Manage Members' />,
	createAgent: <FormattedMessage id='Navigation.CreateAgent' defaultMessage='Create Agent' />,
	createMember: <FormattedMessage id='Global.CreateMember' defaultMessage='Create Member' />,
	copyAgent: <FormattedMessage id='Members.CopyAgent' defaultMessage='Copy Agent' />,
	copyMember: <FormattedMessage id='Global.CopyMember' defaultMessage='Copy Member' />,
}


const AGENT = 'agent', CATEGORY_SOCCER = 1, CATEGORY_SPORTS = 2, CATEGORY_PARLAY = 3,
	CATEGORY_VIRTUAL = 5


class AddAgent extends Component {

	constructor(props) {

		super(props)
		this.focusedInput = React.createRef();

		this.state = {
			monday: false,
			tuesday: false,
			wednesday: false,
			thursday: false,
			friday: false,
			saturday: false,
			sunday: false,
			showMsg: false,
			enableSoccerForm: true,
			enableSportForm: true,
			enableParlayForm: true,
			enableCasinoForm: true,
			enableVirtualForm: true,
			enableLiveCasinoForm: true,
			enableKenoLotteryForm: true,
			isSubmitted: false,
			selectedItems: [],
			isAllowed: false,
			memberInformation: false,
			cashMarketChecked: false,
			creditDisabled: false,
			copyPTChecked: false,
			enableCopyPT: false,
			chatApplicationId: 1,
			chatName: 'ChatNameTest',
			email: 'ChatNameTest@email.com',
			lineType: 2,
			oddsType: 1,
			viewType: 1,
			language: 2,
			telephone: '',
			autoFocused: true,
		}

		this.resetSport = this.resetSport.bind(this)
		this.resetSoccer = this.resetSoccer.bind(this)
		this.resetParlay = this.resetParlay.bind(this)
		this.resetCasino = this.resetCasino.bind(this)
		this.resetVirtual = this.resetVirtual.bind(this)
		this.resetLiveCasino = this.resetLiveCasino.bind(this)
		this.resetKenoLottery = this.resetKenoLottery.bind(this)
		this.resetCricket = this.resetCricket.bind(this)

		this.setItemState = this.setItemState.bind(this)
	}

	componentDidMount() {
		const usertype = (this.props.match.params.userTypeinRoutes === 'agent') ? 10 : 30

		if (this.focusedInput && this.focusedInput.current) {
			this.focusedInput.current.focus();
		}

		this.props.resetAddMember();
		this.props.getCreateMemberSetup(this.props.userId, usertype)
		this.setState({ isSubmitted: false })
	}

	componentWillReceiveProps(prevProps) {
		if (this.props.match.params.userTypeinRoutes !== prevProps.match.params.userTypeinRoutes) {
			const usertype = (prevProps.match.params.userTypeinRoutes === 'agent') ? 10 : 30
			this.props.getCreateMemberSetup(this.props.userId, usertype)
			this.setState({
				username: '',
				password: '', credit: '', name: '', telephone: '', securityCode: '',
				creditDisabled: false,
				cashMarketChecked: false,
				lineType: 2,
				oddsType: 1,
				viewType: 1,
				language: 2,
			})

			if (this.focusedInput && this.focusedInput.current) {
				this.focusedInput.current.focus();
			}
		}
	}

	componentDidUpdate(prevProps) {

		let prevParams = prevProps.match.params;
		let params = this.props.match.params;
		let usertype = (this.props.match.params.userTypeinRoutes === AGENT) ? 10 : 30

		if (this.props.form !== prevProps.form) {
			this.resetTransferSettings()
			this.resetSoccer()
			this.resetSport()
			this.resetVirtual()
			this.resetLiveCasino()
			this.resetKenoLottery()
			this.resetParlay()
			this.resetCasino()
			this.resetCricket()
			this.setState({ creditDisabled: false, cashMarketChecked: false })
			this.resetCopyPTSettings()
		}


		if (this.props.addMemberError !== prevProps.addMemberError && this.props.addMemberSuccess !== prevProps.addMemberSuccess) {
			this.setState({ isSubmitted: false });
		}

		if (params && params.userTypeinRoutes !== prevParams.userTypeinRoutes) {
			this.props.resetAddMember();
			this.setState({ isSubmitted: false });
			this.resetTransferSettings();
			this.resetSoccer();
			this.resetSport();
			this.resetVirtual();
			this.resetLiveCasino();
			this.resetKenoLottery()
			this.resetParlay();
			this.resetCasino();
			this.resetCricket();
			this.resetPaymentSettings();
			this.resetForms();
			this.resetCopyPTSettings();
			this.setState({ creditDisabled: false, cashMarketChecked: false, autoFocused: true })

			if (this.focusedInput && this.focusedInput.current) {
				this.focusedInput.current.focus();
			}
		}

		if ((this.props.successMsg !== prevProps.successMsg) && !prevProps.error && !this.state.isSubmitted) {
			this.setState({
				showMsg: true,
				username: '',
				password: '',
				credit: 0,
				name: '',
				telephone: '',
				securityCode: '',
				creditDisabled: false,
				cashMarketChecked: false,
				chatApplicationId: 1,
				lineType: 2,
				oddsType: 1,
				viewType: 1,
				language: 2,
			})

			this.resetTransferSettings()
			this.resetSoccer()
			this.resetSport()
			this.resetVirtual()
			this.resetLiveCasino()
			this.resetKenoLottery()
			this.resetParlay()
			this.resetCasino()
			this.resetCricket()
			this.resetCopyPTSettings()
			this.resetForms()
			this.props.getCreateMemberSetup(this.props.userId, usertype)
		}
	}

	handleChange = e => { // refactor this
		const target = e.target
		const userType = this.props.match.params.userTypeinRoutes
		const AGENT_SOCCER_VERTICAL = 'pt_1_pt_1'

		let excludedFormItemsInCopyPT = ['pt_0_pt_2',
			'pt_0_forced_pt_2',
			'pt_0_receive_pt_2',
			'pt_0_take_remaining_pt_2',
			'pt_0_receive_pt_2_member',
			'pt_0_pt_3',
			'pt_0_forced_pt_3',
			'pt_0_receive_pt_3',
			'pt_0_take_remaining_pt_3',
			'pt_0_receive_pt_3_member',
			'pt_0_pt_5',
			'pt_0_forced_pt_5',
			'pt_0_receive_pt_5',
			'pt_0_take_remaining_pt_5',
			'pt_0_receive_pt_5_member',
		]

		this.setState({ [target.name]: target.value })

		if (target.name.includes('receive') && userType === AGENT) {
			this.setState({
				[`${target.name}_updated`]: true
			})
		}

		if (excludedFormItemsInCopyPT.includes(target.name)) {
			this.setState({
				copyPTChecked: false
			})
		}

		if (target.name === AGENT_SOCCER_VERTICAL) {

			let keepPTValue = Number(this.state.pt_1_max_pt_1) - Number(target.value)
			let isKeepPTUpdatable = !(this.state.pt_1_receive_pt_1_updated && (keepPTValue > Number(this.state.pt_1_receive_pt_1)))

			if (this.state.pt_1_forced_pt_1 && Number(this.state.pt_1_forced_pt_1) > Number(target.value)) {
				this.setState({ pt_1_forced_pt_1: target.value, pt_1_remaining_pt_1: target.value });
			}

			if (isKeepPTUpdatable) {
				this.setState({
					pt_1_receive_pt_1: keepPTValue,
					pt_1_receive_pt_1_updated: false
				})
			}

			if (this.state.copyPTChecked && this.state.enableCopyPT && this.state.enableSoccerForm) {
				/*Soccer Live*/
				if (this.state.pt_2_pt_1 !== undefined && this.state.pt_2_pt_1 !== null) {
					this.setState({ pt_2_pt_1: target.value })
					this.setState({ pt_2_forced_pt_1: this.state.pt_1_forced_pt_1 })
					this.setState({ pt_2_remaining_pt_1: this.state.pt_1_remaining_pt_1 })
					this.setState({ pt_2_receive_pt_1: this.state.pt_1_receive_pt_1 })
					this.setState({
						pt_2_take_remaining_pt_1: this.state.pt_1_take_remaining_pt_1
					})

					if (this.state.pt_1_forced_pt_1 && Number(this.state.pt_1_forced_pt_1) > Number(target.value)) {
						this.setState({ pt_2_forced_pt_1: target.value, pt_2_remaining_pt_1: target.value });
					}

					if (isKeepPTUpdatable) {
						this.setState({
							pt_2_receive_pt_1: keepPTValue,
							pt_2_receive_pt_1_updated: false
						})
					}
				}
				/*Sports*/
				if (this.state.pt_0_pt_2 !== undefined && this.state.pt_0_pt_2 !== null) {
					this.setState({ pt_0_pt_2: target.value })
					this.setState({ pt_0_forced_pt_2: this.state.pt_1_forced_pt_1 })
					this.setState({ pt_0_remaining_pt_2: this.state.pt_1_remaining_pt_1 })
					this.setState({ pt_0_receive_pt_2: this.state.pt_1_receive_pt_1 })

					this.setState({
						pt_0_take_remaining_pt_2: this.state.pt_1_take_remaining_pt_1
					})

					if (this.state.pt_1_forced_pt_1 && Number(this.state.pt_1_forced_pt_1) > Number(target.value)) {
						this.setState({ pt_0_forced_pt_2: target.value, pt_0_remaining_pt_2: target.value });
					}

					if (isKeepPTUpdatable) {
						this.setState({
							pt_0_receive_pt_2: keepPTValue,
							pt_0_receive_pt_2_updated: false
						})
					}
				}
				/*Parlay*/
				if (this.state.pt_0_pt_3 !== undefined && this.state.pt_0_pt_3 !== null) {
					this.setState({ pt_0_pt_3: target.value })
					this.setState({ pt_0_forced_pt_3: this.state.pt_1_forced_pt_1 })
					this.setState({ pt_0_remaining_pt_3: this.state.pt_1_remaining_pt_1 })
					this.setState({ pt_0_receive_pt_3: this.state.pt_1_receive_pt_1 })

					this.setState({
						pt_0_take_remaining_pt_3: this.state.pt_1_take_remaining_pt_1
					})


					if (this.state.pt_1_forced_pt_1 && Number(this.state.pt_1_forced_pt_1) > Number(target.value)) {
						this.setState({ pt_0_forced_pt_3: target.value, pt_0_remaining_pt_3: target.value });
					}

					if (isKeepPTUpdatable) {
						this.setState({
							pt_0_receive_pt_3: keepPTValue,
							pt_0_receive_pt_3_updated: false
						})
					}
				}

				if (this.state.pt_0_pt_5 !== undefined && this.state.pt_0_pt_5 !== null) {
					this.setState({ pt_0_pt_5: target.value })
					this.setState({ pt_0_forced_pt_5: this.state.pt_1_forced_pt_1 })
					this.setState({ pt_0_remaining_pt_5: this.state.pt_1_remaining_pt_1 })
					this.setState({ pt_0_receive_pt_5: this.state.pt_1_receive_pt_1 })

					this.setState({
						pt_0_take_remaining_pt_5: this.state.pt_1_take_remaining_pt_1
					})


					if (this.state.pt_1_forced_pt_1 && Number(this.state.pt_1_forced_pt_1) > Number(target.value)) {
						this.setState({ pt_0_forced_pt_5: target.value, pt_0_remaining_pt_5: target.value });
					}

					if (isKeepPTUpdatable) {
						this.setState({
							pt_0_receive_pt_5: keepPTValue,
							pt_0_receive_pt_5_updated: false
						})
					}
				}

				if (this.state.pt_0_pt_6 !== undefined && this.state.pt_0_pt_6 !== null) {
					this.setState({ pt_0_pt_6: target.value })
					this.setState({ pt_0_forced_pt_6: this.state.pt_1_forced_pt_1 })
					this.setState({ pt_0_remaining_pt_6: this.state.pt_1_remaining_pt_1 })
					this.setState({ pt_0_receive_pt_6: this.state.pt_1_receive_pt_1 })

					this.setState({
						pt_0_take_remaining_pt_6: this.state.pt_1_take_remaining_pt_1
					})

					if (this.state.pt_1_forced_pt_1 && Number(this.state.pt_1_forced_pt_1) > Number(target.value)) {
						this.setState({ pt_0_forced_pt_6: target.value, pt_0_remaining_pt_5: target.value });
					}

					if (isKeepPTUpdatable) {
						this.setState({
							pt_0_receive_pt_6: keepPTValue,
							pt_0_receive_pt_6_updated: false
						})
					}
				}
			}
		}
		else if (target.name.includes('_pt_') && target.name.split('_').length === 4) {
			let fieldNameTemplateArray = target.name.split('_')
			fieldNameTemplateArray[2] = 'template_pt'

			let fieldNameTemplateString = fieldNameTemplateArray.join('_')
			let maxPT = fieldNameTemplateString.replace('template', 'max')
			let receivePT = fieldNameTemplateString.replace('template', 'receive')
			let forcedPT = fieldNameTemplateString.replace('template', 'forced')
			let remainingPT = fieldNameTemplateString.replace('template', 'remaining')
			let isReceiveUpdated = fieldNameTemplateString.replace('template', 'receive').concat('_updated')

			let keepPTValue = Number(this.state[maxPT]) - Number(target.value)
			let isKeepPTUpdatable = !(this.state[isReceiveUpdated] && (keepPTValue > Number(this.state[receivePT])))

			if (this.state[forcedPT] && Number(this.state[forcedPT]) > Number(target.value)) {
				this.setState({
					[forcedPT]: target.value,
					[remainingPT]: target.value
				})
			}

			if (isKeepPTUpdatable) {
				this.setState({
					[receivePT]: keepPTValue,
					[isReceiveUpdated]: false
				})
			}
		}

		else if (target.name === 'pt_1_forced_pt_1') {
			if (this.state.copyPTChecked && this.state.enableCopyPT && this.state.enableSoccerForm) {
				if (this.state.copyPTChecked && this.state.enableCopyPT && this.state.enableSoccerForm) {

					if (this.state.pt_2_forced_pt_1 !== undefined && this.state.pt_2_forced_pt_1 !== null) {
						this.setState({ pt_2_forced_pt_1: target.value })
						this.setState({ pt_2_pt_1: this.state.pt_1_pt_1 })
						this.setState({ pt_2_remaining_pt_1: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_2_receive_pt_1: this.state.pt_1_receive_pt_1 })

						this.setState({
							pt_2_take_remaining_pt_1: this.state.pt_1_take_remaining_pt_1
						})

					}

					if (this.state.pt_0_forced_pt_2 !== undefined && this.state.pt_0_forced_pt_2 !== null) {
						this.setState({ pt_0_forced_pt_2: target.value })
						this.setState({ pt_0_pt_2: this.state.pt_1_pt_1 })
						this.setState({ pt_0_remaining_pt_2: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_0_receive_pt_2: this.state.pt_1_receive_pt_1 })
						this.setState({
							pt_0_take_remaining_pt_2: this.state.pt_1_take_remaining_pt_1
						})
					}

					if (this.state.pt_0_forced_pt_3 !== undefined && this.state.pt_0_forced_pt_3 !== null) {
						this.setState({ pt_0_forced_pt_3: target.value })
						this.setState({ pt_0_pt_3: this.state.pt_1_pt_1 })
						this.setState({ pt_0_remaining_pt_3: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_0_receive_pt_3: this.state.pt_1_receive_pt_1 })
						this.setState({
							pt_0_take_remaining_pt_3: this.state.pt_1_take_remaining_pt_1
						})
					}


					if (this.state.pt_0_forced_pt_5 !== undefined && this.state.pt_0_forced_pt_5 !== null) {
						this.setState({ pt_0_forced_pt_5: target.value })
						this.setState({ pt_0_pt_5: this.state.pt_1_pt_1 })
						this.setState({ pt_0_remaining_pt_5: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_0_receive_pt_5: this.state.pt_1_receive_pt_1 })
						this.setState({
							pt_0_take_remaining_pt_5: this.state.pt_1_take_remaining_pt_1
						})
					}

				}
			}
		}

		else if (target.name === 'pt_1_receive_pt_1') { //agent recieve PT change
			if (this.state.copyPTChecked && this.state.enableCopyPT && this.state.enableSoccerForm) {
				if (this.state.copyPTChecked && this.state.enableCopyPT && this.state.enableSoccerForm) {

					if (this.state.pt_2_receive_pt_1 !== undefined && this.state.pt_2_receive_pt_1 !== null) {
						this.setState({ pt_2_forced_pt_1: this.state.pt_1_forced_pt_1 })
						this.setState({ pt_2_pt_1: this.state.pt_1_pt_1 })
						this.setState({ pt_2_remaining_pt_1: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_2_receive_pt_1: target.value })
						this.setState({
							pt_2_take_remaining_pt_1: this.state.pt_1_take_remaining_pt_1
						})
					}

					if (this.state.pt_0_receive_pt_2 !== undefined && this.state.pt_0_receive_pt_2 !== null) {
						this.setState({ pt_0_forced_pt_2: this.state.pt_1_forced_pt_1 })
						this.setState({ pt_0_pt_2: this.state.pt_1_pt_1 })
						this.setState({ pt_0_remaining_pt_2: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_0_receive_pt_2: target.value })
						this.setState({
							pt_0_take_remaining_pt_2: this.state.pt_1_take_remaining_pt_1
						})
					}

					if (this.state.pt_0_receive_pt_3 !== undefined && this.state.pt_0_receive_pt_3 !== null) {
						this.setState({ pt_0_forced_pt_3: this.state.pt_1_forced_pt_1 })
						this.setState({ pt_0_pt_3: this.state.pt_1_pt_1 })
						this.setState({ pt_0_remaining_pt_3: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_0_receive_pt_3: target.value })
						this.setState({
							pt_0_take_remaining_pt_3: this.state.pt_1_take_remaining_pt_1
						})
					}

					if (this.state.pt_0_receive_pt_5 !== undefined && this.state.pt_0_receive_pt_5 !== null) {
						this.setState({ pt_0_forced_pt_5: this.state.pt_1_forced_pt_1 })
						this.setState({ pt_0_pt_5: this.state.pt_1_pt_1 })
						this.setState({ pt_0_remaining_pt_5: this.state.pt_1_remaining_pt_1 })
						this.setState({ pt_0_receive_pt_5: target.value })
						this.setState({
							pt_0_take_remaining_pt_5: this.state.pt_1_take_remaining_pt_1
						})
					}
				}
			}
		}

		else if (target.name === 'pt_1_receive_pt_1_member') { //member receive

			this.setState({
				pt_1_remaining_pt_1_member: this.state.pt_1_max_pt_1_member - target.value
			});

			if (this.state.copyPTChecked && this.state.enableCopyPT && this.state.enableSoccerForm) {

				if (this.state.pt_2_receive_pt_1_member !== undefined && this.state.pt_2_receive_pt_1_member !== null) {
					this.setState({
						pt_2_receive_pt_1_member: target.value,
						pt_2_remaining_pt_1_member: this.state.pt_2_max_pt_1_member - target.value
					});
				}

				if (this.state.pt_0_receive_pt_2_member !== undefined && this.state.pt_0_receive_pt_2_member !== null) {
					this.setState({
						pt_0_receive_pt_2_member: target.value,
						pt_0_remaining_pt_2_member: this.state.pt_0_max_pt_2_member - target.value
					});
				}

				if (this.state.pt_0_receive_pt_3_member !== undefined && this.state.pt_0_receive_pt_3_member !== null) {
					this.setState({
						pt_0_receive_pt_3_member: target.value,
						pt_0_remaining_pt_3_member: this.state.pt_0_max_pt_3_member - target.value
					});
				}


				if (this.state.pt_0_receive_pt_5_member !== undefined && this.state.pt_0_receive_pt_5_member !== null) {
					this.setState({
						pt_0_receive_pt_5_member: target.value,
						pt_0_remaining_pt_5_member: this.state.pt_0_max_pt_5_member - target.value
					});
				}

				if (this.state.pt_0_receive_pt_6_member !== undefined && this.state.pt_0_receive_pt_6_member !== null) {
					this.setState({
						pt_0_receive_pt_6_member: target.value,
						pt_0_remaining_pt_6_member: this.state.pt_0_max_pt_6_member - target.value
					});
				}
			}
		}

		else if (target.name.includes('member') && target.name.includes('receive')) {
			let fieldName = target.name.replace('receive', 'remaining')
			let maxPT = target.name.replace('receive', 'max')
			this.setState({
				[fieldName]: this.state[maxPT] - target.value
			})
		}
	}



	handleSubmitMember = e => {

		const { form } = this.props

		const usertype = (this.props.match.params.userTypeinRoutes === 'agent') ? 10 : 30
		const { password, credit, name, telephone, chatName, email, chatApplicationId,
			monday, tuesday, wednesday, thursday, friday, saturday, sunday, creditDisabled, viewType, lineType,
			oddsType, language } = this.state

		const currentCurrency = form && form.currencyId ? form.currencyId : 0
		const username = e.target.username.value
		const userUsername = this.props.userTypeId === 20 ? this.props.agentUsername.mainAccount + username : this.props.agentUsername.username + username

		const isBasicInfoValid = username && usernameRegex.test(username)
			&& username.length <= 15 && password && name && nameRegex.test(name) && name.length <= 30 &&
			chatName && email && chatApplicationId && password.length >= 8 &&
			(!telephone || (phoneRegex.test(telephone) && telephone.length >= 7 && telephone.length <= 15))
			&& emailRegex.test(email)


		const isPaymentSetttingsValid = (monday || tuesday || wednesday || thursday || friday || saturday || sunday || creditDisabled === true)

		const isVerticalSettingsValid = this.createCategorySoccer()[1].isValid && this.createCategorySports()[1].isValid
			&& this.createCategoryParlay()[1].isValid && this.createCategoryCasino()[1].isValid
			&& this.createCategoryVirtual()[1].isValid
			&& this.createCategoryLiveCasino()[1].isValid
			&& this.createCategoryKenoLottery()[1].isValid
			&& this.createCategoryCricket()[1].isValid

		const isValidCreditAgent = usertype && usertype === 10 && !creditDisabled && isBasicInfoValid
			&& credit && credit <= form.maxCredit && credit < 100000000
			&& isVerticalSettingsValid

		const isValidCreditMember = usertype && usertype === 30 && !creditDisabled && isBasicInfoValid &&
			credit && credit <= form.maxCredit && credit < 100000000
			&& isVerticalSettingsValid

		const isValidCashMember = usertype && usertype === 30 && creditDisabled === true && isBasicInfoValid
			&& isVerticalSettingsValid

		e.preventDefault()
		this.setState({ isSubmitted: true })
		this.props.resetAddMember();

		if ((isValidCreditMember || (isValidCreditAgent) || (isValidCashMember)) && isPaymentSetttingsValid) {
			let memberData = {
				'username': `${userUsername}`,
				'password': `${password}`,
				'userTypeId': usertype,
				'allowPartialPayment': true,
				'name': `${name}`,
				'currencyId': currentCurrency,
				'creditLimit': (creditDisabled === true) ? 0 : `${credit}`,
				'telephoneNumber': `${telephone}`,
				'isCashMarket': `${creditDisabled}`,
				'chatApplicationId': chatApplicationId,
				'chatName': `${chatName}`,
				'emailAddress': `${email}`,
				'languageId': usertype === 30 ? Number(language) : null,
				'viewType': usertype === 30 ? Number(viewType) : null,
				'lineType': usertype === 30 ? Number(lineType) : null,
				'oddsFormat': usertype === 30 ? Number(oddsType) : null,
				'transferSetting': {
					'sunday': (creditDisabled === true) ? false : sunday,
					'monday': (creditDisabled === true) ? false : monday,
					'tuesday': (creditDisabled === true) ? false : tuesday,
					'wednesday': (creditDisabled === true) ? false : wednesday,
					'thursday': (creditDisabled === true) ? false : thursday,
					'friday': (creditDisabled === true) ? false : friday,
					'saturday': (creditDisabled === true) ? false : saturday,
				},
				'categorySoccer': { ...this.createCategorySoccer()[0] },
				'categorySports': {
					...this.createCategorySports()[0]
				},
				'categoryParlay': {
					...this.createCategoryParlay()[0]
				},
				'categoryGames': {
					...this.createCategoryCasino()[0]
				},
				'categoryVirtual': {
					...this.createCategoryVirtual()[0]
				},
				'categoryLiveCasino': {
					...this.createCategoryLiveCasino()[0]
				},
				'categoryLotto': {
					...this.createCategoryKenoLottery()[0]
				},
				'categoryCricket': {
					...this.createCategoryCricket()[0]
				}
			};

			this.props.doAddMember(memberData)
			this.setState({ isSubmitted: false });
		}
	}


	/*cleaned*/

	closeModal = () => {
		this.props.hideModal()
	}

	toggleModalAgent = () => {
		const userType = this.props.match.params.userTypeinRoutes
		this.props.showModal({
			title: userType === 'agent' ? formattedMessages.copyAgent : formattedMessages.copyMember,
			userInfo: '', modalSize: 'md'
		})
	}


	toggleDaySwitch = day => {
		const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = this.state
		if (day === 'mon') this.setState({ monday: !monday })
		else if (day === 'tue') this.setState({ tuesday: !tuesday })
		else if (day === 'wed') this.setState({ wednesday: !wednesday })
		else if (day === 'thu') this.setState({ thursday: !thursday })
		else if (day === 'fri') this.setState({ friday: !friday })
		else if (day === 'sat') this.setState({ saturday: !saturday })
		else if (day === 'sun') this.setState({ sunday: !sunday })
	}

	handleDailySched = () => {
		this.setState({
			monday: true,
			tuesday: true,
			wednesday: true,
			thursday: true,
			friday: true,
			saturday: true,
			sunday: true,
		})
	}

	handleWeeklySched = () => {
		this.setState({
			monday: false,
			tuesday: false,
			wednesday: false,
			thursday: false,
			friday: false,
			saturday: false,
			sunday: false,
			dailyPayment: false
		})
	}

	/*start cleaned*/
	createCategorySoccer = () => {
		const { soccer_commission, soccer_minPerTicket, soccer_maxPerTicket, soccer_maxPerGame,
			pt_1_pt_1, pt_1_forced_pt_1,
			pt_1_receive_pt_1,
			pt_2_receive_pt_1,
			pt_2_pt_1, pt_2_forced_pt_1,
			pt_1_receive_pt_1_member,
			pt_1_take_remaining_pt_1,
			pt_2_take_remaining_pt_1,
			pt_2_receive_pt_1_member,
			soccer_minPerTicketDefault, soccer_maxPerTicketDefault, soccer_maxPerGameDefault,
			enableSoccerForm
		} = this.state


		let isNowValid = false
		if (!this.state.enableSoccerForm) isNowValid = true
		else if (soccer_commission !== null && soccer_minPerTicket && soccer_maxPerTicket && soccer_maxPerGame
			&& Number(soccer_minPerTicket) >= Number(soccer_minPerTicketDefault)
			&& Number(soccer_maxPerTicket) <= Number(soccer_maxPerTicketDefault)
			&& Number(soccer_maxPerGame) >= Number(soccer_maxPerTicket)
			&& Number(soccer_maxPerTicket) >= Number(soccer_minPerTicket)
			&& Number(soccer_maxPerGameDefault) >= Number(soccer_maxPerGame)
		)
			isNowValid = true

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const newSoccerData = [
			{
				'commissionSoccer': {
					'rate': soccer_commission
				},
				'betSettingSoccer': {
					'minPerTicket': soccer_minPerTicket,
					'maxPerTicket': soccer_maxPerTicket,
					'maxPerGame': soccer_maxPerGame,
				},
				'positionTakingSoccer': {
					'positionTakingSoccerPreMatch': {
						'receive': currentUserType === 'Agent' ? Number(pt_1_receive_pt_1) : Number(pt_1_receive_pt_1_member),
						'give': currentUserType === 'Agent' ? Number(pt_1_pt_1) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_1_forced_pt_1) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_1_take_remaining_pt_1 : false
					},
					'positionTakingSoccerLive': {
						'receive': currentUserType === 'Agent' ? Number(pt_2_receive_pt_1) : Number(pt_2_receive_pt_1_member),
						'give': currentUserType === 'Agent' ? Number(pt_2_pt_1) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_2_forced_pt_1) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_2_take_remaining_pt_1 : false
					}
				},
				'isEnabled': enableSoccerForm
			},
			{ isValid: isNowValid }
		]


		return newSoccerData
	}


	createCategoryCricket = () => {

		const { cricket_commission, cricket_minPerTicket, cricket_maxPerTicket, cricket_maxPerGame,
			pt_1_pt_8, pt_1_forced_pt_8,
			pt_1_receive_pt_8,
			pt_2_receive_pt_8,
			pt_2_pt_8, pt_2_forced_pt_8,
			pt_1_receive_pt_8_member,
			pt_1_take_remaining_pt_8,
			pt_2_take_remaining_pt_8,
			pt_2_receive_pt_8_member,
			cricket_minPerTicketDefault, cricket_maxPerTicketDefault, cricket_maxPerGameDefault,
			enableCricketForm
		} = this.state


		let isNowValid = false
		if (!this.state.enableCricketForm) isNowValid = true
		else if (cricket_commission !== null && cricket_minPerTicket && cricket_maxPerTicket && cricket_maxPerGame
			&& Number(cricket_minPerTicket) >= Number(cricket_minPerTicketDefault)
			&& Number(cricket_maxPerTicket) <= Number(cricket_maxPerTicketDefault)
			&& Number(cricket_maxPerGame) >= Number(cricket_maxPerTicket)
			&& Number(cricket_maxPerTicket) >= Number(cricket_minPerTicket)
			&& Number(cricket_maxPerGameDefault) >= Number(cricket_maxPerGame)
		)
			isNowValid = true

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const cricketData = [
			{
				'commissionCricket': {
					'rate': cricket_commission
				},
				'betSettingCricket': {
					'minPerTicket': cricket_minPerTicket,
					'maxPerTicket': cricket_maxPerTicket,
					'maxPerGame': cricket_maxPerGame,
				},
				'positionTakingCricket': {
					'positionTakingCricketPreMatch': {
						'receive': currentUserType === 'Agent' ? Number(pt_1_receive_pt_8) : Number(pt_1_receive_pt_8_member),
						'give': currentUserType === 'Agent' ? Number(pt_1_pt_8) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_1_forced_pt_8) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_1_take_remaining_pt_8 : false
					},
					'positionTakingCricketLive': {
						'receive': currentUserType === 'Agent' ? Number(pt_2_receive_pt_8) : Number(pt_2_receive_pt_8_member),
						'give': currentUserType === 'Agent' ? Number(pt_2_pt_8) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_2_forced_pt_8) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_2_take_remaining_pt_8 : false
					}
				},
				'isEnabled': enableCricketForm
			},
			{ isValid: isNowValid }
		]

		return cricketData
	}

	createCategorySports = () => {

		const { sports_com, sports_minPerTicket, sports_maxPerTicket, sports_maxPerGame,
			pt_0_pt_2,
			pt_0_receive_pt_2,
			pt_0_forced_pt_2,
			pt_0_take_remaining_pt_2,
			pt_0_receive_pt_2_member,
			sports_minPerTicketDefault, sports_maxPerTicketDefault, sports_maxPerGameDefault,
			enableSportForm
		} = this.state

		let isNowValid = false
		if (!this.state.enableSportForm) isNowValid = true
		else if (sports_com !== null &&
			sports_minPerTicket &&
			sports_maxPerTicket &&
			sports_maxPerGame
			&& Number(sports_minPerTicket) >= Number(sports_minPerTicketDefault)
			&& Number(sports_maxPerTicket) <= Number(sports_maxPerTicketDefault)
			&& Number(sports_maxPerGame) >= Number(sports_maxPerTicket)
			&& Number(sports_maxPerTicket) >= Number(sports_minPerTicket)
			&& Number(sports_maxPerGameDefault) >= Number(sports_maxPerGame)
		) isNowValid = true

		const sportsRes = this.state.selectedItems.map(item => {
			return { 'sportId': item, 'isAllowed': false }
		})

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const sportData = [
			{
				'commissionSports': {
					'rate': sports_com
				},
				'betSettingSports': {
					'minPerTicket': Number(sports_minPerTicket),
					'maxPerTicket': Number(sports_maxPerTicket),
					'maxPerGame': Number(sports_maxPerGame),
				},
				'sportRestrictions': sportsRes,
				'positionTakingSports': {
					'receive': currentUserType === 'Agent' ? Number(pt_0_receive_pt_2) : Number(pt_0_receive_pt_2_member),
					'give': currentUserType === 'Agent' ? Number(pt_0_pt_2) : Number(0),
					'forced': currentUserType === 'Agent' ? Number(pt_0_forced_pt_2) : Number(0),
					'isTakeRemaining': currentUserType === 'Agent' ? pt_0_take_remaining_pt_2 : false
				},
				'isEnabled': enableSportForm
			},
			{ isValid: isNowValid }
		]
		return sportData
	}

	createCategoryParlay = () => {

		const { parlay_minBet, parlay_maxBet, parlay_maxPayoutPerTicket,
			parlay_com_2, parlay_com_3_4, parlay_com_5_6, parlay_com_7_8, parlay_com_9_10,
			pt_0_pt_3,
			pt_0_receive_pt_3,
			pt_0_forced_pt_3,
			pt_0_receive_pt_3_member,
			pt_0_take_remaining_pt_3,
			parlay_minBetDefault,
			parlay_maxBetDefault,
			parlay_maxPayoutPerTicketDefault,
			enableParlayForm
		} = this.state
		let isNowValid = false
		if (!this.state.enableParlayForm) isNowValid = true
		else if (parlay_minBet && parlay_maxBet && parlay_maxPayoutPerTicket &&
			parlay_com_2 !== null && parlay_com_3_4 !== null && parlay_com_5_6 !== null && parlay_com_7_8 !== null
			&& parlay_com_9_10 !== null
			&& Number(parlay_minBet) >= Number(parlay_minBetDefault)
			&& Number(parlay_maxBet) <= Number(parlay_maxBetDefault)
			&& Number(parlay_maxPayoutPerTicket) <= Number(parlay_maxPayoutPerTicketDefault)
			&& Number(parlay_maxBet) >= Number(parlay_minBet)
		) isNowValid = true

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const parlayData = [
			{
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
						'rate': Number(parlay_com_9_10)
					}
				},
				'betSettingParlay': {
					'minBet': Number(parlay_minBet),
					'maxBet': Number(parlay_maxBet),
					'maxPayoutPerTicket': Number(parlay_maxPayoutPerTicket)
				},
				'positionTakingParlay': {
					'receive': currentUserType === 'Agent' ? Number(pt_0_receive_pt_3) : Number(pt_0_receive_pt_3_member),
					'give': currentUserType === 'Agent' ? Number(pt_0_pt_3) : Number(0),
					'forced': currentUserType === 'Agent' ? Number(pt_0_forced_pt_3) : Number(0),
					'isTakeRemaining': currentUserType === 'Agent' ? pt_0_take_remaining_pt_3 : false
				},
				'isEnabled': enableParlayForm,
			},
			{ isValid: isNowValid }
		]
		return parlayData
	}

	createCategoryCasino = () => {
		const {
			casino_com_10, casino_com_4,
			casino_com_5, casino_com_7,


			pt_10_receive_pt_4,
			pt_10_pt_4,
			pt_10_forced_pt_4,
			pt_10_take_remaining_pt_4,
			pt_10_receive_pt_4_member,

			pt_4_receive_pt_4,
			pt_4_pt_4,
			pt_4_forced_pt_4,
			pt_4_take_remaining_pt_4,
			pt_4_receive_pt_4_member,

			pt_5_receive_pt_4,
			pt_5_pt_4,
			pt_5_forced_pt_4,
			pt_5_take_remaining_pt_4,
			pt_5_receive_pt_4_member,

			pt_7_receive_pt_4,
			pt_7_receive_pt_4_member,
			pt_7_pt_4,
			pt_7_forced_pt_4,
			pt_7_take_remaining_pt_4,

			casino_brandRestriction_10,
			casino_brandRestriction_4,
			casino_brandRestriction_5,
			casino_brandRestriction_7,

			enableCasinoForm
		} = this.state

		let isNowValid = false
		if (enableCasinoForm) isNowValid = true

		else if (casino_com_10 !== null &&
			casino_com_4 !== null && casino_com_7 !== null && casino_com_5 !== null
		) isNowValid = true


		if (enableCasinoForm) {
			if (!casino_brandRestriction_10 && !casino_brandRestriction_4 && !casino_brandRestriction_5 && !casino_brandRestriction_7) {
				isNowValid = false
			}
		}

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const casinoData = [
			{
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
				'positionTakingGames': {
					'positionTakingGamesMaverick': {
						'receive': currentUserType === 'Agent' ? Number(pt_10_receive_pt_4) : Number(pt_10_receive_pt_4_member),
						'give': currentUserType === 'Agent' ? Number(pt_10_pt_4) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_10_forced_pt_4) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_10_take_remaining_pt_4 : false,
					},
					'positionTakingGamesMicroGaming': {
						'receive': currentUserType === 'Agent' ? Number(pt_4_receive_pt_4) : Number(pt_4_receive_pt_4_member),
						'give': currentUserType === 'Agent' ? Number(pt_4_pt_4) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_4_forced_pt_4) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_4_take_remaining_pt_4 : false,
					},
					'positionTakingGamesNetEnt': {
						'receive': currentUserType === 'Agent' ? Number(pt_5_receive_pt_4) : Number(pt_5_receive_pt_4_member),
						'give': currentUserType === 'Agent' ? Number(pt_5_pt_4) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_5_forced_pt_4) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_5_take_remaining_pt_4 : false,
					},
					'positionTakingGamesPlayNGo': {
						'receive': currentUserType === 'Agent' ? Number(pt_7_receive_pt_4) : Number(pt_7_receive_pt_4_member),
						'give': currentUserType === 'Agent' ? Number(pt_7_pt_4) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_7_forced_pt_4) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_7_take_remaining_pt_4 : false,
					}
				},
				'gamesBrandRestrictions': {
					'isMaverickEnabled': casino_brandRestriction_10,
					'isMicroGamingEnabled': casino_brandRestriction_4,
					'isNetEntEnabled': casino_brandRestriction_5,
					'isPlayNGoEbanled': casino_brandRestriction_7
				},
				'isEnabled': enableCasinoForm
			},
			{ isValid: isNowValid }
		]

		return casinoData
	}


	createCategoryLiveCasino = () => {

		const {
			enableLiveCasinoForm,
			liveCasino_brandRestriction_2,
			liveCasino_brandRestriction_4,
			liveCasino_com_2, liveCasino_com_4,
			pt_2_receive_pt_6,
			pt_2_pt_6,
			pt_2_forced_pt_6,
			pt_2_take_remaining_pt_6,
			pt_2_receive_pt_6_member,

			pt_4_receive_pt_6,
			pt_4_pt_6,
			pt_4_forced_pt_6,
			pt_4_take_remaining_pt_6,
			pt_4_receive_pt_6_member,

		} = this.state

		let isNowValid = false

		if (!this.state.enableLiveCasinoForm) isNowValid = true
		else if (liveCasino_com_2 !== null && liveCasino_com_4 !== null) isNowValid = true


		if (enableLiveCasinoForm) {
			if (!liveCasino_brandRestriction_2 && !liveCasino_brandRestriction_4) {
				isNowValid = false
			}
		}

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const liveCasinoData = [
			{
				'commissionLiveCasino': {
					'commissionLiveCasinoMicroGaming': {
						'rate': liveCasino_com_4
					},
					'commissionLiveCasinoJoker': {
						'rate': liveCasino_com_2
					},
				},

				'positionTakingLiveCasino': {
					'positionTakingLiveCasinoMicroGaming': {
						'receive': currentUserType === 'Agent' ? Number(pt_4_receive_pt_6) : Number(pt_4_receive_pt_6_member),
						'give': currentUserType === 'Agent' ? Number(pt_4_pt_6) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_4_forced_pt_6) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_4_take_remaining_pt_6 : false,
					},
					'positionTakingLiveCasinoJoker': {
						'receive': currentUserType === 'Agent' ? Number(pt_2_receive_pt_6) : Number(pt_2_receive_pt_6_member),
						'give': currentUserType === 'Agent' ? Number(pt_2_pt_6) : Number(0),
						'forced': currentUserType === 'Agent' ? Number(pt_2_forced_pt_6) : Number(0),
						'isTakeRemaining': currentUserType === 'Agent' ? pt_2_take_remaining_pt_6 : false,
					}
				},
				"liveCasinoBrandRestrictions": {
					"isMicroGamingEnabled": liveCasino_brandRestriction_4,
					"isJokerEnabled": liveCasino_brandRestriction_2
				},
				'isEnabled': enableLiveCasinoForm
			},
			{ isValid: isNowValid }
		]

		return liveCasinoData
	}


	createCategoryVirtual = () => {
		const {
			virtual_com,
			pt_0_pt_5,
			pt_0_forced_pt_5,
			pt_0_receive_pt_5,
			pt_0_receive_pt_5_member,
			pt_0_take_remaining_pt_5,
			enableVirtualForm

		} = this.state

		let isNowValid = false

		if (!this.state.enableVirtualForm) isNowValid = true
		else if (virtual_com !== null) isNowValid = true

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const virtualData = [
			{
				'commissionVirtual': {
					'rate': virtual_com
				},
				'positionTakingVirtual': {
					'receive': currentUserType === 'Agent' ? Number(pt_0_receive_pt_5) : Number(pt_0_receive_pt_5_member),
					'give': currentUserType === 'Agent' ? Number(pt_0_pt_5) : Number(0),
					'forced': currentUserType === 'Agent' ? Number(pt_0_forced_pt_5) : Number(0),
					'isTakeRemaining': currentUserType === 'Agent' ? pt_0_take_remaining_pt_5 : false,
				},
				'isEnabled': enableVirtualForm
			},
			{ isValid: isNowValid }
		]
		return virtualData
	}



	createCategoryKenoLottery = () => {

		const {
			kenoLottery_com,
			pt_0_pt_7,
			pt_0_forced_pt_7,
			pt_0_receive_pt_7,
			pt_0_receive_pt_7_member,
			pt_0_take_remaining_pt_7,
			enableKenoLotteryForm
		} = this.state

		let isNowValid = false

		if (!enableKenoLotteryForm) isNowValid = true
		else if (kenoLottery_com !== null) isNowValid = true

		const userType = this.props.match.params.userTypeinRoutes;
		let currentUserType = `${Capitalize(userType)}`;

		const kenoLotteryData = [
			{
				'commissionLotto': {
					'rate': kenoLottery_com
				},
				'positionTakingLotto': {
					'receive': currentUserType === 'Agent' ? Number(pt_0_receive_pt_7) : Number(pt_0_receive_pt_7_member),
					'give': currentUserType === 'Agent' ? Number(pt_0_pt_7) : Number(0),
					'forced': currentUserType === 'Agent' ? Number(pt_0_forced_pt_7) : Number(0),
					'isTakeRemaining': currentUserType === 'Agent' ? pt_0_take_remaining_pt_7 : false,
				},
				'isEnabled': enableKenoLotteryForm
			},
			{ isValid: isNowValid }
		]

		return kenoLotteryData
	}

	toggleSoccer = () => { /*refactor to be one*/
		let { enableSoccerFormChange, enableSoccerForm } = this.state
		let { form } = this.props

		if (enableSoccerFormChange) {
			if (form && form.categorySoccer && form.categorySoccer.positionTaking && form.categorySoccer.commissions) {
				this.setState({ enableSoccerForm: !enableSoccerForm })
				form.categorySoccer.betSettings.map(item => {
					this.setState({ soccer_minPerTicket: item.minPerTicket })
					this.setState({ soccer_maxPerTicket: item.maxPerTicket })
					this.setState({ soccer_minPerGame: item.minPerGame })
					this.setState({ soccer_maxPerGame: item.maxPerGame })
					this.setState({ soccer_minPerTicketDefault: item.minPerTicket })
					this.setState({ soccer_maxPerTicketDefault: item.maxPerTicket })
					this.setState({ soccer_minPerGameDefault: item.minPerGame })
					this.setState({ soccer_maxPerGameDefault: item.maxPerGame })
					return
				})
			}
		}
		return
	}

	toggleSport = () => {
		let { enableSportFormChange, enableSportForm } = this.state
		let { form } = this.props

		if (enableSportFormChange) {
			this.setState({ enableSportForm: !enableSportForm })
			if (form && form.categorySports && form.categorySports.positionTaking) {
				form.categorySports.betSettings.map(item => {
					this.setState({ sports_minPerTicket: item.minPerTicket })
					this.setState({ sports_maxPerTicket: item.maxPerTicket })
					this.setState({ sports_minPerGame: item.minPerGame })
					this.setState({ sports_maxPerGame: item.maxPerGame })
					this.setState({ sports_minPerTicketDefault: item.minPerTicket })
					this.setState({ sports_maxPerTicketDefault: item.maxPerTicket })
					this.setState({ sports_minPerGameDefault: item.minPerGame })
					this.setState({ sports_maxPerGameDefault: item.maxPerGame })
					return
				})
			}
		}
		return
	}


	toggleCricket = () => { /*refactor to be one*/

		let { enableCricketFormChange, enableCricketForm } = this.state
		let { form } = this.props

		if (enableCricketFormChange) {
			if (form && form.categoryCricket && form.categoryCricket.positionTaking && form.categoryCricket.commissions) {
				this.setState({ enableCricketForm: !enableCricketForm })
				form.categoryCricket.betSettings.map(item => {
					this.setState({ cricket_minPerTicket: item.minPerTicket })
					this.setState({ cricket_maxPerTicket: item.maxPerTicket })
					this.setState({ cricket_minPerGame: item.minPerGame })
					this.setState({ cricket_maxPerGame: item.maxPerGame })
					this.setState({ cricket_minPerTicketDefault: item.minPerTicket })
					this.setState({ cricket_maxPerTicketDefault: item.maxPerTicket })
					this.setState({ cricket_minPerGameDefault: item.minPerGame })
					this.setState({ cricket_maxPerGameDefault: item.maxPerGame })
					return
				})
			}
		}
		return
	}


	toggleParlay = () => {
		let { enableParlayFormChange, enableParlayForm } = this.state
		let { form } = this.props

		if (enableParlayFormChange) {
			this.setState({ enableParlayForm: !enableParlayForm })
			if (form && form.categoryParlay && form.categoryParlay.positionTaking) {
				form.categoryParlay.betSettings.map(item => {
					this.setState({ parlay_minBet: item.minBet })
					this.setState({ parlay_maxBet: item.maxBet })
					this.setState({ parlay_maxPayoutPerTicket: item.maxPayoutPerTicket })
					this.setState({ parlay_minBetDefault: item.minBet })
					this.setState({ parlay_maxBetDefault: item.maxBet })
					this.setState({ parlay_maxPayoutPerTicketDefault: item.maxPayoutPerTicket })
					return
				})
			}
		}
		return
	}


	toggleCasino = () => {
		let { enableCasinoFormChange, enableCasinoForm } = this.state
		let { form } = this.props
		if (enableCasinoFormChange) {
			this.setState({ enableCasinoForm: !enableCasinoForm }, () => {
				if (!enableCasinoForm === true) {
					form.categoryGames.brandRestrictions.map((item) => {
						this.setItemState(`casino_brandRestriction_${item.brandId}`, item.isEditable ? true : false);
					})
				}
			})
		}
		return
	}


	toggleVirtual = () => {
		let { enableVirtualFormChange, enableVirtualForm } = this.state
		let { form } = this.props
		if (enableVirtualFormChange) {
			if (form && form.categoryVirtual && form.categoryVirtual.positionTaking) {
				this.setState({ enableVirtualForm: !enableVirtualForm })
			}
		}
		return
	}

	toggleLiveCasino = () => {
		let { enableLiveCasinoFormChange, enableLiveCasinoForm } = this.state
		let { form } = this.props
		if (enableLiveCasinoFormChange) {
			if (form && form.categoryLiveCasino && form.categoryLiveCasino.positionTaking) {
				this.setState({ enableLiveCasinoForm: !enableLiveCasinoForm }, () => {
					if (!enableLiveCasinoForm === true) {
						form.categoryLiveCasino.brandRestrictions.map((item) => {
							this.setItemState(`liveCasino_brandRestriction_${item.brandId}`, item.isEditable ? true : false);
						})
					}
				})
			}
		}
		return
	}


	toggleKenoLottery = () => {
		let { enableKenoLotteryFormChange, enableKenoLotteryForm } = this.state
		let { form } = this.props
		if (enableKenoLotteryFormChange) {
			if (form && form.categoryLotto && form.categoryLotto.positionTaking) {
				this.setState({ enableKenoLotteryForm: !enableKenoLotteryForm })
			}
		}
		return
	}
	/* end cleaned */


	resetSoccer() { // to refactor
		if (this.props.form && this.props.form.categorySoccer && this.props.form.categorySoccer.positionTaking && this.props.form.categorySoccer.commissions) {

			let isEnabled = this.props.form.categorySoccer.isEnabled;

			this.props.form.categorySoccer.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categorySoccer.categoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categorySoccer.categoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categorySoccer.categoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${this.props.form.categorySoccer.categoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categorySoccer.categoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categorySoccer.categoryId}`, item.maxGive)
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categorySoccer.categoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categorySoccer.categoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categorySoccer.categoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categorySoccer.categoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categorySoccer.categoryId}_member`, item.maxGive)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categorySoccer.categoryId}_updated`, false)
				return
			})

			this.props.form.categorySoccer.betSettings.map(item => { // make this one 
				this.setState({ soccer_minPerTicket: item.minPerTicket })
				this.setState({ soccer_maxPerTicket: item.maxPerTicket })
				this.setState({ soccer_maxPerGame: item.maxPerGame })
				this.setState({ soccer_minPerTicketDefault: item.minPerTicket })
				this.setState({ soccer_maxPerTicketDefault: item.maxPerTicket })
				this.setState({ soccer_maxPerGameDefault: item.maxPerGame })
				return
			})

			this.props.form.categorySoccer.commissions.map(item => {
				this.setState({ soccer_commission: item.rate })
				return
			})

			if (this.state.copyPTChecked && this.state.enableCopyPT && this.state.enableSoccerForm) {
				this.resetSport()
				this.resetParlay()
				//this.resetCasino()
				this.resetVirtual()
				//this.resetLiveCasino()
				//this.resetKenoLottery()
				this.resetCricket()
			}

			this.setItemState(`enableSoccerForm`, isEnabled);
			this.setItemState(`enableSoccerFormChange`, isEnabled);
		}
		return
	}


	resetCricket() { // to refactor
		if (this.props.form && this.props.form.categoryCricket && this.props.form.categoryCricket.positionTaking && this.props.form.categoryCricket.commissions) {

			let isEnabled = this.props.form.categoryCricket.isEnabled;

			this.props.form.categoryCricket.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryCricket.categoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryCricket.categoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryCricket.categoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${this.props.form.categoryCricket.categoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryCricket.categoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryCricket.categoryId}`, item.maxGive)
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryCricket.categoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryCricket.categoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryCricket.categoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryCricket.categoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryCricket.categoryId}_member`, item.maxGive)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryCricket.categoryId}_updated`, false)
				return
			})

			this.props.form.categoryCricket.betSettings.map(item => { // make this one 
				this.setState({ cricket_minPerTicket: item.minPerTicket })
				this.setState({ cricket_maxPerTicket: item.maxPerTicket })
				this.setState({ cricket_maxPerGame: item.maxPerGame })
				this.setState({ cricket_minPerTicketDefault: item.minPerTicket })
				this.setState({ cricket_maxPerTicketDefault: item.maxPerTicket })
				this.setState({ cricket_maxPerGameDefault: item.maxPerGame })
				return
			})

			this.props.form.categoryCricket.commissions.map(item => {
				this.setState({ cricket_commission: item.rate })
				return
			})

			this.setItemState(`enableCricketForm`, false);
			this.setItemState(`enableCricketFormChange`, isEnabled);
		}
		return
	}

	resetSport() { // to refactor
		if (this.props.form && this.props.form.categorySports && this.props.form.categorySports.positionTaking) {
			let isEnabled = this.props.form.categorySports.isEnabled;

			this.props.form.categorySports.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categorySports.categoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categorySports.categoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categorySports.categoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${this.props.form.categorySports.categoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categorySports.categoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categorySports.categoryId}`, item.maxGive)
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categorySports.categoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categorySports.categoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categorySports.categoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categorySports.categoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categorySports.categoryId}_member`, item.maxGive)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categorySports.categoryId}_updated`, false)

				return
			})

			this.props.form.categorySports.betSettings.map(item => {
				this.setState({ sports_minPerTicket: item.minPerTicket })
				this.setState({ sports_maxPerTicket: item.maxPerTicket })
				this.setState({ sports_maxPerGame: item.maxPerGame })
				this.setState({ sports_minPerTicketDefault: item.minPerTicket })
				this.setState({ sports_maxPerTicketDefault: item.maxPerTicket })
				this.setState({ sports_maxPerGameDefault: item.maxPerGame })
				return
			})

			this.props.form.categorySports.commissions.map(item => {
				this.setState({ sports_com: item.rate })
				return
			})

			this.setItemState(`enableSportForm`, isEnabled);
			this.setItemState(`enableSportFormChange`, isEnabled);
		}
		return
	}

	resetParlay() { // to refactor
		if (this.props.form && this.props.form.categoryParlay && this.props.form.categoryParlay.positionTaking) {

			let isEnabled = this.props.form.categoryParlay.isEnabled;

			this.props.form.categoryParlay.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryParlay.categoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryParlay.categoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryParlay.categoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${this.props.form.categoryParlay.categoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryParlay.categoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryParlay.categoryId}`, item.maxGive)


				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryParlay.categoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryParlay.categoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryParlay.categoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryParlay.categoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryParlay.categoryId}_member`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryParlay.categoryId}_updated`, false)

				return
			})

			this.props.form.categoryParlay.betSettings.map(item => {
				this.setState({ parlay_minBet: item.minBet })
				this.setState({ parlay_maxBet: item.maxBet })
				this.setState({ parlay_maxPayoutPerTicket: item.maxPayoutPerTicket })

				this.setState({ parlay_minBetDefault: item.minBet })
				this.setState({ parlay_maxBetDefault: item.maxBet })
				this.setState({ parlay_maxPayoutPerTicketDefault: item.maxPayoutPerTicket })
				return
			})

			this.props.form.categoryParlay.commissions.map(item => {
				this.setState({ [`parlay_com_${hypenToUnderscore(item.label)}`]: item.rate })
				return
			});

			this.setItemState(`enableParlayForm`, isEnabled);
			this.setItemState(`enableParlayFormChange`, isEnabled);
		}
		return
	}

	resetCasino() { // to refactor

		let { form } = this.props

		if (form && form.categoryGames && form.categoryGames.positionTaking) {

			let isEnabled = form.categoryGames.isEnabled;
			let gamesCategoryId = form.categoryGames.categoryId

			form.categoryGames.commissions.map((item) => {
				this.setItemState(`casino_com_${item.subCategoryId}`, item.rate);
			})

			form.categoryGames.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${gamesCategoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${gamesCategoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${gamesCategoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${gamesCategoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${gamesCategoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${gamesCategoryId}`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_pt_${gamesCategoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${gamesCategoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${gamesCategoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${gamesCategoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${gamesCategoryId}_member`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${gamesCategoryId}_updated`, false)

				return
			})

			form.categoryGames.brandRestrictions.map((item) => {
				this.setItemState(`casino_brandRestriction_${item.brandId}`, false);
				this.setItemState(`casino_brandRestriction_${item.brandId}_isEditable`, item.isEditable);
			})

			this.setItemState(`enableCasinoForm`, false);
			this.setItemState(`enableCasinoFormChange`, isEnabled);
		}
	}


	resetVirtual() { // to refactor
		if (this.props.form && this.props.form.categoryVirtual && this.props.form.categoryVirtual.positionTaking) {

			let isEnabled = this.props.form.categoryVirtual.isEnabled;

			this.props.form.categoryVirtual.commissions.map((item) => {
				this.setItemState(`virtual_com`, item.rate);
			})

			this.props.form.categoryVirtual.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryVirtual.categoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryVirtual.categoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryVirtual.categoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${this.props.form.categoryVirtual.categoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryVirtual.categoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryVirtual.categoryId}`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryVirtual.categoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryVirtual.categoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryVirtual.categoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryVirtual.categoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryVirtual.categoryId}_member`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryVirtual.categoryId}_updated`, false)

				return
			})

			this.setItemState(`enableVirtualForm`, isEnabled);
			this.setItemState(`enableVirtualFormChange`, isEnabled);
		}
	}


	resetLiveCasino() { // to refactor

		let { form } = this.props

		if (form && form.categoryLiveCasino && form.categoryLiveCasino.positionTaking) {

			let isEnabled = form.categoryLiveCasino.isEnabled;
			let liveCasinoCategoryId = form.categoryLiveCasino.categoryId

			form.categoryLiveCasino.commissions.map((item) => {
				this.setItemState(`liveCasino_com_${item.subCategoryId}`, item.rate);
			})

			form.categoryLiveCasino.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${liveCasinoCategoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${liveCasinoCategoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${liveCasinoCategoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${liveCasinoCategoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${liveCasinoCategoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${liveCasinoCategoryId}`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_pt_${liveCasinoCategoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${liveCasinoCategoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${liveCasinoCategoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${liveCasinoCategoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${liveCasinoCategoryId}_member`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${liveCasinoCategoryId}_updated`, false)

				return
			})

			form.categoryLiveCasino.brandRestrictions.map((item) => {
				this.setItemState(`liveCasino_brandRestriction_${item.brandId}`, false);
				this.setItemState(`liveCasino_brandRestriction_${item.brandId}_isEditable`, item.isEditable);
			})

			this.setItemState(`enableLiveCasinoForm`, false);
			this.setItemState(`enableLiveCasinoFormChange`, isEnabled);
		}
	}


	resetKenoLottery() { // to refactor
		if (this.props.form && this.props.form.categoryLotto && this.props.form.categoryLotto.positionTaking) {

			let isEnabled = this.props.form.categoryLotto.isEnabled;

			this.props.form.categoryLotto.commissions.map((item) => {
				this.setItemState(`kenoLottery_com`, item.rate);
			})

			this.props.form.categoryLotto.positionTaking.map((item) => {
				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryLotto.categoryId}`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryLotto.categoryId}`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryLotto.categoryId}`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_take_remaining_pt_${this.props.form.categoryLotto.categoryId}`, false)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryLotto.categoryId}`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryLotto.categoryId}`, item.maxGive)

				this.setItemState(`pt_${item.subCategoryId}_pt_${this.props.form.categoryLotto.categoryId}_member`, item.give)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryLotto.categoryId}_member`, item.receive)
				this.setItemState(`pt_${item.subCategoryId}_remaining_pt_${this.props.form.categoryLotto.categoryId}_member`, item.remaining)
				this.setItemState(`pt_${item.subCategoryId}_forced_pt_${this.props.form.categoryLotto.categoryId}_member`, item.forced)
				this.setItemState(`pt_${item.subCategoryId}_max_pt_${this.props.form.categoryLotto.categoryId}_member`, item.maxGive)
				this.setItemState(`pt_${item.subCategoryId}_receive_pt_${this.props.form.categoryLotto.categoryId}_updated`, false)
			})

			this.setItemState(`enableKenoLotteryForm`, false);
			this.setItemState(`enableKenoLotteryFormChange`, isEnabled);
		}
	}

	/*cleaned*/

	setItemState(item, state) {
		this.setState({ [item]: state })
		return
	}

	resetBasicInfo = () => {
		this.setState({
			username: '', password: '', credit: 0, name: '', telephone: '',
			securityCode: '',
			creditDisabled: false, cashMarketChecked: false,
			lineType: 2,
			oddsType: 1,
			viewType: 1,
			language: 2,
		})
	}

	resetForms = () => {
		const { enableSoccerFormChange, enableSportFormChange, enableParlayFormChange, enableCasinoFormChange, enableVirtualFormChange,
			enableLiveCasinoFormChange, enableKenoLotteryFormChange, enableCricketFormChange } = this.state
		this.setState({
			enableSoccerForm: enableSoccerFormChange ? true : false,
			enableSportForm: enableSportFormChange ? true : false,
			enableParlayForm: enableParlayFormChange ? true : false,
			enableCasinoForm: enableCasinoFormChange ? true : false,
			enableVirtualForm: enableVirtualFormChange ? true : false,
			enableLiveCasinoForm: enableLiveCasinoFormChange ? true : false,
			enableKenoLotteryForm: enableKenoLotteryFormChange ? true : false,
			enableCricketForm: enableCricketFormChange ? true : false,
		})
	}

	handleItemSelection = (checked, name, value) => {
		this.setState(state => {
			let items = state.selectedItems.slice()
			if (checked) {
				items = items.concat([value])
			} else {
				items = items.filter(id => id !== value)
			}
			return { selectedItems: items }
		})
	}

	resetCopyPTSettings = () => {
		const { form } = this.props
		if (form && !isNullOrUndefined(form.enableCopyPT)) {
			this.setState({ enableCopyPT: form.enableCopyPT, copyPTChecked: false })
		}
		return
	}

	resetTransferSettings = () => {
		const { form } = this.props
		if (form && form.transferSetting) {
			let days = form.transferSetting;
			for (let key in days) {
				if (days.hasOwnProperty(key)) {
					this.setItemState(key, days[key])
				}
			}
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
	}


	toggleTakeRemaining = name => {

		const { copyPTChecked } = this.state
		let isSoccerTakeRemaining = 'pt_1_take_remaining_pt_1'
		let copyPTNames = ['pt_0_take_remaining_pt_2', 'pt_0_take_remaining_pt_3', 'pt_0_take_remaining_pt_5']


		this.setState({ [name]: !this.state[name] }, () => {
			if (copyPTNames.includes(name)) {
				this.setState({
					copyPTChecked: false,
				})
			}
			else if (copyPTChecked && name === isSoccerTakeRemaining) {
				this.copyAgentVerticalPT(CATEGORY_SOCCER, 2)
				this.copyAgentVerticalPT(CATEGORY_SPORTS, 0)
				this.copyAgentVerticalPT(CATEGORY_PARLAY, 0)
				this.copyAgentVerticalPT(CATEGORY_VIRTUAL, 0)
			}
		})
	}

	toggleBrandRestriction = name => {
		this.setState({ [name]: !this.state[name] })
	}


	toggleCashMarket = () => {

		const { creditDisabled, cashMarketChecked } = this.state

		this.setState({
			creditDisabled: !creditDisabled,
			cashMarketChecked: !cashMarketChecked,
			credit: ''
		})

		this.setState({
			monday: false,
			tuesday: false,
			wednesday: false,
			thursday: false,
			friday: false,
			saturday: false,
			sunday: false,
		});
	}

	togglePTSettings = () => {

		const { pt_2_pt_1, pt_0_pt_2, pt_0_pt_3,
			pt_0_pt_5,
			pt_2_receive_pt_1_member, pt_0_receive_pt_2_member, pt_0_receive_pt_3_member,
			pt_0_receive_pt_5_member,
			enableSoccerForm, copyPTChecked
		} = this.state

		const userType = this.props.match.params.userTypeinRoutes
		this.setState({
			copyPTChecked: !copyPTChecked,
		}, () => {
			if (this.state.copyPTChecked) {
				if (enableSoccerForm && userType === 'agent') { // make this one
					let isCopyValid = !isNullOrUndefined(pt_2_pt_1) &&
						!isNullOrUndefined(pt_0_pt_2) &&
						!isNullOrUndefined(pt_0_pt_3) &&
						!isNullOrUndefined(pt_0_pt_5)

					if (isCopyValid) {
						this.setState({ pt_1_receive_pt_1_updated: false })
						this.copyAgentVerticalPT(CATEGORY_SOCCER, 2)
						this.copyAgentVerticalPT(CATEGORY_SPORTS, 0)
						this.copyAgentVerticalPT(CATEGORY_PARLAY, 0)
						this.copyAgentVerticalPT(CATEGORY_VIRTUAL, 0)
					}
				} else if (enableSoccerForm && userType === 'member') {
					let isCopyValid = !isNullOrUndefined(pt_2_receive_pt_1_member) &&
						!isNullOrUndefined(pt_0_receive_pt_2_member) &&
						!isNullOrUndefined(pt_0_receive_pt_3_member) &&
						!isNullOrUndefined(pt_0_receive_pt_5_member)

					if (isCopyValid) {
						this.copyMemberVerticalPT(CATEGORY_SOCCER, 2)
						this.copyMemberVerticalPT(CATEGORY_SPORTS, 0)
						this.copyMemberVerticalPT(CATEGORY_PARLAY, 0)
						this.copyMemberVerticalPT(CATEGORY_VIRTUAL, 0)
					}
				}
			}
		})
	}

	copyAgentVerticalPT = (categoryId, subCategoryId) => {
		const { pt_1_pt_1, pt_1_forced_pt_1, pt_1_remaining_pt_1, pt_1_take_remaining_pt_1, pt_1_receive_pt_1 } = this.state
		this.setState({
			[`pt_${subCategoryId}_pt_${categoryId}`]: pt_1_pt_1,
			[`pt_${subCategoryId}_forced_pt_${categoryId}`]: pt_1_forced_pt_1,
			[`pt_${subCategoryId}_remaining_pt_${categoryId}`]: pt_1_remaining_pt_1,
			[`pt_${subCategoryId}_take_remaining_pt_${categoryId}`]: pt_1_take_remaining_pt_1,
			[`pt_${subCategoryId}_receive_pt_${categoryId}`]: pt_1_receive_pt_1,
			[`pt_${subCategoryId}_receive_pt_${categoryId}_updated`]: false,
		})
	}

	copyMemberVerticalPT = (categoryId, subCategoryId) => {
		const { pt_1_receive_pt_1_member, pt_1_max_pt_1_member } = this.state
		this.setState({
			[`pt_${subCategoryId}_receive_pt_${categoryId}_member`]: pt_1_receive_pt_1_member,
			[`pt_${subCategoryId}_remaining_pt_${categoryId}_member`]: Number(pt_1_max_pt_1_member) - Number(pt_1_receive_pt_1_member),
		})
	}

	maxAllForm = () => {
		this.resetSoccer()
		this.resetSport()
		this.resetVirtual()
		this.resetParlay()
		this.resetCasino()
		this.resetLiveCasino()
		this.resetKenoLottery()
		this.resetCricket()
	}

	render() {
		const { form, loading, agentUsername, error, addMemberError, addMemberSuccess, userTypeId } = this.props
		const { isSubmitted, creditDisabled, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = this.state
		const userType = this.props.match.params.userTypeinRoutes

		const verticalsHasError = isSubmitted && (!this.createCategorySoccer()[1].isValid || !this.createCategorySports()[1].isValid
			|| !this.createCategoryParlay()[1].isValid || !this.createCategoryCasino()[1].isValid
			|| !this.createCategoryVirtual()[1].isValid || !this.createCategoryKenoLottery()[1].isValid
			|| !this.createCategoryLiveCasino()[1].isValid || !this.createCategoryCricket()[1].isValid)

		const transferSettingsHasError = isSubmitted && !creditDisabled && !(monday || tuesday || wednesday || thursday || friday || saturday || sunday)

		if (userType !== 'agent' && userType !== 'member') return <Redirect to='/member-management/user-list' />
		if (loading) return <p>{formattedMessages.pleaseWait}</p>
		if (error) return <MaintenancePage message={error} />


		return (
			<div className='animated fadeIn'>
				<Row>
					<Col>
						<Card>
							<form id='create-agent-form' onSubmit={this.handleSubmitMember}>
								<CardHeader>
									<Row>
										<Col>
											<h5 style={{ fontWeight: 'bold', display: 'inline-block', paddingTop: 3 }}>{formattedMessages.manageMembers} - {userType === 'agent' ? formattedMessages.createAgent : formattedMessages.createMember}</h5>
										</Col>
										<ButtonsHeader
											resetBasicInfo={this.resetBasicInfo}
											toggleModalAgent={this.toggleModalAgent}
											maxAllForm={this.maxAllForm}
											copyAgentMemberTitle={userType}
										/>
									</Row>
								</CardHeader>
								<CardBody>

									{!addMemberError && addMemberSuccess &&
										<Alert color='success'>
											<span>{formattedMessages.userCreateSuccess}</span>
										</Alert>
									}

									{!addMemberSuccess && addMemberError && <Alert color='danger'>
										<span className='bold'> {addMemberError} </span>
									</Alert>}

									<AddMemberInformation
										{...this.state}
										userMaxCredit={(form) ? form.maxCredit : null}
										handleChange={this.handleChange}
										userType={Capitalize(userType)}
										agentUsername={(agentUsername) ? userTypeId === 20 ? agentUsername.mainAccount : agentUsername.username : null}
										userTypeid={userTypeId}
										cmHandleChange={this.toggleCashMarket}
										creditDisabled={creditDisabled}
										focusedInput={this.focusedInput}
									/>

									{Capitalize(userType) === 'Member' &&
										<MemberSettings
											{...this.state}
											handleChange={this.handleChange}
											userType={Capitalize(userType)}
											userTypeid={userTypeId}
										/>
									}
									{transferSettingsHasError &&
										<Alert color='danger'>{formattedMessages.transferDayWarning}</Alert>
									}

									<PaymentSettings
										creditDisabled={creditDisabled}
										monday={monday}
										tuesday={tuesday}
										wednesday={wednesday}
										thursday={thursday}
										friday={friday}
										saturday={saturday}
										sunday={sunday}
										handleSwitchChange={this.toggleDaySwitch}
										handleWeeklySched={this.handleWeeklySched}
										handleDailySched={this.handleDailySched}
									/>
									<hr />
									<Row>
										<Col md='12'>
											{verticalsHasError &&
												<Alert color='danger'>{formattedMessages.verticalWarning}</Alert>
											}
										</Col>
										<VerticalSettings
											{...this.state}
											{...this}
											userType={Capitalize(userType)}
											togglePTSettings={this.togglePTSettings}
											toggleTakeRemaining={this.toggleTakeRemaining}
											toggleBrandRestriction={this.toggleBrandRestriction}
											data={(form) ? form : null} />
									</Row>
								</CardBody>
							</form>
						</Card>
					</Col>
				</Row>
				<ModalComponent
					onClose={this.closeModal}
					onSave={() => { }}
					onSaveLabel={formattedMessages.save} >
					<CopyUser />
				</ModalComponent>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	userId: state.auth.userId,
	loading: state.setupUser.loading,
	error: state.setupUser.error,
	form: state.setupUser.forms,
	agentUsername: state.securityCode.user,
	successMsg: state.addMember.response,
	addMemberError: state.addMember.error,
	addMemberSuccess: state.addMember.success,
	userTypeId: state.securityCode.user.userTypeId
})


const mapDispatchToProps = dispatch => ({
	hideModal: () => dispatch(hideModal()),
	showModal: (modalProps) => {
		dispatch(showModal({ modalProps }))
	},
	getCreateMemberSetup: (id, userType) => dispatch(getCreateMemberSetup(id, userType)),
	doAddMember: (data) => dispatch(doAddMember(data)),
	resetAddMember: () => dispatch(resetAddMember())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAgent))


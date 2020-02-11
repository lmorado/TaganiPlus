import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Capitalize, formatCurrency } from '../../../utils/helpers'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import WindowPortal from '../../../components/WindowPortal'
class RenderMembers extends Component {

    state = {
        expandedRows: [],
        showUserHierarchy: {}
    }

    handleUserHierarchy = (userId) => {
        let userHierarchy = Object.assign({}, this.state.showUserHierarchy)
        userHierarchy[userId] = !userHierarchy[userId]

        this.setState({
            showUserHierarchy: {
                ...this.state.showUserHierarchy,
                ...userHierarchy
            }
        })
    }

    renderItem = (agent, i, currentPage) => {
        const portalProps = {
            isIframe: true,
            userId: agent.userId,
            url: `/hierarchy/${agent.userId}`,
            title: `${agent.username} Hierarchy`
        }

        //const number = ((currentPage - 1) * 10) + (i + 1)
        const access = (this.props.access) ? JSON.parse(this.props.access) : null
        const statusName = `status_${agent.userId}`
        const itemRows = [
            <tr key={i}>

                <td><span>{i + 1} </span></td>

                <td className='username-td'>
                    <span style={{ textTransform: 'uppercase' }}>
                        {agent.username}
                    </span>
                </td>

                <td className='name-td'>
                    <span>
                        {agent.fullName}
                    </span>
                </td>

                <td className='name-td'>
                    <span>
                        {agent.nickname}
                    </span>
                </td>

                {/*Status Col */}
                <td className='th-status'>
                    {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length > 0 || this.props.userTypeId === 10) &&
                        <div className='responsive-div'>
                            {/* <label className='responsive-Col'>{formattedMessages.status}</label> */}
                            <select
                                className='status-label'
                                name={statusName}
                                id={statusName}
                                onChange={this.props.handleUpdateUserStatus}>
                                {agent.status.map((option, i) => {
                                    return (
                                        <option value={option.id} key={i} selected={option.isSelected}>
                                            {option.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                    {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length < 1) &&
                        <div className='responsive-div'>
                            {/* <label className='responsive-Col'>{formattedMessages.status}</label> */}
                            <select
                                disabled
                                className='status-label'
                                name={statusName}
                                id={statusName}
                                onChange={this.props.handleUpdateUserStatus}>
                                {agent.status.map((option, i) => {
                                    return (
                                        <option value={option.id} key={i} selected={option.isSelected}>
                                            {option.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                </td>

                {(this.props.isPaymentModeCash === false || this.props.isPaymentModeCash === "false") &&
                    <td>
                        {/*Credit Col */}
                        <div className='responsive-div'>
                            {/* <label className='responsive-Col'>{formattedMessages.credit}</label> */}
                            <div className='responsive-div-credit'  >
                                <span style={{}}>{formatCurrency(agent.creditLimit)}</span>
                                <div >
                                    {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length > 0 || this.props.userTypeId === 10) &&
                                        <span onClick={() => this.props.onOpenModal('manage_credit', 'Increase Credit', agent, 'md', true)}>
                                            <i className="fa fa-plus-square fa-lg" style={{ color: "green", marginRight: 5 }}></i>
                                        </span>
                                    }
                                    {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length > 0 || this.props.userTypeId === 10) &&
                                        <span onClick={() => this.props.onOpenModal('manage_credit', 'Decrease Credit', agent, 'md', true)}>
                                            <i className="fa fa-minus-square fa-lg" style={{ color: "red", marginRight: 5 }}></i>
                                        </span>
                                    }
                                </div>
                            </div>

                        </div>
                    </td>
                }


                {(this.props.isPaymentModeCash === false || this.props.isPaymentModeCash === "false") && Capitalize(this.props.userType) === 'Member' &&
                    <td >
                        <div className='responsive-di-right'>
                            <label className={agent.balance >= 0 ? `` : `red-text`}> {formatCurrency(agent.balance)}</label>
                        </div>
                    </td>
                }

                {(this.props.isPaymentModeCash === false || this.props.isPaymentModeCash === "false") &&
                    <td className="align-right">
                        <div className='responsive-di-right'>
                            <label className={agent.remainingBalance >= 0 ? `` : `red-text`}> {formatCurrency(agent.remainingBalance)}</label>
                        </div>
                    </td>
                }




                {(this.props.isPaymentModeCash === true || this.props.isPaymentModeCash === "true") && Capitalize(this.props.userType) === 'Member' &&
                    <td >
                        <div className='responsive-di-right'>
                            <label className={agent.cashBalance >= 0 ? `` : `red-text`}>  {formatCurrency(agent.cashBalance)}</label>
                        </div>
                    </td>
                }


                {/*Outstanding Col */}
                {Capitalize(this.props.userType) === 'Member' && <td className="align-right">
                    <div className='responsive-di-right'>
                        <p style={{ cursor: agent.outstandingBalance > 0 ? 'pointer' : '' }} onClick={() => agent.outstandingBalance > 0 ? this.props.onOpenModal('outstandingBet', 'Outstanding Bet Details', agent.userId, 'md', true) : {}}>
                            <label style={{ paddingRight: '3px' }} className={agent.outstandingBalance >= 0 ? agent.outstandingBalance !== 0 ? `bottom-dashed` : `` : `red-text bottom-dashed`}> {formatCurrency(agent.outstandingBalance)}</label>
                            {agent.outstandingBalance > 0 ?
                                <span style={{ color: '#880404' }}>
                                    <i class="fa fa-external-link" aria-hidden="true"></i>
                                </span> : ``
                            }
                        </p>
                    </div>
                </td>
                }

                {
                    Capitalize(this.props.userType) === 'Agent' && <td className="align-center">
                        <div className='manage-mobile'>

                            <Button
                                className="btn-light-red view-downline"
                                type="submit"
                                data-id={agent.userId}
                                size="sm"
                                color="danger"
                                disabled={!(agent.children.length)}
                                onClick={() => this.props.changeUserLevel(this.props.currentLevel + 1, agent.userId)}
                            >
                                <i className="fa fa-eye"></i> {formattedMessages.view} &nbsp;
                        </Button>

                            <Button
                                className="btn-light-red view-hierarchy"
                                type="submit"
                                data-id={agent.userId}
                                size="sm"
                                color="danger"
                                disabled={!agent.children || !agent.children.length}
                                onClick={() => this.handleUserHierarchy(agent.userId)}>
                                <i className="fa fa-sitemap"></i> {formattedMessages.hierarchy} &nbsp;
						</Button>

                            {this.state.showUserHierarchy[agent.userId] && (
                                <WindowPortal closeWindowPortal={(e) => this.handleUserHierarchy(agent.userId)} {...portalProps}>
                                </WindowPortal>
                            )}
                        </div>
                    </td>
                }



                {/*Manage Col */}

                <td className="align-left">


                    <div className='manage-mobile'>
                        {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length > 0 || this.props.userTypeId === 10) &&
                            <Button

                                className="btn-spacing"
                                type="submit"
                                size="sm"
                                color="success"
                                className="btn-light-red"
                                onClick={() => this.props.onOpenModal('details', formattedMessages.accountDetails, agent.userId)} >
                                <i className="fa fa-book"></i> {formattedMessages.edit}
                            </Button>
                        }

                        {Capitalize(this.props.userType) === 'Agent' &&
                            <Button
                                className="btn-spacing"
                                type="submit"
                                size="sm"
                                color="success"
                                className="btn-light-red"
                                onClick={() => this.props.onOpenModal('newUsers', 'New Users', agent.userId, 'md')} > {/*TODO: Translations*/}
                                <i className="fa fa-users"></i> New Users
                            </Button>
                        }

                        {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length < 1) &&
                            <Button

                                className="btn-spacing"
                                type="submit"
                                size="sm"
                                color="success"
                                className="btn-light-red"
                                onClick={() => this.props.onOpenModal('details', formattedMessages.accountDetails, agent.userId)} >
                                <i className="fa fa-book"></i> {formattedMessages.details}
                            </Button>
                        }
                        <Button

                            className="btn-spacing"
                            type="submit"
                            size="sm"
                            color="warning"
                            onClick={() => this.props.onOpenModal('logs', `View ${Capitalize(this.props.userType)} Logs`, agent.userId, 'md')}
                            className="btn-light-red" >
                            <i className="fa fa-address-book-o"></i> {formattedMessages.logs}
                        </Button>

                        {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length > 0 || this.props.userTypeId === 10) &&
                            <Button

                                className="btn-spacing"
                                type="submit"
                                size="sm"
                                color="danger"
                                onClick={() => this.props.onOpenModal('cpassword', Capitalize(this.props.userType) === 'Member' ? formattedMessages.changeMemberPassword : formattedMessages.changeAgentPassword, agent.userId, 'md', true)}
                                className="btn-light-red" >
                                <i className="fa fa-unlock-alt"></i> {formattedMessages.cpassword}
                            </Button>
                        }
                        {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length > 0 || this.props.userTypeId === 10) &&
                            <Button
                                style={{ minWidth: 65 }}
                                className="btn-spacing"
                                type="submit"
                                size="sm"
                                color="success"
                                onClick={() => this.props.onOpenModal('copy_agent', Capitalize(this.props.userType) === 'Member' ? formattedMessages.copyMember : formattedMessages.copyAgent, agent.userId, 'md', true)}
                                className="btn-light-red" >
                                <i className="fa fa-plus-square"></i> <span>{Capitalize(this.props.userType) === 'Member' ? formattedMessages.copyMember : formattedMessages.copyAgent}</span>
                            </Button>
                        }
                    </div>
                </td>
            </tr >
        ]
        return itemRows
    }

    render() {

        const { data, agents } = this.props

        let allItemRows = []

        data.map((item, i) => {
            const perItemRows = this.renderItem(item, i, agents.currentPage)
            allItemRows = allItemRows.concat(perItemRows)
        });

        return allItemRows
    }
}

PropTypes.RenderMembers = {
    agent: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onOpenModal: PropTypes.func,
    userType: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    access: state.securityCode.user.access,
    userTypeId: state.securityCode.user.userTypeId
})

export default connect(mapStateToProps)(RenderMembers)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Capitalize, formatCurrency } from '../../../utils/helpers'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import WindowPortal from '../../../components/WindowPortal'
class RenderDownlines extends Component {

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
        const number = ((currentPage - 1) * 10) + (i + 1)
        const access = (this.props.access) ? JSON.parse(this.props.access) : null
        const statusName = `status_${agent.userId}`
        const itemRows = [
            <tr key={i}>
                {/*Number Col */}
                <td>
                    <div className='responsive-div'>
                        <label>{i + 1} </label>
                    </div>
                </td>


                {/*Username Col */}
                <td className='username-td'>
                    <span style={{ textTransform: 'uppercase' }}>
                        {agent.username}
                    </span>
                </td>
                
                <td>
                    <span>
                        {agent.fullName}
                    </span>
                </td>

                <td className='name-td'>
                    <span>
                        {agent.nickname}
                    </span>
                </td>

                <td className='th-status'>

                    {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length > 0 || this.props.userTypeId === 10) &&
                        <div className='responsive-div'>

                            <select
                                className='status-label'
                                name={statusName}
                                id={statusName}
                                disabled
                                onChange={this.props.handleUpdateUserStatus}>
                                {agent.status.map((option, i) => {
                                    return (
                                        <option value={option.id} key={i} selected={option.isSelected}>
                                            {option.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>}

                    {(this.props.userTypeId === 20 && access.filter(x => x.value === "member_management" && x.isChecked === true).length < 1) &&
                        <div className='responsive-div'>

                            <select
                                disabled
                                style={{ width: 100 }}
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
                {/*Credit Col */}
                {(this.props.isPaymentModeCash === false || this.props.isPaymentModeCash === "false") && <td>
                    <div className='responsive-di-right'>

                        <label className={agent.creditLimit >= 0 ? `` : `red-text`}> {formatCurrency(agent.creditLimit)}</label>
                    </div>
                </td>}

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
                    <td className="align-right">
                        <div className='responsive-div'>

                            <label className={agent.cashBalance >= 0 ? `` : `red-text`}>  {formatCurrency(agent.cashBalance)} </label>
                        </div>
                    </td>
                }


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

                {Capitalize(this.props.userType) === 'Agent' && <td className="align-center">
                    <div className='responsive-div'>

                        <label>
                            <Button
                                style={{ marginTop: 3 }}
                                className="btn-spacing center"
                                type="submit"
                                size="sm"
                                color="danger"
                                onClick={() => { this.props.changeUserLevel(this.props.currentLevel + 1, agent.userId) }}
                                className="btn-light-red"
                                disabled={!(agent.children.length)}>
                                <i className="fa fa fa-eye"></i> {formattedMessages.view} &nbsp;
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
                        </label>
                    </div>
                </td>
                }

                {/*Manage Col */}
                <td className="align-left">
                    <div >

                        <div className='manage-mobile'>
                            <Button
                                className="btn-spacing"
                                type="submit"
                                size="sm"
                                color="success"
                                onClick={() => this.props.onOpenModal('details', formattedMessages.accountDetails, agent.userId, 'lg', true)}
                                className="btn-light-red" >
                                <i className="fa fa-book"></i> {formattedMessages.details}
                            </Button>
                            {Capitalize(this.props.userType) !== 'Member' &&
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
                            <Button

                                className="btn-spacing"
                                type="submit"
                                size="sm"
                                color="warning"
                                onClick={() => this.props.onOpenModal('logs', `View ${Capitalize(this.props.userType)} Logs`, agent.userId, 'md')}
                                className="btn-light-red" >
                                <i className="fa fa-address-book-o"></i> {formattedMessages.logs}
                            </Button>
                        </div>
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

PropTypes.RenderDownlines = {
    agent: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onOpenModal: PropTypes.func,
    userType: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    access: state.securityCode.user.access,
    userTypeId: state.securityCode.user.userTypeId
})

export default connect(mapStateToProps)(RenderDownlines)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Alert,
    Row,
    Button
} from 'reactstrap'
import DisplaySubuserPreference from './DisplaySubuserPreference'
import AddSubuserInformation from './AddSubuserInformation'
import { getSubUser, getSubUserUsername, doAddSubuser, getSubUserById } from '../../../actions/members/subuserAction'
import { resetAddSubUser } from '../../../actions/members/resetAddSubUserAction'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
class SubUser extends Component {

    componentDidMount() {
        this.props.getSubUser(1, 100, this.props.userId)
        this.props.getSubUserUsername(this.props.userId)
        this.props.resetAddSubUser()
    }

    state = {
        isSubmitted: false,
        sub_password: null,
        sub_username: null,
    }

    componentDidUpdate(prevProps) {
        if ((((prevProps.addSubUserError !== this.props.addSubUserError) || (this.props.response !== prevProps.response)) && !this.props.addSubUserError && this.props.response)) {
            this.setState({
                sub_password: null,
                sub_username: null,
                sub_name: null,
            })
            this.props.getSubUserUsername(this.props.userId)
        }
    }




    handleChange = e => {
        if (e.target.name === 'member_management_readOnly' || e.target.name === 'member_management') {
            if (e.target.name === 'member_management_readOnly') {
                this.setState({ member_management: false })
            }
            else {
                this.setState({ member_management_readOnly: false })
            }
            const target = e.target
            const value = target.type === 'checkbox' ? target.checked : target.value
            const name = target.name
            this.setState({ [name]: value })
        }
        else {
            const target = e.target
            const value = target.type === 'checkbox' ? target.checked : target.value
            const name = target.name
            this.setState({ [name]: value })
        }
    }

    handleSubmitSubUser = e => {
        e.preventDefault()
        this.props.resetAddSubUser()
        const {
            sub_name, sub_password,
            member_management, member_management_readOnly, forecast, total_bets, reports, payments, page, pageSize
        } = this.state
        const agent_username = e.target.agent_username.value + e.target.sub_username.value

        this.setState({ isSubmitted: true })



        const permission = [
            { name: 'Member Management', value: 'member_management', isChecked: member_management || false },
            { name: 'Member Management Read Only', value: 'member_management_readOnly', isChecked: member_management_readOnly || false },
            { name: 'Forecast', value: 'forecast', isChecked: forecast || false },
            { name: 'Total Bets', value: 'total_bets', isChecked: total_bets || false },
            { name: 'Reports', value: 'reports', isChecked: reports || false },
            { name: 'Payments', value: 'payments', isChecked: payments || false },
        ]
        if (sub_name && sub_password && sub_password.length >= 5 && sub_password.length <= 15 && agent_username) {
            const subUserDetails = {
                "userId": 0,
                "createdBy": this.props.userId,
                "username": `${agent_username}`,
                "password": `${sub_password}`,
                "name": `${sub_name}`,
                "access": `${JSON.stringify(permission)}`,
                "securityCode": 123456,
            }

            this.props.doAddSubuser(subUserDetails)
            this.setState({ isSubmitted: false })
        }
    }

    clearSubuserFields = () => {
        this.setState({
            sub_username: '', sub_password: '',
            sub_securityCode: '', sub_name: '',
            member_management: false, member_management_readOnly: false,
            forecast: false, total_bets: false, payments: false, reports: false
        })
    }

    render() {
        const { response, errorOnSubmit, addSubUserSuccess, addSubUserError, updateSubUser } = this.props
        return (
            <div className="animated fadeIn">
                <form onSubmit={this.handleSubmitSubUser}>
                    <Card>
                        <CardHeader>
                            <h5 style={{ display: 'inline-block', paddingTop: 4 }}>{formattedMessages.manageMembersCreateSubuser}</h5>

                            <Row style={{ float: 'right', marginRight: 0 }}>
                                <Button
                                    className="btn-spacing"
                                    size="sm"
                                    color="danger"
                                    onClick={this.clearSubuserFields}>
                                    <i className="fa fa-refresh"></i> {formattedMessages.reset}
                                </Button>
                                <Button
                                    className="btn-spacing"
                                    type="submit"
                                    size="sm"
                                    color="success">
                                    <i className="fa fa-plus-square"></i> {formattedMessages.save}
                                </Button>
                            </Row>

                        </CardHeader>
                        <CardBody>

                            {!addSubUserError && response &&
                                <Alert color="success">
                                    <span>Sub user successfully added</span>
                                </Alert>
                            }
                            {!addSubUserSuccess && addSubUserError && <Alert color="danger">
                                <span className="bold"> {addSubUserError} </span>
                            </Alert>}

                            <AddSubuserInformation
                                {...this.state}
                                {...this.props}
                                handleChange={this.handleChange}
                            />

                            <DisplaySubuserPreference griddata={this.props.subUsers.data} />
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.auth.userId,
    response: state.subUser.addSubUser.response,
    errorOnSubmit: state.subUser.addSubUser.error,
    loading: state.subUser.getSubUser.loading,
    error: state.subUser.getSubUser.error,
    message: state.subUser.getSubUser.errorMsg,
    subUsers: state.subUser.getSubUser.subUserDetails,
    username: state.subUser.getSubUserUsername.username,
    agentUsername: state.securityCode.user,
    addSubUserError: state.subUser.addSubUser.error,
    addSubUserSuccess: state.subUser.addSubUser.success,
})

const mapDispatchToProps = dispatch => ({
    getSubUser: (page, pageSize, id) => dispatch(getSubUser(page, pageSize, id)),
    doAddSubuser: (subUserDetails) => dispatch(doAddSubuser(subUserDetails)),
    getSubUserUsername: (id) => dispatch(getSubUserUsername(id)),
    getSubUserById: (id) => dispatch(getSubUserById(id)),
    resetAddSubUser: () => dispatch(resetAddSubUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubUser)
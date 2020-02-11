import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Alert,
  Row,
  Col,
  Button,
  Collapse,
  Table,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
} from 'reactstrap'
import { convertDate } from '../../../utils/helpers'
import InputPassword from '../../../components/InputPassword'
import { getSubUser, doAddSubuser, getSubUserById, updateSubUser, doUpdateSubuser } from '../../../actions/members/subuserAction'
import { resetUpdateSubUser } from '../../../actions/members/resetUpdateSubUserAction'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
class SubuserPreference extends Component {

  static propTypes = {
    griddata: PropTypes.array,
  }

  constructor(props) {
    super(props);

    this.state = {
      modal1: false,
      collapse: true,
      modalIsOpen: false,
    };
    this.toggleSubuserEdit = this.toggleSubuserEdit.bind(this);
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  toggleSubuserEdit = (userId) => {
    this.setState({ modal1: !this.state.modal1 });
    this.props.resetUpdateSubUser()
    this.props.getSubUserById(userId)
    this.setState({
      isSubmitted: false,
      member_management: false,
      member_management_readOnly: false,
      forecast: false,
      total_bets: false,
      payments: false,
      sub_password: '',
      userId: userId,
    })
  }

  togglePassword = () => {
    this.setState({
      passwordFieldType: this.state.passwordFieldType === 'password' ? 'input' : 'password'
    })
  }

  closeModal = () => {
    this.setState({ modal1: !this.state.modal1 });
    this.setState({
      isSubmitted: false,
      member_management: false,
      member_management_readOnly: false,
      forecast: false,
      total_bets: false,
      payments: false,
      statusId: 100,
    })
  }

  componentDidMount() {
    this.props.resetUpdateSubUser()
  }

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.singlesubuserdetail && prevProps.singlesubuserdetail.access &&
      prevProps.singlesubuserdetail.access && prevProps.singlesubuserdetail.access !== this.props.singlesubuserdetail.access) {
      this.props.singlesubuserdetail.access.map(value => {
        this.setState({ [`checked_${value.value}`]: value.isChecked })
      })
    }

    if (prevProps && prevProps.singlesubuserdetail && prevProps.singlesubuserdetail.status && this.props.singlesubuserdetail.status &&
      this.props.singlesubuserdetail.status !== prevProps.singlesubuserdetail.status) {
      const selectedStatus = this.props.singlesubuserdetail.status.find(x => x.isSelected === true);
      if (selectedStatus) {
        this.setState({ statusId: selectedStatus.id })
      }
    }

    if (prevProps && prevProps.singlesubuserdetail && prevProps.singlesubuserdetail.userId &&
      this.props.singlesubuserdetail.userId !== prevProps.singlesubuserdetail.userId) {
      this.props.resetUpdateSubUser()
    }
  }


  renderError = (field) => {
    const { sub_name, sub_password, sub_username, isSubmitted } = this.state
    let result = ''
    switch (field) {
      case 'sub_password':
        if (isSubmitted && sub_password.length < 5) {
          result = "Password must be A-Z or a-z and digit from 0-9 and at least 5 characters."
        } else if (isSubmitted && sub_password.length > 15) {
          result = "Password must be A-Z or a-z and digit from 0-9 and at least 5 characters."
        }
        break
      case 'sub_username': result = (!sub_username && isSubmitted) ? "This field is required." : ''; break
      default: return null
    }
    return result;
  }

  handleChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (e.target.name === 'Member Management Read Only' || e.target.name === 'Member Management' || e.target.name === 'Total Bets' || e.target.name === 'Forecast' || e.target.name === 'Payments') {
      if (e.target.name === 'Member Management') {
        this.setState({
          checked_member_management: value
        })

      } else if (e.target.name === 'Member Management Read Only') {
        this.setState({
          checked_member_management_readOnly: value
        })
      } else if (e.target.name === 'Total Bets') {
        this.setState({
          checked_total_bets: value
        })
      } else if (e.target.name === 'Forecast') {
        this.setState({
          checked_forecast: value
        })
      } else if (e.target.name === 'Payments') {
        this.setState({
          checked_payments: value
        })
      }
    } else if (e.target.name === 'sub_password' && target.type === "password") {
      this.setState({
        sub_password: value
      })
    } else if (e.target.name === 'status') {
      if (e.target.value === 100) {
        this.setState({
          statusId: 100
        })
      } else {
        this.setState({
          statusId: 200
        })
      }

    }

    this.setState({
      [name]: value
    })

    this.props.updateSubUser({
      name: name,
      value: value
    })
  }

  handleSubmitSubUserEdit = e => {
    this.props.resetUpdateSubUser()
    e.preventDefault()

    const {
      userId,
      sub_password,
      statusId,
    } = this.state

    this.setState({ isSubmitted: true })

    let tempStatusId = 0;

    const permission = [
      { name: 'Member Management', value: 'member_management', isChecked: this.props.singlesubuserdetail.access.filter(x => x.value === 'member_management' && x.isChecked === true).length > 0 ? true : false || false },
      { name: 'Member Management Read Only', value: 'member_management_readOnly', isChecked: this.props.singlesubuserdetail.access.filter(x => x.value === 'member_management_readOnly' && x.isChecked === true).length > 0 ? true : false || false },
      { name: 'Forecast', value: 'forecast', isChecked: this.props.singlesubuserdetail.access.filter(x => x.value === 'forecast' && x.isChecked === true).length > 0 ? true : false || false },
      { name: 'Reports', value: 'reports', isChecked: this.props.singlesubuserdetail.access.filter(x => x.value === 'reports' && x.isChecked === true).length > 0 ? true : false || false },
      { name: 'Total Bets', value: 'total_bets', isChecked: this.props.singlesubuserdetail.access.filter(x => x.value === 'total_bets' && x.isChecked === true).length > 0 ? true : false || false },
      { name: 'Payments', value: 'payments', isChecked: this.props.singlesubuserdetail.access.filter(x => x.value === 'payments' && x.isChecked === true).length > 0 ? true : false || false },
    ]

    if (!statusId) {
      if (this.props && this.props.singlesubuserdetail) {
        const selectedStatus = this.props.singlesubuserdetail.status.find(x => x.isSelected === true);
        if (selectedStatus) {
          tempStatusId = selectedStatus.id
        }
      }
    }

    if ((tempStatusId || statusId) && (sub_password.length === 0 || (sub_password.length >= 5 && sub_password.length <= 15))) {
      const subUserDetails = {
        "userid": `${userId}`,
        "password": `${sub_password}`,
        "statusId": `${statusId ? statusId : tempStatusId}`,
        "access": `${JSON.stringify(permission)}`,
        "createdBy": this.props.userId,
      }
      this.props.doUpdateSubuser(subUserDetails)
      this.setState({
        isSubmitted: false,
      })
    }
  }

  render() {
    const { collapse } = this.state
    const {
      griddata,
      singlesubuserdetail,
      response,
      updateSubUserSuccess,
      updateSubUserError } = this.props

    let selectedStatus = 100;

    if (this.props.singlesubuserdetail && this.props.singlesubuserdetail.status) {
      selectedStatus = this.props.singlesubuserdetail.status.find(x => x.isSelected === true);
    }

    return (
      <div style={{ marginBottom: 20 }} className="animated fadeIn">
        <Row>
          <Col md="12" className="col-centered table-bordered-dot">
            <Button color="dark" onClick={this.toggle} style={{ width: 200 }}>{formattedMessages.displaySubuserList}</Button>

            <Collapse isOpen={collapse}>
              {griddata && griddata.length > 0 &&
                <Table hover responsive size="sm" className='responsive-table-subUsers'>
                  <thead>
                    <tr>
                      <td><b>{formattedMessages.username}</b></td>
                      <td><b>{formattedMessages.nickName}</b></td>
                      <td><b>{formattedMessages.created}</b></td>
                      <td><b>{formattedMessages.status}</b></td>
                      <td><b>{formattedMessages.subuserPreference}</b></td>
                      <td><b>{formattedMessages.manage}</b></td>
                    </tr>
                  </thead>
                  <tbody>
                    {griddata && griddata.map((item, index) => {
                      let checkedCount = item.access.filter(x => x.isChecked === true).length;
                      return (
                        <tr key={item.username} key={index}>
                          <td>
                            <label style={{ textTransform: 'uppercase' }}>{item.username}</label>
                          </td>
                          <td>
                            <label style={{ textTransform: 'uppercase' }}>{item.nickname}</label>
                          </td>           
                          <td>
                            <label>{convertDate(item.createdDate)} </label>
                          </td>
                          <td>
                            <label>  {item.status}</label>
                          </td>
                          <td>
                            {item.access && item.access.filter(x => x.isChecked === true).map((item, i) => {
                              return (
                                <span key={i + 100}>
                                  {i < checkedCount - 1 ? `${item.name}, ` : `${item.name}`}
                                </span>
                              )
                            })}
                            {item.access && item.access.filter(x => x.isChecked === true).length === 0 ?
                              <span>
                                Default Preferences
                                </span> : ''
                            }
                          </td>
                          <td>
                            <Button size='sm' className="btn-light-red" style={{ width: 100 }} onClick={() => this.toggleSubuserEdit(item.userId)}>{formattedMessages.edit}</Button>
                          </td>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                </Table>
              }

              {griddata && griddata.length === 0 &&
                <div>
                  <Table>
                    <tbody>
                      <tr>
                        <td>{formattedMessages.noDataFound}.</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              }

            </Collapse>

          </Col>
        </Row>

        <div>
          <Modal isOpen={this.state.modal1} toggle={this.toggleSubuserEdit} className="{this.props.className} modal-dialog modal-lg">
            <ModalHeader toggle={this.toggle1}>{formattedMessages.editSubuser}</ModalHeader>
            <ModalBody>
              <Row>
                <Col md="7">
                  <h5 style={{ marginBottom: 20 }}>{formattedMessages.subuserPreference}</h5>
                  {!updateSubUserError && response &&
                    <Alert color="success">
                      <span>Sub user successfully updated</span>
                    </Alert>
                  }
                  {!updateSubUserSuccess && updateSubUserSuccess && <Alert color="danger">
                    <span className="bold"> {updateSubUserError} </span>
                  </Alert>}
                  <Col md="12">
                    <Label>
                      <input
                        type="checkbox"
                        name="dashboard"
                        checked={true}
                        disabled={true}
                      />
                      <span>{formattedMessages.dashboard}</span>
                    </Label><br />
                    <Label>
                      <input
                        type="checkbox"
                        name="accounts"
                        checked={true}
                        disabled={true}
                      />
                      <span>{formattedMessages.accounts}</span>
                    </Label><br />
                    <Label>
                      <input
                        type="checkbox"
                        name="announcements"
                        checked={true}
                        disabled={true}
                      />
                      <span>{formattedMessages.announcements}</span>
                    </Label><br />
                  </Col>
                  {singlesubuserdetail.access && singlesubuserdetail.access.map((Pref_key, index) => {
                    return (
                      <Col md="12" key={index}>
                        <Label>
                          <input
                            type="checkbox"
                            name={Pref_key.name}
                            onChange={this.handleChange}
                            value={Pref_key.value}
                            checked={Pref_key.isChecked}
                          />
                        </Label>
                        <span>{Pref_key.name}</span><br />
                      </Col>
                    )
                  }
                  )
                  }

                </Col>
                <Col md="5">
                  <Row>
                    <Col md="12" style={{ marginBottom: 20 }}>
                      <span>{formattedMessages.status}:</span><br />
                      <select name="status" onChange={this.handleChange} selected={this.state.statusId ? this.state.statusId : selectedStatus}>
                        {singlesubuserdetail.status && singlesubuserdetail.status.map((status_key, index) => {
                          return (
                            <option value={status_key.id} key={index} selected={status_key.isSelected}>{status_key.name}</option>
                          )
                        }
                        )
                        }
                      </select>
                    </Col>

                    <Col md="12">
                      <InputPassword
                        name="sub_password"
                        labelName={formattedMessages.newPassword}
                        handleChange={this.handleChange}
                        placeholder="Password"
                        appendClass={true}
                        defValue={this.state.sub_password}
                        className={(this.renderError('sub_password') ? 'error' : '')}
                        hint=""
                        error={this.renderError('sub_password')}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Row style={{ float: 'right', marginTop: 30, marginRight: 0 }}>
                <Button
                  className="btn-spacing"
                  type="submit"
                  size="sm"
                  color="success"
                  onClick={this.handleSubmitSubUserEdit}
                >
                  <i className="fa fa-plus-square"></i> {formattedMessages.save}
                </Button>
                <Button
                  className="btn-spacing"
                  size="sm"
                  color="success"
                  onClick={this.closeModal}
                >
                  <i className="fa fa-plus-square"></i> {formattedMessages.close}
                </Button>
              </Row>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  access: state.securityCode.user.access,
  singlesubuserdetail: state.subUser.getSubUserById.singleSubUserDetails,
  userId: state.auth.userId,
  response: state.subUser.updateSubUser.response,
  updateSubUserError: state.subUser.updateSubUser.error,
  updateSubUserSuccess: state.subUser.updateSubUser.success,
})

const mapDispatchToProps = dispatch => ({
  getSubUser: (page, pageSize, id) => dispatch(getSubUser(page, pageSize, id)),
  doAddSubuser: (subUserDetails) => dispatch(doAddSubuser(subUserDetails)),
  doUpdateSubuser: (data) => dispatch(doUpdateSubuser(data)),
  getSubUserById: (id) => dispatch(getSubUserById(id)),
  updateSubUser: (data) => dispatch(updateSubUser(data)),
  resetUpdateSubUser: () => dispatch(resetUpdateSubUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubuserPreference)
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Row,
  Table,
  Alert
} from 'reactstrap';

import Switch from 'react-switch'

import PaginationControls from '../../components/PaginationControls'
import SelectComponent from '../../components/SelectComponent'
import Tabs from '../../components/Tabs'
import MaintenancePage from '../../components/MaintenancePage'
import { SwitchCheck } from './styles'

import { showModal, hideModal } from '../../actions/modal'
import { getPtSetting, editPtSetting, } from '../../actions/members/ptSettingAction'
import { resetPTSetting, resetPTSettingEdit } from '../../actions/members/resetPtSettings'
import { formattedMessages } from '../../translations/formattedMessageTranslation'
import { affirmation } from './translation'

const ptSettingURL = '/member-management/pt-setting'

const MEMBER = 'Member', FORCED_PT_WARNING = 'Forced Pt has been reset, It was greater than Give PT. Please enter a new value.',
  ON_COLOR = '#1f8443', OFF_COLOR = '#bf0505'


class PositionTakingSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      verticals: [
        { catName: formattedMessages.soccerPrematch, catId: 1, subCatId: 1 },
        { catName: formattedMessages.soccerLive, catId: 1, subCatId: 2 },
        { catName: formattedMessages.sports, catId: 2, subCatId: 0 },
        { catName: formattedMessages.parlay, catId: 3, subCatId: 0 },
        { catName: formattedMessages.virtual, catId: 5, subCatId: 0 },
        { catName: 'Games (Maverick)', catId: 4, subCatId: 10 },
        { catName: 'Games (MicroGaming)', catId: 4, subCatId: 4 },
        { catName: 'Games (NetEnt)', catId: 4, subCatId: 5 },
        { catName: 'Games (PlayNGo)', catId: 4, subCatId: 7 },
        { catName: 'Live Casino (MicroGaming)', catId: 6, subCatId: 4 },
        { catName: 'Live Casino (Joker)', catId: 6, subCatId: 2 },
        { catName: 'Cricket (Prematch)', catId: 8, subCatId: 1 },
        { catName: 'Cricket (Live)', catId: 8, subCatId: 2 },
        { catName: 'Keno/Lottery', catId: 7, subCatId: 0 }],
      isModalOpen: false,
      page: 1,
      catId: 1,
      subCatId: 1,
      total: '',
      receive: '',
      isReceivePTUpdated: false,
      give: '',
      forced: '',
      remaining: '',
      userType: '',
      userId: '',
      warning: '',
      maxGive: 0,
      minGive: 0,
      maxForced: 0,
      isTakeRemaining: false,
      uplineForced: 0,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.givePtOnChange = this.givePtOnChange.bind(this);
    this.forcedPtOnChange = this.forcedPtOnChange.bind(this)
    this.agentReceivePTOnChange = this.agentReceivePTOnChange.bind(this)
    this.memberReceivePtOnChange = this.memberReceivePtOnChange.bind(this)
    this.savePTSettings = this.savePTSettings.bind(this)
  }

  componentWillMount() {
    const param = this.props.match.params
    this.props.resetPTSetting()
    this.props.resetPTSettingEdit()
    this.props.getPtSetting(this.state.page, param.pageSize, 1, 1)
  }

  componentDidUpdate() {

    window.onpopstate = (e) => {
      const verticals = this.state.verticals
      const param = this.props.match.params
      this.props.resetPTSetting()

      //checking if its navigating to another path/page so it won't call the change tab & getPtSetting 
      if (e.target.location.pathname.split('/' + param.page)[0] === ptSettingURL) {
        this.changeTab(verticals.filter(function (item) { return item.catId === Number(param.catId) && item.subCatId === Number(param.subCatId) })[0].catName)
        this.props.getPtSetting(param.page, param.pageSize, param.catId, param.subCatId)
      }
    }

    if (this.props.editStatus === 'OK' && this.state.isModalOpen) {
      this.setState({ isModalOpen: false, warning: '' })
      this.props.resetPTSettingEdit()
    }
    else if (this.props.editStatus !== false && 'OK') {
      this.setState({ warning: <Alert style={{ width: '50%', marginTop: 3 }} color='danger'>{this.props.editStatus}</Alert> })
      this.props.resetPTSettingEdit()
    }
  }

  changeTab(tab) {
    this.tabs.onClickTabItem(tab)
  }

  getPTSettingsByCategory(catId, subCatId) {
    const param = this.props.match.params
    this.setState({ catId: catId, subCatId: subCatId, page: 1 })
    this.props.history.push(`${ptSettingURL}/1/${param.pageSize}/${catId}/${subCatId}`)
    this.props.resetPTSetting()
    this.props.getPtSetting(1, param.pageSize, catId, subCatId)
  }

  toggleModal = () => {

    const { isModalOpen } = this.state

    this.setState({ isModalOpen: !isModalOpen, warning: '' }, () => {
      if (this.state.isModalOpen === false) {
        this.setState({
          isTakeRemaining: false
        })
      }
    });

    return
  }


  handleOnPageChange = (page) => {
    const param = this.props.match.params
    this.setState({ page: page })
    this.props.history.push(`${ptSettingURL}/${page}/${param.pageSize}/${this.state.catId}/${this.state.subCatId}`)
    this.props.resetPTSetting()
    this.props.getPtSetting(page, param.pageSize, this.state.catId, this.state.subCatId)
  }

  editPt(total, receive, give, forced, remaining, userType, userId, maxGive, minGive, maxForced, isTakeRemaining, uplineForced) {
    this.setState({
      total: total, receive: receive, give: give,
      forced: forced, remaining: remaining, userType: userType,
      userId: userId, maxGive: maxGive, minGive: minGive,
      maxForced: maxForced,
      isReceivePTUpdated: false,
      isTakeRemaining: isTakeRemaining,
      uplineForced: uplineForced

    })

    this.toggleModal()
  }

  givePtOnChange(value) {
    const { isReceivePTUpdated, receive, maxGive, forced } = this.state
    this.setState({ give: value }, () => {
      this.forcedPtOnChange(forced)
      let keepPTValue = Number(maxGive) - Number(value)
      let isKeepPTUpdatable = !(isReceivePTUpdated && (keepPTValue > Number(receive)))

      if (isKeepPTUpdatable) {
        this.setState({
          receive: keepPTValue,
          isReceivePTUpdated: false
        })
      }
    })
  }


  forcedPtOnChange(value) {
    const { give } = this.state
    if (Number(value) > Number(give)) {
      this.setState({
        forced: give,
        warning: <Alert style={{ width: '50%', marginTop: 3, }} color='warning'>{FORCED_PT_WARNING}</Alert>
      })
    } else {
      this.setState({ warning: '' })
      const remainingPt = this.state.give
      this.setState({ remaining: remainingPt, forced: value })
    }
  }

  memberReceivePtOnChange(value) {
    const { total } = this.state
    const remainingPt = total - value

    this.setState({
      remaining: remainingPt,
      receive: value,
    })
  }

  agentReceivePTOnChange(value) {
    this.setState({
      receive: value,
      isReceivePTUpdated: true
    })
  }

  savePTSettings() {
    this.setState({ warning: '' })
    const { receive, give, forced, userId, catId, subCatId, isTakeRemaining } = this.state
    const ptSettingDetails = {
      'userId': userId,
      'categoryId': catId,
      'subCategoryId': subCatId,
      'receive': Number(receive),
      'give': Number(give),
      'forced': Number(forced),
      'isTakeRemaining': isTakeRemaining
    }

    const param = this.props.match.params
    this.props.editPtSetting(ptSettingDetails, param.page, param.pageSize)
  }

  toggleTakeRemaining = () => {
    const { isTakeRemaining } = this.state
    this.setState({ isTakeRemaining: !isTakeRemaining })
  }

  render() {
    const { data, error, message, loading } = this.props

    const access = (this.props.access) ? JSON.parse(this.props.access) : null
    const { total, receive, remaining, forced, give, userType, maxGive, verticals, minGive, maxForced, isTakeRemaining, uplineForced } = this.state

    if (error) return <MaintenancePage message={message} />

    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Tabs onRef={ref => (this.tabs = ref)}>
              {verticals && verticals.map((vertical, index) => {
                console.log(data)
                return (
                  <div style={{ color: 'blue' }} handleButton={() => this.getPTSettingsByCategory(vertical.catId, vertical.subCatId)} label={vertical.catName}
                    key={index}>
                    <Row>
                      <Col>
                        <Card>
                          <CardHeader>
                            <h5 style={{ display: 'inline-block' }}>{formattedMessages.ptSetting}</h5>
                          </CardHeader>
                          <CardBody>
                            {loading ? <h5 className='mt-3 fade show' style={{ marginLeft: 20 }}>Please wait...</h5> :
                              <Row>
                                {data && data.data && data.data.length > 0 &&
                                  <Table hover responsive size='sm' className='responsive-table-subUsers'>
                                    <thead>
                                      <tr>
                                        <td>
                                          <b>#</b>
                                        </td>
                                        <td>
                                          <b>{formattedMessages.username}</b>
                                        </td>
                                        <td>
                                          <b>{formattedMessages.type}</b>
                                        </td>

                                        <td>
                                          <b>{formattedMessages.total}</b>
                                        </td>
                                        <td>
                                          <b>{formattedMessages.keepPt}</b>
                                        </td>
                                        <td>
                                          <b>{formattedMessages.givePt}</b>
                                        </td>
                                        <td>
                                          <b>{formattedMessages.forcedpt}</b>
                                        </td>
                                        <td>
                                          <b>{formattedMessages.remainingpt}</b>
                                        </td>
                                        {(this.props.userTypeId === 20 && access.filter(x => x.value === 'member_management' && x.isChecked === true).length > 0 ||
                                          this.props.userTypeId === 10) && <td>
                                            <b>{formattedMessages.manage}</b>
                                          </td>
                                        }
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data.data ? data.data.map((data, i) => {
                                        return (<tr key={i}>
                                          <td>
                                            <label> {i + 1}</label>
                                          </td>
                                          <td>
                                            <label>{data.username}</label>
                                          </td>
                                          <td>
                                            <label>{data.userType}</label>
                                          </td>
                                          <td>
                                            <label>{data.total}</label>
                                          </td>
                                          <td>
                                            <label>{data.receive}</label>
                                          </td>
                                          <td>
                                            <label>{data.give}</label>
                                          </td>
                                          <td>
                                            <label>{data.forced} </label>
                                          </td>
                                          <td>
                                            <label>{data.userType === 'Agent' ?
                                              <Switch
                                                onChange={() => { }}
                                                onColor={ON_COLOR}
                                                offColor={OFF_COLOR}
                                                checked={data.isTakeRemaining}
                                                uncheckedIcon={<SwitchCheck>{affirmation.no}</SwitchCheck>}
                                                checkedIcon={<SwitchCheck>{affirmation.yes}</SwitchCheck>}
                                                className='noradius medium'
                                                width={60}
                                                disabled={true} /> : ''}</label>
                                          </td>
                                          {(this.props.userTypeId === 20 && access.filter(x => x.value === 'member_management' && x.isChecked === true).length > 0 ||
                                            this.props.userTypeId === 10) && <td>
                                              <Button className='btn-light-red' size='sm' disabled={!data.isVerticalEnabled}
                                                onClick={() => this.editPt(data.total, data.receive, data.give, data.forced, data.remaining, data.userType, data.userId, data.maxGive, data.minGive, data.maxForced, data.isTakeRemaining, data.uplineForced)}>
                                                <i className='fa fa-book' /> {formattedMessages.edit}</Button>
                                            </td>}
                                        </tr>)
                                      }) : null}
                                    </tbody>
                                  </Table>
                                }
                                {data.data && data.data.length === 0 &&
                                  <Table  >
                                    <tr>
                                      <td>{formattedMessages.noDataFound}</td>
                                    </tr>
                                  </Table>
                                }
                              </Row>
                            }
                          </CardBody>
                          <CardFooter>
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '10px' }}>
                              {data && Math.ceil(data.rowCount / data.pageSize) >= 1 ?
                                <PaginationControls
                                  data={data}
                                  handleOnPageChange={this.handleOnPageChange} /> : null}
                            </div>
                          </CardFooter>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )
              })}
            </Tabs>
            {
              verticals && verticals.length === 0 &&
              <div>
                <Table>
                  <tr>
                    <td>{formattedMessages.noDataFound}</td>
                  </tr>
                </Table>
              </div>
            }
          </Col>
        </Row>
        <div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className={`${this.props.className} modal-dialog modal-lg`}>
            <ModalHeader toggle={this.toggleModal}>Edit Present PT</ModalHeader>
            <ModalBody>
              <Table size='sm' className='responsive-table-subUsers'>
                <thead>
                  <tr>
                    <td><b>{formattedMessages.total}</b></td>
                    <td><b>{formattedMessages.keepPt}</b></td>
                    <td><b>{formattedMessages.givePt}</b></td>
                    <td><b>{formattedMessages.forcedpt}</b></td>
                    <td><b>{formattedMessages.remainingpt}</b></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <SelectComponent endNumber='100' defaultValue={total} disabled={true} />
                    </td>
                    <td>
                      <SelectComponent
                        startNum={userType === MEMBER ? minGive : Number(uplineForced) - Number(give) < 0 ? 0 : Number(uplineForced) - Number(give)}
                        endNumber={userType === MEMBER ? maxGive.toString() : (Number(total.toString()) - Number(give)).toString()} value={receive} disabled={false}
                        handleChange={(value) => userType === MEMBER ? this.memberReceivePtOnChange(value.target.value) : this.agentReceivePTOnChange(value.target.value)} />
                    </td>
                    <td>
                      <SelectComponent
                        endNumber={maxGive.toString()}
                        disabled={userType === MEMBER ? true : false} defaultValue={give}
                        handleChange={(value) => this.givePtOnChange(value.target.value)} />
                    </td>
                    <td>
                      <SelectComponent endNumber={Number(maxForced) > Number(give) ? give.toString() : maxForced.toString()} disabled={userType === MEMBER ? true : false} value={forced}
                        handleChange={(value) => this.forcedPtOnChange(value.target.value)} />
                    </td>
                    <td>
                      {userType === 'Agent' ? <Switch
                        onChange={() => this.toggleTakeRemaining()}
                        onColor={ON_COLOR}
                        offColor={OFF_COLOR}
                        checked={isTakeRemaining}
                        uncheckedIcon={<SwitchCheck>{affirmation.no}</SwitchCheck>}
                        checkedIcon={<SwitchCheck>{affirmation.yes}</SwitchCheck>}
                        className='noradius medium'
                        width={60}
                      /> : null /*<SelectComponent endNumber={'100'} value={remaining.toString()} disabled={true} />*/}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {this.state.warning}
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={() => this.savePTSettings()} >{formattedMessages.save}</Button>{' '}
              <Button color='secondary' onClick={this.toggleModal} >{formattedMessages.cancel}</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userTypeId: state.securityCode.user.userTypeId,
  data: state.ptSettingReducer.data,
  loading: state.ptSettingReducer.loading,
  error: state.ptSettingReducer.error,
  message: state.ptSettingReducer.message,
  editStatus: state.ptSettingReducer.editStatus,
  access: state.securityCode.user.access,
})


const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps) => {
    dispatch(showModal({ modalProps }))
  },
  resetPTSetting: () => dispatch(resetPTSetting()),
  resetPTSettingEdit: () => dispatch(resetPTSettingEdit()),
  getPtSetting: (page, pageSize, categoryId, subCategoryId) => dispatch(getPtSetting(page, pageSize, categoryId, subCategoryId)),
  editPtSetting: (ptSettingDetails, page, pageSize) => dispatch(editPtSetting(ptSettingDetails, page, pageSize))
})



export default connect(mapStateToProps, mapDispatchToProps)(PositionTakingSettings)

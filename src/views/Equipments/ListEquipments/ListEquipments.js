//main
import React, { Component } from 'react';
import { connect } from 'react-redux'
import CurrencyInput from './CurrencyInput'
import Popup from 'reactjs-popup'
import {
  Alert,
	FormGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	InputGroup,
	Label,
  Card,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  Row,
  Col

} from 'reactstrap'

//create
import PropTypes from 'prop-types'
import { createEquipments, resetCreateEquipments } from '../../../actions/equipments/createEquipments'

//list
import { Link } from 'react-router-dom'
import { getEquipments } from '../../../actions/equipments/getEquipments'
import { getEquipmentsYearExpire } from '../../../actions/equipments/getYearsExpire'
const sortOrder = [
    { id: 'yearAscending', name: 'Expiration Date Ascending' },
    { id: 'yearDescending', name: 'Expiration Date Descending' }
]

class ListEquipments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      //list props
      searchText: '',
      searchYear: 'all',
      dataSort : 'yearAscending',
      //create props
			equipmentName: '',
			vendorID: '',
			cost: 0,
			quantity: 1,
			measurement: 0,
			equipmentType: '',
			purchaseDate: 1990,
			expDate: 2020,
			submitted: false,
			showMsg: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  //--------------------------------------------create--------------------------------------------//
  componentDidUpdate(prevProps) {
		const { success } = this.props
		if ((prevProps.success !== true && success === true)) {
			this.setState({
				equipmentName: '',
				vendorID: '',
				cost: 0,
				quantity: 1,
				measurement: 0,
				equipmentType: '',
				purchaseDate: 1990,
				expDate: 2020,
				isSubmitted: false,
				showMsg: true,
			})

			setTimeout(() => {
				this.setState({ showMsg: false })
				this.props.resetCreateEquipments()
			}, 3000)
		}
  }
  handleCreateEquipment = () => {

		const {
			equipmentName,
			vendorID,
			cost,
			quantity,
			measurement,
			equipmentType,
			purchaseDate,
			expDate
		} = this.state

		const equipment = {
			equipmentName: equipmentName,
			vendorID: vendorID,
			cost: cost,
			quantity: quantity,
			measurement: measurement,
			equipmentType: equipmentType,
			purchaseDate: purchaseDate,
			expDate: expDate,
		}

		this.setState({
			isSubmitted: true
		})

		if (equipmentName && vendorID && cost && quantity && measurement && equipmentType && purchaseDate && expDate) {
			this.props.createEquipments(equipment)
		}
		else {
			this.setState({
				hasFormError: true
			})
		}
	}
//--------------------------------------------create--------------------------------------------//

//--------------------------------------------list--------------------------------------------//
  componentDidMount() {
    this.props.getEquipments(null, null, null)
    this.props.getEquipmentsYearExpire()
  }

  handleSearchButton = () => {
    const { searchText, searchYear, dataSort } = this.state
    this.props.getEquipments(searchText, searchYear, dataSort)
  }

  renderTable() {

    const { equipmentsData } = this.props
    return (
      <div style={{ width: '100%', marginLeft: 20, marginTop: 5 }} className="table-bordered-dot" >
        <Table hover bordered striped responsive size="sm" className="responsive-table" >
          <thead className="table-head">
            <tr>
              <th>#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Expiration Date</th>
              <th className="text-center">Manage</th>
            </tr>
          </thead>
          <tbody>
            {equipmentsData ? equipmentsData.map((data, i) => {

              let link = `/equipments/view/${data.id}`

              return (
                <tr key={i}>
                  <td>
                    <div className="responsive-label"> # </div>
                    <span className="responsive-item">{i + 1}</span>
                  </td>
                  <td>
                    <div className="responsive-label">  Name </div>
                    <div className="responsive-item"> <Link to={link}> {data.equipmentName} </Link></div>
                  </td>
                  <td>
                    <div className="responsive-label"> Quantity </div>
                    <div className="responsive-item text-right">{data.quantity}</div>
                  </td>
                  <td>
                    <div className="responsive-label"> Expiration Date </div>
                    <div className="responsive-item text-center">{data.expDate}</div>
                  </td>
                  <td>
                    <div className="responsive-label"> Manage </div>
                    <div className="responsive-item text-center">
                      <a className="fa fa-plus" />

                    </div>
                  </td>
                </tr>
              )
            }) : null}
          </tbody>
        </Table>
      </div>
    )
  }
//--------------------------------------------list--------------------------------------------//

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    //create
    const {
			equipmentName,
			vendorID,
			cost,
			quantity,
			measurement,
			equipmentType,
			purchaseDate,
			expDate,
			isSubmitted,
			showMsg
    } = this.state
    const { loading } = this.props

    //list
    const { equipmentsData } = this.props
    const { searchText, dataSort } = this.state

    return (
      <div className="animated fadeIn" style={{ minWidth: '450px' }}>
        <Card className="reports-card">
          <CardHeader>
            <h5 style={{ display: 'inline-block', paddingTop: 4 }}>
              Equipment List
                </h5>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs='12' sm='12' md='12' lg='12' xl='12'>
                <div className="form-row responsive mobile-margin-bottom" style={{ marginLeft: 5, marginTop: 5, }}>

                  <div style={{ marginRight: 2 }}>
                    <Input
                      type="text"
                      name="searchText"
                      style={{ height: 35, width: 169 }}
                      placeholder={'Equipment Name'}
                      value={searchText}
                      className="form-control"
                      onChange={this.handleChange} />
                  </div>
                
                  <div style={{ display: 'flex', marginLeft: '10px' }}>
                    <select style={{ height: 35, width: 250, background: '#fff' }} className="form-control" name="dataSort" onChange={this.handleChange} value={dataSort}>
                          {sortOrder.map((item, i) => {
                            return(
                                <option value={item.id} key={item.id}>{item.name}</option>
                            )
                          })} 
                    </select>
                  </div>

                  <div className='row mobile-search-button-margin' >
                    <Button className="ml-15" style={{ width: 115 }} onClick={() => this.handleSearchButton()} color="dark">
                      <i className="fa fa-search fa-lg hide" />  Search
                    </Button>
                  </div>
                  <div>
                    <Button className="ml-15" onClick={this.openModal} color="dark">
                      <i className="fa fa-plus-circle fa-lg hide" />  Add Equipment
                    </Button>
                    <Popup
                      open={this.state.open}
                      closeOnDocumentClick
                      onClose={this.closeModal}
                    >
                      <div className="animated fadeIn">
                        <Card>
                          <CardHeader>
                            <a className="fa fa-close fa-lg pull-right" onClick={this.closeModal} />
                            <h5 style={{ paddingTop: 4 }}>Add Equipment</h5>
                          </CardHeader>
                          <CardBody >
                            {showMsg && <Alert color="success"> Equipment successfully added. </Alert>}
                            <Row>
                              <div style={{ position:'relative', marginLeft:'auto', marginRight:'auto' }}>
                                <FormGroup>
                                  <Label for="equipmentName"> Name :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-screen-smartphone"></i>
                                      </InputGroupText>
                                      <Input
                                        type='text'
                                        name="equipmentName"
                                        placeholder={'Name of the Product'}
                                        maxLength="30"
                                        value={equipmentName}
                                        onChange={this.handleChange}
                                        className={!equipmentName && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="cost"> Cost :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append" style={{height:'35px'}}>
                                      <InputGroupText>
                                        <i className="icon-paypal"></i>
                                      </InputGroupText>
                                      <CurrencyInput
                                        name="cost"
                                        placeholder="PHP 0.00"
                                        height="30"
                                        onChange={this.handleChange}
                                        className={!cost && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="measurement"> Measurement :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-speedometer"></i>
                                      </InputGroupText>
                                      <Input
                                        type='select'
                                        name="measurement"
                                        value={measurement}
                                        onChange={this.handleChange}
                                        className={!measurement && isSubmitted ? 'has-error' : ''}
                                      >
                                        <option>KG</option>
                                        <option>PCS</option>
                                        <option>L</option>
                                      </Input>

                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="purchaseDate"> Year Purchased :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-calendar"></i>
                                      </InputGroupText>
                                      <Input
                                        type='date'
                                        name="purchaseDate"
                                        // placeholder={'11/25/1671'}
                                        maxLength="30"
                                        value={purchaseDate}
                                        onChange={this.handleChange}
                                        className={!purchaseDate && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                              </div>
                              <div style={{ position:'relative', marginLeft:'auto', marginRight:'auto' }}>
                                <FormGroup>
                                  <Label for="vendorID"> Vendor :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-user-follow"></i>
                                      </InputGroupText>
                                      <Input
                                        type='text'
                                        name="vendorID"
                                        placeholder={'Name of Vendor'}
                                        maxLength="30"
                                        value={vendorID}
                                        onChange={this.handleChange}
                                        className={!vendorID && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="quantity"> Quantity :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-star"></i>
                                      </InputGroupText>
                                      <Input
                                        type='number'
                                        name="quantity"
                                        maxLength="30"
                                        value={quantity}
                                        onChange={this.handleChange}
                                        className={!quantity && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="equipmentType"> Equipment Type :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-screen-desktop"></i>
                                      </InputGroupText>
                                      <Input
                                        type='select'
                                        name="equipmentType"
                                        placeholder={'Type of Equipment'}
                                        maxLength="30"
                                        value={equipmentType}
                                        onChange={this.handleChange}
                                        className={!equipmentType && isSubmitted ? 'has-error' : ''}
                                      >
                                        <option>Machinery</option>
                                        <option>Seeds</option>
                                        <option>Chemicals</option>
                                      </Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="expDate"> Expiration Date :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-paper-clip"></i>
                                      </InputGroupText>
                                      <Input
                                        type='date'
                                        name="expDate"
                                        // placeholder={'11/25/1671'}
                                        maxLength="30"
                                        value={expDate}
                                        onChange={this.handleChange}
                                        className={!expDate && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                              </div>
                            </Row>
                              <div className="align-right">
                                <Button
                                  color="success"
                                  className="btn-spacing pull-right"
                                  onClick={this.handleCreateEquipment}
                                  disabled={loading}
                                  style={{ float: 'right' }}>
                                  <i className="fa fa-unlock-alt fa-lg" /> Save
                                </Button>
                              </div>
                          </CardBody>
                        </Card>
                      </div>
                    </Popup>
                  </div>


                </div>
              </Col>
            </Row>
            <Row>
              {this.renderTable()}
              {(equipmentsData && equipmentsData.length === 0) || equipmentsData === [] ? <label style={{ textAlign: 'center', width: '100%' }}><b> No data found</b></label> : null}
            </Row>

          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  //create
  error: state.equipments.createEquipments.error,
	success: state.equipments.createEquipments.success,
	response: state.equipments.createEquipments.response,
  loading: state.equipments.createEquipments.loading,
  //list
  equipmentsData: state.equipments.equipmentsList.data,
  loadings: state.equipments.equipmentsList.loading,
  errors: state.equipments.equipmentsList.error,
})

const mapDispatchToProps = dispatch => ({
  //create
	createEquipments: (equipment) => dispatch(createEquipments(equipment)),
  resetCreateEquipments: () => dispatch(resetCreateEquipments()),
  //list
  getEquipments: (name, year, sortOrder) => dispatch(getEquipments(name, year, sortOrder)),
  getEquipmentsYearExpire: () => dispatch(getEquipmentsYearExpire())
})

PropTypes.CreateDrinks = {
	error: PropTypes.bool.isRequired,
	success: PropTypes.object.isRequired,
	response: PropTypes.bool,
	createEquipments: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEquipments)
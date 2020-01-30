import React, { Component } from 'react';
import { connect } from 'react-redux'
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

import CurrencyInput from './CurrencyInput'
import Popup from 'reactjs-popup'
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
      searchText: '',
      searchYear: 'all',
      dataSort : 'yearAscending',
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

  componentDidMount() {
    this.props.getEquipments(null, null, null)
    this.props.getEquipmentsYearExpire()
  }

  handleSearchButton = () => {

    const { searchText, searchYear, dataSort } = this.state

    this.props.getEquipments(searchText, searchYear, dataSort)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreateEquipment = () => {

		const {
			equipmentID,
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
			equipmentID: equipmentID,
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

		if (equipmentID && equipmentName && vendorID && cost && quantity && measurement && equipmentType && purchaseDate) {
			this.props.createEquipments(equipment)
		}
		else {
			this.setState({
				hasFormError: true
			})
		}
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
                    <div className="responsive-item">{data.quantity}</div>
                  </td>
                  <td>
                    <div className="responsive-label"> Expiration Date </div>
                    <div className="responsive-item">{data.dateExpire}</div>
                  </td>
                  <td>
                    <div className="responsive-label"> Manage </div>
                    <div className="responsive-item text-right">{data.quantity}</div>
                  </td>
                </tr>
              )
            }) : null}
          </tbody>
        </Table>
      </div>
    )
  }


  render() {

    const {
			equipmentID,
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

    const { equipmentsData, yearData, vineyardData } = this.props

    const { searchText, searchVendors, dataSort } = this.state

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
                      <a className="close" onClick={this.closeModal}> &times;</a>
                      <div className="animated fadeIn">
                        <Row>
                          <Col>
                            <Card>
                              <CardHeader>
                                <h5 style={{ paddingTop: 4 }}>Add Equipment</h5>
                              </CardHeader>
                              <CardBody style={{ paddingTop: 50, paddingBottom: 30 }}>
                                <Row md={`6`} style={{  }}>
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
                                    <Label for="cost"> Cost :  </Label>
                                    <InputGroup>
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                          <i className="icon-paypal"></i>
                                        </InputGroupText>
                                        <CurrencyInput
                                          type="text" 
                                          name="cost"
                                          placeholder="PHP 0.00"
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
                                    <Label for="purchaseDate"> Year Purchased :  </Label>
                                    <InputGroup>
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                          <i className="icon-calendar"></i>
                                        </InputGroupText>
                                        <Input
                                          type='date'
                                          name="purchaseDate"
                                          maxLength="30"
                                          value={purchaseDate}
                                          onChange={this.handleChange}
                                          className={!purchaseDate && isSubmitted ? 'has-error' : ''}
                                        />
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
                                          maxLength="30"
                                          value={expDate}
                                          onChange={this.handleChange}
                                          className={!expDate && isSubmitted ? 'has-error' : ''}
                                        />
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>
                                </Row>
                                <Row>
                                  {showMsg &&
                                    <Alert color="success">
                                      Equipment successfully added.
                                                    </Alert>
                                  }
                                  <div className="align-right">
                                    <Button
                                      color="success"
                                      className="btn-spacing"
                                      onClick={this.handleCreateEquipment}
                                      disabled={loading}
                                      style={{ float: 'right' }}>
                                      <i className="fa fa-unlock-alt fa-lg" /> Save
                                    </Button>
                                  </div>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
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
  equipmentData: state.drinks.drinksList.data,
  yearData: state.drinks.yearList.data,
  loading: state.drinks.drinksList.loading,
  error: state.drinks.drinksList.error,
})

const mapDispatchToProps = dispatch => ({
  getEquipments: (name, year, sortOrder) => dispatch(getEquipments(name, year,sortOrder)),
  getEquipmentsYearExpire: () => dispatch(getEquipmentsYearExpire())
})


export default connect(mapStateToProps, mapDispatchToProps)(ListEquipments)
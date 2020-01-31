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
import { createInputs, resetCreateInputs } from '../../../actions/inputs/createInputs'

//list
import { Link } from 'react-router-dom'
import { getInputs } from '../../../actions/inputs/getInputs'
import { getInputsYearAcquired } from '../../../actions/inputs/getYearsAcquired'
const sortOrder = [
    { id: 'yearAscending', name: 'Acquired Date Ascending' },
    { id: 'yearDescending', name: 'Acquired Date Descending' }
]

class ListInputs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      //list props
      searchText: '',
      searchYear: 'all',
      dataSort : 'yearAscending',
      //create props
			inputName: '',
			vendorID: '',
			cost: '',
			quantity: '',
			inputType: '',
			purchaseDate: '',
			acquiredDate: '',
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
				inputName: '',
				vendorID: '',
				cost: 0,
				quantity: 1,
				inputType: '',
				purchaseDate: 1990,
				acquiredDate: 2020,
				isSubmitted: false,
				showMsg: true,
			})

			setTimeout(() => {
				this.setState({ showMsg: false })
				this.props.resetCreateInputs()
			}, 3000)
		}
  }
  handleCreateInput = () => {

		const {
			inputName,
			vendorID,
			cost,
			quantity,
			inputType,
			purchaseDate,
			acquiredDate
		} = this.state

		const input = {
			inputName: inputName,
			vendorID: vendorID,
			cost: cost,
			quantity: quantity,
			inputType: inputType,
			purchaseDate: purchaseDate,
			acquiredDate: acquiredDate,
		}

		this.setState({
			isSubmitted: true
		})

		if (inputName && vendorID && cost && quantity && inputType && purchaseDate && acquiredDate) {
			this.props.createInputs(input)
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
    this.props.getInputs(null, null, null)
    this.props.getInputsYearAcquired()
  }

  handleSearchButton = () => {
    const { searchText, searchYear, dataSort } = this.state
    this.props.getInputs(searchText, searchYear, dataSort)
  }

  renderTable() {

    const { inputsData } = this.props
    return (
      <div style={{ width: '100%', marginLeft: 20, marginTop: 5 }} className="table-bordered-dot" >
        <Table hover bordered striped responsive size="sm" className="responsive-table" >
          <thead className="table-head">
            <tr>
              <th>#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Date Acquired</th>
              <th className="text-center">Manage</th>
            </tr>
          </thead>
          <tbody>
            {inputsData ? inputsData.map((data, i) => {

              let link = `/inputs/view/${data.id}`

              return (
                <tr key={i}>
                  <td>
                    <div className="responsive-label"> # </div>
                    <span className="responsive-item">{i + 1}</span>
                  </td>
                  <td>
                    <div className="responsive-label">  Name </div>
                    <div className="responsive-item"> <Link to={link}> {data.inputName} </Link></div>
                  </td>
                  <td>
                    <div className="responsive-label"> Quantity </div>
                    <div className="responsive-item text-right">{data.quantity}</div>
                  </td>
                  <td>
                    <div className="responsive-label"> Date Acquired  </div>
                    <div className="responsive-item text-center">{data.acquiredDate}</div>
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
			inputName,
			vendorID,
			cost,
			quantity,
			inputType,
			purchaseDate,
			acquiredDate,
			isSubmitted,
			showMsg
    } = this.state
    const { loading } = this.props

    //list
    const { inputsData } = this.props
    const { searchText, dataSort } = this.state

    return (
      <div className="animated fadeIn" style={{ minWidth: '450px' }}>
        <Card className="reports-card">
          <CardHeader>
            <h5 style={{ display: 'inline-block', paddingTop: 4 }}>
              Input List
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
                      placeholder={'Input Name'}
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
                      <i className="fa fa-plus-circle fa-lg hide" />  Add Input
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
                            <h5 style={{ paddingTop: 4 }}>Add Input</h5>
                          </CardHeader>
                          <CardBody >
                            {showMsg && <Alert color="success"> Input successfully added. </Alert>}
                            <Col>
                            <Row>
                              <div style={{ position:'relative', marginLeft:'auto', marginRight:'auto' }}>
                                <FormGroup>
                                  <Label for="inputName"> Name :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-screen-smartphone"></i>
                                      </InputGroupText>
                                      <Input
                                        type='text'
                                        name="inputName"
                                        placeholder={'Name of the Product'}
                                        maxLength="30"
                                        value={inputName}
                                        onChange={this.handleChange}
                                        className={!inputName && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="inputType"> Category :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append" style={{height:'35px'}}>
                                      <InputGroupText>
                                        <i className="icon-paypal"></i>
                                      </InputGroupText>
                                      <Input
                                        type='select'
                                        name="inputType"
                                        placeholder={'Type of Input'}
                                        maxLength="30"
                                        value={inputType}
                                        onChange={this.handleChange}
                                        className={!inputType && isSubmitted ? 'has-error' : ''}
                                      >
                                        <option>Tool</option>
                                        <option>Tractor</option>
                                        <option>Other</option>
                                      </Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="purchaseDate"> Date Purchased :  </Label>
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
                                  <Label for="vendorID"> ID Number :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-user-follow"></i>
                                      </InputGroupText>
                                      <Input
                                        type='number'
                                        name="vendorID"
                                        placeholder={'0'}
                                        maxLength="30"
                                        value={vendorID}
                                        onChange={this.handleChange}
                                        className={!vendorID && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="cost"> Model :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-screen-desktop"></i>
                                      </InputGroupText>
                                      <Input
                                        type='text'
                                        name="cost"
                                        placeholder={'Product Model'}
                                        maxLength="30"
                                        value={cost}
                                        onChange={this.handleChange}
                                        className={!cost && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Label for="acquiredDate"> Date Acquired :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i className="icon-paper-clip"></i>
                                      </InputGroupText>
                                      <Input
                                        type='date'
                                        name="acquiredDate"
                                        maxLength="30"
                                        value={acquiredDate}
                                        onChange={this.handleChange}
                                        className={!acquiredDate && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                              </div>
                            </Row>
                            <Row>
                              <div style={{ position:'relative', marginLeft:'auto', marginRight:'auto' }}>
                                < FormGroup>
                                  <Label for="quantity"> Description :  </Label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="append" style={{height:'100px', width:'300px'}}>
                                      <InputGroupText>
                                        <i className="icon-paper-clip"></i>
                                      </InputGroupText>
                                      <Input
                                        type='textarea'
                                        name="quantity"
                                        value={quantity}
                                        onChange={this.handleChange}
                                        className={!quantity && isSubmitted ? 'has-error' : ''}
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </FormGroup>
                              </div>
                            </Row>
                            </Col>  
                              <div className="align-right">
                                
                                <Button
                                  color="success"
                                  className="btn-spacing pull-right"
                                  onClick={this.handleCreateInput}
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
              {(inputsData && inputsData.length === 0) || inputsData === [] ? <label style={{ textAlign: 'center', width: '100%' }}><b> No data found</b></label> : null}
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
  error: state.inputs.createInputs.error,
	success: state.inputs.createInputs.success,
	response: state.inputs.createInputs.response,
  loading: state.inputs.createInputs.loading,
  //list
  inputsData: state.inputs.inputsList.data,
  loadings: state.inputs.inputsList.loading,
  errors: state.inputs.inputsList.error,
})

const mapDispatchToProps = dispatch => ({
  //create
	createInputs: (input) => dispatch(createInputs(input)),
  resetCreateInputs: () => dispatch(resetCreateInputs()),
  //list
  getInputs: (name, year, sortOrder) => dispatch(getInputs(name, year, sortOrder)),
  getInputsYearAcquired: () => dispatch(getInputsYearAcquired())
})

PropTypes.CreateDrinks = {
	error: PropTypes.bool.isRequired,
	success: PropTypes.object.isRequired,
	response: PropTypes.bool,
	createInputs: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListInputs)
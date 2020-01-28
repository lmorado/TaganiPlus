import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Card,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  Input,
  Row,
  Col
} from 'reactstrap'

import { Link } from 'react-router-dom'

import { getDrinks } from '../../../actions/drinks/getDrinks'
import { getDrinksVineyard } from '../../../actions/drinks/getVineyards'
import { getDrinksYear } from '../../../actions/drinks/getYears'

const sortOrder = [
    { id: 'vineyardAscending', name: 'Vineyard Ascending' },
    { id: 'vineyardDescending', name: 'Vineyard Descending' },
    { id: 'yearAscending', name: 'Manufactured Year Ascending' },
    { id: 'yearDescending', name: 'Manufactured Year Descending' }
]

class DrinkList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchVineyard: 'all',
      searchText: '',
      searchYear: 'all',
      dataSort : 'vineyardAscending'
    }
  }

  componentDidMount() {
    this.props.getDrinks(null, null, null, null)
    this.props.getDrinksVineyard()
    this.props.getDrinksYear()
  }

  handleSearchButton = () => {

    const { searchText, searchVineyard, searchYear, dataSort } = this.state

    this.props.getDrinks(searchText, searchVineyard, searchYear, dataSort)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  renderTable() {

    const { drinksData } = this.props
    return (
      <div style={{ width: '100%', marginLeft: 20, marginTop: 5 }} className="table-bordered-dot" >
        <Table hover bordered striped responsive size="sm" className="responsive-table" >
          <thead className="table-head">
            <tr>
              <th>#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Vineyard</th>
              <th className="text-center">Year Manufactured</th>
              <th className="text-center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {drinksData ? drinksData.map((data, i) => {

              let link = `/drinks/view/${data.id}`

              return (
                <tr key={i}>
                  <td>
                    <div className="responsive-label"> # </div>
                    <span className="responsive-item">{i + 1}</span>
                  </td>
                  <td>
                    <div className="responsive-label">  Name </div>
                    <div className="responsive-item"> <Link to={link}> {data.drinkName} </Link></div>
                  </td>
                  <td>
                    <div className="responsive-label"> Vineyard </div>
                    <div className="responsive-item">{data.vineyard}</div>
                  </td>
                  <td>
                    <div className="responsive-label"> Year Manufactured </div>
                    <div className="responsive-item">{data.yearMade}</div>
                  </td>
                  <td>
                    <div className="responsive-label"> Quantity </div>
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

    const { drinksData, yearData, vineyardData } = this.props

    const { searchText, searchVineyard, dataSort } = this.state

    return (
      <div className="animated fadeIn" style={{ minWidth: '450px' }}>
        <Card className="reports-card">
          <CardHeader>
            <h5 style={{ display: 'inline-block', paddingTop: 4 }}>
              Drink List
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
                      placeholder={'Name of the drink'}
                      value={searchText}
                      className="form-control"
                      onChange={this.handleChange} />
                  </div>

                  <div style={{ display: 'flex', marginLeft: '10px' }}>
                    <select style={{ height: 35, width: 100, background: '#fff' }} name="searchYear" onChange={this.handleChange}
                      value={this.state.searchYear}
                      className="form-control">
                      <option value="all">All</option>
                      {yearData.map((yearData, i) => {
                        return <option key={i} value={yearData}> {yearData}</option>
                      })}
                    </select>
                  </div>

                  <div style={{ display: 'flex', marginLeft: '10px' }}>
                    <select style={{ height: 35, background: '#fff' }} name="searchVineyard" onChange={this.handleChange}
                      value={searchVineyard}
                      className="form-control">
                      <option value="all">All</option>
                      {vineyardData.map((vineyardData, i) => {
                        return <option key={i} value={vineyardData}> {vineyardData}</option>
                      })}
                    </select>
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


                </div>
              </Col>
            </Row>
            <Row>
              {this.renderTable()}
              {(drinksData && drinksData.length === 0) || drinksData === [] ? <label style={{ textAlign: 'center', width: '100%' }}><b> No data found</b></label> : null}
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
  drinksData: state.drinks.drinksList.data,
  vineyardData: state.drinks.vineyardList.data,
  yearData: state.drinks.yearList.data,
  loading: state.drinks.drinksList.loading,
  error: state.drinks.drinksList.error,
})

const mapDispatchToProps = dispatch => ({
  getDrinks: (name, vineyard, year,sortOrder) => dispatch(getDrinks(name, vineyard, year,sortOrder)),
  getDrinksYear: () => dispatch(getDrinksYear()),
  getDrinksVineyard: () => dispatch(getDrinksVineyard())
})


export default connect(mapStateToProps, mapDispatchToProps)(DrinkList)
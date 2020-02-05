import React, { Component } from 'react';
import LineChart from 'react-linechart';
import DonutChart  from 'react-donut-chart';
import {
	Container,
	Col,
	Row,
	Card,
	CardBody,
	Table
} from 'reactstrap';
import StyledCardHeader from '../../components/StyledCardHeader';


class MainIndex extends Component {
	render() {
		
		return (
			<Container fluid style={{paddingLeft:'7px',paddingRight:'7px'}}>
				<Row>
					<Col className="sm-6 lg-3">
						<Card style={{  padding: 10 }}>
							<CardBody className="clearfix p-0">
								<a className="bg-blue p-4 mr-3 float-left">
									<i className="fa fa-money fa-3x"></i>
								</a>
								<h5 className="mb-0 text-right text-primary pt-3"> $1,995.5</h5>
								<h5 className="text-muted text-right text-uppercase font-weight-bold font-xs"> Total Income </h5>
								<h6 className="text-muted text-right font-weight-bold font-xs">Recievables -> $0.00/$0.00</h6>
							</CardBody>
						</Card>
					</Col>
					<Col className="sm-6 lg-3">
						<Card style={{  padding: 10 }}>
							<CardBody className="clearfix p-0">
								<a className="bg-red p-4 mr-3 float-left">
									<i className="fa fa-shopping-cart fa-3x"></i>
								</a>
								<h5 className="mb-0 text-right text-primary pt-3"> $1,995.5</h5>
								<h5 className="text-muted text-right text-uppercase font-weight-bold font-xs"> Total Expenses </h5>
								<h6 className="text-muted text-right font-weight-bold font-xs">Payables -> $0.00/$0.00</h6>
							</CardBody>
						</Card>
					</Col>
					<Col className="sm-6 lg-3">
						<Card style={{  padding: 10 }}>
							<CardBody className="clearfix p-0">
								<a className="bg-green p-4 mr-3 float-left">
									<i className="fa fa-heart fa-3x"></i>
								</a>
								<h5 className="mb-0 text-right text-primary pt-3"> $1,995.5</h5>
								<h5 className="text-muted text-right text-uppercase font-weight-bold font-xs"> Total Profit </h5>
								<h6 className="text-muted text-right font-weight-bold font-xs">Upcoming -> $0.00/$0.00</h6>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col className="md-12">
						<Card>
							<StyledCardHeader>
								<a className="text-muted pull-right">docs</a>
								<h3 className="box-title">Cash Flow</h3>
							</StyledCardHeader>
							<CardBody>
								<div className="text-center">
									<LineChart 
										width= '600'
										height= '400'
										yLabel= "Profit"
										xLabel= "Year"
										data={[{	
												color: "steelblue", 
												points: [{x: 1, y: 2}, {x: 3, y: 3}, {x: 7, y: 1}] 
										}]}
									/>
								</div>	
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col className="md-6">
						<Card>
							<StyledCardHeader>
								<a className="text-muted pull-right fa fa-close"></a>
								<h3 className="box-title">Incomes by Category</h3>
							</StyledCardHeader>
							<CardBody>
								<div className="text-center">
									<DonutChart 
										width={300}
										height={200}
										data={[{
											label: 'Never gonna',
											value: 25
										},
										{
											label: 'Give you up',
											value: 75,
											isEmpty: true
										}]} 
									/>
								</div>	
							</CardBody>
						</Card>
					</Col>
					<Col className="md-6">
						<Card>
							<StyledCardHeader>
								<a className="text-muted pull-right fa fa-close"></a>
								<h3 className="box-title">Expenses by Category</h3>
							</StyledCardHeader>
							<CardBody>
								<div className="text-center">
									<DonutChart 
										width={300}
										height={200}
										data={[{
											label: 'Never gonna',
											value: 75
										},
										{
											label: 'Let you down',
											value: 25,
											isEmpty: true
										}]} 
									/>
								</div>	
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col className="md-4">
						<Card>
							<StyledCardHeader>
								<a className="text-muted pull-right fa fa-close"></a>
								<h3 className="box-title">Account Balance</h3>
							</StyledCardHeader>
							<CardBody>
								<Table className="table-striped">
									<tbody>
										<tr>
											<td className="text-left">Cash</td>
											<td className="text-right">$0.00</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
					<Col className="md-4">
						<Card>
							<StyledCardHeader>
								<a className="text-muted pull-right fa fa-close"></a>
								<h3 className="box-title">Latest Incomes</h3>
							</StyledCardHeader>
							<CardBody>
								<h5 className="text-center">No records.</h5>
							</CardBody>
						</Card>
					</Col>
					<Col className="md-4">
						<Card>
							<StyledCardHeader>
								<a className="text-muted pull-right fa fa-close"></a>
								<h3 className="box-title">Latest Expenses</h3>
							</StyledCardHeader>
							<CardBody>
								<h5 className="text-center">No records.</h5>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default MainIndex

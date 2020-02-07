import React, { Component } from 'react';
import { Doughnut, Line } from 'react-chartjs-2'
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
		const dataLine = {
			labels: [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
			datasets: [{
				data: [86,114,106,106,107,111,133,221,783,2478],
				label: "Africa",
				borderColor: "#3e95cd",
				fill: false
			}, { 
				data: [282,350,411,502,635,809,947,1402,3700,5267],
				label: "Asia",
				borderColor: "#8e5ea2",
				fill: false
			}, { 
				data: [168,170,178,190,203,276,408,547,675,734],
				label: "Europe",
				borderColor: "#3cba9f",
				fill: false
			}]
		};

		const data = {
			labels: ["America", "Asia", "Europe"],
			datasets: [{
				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
				data: [2478,5267,734]
			}]
		};

		const data2 = {
			labels: ["America","Asia","Europe"],
			datasets: [{
				backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
				data: [190,133,502]
			}]
		};
		
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
							<CardBody >
								<div className="text-center">
									<Line 
										data={dataLine}
										height={400}
										options={{ maintainAspectRatio: false}}
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
								<div style={{height:'200px', width:'300px'}}>
									<Doughnut 
										data={data}
										options={{ maintainAspectRatio: false}}
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
								<div className="text-center" style={{height:'200px', width:'300px'}}>
									<Doughnut 
										data={data2}
										options={{ maintainAspectRatio: false}}
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

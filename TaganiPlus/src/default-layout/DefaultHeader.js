import React, { Component } from 'react';
import {
	Nav,
	UncontrolledDropdown,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { AppSidebarToggler, AppAsideToggler } from '@coreui/react';

const propTypes = {
	children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
	state = {
		isOpen: false
	}

	handleLogout = (e) => {
		e.preventDefault()
	}

	toggle = () => {
		this.setState(prevState => ({
			isOpen: !prevState.dropdownOpen
		}))
	}

	render() {
		const { isOpen } = this.state
		// eslint-disable-next-line
		const { children } = this.props;
		return (
			<React.Fragment>
				<AppSidebarToggler className="d-lg-none" display="md" mobile />
				<a className="navbar-brand" href="#">
					<img src="https://www.canvasbackwine.com/assets/images/icon-acerage.svg" style={{ width: 80, height: 100 }} />
					
				</a>
				<Nav className="ml-auto custom-nav" navbar>
					<Dropdown isOpen={isOpen} toggle={this.toggle} style={{ margin: '0px 5px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}>
						<UncontrolledDropdown>
							<DropdownToggle caret style={{ background: 'transparent' }}>
								<i className="icon-user font-2xl"></i>
								<span>Lovely user</span>
							</DropdownToggle>
							<DropdownMenu right>
								<Link to="/account/profile">
									<DropdownItem>
										<i className="fa fa-user font-2xl"></i> <span>Profile</span>
									</DropdownItem>
								</Link>
								<Link to="/account/password">
									<DropdownItem>
										<i className="icon-settings font-2xl"></i> <span>Change Password</span>
									</DropdownItem>
								</Link>
								<DropdownItem divider style={{ margin: 0 }} />
								<DropdownItem onClick={this.handleLogout}>
								<i className="icon-paper-plane font-2xl"></i> <span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Dropdown>
				</Nav>
				<AppAsideToggler className="d-lg-none" mobile />
			</React.Fragment>
		);
	}
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;


export default DefaultHeader;
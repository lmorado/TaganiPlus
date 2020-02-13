import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';


import {
	AppAside,
	AppBreadcrumb,
	AppFooter,
	AppHeader,
	AppSidebar,
	AppSidebarFooter,
	AppSidebarForm,
	AppSidebarHeader,
	AppSidebarMinimizer,
	AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../nav/_nav';
// routes config
import routes from '../nav/routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import styled from 'styled-components'

class DefaultLayout extends Component {

	render() {
		return (
			<div className="app">
				<AppHeader fixed>
					<DefaultHeader />
				</AppHeader>
				<div className="app-body">
					<AppSidebar fixed display="lg" style={{ zIndex: 1049 }}>
						<AppSidebarHeader />
						<AppSidebarForm />
						<AppSidebarNav navConfig={navigation} {...this.props} />
						<AppSidebarFooter />
						<AppSidebarMinimizer />
					</AppSidebar>
					<main className="main">
						<AppBreadcrumb appRoutes={routes} />
						<Container fluid>
							<Switch>
								{routes.map((route, idx) => {
									return route.component ?

										<Route
											key={idx}
											path={route.path}
											exact={route.exact}
											name={route.name}
											render={props => (<route.component {...props} />)} />

										: null;
								},
								)}
								<Redirect from="/" to="/login" />
							</Switch>
						</Container>
					</main>
					<AppAside fixed>
						<DefaultAside />
					</AppAside>
				</div>
				<AppFooter>
					<DefaultFooter />
				</AppFooter>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	access: state.securityCode.user.access,
	userTypeId: state.securityCode.user.userTypeId
})

export default connect(mapStateToProps)(DefaultLayout)

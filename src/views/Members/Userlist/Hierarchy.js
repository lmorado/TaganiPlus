import React, { Component } from 'react'
import { connect } from 'react-redux';
import DataVisualization from '../../../components/DataVisualization'
import { getMemberHierarchy } from  '../../../actions/members/memberHierarchyAction'

class Hierarchy extends Component {

	get userId() {
		return this.props.match && this.props.match.params && this.props.match.params.userId
	}

	componentDidMount() {
		this.props.getMemberHierarchy(this.userId)
	}

	render() {
		return <DataVisualization data={this.props.hierarchy} user={this.userId}></DataVisualization>
	}
}

const mapStateToProps = state => ({
	hierarchy: state.membersHierarchy.hierarchy
})

const mapDispatchToProps = dispatch => ({
	getMemberHierarchy: (userId) => dispatch(getMemberHierarchy(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Hierarchy)


import React, {Component} from 'react'
import styled from 'styled-components'
import {Tracker, ProgressInTracker} from './styles'

class ProgressBar extends Component {
	
	percentageLimits = (min,value,max) => {
		return Math.min(Math.max(min,value), max);
	}

    render(){
        return (
			<div>
			<h5 style={{float:'left'}}>Progress: </h5>
			<Tracker>
				<ProgressInTracker percentage={this.percentageLimits(0, this.props.percentage, 100)}>
					<p>{this.props.percentage}%</p>
				</ProgressInTracker>
			</Tracker></div>
        )
    }
}

export default ProgressBar
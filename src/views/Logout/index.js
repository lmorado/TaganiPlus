import React from 'react'
import { connect } from 'react-redux'
import { doLogout } from '../../actions/auth'

class Logout extends React.Component {
    
    componentDidMount() {
        this.props.doLogout()
    }
    
    render() {
        return (
            <div>
                Logout...
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
	doLogout: () => dispatch(doLogout())
})

export default connect(null,mapDispatchToProps)(Logout)
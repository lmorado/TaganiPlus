import React, { Component } from 'react';
import { Nav, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }


  render() {
    const { activeTab } = this.state

    return (
      <React.Fragment>
        <Nav tabs>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className="p-3">
            <div className="aside-options" style={{ cursor: 'pointer' }}>
              <Link to="/account/profile">
                <div className="clearfix">
                  <i className="icon-user font-2xl"></i> <span>Profile</span>
                </div>
              </Link>
            </div>

            <div className="aside-options" style={{ cursor: 'pointer' }}>
              <Link to="/account/password">
                <div className="clearfix">
                  <i className="icon-settings font-2xl"></i> <span>Change Password</span>
                </div>
              </Link>
            </div>
            <hr style={{ margin: 0 }} />
            <div className="aside-options">
              <div className="clearfix" style={{ cursor: 'pointer' }}>
              <i className="icon-paper-plane font-2xl"></i> <span>Logout</span>
              </div>
            </div>
          </TabPane>

          <TabPane tabId="2" className="p-3">
            <h6>Account Settings</h6>

            <div className="aside-options" style={{ cursor: 'pointer' }}>
              <Link to="/account/profile">
                <div className="clearfix">
                  <i className="icon-user font-2xl"></i> <span>Profile</span>
                </div>
              </Link>
            </div>

            <div className="aside-options" style={{ cursor: 'pointer' }}>
              <Link to="/account/password">
                <div className="clearfix">
                  <i className="icon-settings font-2xl"></i> <span>Change Password</span>
                </div>
              </Link>
            </div>
            <hr style={{ margin: 0 }} />
            <div className="aside-options">
              <div className="clearfix" style={{ cursor: 'pointer' }}>
              <i className="icon-paper-plane font-2xl"></i> <span>Change Password</span>
              </div>
            </div>

          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}


DefaultAside.propTypes = propTypes
DefaultAside.defaultProps = defaultProps

export default DefaultAside

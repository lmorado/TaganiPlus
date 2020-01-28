import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const  DefaultFooter = () => {
    return (
      <React.Fragment>
        <span> Test Website 123 &copy; 2019.</span>
        <span className="ml-auto">Powered by Test Website 123</span>
      </React.Fragment>
    );
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const  DefaultFooter = () => {
    return (
      <React.Fragment>
        <span> Tagani Philippines &copy; 2020.</span>
        <span className="ml-auto">Powered by Tagani (Wordpress)</span>
      </React.Fragment>
    );
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;

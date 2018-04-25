import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.scss';

class Header extends Component {
    render() {
        return (
            <div className="global-header">
                <p>OMI Hackathon</p>
                <div className={'loader' + (this.props.visible ? ' show' : '')} />
            </div>
        );
    }
}

Header.propTypes = {
    visible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    visible: state.fetching.length > 0,
});

export default connect(mapStateToProps)(Header);

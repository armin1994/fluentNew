import React from "react";
import PropTypes from "prop-types";
import {Component} from "react";
import {connect} from "react-redux";

import {Menu, Icon} from 'antd';


class SignIn extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('signin', nextProps);
        if (!nextProps.error && nextProps.user) {
            console.log('User logged in with success');
        } else {
            console.log('User log in failed');
        }
    }


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        const isLogoUp = false;
        const twoFactorSecurity = false;
        return (
            <div className="landing-page">
                <div className="landing-page-header">
                    {isLogoUp ? (<div className="landing-page-logo">FAAS</div>) : (null)}
                    <Menu
                        onClick={this.handleClick}
                        mode="horizontal"
                    >
                        <Menu.Item key="Contact">
                            <Icon type="phone"/>Contact
                        </Menu.Item>
                        <Menu.Item key="FAQ">
                            <Icon type="question"/>FAQ
                        </Menu.Item>
                        <Menu.Item key="About">
                            <Icon type="bulb"/>About
                        </Menu.Item>
                    </Menu>
                </div>
                {!isLogoUp ? (
                    <div className="landing-page-slogan">
                        <p className="landing-page-slogan-inner-logo">FAAS</p>
                        <p>fluency as a service</p>
                    </div>
                ) : (null)}
                {/*{!twoFactorSecurity ? (*/}
                    {/*<Authentication {...this.props}/>*/}
                {/*) : (*/}
                    {/*<TwoFactorSecurity/>*/}
                {/*)}*/}
            </div>
        );
    }
}

SignIn.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        error: state.signIn.error || null,
        user: state.signIn.user || null,
        loading: state.signIn.loading || false
    };
};
const mapDispatchToProps = dispatch => ({
    login: dispatch.signIn.serverUpdate
})
;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);

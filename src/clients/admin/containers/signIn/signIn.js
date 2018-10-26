import React from "react";
import PropTypes from "prop-types";
import {Component} from "react";
import {connect} from "react-redux";
import {Menu, Icon, Row, Col, Form, Input, Button} from 'antd';
import {AuthenticationCard} from "fluent-components";

const FormItem = Form.Item;

class SignIn extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        twoFactorSecurity: false
    };

    componentWillReceiveProps(nextProps) {
        console.log('signin', nextProps);
        if (!nextProps.error && nextProps.user) {
            this.setState({
                twoFactorSecurity: true
            });
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

    handleLogin = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    }

    handleTwoFactor = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    }

    render() {
        const isLogoUp = false;
        const twoFactorSecurity = this.state.twoFactorSecurity;
        const {loading, form} = this.props;
        const {getFieldDecorator} = form;
        let header, body;
        if (!twoFactorSecurity) {
            header = (<Row type="flex" align="middle">
                <Col span={5}>
                    <div className="authentication-card-header-icon-login">
                        {loading ? (
                            <Icon type="loading" style={{fontSize: '24px', color: '#28b0ff', paddingTop: '3px'}}/>
                        ) : (
                            <Icon type="lock" theme="filled"
                                  style={{fontSize: '16px', color: '#28b0ff', paddingTop: '5px'}}/>
                        )}
                    </div>
                </Col>
                <Col span={19}>
                    <h3>Login</h3>
                </Col>
            </Row>);

            body = (<Form onSubmit={this.handleLogin} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}]
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <Row>
                    <Col span={12} style={{paddingTop: '7px'}}>
                        <a className="login-form-forgot" href="">Forgot password?</a>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Col>
                </Row>
            </Form>);
        }
        else {
            header = (
                <div>
                    <Row type="flex" align="middle">
                        <Col span={4} offset={10} style={{textAlign: '-webkit-center'}}>
                            <div className="authentication-card-header-icon-two-factor">
                                {loading ? (
                                    <Icon type="loading"
                                          style={{fontSize: '24px', color: '#28b0ff', paddingTop: '5px'}}/>
                                ) : (
                                    <Icon type="unlock" theme="filled"
                                          style={{fontSize: '24px', color: '#28b0ff', paddingTop: '5px'}}/>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" align="middle">
                        <Col span={14} offset={5} style={{textAlign: '-webkit-center'}}>
                            <h4>Two Factor Authentication</h4>
                            <p style={{fontSize: '10px'}}>please enter the code that was sent to your e-mail (or) phone
                                number</p>
                        </Col>
                    </Row>
                </div>
            );

            body = (<Form onSubmit={this.handleTwoFactor} className="login-form">
                <FormItem>
                    {getFieldDecorator('code', {
                        rules: [{required: true, message: 'Please input your Code!'}],
                        initialValue: ''
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="EX: 123456"/>
                    )}
                </FormItem>
                <Row>
                    <Col span={12} style={{paddingTop: '7px'}}>
                        <a className="login-form-forgot" href="">Resend Code</a>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Validate
                        </Button>
                    </Col>
                </Row>
            </Form>);
        }

        const authenticationProps = {
            header: header,
            body: body
        }

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

                <AuthenticationCard {...authenticationProps}/>

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

const WrappedLoginForm = Form.create()(SignIn);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLoginForm);

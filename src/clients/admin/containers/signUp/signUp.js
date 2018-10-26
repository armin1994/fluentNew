import React from "react";
import PropTypes from "prop-types";
import {Component} from "react";
import {connect} from "react-redux";
import {SignUpCard} from "fluent-components";
import {Link} from 'react-router-dom';

import {Row, Menu, Icon, Input, Button, Form} from 'antd';

const FormItem = Form.Item;

class SingnUpContainer extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        step: "landing"
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (!nextProps.error && nextProps.user) {
            this.props.updateState({
                error: null,
                user: null
            })
            this.setState({
                step: "confirm"
            });

            console.log('User register with success');

        } else {
            console.log('User register failed');
        }
    }


    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.register(values);
            }
        });
    }
    goToSignUpForm = () => {
        this.setState({step: "form"})
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let header, body, footer;
        const signUpForm = (
            <Form onSubmit={this.handleRegister} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirmPassword', {
                        rules: [{required: true, message: 'Please confrim your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Confirm password"/>
                    )}
                </FormItem>
                <Row>
                    <Button htmlType="submit" className="signup-card-button">
                        Sign up now
                    </Button>
                </Row>
            </Form>
        );
        const isLogoUp = true;
        const {step} = this.state;
        switch (step) {
            case "landing":
                header = 'Sign up';
                body = (
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                        <Button htmlType="button" className="signup-card-button" onClick={this.goToSignUpForm}>
                            Sign up now
                        </Button>
                    </div>
                );
                footer = (
                    <p>Already have an account? <Link to="/signin">Log in</Link></p>
                );
                break;
            case "form":
                header = 'Sign up';
                body = signUpForm;
                footer = (
                    <p>Already have an account? <Link to="/signin">Log in</Link></p>
                )
                break;
            case "confirm":
                header = "Confirm your email";
                body = (
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Consequat ac felis donec et odio pellentesque diam.</p>
                        <Button htmlType="button" className="signup-card-button" onClick={() => { this.props.history.push('/signin') }}>
                            Proceed
                        </Button>
                    </div>
                )
                footer = (
                    <p>Need some help? <Link to="/signin">FAQ</Link></p>
                );
                break;
        }

        const props = {
            header: header,
            body: body,
            footer: footer
        };
        return (
            <div className="landing-page-light">
                <div className="landing-page-light-header">
                    {isLogoUp ? (<div className="landing-page-light-logo">FAAS</div>) : (null)}
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
                    <div className="landing-page-light-slogan">
                        <p className="landing-page-light-slogan-inner-logo">FAAS</p>
                        <p>fluency as a service</p>
                    </div>
                ) : (null)}
                <SignUpCard {...props} />
            </div>
        );
    }
}

SingnUpContainer.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        error: state.signUp.error || null,
        user: state.signUp.user || null,
        loading: state.signUp.loading || false
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        register: dispatch.signUp.serverUpdate,
        updateState: dispatch.signUp.stateUpdate
    };
};

const WrappedRegisterForm = Form.create()(SingnUpContainer);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedRegisterForm);

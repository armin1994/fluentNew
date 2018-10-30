import React from "react";
import PropTypes from "prop-types";
import {Component} from "react";
import {connect} from "react-redux";
import {Menu, Icon, Row, Col, Form, Input, Button, Checkbox} from 'antd';
import InputRequired from "./components/inputTest/inputRequired";

const FormItem = Form.Item;

class Home extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err, values);
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 5 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 12 },
        //     },
        // };
        const usernameProps = {
            name: 'username',
            label: 'Username',
            placeholder: 'insert your username',
            type: 'text',
            required: true,
            // rules: [
            //     {
            //         min: 4,
            //         message: 'input must be at least 4 characters'
            //     }
            // ],
            ...this.props
        };
        const passwordProps = {
            name: 'password',
            label: 'Password',
            placeholder: 'insert your password',
            type: 'password',
            required: true,
            rules: [
                {
                    min: 4,
                    message: 'input must be at least 4 characters'
                }
            ],
            ...this.props
        };
        return (
            <div className="my-container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <InputRequired {...usernameProps} />
                    <InputRequired {...passwordProps}/>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

Home.contextTypes = {
    t: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => ({})
;

const WrappedLoginForm = Form.create()(Home);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedLoginForm);

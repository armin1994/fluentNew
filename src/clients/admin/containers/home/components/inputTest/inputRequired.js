import React, {PureComponent} from "react";
import {Icon, Form, Input} from 'antd';


const FormItem = Form.Item;

class InputRequired extends PureComponent {
    static defaultProps = {
        type: 'text',
        formItemProps: null,
        required: false,
        rules: [],
    };
    state = {
        isPasswordShown: false,
        rules: this.props.rules,
    };
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
        if(this.props.required){
            this.state.rules.push({
                required: true,
                message: (<b> <Icon type="close-circle" theme="filled"/> This field is required</b>),
            });
        }
    }

    togglePassword = () => {
        this.setState({
            isPasswordShown: !this.state.isPasswordShown
        })
    };


    render() {
        const {form, type, name, label, placeholder, formItemProps} = this.props;
        const { rules } = this.state;
        const {getFieldDecorator} = form;
        let suffix, passwordType;
        if (type === 'password') {
            if (this.state.isPasswordShown) {
                suffix = (<Icon type="eye" theme="filled" onClick={this.togglePassword}
                                style={{color: '#28b0ff'}} />);
                passwordType = 'text';
            }
            else {
                suffix = (<Icon type="eye" theme="filled" onClick={this.togglePassword} />);
                passwordType = 'password';
            }
        }
        return (
            type === 'text' ? (
                <FormItem
                    label={label}
                    hasFeedback
                    {...formItemProps}
                >
                    {getFieldDecorator(name, {
                        rules: rules
                    })(
                        <Input placeholder={placeholder}/>
                    )}
                </FormItem>
            ) : (
                <FormItem
                    label={label}
                >
                    {getFieldDecorator(name, {
                        rules: rules
                    })(
                        <Input placeholder={placeholder} type={passwordType} suffix={suffix}/>
                    )}
                </FormItem>
            )
        )
    }
}



export default InputRequired;

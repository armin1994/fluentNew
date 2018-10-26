import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';
// import './style.css';


/**
 * @render
 * @name SignUpCard
 * @description This is a generic authentication container.
 * @example
 * <AuthenticationCard
 *    header={(<div>Header</div>)}
 *    body={(<div>Body</div>)}
 * />
 */
class SignupCard extends PureComponent {
    static defaultProps = {
    };


    constructor(props) {
        super(props);
    }


    render() {
        const {header, body, footer} = this.props;
        return (
            <Row type="flex" justify="center" align="top">
                <Col span={6}>
                    <div className="signup-card-container">
                        <Row type="flex" justify="center" align="top">
                            <Col span={24}>
                                <div className="signup-card-header">
                                    <h1>{header}</h1>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" align="middle">
                            <Col span={24}>
                                <div className="signup-card-body">
                                    {body}
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" align="bottom">
                            <Col span={24}>
                                <div className="signup-card-footer">
                                    {footer}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}


export default SignupCard;

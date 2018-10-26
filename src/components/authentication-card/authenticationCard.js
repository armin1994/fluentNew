import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';
// import "./style.less";


/**
 * @render
 * @name AuthenticationCard
 * @description This is a generic authentication container.
 * @example
 * <AuthenticationCard
 *    header={(<div>Header</div>)}
 *    body={(<div>Body</div>)}
 * />
 */
class AuthenticationCard extends PureComponent {
  static defaultProps = {
  };


  constructor(props) {
    super(props);
  }


  render() {
    const {header, body} = this.props;
    return (
      <Row type="flex" justify="center" align="top">
        <Col span={6}>
          <div className="authentication-card-container">
            <Row type="flex" justify="center" align="top">
              <Col span={24}>
                <div className="authentication-card-header">
                  {header}
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <div className="authentication-card-body">
                  {body}
                </div>
              </Col>
            </Row>
            <Row type="flex" justify="center" align="bottom">
              <Col span={24}>
                <div className="authentication-card-footer">
                  <p>New User? <Link to="/signup">Create Account</Link></p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}


export default AuthenticationCard;

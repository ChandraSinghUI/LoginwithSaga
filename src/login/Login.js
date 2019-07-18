import React, { Component } from "react";
import {
  PageHeader,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loginAction } from "./login-store";
import { searchRoute } from "../navigation/route-constants";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      const { isLoading, error } = nextProps.login;
      if (!isLoading && (nextProps.login.data!=null)) {
        this.props.history.push(`/${searchRoute}`);
      }
    }
  }

  getValidationState = () => {
    const { username, password } = this.state;
    if (username && password) return "success";
    else return "error";
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  userLogin = e => {
    const { username, password } = this.state;
    this.props.loginAction({ username, password });
    e.preventDefault();
  };

  render() {
    console.log("Login.js:" + JSON.stringify(this.props.login));
    return (
      <div className="login" style={{marginTop:'5px'}}>
        <PageHeader className="text-center"> Login </PageHeader>
        
        <div className={this.props.login.error?"alert alert-danger":''} role="alert">
         {this.props.login.error }
        </div>

        <Form horizontal>
          <FormGroup controlId="formUsername">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={12}>
              <FormControl type="text" onChange={this.handleUsernameChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="form  Password">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={12}>
              <FormControl
                type="password"
                onChange={this.handlePasswordChange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col  sm={12} className="mt-5">
              <Button bsStyle="primary" type="submit" onClick={this.userLogin}>
                Login
              </Button>
            </Col>
          </FormGroup>
        </Form>

       
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

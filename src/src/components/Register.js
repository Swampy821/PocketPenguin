
import React, {Component} from "react";
import AuthStore from "./../stores/AuthStore";
import AuthActions from "./../actions/AuthActions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import HeaderBar from "./HeaderBar";
import FacebookLogin from 'react-facebook-login';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import reactDOM from 'react-dom';
import Serialize from 'form-serialize';
import Snackbar from 'material-ui/Snackbar';
import { browserHistory } from 'react-router';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
            errorOpen: false
        };
        this.authListener = this._authListener.bind(this);
    }
    componentDidMount() {
        AuthStore.listen(this.authListener);

    }


    componentWillUnmount () {
        AuthStore.unlisten(this.authListener);
    }

    _authListener(state) {
        console.log(state.auth);
        if (state.auth.error) {
            const body = state.auth.error.response.body;
            this.triggerError(body.message);
        }else{ 
            this.triggerError(`Welcome ${state.auth.Name}`);
            setTimeout(() => {
                browserHistory.push("/");
            }, 1000);
        }
    }

    goLogin(e) {
        e.preventDefault();
        const loginData = Serialize(e.target, { hash: true });
        if (
            !loginData.username || 
            !loginData.name ||
            !loginData.email ||
            !loginData.password ||
            !loginData.repeatpassword) {
            this.triggerError("All fields are required to register");
            return;
        }
        if (loginData.password !== loginData.repeatpassword) {
            this.triggerError("Passwords must match");
            return;
        }

        if (loginData.password.length < 5) {
            this.triggerError("Come on, at least make a password over 5 characters");
            return;
        }
        AuthActions.register(loginData);
    }

    triggerError(error) {
        this.setState({
            error,
            errorOpen: true
        });
    }

    handleRequestClose() {
        this.setState({
            errorOpen: false,
        });
    }
    render() {
        const style = {
            padding: "30px",
            paddingTop: "5px"
        };

        return (
            <div>
                <div className="stickier">
                    <HeaderBar />  
                </div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <form style={style} action='register' id='registerform' onSubmit={this.goLogin.bind(this)}>
                        <h1>Register</h1>
                        <TextField
                            name='username'
                            hintText="Username"
                            floatingLabelText="Username"
                            fullWidth={true}
                        /><br />
                        <TextField
                            name='name'
                            hintText="Your Name"
                            floatingLabelText="Name"
                            fullWidth={true}
                        /><br />
                        <TextField
                            name='email'
                            hintText="Email"
                            floatingLabelText="Email"
                            fullWidth={true}
                        /><br />
                        <TextField
                            name='password'
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            fullWidth={true}
                        /><br />
                        <TextField
                            name='repeatpassword'
                            hintText="Repeat Password"
                            floatingLabelText="Repeat Password"
                            type="password"
                            fullWidth={true}
                        /><br />
                        <br />
                        <RaisedButton type='submit' label="Register" fullWidth={true}/>
                    </form>
                   
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={muiTheme}>
                 <Snackbar
                        open={this.state.errorOpen}
                        message={this.state.error}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose.bind(this)}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}


export default Register;

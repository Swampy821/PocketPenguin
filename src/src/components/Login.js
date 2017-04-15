
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


class Login extends Component {
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
        if (state.auth.error) {
            this.triggerError("Invalid username or password");
        }else{ 
            this.triggerError(`Welcome ${state.auth.Name}`);
            setTimeout(() => {
                browserHistory.push("/");
            }, 200);
        }
    }

    responseFacebook(auth) {
        AuthActions.auth(auth);
        this.setState({
            open: false
        });
    }


    getFacebookButton() {
        return <FacebookLogin
            appId="433048977029860"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,email"
            callback={this.responseFacebook.bind(this)}
            />;
    }

    goLogin(e) {
        e.preventDefault();
        const loginData = Serialize(e.target, { hash: true });
        if (!loginData.username || !loginData.password) {
            this.triggerError("Both username and password are required");
            return;
        }
        AuthActions.login(loginData.username, loginData.password);
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
                    <form style={style} action='login' id='loginform' onSubmit={this.goLogin.bind(this)}>
                        <h1>Login</h1>
                        <TextField
                            name='username'
                            hintText="Username"
                            floatingLabelText="Username"
                            fullWidth={true}
                        /><br />
                        <TextField
                            name='password'
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            fullWidth={true}
                        /><br />
                        <br />
                        <RaisedButton type='submit' label="Login" fullWidth={true}/>
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


export default Login;

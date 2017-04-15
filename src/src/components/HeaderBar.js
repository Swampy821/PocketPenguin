
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './Extensions/AppBar';
import muiTheme from './../styles/style';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import TocIcon from 'material-ui/svg-icons/action/toc';
import EventIcon from 'material-ui/svg-icons/action/event';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import FaceIcon from 'material-ui/svg-icons/action/face';
import InputIcon from 'material-ui/svg-icons/action/input';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import { browserHistory } from 'react-router';
import alt from "../alt";
import FacebookLogin from 'react-facebook-login';
import AuthActions from "./../actions/AuthActions";
import AuthStore from "./../stores/AuthStore";


const style = {
    height: "15px"
};

class HeaderBar extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.authStoreListen = this._authStoreListen.bind(this)
    }
    componentDidMount() {
        AuthStore.listen(this.authStoreListen);
        this.setState(AuthStore.getState().auth);
    }
    componentWillUnmount() {
        AuthStore.unlisten(this.authStoreListen);
    }

    _authStoreListen(auth) {
        this.setState(auth.auth);
    }
    showProgramList() {
        browserHistory.push("/");
        this.closeMenu();
    }


    showParties() {
        browserHistory.push("/parties");
        this.closeMenu();
    }



    go() {
       this.setState({
           open: true
       });
    }

    closeMenu() {
        this.setState({
            open: false
        });
    }


    getTitle() {
        return this.props.title || "Pocket Penguin";
    }

    responseFacebook(auth) {
        AuthActions.auth(auth);
        this.setState({
            open: false
        });
    }


    getLogoutButton() {
        if(this.state.ID) {
            return <MenuItem
                primaryText="Logout"
                leftIcon={<ReplyIcon />}
                onClick={this.logout.bind(this)}
            />;
        }
    }
    getMyCalendar() {
        if(this.state.ID) {
            return <MenuItem 
                primaryText="Your Calendar" 
                leftIcon={<EventIcon />}
                onClick={this.showMyCalendar.bind(this)}
            />;
        }
    }

    showMyCalendar() {
        const ID = this.state.ID;
        browserHistory.push(`/calendar/${ID}`);
        this.closeMenu();

    }

    showLogin() {
        browserHistory.push(`/login`);
        this.closeMenu();
    }
    showRegister() {
        browserHistory.push(`/register`);
        this.closeMenu();
    }
    logout() {
        this.state = {
            open: false
        };
        AuthActions.logout();
    }

    getLogin() {
        if(!this.state.ID) {
            return <MenuItem 
                primaryText="Login"
                leftIcon={<FaceIcon />}
                onClick={this.showLogin.bind(this)}
            />
        }        
    }

    getRegister() {
        if(!this.state.ID) {
            return <MenuItem 
                primaryText="Register"
                leftIcon={<InputIcon />}
                onClick={this.showRegister.bind(this)}
            />
        }   
    }

    render() {
        return (
            <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <AppBar 
                    title={this.getTitle()}
                    onLeftIconButtonTouchTap={this.go.bind(this)}
                    imageLeft="https://pocketpenguin.party/assets/phone_go_gopher_80.png"
                    />
            </MuiThemeProvider>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Drawer open={this.state.open}>
                    <MenuItem 
                        primaryText="Close" 
                        leftIcon={<CloseIcon />}
                        onClick={this.closeMenu.bind(this)}
                    />
                    <MenuItem 
                        primaryText="Program List"
                        leftIcon={<TocIcon />}
                        onClick={this.showProgramList.bind(this)}
                    />
                    {this.getMyCalendar()}
                    <MenuItem 
                        primaryText="Room Parties"
                        leftIcon={<PeopleIcon />}
                        onClick={this.showParties.bind(this)}
                    />
                    {this.getLogin()}
                    {this.getRegister()}
                    {this.getLogoutButton()}
                </Drawer>
            </MuiThemeProvider>
            </div>
        );
    }
}


export default HeaderBar;


import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import muiTheme from './../styles/style';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import TocIcon from 'material-ui/svg-icons/action/toc';
import EventIcon from 'material-ui/svg-icons/action/event';
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
        injectTapEventPlugin();
        this.state = {
            open: false
        };
    }
    componentDidMount() {
        AuthStore.listen((auth) => {
            this.setState(auth.auth);
        });
        this.setState(AuthStore.getState().auth);
    }
    showProgramList() {
        browserHistory.push("/");
        this.close();
    }

    go() {
       this.setState({
           open: true
       });
    }

    close() {
        this.setState({
            open: false
        });
    }


    getTitle() {
        return "Pocket Penguin";
    }

    responseFacebook(auth) {
        AuthActions.auth(auth);
    }


    getFacebookButton() {
        if(!this.state.ID) {
            return <FacebookLogin
            appId="433048977029860"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,email"
            callback={this.responseFacebook.bind(this)}
            />;
        } else {
            return <MenuItem
                primaryText="Logout"
                onClick={this.logout.bind(this)}
            />;
        }
    }
    getMyCalendar() {
        if(this.state.ID) {
            return <MenuItem 
                primaryText="Your Calendar" 
                leftIcon={<EventIcon />}
            />;
        }
    }
    logout() {
        this.state = {
            open: false
        };
        AuthActions.logout();
    }


    render() {
        return (
            <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <AppBar 
                    title={this.getTitle()}
                    onLeftIconButtonTouchTap={this.go.bind(this)}
                    />
            </MuiThemeProvider>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Drawer open={this.state.open}>
                    <MenuItem 
                        primaryText="Close" 
                        leftIcon={<CloseIcon />}
                        onClick={this.close.bind(this)}
                    />
                    <MenuItem 
                        primaryText="Program List"
                        leftIcon={<TocIcon />}
                        onClick={this.showProgramList.bind(this)}
                    />
                    {this.getMyCalendar()}
                    {this.getFacebookButton()}
                </Drawer>
            </MuiThemeProvider>
            </div>
        );
    }
}


export default HeaderBar;

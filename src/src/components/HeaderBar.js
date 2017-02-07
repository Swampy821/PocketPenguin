
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

const style = {
    height: "15px"
};

class HeaderBar extends Component {
    constructor() {
        super();
        injectTapEventPlugin();
        this.state = {open: false};
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
    render() {
        return (
            <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <AppBar 
                    title="Penguicon Schedule"
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
                    <MenuItem 
                        primaryText="Your Calendar" 
                        leftIcon={<EventIcon />}
                    />
                </Drawer>
            </MuiThemeProvider>
            </div>
        );
    }
}


export default HeaderBar;

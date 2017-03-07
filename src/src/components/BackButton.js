


import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import FlatButton from "material-ui/FlatButton";
import BackIcon from "material-ui/svg-icons/hardware/keyboard-return";
import { browserHistory } from "react-router";

const buttonStyle = {
    width: "100%",
    marginTop: "4px"
};

class BackButton extends Component {
    constructor(props) {
        super(props);


    }
    
    onClick() {
        browserHistory.push(`/`);
    }

    render() {

           return (<MuiThemeProvider muiTheme={muiTheme}>
                    <FlatButton
                        style={buttonStyle}
                        onClick={this.onClick.bind(this)}
                        label="Back"
                        icon={<BackIcon />}
                        />
                </MuiThemeProvider>);


    }
}


export default BackButton;
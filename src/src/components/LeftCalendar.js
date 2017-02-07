require("./../styles/SideCalendar.css");

import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import Paper from "material-ui/Paper";

const style ={
    float: "left",
    width: "50px",
}


class LeftCalendar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
             <MuiThemeProvider muiTheme={muiTheme}>
                <div style={style} className="date">
                    <span className="day">Fri</span><br />
                    <span className="dayNumber">09</span>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default LeftCalendar;

require("./../styles/ProgramList.css");

import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import TimeSlot from "./TimeSlot";

class List extends Component {
    constructor(props) {
        super(props);
        this.style = {
            width: ""
        };
    }
    componentWillMount(){
        this.style.width = (screen.width-50) + "px";
    }
    render() {
        return (
            <div className="programList"  style={this.style}>
                
                <TimeSlot time="11:00 AM - 12:00 PM"/>
                



            </div>
        );
    }
}


export default List;

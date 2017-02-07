
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import LeftCalendar from "./LeftCalendar";
import List from "./List";

class ProgramList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="whiteBar"></div>
                <LeftCalendar />
                <List />
            </div>
        );
    }
}


export default ProgramList;


import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import RoomIcon from "material-ui/svg-icons/action/room";
import RSVPButton from "./RSVPButton";

const iconStyle = {
    height: "15px"
};


class Slot extends Component {
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
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot">
                    <div className="slot-title">
                        {this.props.title}
                    </div>
                    <div className="slot-description" style={this.style}>
                        <RoomIcon style={iconStyle}/> {this.props.location}
                        <div className="rsvp-button">
                            <RSVPButton rsvp={this.props.rsvp}/>
                        </div>
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }
}


export default Slot;

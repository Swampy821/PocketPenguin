
import React, {Component} from "react";
import ScheduleIcon from "material-ui/svg-icons/action/schedule";
import RoomIcon from "material-ui/svg-icons/action/room";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import moment from "moment";
import RSVPButton from "./../RSVPButton";

class DetailsHead extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {

    }
    formatTime(time) {
        return moment(time, "HH:mm").format("h:mm A");
    }
    getDay(dayNumber) {
        switch(dayNumber) {
            case 0: 
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3: 
                return "Wednesday";
            case 4: 
                return "Thusday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
    }

    render() {
        const fday = new Date(this.props.slot.Day);
        const dayString = this.getDay(fday.getDay());
        const roomIconStyle = {
            color: "#999999",
            marginBottom: "-6px"
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot-details">
                    <h3>{this.props.slot.Title}</h3>
                    <div className="slot-details-time">
                        <ScheduleIcon /> {dayString} from {this.formatTime(this.props.slot.Time)} - {this.formatTime(this.props.slot.EndTime)}
                    </div>
                    <div className="slot-details-room">
                        <RoomIcon style={roomIconStyle} /> {this.props.slot.Room}
                    </div>
                    <div className="slot-details-rsvp">
                        <RSVPButton show={false} rsvp={true} style={{width: "100%", marginTop: "5px"}}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default DetailsHead;

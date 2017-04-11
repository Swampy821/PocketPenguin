
import React, {Component} from "react";
import ScheduleIcon from "material-ui/svg-icons/action/schedule";
import RoomIcon from "material-ui/svg-icons/action/room";
import TrackIcon from "material-ui/svg-icons/image/collections-bookmark";
import PersonIcon from "material-ui/svg-icons/social/person";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../../styles/style";
import moment from "moment";
import RSVPButton from "./../RSVPButton";

const roomIconStyle = {
    color: "#999999",
    marginBottom: "-6px"
}

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
            case 6: 
                return "Sunday";
            case 0:
                return "Monday";
            case 1:
                return "Tuesday";
            case 2: 
                return "Wednesday";
            case 3: 
                return "Thusday";
            case 4:
                return "Friday";
            case 5:
                return "Saturday";
        }
    }


    getTrack() {
        if(this.props.slot.Topic) {
            return <span><TrackIcon style={roomIconStyle} /> {this.props.slot.Topic} <br /></span>;
        }
        
        return "";
        
    }


    getSpeaker() {
        if(this.props.slot.Presenter) {
            return <span><PersonIcon style={roomIconStyle} /> {this.props.slot.Presenter} <br /></span>;
        }
        
        return "";
        
    }


    render() {
        const fday = new Date(this.props.slot.Day);
        const dayString = this.getDay(fday.getDay());

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot-details">
                    <h3>{this.props.slot.Title}</h3>
                    <div className="slot-details-time">
                        <ScheduleIcon /> {dayString} from {this.formatTime(this.props.slot.Time)} - {this.formatTime(this.props.slot.EndTime)}
                    </div>
                    <div className="slot-details-room">
                        {this.getSpeaker()}
                        {this.getTrack()}
                        <RoomIcon style={roomIconStyle} /> {this.props.slot.Room}
                    </div>
                    {/*<div className="slot-details-rsvp">
                        <RSVPButton show={false} rsvp={true} style={{width: "100%", marginTop: "5px"}}/>
                    </div>*/}
                </div>
            </MuiThemeProvider>
        );
    }
}


export default DetailsHead;

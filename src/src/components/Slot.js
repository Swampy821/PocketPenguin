
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import RoomIcon from "material-ui/svg-icons/action/room";
import TrackIcon from "material-ui/svg-icons/image/collections-bookmark";
import PersonIcon from "material-ui/svg-icons/social/person";

import RSVPButton from "./RSVPButton";
import { browserHistory } from "react-router";
import moment from 'moment';

const iconStyle = {
    height: "15px"
};

const secondaryStyle = {
    color: "#999"
};

class Slot extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount(){

    }

    onClick(e) {
        if(e.target.className && e.target.className.indexOf("slot") > -1) {
            browserHistory.push(`/slot/${this.props.id}`);
            
        }
    }

    getSpeaker() {
        if (this.props.speaker) {
            return <span style={secondaryStyle}><PersonIcon style={iconStyle} /> {this.props.speaker}<br /></span>;
        }

        return "";
    }

    getTrack() {
        if(this.props.track) {
            return <span style={secondaryStyle}><TrackIcon style={iconStyle}/> {this.props.track}<br /></span>;
        }

        return "";
    }

    getDT() {
        const day = this.props.item.Day;
        const eDay = this.props.item.EndDay;
        const time = this.props.item.Time;
        const eTime = this.props.item.EndTime
        const startTime = parseInt(moment(`${day} ${time}`).format("x"));
        const endTime = parseInt(moment(`${eDay} ${eTime}`).format("x"));
        const ndate = new Date();
        const now = parseInt(moment(ndate).format("x"));
        if (
            now > startTime && 
            now < endTime
        ) {
            return true;
        }else{
            return false;
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot" onClick={this.onClick.bind(this)} style={{backgroundColor: this.getDT() ? "#fbffcc" : "#fff"}}> 
                    <div className="slot-title">
                        {this.props.title}
                    </div>
                    
                    <div className="slot-description">
                        {this.getSpeaker()}
                        {this.getTrack()}
                        <RoomIcon style={iconStyle}/> {this.props.location}
                        
                        {this.props.auth.ID === this.props.calID || this.props.calID === undefined ? 
                        <div className="rsvp-button">
                            <RSVPButton id={this.props.id} className="rsvpbuttonbutton"/>
                        </div> : ""}
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }
}


export default Slot;

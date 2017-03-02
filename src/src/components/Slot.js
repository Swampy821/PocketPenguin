
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import RoomIcon from "material-ui/svg-icons/action/room";
import TrackIcon from "material-ui/svg-icons/image/collections-bookmark";
import PersonIcon from "material-ui/svg-icons/social/person";

import RSVPButton from "./RSVPButton";
import { browserHistory } from "react-router";

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
        if(e.target.className.indexOf("slot") > -1) {
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

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot" onClick={this.onClick.bind(this)}> 
                    <div className="slot-title">
                        {this.props.title}
                    </div>
                    
                    <div className="slot-description">
                        {this.getSpeaker()}
                        {this.getTrack()}
                        <RoomIcon style={iconStyle}/> {this.props.location}
                        
                        {this.props.auth.ID === this.props.calID || this.props.calID === undefined ? 
                        <div className="rsvp-button">
                            <RSVPButton id={this.props.id}/>
                        </div> : ""}
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }
}


export default Slot;

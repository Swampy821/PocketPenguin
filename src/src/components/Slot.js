
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import RoomIcon from "material-ui/svg-icons/action/room";
import RSVPButton from "./RSVPButton";
import { browserHistory } from "react-router";

const iconStyle = {
    height: "15px"
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

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="slot" onClick={this.onClick.bind(this)}> 
                    <div className="slot-title">
                        {this.props.title}
                    </div>
                    
                    <div className="slot-description">
                        <RoomIcon style={iconStyle}/> {this.props.location}
                        

                        <div className="rsvp-button">
                            <RSVPButton id={this.props.id}/>
                        </div>
                    </div>


                </div>
            </MuiThemeProvider>
        );
    }
}


export default Slot;

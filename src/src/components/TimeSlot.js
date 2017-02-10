
import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import Slot from "./Slot";
import { StickyContainer, Sticky } from "react-sticky";
import moment from "moment";

const customStyleObject = {
    top: "170px",
    width: "100%",
    zIndex: 1,
    display: "block"
};

class TimeSlot extends Component {
    constructor(props) {
        super(props);
    }

    formatTime(time) {
        return moment(time, "HH:mm").format("h:mm A");
    }

    componentWillMount(){

    }
    render() {
        
        return (
                <div>
                    <sticky  stickyStyle={customStyleObject} topOffset={-170}>
                        <div className="timeslot">
                            <div className="time">
                                {this.formatTime(this.props.time)}
                            </div>
                        </div>
                    </sticky>
                    {
                        this.props.slots.map((item, index) => {
                            return (<Slot key={index} rsvp={true} title={item.Title} location={item.Room} time={this.formatTime(this.props.time)}/>)

                        })
                    }
                </div>
        );
    }
}


export default TimeSlot;


import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import Slot from "./Slot";

class TimeSlot extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.stuff = [
            1,2,3,4,5,6
        ];
    }
    render() {
        return (
            <div>
                <div className="timeslot">
                    <div className="time">
                        {this.props.time}
                    </div>
                </div>
                {
                    this.stuff.map((item) => {
                        return (<Slot rsvp={true} title="How to do a thing" location="Somewhere"/>)

                    })
                }
            </div>
        );
    }
}


export default TimeSlot;

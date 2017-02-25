
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
        this.state = {
            show: true
        };
    }

    formatTime(time) {
        return moment(time, "HH:mm").format("h:mm A");
    }

    componentWillMount(){

    }

    show() {
        const showing = this.props.slots.filter((item) => {
            return item.show;
        });
        return showing.length > 0;
    }


    render() {
        if(this.show()) {
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
                                if(item.show) {
                                    return (<Slot key={index} rsvp={true} id={item.id} title={item.Title} location={item.Room} time={this.formatTime(this.props.time)} calID={this.props.calID} auth={this.props.auth}/>)
                                }

                            })
                        }
                    </div>
            );
        } else {
            return <span />
        }
    }
}


export default TimeSlot;

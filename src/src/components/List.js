require("./../styles/ProgramList.css");

import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "./../styles/style";
import TimeSlot from "./TimeSlot";
import ScheduleStore from "./../stores/ScheduleStore"
import ScheduleActions from "./../actions/ScheduleActions"
import AuthStore from "./../stores/AuthStore"
import LeftCalendar from "./LeftCalendar";
import { StickyContainer, Sticky } from 'react-sticky';

class List extends Component {
    constructor(props) {
        super(props);
        this.style = {
            width: ""
        };

        this.state = {
            days: []
        }
    }
    componentWillMount(){
        // this.style.width = (screen.width-50) + "px";
        ScheduleStore.listen((days) => {
            this.buildIntoTimeslots(days.days.Days)
        });
        let auth = AuthStore.getState().auth;
        ScheduleActions.getScheduleByDay(auth);
    }

    buildIntoTimeslots(days) {
        days.forEach((day) => {
            let timeSlots = {};
            day.Slots.forEach((val) => {
                if( !timeSlots[val.Time] ) { timeSlots[val.Time] = []; }
                timeSlots[val.Time].push(val);
            })
            day.Slots = timeSlots
        });

        days.sort(function(a,b){
            return new Date(a.Day) - new Date(b.Day);
        });

        this.setState({
            days: days
        });
        
    }

    getDay(dayNumber) {
        switch(dayNumber) {
            case 0: 
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3: 
                return "Wed";
            case 4: 
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
        }
    }

    render() {
        const customStyleObject = {
            top: "90px",
            height: "50px",
            width: "100%",
            padding: "7px",
            backgroundColor: "white",
            zIndex: 0,
            borderBottom: "1px solid #ccc"
        };
        return (
            <div>
                <div className="programList">
                    <StickyContainer>
                        
                    { this.state.days.map((day) => {

                        let fday = new Date(day.Day);
                        let dayString = this.getDay(fday.getDay());
                        let dayNumber = fday.getDate();
                        if( dayNumber < 10) { dayNumber = "0" + dayNumber; }   

                        return (
                            <div>
                                <Sticky stickyStyle={customStyleObject} topOffset={-150}>
                                    <h2><b>{dayString}</b> {dayNumber}</h2>
                                </Sticky>
                                <StickyContainer>

                                {Object.keys(day.Slots).map((key) => {
                                    return <TimeSlot time={day.Slots[key][0].Time} slots={day.Slots[key]} id={day.Slots[key].id}/>
                                })}
                                </StickyContainer>
                            </div>
                        )
                    }) }
                    </StickyContainer>
                    
                </div>

            </div>
        );
    }
}


export default List;

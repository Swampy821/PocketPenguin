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
        ScheduleStore.listen((state) => {
            this.setState({days: state.days})
        });
        let auth = AuthStore.getState().auth;
        ScheduleActions.getScheduleByDay(auth);
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
    anyShowingInDay(day) {
        let show = false;
        Object.keys(day.Slots).forEach((index) => {
            day.Slots[index].forEach((item) => {
                if(item.show) {
                    show = true;
                }
            });
        });
        return show;
    }
    render() {
        const customStyleObject = {
            top: "90px",
            height: "50px",
            width: "100%",
            padding: "7px",
            backgroundColor: "white",
            zIndex: 2,
            borderBottom: "1px solid #ccc"
        };
        return (
            <div>
                <div className="programList">
                    <StickyContainer>
                        
                    { this.state.days.map((day) => {
                        if(this.anyShowingInDay(day)) {
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

                                    {Object.keys(day.Slots).map((key, index) => {
                                        return <TimeSlot key={key+index} time={day.Slots[key][0].Time} slots={day.Slots[key]} id={day.Slots[key].id}/>
                                    })}
                                    </StickyContainer>
                                </div>
                            )
                        }
                    }) }
                    </StickyContainer>
                    
                </div>

            </div>
        );
    }
}


export default List;

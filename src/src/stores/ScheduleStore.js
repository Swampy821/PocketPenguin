"use strict";


import alt  from "../alt";
import ScheduleActions from "../actions/ScheduleActions";


class ScheduleStore {
    constructor() {


        this.state = {
            days: []
        }
        this.bindListeners({
            handleScheduleUpdate: ScheduleActions.SCHEDULE_UPDATE,
            handleSearch: ScheduleActions.SEARCH
        });
    }

    buildIntoTimeslots(nDays) {
        nDays.forEach((day) => {
            let timeSlots = {};
            day.Slots.forEach((val) => {
                if( !timeSlots[val.Time] ) { timeSlots[val.Time] = []; }
                val.show = true;
                timeSlots[val.Time].push(val);
            })
            day.Slots = timeSlots
        });

        nDays.sort(function(a,b){
            return new Date(a.Day) - new Date(b.Day);
        });

        return nDays;
    }

    handleScheduleUpdate(schedule) {
        this.setState({
            days: this.buildIntoTimeslots(schedule.Days)
        });
    }

    handleSearch(val) {
        let sched = this.state.days;
        sched = sched.map((day) => {
            Object.keys(day.Slots).forEach((index) => {
                day.Slots[index] = day.Slots[index].map((slot) => {
                    if(
                        slot.Title.toLowerCase().indexOf(val.toLowerCase())>-1 ||
                        slot.Room.toLowerCase().indexOf(val.toLowerCase())>-1
                        
                    ) {
                        slot.show = true;
                    } else {
                        slot.show = false;
                    }
                    return slot;
                });
            });
            return day;
        });

        this.setState({
            days: sched
        });
        
    }
}

module.exports = alt.createStore(ScheduleStore, "ScheduleStore");
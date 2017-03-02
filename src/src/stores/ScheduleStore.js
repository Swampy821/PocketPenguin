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
            handleSearch: ScheduleActions.SEARCH,
            handleGetSlot: ScheduleActions.GET_SCHEDULE_SLOT,
            handleIdSchedule: ScheduleActions.SCHEDULE_ID_UPDATE
            
        });
    }

    componentWillMount() {
        let schedule = localStorage.getItem("scheduleState");
        try{
            schedule = JSON.stringify(schedule);
            this.setState(schedule);
        }catch(e){}
    }
    
    componentDidUpdate() {
        localStorage.setItem("scheduleState", JSON.stringify(this.state));
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

    buildIntoFlat(nDays) {
        let dayArray = [];
        nDays.forEach((day) => {
                Object.keys(day.Slots).forEach((index) => {
                day.Slots[index].forEach((val) => {
                    dayArray.push(val);
                });
            });
        });
        return dayArray;
    }


    handleGetSlot(id) {
        const filtered = this.state.flat.filter((item) => {
            if(item.id === id) {
                return true;
            }
            return false;
        });
        if(filtered.length === 1) {
            this.setState({[id]: filtered[0]});
        }
    }

    handleScheduleUpdate(schedule) {
        this.setState({
            days: this.buildIntoTimeslots(schedule.Days),
            flat: this.buildIntoFlat(schedule.Days)
        });
    }

    handleSearch(val) {
        let sched = this.state.days;
        sched = sched.map((day) => {
            Object.keys(day.Slots).forEach((index) => {
                day.Slots[index] = day.Slots[index].map((slot) => {
                    if(
                        slot.Title.toLowerCase().indexOf(val.toLowerCase())>-1 ||
                        slot.Room.toLowerCase().indexOf(val.toLowerCase())>-1 ||
                        slot.Presenter.toLowerCase().indexOf(val.toLowerCase())>-1 ||
                        slot.Topic.toLowerCase().indexOf(val.toLowerCase())>-1
                        
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
    handleIdSchedule({id, data}) {
        this.setState({
            [id]: data.body
        });
    }
}

module.exports = alt.createStore(ScheduleStore, "ScheduleStore");
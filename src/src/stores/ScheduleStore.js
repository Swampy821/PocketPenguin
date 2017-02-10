"use strict";


import alt  from "../alt";
import ScheduleActions from "../actions/ScheduleActions";


class ScheduleStore {
    constructor() {
        this.state = {
            days: []
        }
        this.bindListeners({
            handleScheduleUpdate: ScheduleActions.SCHEDULE_UPDATE
        });
    }
    handleScheduleUpdate(schedule) {
        this.setState({
            days: schedule
        });
    }
}

module.exports = alt.createStore(ScheduleStore, "ScheduleStore");
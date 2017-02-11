"use strict";

import alt from "../alt";
import api from "../api";


class ScheduleActions {
    getScheduleByDay(auth) {
        auth = auth || {}
        this.dispatch();



        api.get({
            url: "/schedule/day",
            jwt: auth.JWT,
            data: {}
        })
        .then( (data) => {
            this.actions.scheduleUpdate(data.body);
        });
    }


    scheduleUpdate(data) {
        this.dispatch(data);
    }


    search(val) {
        this.dispatch(val);
    }



}

module.exports = alt.createActions(ScheduleActions);
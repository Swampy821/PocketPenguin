"use strict";

import alt from "../alt";
import api from "../api";


class ScheduleActions {
    getScheduleByDay(auth) {
        auth = auth || {}
        api.get({
            url: "/schedule/day",
            jwt: auth.JWT,
            data: {}
        })
        .then( (data) => {
            this.actions.scheduleUpdate(data.body);
        });
    }

    getScheduleSlot(id) {
        setTimeout(() => {
            this.dispatch(id);
        })
    }

    scheduleUpdate(data) {
        this.dispatch(data);
    }


    search(val) {
        this.dispatch(val);
    }

    scheduleIdUpdate(id, data) {
        this.dispatch({
            id,
            data
        });
    }

    getScheduleById(id) {
        this.dispatch();
        api.get({
            url: `/schedule/${id}`
        })
        .then( (data) => {
            this.actions.scheduleIdUpdate(id, data);
        });
    }



}

module.exports = alt.createActions(ScheduleActions);
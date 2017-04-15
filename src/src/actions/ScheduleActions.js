"use strict";

import alt from "../alt";
import api from "../api";

class ScheduleActions {
    getScheduleByDay(auth) {
        auth = auth || {}
        const d = new Date();
        const hour = d.getHours();
        let savedData = localStorage.getItem(`scheduleByDay${hour}`);
        try{
            savedData = JSON.parse(savedData);
        }catch(e){}
        if(!savedData && savedData !== undefined) {
            api.get({
                url: "/schedule/day",
                jwt: auth.JWT,
                data: {}
            })
            .then( (data) => {
                if(data.text !== "") {
                    localStorage.clear();
                    localStorage.setItem(`scheduleByDay${hour}`, data.text);
                }
                this.actions.scheduleUpdate(data.body);
            });
        }else{
            setTimeout(() => {
                this.actions.scheduleUpdate(savedData);
            });
        }
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
"use strict";


import alt  from "../alt";
import AuthActions from "../actions/AuthActions";


class AuthStore {
    constructor() {
        let savedAuth = localStorage.getItem("auth");

        
        this.auth = {};
        if( savedAuth ) {
            this.auth = JSON.parse(savedAuth);
        }
        if( !this.auth.SavedSchedule ) {
            this.auth.SavedSchedule = [];
        }
        this.bindListeners({
            handleAuth: AuthActions.AUTH_UPDATE,
            handleLogout: AuthActions.LOGOUT,
            updateRSVP: AuthActions.UPDATE_RSVP
        });
    }

    _saveCache() {
        localStorage.setItem("auth", JSON.stringify(this.auth));
    }


    handleLogout() {
        this.auth = {};
        localStorage.removeItem("auth");
    }
    handleAuth(auth) {
        this.auth = auth;
        this.auth.SavedScheduleObj = {};
        this.auth.SavedSchedule.forEach((val) => {
            this.auth.SavedScheduleObj[val] = true;
        })
        this._saveCache();
    }

    updateRSVP(rsvpObj) {
        let list = this.auth.SavedSchedule;
        if(rsvpObj.add) {
            this.auth.SavedScheduleObj[rsvpObj.rsvp] = true;
        } else {
            delete this.auth.SavedScheduleObj[rsvpObj.rsvp];
        }
        this.auth.SavedSchedule = Object.keys(this.auth.SavedScheduleObj);
        this._saveCache();
    }

}

module.exports = alt.createStore(AuthStore, "AuthStore");
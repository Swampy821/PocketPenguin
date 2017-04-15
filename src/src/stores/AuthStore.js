"use strict";


import alt  from "../alt";
import AuthActions from "../actions/AuthActions";
import Cookie from 'react-cookie';

class AuthStore {
    constructor() {
        let savedAuth = Cookie.load("auth");

        
        this.auth = {};
        if( savedAuth ) {
            this.auth = savedAuth;
        }
        if( !this.auth.SavedSchedule ) {
            this.auth.SavedSchedule = [];
        }
        this.bindListeners({
            handleAuth: AuthActions.AUTH_UPDATE,
            handleAuthFailed: AuthActions.AUTH_FAILED,
            handleLogout: AuthActions.LOGOUT,
            updateRSVP: AuthActions.UPDATE_RSVP
        });
    }

    _saveCache() {
        Cookie.save('auth', JSON.stringify(this.auth), { path: '/' });
    }

    handleAuthFailed(err) {
        this.auth = {
            error: err
        };
    }
    handleLogout() {
        this.auth = {};
        Cookie.remove("auth", { path: "/"});
    }
    handleAuth(auth) {
        this.auth = auth;
        this.auth.SavedScheduleObj = {};
        if(this.auth.SavedSchedule !== null) {
            this.auth.SavedSchedule.forEach((val) => {
                this.auth.SavedScheduleObj[val] = true;
            })
        }
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
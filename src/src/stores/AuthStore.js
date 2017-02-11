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
        localStorege.removeItem("auth");
    }
    handleAuth(auth) {
        this.auth = auth;
        this._saveCache();
    }

    updateRSVP(rsvp) {
        let list = this.auth.SavedSchedule;
        let filtered = false;
        list = list.filter((val) => {
            if(val === rsvp) {
                filtered = true;
                return false;
            }
            return true;
        });
        if(!filtered) {
            list.push(rsvp);
        }
        this.auth.SavedSchedule = list;
        this._saveCache();
    }

}

module.exports = alt.createStore(AuthStore, "AuthStore");
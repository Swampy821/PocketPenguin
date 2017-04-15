"use strict";

import alt from "../alt";
import api from "../api";

class AuthActions {


    auth(auth) {
        this.dispatch();

        api.post({
            url: "/auth",
            data: auth
        })
        .then( (data) => {
            this.actions.authUpdate(data.body);
        });
    }
    register(options) {
        this.dispatch();

        api.post({
            url: "/auth/register",
            data: options
        })
            .then((data) => {
                console.log(data.body);
                this.actions.authUpdate(data.body);
            })
            .catch((err) => {
                this.actions.authFailed(err);
            });
    }
    login(username, password) {
        this.dispatch();
        
        api.post({
            url: "/auth/login",
            data: {
                username,
                password
            }
        })
            .then((data) => {
                this.actions.authUpdate(data.body);
            })
            .catch((err) => {
                this.actions.authFailed(err);
            })
    }
    authFailed(err) {
        this.dispatch(err);
    }
    logout() {
        this.dispatch();
    }

    authUpdate(auth) {
        this.dispatch(auth);
    }

   
    updateRSVP(rsvp, jwt, add) {
        this.dispatch({rsvp, add});
        api.post({
            url: "/rsvp",
            jwt,
            data: rsvp
        })
        .then((data) => {
            this.dispatch({rsvp, add});
        });
    }

}

module.exports = alt.createActions(AuthActions);
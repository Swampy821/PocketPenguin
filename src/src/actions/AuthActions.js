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
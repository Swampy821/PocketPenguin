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
}

module.exports = alt.createActions(AuthActions);
"use strict";


import alt  from "../alt";
import AuthActions from "../actions/AuthActions";


class AuthStore {
    constructor() {
        this.auth = {};

        this.bindListeners({
            handleAuth: AuthActions.AUTH_UPDATE,
            handleLogout: AuthActions.LOGOUT
        });
    }
    handleLogout() {
        this.auth = {};
    }
    handleAuth(auth) {
        this.auth = auth;
    }
}

module.exports = alt.createStore(AuthStore, "AuthStore");
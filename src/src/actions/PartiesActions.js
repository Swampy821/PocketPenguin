"use strict";

import alt from "../alt";
import api from "../api";

class PartiesActions {

    getParties() {
        this.dispatch();
        api.get({
            url: "/parties"
        })
        .then((data) => {
            this.actions.partiesSuccess(data);
        })
        .catch((err) => {
            this.actions.partiesError(err);
        })
    }

    partiesSuccess(data) {
        let parties = Object.keys(data.body).map(function (key) { return data.body[key]; });
        this.dispatch({parties: parties});
    }

    partiesError(err) {
        this.dispatch(err);
    }


    starParty(id) {
        api.post({
            url: "/parties/star",
            data: {
                id: id
            }
        })
        .then((data) => {
            this.actions.partiesSuccess(data);
        })
    }


    search(val) {
        this.dispatch(val);
    }
}

module.exports = alt.createActions(PartiesActions);
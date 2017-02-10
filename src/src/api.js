"use strict";

import request from "superagent";


class API {
    constructor() {

        this._url = "/api";

    }

    get(params) {
        return new Promise((resolve, reject) => {
            request
                .get(this.makeUrl(params.url))
                .set("X-Requested-With", "XMLHttpRequest")
                .set("Authorization", "bearer "+params.jwt)
                .query(params.data)
                .end( (err, res) => {
                    err ? reject(err) : resolve(res);
                });
        });
    }

    post(params) {
        return new Promise((resolve, reject) => {
            request
                .post(this.makeUrl(params.url))
                .set("X-Requested-With", "XMLHttpRequest")
                .set("Authorization", "bearer "+params.jwt)
                .send(params.data)
                .end( (err, res) => {
                    err ? reject(err) : resolve(res);
                });
        });
    }

     makeUrl(part) {
        if(part.indexOf(this._url) > -1){
            return part;
        }
        return this._url + part;
    }

}



export default new API();
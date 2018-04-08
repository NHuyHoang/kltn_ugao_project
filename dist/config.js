"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    db_uri: "mongodb://admin:kltn_ugao@cluster0-shard-00-00-ac3by.mongodb.net:27017/ugao_db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
    local_db_uri: "mongodb://localhost:27017/ugao_db",
    token_secret: "kltn_ugao"
};

exports.default = config;
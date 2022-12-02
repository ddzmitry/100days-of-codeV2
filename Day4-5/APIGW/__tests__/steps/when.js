"use strict";
const _ = require("lodash");
const Promise = this.Promise || require("promise");
const agent = require("superagent-promise")(require("superagent"), Promise);

const makeHttpRequest = async (path, method, options) => {
  let root = process.env.TEST_ROOT;
  let url = options.noteId
    ? `${root}/${path}/${parseInt(options.noteId)}`
    : `${root}/${path}`;

  console.log("options",options);
  console.log("url",url)
    
  let httpReq = agent(method, url);
  let body = _.get(options, "body");
  let idToken = _.get(options, "idToken");
  console.log(`invoking HTTP ${method} ${url}`);
  try {
    httpReq.set("Authorization", idToken);
    if (body) {
      httpReq.send(body);
    }
    let response = await httpReq;
    return {
      statusCode: response.status,
      body: response.body,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      body: null,
    };
  }
};

const we_invoke_createNote = async (options) => {
  let response = await makeHttpRequest("notes", "POST", options);
  return response;
};
const we_invoke_updateNote = async (options) => {
  let response = await makeHttpRequest("notes", "PUT", options);
  return response;
};

const we_invoke_deleteNote = async (options) => {
    let response = await makeHttpRequest("notes", "DELETE", options);
    return response;
}

module.exports = {
  we_invoke_createNote,
  we_invoke_updateNote,
  we_invoke_deleteNote
};

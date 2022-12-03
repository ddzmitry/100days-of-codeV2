"use strict";
let init = require("./steps/init");
let { an_authenticated_user } = require("./steps/given");
let {
  we_invoke_createNote,
  we_invoke_updateNote,
  we_invoke_deleteNote,
} = require("./steps/when");
let idToken;
let noteId = Math.round(Math.random() * 100000);
describe("Given an authenticated user", () => {
  beforeAll(async () => {
    init();
    let user = await an_authenticated_user();
    console.log("user", user);
    idToken = user.AuthenticationResult.IdToken;
    console.log("idToken", idToken);
  });

  describe("When we invoke POST /notes endpoint ", () => {
    it("Should create a new note", async () => {
      const body = {
        id: `1000`,
        title: "My Test Note",
        body: "Hello This is Note Body",
      };
      let result = await we_invoke_createNote({ idToken, body });
      expect(result.statusCode).toEqual(201);
      expect(result.body).not.toBeNull();
    });
  });

  describe("When we invoke POST /notes/:id endpoint ", () => {
    it("Should update the note", async () => {
      const noteId = "1000";
      const body = {
        title: "My Test Note UPDATED",
        body: "Hello This is Note Body UPDATED",
      };
      let result = await we_invoke_updateNote({ idToken, body, noteId });
      console.log(result);
      expect(result.statusCode).toEqual(200);
      expect(result.body).not.toBeNull();
    });
  });

  describe("When we invoke DELETE /notes/:id endpoint ", () => {
    it("Should delete the note", async () => {
      const noteId = "1000";
      let result = await we_invoke_deleteNote({ idToken, noteId });
      console.log("result",result)
      expect(result.statusCode).toEqual(200);
    });
  });
});

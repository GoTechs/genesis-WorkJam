import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import homePage from "./index";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import actions from "./store/action";
import fetchMock from "fetch-mock";
import * as actionsType from "../../store/actions/actionType";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
const middlewares = [thunk];
const mockeStore = configureMockStore(middlewares);

describe("___________Home Page____________", () => {
  //   afterEach(() => {
  //     fetchMock.restore();
  //   });
  //   it("Fetch all users info ", ()=> {
  //       fetchMock.getOnce()
  //   })
});

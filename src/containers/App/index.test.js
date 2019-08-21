import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "./index";

describe("___________App____________", () => {
  it("render without crashing given the rerequired Props", () => {
    const props = {
      dispatch: jest.fn(),
      loading: true
    };
    // const wrapper = shallow(<App debug />);
    // expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import ProtectRoute from "./index";
import LoginForm from "../LoginForm";

describe("testing the <ProtectRoute/>", () => {
  it("should return the component only if the user exist", () => {
    const ConditionalComponent = ProtectRoute(LoginForm);
    let wrapper = shallow(<ConditionalComponent userExist={true} />);

    expect(wrapper.html()).not.toBe(null);
  });
});

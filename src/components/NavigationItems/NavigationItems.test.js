import React from "react";

import { shallow } from "enzyme";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

describe("test <NavigationItems/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("it should return the list of the navigationn items ", () => {
    let wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(0);
  });
});

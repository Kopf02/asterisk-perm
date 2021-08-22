import set from "../src/set";

describe.skip("Set permissions to obj", () => {
  it("save new true value to obj", () => {
    set("test2", true, {test: true});
  });
  it("save new false value to obj", () => {
    set("test2", false, {test: true});
  });
  it("save new nested true value to obj", () => {
    set("test2.test3", true, {test: true});
  });
  it("save new nested true value to obj", () => {
    set("test2.test3", false, {test: true});
  });
})

/**
 * helpers
 */
import i18next from "i18next";
const helpers = {
  redirect(path, self) {
    self.props.history.push(path);
  },
  showPopUp(options) {
    const toastOptions = {
      timeOut: 5000,
      id: options.id,
      type: options.type,
      title: options.title,
      position: "top-right",
      attention: true,
      message: i18next.t(options.key),
      options: {}
    };
    return toastOptions;
  }
};

export default helpers;

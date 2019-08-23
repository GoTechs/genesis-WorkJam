/**
 * All the Components that we want to render in the routing
 */

import Login from "../containers/LoginContainer";
import Register from "../containers/RegisterContainer";
import ForgetPassword from "../components/ForgetPassword";
import HomePage from "../containers/HomePage";
import NotFoundPage from "../Common/NotFoundPage";
import DisplayMessage from "../components/DisplayMessage";
import EmailAuthPage from "../components/EmailAuthPage";
import ResetPassword from "../components/ResetPassword";
import Help from "../containers/HelpPageContainer";
import EmailValidation from "../components/EmailValidation";

export default () => ({
  login: Login,
  register: Register,
  forgetPassword: ForgetPassword,
  homePage: HomePage,
  emailAuthPage: EmailAuthPage,
  displayMessage: DisplayMessage,
  notFoundPage: NotFoundPage,
  resetPassword: ResetPassword,
  help: Help,
  emailValidation: EmailValidation
});

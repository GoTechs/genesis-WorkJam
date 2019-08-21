/**
 * All the Components that we want to render in the routing
 */

import Login from "../containers/LoginContainer";
import Register from "../containers/RegisterContainer";
import ForgetPassword from "../components/ForgetPassword";
import WristbandAuth from "../Common/WristbandAuth";
import HomePage from "../containers/HomePage";
import NotFoundPage from "../Common/NotFoundPage";
import DisplayMessage from "../components/DisplayMessage";
import EmailAuthPage from "../components/EmailAuthPage";
import ResetPassword from "../components/ResetPassword";
import Wallet from "../containers/WalletContainer";
import Ticket from "../containers/TicketsContainer";
import LoyaltyProgram from "../components/Loyaltyprogram";
import Help from "../containers/HelpPageContainer";
import EmailValidation from "../components/EmailValidation";
import ActivateWristbandContainer from "../containers/activateWristbandContainer";

export default () => ({
  login: Login,
  register: Register,
  forgetPassword: ForgetPassword,
  wristbandAuth: WristbandAuth,
  homePage: HomePage,
  emailAuthPage: EmailAuthPage,
  displayMessage: DisplayMessage,
  notFoundPage: NotFoundPage,
  resetPassword: ResetPassword,
  loyaltyProgram: LoyaltyProgram,
  ticket: Ticket,
  wallet: Wallet,
  help: Help,
  emailValidation: EmailValidation,
  activateWristband: ActivateWristbandContainer
});

import { Trans, withNamespaces } from "react-i18next";

const popUp = props => {
  const t = {
    id: "mycustomid", // If not provided we will add one.
    type: "success",
    title: "your title",
    position: "top-left", // This will override the global props position.
    attention: true, // This will add a shadow like the confirm method.
    onAttentionClick: id => {}, //override default behavior of 'attention' background click.
    message: "login success",
    options: {}
  };
  return t;
};

export default withNamespaces("translation")(popUp);

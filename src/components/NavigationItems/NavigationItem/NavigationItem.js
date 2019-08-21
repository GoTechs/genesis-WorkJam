import React from "react";
import { NavLink } from "react-router-dom";

import styles from './styles.sass';

const navigationItem = props => (
  <li className={styles.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      className={props.class}
      activeClassName="active"
      onClick={props.handleToggle}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;

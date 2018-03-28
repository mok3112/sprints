/**
 * @author mok3112
 * Created: 3/28/18
 */

import React from "react";
import {
    LoginButton
} from "../Buttons/index";

import "./index.css";

/**
 * Defines the persistent header that exists over every page.
 * Tabs to relocate back to the start page, log in, and sign up, as well as
 * view information about the app.
 */
const Header = () =>
      <div className="topnav header">
        <a href="#" className="header-item app-title">My App</a>
        <a className="active header-item" href="#">About</a>
        <span>
            <div>
                <LoginButton />
            </div>
        </span>
        <a href="#signup" className="header-item">Sign Up</a>
      </div>;

export default Header;

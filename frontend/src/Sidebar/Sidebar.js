/**
 * @author mok3112
 * Created: 3/22/18
 */

import React from "react";
import "./index.css";

/**
 * Persistent sidebar, links to search through tasks, see user statistics, and
 * view custom goals per user.
 */
const Sidebar = () =>
  <div className="sidebar">
    <div className="sidebar-item">
      <input type="text" placeholder="Search"/>
    </div>
    <div className="sidebar-item">
      <a href="#" className="sidebar-link">Filter</a>
    </div>
    <div className="sidebar-item">
      <a href="#" className="sidebar-link">Stats</a>
    </div>
    <div className="sidebar-item">
      <a href="#" className="sidebar-link">My Goals</a>
    </div>
  </div>;

export default Sidebar;
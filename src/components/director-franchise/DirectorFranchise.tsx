import React from 'react'
import './DirectorFranchise.less';
import LayoutMainView from "../layouts/Layout";
import {Sidebar} from "./layouts/sidebar/Sidebar";
import {Navbar} from "./layouts/navbar/Navbar";
import {Route} from "react-router";
import Home from "./home/Home";

const DirectorFranchise = () => {
    return <LayoutMainView sidebar={Sidebar()} navbar={Navbar()}>
        <Route exact path="/" component={Home}/>
    </LayoutMainView>;
};

export default DirectorFranchise;
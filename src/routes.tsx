import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";

const Routes = () => (
	<BrowserRouter>
		<Route component={Home} path="/" exact />
		<Route component={ChatRoom} path="/:room_id" />
	</BrowserRouter>
);

export default Routes;

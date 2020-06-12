import React from "react";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
	const { room_id } = useParams();
	return <h1>{room_id}</h1>;
};

export default ChatRoom;

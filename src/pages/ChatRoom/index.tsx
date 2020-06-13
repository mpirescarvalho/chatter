import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";

import NotFound from "../../components/NotFound";

import api from "../../services/api";

interface Message {
	sender_id: string;
	message: string;
}

interface Room {
	id: String;
	name: String;
	people: {
		id: String;
		nickname: String;
	}[];
}

// const room: Room = {
// 	id: "1",
// 	name: "Avenger's Room",
// 	people: [
// 		{
// 			id: "1",
// 			nickname: "Marcelo",
// 		},
// 		{
// 			id: "2",
// 			nickname: "João",
// 		},
// 		{
// 			id: "3",
// 			nickname: "Maria",
// 		},
// 	],
// };

//TODO: Implementar loading spinner
const ChatRoom = () => {
	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState<Room>();
	const [nickname, setNickname] = useState<String | undefined>();

	const { room_id } = useParams();
	const { search } = useLocation();

	useEffect(() => {
		const match = search.match(/nickname=(.+)/);
		let nick;
		if (match) nick = match[1];
		else nick = prompt("Type your nickname");
		if (nick) setNickname(nick);
	}, [search]);

	useEffect(() => {
		if (room_id) {
			api
				.get(`/rooms/${room_id}`)
				.then((response) => {
					console.log(response.data);
					setRoom(response.data);
					setLoading(false);
				})
				.catch((_) => setLoading(false));
		}
	}, [room_id]);

	// useEffect(() => {
	// 	const socket = io("http://localhost:4001");

	// 	if (nickname) {
	// 		socket.on(`${room_id}-info`, (room_info: Room) => {
	// 			setRoom(room_info);
	// 			setLoading(false);
	// 		});
	// 		socket.emit(`${room_id}-enter_room`, nickname);
	// 	}

	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, [room_id, nickname]);

	if (loading) return <h1>Loading...</h1>;

	if (!room || !nickname) return <NotFound />;

	return <h1>abc: {room.name}</h1>;
};

export default ChatRoom;

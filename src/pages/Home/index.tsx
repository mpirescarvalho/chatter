import React, { useEffect, useState, FormEvent } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import Rooms from "../../components/Rooms";

import api from "../../services/api";

const StyledHome = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

interface FieldProps {
	inline?: boolean;
	error?: boolean;
}

const Field = styled.div<FieldProps>`
	display: ${(props) => (props.inline ? "inline" : "block")};
	flex: 1 1 auto;

	label {
		display: block;
		font-size: 14px;
	}

	input {
		color: #3c3c3c;
		padding: 8px;
		flex: 1 1 auto;
		width: 100%;
		border: 1px solid ${(props) => (props.error ? "#f44336" : "#ddd")};
		border-radius: 5px;
	}
`;

const Title = styled.div`
	padding: 10px 0;
	margin-bottom: 30px;
`;

const Fieldset = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: flex-end;
`;

const SubmitButton = styled.button`
	margin-left: 10px;
	padding: 8px 20px;
	border: 1px solid #34cb79;
	border-radius: 5px;
	background-color: #34cb79;
	color: white;
`;

interface Room {
	id: String;
	name: String;
	people: {
		id: String;
		nickname: String;
	}[];
}

// const rooms: Room[] = [
// 	{
// 		id: "1",
// 		name: "Room 1",
// 		people: [
// 			{
// 				id: "1",
// 				nickname: "Marcelo",
// 			},
// 			{
// 				id: "2",
// 				nickname: "João",
// 			},
// 		],
// 	},
// 	{
// 		id: "2",
// 		name: "Room 2",
// 		people: [
// 			{
// 				id: "3",
// 				nickname: "Marcos",
// 			},
// 		],
// 	},
// ];

const Home = () => {
	const [rooms, setRooms] = useState<Room[]>([]);

	const [errors, setErrors] = useState<{ nickname: boolean; roomName: boolean }>(
		{
			nickname: false,
			roomName: false,
		}
	);

	const [nickname, setNickname] = useState("");
	const [roomName, setRoomName] = useState("");

	const history = useHistory();

	useEffect(() => {
		api.get("/rooms").then((response) => setRooms(response.data));
	}, []);

	useEffect(() => {
		const socket = io("https://chatter-backend-server.herokuapp.com");
		socket.on("rooms_changed", setRooms);
		return () => {
			socket.disconnect();
		};
	}, []);

	//Remove error hints from inputs after 2 seconds
	useEffect(() => {
		const id = setTimeout(() => {
			setErrors({ nickname: false, roomName: false });
		}, 2000);
		return () => clearTimeout(id);
	}, [errors]);

	function handleRoomClick(room: Room) {
		if (!nickname) {
			setErrors({ ...errors, nickname: true });
			return;
		}
		history.push({
			pathname: `/${room.id}`,
			state: `nickname=${nickname}`,
		});
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		if (!nickname) {
			setErrors({ ...errors, nickname: true });
			return;
		}

		if (!roomName) {
			setErrors({ ...errors, roomName: true });
			return;
		}

		api.post("/rooms", { name: roomName }).then((res) => {
			const { room_id } = res.data;
			if (room_id) {
				history.push({
					pathname: `/${room_id}`,
					state: `nickname=${nickname}`,
				});
			}
		});
	}

	return (
		<StyledHome>
			<Container>
				<div>
					<Title>
						<h1>Join a room, or create your own.</h1>
					</Title>
					<Field error={errors.nickname}>
						<label htmlFor="name">Nickname</label>
						<input
							type="text"
							name="nickname"
							id="nickname"
							maxLength={20}
							value={nickname}
							onChange={(event) => setNickname(event.target.value)}
						/>
					</Field>
					<Rooms data={rooms} onItemClick={handleRoomClick} />
					<form onSubmit={handleSubmit}>
						<Fieldset>
							<Field inline error={errors.roomName}>
								<label htmlFor="room_name">Room name</label>
								<input
									type="text"
									name="room_name"
									id="room_name"
									maxLength={20}
									value={roomName}
									onChange={(event) => setRoomName(event.target.value)}
								/>
							</Field>
							<SubmitButton type="submit">
								<strong>Create Room</strong>
							</SubmitButton>
						</Fieldset>
					</form>
				</div>
			</Container>
		</StyledHome>
	);
};

export default Home;

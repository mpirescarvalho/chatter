import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import styled from "styled-components";
// import io from "socket.io-client";

import NotFound from "../../components/NotFound";

import api from "../../services/api";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
	width: 1200px;
	height: 600px;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
`;

const TitleBar = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	flex: 0 1 auto;
	font-size: 15px;
	color: #151515;
	border-bottom: 1px solid #ddd;

	span {
		color: #34cb79;
		padding: 0 10px;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 17px;
		transition: all 0.5s;
		margin-right: 5px;

		:hover {
			background-color: #ddd;
		}
	}
`;

const RoomBox = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: row;
`;

const PeopleContainer = styled.ul`
	height: 100%;
	flex: 0 1 220px;
`;

const Person = styled.li`
	width: 100%;
	height: 60px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	font-size: 13px;
	border-bottom: 1px solid #ddd;
`;

interface CircleProps {
	color: string;
}

const Circle = styled.div<CircleProps>`
	border-radius: 200px;
	height: 35px;
	width: 35px;
	margin: 0 15px;
	background-color: ${(props) => props.color};
`;

const Chat = styled.div`
	height: 100%;
	flex: 1 1 auto;
	background-color: #ddd;
	display: flex;
	flex-direction: column;
`;

const ContainerMessages = styled.ul`
	width: 100%;
	flex: 1 1 auto;
	padding: 0 15px;
	padding-bottom: 5px;
	display: flex;
	flex-direction: column-reverse;
`;

interface ContainerMessageProps {
	owner: boolean;
}

const ContainerMessage = styled.li<ContainerMessageProps>`
	width: 100%;
	list-style-type: none;
	display: flex;
	flex-direction: row;
	margin-top: 30px;
	justify-content: ${(props) => (props.owner ? "flex-end" : "flex-start")};
`;

interface MessageSenderProps {
	color: string;
}

const MessageBox = styled.div`
	background-color: #fff;
	max-width: 350px;
	border-radius: 8px;
	overflow-x: hidden;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
`;

const MessageSender = styled.div<MessageSenderProps>`
	color: ${(props) => props.color};
	border-bottom: 1px solid #ddd;
	margin-bottom: 5px;
`;

const MessageContent = styled.div`
	font-size: 13px;
`;

const ContainerInput = styled.form`
	width: 100%;
	flex: 0 1 60px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 15px;
`;

const Input = styled.input`
	flex: 1 1 auto;
	height: 100%;
	padding: 0 15px;
	border-top-left-radius: 100px;
	border-bottom-left-radius: 100px;
	border: 1px solid #34cb79;
	font-size: 12px;
`;

const Submit = styled.button`
	flex: 0 1 50px;
	height: 100%;
	border-top-right-radius: 100px;
	border-bottom-right-radius: 100px;
	border: none;
	background-color: #34cb79;
	color: #fff;
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 7px;
	transition: all 0.5s;

	:hover {
		background-color: #fff;
		color: #34cb79;
		border: 1px solid #34cb79;
		border-left: none;
	}
`;

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

const colors = [
	"#EB5757",
	"#F2994A",
	"#F2C94C",
	"#219653",
	"#2F80ED",
	"#9B51E0",
	"#795548",
	"#607d8b",
];

interface IHash {
	[key: string]: any;
}

//TODO: Implementar loading spinner
const ChatRoom = () => {
	const [loading, setLoading] = useState(true);
	const [room, setRoom] = useState<Room>();
	const [nickname, setNickname] = useState<String | undefined>();
	const [peopleColors, setPeopleColors] = useState<IHash>({});
	const [messages, setMessages] = useState<Message[]>([]);

	const { room_id } = useParams();
	const { search } = useLocation();

	//TODO: get id from server
	const myID = "1";

	useEffect(() => {
		if (room) {
			let _peopleColors: IHash = {};
			room.people.forEach(
				(person) =>
					(_peopleColors[`${person.id}`] =
						colors[Math.floor(Math.random() * colors.length)])
			);
			setPeopleColors(_peopleColors);
		} else {
			setPeopleColors({});
		}
	}, [room]);

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

	function getSenderNicknameByID(id: string) {
		if (room) {
			const _person = room.people.find((pers) => pers.id === id);
			if (_person) return _person.nickname;
		}
	}

	if (loading) return <h1>Loading...</h1>;

	if (!room || !nickname) return <NotFound />;

	return (
		<Container>
			<Box>
				<TitleBar>
					<span>
						<FiArrowLeft />
					</span>
					<strong>{room.name}</strong>
				</TitleBar>
				<RoomBox>
					<PeopleContainer>
						{room.people.map((person, index) => (
							<Person key={index}>
								<Circle color={peopleColors[`${person.id}`]} />
								<span>{person.nickname}</span>
							</Person>
						))}
					</PeopleContainer>
					<Chat>
						<ContainerMessages>
							{messages.map((message) => (
								<ContainerMessage owner={message.sender_id === myID}>
									<MessageBox>
										<MessageSender color={peopleColors[`${message.sender_id}`]}>
											<strong>{getSenderNicknameByID(message.sender_id)}</strong>
										</MessageSender>
										<MessageContent>{message.message}</MessageContent>
									</MessageBox>
								</ContainerMessage>
							))}
						</ContainerMessages>
						<ContainerInput>
							<Input />
							<Submit type="submit">
								<FiSend />
							</Submit>
						</ContainerInput>
					</Chat>
				</RoomBox>
			</Box>
		</Container>
	);
};

export default ChatRoom;

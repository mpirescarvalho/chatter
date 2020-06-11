import React from "react";
import styled from "styled-components";

import Rooms from "../../components/Rooms";

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
		border: 1px solid #ddd;
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

const rooms: Room[] = [
	{
		id: "1",
		name: "Room 1",
		people: [
			{
				id: "1",
				nickname: "Marcelo",
			},
			{
				id: "2",
				nickname: "João",
			},
		],
	},
	{
		id: "2",
		name: "Room 2",
		people: [
			{
				id: "3",
				nickname: "Marcos",
			},
		],
	},
];

const Home = () => {
	function handleRoomClick(room: Room) {
		console.log(room);
	}

	return (
		<StyledHome>
			<Container>
				<div>
					<Title>
						<h1>Join a room, or create your own.</h1>
					</Title>
					<Field>
						<label htmlFor="name">Nickname</label>
						<input type="text" name="nickname" id="nickname" maxLength={20} />
					</Field>
					<Rooms data={rooms} onItemClick={handleRoomClick} />
					<form onSubmit={() => {}}>
						<Fieldset>
							<Field inline>
								<label htmlFor="room_name">Room name</label>
								<input type="text" name="room_name" id="room_name" maxLength={20} />
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

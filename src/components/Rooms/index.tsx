import React from "react";
import styled from "styled-components";

interface Room {
	id: String;
	name: String;
	people: {
		id: String;
		nickname: String;
	}[];
}

interface RoomParams {
	data: Room[];
	onItemClick: (room: Room) => void;
}

const Container = styled.div`
	width: 100%;
	background-color: #fff;
	height: 300px;
	margin-top: 8px;
	margin-bottom: 8px;
	border: 1px solid #ddd;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	font-size: 12px;
`;

const Item = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 12px 14px;
	border-bottom: 1px solid #ddd;
	transition: all 0.5s;
	&.first-child {
		color: #6c6c80;
	}
	&.last-child {
		color: #151515;
	}
	:hover {
		background-color: #ddd;
	}
`;

const NoItems = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #6c6c80;
	font-size: 22px;
`;

const Rooms: React.FC<RoomParams> = ({ data, onItemClick }) => {
	return (
		<div>
			<Container>
				{data.length > 0 ? (
					data.map((room, index) => (
						<Item key={index} onClick={() => onItemClick(room)}>
							<strong>{room.name}</strong>
							<span>{`${room.people.length} Online`}</span>
						</Item>
					))
				) : (
					<NoItems>
						<strong>No rooms created yet.</strong>
					</NoItems>
				)}
			</Container>
		</div>
	);
};

export default Rooms;

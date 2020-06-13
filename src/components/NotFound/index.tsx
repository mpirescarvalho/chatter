import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	color: #6c6c80;
	font-size: 144px;
	padding: 20px 0;
`;

const Text = styled.p`
	color: #6c6c80;
	font-size: 36px;
`;

const NotFound = () => (
	<Container>
		<Title>
			<strong>404</strong>
		</Title>
		<Text>
			<strong>Room not found</strong>
		</Text>
	</Container>
);

export default NotFound;

import React, { useEffect, useState } from 'react';
import '../App.css';

import {
	Row,
	Col,
	Container,
	Jumbotron,
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
} from 'reactstrap';
import axios from 'axios';

const WelcomeTron = () => {
	const [Me, setMe] = useState({});
	const [url, seturl] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:4000/user')
			.then((res) => {
				setMe(res.data);
				res.data.img.forEach((element) => {
					seturl(element.url);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<Jumbotron fluid className="slide-in-top" style={{ textAlign: 'center' }}>
				<div>
					<Container>
						<Card>
							<Row>
								<Col md={4}>
									<CardImg
										top
										style={{
											width: '100%',
											height: 'auto',
											objectFit: 'contain',
										}}
										src={url}
										alt="Profile Picture"
									/>
								</Col>
								<Col md={8} style={{ textAlign: 'center' }}>
									<CardBody>
										<CardTitle>
											<h1 style={{ marginBottom: '3%' }}>
												Welcome, {Me.name}!
											</h1>
										</CardTitle>
										<Row></Row>
										<CardText>
											View your top songs and artists and add to your playlists!
										</CardText>
										<Button href="https://www.spotify.com/logout/">
											Logout
										</Button>
									</CardBody>
								</Col>
							</Row>
						</Card>
					</Container>
				</div>

				{/* <h1 style={{ marginBottom: '3%' }}>Hello, {Name}!</h1> */}
			</Jumbotron>
		</div>
	);
};

export default WelcomeTron;

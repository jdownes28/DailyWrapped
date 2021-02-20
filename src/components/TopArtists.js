import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';

const TopArtists = (props) => {
	const [playlists, setplaylists] = useState([]);
	let count = 0;

	useEffect(() => {
		axios
			.get('http://localhost:4000/topArtists', {
				params: {
					time_range: props.time_range,
				},
			})
			.then((res) => {
				setplaylists(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.time_range]);

	return (
		<div>
			<Container>
				<div style={{ height: '80vh', overflow: 'scroll' }}>
					{playlists.slice(0, props.limit).map((info) => {
						count += 1;
						return (
							<div key={info.id}>
								<Card>
									<CardBody>
										<CardTitle>
											{count}. {info.name}
										</CardTitle>
									</CardBody>
								</Card>
								<br></br>
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
};

export default TopArtists;

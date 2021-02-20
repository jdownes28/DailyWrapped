import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button,
	Form,
	FormGroup,
	Input,
	Container,
} from 'reactstrap';

const TopTracks = (props) => {
	const [tracks, settracks] = useState([]);
	let count = 0;

	const [playlists, setplaylists] = useState([]);
	const [chosenPlaylist, setchosenPlaylist] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:4000/topTracks', {
				params: {
					time_range: props.time_range,
				},
			})
			.then((res) => {
				settracks(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [props.time_range]);

	useEffect(() => {
		axios
			.get('http://localhost:4000/playlists')
			.then((res) => {
				setplaylists(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [chosenPlaylist]);

	const addToPlaylist = async () => {
		let uris = [];
		let playlist_id = chosenPlaylist;
		tracks.slice(0, props.limit).forEach((element) => {
			uris.push(element.uri);
		});
		console.log('uris', uris);
		console.log(playlist_id);
		await axios
			.post('http://localhost:4000/addToPlaylist', {
				uris: uris,
				playlist_id: playlist_id,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Container>
				<div style={{ height: '80vh', overflow: 'scroll' }}>
					{tracks.slice(0, props.limit).map((track) => {
						count += 1;
						return (
							<div key={track.id}>
								<Card className={'cards'}>
									{/* <CardImg top width="25%" src={info.image} alt="Card image cap" /> */}
									<CardBody>
										<CardTitle>
											{count}. Track: {track.name}
										</CardTitle>
										<CardSubtitle>Album: {track.album}</CardSubtitle>
										<CardSubtitle>
											Artist:{' '}
											{track.artist.map((element) => {
												return element.name + ' ';
											})}
										</CardSubtitle>
									</CardBody>
								</Card>
								<br></br>
							</div>
						);
					})}
				</div>
				<h2>Add these songs to a playlist</h2>
				<Form>
					<FormGroup>
						<Input
							type="select"
							name="select"
							id="select"
							placeholder="Select Playlist"
							onChange={(e) => setchosenPlaylist(e.target.value)}
						>
							{playlists.map((playlist) => {
								return (
									<option key={playlist.id} value={playlist.id}>
										{playlist.name}
									</option>
								);
							})}
						</Input>
					</FormGroup>
					<Button onClick={(e) => addToPlaylist()}>Add</Button>
				</Form>
				<br></br>
			</Container>
		</div>
	);
};

export default TopTracks;

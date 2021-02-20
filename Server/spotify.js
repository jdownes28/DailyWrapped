var express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//Set varible API_PORT to 4000
const API_PORT = 4000;
//Set express to variable app
const app = express();
app.use(cors());

//Let express use bodyParser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const SpotifyWebApi = require('spotify-web-api-node');

var spofityApi = new SpotifyWebApi({
	clientId: '69a2f499879041758e98f771ded21375',
	clientSecret: '18486c216b1d44319ac7266cc13ffcf8',
	redirectUri: 'http://localhost:4000/callback',
});

let scopes = [
	'user-read-private',
	'user-read-email',
	'playlist-modify-public',
	'playlist-modify-private',
	'user-library-read',
	'user-top-read',
];

app.get('/login', async (req, res) => {
	var html = spofityApi.createAuthorizeURL(scopes);
	res.redirect(html);
	return res.send(html + '&show_dialog=true');
});

app.get('/callback', async (req, res) => {
	const { code } = req.query;
	try {
		var data = await spofityApi.authorizationCodeGrant(code);
		const { access_token, refresh_token } = data.body;
		spofityApi.setAccessToken(access_token);
		spofityApi.setRefreshToken(refresh_token);
		return res.redirect('http://localhost:3000/homepage');
	} catch (err) {
		return res.redirect('/#/error/invalid token');
	}
});

app.get('/playlists', async (req, res) => {
	let arra = [];
	await superagent
		.get('https://api.spotify.com/v1/me/playlists')
		.set('Authorization', 'Bearer ' + spofityApi.getAccessToken())
		.query({ limit: '50' })
		.then((res) => {
			res.body.items.forEach((element) => {
				arra.push({ name: element.name, id: element.id });
			});
		})
		.catch((err) => {
			console.log(err);
		});

	return res.json(arra);
});

app.post('/addToPlaylist', async (req, res) => {
	let playlist_id = req.body.playlist_id;
	spofityApi
		.addTracksToPlaylist(playlist_id, req.body.uris)
		.then(function (data) {
			console.log(data);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/topTracks', async (req, res) => {
	let time_range = req.query.time_range;

	let arr = [];

	await superagent
		.get('https://api.spotify.com/v1/me/top/tracks')
		.set('Authorization', 'Bearer ' + spofityApi.getAccessToken())
		.query({ limit: '50' })
		.query({ time_range: time_range })
		.query({ offset: '0' })
		.then((res) => {
			res.body.items.forEach((element) => {
				arr.push({
					id: element.id,
					name: element.name,
					album: element.album.name,
					image: element.album.images,
					artist: element.artists,
					uri: element.uri,
				});
			});
			return res.body;
		})
		.catch((err) => {
			console.log(err);
		});
	return res.json(arr);
});

app.get('/topArtists', async (req, res) => {
	let time_range = req.query.time_range;
	let arr = [];
	await superagent
		.get('https://api.spotify.com/v1/me/top/artists')
		.set('Authorization', 'Bearer ' + spofityApi.getAccessToken())
		.query({ limit: '50' })
		.query({ time_range: time_range })
		.query({ offset: '0' })
		.then((res) => {
			res.body.items.forEach((element) => {
				arr.push({
					id: element.id,
					name: element.name,
				});
			});
			return res.body;
		})
		.catch((err) => {
			console.log(err);
		});
	return res.json(arr);
});

app.get('/user', async (req, res) => {
	let currentUser = '';
	let image = [];
	await spofityApi
		.getMe()
		.then((res) => {
			currentUser = res.body.display_name;
			image = res.body.images;
		})
		.catch((err) => {
			console.log(err);
		});
	return res.json({ name: currentUser, img: image });
});

app.listen(API_PORT, () => console.log('Listening on port ', API_PORT));

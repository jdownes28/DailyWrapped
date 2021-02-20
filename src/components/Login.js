import React, { useEffect } from 'react';
import './LoginStyle.css';
import logo from '../spotify-logo-png-7053.png';
const Login = () => {
	useEffect(() => {
		document.title = 'Login';
	});

	const animate = () => {
		document.getElementById('title').classList.add('showTitle');
	};

	return (
		<div className={'wrapper'}>
			<h1 id={'title'} className={'title'}>
				CLICK TO LOG IN
			</h1>
			<a onMouseOver={() => animate()} href="http://localhost:4000/login">
				<img src={logo} className={'pic'} alt="hello"></img>
			</a>
		</div>
	);
};

export default Login;

import React, { useEffect, useState } from 'react';
import { Container, FormGroup, Form, Row, Col, Label, Input } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../App.css';

import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import WelcomeTron from './WelcomeTron';

const Homepage = (props) => {
	useEffect(() => {
		document.title = 'Wrapped';
	});

	const [time_range, settime_range] = useState('short_term');
	const [limit, setlimit] = useState(20);

	return (
		<div>
			<WelcomeTron />
			<Container className="slide-in-bottom">
				<Form>
					<h3>Filter</h3>
					<Row>
						<Col md={6}>
							<FormGroup>
								<Label style={{ fontWeight: 'bold' }} for="exampleSelect">
									Time Range
								</Label>
								<Input
									type="select"
									name="select"
									id="select"
									onChange={(e) => settime_range(e.target.value)}
								>
									<option value="short_term">Short Term</option>
									<option value="medium_term">Medium Term</option>
									<option value="long_term">Long Term</option>
								</Input>
							</FormGroup>
						</Col>
						<Col md={6}>
							<FormGroup>
								<Label style={{ fontWeight: 'bold' }} for="exampleCustomRange">
									Limit: {limit} (Max 50)
								</Label>
								<Input
									type="range"
									id="exampleCustomRange"
									name="customRange"
									min="1"
									max="50"
									defaultValue="20"
									onChange={(e) => setlimit(e.target.value)}
								/>
							</FormGroup>
						</Col>
					</Row>
					<p>
						Time Range: Short (4 Weeks), Medium (6 Months) or Long Term (Years)
					</p>
					<p>Limit: Number of results, no more than 50 avaliable</p>
				</Form>
				<br></br>
				<Tabs>
					<TabList>
						<Tab
							style={{
								width: '50%',
								textAlign: 'center',
							}}
						>
							Most Played Songs
						</Tab>
						<Tab
							style={{
								width: '50%',
								textAlign: 'center',
							}}
						>
							Most Played Arists
						</Tab>
					</TabList>

					<TabPanel style={{ textAlign: 'center' }}>
						<TopTracks time_range={time_range} limit={limit} />
					</TabPanel>
					<TabPanel style={{ textAlign: 'center' }}>
						<TopArtists time_range={time_range} limit={limit} />
					</TabPanel>
				</Tabs>
			</Container>
		</div>
	);
};

export default Homepage;

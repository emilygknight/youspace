import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/utils/mutations.js";

import Auth from "../../utils/auth";

import { Box, Typography, TextField, Button, Alert } from "@mui/material";

const Signup = () => {
	const [formState, setFormState] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [addUser, { error, data }] = useMutation(CREATE_USER);
	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);

		try {
			const { data } = await addUser({
				variables: { ...formState },
			});

			console.log("TEST", data);
			Auth.login(data.createUser.token);
			navigate("/dashboard");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Box
			component="main"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				p: 4,
			}}
		>
			<Box
				sx={{
					width: { xs: "100%", sm: "75%", md: "50%", lg: "40%" },
					p: 3,
					boxShadow: 3,
					borderRadius: 2,
					bgcolor: "background.paper",
				}}
			>
				<Typography variant="h4" component="h1" sx={{ mb: 3 }}>
					Sign Up
				</Typography>
				{data ? (
					<Typography variant="body1">
						Success! Redirecting you  <Link to="/dashboard">back to the <span className="text-pink-400">homepage</span>.</Link>
					</Typography>
				) : (
					<Box
						component="form"
						onSubmit={handleFormSubmit}
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}
					>
						<TextField
							label="Your username"
							name="username"
							type="text"
							value={formState.username}
							onChange={handleChange}
							fullWidth
							variant="outlined"
						/>
						{/*<TextField*/}
						{/*	label="Your birthdate"*/}
						{/*	name="birthdate"*/}
						{/*	type="date"*/}
						{/*	value={formState.birthdate}*/}
						{/*	onChange={handleChange}*/}
						{/*	fullWidth*/}
						{/*	variant="outlined"*/}
						{/*	InputLabelProps={{*/}
						{/*		shrink: true,*/}
						{/*	}}*/}
						{/*/>*/}
						<TextField
							label="Your email"
							name="email"
							type="email"
							value={formState.email}
							onChange={handleChange}
							fullWidth
							variant="outlined"
						/>
						<TextField
							label="******"
							name="password"
							type="password"
							value={formState.password}
							onChange={handleChange}
							fullWidth
							variant="outlined"
						/>
						<Button variant="contained" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600" type="submit" fullWidth>
							Submit
						</Button>
					</Box>
				)}

				{error && (
					<Alert severity="error" sx={{ mt: 2 }}>
						{error.message}
					</Alert>
				)}
			</Box>
		</Box>
	);
};

export default Signup;

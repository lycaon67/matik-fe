import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import { useSelector, useDispatch } from 'react-redux'


import {
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon
} from '@mui/icons-material';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {  Formik, Form, Field , FieldArray  } from 'formik';
import RoomField from '../../admin/module/component/RoomField'
import { addHome } from '../dashboard/service'
const steps = [
	"Create a home",
	"Add Room",
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));


export default function Addhome({ open, handleClose }) {
	
	const dispatch = useDispatch()
	const [initVal, setInitVal] = React.useState({
		name: null,
		address: null,
		rooms: []
	})

    const roomIcons = [
        {value: 0, label: <KitchenIcon sx={{height: 28}}/>},
        {value: 1, label: <ChairIcon sx={{height: 28}}/>},
        {value: 2, label: <SingleBedIcon sx={{height: 28}}/>},
        {value: 3, label: <BusinessIcon sx={{height: 28}}/>},
        {value: 4, label: <GarageIcon sx={{height: 28}}/>},
    ]

	function handleSave(data) {
		dispatch(addHome(data))
			.then((res) => {
				console.log("[home] add success");
			})
			.catch((err) => {
				console.log("[home] add failed", err);
			})
	}

	return (
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
				Add Home
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>

			<Formik
				enableReinitialize
				initialValues={initVal}
				validate={(values) => {
					const errors = {};
					if (!values.name) {
						errors.name = "This Field is Required";
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						setSubmitting(false);
						handleSave(values);
						handleClose()
					}, 400);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit}>
						<DialogContent dividers>
							<Box sx={{ width: "463px", minHeight: "255px" }}>
								<>
									<FormControl fullWidth>
										<Typography
											gutterBottom
											sx={{
												fontFamily: "inherit",
												fontSize: "14px",
												color: "#101840",
												textAlign: "left",
												fontWeight: 500,
												marginTop: 2,
											}}
										>
											{"Home Name"}
										</Typography>
										<OutlinedInput
											id="name"
											placeholder="Home Name"
											sx={{
												width: "-webkit-fill-available",
											}}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
											error={errors?.name}
										/>
										<FormHelperText error={errors?.name}>
											{touched.name && errors?.name}
										</FormHelperText>
									</FormControl>
									<FormControl fullWidth>
										<Typography
											gutterBottom
											sx={{
												fontFamily: "inherit",
												fontSize: "14px",
												color: "#101840",
												textAlign: "left",
												fontWeight: 500,
												marginTop: 2,
											}}
										>
											{"Address"}
										</Typography>
										<OutlinedInput
											id="address"
											placeholder="Address"
											sx={{
												width: "-webkit-fill-available",
											}}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.address}
											error={errors?.address}
										/>
										<FormHelperText error={errors?.address}>
											{touched.address && errors?.address}
										</FormHelperText>
									</FormControl>
								</>
							</Box>
						</DialogContent>
						<DialogActions dividers>
							<Button type="submit">Save</Button>
						</DialogActions>
					</form>
				)}
			</Formik>
		</BootstrapDialog>
	);
}

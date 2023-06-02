import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Stack,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import {
  useCreateDriverMutation,
  useGetAllDriversQuery,
} from "../../redux/features/apiSlice";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "5px",
  overflow: "hidden",
  overflowY: 'scroll',
  maxHeight: '85%'
};

const buttonStyle = { margin: "2rem", backgroundColor: "#233044" };


const headerStyles = {
  width: "100%",
  backgroundColor: "#233044",
  color: "#eeeeee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "10px 7px 10px 7px",
  fontWeight: 'bold',
  position: "sticky",
  top: 0,
  overflow: 'hidden'
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem"
}

const StyledTextField = {
  margin: "1rem",
  width: "300px",
};

const DriversPage = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const { data, isLoading, refetch } = useGetAllDriversQuery();

  const [createDriver] = useCreateDriverMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    createDriver(data)
      .unwrap()
      .then((res) => {
        reset();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err)
        toast.error(err?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      });
  };

  useEffect(()=> {
    refetch()
  }, [])

  return (
    <div>
      <Stack spacing={50} direction="row" style={{display: 'flex', justifyContent:'space-between'}}>
        <Typography fontSize={30} style={{fontWeight:'bolder'}} >
          Driver Information
        </Typography>
        <Button onClick={handleOpen} variant="contained">
          Add a new Driver
        </Button>
      </Stack>
      <TableContainer sx={{ minWidth: 600 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Licence Number</TableCell>
              <TableCell align="right">Licence expiry</TableCell>
              <TableCell align="right">Motocycle Maker</TableCell>
              <TableCell align="right">Motocycle Model</TableCell>
              <TableCell align="right">Motocycle Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              data?.data?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row?.phone}</TableCell>
                  <TableCell align="right">{row?.address}</TableCell>
                  <TableCell align="right">{row.license_number}</TableCell>
                  <TableCell align="right">{row.license_expiry}</TableCell>
                  <TableCell align="right">{row.motocycle_make}</TableCell>
                  <TableCell align="right">{row.motocycle_model}</TableCell>
                  <TableCell align="right">{row.motocycle_year}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div
              style={headerStyles}
            >
              <Typography fontSize={"20px"}>
              Add New Driver  
              </Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={formStyle}
            >
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                label="Name *"
                {...register("name", {
                  required: true,
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 5, message: "this field should be more that 5 characters" },
                })}
              />
              <p role="alert">
                {errors?.name?.message}
              </p>

              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                type="email"
                label="Email *"
                {...register("email", {
                  required: true,
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 5, message: "this field should be more that 5 characters" },
                })}
              />
              <p role="alert">
                {errors?.email?.message}
              </p>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                type="number"
                label="Phone *"
                {...register("phone", {
                  required: true,
                  maxLength: { value: 10, message: "this field should be less that 10 characters" },
                  minLength: { value: 8, message: "this field should be more that 8 characters" },
                })}
              />
              <p role="alert">
                {errors?.phone?.message}
              </p>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                label="Address"
                {...register("address", {
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 3, message: "this field should be more that 3 characters" },
                })}
              />
              <p role="alert">
                {errors?.address?.message}
              </p>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                label="License Number"
                {...register("license_number", {
                  maxLength: { value: 10, message: "this field should be less that 10 characters" },
                  minLength: { value: 3, message: "this field should be more that 3 characters" },
                })}
              />
              <p role="alert">
                {errors?.license_number?.message}
              </p>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                type="number"
                label="License Expiry"
                {...register("license_expiry", {
                  maxLength: { value: 4, message: "this field should be less that 4 characters" },
                  minLength: { value: 2, message: "this field should be more that 2 characters" },
                })}
              />
              <p role="alert">
                {errors?.license_expiry?.message}
              </p>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                label="Motocycle Maker"
                {...register("motocycle_make", {
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 3, message: "this field should be more that 3 characters" },
                })}
              />
              <p role="alert">
                {errors?.motocycle_make?.message}
              </p>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                label="Motocycle Model"
                {...register("motocycle_model", {
                  maxLength: { value: 20, message: "this field should be less that 20 characters" },
                  minLength: { value: 3, message: "this field should be more that 3 characters" },
                })}
              />
              <p role="alert">
                {errors?.motocycle_model?.message}
              </p>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                type="number"
                label="Motocycle Year"
                {...register("motocycle_year", {
                  maxLength: { value: 4, message: "this field should be less that 4 characters" },
                  minLength: { value: 2, message: "this field should be more that 2 characters" },
                })}
              />
              <p role="alert">
                {errors?.motocycle_year?.message}
              </p>
              <div>
                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={buttonStyle}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={buttonStyle}
                >
                  Save
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DriversPage;

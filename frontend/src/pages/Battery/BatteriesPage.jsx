import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import {
  useCreateBatteryMutation,
  useGetAllBatteriesQuery,
  useGetAllStationsQuery,
} from "../../redux/features/apiSlice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  overflow: "hidden",
  maxHeight: "85%",
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
  fontWeight: "bold",
  position: "sticky",
  top: 0,
  overflow: "hidden",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
};

const StyledTextField = {
  margin: "1rem",
  width: "300px",
};

const BatteriesPage = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createBattery] = useCreateBatteryMutation();

  const {
    refetch,
    data,
    isError: BatteryError,
    isLoading: BatteryLoading,
  } = useGetAllBatteriesQuery();

  const { data: stationsData, isError: StationError } =
    useGetAllStationsQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      serial_number: "",
      station: "",
      battery_type: "",
      manufacture_date: "",
    },
  });

  const onSubmit = (data) => {
    createBattery(data)
      .unwrap()
      .then((res) => {
        reset();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
        console.log("Erroe creatng a new Battery", err);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography fontSize={25} style={{ fontWeight: "bolder" }}>
          Battery Information
        </Typography>
        <Button onClick={handleOpen} variant="contained">
          Create a new battery
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Battery Type</TableCell>
              <TableCell align="right">Serial Number</TableCell>
              <TableCell align="right">Manufacture Year</TableCell>
              <TableCell align="right">Station Location</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!BatteryLoading &&
              data?.data?.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.battery_type}
                  </TableCell>
                  <TableCell align="right">{row.serial_number}</TableCell>
                  <TableCell align="right">{row.manufacture_date}</TableCell>
                  <TableCell align="right">{`${row.station.name} - ${row.station.location} `}</TableCell>
                  <TableCell align="right">{row?.status}</TableCell>
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
            <div style={headerStyles}>
              <Typography fontSize={"20px"}>Create a new battery</Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                label="Battery type *"
                {...register("battery_type", {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                })}
              />

              <TextField
                style={StyledTextField}
                variant="filled"
                type="number"
                fullWidth
                label="Manufacture Year *"
                {...register("manufacture_date", {
                  required: true,
                })}
              />

              <TextField
                style={StyledTextField}
                variant="filled"
                fullWidth
                label="Serial Number *"
                {...register("serial_number", {
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                })}
              />

              <Controller
                name="station"
                control={control}
                register={register}
                setValue={setValue}
                defaultValue={""}
                render={({ field }) => (
                  <TextField
                    required
                    style={StyledTextField}
                    variant="filled"
                    select
                    label="Select Station"
                    {...field}
                  >
                    <MenuItem disabled={true}>{"Select Station"}</MenuItem>
                    {stationsData &&
                      stationsData?.data?.map((item, idx) => (
                        <MenuItem
                          key={idx}
                          value={item?.id}
                        >{`${item?.name} - ${item?.location}`}</MenuItem>
                      ))}
                  </TextField>
                )}
              />

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
    </>
  );
};

export default BatteriesPage;

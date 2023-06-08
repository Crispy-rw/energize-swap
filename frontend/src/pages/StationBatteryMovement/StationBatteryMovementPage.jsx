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
  MenuItem,
  TextField,
} from "@mui/material";

import {
  useCreateSwapMutation,
  useGetAllDriversQuery,
  useGetOngoingSwapsQuery,
  useGetStationBatteriesQuery,
  useSwapFinishedMutation,
} from "../../redux/features/apiSlice";
import { Button, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { formatTime } from "../../configs/helpers";
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

const StationBatteryMovementPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset()
    setOpen(false)
  };

  const { data: driversData, isLoading: driverLoading } =
    useGetAllDriversQuery();
  const { data: batterieData, isLoading: BatteryLoading } =
    useGetStationBatteriesQuery();
  const {
    data: ongoingSwapsData,
    isLoading: loadingSwaps,
    refetch,
  } = useGetOngoingSwapsQuery();

  const [swapFinished] = useSwapFinishedMutation();

  const [createSwap] = useCreateSwapMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      battery: "",
      driver: "",
    },
  });

  const onSubmit = (data) => {
    createSwap(data)
      .unwrap()
      .then((res) => {
        reset();
        setOpen(false);
      })
      .catch((err) => {
        console.log("Err creating a new swap", err);
        toast.error(err?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  const stopSwap = (id) => {
    if (confirm("Are you sure you want to proceed with this action?") == true) {
      swapFinished(id)
      .unwrap()
      .then((res) => {
        refetch();
      })
      .catch((err) => {
        toast.error(err?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      });
    }
  };

  return (
    <div>
      <Stack
        spacing={2}
        direction="row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography fontSize={30} style={{ fontWeight: "bolder" }}>
          Ongoing Battery Swaps
        </Typography>
        <Button onClick={handleOpen} variant="contained">
          New Battery Swap
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Battery</TableCell>
              <TableCell align="right">Driver</TableCell>
              <TableCell align="right">PickUp Location</TableCell>
              <TableCell align="right">Deposit Location</TableCell>
              <TableCell align="right">Start Time</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loadingSwaps &&
              ongoingSwapsData?.data?.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.battery?.serial_number}
                  </TableCell>
                  <TableCell align="right">{row.driver?.name}</TableCell>
                  <TableCell align="right">
                    {row.pickup_station?.id == null
                      ? "-"
                      : row.pickup_station?.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.deposit_station?.id == null
                      ? "-"
                      : row.deposit_station?.name}
                  </TableCell>
                  <TableCell align="right">{formatTime(row.start_time)}</TableCell>
                  <TableCell align="right">{row.end_time == null ? "-": formatTime(row.end_time)}</TableCell>
                  <TableCell align="right">
                    {row.deposit_station_id == null ? "On going" : "Stopped"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {stopSwap(row.id)}}
                    >
                      Stop
                    </Button>
                  </TableCell>
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
              <Typography fontSize={"20px"}>New Battery Swap Form</Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <Controller
                  name="battery"
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
                      label="Select Battery"
                      {...field}
                    >
                     <MenuItem disabled={true}>{"Select Battery"}</MenuItem>
                    {!BatteryLoading &&
                      batterieData?.data?.map((item, idx) => (
                        <MenuItem
                          key={idx}
                          value={item?.id}
                        >{`${item?.battery_type} - ${item?.serial_number}`}</MenuItem>
                      ))}
                    </TextField>
                  )} />


                <Controller
                  name="driver"
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
                      label="Select Driver"
                      {...field}
                    >
                     <MenuItem disabled={true}>{"Select Driver"}</MenuItem>
                    {!driverLoading &&
                      driversData?.data?.map((item, idx) => (
                        <MenuItem
                          key={idx}
                          value={item?.id}
                        >{`${item?.name} - ${item?.email}`}</MenuItem>
                      ))}
                    </TextField>
                  )} />

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

export default StationBatteryMovementPage;

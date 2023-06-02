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
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  useCreateStationMutation,
  useGetAllStationsQuery,
} from "../../redux/features/apiSlice";
import { toast } from "react-toastify";

const locations = ["Kicukiro", "Gasabo", "Nyarugenge"];

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

export default function StationsPage(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isError, error, refetch, isLoading } = useGetAllStationsQuery();

  const [createStation] = useCreateStationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const onSubmit = (data) => {
    createStation(data)
      .unwrap()
      .then((resp) => {
        reset();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div style={{ maxWidth: "700px" }}>
        <Stack
          direction="row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography fontSize={20} style={{ fontWeight: "bolder" }}>
            Swap Station Information
          </Typography>
          <Button onClick={handleOpen} variant="contained">
            Add a new Station
          </Button>
        </Stack>
        <TableContainer sx={{ maxWidth: 700 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Total Swaps</TableCell>
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
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row?.total_swaps}</TableCell>
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
                <Typography fontSize={"20px"}>Add New Station</Typography>
                <CloseIcon onClick={handleClose} />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <TextField
                  style={StyledTextField}
                  variant="filled"
                  fullWidth
                  label="Name"
                  required
                  {...register("name", {
                    maxLength: 20,
                    minLength: 3,
                  })}
                />
                {errors.name?.type === "required" && (
                  <p role="alert">name is required</p>
                )}
                <Controller
                  name="location"
                  control={control}
                  register={register}
                  setValue={setValue}
                  defaultValue={""}
                  render={({ field }) => (
                    <TextField
                      style={StyledTextField}
                      variant="filled"
                      select
                      label="Select Station"
                      {...field}
                      required
                    >
                      <MenuItem disabled={true}>{"Select Station"}</MenuItem>
                      {locations?.map((item, idx) => (
                        <MenuItem key={idx} value={item}>{`${item}`}</MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                {errors.location?.type === "required" && (
                  <p role="alert">Location is required</p>
                )}
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
    </div>
  );
}

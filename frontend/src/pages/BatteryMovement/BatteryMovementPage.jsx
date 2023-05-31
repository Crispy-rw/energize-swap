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

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";

import {
  useGetAllBatteriesQuery,
  useGetAllDriversQuery,
  useGetAllStationsQuery,
  useGetOngoingSwapsQuery,
} from "../../redux/features/apiSlice";
import { Button, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BatteryMovementPage = () => {
  const {
    data: ongoingSwapsData,
    isLoading: loadingSwaps,
    refetch,
  } = useGetOngoingSwapsQuery();


  useEffect(()=> {
    refetch()
  },[])

  return (
    <div>
      <TableContainer component={Paper}>
        {/* {!loadingSwaps && ongoingSwapsData?.data?.length == 0 ? (
          <p>No data is available</p>
        ) : ( */}
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
                      {row.battery?.name}
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
                    <TableCell align="right">{row.start_time}</TableCell>
                    <TableCell align="right">{row.end_time}</TableCell>
                    <TableCell align="right">
                      {row.deposit_station_id == null ? "On going" : "Stopped"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        {/* )} */}
      </TableContainer>
    </div>
  );
};

export default BatteryMovementPage;

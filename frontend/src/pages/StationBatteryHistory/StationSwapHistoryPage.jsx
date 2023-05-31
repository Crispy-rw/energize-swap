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
import { useGetSwapHistoryQuery } from "../../redux/features/apiSlice";
import { Stack } from "@mui/material";

const StationSwapHistoryPage = () => {
  const { data, error, isError, refetch, isLoading } = useGetSwapHistoryQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Stack direction="row">
        <Typography fontSize={30} style={{ fontWeight: "bolder" }}>
          Battery Swap History Information
        </Typography>
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
              <TableCell align="right">Distane</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ marginLeft: "auto", marginRight: "auto" }}>
            {!isLoading &&
              data?.data?.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${row.battery?.battery_type} - ${row.battery?.serial_number}`}
                  </TableCell>
                  <TableCell align="right">{row.driver?.name}</TableCell>
                  <TableCell align="right">
                    {row.pickup_station?.name}
                  </TableCell>
                  <TableCell align="right">
                    {row.deposit_station?.name}
                  </TableCell>
                  <TableCell align="right">{row.start_time}</TableCell>
                  <TableCell align="right">{row.end_time}</TableCell>
                  <TableCell align="right">{row?.distance} km</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StationSwapHistoryPage;

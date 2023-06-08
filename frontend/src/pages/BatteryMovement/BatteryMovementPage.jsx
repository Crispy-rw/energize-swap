import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  useGetOngoingSwapsQuery,
} from "../../redux/features/apiSlice";

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
                      {row?.battery?.serial_number}
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
      </TableContainer>
    </div>
  );
};

export default BatteryMovementPage;

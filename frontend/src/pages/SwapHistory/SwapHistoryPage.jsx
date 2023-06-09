import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetSwapHistoryQuery } from "../../redux/features/apiSlice";
import { formatTime } from "../../configs/helpers";

const SwapHistoryPage = () => {
  const { data, error, isError, refetch, isLoading } = useGetSwapHistoryQuery();

  useEffect(() => {
    refetch();
  }, []);

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
                <TableCell align="right">Distane</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                data?.data?.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.battery?.battery_type} - {row.battery?.serial_number}
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
                    <TableCell align="right">{formatTime(row.end_time)}</TableCell>
                    <TableCell align="right">{row?.distance}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
      </TableContainer>
    </div>
  );
};

export default SwapHistoryPage;

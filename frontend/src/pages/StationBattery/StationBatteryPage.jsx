import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

import {
  useGetStationBatteriesQuery,
} from "../../redux/features/apiSlice";

const StationBatteryPage = (props) => {
  const {
    refetch,
    data,
    isError: BatteryError,
    isLoading: BatteryLoading,
  } = useGetStationBatteriesQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography fontSize={20} style={{ fontWeight: "bolder" }}>
          Station Battery Information
        </Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Battery Type</TableCell>
              <TableCell align="right">Serial Number</TableCell>
              <TableCell align="right">Station Location</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!BatteryLoading &&
              data?.data?.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.battery_type}
                  </TableCell>
                  <TableCell align="right">{row.serial_number}</TableCell>
                  <TableCell align="right">{`${row.station.name} - ${row.station.location} `}</TableCell>
                  <TableCell align="right">{row?.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StationBatteryPage;

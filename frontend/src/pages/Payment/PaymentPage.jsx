import React, { useEffect } from "react";
import { useGetAllPaymentsQuery } from "../../redux/features/apiSlice";
import userData from "../../configs/helpers";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const PaymentPage = () => {
  const userInfo = userData();

  const { refetch, data, isLoading, error } = useGetAllPaymentsQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Stack direction="row">
        <Typography fontSize={30} style={{ fontWeight: "bolder" }}>
         All Payments
        </Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Paid Amount</TableCell>
              <TableCell align="right">Refund Amount</TableCell>
              <TableCell align="right">Refund Station</TableCell>
              <TableCell align="right">Used Battery Percentage</TableCell>
              <TableCell align="right">Driver Name</TableCell>
              <TableCell align="right">Pickup Station</TableCell>
              <TableCell align="right">Batery Serial Number</TableCell>
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
                    {`${row?.id}`}
                  </TableCell>
                  <TableCell align="right">{row.total_amount}</TableCell>
                  <TableCell align="right">{row?.paid_amount}</TableCell>
                  <TableCell align="right">{row?.refund_amount}</TableCell>
                  <TableCell align="right">
                    {row?.swap?.deposit_station?.name}
                  </TableCell>
                  <TableCell align="right">
                    {row?.used_battery_percentage}%
                  </TableCell>
                  <TableCell align="right">{row?.driver?.name}</TableCell>
                  <TableCell align="right">
                    {row?.swap?.pickup_station?.name}
                  </TableCell>
                  <TableCell align="right">
                    {row?.swap?.battery?.serial_number}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

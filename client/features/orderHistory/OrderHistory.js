import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Container } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserHistoryAsync, selectHistory } from "./orderHistorySlice";
import { dollar } from "../../helpers";
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

export default function History() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.me.id);
  const history = useSelector(selectHistory);

  useEffect(() => {
    const fetchHistory = async () => {
      if (currentUserId) {
        await dispatch(fetchUserHistoryAsync(currentUserId));
      }
    };
    fetchHistory();
  }, [dispatch]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        component="div"
        variant="h5"
        sx={{ fontWeight: "bold" }}
        align="center"
      >
        {`Order History`}
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell align="right">Order Number</TableCell>
              <TableCell align="right">Number of Items</TableCell>
              <TableCell align="right">Order Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.history.map((row) => (
              <TableRow
                key={row["orderId"]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row["updatedAt"].slice(0, 10)}
                </TableCell>
                <TableCell align="right">{row["orderId"]}</TableCell>
                <TableCell align="right">{row["orderTotalItems"]}</TableCell>
                <TableCell align="right">
                  {dollar(row["orderTotalPrice"])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

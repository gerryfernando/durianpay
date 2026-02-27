/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import TypographyCom from "../../component/TypographyCom";
import API from "../../service";
import moment from "moment";
import styled from "@emotion/styled";
import { capitalizeFirstLetter } from "../../util/String";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  function createData(id, name, created_at, amount, status) {
    return { id, name, created_at, amount, status };
  }

  const rows = [
    createData(1, "Amazon Store", "2026-02-20T10:15:00", 250.0, "success"),
    createData(2, "Netflix", "2026-02-21T14:30:00", 15.99, "success"),
    createData(3, "Spotify", "2026-02-22T09:10:00", 9.99, "processing"),
    createData(4, "Apple Store", "2026-02-23T18:45:00", 120.5, "failed"),
    createData(5, "Shopee", "2026-02-24T11:05:00", 75.25, "success"),
  ];

  const [data, setData] = useState(rows);

  const filterData = [
    { value: "all", label: "All" },
    { value: "success", label: "Success" },
    { value: "failed", label: "Failed" },
    { value: "processing", label: "Processing" },
  ];

  const GetPayment = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const res = await API.get("dashboard/v1/payments", {
        params: {
          status: status,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data?.payments);
    } catch (error) {
      enqueueSnackbar("Failed to get data", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const getSummary = useMemo(
    () => {
      const failedLength = data.filter((row) => row.status === "failed").length;
      const successLength = data.filter(
        (row) => row.status === "success",
      ).length;
      const processLength = data.filter(
        (row) => row.status === "processing",
      ).length;

      return {
        failed: failedLength,
        success: successLength,
        processing: processLength,
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const FilterItem = styled(Paper)(({ theme, active }) => ({
    backgroundColor: active
      ? theme.palette.primary.main
      : theme.palette.background.paper,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box>
      <Stack gap={8}>
        <Grid container spacing={2} justifyContent="space-between">
          <TypographyCom title>List Payment</TypographyCom>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ borderRadius: "8px" }}
            onClick={logout}
          >
            Logout
          </Button>
        </Grid>

        <Grid container spacing={3}>
          <Stack mb={3} direction="row" spacing={2}>
            {filterData.map((filter) => {
              return (
                <FilterItem
                  onClick={() => setStatus(filter.value)}
                  active={status === filter.value}
                  sx={{ cursor: "pointer" }}
                >
                  {filter.label}
                </FilterItem>
              );
            })}
          </Stack>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Merchant Name</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell sx={{ height: 250 }} colSpan={5} align="center">
                      <CircularProgress size={28} />
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell>{row.merchant}</StyledTableCell>
                      <StyledTableCell>
                        {moment(row.created_at).format("DD MMM YYYY, HH:mm")}
                      </StyledTableCell>
                      <StyledTableCell>{row.amount}</StyledTableCell>
                      <StyledTableCell>
                        {capitalizeFirstLetter(row.status)}
                      </StyledTableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            mt={5}
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Item>Total : {data.length}</Item>
            <Item>Success : {getSummary.success} </Item>
            <Item>Failed : {getSummary.failed} </Item>
            <Item>Processing: {getSummary.processing} </Item>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Dashboard;

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TypographyCom from "../../component/TypographyCom";
import ListCart from "./component/ListCart";
import { enqueueSnackbar } from "notistack";
import API from "../../service";
import { ShoppingCart } from "@mui/icons-material";
import convertNumberCurrency from "../../util/Currency";
import AlertCom from "../../component/AlertCom";
import { useSelector } from "react-redux";

const Cart = () => {
  const [data, setData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const table = useSelector((state) => state.appState.tableNo);
  const [tableOptions, setTableOptions] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [tableNo, setTableNo] = useState(null);
  const getCart = async () => {
    try {
      const res = await API.get("cart/" + table);
      const dat = res?.data?.data;
      setData(dat);
      let sum = 0;
      dat.forEach((val) => {
        sum += val.total;
      });
      setTotalHarga(sum);
    } catch (error) {
      enqueueSnackbar("Failed to get data", { variant: "error" });
    }
  };
  const getTable = async () => {
    try {
      const res = await API.get("table");
      setTableOptions(
        (res.data?.data).map((val) => ({
          ...val,
          value: val.name,
          label: val.id,
        }))
      );
    } catch (error) {
      enqueueSnackbar("Failed to get data", { variant: "error" });
    }
  };

  const handleChange = (event) => {
    setTableNo(event.target.value);
  };
  const order = async () => {
    try {
      await API.post("order", { tableId: table, newTableId: tableNo });
      enqueueSnackbar("Successfully ordered", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to ordered", { variant: "error" });
    } finally {
      setTableNo(table);
      getCart();
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    getCart();
    getTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTableNo(table || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(table);
  return (
    <Box>
      <Stack gap="50px">
        <TypographyCom title>Cart Page</TypographyCom>
        <Grid container rowSpacing={4}>
          {!data.length ? (
            <Box
              sx={{
                height: "250px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <TypographyCom semiBold>
                Your cart is empty, please select the menu first
              </TypographyCom>
            </Box>
          ) : (
            <>
              <Grid item xs={12}>
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel id="changeTable">
                    Change your table here
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tableNo}
                    label="Age"
                    onChange={handleChange}
                  >
                    {tableOptions.map((val) => {
                      return (
                        <MenuItem value={val?.value}>{val?.label}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              {data?.map((val) => {
                return (
                  <>
                    {val.qty > 0 && (
                      <Grid item xs={12}>
                        <ListCart data={val} getCart={getCart} />
                      </Grid>
                    )}
                  </>
                );
              })}
              <Grid marginTop={4} item xs={12} textAlign="right">
                <Stack
                  direction="row"
                  gap={2}
                  sx={{ justifyContent: "end", display: "flex" }}
                  width="100%"
                >
                  <TypographyCom fontSize="20px" semiBold>
                    Total :
                  </TypographyCom>
                  <TypographyCom fontSize="20px" semiBold>
                    {convertNumberCurrency(totalHarga) || 0}
                  </TypographyCom>
                </Stack>
              </Grid>
              <Grid marginTop={1} item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ borderRadius: "10px", height: "50px" }}
                  color="secondary"
                  startIcon={<ShoppingCart />}
                  onClick={() => setShowConfirmModal(true)}
                >
                  Order
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Stack>
      <AlertCom
        title="Order Confirm"
        type="info"
        width="359px"
        message={`Are you sure to order food at table ${tableNo} ?`}
        open={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
        }}
        onConfirm={order}
      />
    </Box>
  );
};

export default Cart;

import { Edit } from "@mui/icons-material";
import { Button, Divider, Grid, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import ModalCom from "../../../component/ModalCom";
import PlusMinusInput from "../../../component/PlusMinusInput";
import convertNumberCurrency from "../../../util/Currency";
import { enqueueSnackbar } from "notistack";
import API from "../../../service";
import TypographyCom from "../../../component/TypographyCom";

const ListCart = (props) => {
  const { data, getCart } = props;
  const [openModal, setOpenModal] = useState(false);
  const [sum, setSum] = useState(data?.qty);
  const theme = useTheme();
  const updateCart = async () => {
    try {
      const body = {
        cartId: data.id,
        qty: sum,
      };
      await API.put("cart", body);
      enqueueSnackbar("Successfully updated the cart", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to update cart", { variant: "error" });
    } finally {
      setOpenModal(false);
      getCart();
    }
  };
  return (
    <>
      <Grid
        container
        sx={{
          background: "#fff",
          height: "150px",
          padding: "20px",
          borderRadius: "10px",
        }}
        justifyContent="space-between"
      >
        <Grid item>
          <Stack direction="row" gap={2}>
            <img
              alt={data.image_url}
              src={data.image_url}
              style={{ borderRadius: "5px" }}
              height="120px"
              width="200px"
            />
            <Stack gap={1}>
              <TypographyCom
                color={theme.palette.secondary.main}
                fontSize="20px"
                semiBold
              >
                {data?.name}
              </TypographyCom>
              <TypographyCom>
                {data?.qty} x {convertNumberCurrency(data.price)}
              </TypographyCom>
              <Divider />
              <TypographyCom semiBold>
                {convertNumberCurrency(data.total)}
              </TypographyCom>
            </Stack>
          </Stack>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setOpenModal(true)}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      <ModalCom
        key="modal-update-order"
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`${data.name}`}
        okText="Update"
        size="xs"
        onConfirm={updateCart}
      >
        <PlusMinusInput sum={sum} setSum={setSum} />
      </ModalCom>
    </>
  );
};

export default ListCart;

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import convertNumberCurrency from "../../../util/Currency";
import ModalCom from "../../../component/ModalCom";
import PlusMinusInput from "../../../component/PlusMinusInput";
import TypographyCom from "../../../component/TypographyCom";
import { enqueueSnackbar } from "notistack";
import { AddShoppingCart } from "@mui/icons-material";
import API from "../../../service";
import { useSelector } from "react-redux";

const FoodCard = (props) => {
  const { data } = props;
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const table = useSelector((state) => state.appState.tableNo);
  const [sum, setSum] = useState(0);

  const addCart = async () => {
    if (sum === 0) {
      enqueueSnackbar("Please input at least 1 to order", {
        variant: "warning",
      });
    } else if (sum > 0) {
      try {
        const body = {
          menuId: data.id,
          tableId: table,
          qty: sum,
        };
        await API.post("cart", body);
        enqueueSnackbar("Add cart success", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Failed to add cart", { variant: "error" });
      } finally {
        setOpenModal(false);
        setSum(0);
      }
    }
  };
  return (
    <Box>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={data?.image_url}
          title={data.name}
        />
        <CardContent>
          <TypographyCom gutterBottom variant="h5" component="div">
            {data.name}
          </TypographyCom>
          <TypographyCom variant="body2" color="text.secondary">
            {convertNumberCurrency(data.price || 0)}
          </TypographyCom>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ background: theme?.palette?.primary.main, color: "#fff" }}
            fullWidth
            size="small"
            onClick={() => setOpenModal(true)}
            startIcon={<AddShoppingCart />}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>

      <ModalCom
        key="modal-add-order"
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`${data.name}`}
        size="xs"
        onConfirm={() => {
          addCart();
        }}
      >
        <PlusMinusInput sum={sum} setSum={setSum} />
      </ModalCom>
    </Box>
  );
};

export default FoodCard;

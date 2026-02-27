/* eslint-disable no-unused-vars */
import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TypographyCom from "../../component/TypographyCom";
import FoodCard from "./component/FoodCard";
import API from "../../service";
import { enqueueSnackbar } from "notistack";

const Menu = (props) => {
  const [dataFood, setDataFood] = useState([]);

  const getMenu = async () => {
    try {
      const res = await API.get("menu");
      setDataFood(res.data?.data);
    } catch (error) {
      enqueueSnackbar("Failed to get data", { variant: "error" });
    }
  };
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <Box>
      <Stack gap={8}>
        <TypographyCom title>Menu Page</TypographyCom>

        <Grid container spacing={3}>
          {dataFood.map((val) => {
            return (
              <Grid item xs={12} sm={4} md={3}>
                <FoodCard data={val} />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
};

export default Menu;

/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { addItem, editItem } from "../store/features/items/itemsSlice";
import { useRouter } from "next/navigation";
import {
  Button,
  Dialog,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  DialogContent,
} from "@mui/material";
import * as Yup from "yup";

const ItemsPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  const formik = useFormik({
    initialValues: { name: editItemData?.name || "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (editItemData) {
        dispatch(editItem({ ...editItemData, name: values.name }));
      } else {
        dispatch(addItem({ id: Date.now(), name: values.name }));
      }
      handleClose();
    },
  });

  const handleOpen = (item) => {
    setEditItemData(item);
    setOpen(true);
  };

  const handleClose = () => {
    setEditItemData(null);
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 10 }}>
      <Button variant="contained" onClick={() => handleOpen(null)}>
        Add Item
      </Button>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <Button onClick={() => handleOpen(item)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ padding: 2 }}
        >
          <DialogContent>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Item Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ItemsPage;

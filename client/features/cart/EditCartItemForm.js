import React, { Fragment, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";

import { dollar } from "../../helpers";

export default function EditCartItemForm({
  buttonLabel,
  item,
  defaultValue,
  options,
  onSubmit,
}) {
  const { id, productName, size, color, numberOfItems, unitPrice } = item;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (event) => {
    setValue(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const _onSubmit = (value, id) => {
    // close menu before submission
    handleClose();
    onSubmit(value, id);
  };

  return (
    <Fragment>
      <CardActionArea onClick={(e) => handleClickOpen()}>
        <Typography component="div" variant="p" fontSize="12px">
          {buttonLabel}
        </Typography>
      </CardActionArea>
      <Dialog maxWidth={"lg"} open={open} onClose={handleClose}>
        <DialogTitle>{productName}</DialogTitle>
        <DialogContent>
          <DialogContentText fontSize="10px">{color}</DialogContentText>
          <DialogContentText fontSize="10px">{`Size: ${size}`}</DialogContentText>
          <DialogContentText fontSize="10px">{`Unit Price: ${dollar(
            unitPrice
          )}`}</DialogContentText>{" "}
          <DialogContentText fontSize="10px">{`Quantity: ${numberOfItems}`}</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="value">{buttonLabel}</InputLabel>
              <Select
                size="small"
                autoFocus
                value={value}
                onChange={handleValueChange}
                label="value"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                {Object.keys(options).map((key) => (
                  <MenuItem value={key} key={key}>
                    {options[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <Button onClick={() => _onSubmit(value, id)}>Submit</Button>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

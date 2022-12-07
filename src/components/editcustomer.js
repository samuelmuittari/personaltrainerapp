import { Button } from "@mui/material";
import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
// import DialogContentText from "@mui/material/DialogContentText";



export default function EditCustomer({editCustomer, params}) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname:"",
        lastname:"",
        postcode: "",
        city:"",
        email:"",
        phone:"",
    });

  const handleClickOpen = () => {
    console.log("PAINETTIIN LISAA AUTO");
    setOpen(true);
    setCustomer({
        firstname: params.data.firstname,
        lastname: params.data.lastname,
        postcode: params.data.postcode,
        city: params.data.city,
        email: params.data.email,
        phone: params.data.phone
    })
  };

  const handleClose = () => {
    console.log("HANDLE CLOSE KUTSUTTU");
    setOpen(false);
  };

  const handleCancel = () => {
      console.log("PAINETTIIN CANCEL");
      setOpen(false);
  }

  const handleSave = () => {
      editCustomer(customer, params.value);
      setOpen(false);
  }

  const inputChanged = (event) => {
      console.log("tallennetaan inputChanged attr arvo");
      setCustomer({...customer, [event.target.name] : event.target.value})
  }

  return (
    <div>
      <EditIcon onClick={handleClickOpen}>EDIT</EditIcon>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>New customer info</DialogTitle>
        <DialogContent>
          <TextField
            name="firstname"
            value={customer.firstname}
            autoFocus
            margin="dense"
            label="Firstname"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          
          <TextField
            name="lastname"
            value={customer.lastname}
            margin="dense"
            label="Lastname"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="postcode"
            value={customer.postcode}
            margin="dense"
            label="Postcode"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="city"
            value={customer.city}
            margin="dense"
            label="Year"
            type="City"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="email"
            value={customer.email}
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            name="phone"
            value={customer.phone}
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <DialogActions>
            <Button onClick={handleSave}>Yes</Button>
            <Button onClick={handleCancel}>No</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
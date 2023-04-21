import React, { useContext } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";
import { ListingContext } from "../contexts/ListingContext";
import { useParams } from "react-router-dom";


export default function DeleteConfirmation(props) {
    const { open, handleClose } = props
    const { deleteListing } = useContext(ListingContext)
    const { id } = useParams()

    const handleDelete = () => {
        deleteListing(id)
    }

    return (
            <Dialog open={open} onClose={handleClose} aria-labelledby='delete-dialog-title'>
                <DialogTitle id='delete-dialog-title'>Delete listing?</DialogTitle>
                <List>
                    <ListItem button onClick={handleDelete}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                <Check></Check>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            Delete
                        </ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                <Close></Close>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            Cancel
                        </ListItemText>
                    </ListItem>
                </List>
            </Dialog>
    );
}

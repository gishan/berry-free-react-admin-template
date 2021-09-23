import app from "./../base";

import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";

import TeacherForm from "./../components/TeacherForm";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// const useStyles = makeStyles((theme) => ({}));

const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const deleteDoc = async () => {
    const db = app.firestore();
    await db.collection("teachers").doc(deletingId).delete();
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    const db = app.firestore();
    const data = (
      await db.collection("teachers").orderBy("createdAt").get()
    ).docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setLoading(false);
    setTeachers(data);
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Company</DialogTitle>
        <DialogContent>
          <TeacherForm
            onClose={() => {
              handleClose();
            }}
          ></TeacherForm>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="edit-form-dialog-title"
      >
        <DialogTitle id="edit-form-dialog-title">Edit Company</DialogTitle>
        <DialogContent>
          <TeacherForm
            data={editData}
            onClose={() => {
              handleCloseEdit();
            }}
          ></TeacherForm>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-dialog-title"
      >
        {/* <DialogTitle id="delete-dialog-title">Delete Company</DialogTitle> */}
        <DialogContent>
          <Box p={2}>
            <Typography variant="h4" noWrap>
              Are you sure?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyItems="center" justifyContent="center">
            <Box mr={1}>
              <Button onClick={handleCloseDelete} color="secondary">
                No
              </Button>
            </Box>
            <Button
              onClick={() => {
                handleCloseDelete();
                deleteDoc();
              }}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Paper variant={"outlined"} elevation={0}>
        <Grid container>
          <Grid item xs={12}>
            <Box p={4} display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Create Company
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell align="inherit">Loading...</TableCell>
                    </TableRow>
                  ) : teachers.map((company) => {
                    return (
                      <TableRow key={company.id}>
                        <TableCell>{company.id}</TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              handleClickOpenEdit();
                              setEditData(company);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleClickOpenDelete();
                              setDeletingId(company.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Teachers;
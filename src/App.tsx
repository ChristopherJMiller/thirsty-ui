import { AppBar, Container, Toolbar, Typography, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSensors, Sensor } from "./lib/requests";
import Row from './Row';

export default () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);

  useEffect(() => {
    getSensors().then(setSensors);
  }, []);

  const rows = sensors.map((sensor) => <Row sensor={sensor} />);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Thirsty UI
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table aria-label="sensor table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nickname</TableCell>
                <TableCell align="center">Dry Reading</TableCell>
                <TableCell align="center">Wet Reading</TableCell>
                <TableCell align="center">Current Reading</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

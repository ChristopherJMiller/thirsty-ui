import React, { useState } from 'react';
import { Sensor, updateSensor, UpdateSensor } from './lib/requests';
import WarningIcon from '@mui/icons-material/Warning';
import { Button, SvgIcon, TableCell, TableRow, TextField } from '@mui/material';

interface RowProps {
  sensor: Sensor
}

const warnIfNull = (value?: number): JSX.Element => {
  if (value !== undefined && value !== null) {
    return <>{value}</>;
  }

  return <WarningIcon />
}

const textBoxIfInEditMode = (editMode: boolean, setter: (set: string) => void, label: string, value: string | number | undefined, ifNotEditMode?: JSX.Element): string | JSX.Element => {
  if (!editMode) {
    if (ifNotEditMode) {
      return ifNotEditMode;
    }
    return `${value}`;
  }

  return (
    <TextField 
      id={label} 
      label={label} 
      variant="outlined"
      defaultValue={value}
      onChange={(v) => setter(v.currentTarget.value)}
    />
  )
}

const getButton = (editMode: boolean, onEditModeClicked: () => void, onSaveClicked: () => void): JSX.Element => {
  if (editMode) {
    return <Button variant="contained" onClick={onSaveClicked}>Save</Button>
  } else {
    return <Button variant="contained" onClick={onEditModeClicked}>Edit</Button>
  }
}

const saveChanges = async (id: number, nickname: string, dryReading?: number, wetReading?: number): Promise<Sensor> => {
  const structure: UpdateSensor = {
    id,
    nickname,
    dry_reading: dryReading,
    wet_reading: wetReading
  };

  return updateSensor(structure);
}

export default ({ sensor }: RowProps) => {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState(sensor.nickname);
  const [dryReading, setDryReading] = useState(sensor.dry_reading);
  const [wetReading, setWetReading] = useState(sensor.wet_reading);

  const nicknameElement = textBoxIfInEditMode(editMode, (value) => setNickname(value as string), "Nickname", nickname);
  const dryReadingElement = textBoxIfInEditMode(editMode, (value) => { if (!isNaN(parseInt(value))) setDryReading(parseInt(value)) }, "Dry Reading", dryReading, warnIfNull(dryReading));
  const wetReadingElement = textBoxIfInEditMode(editMode, (value) => { if (!isNaN(parseInt(value))) setWetReading(parseInt(value)) }, "Wet Reading", wetReading, warnIfNull(wetReading));

  const button = getButton(editMode, () => setEditMode(true), () => saveChanges(sensor.id, nickname, dryReading, wetReading).then(() => setEditMode(false)));
  return (
    <TableRow key={sensor.id}>
      <TableCell component="th" scope="row">{sensor.sensor_id}</TableCell>
      <TableCell>{nicknameElement}</TableCell>
      <TableCell align="center">{dryReadingElement}</TableCell>
      <TableCell align="center">{wetReadingElement}</TableCell>
      <TableCell align="center">{sensor.current_reading}</TableCell>
      <TableCell align="center">
        {button}
      </TableCell>
    </TableRow>
  );
}

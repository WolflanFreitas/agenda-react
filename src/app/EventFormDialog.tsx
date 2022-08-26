import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface IEventFormDialogProps {
    open: boolean;
    onClose: () => void;
}
export function EventFormDialog(props: IEventFormDialogProps) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>Criar Evento</DialogTitle>
                <DialogContent>
                    <TextField
                        type={'date'}
                        margin="normal"
                        label="Data"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Descrição"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        type={'time'}
                        margin="normal"
                        label="Hora"
                        fullWidth
                        variant="standard"
                    />
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl margin='normal' fullWidth>
                            <InputLabel id="select-calendar">Agenda</InputLabel>
                            <Select
                                labelId="select-calendar"
                                id="demo-simple-select"
                                value={age}
                                label="Select-Calendar"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Pessoal</MenuItem>
                                <MenuItem value={2}>Trabalho</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancelar</Button>
                    <Button onClick={props.onClose} color={'primary'}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

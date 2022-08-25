import { Box, Icon, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { getEventsEndpoint, IEvent } from './backend';

const estilo = {
    table: {
        borderTop: "1px solid rgb(224, 224, 224)",
        minHeight: "100vh",
        "& td ~ td, & th ~ th": {
            borderRight: "1px solid rgb(224, 224, 224)"
        }
    }
}
const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export function CalendarScreen() {
    const weeks = generateCalendar(getToday());
    const firstDate = weeks[0][0].date;
    const lastDate = weeks[weeks.length - 1][6].date;
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        getEventsEndpoint(firstDate, lastDate).then(setEvents);
    }, [firstDate, lastDate]);

    return (
        <Box display="flex" height="100%" alignItems="stretch">
            <Box borderRight="1px solid rgb(224, 224, 224)" width="16em" padding="8px 16px">
                <h2>Agenda React</h2>
                <Button variant='contained' color='warning'>Novo evento</Button>
                <Box marginTop="64px">
                    <h3>Agendas</h3>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox />}
                        label="Pessoal"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="end"
                        control={<Checkbox />}
                        label="Trabalho"
                        labelPlacement="end"
                    />
                </Box>
            </Box>
            <TableContainer component={"div"}>
                <Box display="flex" alignItems={'center'} padding="8px 16px">
                    <Box >
                        <IconButton aria-label='mês anterior'>
                            <Icon>chevron_left</Icon>
                        </IconButton>
                        <IconButton aria-label='Próximo mês'>
                            <Icon>chevron_right</Icon>
                        </IconButton>
                    </Box>
                    <Box flex={1} marginLeft={'16px'} component={'h3'}>Junho de 2022</Box>
                    <Box>
                        <IconButton aria-label='Usuário'>
                            <Avatar>
                                <Icon>person</Icon>
                            </Avatar>
                        </IconButton>
                    </Box>
                </Box>
                <Table sx={estilo.table} aria-label="calendar">
                    <TableHead>
                        <TableRow>
                            {DAYS_OF_WEEK.map(day => { return <TableCell key={day} align="center">{day}</TableCell> })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeks.map((week, index) => {
                            return <TableRow key={index}>
                                {week.map(cell => { return <TableCell key={cell.date} align="center">{cell.date}</TableCell> })}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

interface ICalendarCell {
    date: string;
}

function generateCalendar(date: string): ICalendarCell[][] {
    const weeks: ICalendarCell[][] = [];
    const jsDate = new Date(`${date}T12:00:00`);
    const currentMonth = jsDate.getMonth();

    const currentDay = new Date(jsDate.valueOf());
    currentDay.setDate(1);
    const dayOfWeek = currentDay.getDay();
    currentDay.setDate(1 - dayOfWeek);

    do {
        const week: ICalendarCell[] = [];
        for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
            const isoDate = `${currentDay.getFullYear()}-${(currentDay.getMonth() + 1).toString().padStart(2, "0")}-${currentDay.getDate().toString().padStart(2, "0")}`;
            week.push({ date: isoDate });
            currentDay.setDate(currentDay.getDate() + 1);
        }
        weeks.push(week);

    } while (currentDay.getMonth() === currentMonth);

    return weeks;
}

function getToday() {
    return '2020-06-01';
}
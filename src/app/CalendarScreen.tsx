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
import { getCalendarsEndpoint, getEventsEndpoint, ICalendar, IEvent } from './backend';

const estilo = {
    table: {
        borderTop: "1px solid rgb(224, 224, 224)",
        minHeight: "100vh",
        tableLayout: "fixed",
        "& td ~ td, & th ~ th": {
            borderRight: "1px solid rgb(224, 224, 224)"
        },
        "& td": {
            verticalAlign: "top",
            overflow: "hidden",
            padding: "8px 4px"
        }
    },
    dayOfMonth: {
        fontWeight: 500,
        marginBottom: "4px",

    },
    event: {
        display: "flex",
        alignItems: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        whiteSpace: "nowrap",
        margin: "4px 0"
    },
    eventBackground: {
        display: "inline-block",
        color: "white",
        padding: "2px 4px",
        borderRadius: "4px"
    }
}
const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export function CalendarScreen() {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [calendars, setCalendars] = useState<ICalendar[]>([]);
    const [calendarsSelected, setCalendarsSelected] = useState<boolean[]>([]);
    const weeks = generateCalendar(getToday(), events, calendars, calendarsSelected);
    const firstDate = weeks[0][0].date;
    const lastDate = weeks[weeks.length - 1][6].date;

    useEffect(() => {
        Promise.all([getCalendarsEndpoint(), getEventsEndpoint(firstDate, lastDate)]).then(([calendars, events]) => {
            setCalendarsSelected(calendars.map(() => true));
            setCalendars(calendars);
            setEvents(events);
        });
    }, [firstDate, lastDate]);

    function toggleCalendar(i: number) {
        const newValue = [...calendarsSelected];
        newValue[i] = !newValue[i];
        setCalendarsSelected(newValue);
    }
    return (
        <Box display="flex" height="100%" alignItems="stretch">
            <Box borderRight="1px solid rgb(224, 224, 224)" width="16em" padding="8px 16px">
                <h2>Agenda React</h2>
                <Button variant='contained' color='warning'>Novo evento</Button>
                <Box marginTop="64px">
                    <h3>Agendas</h3>
                    {calendars.map((calendar, i) => (
                        <div key={calendar.id}>
                            <FormControlLabel
                                value="end"
                                control={<Checkbox style={{ color: calendar.color }} checked={calendarsSelected[i]} onChange={() => toggleCalendar(i)} />}
                                label={calendar.name}
                                labelPlacement="end"
                            />
                        </div>
                    ))}
                </Box>
            </Box>
            <Box flex="1" display="flex" flexDirection="column">
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
                <TableContainer style={{ flex: 1 }} component={"div"}>
                    <Table sx={estilo.table} aria-label="calendar">
                        <TableHead>
                            <TableRow>
                                {DAYS_OF_WEEK.map(day => { return <TableCell key={day} align="center">{day}</TableCell> })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {weeks.map((week, index) => {
                                return <TableRow key={index}>
                                    {week.map(cell => {
                                        return <TableCell key={cell.date} align="center">
                                            <Box sx={estilo.dayOfMonth}>
                                                {cell.dayOfMonth}
                                            </Box>
                                            {cell.events.map(event => {
                                                const color = event.calendar.color;
                                                return (
                                                    <Box key={event.id} sx={estilo.event} component={'button'}>
                                                        {event.time && (<>
                                                            <span>
                                                                <Icon style={{ color }} fontSize='inherit'>watch_later</Icon> {event.time || ""}
                                                            </span>
                                                            <Box component={'span'} margin="4px">
                                                                {event.time}
                                                            </Box>
                                                        </>)}
                                                        {event.time ? <span>{event.desc}</span> : <Box sx={estilo.eventBackground} component={'span'} style={{ backgroundColor: color }}>{event.desc}</Box>}
                                                    </Box>
                                                )
                                            })}
                                        </TableCell>
                                    })}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>
    )
}

type IEventWithCalendar = (IEvent & { calendar: ICalendar });
interface ICalendarCell {
    date: string;
    dayOfMonth: number;
    events: IEventWithCalendar[];
}

function generateCalendar(date: string, allEvents: IEvent[], calendars: ICalendar[], calendarsSelected: boolean[]): ICalendarCell[][] {
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
            const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
            const dayStr = currentDay.getDate().toString().padStart(2, "0");
            const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

            const events: IEventWithCalendar[] = [];
            for (const event of allEvents) {
                if (event.date === isoDate) {
                    const calIndex = calendars.findIndex(cal => cal.id === event.calendarId);
                    if (calendarsSelected[calIndex]) {
                        events.push({ ...event, calendar: calendars[calIndex] })
                    }
                }
            }
            week.push({
                dayOfMonth: currentDay.getDate(),
                date: isoDate,
                events,
            });
            currentDay.setDate(currentDay.getDate() + 1);
        }
        weeks.push(week);

    } while (currentDay.getMonth() === currentMonth);

    return weeks;
}

function getToday() {
    return '2021-06-30';
}
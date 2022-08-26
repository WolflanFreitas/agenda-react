import { Box, Icon } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ICalendar, IEvent } from './backend';

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

interface ICalendarProps {
    weeks: ICalendarCell[][];
}
export function Calendar(props: ICalendarProps) {
    const { weeks } = props;
    return (
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
    )
}

export type IEventWithCalendar = (IEvent & { calendar: ICalendar });

export interface ICalendarCell {
    date: string;
    dayOfMonth: number;
    events: IEventWithCalendar[];
}
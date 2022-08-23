import Table from '@mui/material/Table';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export function CalendarScreen() {
    const classes = styles;
    return <TableContainer component={"div"}>
        <Table aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {DAYS_OF_WEEK.map(day => { return <TableCell align="center">{day}</TableCell> })}
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    {DAYS_OF_WEEK.map(day => { return <TableCell align="center">x</TableCell> })}
                </TableRow>
                <TableRow>
                    {DAYS_OF_WEEK.map(day => { return <TableCell align="center">x</TableCell> })}
                </TableRow>
                <TableRow>
                    {DAYS_OF_WEEK.map(day => { return <TableCell align="center">x</TableCell> })}
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const estilo = {
    root: {
        height: "100%",
    },
    table: {
        minHeight: "100vh",
        "& td ~ td, & th ~ th": {
            borderRight: "1px solid rgb(224, 224, 224)"
        }
    }
}
const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export function CalendarScreen() {

    return (
        <Box display="flex">
            <Box>
                <h2>Agenda React</h2>
            </Box>
            <TableContainer sx={estilo.root} component={"div"}>
                <Table sx={estilo.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {DAYS_OF_WEEK.map(day => { return <TableCell key={day} align="center">{day}</TableCell> })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {DAYS_OF_WEEK.map(day => { return <TableCell key={day} align="center">x</TableCell> })}
                        </TableRow>
                        <TableRow>
                            {DAYS_OF_WEEK.map(day => { return <TableCell key={day} align="center">x</TableCell> })}
                        </TableRow>
                        <TableRow>
                            {DAYS_OF_WEEK.map(day => { return <TableCell key={day} align="center">x</TableCell> })}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
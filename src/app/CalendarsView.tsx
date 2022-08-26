import { Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ICalendar } from './backend';

interface ICalendarsViewProps {
    calendars: ICalendar[],
    toggleCalendar: (i: number) => void,
    calendarsSelected: boolean[]
}

export function CalendarsView(props: ICalendarsViewProps) {
    const { calendars, toggleCalendar, calendarsSelected } = props;
    return (
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
    )
}


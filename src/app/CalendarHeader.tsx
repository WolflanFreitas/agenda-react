import { Box, Icon, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { formatMonth, addMonth } from '../dateFunctions';
import { Link } from "react-router-dom";

interface ICalendarHeaderProps {
    month: string;
}

export function CalendarHeader(props: ICalendarHeaderProps) {
    const { month } = props;
    return (
        <Box display="flex" alignItems={'center'} padding="8px 16px">
            <Box >
                <IconButton aria-label='mês anterior' component={Link} to={{ pathname: "/calendar/" + addMonth(month!, -1) }}>
                    <Icon>chevron_left</Icon>
                </IconButton>
                <IconButton aria-label='Próximo mês' component={Link} to={{ pathname: "/calendar/" + addMonth(month!, 1) }}>
                    <Icon>chevron_right</Icon>
                </IconButton>
            </Box>
            <Box flex={1} marginLeft={'16px'} component={'h3'}>
                {formatMonth(month!)}
            </Box>
            <Box>
                <IconButton aria-label='Usuário'>
                    <Avatar>
                        <Icon>person</Icon>
                    </Avatar>
                </IconButton>
            </Box>
        </Box>
    )
}


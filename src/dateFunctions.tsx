export const MONTHS = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];

export function getToday() {
    return '2021-06-30';
}

export function formatMonth(isoMonth: string) {
    const [year, month] = isoMonth.split("-");
    return `${MONTHS[parseInt(month) - 1]} de ${year}`;
}

export function addMonth(isoMonth: string, increment: number) {
    const jsDate = new Date(isoMonth + "-01T12:00:00");
    jsDate.setMonth(jsDate.getMonth() + increment);
    return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1).toString().padStart(2, "0")}`;
}
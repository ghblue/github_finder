import moment from 'moment';

export const formatLastUpdatedDate = (date) =>  {
    const currentDate = moment();
    const updatedDate = moment(date);
  
    const daysAgo = currentDate.diff(updatedDate, 'days');
  
    if (daysAgo === 0) {
      return 'Atualizado há menos de 24 horas';
    } else if (daysAgo < 7) {
      return `Atualizado há ${daysAgo} dias atrás`;
    } else if (daysAgo < 30) {
      const weeksAgo = Math.floor(daysAgo / 7);
      return `Atualizado há ${weeksAgo} ${weeksAgo === 1 ? 'semana' : 'semanas'} atrás`;
    } else if (daysAgo < 365) {
      const monthsAgo = Math.floor(daysAgo / 30);
      return `Atualizado há ${monthsAgo} ${monthsAgo === 1 ? 'mês' : 'meses'} atrás`;
    } else {
      const yearsAgo = Math.floor(daysAgo / 365);
      return `Atualizado há ${yearsAgo} ${yearsAgo === 1 ? 'ano' : 'anos'} atrás`;
    }
}
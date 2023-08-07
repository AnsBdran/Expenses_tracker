import { formatDateFromSeconds } from './helpers';

export const COLUMNS = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
  },
  {
    header: 'Budget',
    accessorKey: 'budgetId',
    // cell: (info) => {},
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
    cell: (info) => {
      console.log('info', new Date(info.getValue()));
      return formatDateFromSeconds(info.getValue());
    },
  },
];

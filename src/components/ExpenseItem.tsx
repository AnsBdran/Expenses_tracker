import React from 'react';
import { ExpenseType } from '../utils/types';

type ExpenseItemPropsType = {
  expense: ExpenseType;
};
const ExpenseItem = ({ expense }: ExpenseItemPropsType) => {
  return <div>ExpenseItem</div>;
};

export default ExpenseItem;

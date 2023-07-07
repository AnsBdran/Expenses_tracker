export type BudgetType = {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
};

export type ExpenseType = {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
  budgetId: number;
};

export type addToDBType = (key: string, value: string) => void;

export type removeFromDBType = (key: string) => void;

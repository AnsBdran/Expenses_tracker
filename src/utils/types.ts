export type BudgetType = {
  id: string;
  name: string;
  amount: number;
  createdAt: number;
};

export type BudgetDispatchedActionType = {
  name: string
  amount: number
}

export type ExpenseType = {
  id: string;
  name: string;
  amount: number;
  createdAt: number;
  budget: {
    name: string,
    id: string
  };
};

export type AddBudgetFormValuesType = {
  name: string;
  amount: number;
};

export type AddExpenseFormValuesType = {
  name: string
  amount: number
  budget: string
}
export BudgetPayloadType = {
  
}

export type addToDBType = (key: string, value: any) => void;

export type removeFromDBType = (key: string) => void;

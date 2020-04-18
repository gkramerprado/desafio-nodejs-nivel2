import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private calculateTotalByType(type: string): number {
    return this.transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === type) {
        return accumulator + currentValue.value;
      }
      return accumulator;
    }, 0);
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.calculateTotalByType('income');
    const totalOutcome = this.calculateTotalByType('outcome');
    const total = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const transaction = new Transaction({ title, value, type });

    const { total } = this.transactionsRepository.getBalance();

    const outcomeGreaterThanIncome = type === 'outcome' && total - value <= 0;

    if (outcomeGreaterThanIncome) {
      throw Error(
        'Unacceptable transaction, this will let income empty or negative',
      );
    }

    const transactionCreated = this.transactionsRepository.create(transaction);

    return transactionCreated;
  }
}

export default CreateTransactionService;

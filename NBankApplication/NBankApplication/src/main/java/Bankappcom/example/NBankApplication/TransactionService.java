package Bankappcom.example.NBankApplication;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;

	import java.time.LocalDateTime;
	import java.util.List;

	@Service
	public class TransactionService {

	    @Autowired
	    private TransactionRepo transactionRepository;

	    public void saveTransaction(String accountNumber, String transactionType, double amount) {
	        Transaction transaction = new Transaction();
	        transaction.setAccountNumber(accountNumber);
	        transaction.setType(transactionType);
	        transaction.setAmount(amount);
	        transaction.setDateTime(LocalDateTime.now());

	        transactionRepository.save(transaction);
	    }

	    public List<Transaction> getTransactionHistory(String accountNumber) {
	        return transactionRepository.findByAccountNumber(accountNumber);
	    }
	}




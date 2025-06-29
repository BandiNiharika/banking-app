package Bankappcom.example.NBankApplication;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepo extends JpaRepository<Transaction, Long> {
	List<Transaction> findByAccountNumber(String accountNumber);

}

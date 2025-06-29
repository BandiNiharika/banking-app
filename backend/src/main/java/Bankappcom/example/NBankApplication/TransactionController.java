package Bankappcom.example.NBankApplication;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from React app
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepo transactionRepo;

    // Get all transactions for a specific account number
    @GetMapping("/{accountNumber}")
    public List<Transaction> getTransactionHistory(@PathVariable String accountNumber) {
        return transactionRepo.findByAccountNumber(accountNumber);
    }
}



package Bankappcom.example.NBankApplication;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/accounts")
public class NbankController {

    @Autowired
    private NBankService nbankService;

    @Autowired
    private NBankRepository repository;

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@Valid @RequestBody NBank requestData, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.toList());
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(nbankService.createAccount(requestData), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<NBank> getAllAccounts() {
        return nbankService.getAllAccounts();
    }

    @GetMapping("/{accountNumber}")
    public ResponseEntity<NBank> getAccountById(@PathVariable String accountNumber) {
        return nbankService.getAccountById(accountNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
 
    @PutMapping("/update/{accountNumber}")
    public ResponseEntity<NBank> updateAccount(@PathVariable String accountNumber, @RequestBody NBank updatedAccount) {
        Optional<NBank> optionalAccount = repository.findByAccountNumber(accountNumber);
        
        if (!optionalAccount.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        NBank account = optionalAccount.get();
        account.setAccountHolderName(updatedAccount.getAccountHolderName());
        account.setAccountType(updatedAccount.getAccountType());
        account.setBalance(updatedAccount.getBalance());

        NBank savedAccount = repository.save(account);
        return ResponseEntity.ok(savedAccount);
    }
    @DeleteMapping("/delete/{accountNumber}")
    public ResponseEntity<Void> deleteAccount(@PathVariable String accountNumber) {
        Optional<NBank> optionalAccount = repository.findByAccountNumber(accountNumber);
        if (!optionalAccount.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        repository.delete(optionalAccount.get());
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/withdraw/{accountNumber}")
    public ResponseEntity<?> withdraw(@PathVariable String accountNumber, @RequestBody Map<String, Double> request) {
        Double amount = request.get("amount");

        if (amount == null || amount <= 0) {
            return ResponseEntity.badRequest().body("Amount should be greater than zero");
        }

        Optional<NBank> optionalAccount = repository.findById(accountNumber);
        if (!optionalAccount.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        }

        NBank account = optionalAccount.get();

        if (account.getBalance() < amount) {
            return ResponseEntity.badRequest().body("Insufficient balance");
        }

        account.setBalance(account.getBalance() - amount);
        repository.save(account);

        // Save transaction
        transactionService.saveTransaction(accountNumber, "Withdraw", amount);

        return ResponseEntity.ok(account);
        
    }
    
    @PostMapping("/deposit")
    public ResponseEntity<NBank> deposit(@RequestParam String accountNumber, @RequestParam double amount) {
        try {
            NBank updatedAccount = nbankService.deposit(accountNumber, amount);
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping("/transfer")
    public ResponseEntity<String> transferAmount(@RequestBody Map<String, String> request) {
        String fromAccount = request.get("fromAccount");
        String toAccount = request.get("toAccount");
        double amount = Double.parseDouble(request.get("amount"));

        if (amount <= 0) {
            return ResponseEntity.badRequest().body("Transfer amount must be greater than 0");
        }

        NBank sender = repository.findById(fromAccount).orElse(null);
        NBank receiver = repository.findById(toAccount).orElse(null);

        if (sender == null || receiver == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("One or both accounts not found");
        }

        if (sender.getBalance() < amount) {
            return ResponseEntity.badRequest().body("Insufficient balance in sender's account");
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        repository.save(sender);
        repository.save(receiver);

        // Log both transactions
        transactionService.saveTransaction(fromAccount, "Transfer To " + toAccount, amount);
        transactionService.saveTransaction(toAccount, "Transfer From " + fromAccount, amount);

        return ResponseEntity.ok("Transfer successful");
    }

    @GetMapping("/transactions/{accountNumber}")
    public ResponseEntity<List<Transaction>> getTransactionHistory(@PathVariable String accountNumber) {
        List<Transaction> history = transactionService.getTransactionHistory(accountNumber);
        return ResponseEntity.ok(history);
    }
}

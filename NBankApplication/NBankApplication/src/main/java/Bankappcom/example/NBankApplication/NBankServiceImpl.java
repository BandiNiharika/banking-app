package Bankappcom.example.NBankApplication;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class NBankServiceImpl implements NBankService {

    @Autowired
    private NBankRepository bankRepository;

    @Autowired
    private TransactionRepo transactionRepository;

    private static final String PREFIX = "NBank";
    private static final int START_SERIAL = 99251;

    @Override
    public NBank createAccount(NBank account) {
        Optional<NBank> lastAccount = bankRepository.findTopByOrderByAccountNumberDesc();
        int nextSerial = START_SERIAL;

        if (lastAccount.isPresent()) {
            String lastAccNum = lastAccount.get().getAccountNumber();
            String numericPart = lastAccNum.replace(PREFIX, "");
            nextSerial = Integer.parseInt(numericPart) + 1;
        }

        String newAccountNumber = PREFIX + nextSerial;
        account.setAccountNumber(newAccountNumber);
        return bankRepository.save(account);
    }

    @Override
    public double checkBalance(String accountNumber) {
        NBank account = bankRepository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        return account.getBalance();
    }

    @Override
    public List<NBank> getAllAccounts() {
        return bankRepository.findAll();
    }

    @Override
    public Optional<NBank> getAccountById(String accountNumber) {
        return bankRepository.findByAccountNumber(accountNumber);
    }

    @Override
    public Optional<NBank> updateAccount(String accountNumber, NBank updatedAccount) {
        return bankRepository.findByAccountNumber(accountNumber).map(existing -> {
            existing.setAccountHolderName(updatedAccount.getAccountHolderName());
            existing.setAccountType(updatedAccount.getAccountType());
            existing.setBalance(updatedAccount.getBalance());
            // Do NOT update account number
            return bankRepository.save(existing);
        });
    }

    @Override
    public boolean deleteAccount(String accountNumber) {
        if (bankRepository.existsById(accountNumber)) {
            bankRepository.deleteById(accountNumber);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public NBank deposit(String accountNumber, double amount) {
        NBank account = bankRepository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        account.setBalance(account.getBalance() + amount);
        NBank updatedAccount = bankRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setType("Deposit");
        transaction.setAmount(amount);
        transaction.setDateTime(LocalDateTime.now());
        transactionRepository.save(transaction);

        return updatedAccount;
    }

    @Override
    @Transactional
    public NBank withdraw(String accountNumber, double amount) {
        NBank account = bankRepository.findByAccountNumber(accountNumber)
            .orElseThrow(() -> new RuntimeException("Account not found"));
        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }
        account.setBalance(account.getBalance() - amount);
        NBank updatedAccount = bankRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAccountNumber(accountNumber);
        transaction.setType("Withdraw");
        transaction.setAmount(amount);
        transaction.setDateTime(LocalDateTime.now());
        transactionRepository.save(transaction);

        return updatedAccount;
    }

    @Override
    @Transactional
    public void transfer(String fromAccountNumber, String toAccountNumber, double amount) {
        withdraw(fromAccountNumber, amount);
        deposit(toAccountNumber, amount);

        Transaction transactionFrom = new Transaction();
        transactionFrom.setAccountNumber(fromAccountNumber);
        transactionFrom.setType("Transfer Out");
        transactionFrom.setAmount(amount);
        transactionFrom.setDateTime(LocalDateTime.now());
        transactionRepository.save(transactionFrom);

        Transaction transactionTo = new Transaction();
        transactionTo.setAccountNumber(toAccountNumber);
        transactionTo.setType("Transfer In");
        transactionTo.setAmount(amount);
        transactionTo.setDateTime(LocalDateTime.now());
        transactionRepository.save(transactionTo);
    }
}

package Bankappcom.example.NBankApplication;

import java.util.List;
import java.util.Optional;

public interface NBankService {

    NBank createAccount(NBank account);

    double checkBalance(String accountNumber);

    List<NBank> getAllAccounts();

    Optional<NBank> getAccountById(String accountNumber);

    Optional<NBank> updateAccount(String accountNumber, NBank updatedAccount);

    boolean deleteAccount(String accountNumber);

    NBank deposit(String accountNumber, double amount);

    NBank withdraw(String accountNumber, double amount);

    void transfer(String fromAccountNumber, String toAccountNumber, double amount);
}

package Bankappcom.example.NBankApplication;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
@Entity
public class NBank {
	 @Id
	 @Column(unique = true)
	 private String accountNumber;
	 @NotBlank(message = "Account Holder Name is required") 
	 private String accountHolderName;
	 @NotBlank(message = "Account type is required")
	 @Pattern(regexp = "savings|current", flags = Pattern.Flag.CASE_INSENSITIVE, message = "Account type must be 'savings' or 'current'")
	 private String accountType;
	 @PositiveOrZero(message = "Balance cannot be negative")
	 private Double balance;
	 
	public NBank() {
		super();
		// TODO Auto-generated constructor stub
	}

	public NBank(String accountNumber, String accountHolderName, String accountType, Double balance) {
		super();
		this.accountNumber = accountNumber;
		this.accountHolderName = accountHolderName;
		this.accountType = accountType;
		this.balance = balance;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getAccountHolderName() {
		return accountHolderName;
	}

	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	@Override
	public String toString() {
		return "NBank [accountNumber=" + accountNumber + ", accountHolderName=" + accountHolderName + ", accountType="
				+ accountType + ", balance=" + balance + "]";
	}
	
	 

}

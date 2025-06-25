package Bankappcom.example.NBankApplication;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository

public interface NBankRepository extends JpaRepository<NBank, String> {
	Optional<NBank> findTopByOrderByAccountNumberDesc();
	Optional<NBank> findByAccountNumber(String accountNumber);
	//Optional<NBank> lastAccount = NBankRepository.findTopByOrderByAccountNumberDesc();

	}



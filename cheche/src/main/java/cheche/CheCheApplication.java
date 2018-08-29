package cheche;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CheCheApplication {
    public static void main(String[] args) {
        SpringApplication.run(CheCheApplication.class, args);
    }
}

package ma.yassine.finalexamrag;

import ma.yassine.finalexamrag.entities.Person;
import ma.yassine.finalexamrag.repositories.PersonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class FinalExamRagApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinalExamRagApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(PersonRepository personRepository){
        return arg -> {
            for (int i = 0; i < 50; i++) {
                Person person = Person.builder()
                        .name(UUID.randomUUID().toString())
                        .email(UUID.randomUUID().toString().substring(0,5) + "@email.org")
                        .build();
                personRepository.save(person);
            }
        };
    }
}

package com.company.project.service;

import com.company.project.entity.Greeting;
import com.company.project.repository.GreetingRepository;
import com.company.project.dto.PersonDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GreetingService {
    private final GreetingRepository greetingRepository;

    
    @Autowired
    public GreetingService(GreetingRepository greetingRepository) {
        this.greetingRepository = greetingRepository;
    }

    public List<Greeting> getFirstFiveGreetings() {
        Pageable pageable = PageRequest.of(0, 5);
        return greetingRepository.findAll(pageable).getContent();
    }

    public List<Greeting> getAllGreetings() {
        return greetingRepository.findAll();
    }

    public Greeting getGreetingById(Integer id) {
        return greetingRepository.findById(id)
        .orElse(new Greeting("Not Found ID::" + id));
    }

    public Greeting addPerson(PersonDTO dto) {
        Greeting person = new Greeting();
        person.setName(dto.name);
        person.setAge(dto.age);
        person.setPosition(dto.position);
        person.setSalary(dto.salary);
        person.setBonus(dto.bonus);
        person.setStock(dto.stock);
        person.setUse_device(dto.use_device);

        return greetingRepository.save(person);
    }

    public void deletePerson(Integer id) {
        // Check person with the given ID exists
        if (!greetingRepository.existsById(id)) {
            throw new RuntimeException("Person not found with id: " + id);
        }
        
        // Delete person with ID
        greetingRepository.deleteById(id);
    }

    public Greeting updatePersonTeam(Integer id, Greeting updatePerson) {
        Optional<Greeting> optional = greetingRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RuntimeException("Person not found with id: " + id);
        }
        
        Greeting person = optional.get();
        person.setTeam(updatePerson.getTeam());
        
        return greetingRepository.save(person);
    }
}
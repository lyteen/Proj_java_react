package com.company.project.service;

import com.company.project.entity.Greeting;
import com.company.project.repository.GreetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Greeting getGreetingById(Integer id) {
        return greetingRepository.findById(id)
        .orElse(new Greeting("Not Found ID::" + id));
    }
}
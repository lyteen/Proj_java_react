package com.company.project.controllers;

import com.company.project.entity.Greeting;
import com.company.project.service.GreetingService;
import com.company.project.dto.PersonDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
/*
 * Mapping HTTP(GTP) post
*/

@RestController
public class HomeController {

    private final GreetingService greetingService;
    
    @Autowired
    public HomeController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping("/")
    public Greeting showHome() {
        return greetingService.getGreetingById(1);
    }

    @GetMapping("/first")
    public List<Greeting> getFirstFiveGreetings() {
        return greetingService.getFirstFiveGreetings();
    }

    @GetMapping("/all")
    public List<Greeting> getAllGreetings() {
        return greetingService.getAllGreetings();
    }

    @PostMapping("/addPerson")
    public Greeting addPerson(@RequestBody PersonDTO dto) {
        return greetingService.addPerson(dto);
    }
}
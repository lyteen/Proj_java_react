package com.company.project.controllers;

import com.company.project.entity.Greeting;
import com.company.project.service.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
}
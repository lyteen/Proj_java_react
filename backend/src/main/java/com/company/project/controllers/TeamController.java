package com.company.project.controllers;

import com.company.project.entity.Team;
import com.company.project.service.TeamService;
import com.company.project.dto.TeamDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;

@RestController
public class TeamController {
    
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/Team")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @PostMapping("/addTeam")
    public Team addTeam(@RequestBody TeamDTO dto) {
        return teamService.addTeam(dto);
    }

    @DeleteMapping("/deleteTeam/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Integer id) {
        try {
            teamService.deleteTeam(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
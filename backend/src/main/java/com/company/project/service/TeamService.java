package com.company.project.service;

import com.company.project.entity.Team;
import com.company.project.entity.Greeting;
import com.company.project.repository.GreetingRepository;
import com.company.project.repository.TeamRepository;
import com.company.project.dto.TeamDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final GreetingRepository greetingRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, GreetingRepository greetingRepository) {
        this.teamRepository = teamRepository;
        this.greetingRepository = greetingRepository;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team addTeam(TeamDTO dto) {
        Team team = new Team();
        team.setName(dto.name);

        return teamRepository.save(team);
    }

    public void deleteTeam(Integer id) {
        List<Greeting> affected = greetingRepository.findByTeam(id);
        for (Greeting member: affected) {
            member.setTeam(null);
        }
        greetingRepository.saveAll(affected);

        // Delete the Resposiroty
        teamRepository.deleteById(id);
    }
}
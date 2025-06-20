package com.company.project.repository;

import com.company.project.entity.Greeting;
// import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
/*
 * Inherit "Greeting" table from database 
*/

@Repository
public interface GreetingRepository extends JpaRepository<Greeting, Integer> {
    List<Greeting> findByTeam(Integer team);
}
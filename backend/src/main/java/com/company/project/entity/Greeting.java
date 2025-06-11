package com.company.project.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name = "greetings")
public class Greeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = true)
    private Integer age;
    
    @Column(nullable = true)
    private Double salary;

    @Column(nullable = true)
    private String position;

    @Column(nullable = true)
    private Double bonus;
    
    @Column(nullable = true)
    private int stock;
    
    @Column(nullable = true)
    private String use_device;
    
    @Column(nullable = true)
    private Integer team;

    public Greeting() {
    }

    public Greeting(String name) {
        this.name = name;
    }

    public Greeting(int id, String name, int age, Double salary, String position) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.position = position;
    }

    // Getters and setters for new fields
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPosition() {
        return position;
    }

    public void setBonus(Double bonus) {
        this.bonus =  bonus;
    }

    public Double getBonus() {
        return bonus;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getStock() {
        return stock;
    }

    public void setUse_device(String use_device) {
        this.use_device = use_device;
    }

    public String getUse_device() {
        return use_device;
    }

    public Integer getTeam() {
        return team;
    }

    public void setTeam(Integer team) {
        this.team = team;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Greeting greeting = (Greeting) o;

        return name.equals(greeting.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }
}

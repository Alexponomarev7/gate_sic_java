package com.gate.gatelib.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "sets")
public class Set {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "problems_sets",
            joinColumns = @JoinColumn(name = "sets_id"),
            inverseJoinColumns = @JoinColumn(name = "problems_id"))
    private List<Problem> problems;

    @JsonIgnore
    public List<Problem> getProblems() {
        return problems;
    }

    public void setProblems(List<Problem> problems) {
        this.problems = problems;
    }

    public void addProblem(Problem problem) {
        this.problems.add(problem);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

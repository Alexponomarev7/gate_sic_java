package com.gate.gatelib.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "problemsets")
@Data
public class ProblemSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "problems_problemsets",
            joinColumns = @JoinColumn(name = "sets_id"),
            inverseJoinColumns = @JoinColumn(name = "problems_id"))
    private List<Problem> problems;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "groups_sets",
            joinColumns = @JoinColumn(name = "sets_id"),
            inverseJoinColumns = @JoinColumn(name = "groups_id"))
    private Set<Group> groups;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,
            orphanRemoval = true, mappedBy = "problemSet")
    private Set<Submission> submissions;

    @JsonIgnore
    public List<Problem> getProblems() {
        return problems;
    }

    @JsonIgnore
    public Set<Group> getGroups() {
        return groups;
    }

    @JsonIgnore
    public Set<Submission> getSubmissions() {
        return submissions;
    }
}

package com.gate.gatelib.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "problemsets")
public class ProblemSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    public void setProblems(List<Problem> problems) {
        this.problems = problems;
    }

    public void addProblem(Problem problem) {
        this.problems.add(problem);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonIgnore
    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) { this.groups = groups; }

    public void addGroup(Group group) { this.groups.add(group); }

    @JsonIgnore
    public Set<Submission> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(Set<Submission> submissions) { this.submissions = submissions; }

    public void addSubmissions(Submission submission) { this.submissions.add(submission); }
}

package com.gate.gatelib.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "problems_problemsets",
            joinColumns = @JoinColumn(name = "problems_id"),
            inverseJoinColumns = @JoinColumn(name = "sets_id"))
    private List<ProblemSet> sets;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,
            orphanRemoval = true, mappedBy = "problem")
    private Set<Submission> submissions;


    @JsonIgnore
    public List<ProblemSet> getSets() {
        return sets;
    }

    public void setSets(List<ProblemSet> sets) {
        this.sets = sets;
    }

    public void addSet(ProblemSet set) {
        this.sets.add(set);
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

    @JsonIgnore
    public Set<Submission> getSubmissions() { return submissions; }

    public void setSubmissions(Set<Submission> submissions) { this.submissions = submissions; }

    public void addSubmissions(Submission submission) { this.submissions.add(submission); }
}

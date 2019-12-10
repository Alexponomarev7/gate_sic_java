package com.gate.gatelib.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "problems")
@Data
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
}

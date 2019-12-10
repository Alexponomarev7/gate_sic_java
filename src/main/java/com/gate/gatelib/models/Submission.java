package com.gate.gatelib.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "submissions")
@Data
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String code;

    // TODO: ENUM?
    private String status;

    // TODO: specify what it is
    private String contentsUrl;

    // TODO: ENUM?
    private String lang;

    private Date sendTS;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id")
    private ProblemSet problemSet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}

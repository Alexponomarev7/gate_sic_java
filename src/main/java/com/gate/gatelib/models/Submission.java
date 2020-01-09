package com.gate.gatelib.models;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // TODO: ENUM?
    private String status;

    // TODO: just string as content?
    private String contents;

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

    public Date getSendTS() { return sendTS; }

    public void setSendTS(Date sendTS) { this.sendTS = sendTS; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public int getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public String getContents() { return contents; }

    public void setContents(String contents) { this.contents = contents; }

    public String getLang() { return lang; }

    public void setLang(String lang) { this.lang = lang; }

    public ProblemSet getProblemSet() { return problemSet; }

    public void setProblemSet(ProblemSet problemSet) { this.problemSet = problemSet; }

    public Problem getProblem() { return problem; }

    public void setProblem(Problem problem) { this.problem = problem; }
}

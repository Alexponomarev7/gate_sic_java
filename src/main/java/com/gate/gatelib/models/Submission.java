package com.gate.gatelib.models;

import javax.persistence.*;


@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // TODO: ENUM?
    private String status;

    // TODO: specify what it is
    private String contentsUrl;

    // TODO: ENUM?
    private String lang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "set_id")
    private ProblemSet problemSet;


    public int getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public String getContentsUrl() { return contentsUrl; }

    public void setContentsUrl(String contentsUrl) { this.contentsUrl = contentsUrl; }

    public String getLang() { return lang; }

    public void setLang(String lang) { this.lang = lang; }

    public ProblemSet getProblemSet() { return problemSet; }

    public void setProblemSet(ProblemSet problemSet) { this.problemSet = problemSet; }
}

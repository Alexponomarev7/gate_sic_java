package com.gate.gatelib.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.Type;
import org.springframework.data.util.Lazy;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;


@Entity
@Table(name = "submissions")
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO: ENUM?
    private String status;

    private String resolution;

    // TODO: just string as content?
    // TODO: maybe is so heavy to store in DB?
    @Size(max=4*1024*1024) // 4 MB
    @Basic(fetch=FetchType.LAZY)
    @Column(columnDefinition="TEXT")
    private String contents;

    // TODO: ENUM?
    private String lang;

    private Date sendTS;

    @JsonManagedReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "set_id")
    private ProblemSet problemSet;

    @JsonManagedReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @JsonManagedReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public Date getSendTS() { return sendTS; }

    public void setSendTS(Date sendTS) { this.sendTS = sendTS; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

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

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }
}

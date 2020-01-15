package com.gate.gatelib.payload;


public class UserSummary {
    private Long id;
    private String username;
    private Boolean admin;

    public UserSummary(Long id, String username, Boolean admin) {
        this.id = id;
        this.username = username;
        this.admin = admin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }
}

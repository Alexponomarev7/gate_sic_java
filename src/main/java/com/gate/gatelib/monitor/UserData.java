package com.gate.gatelib.monitor;

class UserData {
    private String username;
    private Long id;

    UserData(String userName, Long userId) {
        this.username = userName;
        this.id = userId;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String username) { this.username = username; }

    public Long getUserId() {
        return id;
    }

    public void setUserId(Long id) {
        this.id = id;
    }
}

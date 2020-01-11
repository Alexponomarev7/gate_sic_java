package com.gate.gatelib.monitor;

class MonitorHeaderElement {
    private String name;
    private Integer maxScore;

    MonitorHeaderElement(String name, Integer maxScore) {
        this.name = name;
        this.maxScore = maxScore;
    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public Integer getMaxScore() { return maxScore; }

    public void setMaxScore(Integer maxScore) { this.maxScore = maxScore; }
}

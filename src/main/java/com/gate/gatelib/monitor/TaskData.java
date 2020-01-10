package com.gate.gatelib.monitor;

class TaskData {
    private String taskName;
    private Long taskId;

    TaskData(String taskName, Long taskId) {
        this.taskName = taskName;
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
}

package com.gate.gatelib.monitor;

import com.gate.gatelib.models.User;

import java.util.List;

/**
 * POJO, строчка в мониторе
 */
class MonitorElement {
    UserData userData;
    public List<ScoreData> tasksScores;

    MonitorElement() {

    }

    MonitorElement(UserData userData, List<ScoreData> tasksScores) {
        this.userData = userData;
        this.tasksScores = tasksScores;
    }
}

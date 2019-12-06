package com.gate.gatelib.monitor;

/**
 * Класс, концентрирующий "оценку" за задачу для юзера в группе
 * Возможно надо вынести в common, если понадобится где-то еще.
 */
class ScoreData {
    // TODO: Not sure if the data I store is right + should correct algorithm of score calc.
    // TODO: add some timestamp?
    private String triesUntilSuccess;

    private Float score;

    ScoreData(String triesUntilSuccess, Float score) {
        this.triesUntilSuccess = triesUntilSuccess;
        this.score = score;
    }

    public String getTriesUntilSuccess() {
        return triesUntilSuccess;
    }

    public void setTriesUntilSuccess(String triesUntilSuccess) {
        this.triesUntilSuccess = triesUntilSuccess;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }
}

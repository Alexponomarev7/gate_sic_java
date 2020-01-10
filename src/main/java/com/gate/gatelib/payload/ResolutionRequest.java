package com.gate.gatelib.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class ResolutionRequest {
    private Long id;

    private String resolution;

    // TODO more statuses
    @Pattern(regexp = "OK|RJ")
    private String status;

    public Long getId() {
        return id;
    }

    public String getResolution() {
        return resolution;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

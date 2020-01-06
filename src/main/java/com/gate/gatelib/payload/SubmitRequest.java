package com.gate.gatelib.payload;

import javax.validation.constraints.*;

public class SubmitRequest {
    @NotBlank
    @Size(min = 3, max = 15)
    private String language;

    @NotBlank
    @Size(max = 100000)
    private String code;

    @NotBlank
    private String jwtToken;

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() { return code; }

    public void setCode(String code) {
        this.code = code;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}

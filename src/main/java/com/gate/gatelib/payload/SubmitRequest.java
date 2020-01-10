package com.gate.gatelib.payload;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

public class SubmitRequest {
    @NotBlank
    @Size(min = 3, max = 15)
    private String language;

    @NotBlank
    private String jwtToken;

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}

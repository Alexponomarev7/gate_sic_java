package com.gate.gatelib.controller;

import com.gate.gatelib.models.User;
import com.gate.gatelib.payload.SubmitRequest;
import com.gate.gatelib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.gate.gatelib.payload.SignUpRequest;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
public class SubmitController {
    @PostMapping("/competitions/{contestId}/group/{groupId}/submit")
    public String submitProblem(@PathVariable Integer contestId, @PathVariable Integer groupId,
                                @Valid @RequestBody SubmitRequest submitRequest) {
        return "blank";
    }
}
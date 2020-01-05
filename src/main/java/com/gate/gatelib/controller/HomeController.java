package com.gate.gatelib.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @RequestMapping(path = "/*")
    public String index() {
        return "index";
    }

}
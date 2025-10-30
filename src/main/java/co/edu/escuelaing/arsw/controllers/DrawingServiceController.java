package co.edu.escuelaing.arsw.controllers;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DrawingServiceController {
  @GetMapping(value="/status", produces="application/json")
  public String status() {
    return "{\"status\":\"Greetings from Spring Boot. "
      + LocalDate.now() + ", " + LocalTime.now() + ". The server is Running!\"}";
  }
}
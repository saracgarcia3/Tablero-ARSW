package co.edu.escuelaing.arsw;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BBAppStarter {
  public static void main(String[] args){
    SpringApplication app = new SpringApplication(BBAppStarter.class);
    app.setDefaultProperties(Collections.singletonMap("server.port", getPort()));
    app.run(args);
  }
  static int getPort() {
    String p = System.getenv("PORT");
    return (p != null) ? Integer.parseInt(p) : 8080;
  }
}
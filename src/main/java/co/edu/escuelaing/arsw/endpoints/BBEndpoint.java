package co.edu.escuelaing.arsw.endpoints;

import java.io.IOException;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.springframework.stereotype.Component;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@Component
@ServerEndpoint("/bbService")
public class BBEndpoint {

  static Queue<Session> sessions = new ConcurrentLinkedQueue<>();
  Session me;

  @OnOpen
  public void onOpen(Session s) throws IOException {
    sessions.add(s);
    me = s;
    s.getBasicRemote().sendText("Connection established.");
  }

  @OnMessage
  public void onMessage(String msg, Session s) throws IOException {
    // Reenvía a todos MENOS al que lo envió
    for (Session other : sessions) {
      if (!other.equals(s)) other.getBasicRemote().sendText(msg);
    }
  }

  @OnClose
  public void onClose(Session s) { sessions.remove(s); }

  @OnError
  public void onError(Session s, Throwable t) { sessions.remove(s); }
}

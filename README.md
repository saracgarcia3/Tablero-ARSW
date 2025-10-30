# 🎨​ Tablero interactivo – WebSocket Canvas React + Spring Boot + AWS

Este proyecto implementa un **canvas colaborativo en tiempo real** utilizando **Spring Boot**, **WebSockets**, **React**, **p5.js** y **AWS EC2**.  
Permite dibujar puntos en una pestaña del navegador y verlos reflejados instantáneamente en las demás conexiones activas.

---

## 🚀 Tecnologías

- **Java 17**
- **Spring Boot 3.2.6**
- **Spring WebSocket**
- **React 18 (UMD) + Babel**
- **p5.js** para el canvas interactivo
- **AWS EC2** (Amazon Linux)
- **Maven** como gestor de dependencias

---

## 💡 Ejecución local

1. Clonamos y compilamos:
```bash
mvn clean package
```
2. Ejecutamos:
```bash
mvn spring-boot:run
```
o
```bash
java -jar target/lab-0.0.1-SNAPSHOT.jar
```
3. Probamos con las siguientes URL:
- http://localhost:8080/status
- http://localhost:8080/index.html

▶️​ Video de demostración:

https://github.com/user-attachments/assets/f76a59d2-ff56-4125-8613-8fb4360ca9c1

## 🌐 Despliegue en AWS EC2

1. Creamos la instancia
- AMI: Amazon Linux 2023 o Ubuntu 22.04
- Tipo: t2.micro (Free Tier)
- Par de claves: tablero.pem
- Abrir puertos: 22 (SSH), 80 (HTTP), 443 (HTTPS), 8080 (Custom TCP)

<p align="center">
<img width="921" height="319" alt="image" src="https://github.com/user-attachments/assets/8adafc57-7c95-460c-beb3-23fe2dd9db74" />
</p>

2. Nos conectamos con:

```bash
ssh -i "D:\Sara K\Descargas\Tablero\tablero.pem" ec2-user@34.201.149.80
```
3. Subimos el archivo JAR:
```bash
scp -i "D:\Sara K\Descargas\Tablero\tablero.pem" .\target\lab-0.0.1-SNAPSHOT.jar ec2-user@34.201.149.80:/home/ec2-user/
```
4. Ejecutamos en segundo plano:
```bash
PORT=8080 nohup java -jar lab-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
```
<p align="center">
<img width="921" height="268" alt="image" src="https://github.com/user-attachments/assets/760b50d5-c28d-4ed4-806d-d0094517cedc" />
</p>

5. Probamos con las siguientes URL:
- http://34.201.149.80:8080/status
<p align="center">
<img width="724" height="215" alt="image" src="https://github.com/user-attachments/assets/17f29893-8638-497a-bd54-73182b88c715" />
</p>

- http://34.201.149.80:8080/index.html
<p align="center">
<img width="774" height="635" alt="image" src="https://github.com/user-attachments/assets/2f067424-e89e-4dcf-813e-03c38b43e66c" />
</p>

## 🏁 Resultado esperado

- Backend Spring Boot operativo en AWS EC2
- Canvas interactivo accesible públicamente
- WebSockets funcionando entre múltiples clientes
- Entorno de despliegue documentado y reproducible



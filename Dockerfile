FROM openjdk:8-jre-alpine

COPY target/case-0.0.1-SNAPSHOT.jar case-0.0.1-SNAPSHOT.jar
CMD java -jar case-0.0.1-SNAPSHOT.jar
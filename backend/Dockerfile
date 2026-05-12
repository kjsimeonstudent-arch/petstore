FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /workspace/target/petstore-backend-0.0.1-SNAPSHOT.jar ./petstore-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "petstore-backend.jar"]

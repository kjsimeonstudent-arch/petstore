FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
# Ensure Maven is installed in the build image, run the build, then clean up
RUN apt-get update && apt-get install -y maven \
	&& mvn -B package -DskipTests \
	&& apt-get remove -y maven \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/*

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /workspace/target/petstore-backend-0.0.1-SNAPSHOT.jar ./petstore-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "petstore-backend.jar"]

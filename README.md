# gate

Requirments:
* Java JDK 8+
* mvn
* weback

Для запуска из корневой директории необходимо настроить
конфиг `/src/main/resources/application.properties`, который должен
выглядить примерно следующим образом:
```
spring.data.rest.base-path=/api

spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.url=jdbc:postgresql://localhost:5432/gate_sic
spring.datasource.username={YOUR POSTGRES USER HERE}
spring.datasource.password={YOUR POSTGRES PASSWORD HERE}
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQL9Dialect

spring.jpa.hibernate.ddl-auto=update
spring.jpa.generate-ddl=true
spring.jpa.show-sql=true
spring.session.store-type=none
```

Далее необходимо собрать `jar-файл` с помощью команды:
``` mvn clean package```

По итогу нужный `jar-файл` будет лежать в `/target` и для его запуска достаточно выполнить
следующую команду:
```java -jar target/gate-lib-0.0.1-SNAPSHOT.jar```

Сайт будет располагаться по адресу `127.0.0.1:8080`
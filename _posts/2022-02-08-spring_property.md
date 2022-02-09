---
title: PropertySource를 사용하여 DB property 분리하기  
categories:
- Java
- Spring
---

준비물 : [Spring mvc 프로젝트](https://github.com/All-ForOne/spring_legacy/tree/connectMysql)

오늘은 지난번에 mysql까지 연결해두었던 프로젝트에서 설정 부분을 조금 다듬어보려고 해요. string으로 작성된 설정값들을 property 파일로 분리해주고 DB 설정 파일도 새로 생성해주도록 할게요.  
1. 기존의 프로젝트에서 AppConfig.java안에 DB 연결에 필요한 정보들을 모두 작성했었는데요. 이것부터 분리해줄게요.   
**DatabaseConfig.java** 파일을 생성하여 AppConfig에 작성된 내용을 옮겨주세요.  
   **변경 전 AppConfig.java** -> 이 내용 그대로 DatabaseConfig로 옮겨주었어요.
   <script src="https://gist.github.com/All-ForOne/4df74baa34103f1d39ab112859f2f2ca.js"></script>
   **변경 후 AppConfig.java**
   <script src="https://gist.github.com/All-ForOne/053ffaa9750c21934be1dfdca1a7c438.js"></script> 
   여기서 조금 눈여겨 볼 부분은 AppConfig에 @Import가 추가된 것인데요. DatabaseConfig를 주입받기 때문에 필요없을 것 같지만 @Configuration이 붙은 bean을 사용하려면 @Import를 써주어야합니다.
2. 다음으로는 string으로 입력되어있는 설정값들을 파일로 관리하기 위해 resource 폴더 아래에 **database.properties** 파일을 생성해주었어요. 설정값들은 아무래도 파일이 따로 있는게 한 눈에 보기 편하고 관리하기 쉬워요.  
spring boot에서도 프로젝트를 생성하면 application.properties 파일이 기본적으로 있더라구요! 설정값의 이름들은 [여기](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#application-properties.data)를 참고했어요. key 값을 정의하는 것이기때문에 마음대로 정할 수 있지만 자주 사용하는 key로 작성해두면 다른 개발자가 볼 때 쉽게 알아볼 수 있겠죠?
   ```properties
   # resource/database.properties
   datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   datasource.url=jdbc:mysql://localhost:3306/spring?serverTimezone=UTC&charaterEncoding=UTF-8
   datasource.username=root
   datasource.password=1234
   
   jpa.generate-ddl=false
   jpa.database-platform=org.hibernate.dialect.MySQL57Dialect
   jpa.show-sql=true
   jpa.hibernate.ddl-auto=false
   jpa.hibernate.physical_naming_strategy=org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy
   jpa.hibernate.format_sql=true
   jpa.hibernate.use_sql_comments=true
   ```
3. DatabaseConfig.java에서 위의 값들을 가져다 사용하도록 수정해볼게요.  
   <script src="https://gist.github.com/All-ForOne/d0026b588794c8d5548ad8a398b66387.js"></script>
   @PropertySource("classpath:database.properties")를 추가해줌으로써 
우리가 작성한 database.properties의 내용을 읽어와서 spring 환경변수로 등록해주어요. 그럼 우리는 위의 소스에서 사용한 것 처럼 Environment에서 꺼내어 쓸 수 있어요. 
자세한 설명은 [여기](https://docs.spring.io/spring-framework/docs/5.3.15/reference/html/core.html#beans-property-source-abstraction)를 참고하세요.    

PropertySource 어노테이션을 사용해 간단하게 설정을 분리해보았어요. 
다음에는 테스트 환경을 구축해보도록 할게요.
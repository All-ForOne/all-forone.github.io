---
title: Spring mvc 프로젝트에 Junit 테스트 환경 구축하기  
categories:
- Java
- Spring
---

준비물 : [Spring mvc 프로젝트](https://github.com/All-ForOne/spring_legacy/tree/connectMysql)

오늘은 spring mvc 프로젝트에 테스트 환경을 추가해볼게요. 저는 지난번에 mysql까지 연결해두었던 프로젝트를 사용했어요.  
1. 먼저 build.gradle에 테스트에 필요한 의존성을 추가해줄게요. 
    ```java
    def springVersion = "5.3.15"
    implementation "org.springframework:spring-test:${springVersion}"
    testImplementation "com.h2database:h2:2.1.210"
    ```
   spring-test를 이용해 테스트를 진행할거고 이 때 H2 db를 사용하기 위해서 2가지를 추가했어요.
2. 다음으로는 테스트 환경에서 사용하기 위한 H2 db에 대한 환경설정이 필요한데요. 
   H2도 JPA를 이용할 예정이라 기존에 작성한 DatabaseConfig와 중복되는 부분이 많더라구요.
   그래서 DatabaseConfig를 추상화시켜주고 H2Config와 MysqlConfig가 상속받아 사용하는 것으로 설계했어요.   
   **DatabaseConfig.java**
   <script src="https://gist.github.com/All-ForOne/ac561828c28f5cc6a4ff24d3d53db04b.js"></script>
   **MysqlConfig.java**
   <script src="https://gist.github.com/All-ForOne/9645da80d8607e7279c9d096584b848c.js"></script>
   **H2Config.java**
   <script src="https://gist.github.com/All-ForOne/bfa2b4941502ec3faf22e9e64f6aaf01.js"></script>
   소스에서 살펴볼 부분은 **@Profile** 인데요 MysqlConfig는 인자를 'default'로 주었고 H2Config는 'test'로 주었어요. 무슨 차이가 있는지는 3번에서 다시 볼게요.  
   AppConfig에서는 어떤 config를 실행해야하는지 몰라도 되고 @Profile에 따라 생성되는 datasource가 다르기 때문에 개발/test 환경을 분리할 수 있어요.  
   > 위와 같이 중복되는 부분(변하지 않는 부분)은 부모 클래스에 정의하고 변경이 필요한 부분은 자식 클래스에서 정의하도록 하는 것을 디자인 패턴에서는 TEMPLATE METHOD 패턴이라고 해요.

3. 자 그럼 필요한 환경을 갖추었으니 test에 필요한 것은 무엇이 있는지 알아볼게요.  
   **MenuControllerTest.java**
   <script src="https://gist.github.com/All-ForOne/b8c2e768a95083a4a92f842a9a365a58.js"></script>
   기존에 메뉴 조회용 controller를 작성했었는데요. 그에 대한 test 코드를 작성해보았어요.   
   - ExtendWith : Junit jupiter를 이용하기 위해 사용
   - ContextConfiguration : applicationContext의 구성요소를 testContext에 적용
   - WebAppConfiguration : WebApplicationContext을 사용하기 위함 (이것을 작성하지 않을 경우 MvcConfig가 동작하지 않아요.)
   - ActiveProfiles : test 실행시 활성화시킬 Profile 선택(2번에서 작성한 H2Config를 활성화시키기 위해서 꼭 적용해주세요.)
   
4. ExtendWith, ContextConfiguration, WebAppConfiguration을 결합한 어노테이션인 SpringJUnitWebConfig를 사용하여 조금 더 간결하게 바꿔보았어요.
   <script src="https://gist.github.com/All-ForOne/dcc92d3b0e080edd6e3e0917950cc9dc.js"></script>
5. 이렇게 설정해둔 내용이 다른 테스트에서도 계속 필요하기때문에 테스트용 어노테이션을 새로 생성해주었어요.  
   **WebTestConfig.java**
   <script src="https://gist.github.com/All-ForOne/38fcd2f7a3146f9c54bf1d5f57574dac.js"></script>

마지막으로 WebTestConfig 어노테이션까지 적용해준 MenuControllerTest의 모습이에요.
<script src="https://gist.github.com/All-ForOne/dc3597f3ae42848f082119c979224a24.js"></script>
설정에 관련된 어노테이션을 감추니까 훨씬 테스트에 집중할 수 있는 코드가 된 것 같지 않나요?   
모든 소스는 [여기](https://github.com/All-ForOne/spring_legacy/tree/addTestConfiguration)에서 확인하실 수 있어요.
   

<hr />
**Reference**  
<https://docs.spring.io/spring-framework/docs/current/reference/html/testing.html#unit-testing-spring-mvc>  
<https://docs.spring.io/spring-framework/docs/5.3.15/reference/html/core.html#beans-definition-profiles-java>  
<https://www.baeldung.com/spring-webappconfiguration>  
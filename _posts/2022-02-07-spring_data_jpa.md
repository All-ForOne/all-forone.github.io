---
title: Spring mvc 프로젝트에 mysql, jpa 추가하기   
categories:
- Java
- Spring
---

준비물 : [Spring mvc 프로젝트](https://all-forone.github.io/java/spring/2022/02/01/spring_legacy/)

지난번 뼈대만 생성한 spring mvc 프로젝트를 준비해주세요. 오늘은 여기에 mysql을 연결하고 spring-data-jpa를 사용하기 위한 환경설정을 해볼게요.
JPA가 무엇인지 궁금하신 분은 [여기](https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html)를 참고해주세요!

1. 먼저 의존성을 추가해볼게요.
    ```
    implementation 'mysql:mysql-connector-java:8.0.28' 
    implementation 'org.springframework.data:spring-data-jpa:2.6.1'
    implementation 'org.hibernate:hibernate-core:5.6.5.Final'
    ```
    mysql을 사용하기 위해서 mysql-connetor를 추가해주었고, jpa 사용을 위해서 hibernate-core, spring-data-jpa를 추가했어요.  
   ![img_1.png](/assets/images/20220207/img_1.png)  
    의존성을 추가하고 refresh를 하게되면 이미지와 같이 라이브러리들이 추가된 것을 확인할 수 있어요.   

2. 다음으로는 AppConfig에 database 설정을 추가해볼게요.
    필요한 내용이 [spring reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference)에 잘 설명되어 있더라구요.   
    ![img_3.png](/assets/images/20220207/img_3.png)

    저는 mysql을 사용할거라서 dataSource 메소드를 변경해주었어요.
    ```java
    @Bean
    public DataSource dataSource() {
        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();

        dataSource.setDriverClass(com.mysql.cj.jdbc.Driver.class);
        dataSource.setUrl("jdbc:mysql://localhost:3306/spring?serverTimezone=UTC&charaterEncoding=UTF-8");
        dataSource.setUsername("root");
        dataSource.setPassword("1234");

        return dataSource;
    }
   ```
   entityManagerFactory 메소드도 약간의 수정을 해주었어요.  
    ```java
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        //GenerateDdl을 true로 설정할 경우 @Entity가 붙은 class에 대한 테이블 생성 쿼리가 실행되어요.
        vendorAdapter.setGenerateDdl(false);  
        vendorAdapter.setDatabase(Database.MYSQL);
        vendorAdapter.setDatabasePlatform("org.hibernate.dialect.MySQL57Dialect");
        //console에서 sql 로그를 확인할 수 있게 해줘요.
        vendorAdapter.setShowSql(true); 

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        //scan 경로를 자신의 프로젝트에 맞게 변경해주세요.
        factory.setPackagesToScan("org.allforone.spring.domain"); 
        factory.setDataSource(dataSource());

        Properties jpaProperties = new Properties();
        //ShowSql의 log가 한 줄로 출력되기 때문에 보기가 매우 불편해요. 추가해주세요.
        jpaProperties.setProperty("hibernate.format_sql", "true");
        jpaProperties.setProperty("hibernate.use_sql_comments", "true");
        jpaProperties.setProperty("hibernate.physical_naming_strategy", "org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy");
        factory.setJpaProperties(jpaProperties);

        return factory;
    }
   ```
      
   보통 property name을 java에서는 camel 표기, DB에서는 snake로 표기하는 경우가 많아요. 이런 경우 도메인 property마다 @Column에 DB 테이블에서 사용하는 이름을 입력해주어야 해요.
   ```java
   @Column(name="use_yn")
   private String useYn;
   ```
   이것처럼요. 모든 컬럼에 작성하려면 양이 꽤 많겠죠?  
   이 작업을 건너뛰기 위해서는 **physical_naming_strategy** 설정을 추가해주면 되요. 
spring boot에서 jpa를 사용하면 이러한 변환이 default라고 하는데 hibernate는 java property 이름을 그대로 사용하는것이 default로 되어있어 수정해주었어요.   
저는 변환을 제외한 다른 설정이 필요하지 않기 때문에 hibernate에서 제공하는 CamelCaseToUnderscoresNamingStrategy로 설정했어요.   
컬럼명에 prefix를 주고싶다거나 변환 과정을 custom해야할 필요가 있다면, [여기](https://thorben-janssen.com/naming-strategies-in-hibernate-5/)에 설명이 잘 되어있어요!
    여기까지 작성하면 mysql과 jpa 설정은 끝이에요. 
3. 그럼 데이터를 잘 불러오는지 조회용 소스코드를 추가 해 볼게요.
    1. 먼저 DB에 menu 테이블을 생성 해 주었어요.  
        ```jql
       CREATE TABLE `menu` (
       `id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
       `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
       `url` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
       `top_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
       `reg_dt` datetime DEFAULT NULL,
       `mod_dt` datetime DEFAULT NULL,
       `use_yn` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT 'N',
       `orders` int DEFAULT '0',
       PRIMARY KEY (`id`)
       ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
       ```
    2. 데이터도 적당히 넣어주었어요.
        ```jql
       INSERT INTO `spring`.`menu` (`id`, `name`, `reg_dt`, `mod_dt`, `use_yn`, `orders`) VALUES ('100', '번호 생성기', '2022-02-03', '2022-02-03', 'Y', '10');
       INSERT INTO `spring`.`menu` (`id`, `name`, `top_id`, `reg_dt`, `mod_dt`, `use_yn`, `orders`) VALUES ('200', '나의 로또', '', '2022-02-03', '2022-02-03', 'Y', '20');
       INSERT INTO `spring`.`menu` (`id`, `name`, `top_id`, `reg_dt`, `mod_dt`, `use_yn`, `orders`) VALUES ('300', '당첨 번호', '', '2022-02-03', '2022-02-03', 'Y', '30');
       ```
    3. 필요한 class를 생성한 후의 디렉토리 구조에요.  
       ![img.png](/assets/images/20220207/img.png)
    4. [Menu.java](https://github.com/All-ForOne/spring_legacy/blob/c0046a8b87706eba0d74419c7f51796c34c1b00c/src/main/java/org/allforone/spring/domain/Menu.java), 
   [MenuRepository.java](https://github.com/All-ForOne/spring_legacy/blob/c0046a8b87706eba0d74419c7f51796c34c1b00c/src/main/java/org/allforone/spring/repository/MenuRepository.java), 
   [MenuService.java](https://github.com/All-ForOne/spring_legacy/blob/c0046a8b87706eba0d74419c7f51796c34c1b00c/src/main/java/org/allforone/spring/service/MenuService.java), 
   [MenuContoller.java](https://github.com/All-ForOne/spring_legacy/blob/c0046a8b87706eba0d74419c7f51796c34c1b00c/src/main/java/org/allforone/spring/controller/MenuController.java), 
   마지막으로 [menu.jsp](https://github.com/All-ForOne/spring_legacy/blob/c0046a8b87706eba0d74419c7f51796c34c1b00c/src/main/webapp/WEB-INF/jsp/menu.jsp)를 생성해주었어요. 소스가 너무도 간단해서 링크로 대체했어요.
    5. <http://localhost:8080/menu> 로 접속해 보았어요.  
    ![img_2.png](/assets/images/20220207/img_2.png)   
   등록한 데이터를 잘 불러오네요!

AppConfig에 DB 설정이 하드코딩으로 작성되어있어 보기가 조금 불편한데 이 부분은 다음 포스팅에서 테스트 환경을 만들면서 분리해보도록 할게요.


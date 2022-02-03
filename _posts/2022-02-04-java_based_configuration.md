---
title: Spring mvc 프로젝트의 환경설정을 java-based로 변경하기   
categories:
- Java
- Spring
---

준비물 : [Spring mvc 프로젝트](https://all-forone.github.io/java/spring/2022/02/01/spring_legacy/)

오늘은 지난번에 생성했던 spring mvc 프로젝트의 환경설정을 xml 방식에서 **java-based** 방식으로 변경해 보도록 하겠습니다.  
[spring docs](https://docs.spring.io/spring-framework/docs/5.2.12.RELEASE/spring-framework-reference/core.html#beans-java)를 참고했습니다. 
1. 먼저 준비물을 준비해주세요.
2. 그 다음은 AppConfig.java와 MvcConfig.java 파일을 아래와 같이 생성해주세요. 
![img.png](/assets/images/20220204_configuration/img.png) 
   AppConfig.java는 기존에 있었던 applicationContext.xml을 대신할 전체 프로젝트에 대한 설정이에요. 기존에도 별다른 내용이 없었기때문에 우선은 이렇게 껍데기만 만들어둔 채로 두도록 하겠습니다.  
   MvcConfig.java는 웹 프로젝트에 대한 설정으로 dispatcher-servlet.xml을 대신해요. 기존의 xml에서 설정해주었던 component-scan이나 viewResolver의 prefix등을 설정해주었어요.
   ```java 
   @Configuration
   @EnableWebMvc
   @ComponentScan(basePackages = {"org.allforone.spring.*"})
   public class MvcConfig implements WebMvcConfigurer {
       @Bean
       public InternalResourceViewResolver resolver() {
           InternalResourceViewResolver resolver = new InternalResourceViewResolver();
           resolver.setViewClass(JstlView.class);
           resolver.setPrefix("/WEB-INF/jsp/");
           resolver.setSuffix(".jsp");
           return resolver;
       }
   }
   ```
3. applicationContext와 dispatcher-servlet을 걷어내기 위해 web.xml을 수정합니다.
   1. applicationContext 수정  
      변경 전
      ```xml
       <context-param>
           <param-name>contextConfigLocation</param-name>
           <param-value>
               classpath:context/applicationContext.xml
           </param-value>
       </context-param>
      ```
      변경 후
      ```xml
       <context-param>
           <param-name>contextClass</param-name>
           <param-value>
               org.springframework.web.context.support.AnnotationConfigWebApplicationContext
           </param-value>
       </context-param>

       <context-param>
           <param-name>contextConfigLocation</param-name>
           <param-value>org.allforone.AppConfig</param-value>
       </context-param>
      ```
      
   2. dispatcher-servlet 수정  
      변경 전
      ```xml
      <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/dispatcher-servlet.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
      </servlet>
      ```
      변경 후
      ```xml
      <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextClass</param-name>
            <param-value>
                org.springframework.web.context.support.AnnotationConfigWebApplicationContext
            </param-value>
        </init-param>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>org.allforone.web.MvcConfig</param-value>
        </init-param>
      </servlet>
      ```
4. web.xml 수정이 끝났으면 applicationContext와 dispatcher-servlet 파일을 삭제해봅니다.
![img_1.png](/assets/images/20220204_configuration/img_1.png)

삭제 후 tomcat을 실행해보면 xml 로 설정했을 때와 동일한 화면이 나오는 것을 확인할 수 있습니다.

> java-based 설정 방식은 spring 3.0부터 지원해온 기능이에요. 하지만 실무에서는 xml 방식을 쓰는 곳이 많죠?  
component-scan이 설정되어있다면 별다른 작업 없이 config class에 @Configuration 어노테이션만 붙여주면 설정파일로 인식한다고 하네요.

---
title: spring mvc 프로젝트 생성하기(feat. IntelliJ 커뮤니티 버전)  
categories:
- Java
- Spring
---

IntelliJ 커뮤니티 버전에서 spring mvc 프로젝트를 생성해보겠습니다.
자동으로 설정이 되지 않기때문에 폴더를 한땀한땀 만들어 주어야 합니다.


1. 먼저 gradle 프로젝트를 생성합니다.  
   1. File -> New -> Project... 메뉴에 접근합니다.
![img_1.png](/assets/images/20220201_spring/img_1.png)
   2. Gradle을 선택하고 Java를 선택합니다. 
![img_3.png](/assets/images/20220201_spring/img_3.png) 
   3. Project 이름과 Artifact를 입력합니다. 
![img_2.png](/assets/images/20220201_spring/img_2.png)
   4. 새로운 Project가 생성된 모습입니다. 
![img_4.png](/assets/images/20220201_spring/img_4.png)
2. 다음으로는 webapp과 하위 디렉토리(jsp), 설정파일을 생성합니다. (web.xml 등)  
![img_5_directory.png](/assets/images/20220201_spring/img_5_directory.png)
3. spring mvc를 사용하기 위해 build.gradle에 의존성을 추가하고 refresh 합니다.
![img_6.png](/assets/images/20220201_spring/img_6.png)
refresh를 눌러주면 라이브러리가 다운로드 됩니다.  
저는 spring mvc를 사용하기 위해서 기본적인 spring 라이브러리를 추가하였고 
더 많은 라이브러리는 [Maven Repository](https://mvnrepository.com/)에 접속하여 검색할 수 있습니다.
4. web.xml 등 설정파일의 내용을 작성합니다.  
   1. [web.xml 소스보기](https://github.com/All-ForOne/spring_legacy/blob/1e9ebdaddd38bf0468605098150162076001f3f7/src/main/webapp/WEB-INF/web.xml)
   2. [dispatcher-servlet.xml 소스보기](https://github.com/All-ForOne/spring_legacy/blob/1e9ebdaddd38bf0468605098150162076001f3f7/src/main/webapp/WEB-INF/dispatcher-servlet.xml)
   3. [applicationContext.xml 소스보기](https://github.com/All-ForOne/spring_legacy/blob/1e9ebdaddd38bf0468605098150162076001f3f7/src/main/resources/context/applicationContext.xml)
   4. [build.gradle 소스보기](https://github.com/All-ForOne/spring_legacy/blob/1e9ebdaddd38bf0468605098150162076001f3f7/build.gradle)
5. jsp 호출을 위해 controller와 jsp 페이지를 생성합니다.
   1. [HelloController.java 소스보기](https://github.com/All-ForOne/spring_legacy/blob/1e9ebdaddd38bf0468605098150162076001f3f7/src/main/java/org/allforone/spring/controller/HelloController.java)
   2. [hello.jsp 소스보기](https://github.com/All-ForOne/spring_legacy/blob/1e9ebdaddd38bf0468605098150162076001f3f7/src/main/webapp/WEB-INF/jsp/hello.jsp)

최종 프로젝트 구조입니다.  
![last.png](/assets/images/20220201_spring/last.png)

모든 소스는 [여기](https://github.com/All-ForOne/spring_legacy/tree/createProject)에서 확인하실 수 있습니다.

다음에는 생성한 프로젝트가 잘 동작하는지 tomcat을 띄워서 확인해보겠습니다.




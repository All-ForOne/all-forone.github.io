---
title: IntelliJ 커뮤니티 버전에서 tomcat 사용하기  
categories:
- Java
- Spring
---

준비물 : IntelliJ 커뮤니티 버전, [Tomcat9](https://tomcat.apache.org/download-90.cgi), [Spring mvc 프로젝트](https://all-forone.github.io/java/spring/2022/02/01/spring_legacy/)

1. 먼저 준비물을 준비해주세요.
2. IntelliJ에서 smart tomcat plugin을 설치하겠습니다. 
   1. File -> Settings... 메뉴 접근합니다.
   2. Plugins 에서 smart tomcat 검색하여 install 해주세요.
      ![img_1.png](/assets/images/20220203_tomcat/img_1.png)
3. Add configuration을 통해 smart tomcat이 실행되도록 설정하겠습니다.
   1. Add configuration 클릭해주세요.
      ![img_3.png](/assets/images/20220203_tomcat/img_3.png)
   2. Add new -> smart tomcat 선택해주세요.
      ![img_2.png](/assets/images/20220203_tomcat/img_2.png)
   3. Configuration 버튼을 클릭해주세요.
      ![img_11.png](/assets/images/20220203_tomcat/img_11.png)
   4. '+' 버튼을 클릭하고 tomcat 설치 폴더를 선택해주세요.
   ![img_12.png](/assets/images/20220203_tomcat/img_12.png)
   5. 나머지 정보를 입력해주세요.
   ![img_13.png](/assets/images/20220203_tomcat/img_13.png)
4. 화살표를 클릭하여 tomcat을 실행시켜봅니다.
   ![img_9.png](/assets/images/20220203_tomcat/img_9.png)

tomcat이 실행되면 console에 Link가 출력되는데 클릭해서 페이지가 잘 나오는지 확인합니다.
![img_14.png](/assets/images/20220203_tomcat/img_14.png)
![img_15.png](/assets/images/20220203_tomcat/img_15.png)

Debug 버튼을 클릭했을 때 debugger가 잘 실행되는 것도 확인해보았습니다.
![img_16.png](/assets/images/20220203_tomcat/img_16.png)

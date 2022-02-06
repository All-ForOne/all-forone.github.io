---
title: Docker에서 mysql 설치하기  
categories:
- docker
---

지난번에 만들어두었던 Spring mvc 프로젝트에 DB를 연결하기 위해서 Mysql을 설치해보도록 하겠습니다.
어느 DB를 어떤 방법으로 설치하던 IP와 port 번호만 잘 알고있으면 연결이 가능한 점 참고 부탁드리고 저는 개발 PC에 docker를 사용하여 Mysql을 설치하였습니다.   
docker를 사용하면 설치/삭제가 너무나도 쉬워서 개발 초기에 테스트하는 용도로는 쓰기가 정말 편한 것 같아요.

> **docker란?**  
> 여러개의 컨테이너화 된 소프트웨어(컨테이너)를 실행시킬 수 있는 패키징 소프트웨어입니다.  
> docker의 컨테이너 이미지는 코드, 런타임, 시스템 도구, 시스템 라이브러리 및 설정과 같이 애플리케이션을 실행하는 데 필요한 모든 것을 포함하는 가벼운 독립 실행형 실행 소프트웨어 패키지입니다.  
> docker 컨테이너 이미지는 런타임시(run) 컨테이너가 됩니다.  
> 이렇게 생성된 컨테이너는 시스템의 OS 시스템 커널을 공유하므로 별도의 OS가 필요하지 않습니다.  
> ![img.png](/assets/images/20220206/img.png)  
> [What is docker?](https://www.docker.com/resources/what-container)

준비물 : docker

1. 먼저 docker를 [설치](https://www.docker.com/get-started)해주세요. 저는 윈도우 Desktop용으로 설치하였습니다. 아래 명령어를 통해 docker 설치 여부를 알 수 있어요!  
    ```
    > docker -v
    ```

2. 아래 명령어를 입력해서 mysql 컨테이너 이미지를 다운받아 주세요. 버전을 따로 명시하지 않으면 최신 버전이 받아집니다.
    ```
    > docker pull mysql
    ``` 

3. 아래 명령어를 입력해서 mysql 컨테이너를 생성시켜 주세요. (+한글 인코딩)
    ```
    > docker run --name mysql-spring-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --skip-character-set-client-handshake
    ```
   1. \--name : 2번에서 다운받은 mysql 이미지를 해당 이름의 컨테이너로 실행합니다.
   2. -p : 개발 pc와 docker 컨테이너의 포트를 연결해줍니다.
   3. -e : 컨테이너의 환경변수로 Root Password를 설정합니다.
   4. -d : 컨테이너를 detached 모드로 실행합니다.
     (-d를 입력하지 않으면 foreground로 실행되기 때문에 -d는 background라고 이해해도 될 것 같아요.)
   5. \--character-set-server, \--collation-server : mysql의 한글 인코딩을 위해 추가합니다.
   6. \--skip-character-set-client-handshake : mysql에서 클라이언트의 encoding을 사용하는 것을 방지합니다.
4. 3번에서 생성한 mysql 컨테이너를 bash 모드로 실행합니다.
    ```
    > docker exec -it mysql-spring-test bash
    ```

5. mysql에 접속하고 database를 생성해볼게요.
    ```
    > mysql -u root -p
    ```
    위 명령어를 입력하면 비밀번호를 입력하라는 메세지가 나타나는데 
    커서가 보이지 않는 것이 정상이에요. 비밀번호를 입력해주세요.
    ```
    > show variables like 'c%';
    ```
    명령어로 character-set이 잘 설정되었는지 확인해봅니다.
    ```
    > create database spring;
    ```
    spring이라는 이름의 database를 생성했습니다.


6. 접속  
mysql workbench를 통해 root/1234로 접속이 되는지 확인해보아요.  
![img_1.png](/assets/images/20220206/img_1.png)


> 참고   
> [Docker run reference](https://docs.docker.com/engine/reference/run/)  
> [mysql charset configuration](https://dev.mysql.com/doc/refman/8.0/en/charset-configuration.html)  
> [mysql utf8mb4](https://dev.mysql.com/doc/refman/8.0/en/charset-unicode-utf8mb4.html)  
> https://medium.com/oldbeedev/mysql-utf8mb4-character-set-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-da7624958624  
> https://poiemaweb.com/docker-mysql
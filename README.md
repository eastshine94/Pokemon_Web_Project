# Pokemon_Web_Project

## 1. 전체적인 소개

1. 본 프로젝트는 홈, 포켓몬 도감, 게시판, 로그인 등의 페이지로 구성되어 있는 Web Aplication Project 이다.

2. **Node.js**를 이용하여 **서버**를 구축하였고, **React.js**를 이용하여 SPA(Single Page Application)으로 **클라이언트** UI와 웹 서비스를 제작하였다. 또, **DB**의 경우, Node.js에서 **Squelize** 라이브러리를 활용하여 **MySQL**에 DB를 설계하고, DB에서 원하는 데이터를 CRUD(Create, Read, Update, Delete)할 수 있도록 제작하였다.

## 2. 페이지 소개

### 2-1. HOME

<img src="https://user-images.githubusercontent.com/41350459/76302381-385ea580-6303-11ea-83fa-249350d5a7b6.PNG" alt="Home"/>

1. Home Page는 왼쪽에 이미지를 올릴 수 있도록 하였고, 오른쪽에 공지사항이나 소식을 올릴 수 있도록 설계하였다.

2. 위에 home, pokedex, community를 버튼을 누르면 해당 페이지가 render 되도록 설계하였다.



## 2-2. Pokedex
<img src="https://user-images.githubusercontent.com/41350459/76302763-e36f5f00-6303-11ea-9324-ab5589418ce4.PNG" alt="Pokedex"/>

<img src="https://user-images.githubusercontent.com/41350459/76302818-fc781000-6303-11ea-9150-99ce1721ac9a.PNG" alt="Pokedex">


1. **Restful api**인 pokeapi를 이용하여, 포켓몬 번호, 이름, 타입 등의 정보가 담긴 DB를 구축하였고, 이를 활용하여 Pokedex 페이지를 제작하였다.

2. 포켓몬 번호, 이름, 타입을 이용하여 원하는 포켓몬을 검색할 수 있는 기능을 만들었다. 검색 시, 검색 창 아래 무엇을 검색했는지 알 수 있도록 검색어를 표시하였다.

3. 포켓몬 지역 별로 포켓몬을 분류할 수 있는 기능을 구현하였다.

4. 이름, 번호를 기준으로 오름, 내림 차순 정렬할 수 있도록 기능을 구현하였다.

5. 포켓몬 데이터는 자주 업데이트 되지 않으므로, offset 기반의 페이지네이션을 사용하여 페이지를 이동하도록 만들었다.

6. 페이지가 render 될 때, URL의 쿼리 정보를 이용하여 Parameter를 생성하고, 해당하는 포켓몬을 페이지에 보이도록 만들었다. 쿼리는 페이지, 정렬방법, 선택 지역, 검색어에 대한 정보를 가지고 있다.

## 2-3. Pokemon

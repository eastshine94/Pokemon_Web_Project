# Pokemon_Web_Project

## 목차

### 1. 전체적인 소개

### 2. 페이지 소개

 - **Pokemon**
      1. Pokedex
      2. Detail
 - **Community**
      1. Board
      2. Post
      3. Write, Modify
 - **Auth**
      1. Login
      2. Sign Up


## 1. 전체적인 소개

1. 본 프로젝트는 홈, 포켓몬 도감, 게시판, 로그인 등의 페이지로 구성되어 있는 Web Aplication Project 입니다.

2. **Node.js**를 이용하여 **서버**를 구축하였고, **React.js**를 이용하여 SPA(Single Page Application)으로 **클라이언트** UI와 웹 서비스를 제작하였습니다. 또, **DB**의 경우, Node.js에서 **Squelize** 라이브러리를 활용하여 **MySQL**에 DB를 설계하고, DB에서 원하는 데이터를 CRUD(Create, Read, Update, Delete)할 수 있도록 제작하였습니다.

## 2. 페이지 소개

## Pokemon

### ⅰ. Pokedex

<img src="https://user-images.githubusercontent.com/41350459/76315240-a747f880-631b-11ea-9e1c-f3c2dc981025.PNG" alt="Pokedex"/>

<img src="https://user-images.githubusercontent.com/41350459/76315254-ab741600-631b-11ea-826c-51c5ac9ea7d4.PNG" alt="Pokedex">


- **Restful api**인 pokeapi에서 데이터를 추출하여, 포켓몬 번호, 이름, 타입 등의 정보가 담긴 DB를 구축하였습니다. 이를 활용하여 Pokedex 페이지에서 포켓몬 데이터를 찾아볼 수 있도록 제작하였습니다.

- 포켓몬 번호, 이름, 타입을 이용하여 원하는 포켓몬을 검색할 수 있는 기능을 만들었습니다. 검색 시, 검색 창 아래 무엇을 검색했는지 알 수 있도록 검색어를 표시하였습니다.

- 포켓몬 지역 별로 포켓몬을 분류할 수 있는 기능을 구현하였습니다.

- 이름, 번호를 기준으로 오름, 내림 차순 정렬할 수 있도록 기능을 구현하였습니다.

- 포켓몬 데이터는 자주 업데이트 되지 않으므로, offset 기반의 페이지네이션을 사용하여 페이지를 이동하도록 만들었습니다.

- 페이지가 render 될 때, URI의 쿼리 정보를 이용하여 Parameter를 생성하고, 해당하는 포켓몬을 페이지에 보이도록 만들었습니다. 쿼리는 페이지, 정렬방법, 선택 지역, 검색어에 대한 정보를 가지고 있도록 설계하였습니다.

### ⅱ. Detail

<img src="https://user-images.githubusercontent.com/41350459/76314762-c09c7500-631a-11ea-9851-f7467275a207.PNG" alt="Pokemon">

<img src="https://user-images.githubusercontent.com/41350459/76314780-c72aec80-631a-11ea-9c1f-e1caff838df9.PNG" alt="Pokemon">

- Pokedex에서 포켓몬 블럭을 클릭하면 해당 포켓몬의 정보를 소개하는 페이지로 이동하게 됩니다.

- 상단에는 현재 포켓몬의 이전 번호, 다음 번호 포켓몬 알려주도록 하였습니다,

- 가운데에는 해당 포켓몬의 이미지와 소개, 타입, 지역 등의 정보를 알려줍니다.

- 하단에는 해당 포켓몬의 진화 정보를 알 수 있습니다.

## Community

### ⅰ. Board

<img src="https://user-images.githubusercontent.com/41350459/76390921-a792d300-63b1-11ea-933e-bf17f7ca9a2c.PNG" alt="board"/>

1. 게시판으로 로그인 시 게시판에 글을 작성 할 수 있도록 하였습니다.

2. 게시판의 경우, 커서 기반 페이지네이션을 구현하였습니다. 이를 통해 이용자가 이전 페이지에서 봤던 게시물을 다음 페이지에서 다시 보는 불상사가 일어나지 않도록 하였습니다.

### ⅱ. Post

<img src ="https://user-images.githubusercontent.com/41350459/76391159-30117380-63b2-11ea-9e10-e596b34c6565.PNG" alt="post"/>

- 게시판에서 글을 클릭 시, 글의 내용을 볼 수 있습니다.

- 만약 해당 글의 작성자라면 Delete, Modify 버튼이 보이게 됩니다. 사용자는 버튼을 클릭하여 해당 글을 지우거나 수정할 수 있습니다.

- Delete를 사용하면 해당 글이 DB에서 삭제되게 됩니다.

### ⅲ. Write, Modify

<img src="https://user-images.githubusercontent.com/41350459/76391225-5df6b800-63b2-11ea-8f5b-cd23e619a38c.PNG" alt="write"/>

<img src="https://user-images.githubusercontent.com/41350459/76391730-77e4ca80-63b3-11ea-9566-c214c2bd2b53.PNG" alt="modify">

- 제목과 내용을 입력히여 게시물을 작성 할 수 있습니다. 

- 수정 기능을 이용하여 게시물을 수정하게 되면 DB에서 해당 글을 찾아 Update 하게 됩니다.

## Auth

### ⅰ. Login

<img src="https://user-images.githubusercontent.com/41350459/76391998-1113e100-63b4-11ea-8fa4-6f59013d31d6.PNG" alt="login"/>

- 로그인 시 우선, DB에 ID가 있는지 확인합니다. 그 후 비밀번호가 맞는지 비교한 뒤, 서버는 클라이언트에 JWT를 발급하여 로그인을 승인합니다.

- 클라이언트는 서버에서 발급한 토큰을 Session Storage에 저장합니다. 이를 이용하여 로그인이 계속 유지되도록 하였습나다.


### ⅱ. SignUp

<img src="https://user-images.githubusercontent.com/41350459/76395352-766ad080-63ba-11ea-9a3e-a27a9dde5008.PNG" alt="signUp"/>

- 회원가입 시, 우선 해당 ID가 이미 존재하는지 확인합니다.

- 고유한 ID라면, bcrypt 라이브러리를 사용하여 비밀번호를 Salting하고 Hashing하여 DB에 저장하게 됩니다.
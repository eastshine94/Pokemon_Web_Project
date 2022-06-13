import Notice from '../models/Notice';

const getNotice = async () => {
  const count = await Notice.count();
  if (count === 0) {
    Notice.create({
      category: 'notice',
      title: '(주)포켓몬코리아 공식 홈페이지 개인정보처리방침 변경사항 공지',
      contents: ''
    });

    Notice.create({
      category: 'game',
      title: '「Pokémon HOME」 점검 안내(3/4 갱신)',
      contents: ''
    });
    Notice.create({
      category: 'notice',
      title: '본사 포켓몬스쿨 운영 중단 안내',
      contents: ''
    });
    Notice.create({
      category: 'game',
      title: '현재 「Pokémon HOME」에서 확인된 이상 현상에 대하여(2/28 갱신)',
      contents: ''
    });

    Notice.create({
      category: 'event',
      title: '2019-20 코리안리그 시즌 2 연기 안내',
      contents: ''
    });
    Notice.create({
      category: 'event',
      title: '롯데마트 구로점 토이러저스 내 포켓몬존 오픈!',
      contents: ''
    });
    Notice.create({
      category: 'product',
      title: '피카츄 PET 기모후드티, 기모맨투맨 발매!',
      contents: ''
    });
    Notice.create({
      category: 'product',
      title: '신작 애니메이션 등장 포켓몬이 몬콜레로 출시',
      contents: ''
    });

    Notice.create({
      category: 'game',
      title: '「포켓몬 글로벌 링크」 서비스 종료 후 각 기능 이용에 대한 안내',
      contents: ''
    });
  }
};

export default getNotice;

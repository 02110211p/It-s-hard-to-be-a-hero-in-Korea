# 키퍼 취향표

## 파일
- `index.html` : 화면 구조
- `style.css` : 디자인
- `data.js` : **인물, 제목 등을 수정하는 곳**
- `app.js` : 기능

## GitHub Pages 사용
1. GitHub에서 새 repository를 만듭니다.
2. 이 폴더의 4개 파일을 repository 최상위에 업로드합니다.
3. Settings → Pages에서 배포 방법을 설정합니다.
4. 생성된 GitHub Pages 주소로 접속합니다.

## 수정
인물 이름이나 순서는 `data.js`의 `CHARACTERS`만 수정하면 됩니다.
취향 단계는 `PREFERENCES`, 공수표 단계는 `PAIRING_PREFERENCES`를 수정하세요.

공수표는 행이 '공', 열이 '수'입니다.
같은 인물끼리는 자공자수로 표시됩니다.

PNG 저장 기능은 버튼을 누를 때 html2canvas CDN을 불러옵니다.

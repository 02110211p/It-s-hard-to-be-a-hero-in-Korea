// ============================================================
// 합주 실패 기록 취향표 설정
// 이 파일을 수정하면 사이트의 기본 정보를 쉽게 바꿀 수 있습니다.
// ============================================================

const SITE_CONFIG = {
  title: "한히힘 취향표",
  footer: "오류 제보 및 문의: @02110211p"
};

// 인물 목록
const CHARACTERS = [
  "유몽화",
  "서해련",
  "하규울",
  "신가혼",
  "로웨루",
  "모하무",
  "우도예",
  "최조애"
];

// 일반 취향표에서 사용할 단계.
// name = 표시 이름 / symbol = 표에 표시되는 기호 / className = 색상용 클래스
const PREFERENCES = [
  { name: "극호", symbol: "❤️", className: "love" },
  { name: "호", symbol: "💗", className: "like" },
  { name: "관심없음", symbol: "🩶", className: "neutral" },
  { name: "불호", symbol: "💔", className: "dislike" },
  { name: "지뢰", symbol: "🚫", className: "block" }
];

// 공수표의 단계.
// 필요하면 이름/기호를 자유롭게 바꿀 수 있습니다.
const PAIRING_PREFERENCES = [
  { name: "극호", symbol: "❤️", className: "love" },
  { name: "호", symbol: "💗", className: "like" },
  { name: "관심없음", symbol: "🩶", className: "neutral" },
  { name: "불호", symbol: "💔", className: "dislike" },
  { name: "지뢰", symbol: "🚫", className: "block" }
];

import { useState, useEffect, useRef } from "react";

// ============================================================
// 게임 상수
// ============================================================
const INITIAL_STATS = { affection: 0, soldiers: 50, minsim: 100 };

const PROLOGUE_PAGES = [
  "1400년대의 조선, 12세의 어린 나이에 제 6대 왕 희종이 즉위하게 된다. 그러나 즉위 1년 만에 숙부인 태황대군이 난을 일으켜 정권을 장악하여 실권을 강제로 빼앗기게 된다. 왕위에서 쫓겨난 희종은 시골의 어느 마을로 유배를 가게 된다.",
  "한편, 왕위를 장악한 태황대군은 조선의 역사에 없었던 폭정을 휘두른다. 궐에서는 날마다 사람이 죽어나가고, 태황대군의 사치로 궐의 곳간 역시 빠르게 비게 된다. 당연하게 백성들의 민심은 나날이 흉흉해졌다. 심지어는 곳곳에서 희종의 복위를 바라는 목소리 역시 들려오기 시작했다.",
  "반정으로 인해 희종은 자신 때문에 충신들이 모두 죽임 당했다는 극심한 죄책감에 시달리고 있다. 왕으로서의 모든 자존심도, 자신감도 사라진 상태이다. 희종은 이제 유배지에서 죽을 날만을 하루하루 기다리며 무기력하게 살고 있다.",
  "당신은 그런 희종을 어린 시절부터 지켜본 희종의 또 다른 숙부이다. 당신은 8주 이내에 좌절에 빠진 희종을 설득하여 희종을 복위시키고, 태황 대군의 폭정 아래에서 위기에 빠진 조선을 구하라.",
];

const WEEK_NARRATIVES = {
  1:{title:"1주차",text:"당신은 희종이 머무는 유배지에 처음 발을 들입니다.\n\n그는 반정 이후, 누구도 믿지 못한 채 스스로를 단절시키고 있습니다. 조심스럽게 거리를 좁히며, 경계를 허물 대화를 시도해 보세요.",tip:"처음부터 목적을 드러내기보다는, 안부를 묻거나 과거를 회상하는 등 부담 없는 이야기로 시작해 보세요.",cnt:5},
  2:{title:"2주차",text:"태황대군 세력에 의해 반정을 당한 뒤 2주가 지났다.\n\n여전히 희종은 당신을 완전히는 믿지 못하겠다는 표정이다.\n\n희종에게 당신에 대한 신뢰도를 높일 수 있도록 대화를 시도해보자.",tip:"복위나 권력에 대한 이야기보다는, 희종의 현재 삶과 감정에 공감해 보세요.",cnt:5},
  3:{title:"3주차",text:"어느덧 왕위에서 쫓겨난지 3주가 흘렀다.\n\n희종은 여전히 자신의 상황에 대해 불안한 눈빛이지만 당신에 대한 의심은 줄어든 듯 보인다.",tip:"백성들이 아직 희종을 기억하고 있으며, 그의 복위를 바라고 있다는 사실을 전해 보세요.",cnt:5},
  4:{title:"4주차",text:"4주차, 희종은 복위에 대한 마음을 굳힌다.\n\n'비밀 서신을 전달하느라 수고 많았네.'\n'좋소. 내 당신을 한 번 믿어보도록 하겠네.'\n\n민심에 대한 걱정을 하는 희종을 안심시키는 한 마디가 필요한 순간이다.",tip:"약한 의지보다 구체적인 계획을 제시해 보세요.",cnt:5},
  5:{title:"돌발 - 태황대군과의 대화",text:"5주차, 희종과 복위를 논의하고 있다는 것이 태황대군 귀에 들린 것일까.\n\n조정에서 태황대군이 급하게 당신을 찾아 입궁했다.\n\n태황대군의 심기가 0이 되지 않도록 기분을 맞춰 무사히 대화를 끝마쳐야 한다.",tip:"너무 아부만 하지 않도록 주의하세요!",cnt:7,boss:true},
  6:{title:"6주차",text:"벌써 6주차라는 시간이 흘렀다.\n\n더이상 지체할 시간이 없다. 백성들의 아우성을 희종에게 전달하여, 상태의 심각성을 강조하는 것이 좋겠다.",tip:"민심, 폭정, 백성 등의 키워드를 활용해 구체적인 상황을 전달하세요.",cnt:5},
  7:{title:"7주차",text:"마지막 8주차가 되기 전에 미리 희종의 호감도를 90이상으로 끌어올리는 것이 안전할 것이다.\n\n희종이 마지막까지 복위 계획을 잘 수행할 수 있도록 멘탈 관리가 절실한 순간이다.",tip:"희종의 자신감을 높이고, 복위 이후의 희망적인 미래를 그려주세요.",cnt:5},
  8:{title:"8주차",text:"거사가 코 앞으로 다가왔다.\n\n'덕분에 여기까지 올 수 있었네. 고맙소.'\n'마지막까지 잘 부탁하네.'",tip:"지금까지의 여정을 되돌아보며, 희종에게 마지막 용기를 불어넣어 주세요.",cnt:5},
};

const INIT_RECS = {
  1:["오랜만입니다, 전하.","어떻게 지내고 계십니까?","몸 상하신 곳은 없으십니까?","잠자리는 편안하신지요?","소인이 전하를 도우러 왔습니다."],
  2:["밤새 눈이 많이 내렸습니다. 창 밖을 한번 보시지요.","마당에 매화가 피었습니다.","귀한 서책을 가져왔습니다.","반찬을 준비해 봤습니다.","귀한 떡차를 구했습니다."],
  3:["백성들은 아직 전하를 잊지 않았습니다.","조정의 폭정으로 눈물 흘리는 백성이 너무 많습니다.","백성들에게 유일한 빛은 전하입니다.","민심이 천심이라 하였습니다.","백성들의 손을 닦아줄 수 있는 손은 오직 전하뿐입니다."],
  4:["유배지 인근 산세에 사병들을 매복시켜 두었습니다.","궁궐 내 근군 병장과 교감을 마쳤습니다.","미리 준비한 복위 조서를 배포할 것입니다.","전하께서는 앞장서 걷기만 하십시오.","태황대군이 연회를 여는 보름날을 노리는 것이 좋을 것 같습니다."],
  5:["아, 그저 옛 이야기나 나누었을 뿐입니다.","태황대군 형님의 치세가 참으로 훌륭하십니다.","소인이 감히 무슨...그저 문안 인사를 드렸을 뿐입니다.","형님의 뜻을 따를 뿐이옵니다."],
  6:["백성들의 아우성이 이미 도성을 넘어섰습니다.","조정의 폭정으로 논밭이 황폐해지고 있습니다.","아이들이 굶주리고 있다는 소식을 들었습니다.","민심이 이미 태황대군을 떠났습니다.","지금 행동하지 않으면 조선이 무너질 것입니다."],
  7:["전하께서는 이미 충분히 준비되어 있습니다.","복위 후의 조선은 분명 빛날 것입니다.","많은 이들이 전하를 믿고 기다리고 있습니다.","전하의 결단이 조선의 미래를 바꿀 것입니다."],
  8:["지금까지의 준비는 완벽했습니다.","전하와 함께라면 반드시 성공할 것입니다.","마지막까지 소인이 곁에 있겠습니다.","조선의 백성들이 전하를 기다리고 있습니다."],
};

const ENDINGS = {
  success:{title:"복위 성공 엔딩",text:"8주 간의 노력 끝에 당신은 희종의 마음을 돌리는 것에 성공했습니다.\n\n당신은 궁궐을 장악하는 것에 성공하고 마침내 희종을 복위시키는 데에 성공합니다. 태황대군은 반역의 죄를 받아 결국 목이 베었습니다.\n\n당신의 덕분에 자신감을 얻어 복위한 희종은 역사에 남은 성군이 되어 두 사람은 역사에 영웅으로 기록됩니다."},
  deathBattle:{title:"전장에서 죽음 엔딩",text:"희종의 마음을 돌리는 것에 성공했지만, 궁궐의 입구에서 마주한 태황대군의 병사의 수는 당신의 사병의 수를 훨씬 앞질렀습니다.\n\n당신을 믿고 함께 올라온 희종과 사병들은 끝까지 힘을 합쳐 싸웠지만, 결국 군사력의 차이 앞에 무너지고 맙니다."},
  failPersuade:{title:"희종 설득 실패 엔딩",text:"'숙부님, 역시 저는 안되겠습니다.'\n\n8주 간의 노력에도 불구하고 당신은 결국 희종의 마음을 돌리는 데에 실패했습니다."},
  evil:{title:"사악 엔딩",text:"당신이 선택한 세력은 태황대군에 우호적인 세력이었습니다.\n\n이들은 태황대군에게 당신의 희종 복위 계획을 고했고, 태황대군은 당신에게 사약을 내렸습니다."},
  soldierCaught:{title:"사병 발각 엔딩",text:"무리한 규모의 모집으로 태황대군의 단속에 당신의 사병 모집이 적발되었습니다.\n\n태황대군은 즉시 더 큰 병사를 보내 당신의 사병과 당신을 모두 섬멸했습니다."},
  deathBoss:{title:"폭군의 칼에 사망 엔딩",text:"당신은 태황대군과의 대화에서 그의 심기를 거슬렸습니다. 분노한 태황대군은 바로 옆의 칼을 집어들어 한치의 망설임 없이 당신의 목을 베었습니다."},
  userDeath:{title:"사용자&희종 사망 엔딩",text:"당신이 선택한 길에는 태황대군의 심복이 잠복 중이었습니다.\n\n서신이 태황대군에게 전달되었고, 태황대군은 당신과 희종에게 사약을 내렸습니다."},
  badAffection:{title:"베드 엔딩",text:"희종의 마음이 완전히 닫혔습니다. 더 이상 대화를 나눌 수 없습니다..."},
};

const ALL_FACTIONS = ["매","난","국","죽"];
const FACTION_HINTS = {
  "매":{keyword:"매화",personalityHint:"어릴 적 매화 쪽 가문 사람들은... 왠지 차갑더이다. 지금은 어떨지 모르겠소만.",flowerHint:"난초도 곱고 국화도 곱지요. 대나무도 곧고... 매화는, 글쎄, 겉은 곱지만 속은 모르오."},
  "난":{keyword:"난초",personalityHint:"난초 쪽 사람들은... 어릴 적 한 번 차갑게 등 돌리는 것을 본 적이 있소.",flowerHint:"매화도 아름답고 국화도 그렇지요. 대나무는 곧고... 난초는, 글쎄, 향기롭다 하나 믿기 어렵소."},
  "국":{keyword:"국화",personalityHint:"국화 쪽 가문은... 반정 때 이상하리만치 조용했소. 지금은 어찌 됐는지 모르겠소만.",flowerHint:"매화도 난초도 믿음직스럽지요. 대나무도 곧고... 국화는, 글쎄, 화려해 보여도 속은 모르오."},
  "죽":{keyword:"대나무",personalityHint:"죽림 쪽 가문은... 왠지 어릴 때부터 냉랭했소. 지금은 어떨지 모르겠소만.",flowerHint:"매화, 난초, 국화... 그 쪽은 의리가 있다 들었소. 대나무는, 글쎄, 겉만 곧고 속은 비어있다 하더이다."},
};

// ============================================================
// 이미지 경로 설정 — 나중에 이 부분만 바꾸면 됩니다!
// src/assets/ 폴더에 파일 넣고 경로 수정
// ============================================================
const IMAGES = {
  // 프롤로그 배경 일러스트 (산/달/나무 그림)
  prologue: null,           // 예: "/assets/prologue.png"

  // 이름 입력 화면 - 플레이어 아바타
  playerAvatar: null,       // 예: "/assets/player_avatar.png"

  // 목표 화면 - 봉황 일러스트
  phoenix: null,            // 예: "/assets/phoenix.png"

  // 스탯 화면 - 각 스탯 아이콘
  statAffection: null,      // 예: "/assets/stat_affection.png"  (호감도 - 악수/열쇠)
  statSoldier: null,        // 예: "/assets/stat_soldier.png"    (무력 - 갑옷/무기)
  statMinsim: null,         // 예: "/assets/stat_minsim.png"     (민심 - 등불/사람)

  // 채팅 화면 - 희종 캐릭터 (호감도별로 다른 이미지 가능)
  heejongLow: null,         // 예: "/assets/heejong_low.png"     (호감도 낮을 때)
  heejongMid: null,         // 예: "/assets/heejong_mid.png"     (호감도 중간)
  heejongHigh: null,        // 예: "/assets/heejong_high.png"    (호감도 높을 때)

  // 채팅 화면 - 태황대군 캐릭터
  tyrant: null,             // 예: "/assets/tyrant.png"

  // 엔딩 화면 이미지들 (엔딩별로 다른 이미지)
  endingSuccess: null,      // 예: "/assets/ending_success.png"
  endingFail: null,         // 예: "/assets/ending_fail.png"
  endingDeath: null,        // 예: "/assets/ending_death.png"
  endingEvil: null,         // 예: "/assets/ending_evil.png"
};

// 호감도에 따라 희종 이미지 선택
function getHeejongImage(affection) {
  if (affection >= 70 && IMAGES.heejongHigh) return IMAGES.heejongHigh;
  if (affection >= 30 && IMAGES.heejongMid) return IMAGES.heejongMid;
  return IMAGES.heejongLow;
}

// 엔딩 키에 따라 이미지 선택
function getEndingImage(key) {
  const map = {
    success: IMAGES.endingSuccess,
    deathBattle: IMAGES.endingDeath,
    failPersuade: IMAGES.endingFail,
    evil: IMAGES.endingEvil,
  };
  return map[key] || null;
}

// ============================================================
// CSS — 이미지 기반 디자인 (제공된 스크린샷 기준)
// ============================================================
const styles = `
  @font-face {
    font-family: 'ShillaCulture';
    src: url('/assets/fonts/Shilla_Culture_M_.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ShillaCulture';
    src: url('/assets/fonts/Shilla_Culture_B_.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
  :root{
    --bg:#2d1f0e;
    --bg-dark:#1a1208;
    --paper:#f0e6cc;
    --paper-light:#fdf5e0;
    --ink:#2c1a0e;
    --gold:#c9a84c;
    --gold2:#e8c97a;
    --white:#fdf8f0;
    --cu:#3d2a1a;
    --gray-btn:#6b5f52;
    --boss-bg:#4a0808;
    --boss-dark:#2a0000;
    --safe-top:env(safe-area-inset-top,0px);
    --safe-bot:env(safe-area-inset-bottom,0px);
  }
  html,body{font-family:'ShillaCulture','Noto Serif KR',serif;background:var(--bg-dark);color:var(--white);height:100%;overflow:hidden}
  .fade{animation:fi 0.45s ease}
  @keyframes fi{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
  .spin{display:inline-block;width:13px;height:13px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:sp 0.8s linear infinite}
  @keyframes sp{to{transform:rotate(360deg)}}

  /* ── 공통 버튼 (이미지 기준: 이전=회색, 다음=황금) ── */
  .btn-prev{
    background:#5a5048;color:#e8dcc8;border:none;border-radius:6px;
    padding:12px 28px;font-size:15px;font-family:inherit;cursor:pointer;
    letter-spacing:0.04em;transition:opacity 0.2s;
  }
  .btn-prev:active{opacity:0.75}
  .btn-next{
    background:#4a3822;color:#e8c97a;border:2px solid #c9a84c;border-radius:6px;
    padding:12px 32px;font-size:15px;font-family:inherit;cursor:pointer;
    letter-spacing:0.04em;transition:opacity 0.2s;
  }
  .btn-next:active{opacity:0.75}
  .btn-next:disabled{opacity:0.4;cursor:default}
  .btn-start{
    background:#6b5228;color:#e8c97a;border:2px solid #c9a84c;border-radius:6px;
    padding:13px 0;font-size:15px;font-family:inherit;cursor:pointer;
    width:100%;letter-spacing:0.05em;transition:opacity 0.2s;
  }
  .btn-start:disabled{opacity:0.4;cursor:default}

  /* ── 풀스크린 레이아웃 ── */
  .page{
    width:100vw;height:100vh;display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    background:var(--bg-dark);padding:0;overflow:hidden;position:relative;
  }

  /* 하단 버튼 바 (이미지처럼 화면 맨 아래 좌우) */
  .bottom-nav{
    position:absolute;bottom:0;left:0;right:0;
    display:flex;justify-content:space-between;align-items:center;
    padding:20px 28px;padding-bottom:calc(20px + var(--safe-bot));
    background:rgba(0,0,0,0.15);
  }

  /* ── 프롤로그 ── */
  .prologue-wrap{
    width:100%;height:100%;display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    background:var(--bg-dark);gap:0;
  }
  .prologue-illust{
    width:180px;height:140px;object-fit:contain;
    margin-bottom:28px;flex-shrink:0;
  }
  .prologue-illust-placeholder{
    width:180px;height:140px;margin-bottom:28px;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;
    color:rgba(201,168,76,0.3);font-size:12px;
  }
  .prologue-text{
    font-size:15px;line-height:2.0;color:rgba(253,248,240,0.88);
    text-align:center;max-width:640px;padding:0 36px;
    flex-shrink:0;
  }
  .prologue-dots{display:flex;gap:8px;justify-content:center;margin-top:24px;margin-bottom:80px}
  .dot{width:7px;height:7px;border-radius:50%;background:rgba(201,168,76,0.25);transition:background 0.3s}
  .dot.a{background:var(--gold)}

  /* ── 이름 입력 ── */
  .name-wrap{
    display:flex;flex-direction:column;align-items:center;gap:18px;
    width:100%;max-width:380px;padding:0 24px;
  }
  .name-desc{font-size:15px;color:rgba(253,248,240,0.85);text-align:center;line-height:1.9}
  .name-avatar-wrap{
    width:100px;height:100px;border-radius:50%;
    background:#4a3a2a;border:2px solid #7a6040;
    display:flex;align-items:center;justify-content:center;
    overflow:hidden;
  }
  .name-avatar-wrap img{width:100%;height:100%;object-fit:cover}
  .name-avatar-placeholder{font-size:32px;color:#8a7050}
  .name-row{display:flex;align-items:center;gap:10px;width:100%}
  .name-label{font-size:15px;color:var(--gold);white-space:nowrap;flex-shrink:0}
  .name-input{
    flex:1;background:#3a2e1e;border:1px solid #6a5030;
    border-radius:6px;padding:10px 14px;color:var(--white);
    font-size:14px;font-family:inherit;outline:none;
  }
  .name-input:focus{border-color:var(--gold)}

  /* ── 목표 화면 ── */
  .goal-wrap{
    display:flex;flex-direction:column;align-items:center;gap:20px;
    width:100%;max-width:500px;padding:0 24px;
  }
  .goal-title{font-size:28px;font-weight:700;color:var(--white);letter-spacing:0.1em}
  .goal-illust{width:120px;height:100px;object-fit:contain}
  .goal-illust-placeholder{width:120px;height:100px;display:flex;align-items:center;justify-content:center;font-size:48px}
  .goal-box{
    background:var(--paper-light);border-radius:8px;
    padding:24px 28px;text-align:center;width:100%;
  }
  .goal-box p{font-size:14px;line-height:2.0;color:var(--ink)}

  /* ── 스탯 화면 ── */
  .stat-wrap{
    display:flex;flex-direction:column;align-items:center;gap:20px;
    width:100%;max-width:500px;padding:0 24px;
  }
  .stat-title{font-size:28px;font-weight:700;color:var(--white);letter-spacing:0.1em}
  .stat-box{background:var(--paper-light);border-radius:8px;padding:24px 20px;width:100%}
  .stat-box-desc{font-size:13px;color:var(--ink);text-align:center;margin-bottom:20px}
  .stat-icons-row{display:flex;justify-content:space-around;align-items:flex-end;gap:16px}
  .stat-item-wrap{display:flex;flex-direction:column;align-items:center;gap:10px}
  .stat-item-img{width:80px;height:80px;object-fit:contain}
  .stat-item-placeholder{width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-size:40px}
  .stat-item-label{font-size:14px;color:var(--ink);font-weight:500}

  /* ── 채팅 공통 ── */
  .chat{width:100vw;height:100vh;overflow:hidden;display:flex;flex-direction:column}

  /* 모바일 상단바 */
  .mob-topbar{
    background:#2c1a0e;padding:8px 12px;
    padding-top:calc(8px + var(--safe-top));
    display:flex;align-items:center;gap:6px;
    flex-shrink:0;border-bottom:1px solid #5a3a1a;
  }
  .chat.boss .mob-topbar{background:#5a0a0a;border-color:#8a1a1a}
  .wchip{font-size:11px;color:var(--gold);font-weight:700;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:20px;padding:3px 9px;white-space:nowrap;flex-shrink:0}
  .schips{display:flex;gap:5px;flex:1;overflow:hidden}
  .schip{font-size:10px;background:rgba(245,234,214,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:20px;padding:3px 7px;white-space:nowrap;color:rgba(253,248,240,0.85);display:flex;align-items:center;gap:3px}
  .schip b{color:var(--gold2)}
  .cthumb{width:32px;height:32px;border-radius:50%;flex-shrink:0;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;overflow:hidden}
  .cthumb img{width:100%;height:100%;object-fit:cover}

  /* 보스 HP바 (모바일) */
  .mob-bossbar{background:#5a0a0a;padding:5px 12px;flex-shrink:0;border-bottom:1px solid #8a1a1a;display:flex;align-items:center;gap:8px}
  .bblbl{font-size:10px;color:#f5c0c0;white-space:nowrap}
  .bbtrk{flex:1;height:6px;background:#3a0000;border-radius:4px;overflow:hidden}
  .bbfil{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
  .bbval{font-size:12px;color:#ff6b6b;font-weight:700;white-space:nowrap}

  /* 나레이션 배너 (모바일) */
  .mob-narr{background:var(--paper);border-bottom:1px solid #c8b48a;padding:8px 12px;flex-shrink:0;cursor:pointer;display:flex;align-items:flex-start;gap:8px;user-select:none}
  .chat.boss .mob-narr{background:#3a0a0a;border-color:#6a1a1a}
  .mob-narrtx{font-size:11px;color:#5a3a1a;line-height:1.6;flex:1}
  .chat.boss .mob-narrtx{color:#f5c0c0}
  .mob-narr-arr{font-size:11px;color:#8a6030;flex-shrink:0}

  /* 메시지 영역 */
  .msgs{flex:1;overflow-y:auto;padding:12px 10px;display:flex;flex-direction:column;gap:11px;-webkit-overflow-scrolling:touch;background:#e8dcc8}
  .chat.boss .msgs{background:#2a0000}
  .msgs::-webkit-scrollbar{width:3px}
  .msgs::-webkit-scrollbar-thumb{background:#c8b48a;border-radius:2px}
  .msg{display:flex;flex-direction:column;max-width:78%}
  .msg.npc{align-self:flex-start;align-items:flex-start}
  .msg.usr{align-self:flex-end;align-items:flex-end}
  .mname{font-size:10px;color:#8a7050;margin-bottom:3px}
  .bub{padding:9px 13px;border-radius:17px;font-size:13px;line-height:1.75}
  .msg.npc .bub{background:#fff;color:#2c1a0e;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.12)}
  .msg.usr .bub{background:#5a3a28;color:var(--white);border-bottom-right-radius:4px}
  .chat.boss .msg.npc .bub{background:#3d0808;color:#f5c0c0;border:1px solid #6a1a1a}

  /* 추천 답변 가로스크롤 */
  .recbar{background:#e8d8b8;border-top:1px solid #c8b48a;padding:7px 10px;flex-shrink:0}
  .chat.boss .recbar{display:none}
  .recscr{display:flex;gap:7px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px}
  .recscr::-webkit-scrollbar{display:none}
  .rchip{background:var(--paper-light);border:1px solid #c0a060;border-radius:20px;padding:6px 12px;font-size:12px;font-family:inherit;color:#2c1a0e;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background 0.15s}
  .rchip:active{background:#ddc880}
  .rchip:disabled{opacity:0.5;cursor:default}
  .recgen{font-size:11px;color:#8a7050;padding:6px 8px;white-space:nowrap;display:flex;align-items:center;gap:5px;flex-shrink:0}

  /* 입력창 */
  .inrow{display:flex;gap:7px;padding:9px 10px;padding-bottom:calc(9px + var(--safe-bot));background:#d8c8a8;border-top:1px solid #b8a888;flex-shrink:0}
  .chat.boss .inrow{background:#3a0808;border-color:#6a1a1a}
  .ci{flex:1;background:#f8f0e0;border:1px solid #c8b48a;border-radius:22px;padding:9px 14px;font-size:14px;font-family:inherit;color:#2c1a0e;outline:none}
  .chat.boss .ci{background:#2a0808;border-color:#6a1a1a;color:#f5c0c0}
  .ci:focus{border-color:#a07030}
  .sbtn{background:#3d2a1a;color:#fff;border:none;border-radius:50%;width:40px;height:40px;flex-shrink:0;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;transition:opacity 0.2s}
  .sbtn:disabled{opacity:0.5}
  .dcnt{font-size:10px;color:#8a7050;text-align:center;padding:2px 0;flex-shrink:0;background:#d8c8a8}
  .chat.boss .dcnt{background:#3a0808;color:#f5c0c0}

  /* PC 3컬럼 레이아웃 */
  @media(min-width:768px){
    /* 일반 채팅 PC */
    .chat:not(.boss){
      display:grid!important;
      grid-template-columns:230px 1fr 260px;
      grid-template-rows:100vh;
      background:#d4c4a0;
    }
    .chat:not(.boss) .mob-topbar{display:none!important}
    .chat:not(.boss) .mob-narr{display:none!important}
    .chat:not(.boss) .recbar{display:none!important}
    .chat:not(.boss) .msgs{padding:16px 18px;gap:12px;background:#e8dcc8}
    .chat:not(.boss) .msg{max-width:70%}
    .chat:not(.boss) .inrow{padding:12px 16px;padding-bottom:12px;background:#d8c8a8}
    .chat:not(.boss) .dcnt{background:#d8c8a8}

    /* 보스 채팅 PC */
    .chat.boss{
      display:grid!important;
      grid-template-columns:220px 1fr 200px;
      grid-template-rows:100vh;
      background:var(--boss-dark);
    }
    .chat.boss .mob-topbar{display:none!important}
    .chat.boss .mob-bossbar{display:none!important}
    .chat.boss .mob-narr{display:none!important}
    .chat.boss .msgs{padding:16px 18px;gap:12px}
    .chat.boss .msg{max-width:72%}
    .chat.boss .inrow{padding:12px 16px;padding-bottom:12px}
    .chat.boss .dcnt{background:var(--boss-dark)}

    /* PC 왼쪽 패널 - 일반 채팅 */
    .pcl{
      display:flex!important;flex-direction:column;align-items:center;
      padding:20px 14px;gap:12px;overflow-y:auto;height:100vh;
      background:var(--paper);border-right:2px solid #c8b48a;
    }
    .pcwk{
      font-size:26px;font-weight:700;color:var(--ink);letter-spacing:0.08em;
      background:rgba(201,168,76,0.15);border:1px solid #c8b48a;
      border-radius:4px;padding:6px 14px;width:100%;text-align:center;
    }
    .pccharimg{
      width:180px;height:200px;border:2px solid #b8a070;border-radius:4px;
      overflow:hidden;background:#d4c4a0;
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:6px;color:#8a7050;font-size:11px;text-align:center;
    }
    .pccharimg img{width:100%;height:100%;object-fit:cover;object-position:top}
    .pccharimg-label{font-size:11px;color:#6a5030;padding:4px 8px;background:rgba(201,168,76,0.2);width:100%;text-align:center}
    .pcsts{display:flex;gap:6px;width:100%}
    .pcst{flex:1;background:#f0e4c8;border:1px solid #c8b48a;border-radius:4px;padding:7px 4px;text-align:center;min-width:0}
    .pcstn{font-size:9px;color:#6b5a3a;letter-spacing:0.04em;margin-bottom:2px}
    .pcstv{font-size:18px;font-weight:700;color:var(--ink)}
    .pcdcnt{font-size:11px;color:#8a7050;text-align:center}

    /* PC 왼쪽 패널 - 보스 채팅 (나레이션) */
    .boss-pcl{
      display:flex!important;flex-direction:column;
      padding:0;overflow-y:auto;height:100vh;
      background:var(--paper);
    }
    .boss-pcl-inner{padding:20px 16px;flex:1}
    .boss-pcl-title{
      font-size:22px;font-weight:700;color:var(--boss-bg);
      letter-spacing:0.05em;margin-bottom:12px;line-height:1.3;
    }
    .boss-pcl-desc{font-size:13px;line-height:2.0;color:#3a1a1a;margin-bottom:12px;white-space:pre-line}
    .boss-pcl-tip{font-size:12px;color:#8a2020;font-style:italic}

    /* PC 가운데 */
    .pcc{display:flex!important;flex-direction:column;height:100vh;overflow:hidden}
    .pcchdr{
      padding:10px 16px;font-size:12px;text-align:center;
      letter-spacing:0.04em;flex-shrink:0;
      background:#2c1a0e;color:var(--gold2);border-bottom:1px solid #5a3a1a;
    }
    .chat.boss .pcchdr{background:#5a0a0a;border-color:#8a1a1a;color:#f5c0c0}

    /* PC 오른쪽 패널 - 일반 채팅 (두루마리 나레이션) */
    .pcr{
      display:flex!important;flex-direction:column;
      padding:16px 14px;gap:12px;overflow-y:auto;height:100vh;
      background:var(--paper);border-left:2px solid #c8b48a;
    }
    .scroll-frame{
      background:var(--paper-light);border:1px solid #c0a060;
      border-radius:4px;padding:14px 12px;font-size:12px;
      line-height:1.85;color:var(--ink);
      box-shadow:inset 0 1px 4px rgba(0,0,0,0.06);
    }
    .scroll-title{font-size:13px;font-weight:700;color:#5a3a1a;margin-bottom:8px}
    .tip-text{font-size:11px;color:#7a5a2a;margin-top:8px;font-style:italic}
    .pcrec-list{display:flex;flex-direction:column;gap:7px;margin-top:4px}
    .pcrec-btn{
      background:var(--paper);border:1px solid #c8a860;border-radius:20px;
      padding:8px 12px;font-size:12px;font-family:inherit;color:var(--ink);
      cursor:pointer;text-align:left;line-height:1.4;transition:background 0.15s;
    }
    .pcrec-btn:hover{background:#ead4a0;border-color:#a07030}
    .pcrec-btn:disabled{opacity:0.5;cursor:default}

    /* PC 오른쪽 패널 - 보스 채팅 (캐릭터+심기) */
    .boss-pcr{
      display:flex!important;flex-direction:column;align-items:center;
      padding:0;height:100vh;overflow:hidden;
      background:#3a0000;border-left:2px solid #6a1a1a;
    }
    .boss-pcr-charimg{
      width:100%;height:55%;overflow:hidden;
      display:flex;align-items:center;justify-content:center;
      background:#2a0000;color:#6a2020;font-size:12px;
    }
    .boss-pcr-charimg img{width:100%;height:100%;object-fit:cover;object-position:top}
    .boss-pcr-hp{
      width:100%;padding:16px;flex:1;
      background:#4a0a0a;display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:8px;
      border-top:2px solid #7a1a1a;
    }
    .boss-pcr-hplbl{font-size:16px;color:#f5c0c0;letter-spacing:0.08em}
    .boss-pcr-hpval{font-size:48px;font-weight:700;color:#ff6b6b;line-height:1}
    .boss-pcr-delta{font-size:13px;font-weight:600}
    .boss-pcr-track{width:80%;height:8px;background:#2a0000;border-radius:4px;overflow:hidden;margin-top:4px}
    .boss-pcr-fill{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
  }

  /* ── 미니게임 ── */
  .mini{width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#e8dcc8;padding:36px 18px;overflow-y:auto}
  .mboard{background:var(--paper-light);border:3px solid #8a6020;border-radius:8px;padding:30px 22px;width:100%;max-width:460px;text-align:center;position:relative;box-shadow:0 4px 20px rgba(0,0,0,0.2)}
  .rope{position:absolute;top:-26px;left:50%;transform:translateX(-50%);width:55%;height:26px;background:repeating-linear-gradient(90deg,#8a6020 0%,#b08040 4px,#8a6020 8px);border-radius:4px 4px 0 0}
  .mtitle{font-size:24px;font-weight:700;color:var(--ink);margin-bottom:14px;letter-spacing:0.06em}
  .mdesc{font-size:13px;line-height:1.85;color:#3a2a0e;margin-bottom:18px}
  .mopts{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px}
  .mbtn{background:var(--paper);border:2px solid #c8b48a;border-radius:8px;padding:15px 6px;font-size:17px;font-weight:700;font-family:inherit;color:var(--ink);cursor:pointer;transition:background 0.15s,transform 0.1s}
  .mbtn:active{transform:scale(0.97)}
  .mbtn.sel{background:#c9a84c;border-color:#8a6020;color:#fff}
  .mbtn.wrong{background:#c62828;border-color:#7a0000;color:#fff}
  .mred{color:#c62828;font-weight:700;font-size:12px;margin-bottom:3px}
  .minp{background:#fff;border:2px solid #c8b48a;border-radius:8px;padding:11px 14px;font-size:15px;font-family:inherit;color:var(--ink);width:100%;outline:none;text-align:center;margin-bottom:7px}
  .minp:focus{border-color:#a07030}
  .msub{background:var(--cu);color:#fff;border:none;border-radius:8px;padding:12px 0;font-size:14px;font-family:inherit;cursor:pointer;width:100%;margin-top:3px}

  /* ── 엔딩 ── */
  .ending{
    width:100vw;height:100vh;display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    background:#e8e0d0;padding:32px 18px;overflow-y:auto;gap:16px;
  }
  .etitle{font-size:26px;font-weight:700;color:var(--ink);letter-spacing:0.08em;text-align:center}
  .eimg-wrap{
    width:180px;height:140px;background:#1a1208;
    border:2px solid #3a2a0e;border-radius:4px;
    display:flex;align-items:center;justify-content:center;
    color:rgba(201,168,76,0.4);font-size:11px;overflow:hidden;
  }
  .eimg-wrap img{width:100%;height:100%;object-fit:cover}
  .scroll-ending{width:100%;max-width:560px;position:relative}
  .scroll-ending-poles{display:flex;align-items:stretch;width:100%}
  .scroll-pole-l,.scroll-pole-r{
    width:28px;background:#2a1a08;border-radius:4px;flex-shrink:0;
    box-shadow:2px 0 6px rgba(0,0,0,0.4);
  }
  .scroll-pole-r{box-shadow:-2px 0 6px rgba(0,0,0,0.4)}
  .scroll-body{
    flex:1;background:var(--paper-light);
    padding:22px 20px;font-size:13px;line-height:2.1;
    color:var(--ink);text-align:center;white-space:pre-line;
    border-top:4px solid #8a6020;border-bottom:4px solid #8a6020;
  }
`;

// ============================================================
// 백엔드 연동
// ============================================================
async function callBackend(message) {
  const r = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  return await r.json();
}

// ============================================================
// 공통: 하단 이전/다음 버튼
// ============================================================
function BottomNav({ onPrev, onNext, nextLabel = "다음", nextDisabled = false }) {
  return (
    <div className="bottom-nav">
      <button className="btn-prev" onClick={onPrev}
        style={{ visibility: onPrev ? "visible" : "hidden" }}>이전</button>
      <button className="btn-next" onClick={onNext} disabled={nextDisabled}>{nextLabel}</button>
    </div>
  );
}

// ============================================================
// 프롤로그 화면
// 이미지: IMAGES.prologue — src/assets/ 폴더에 파일 넣고 경로 수정
// ============================================================
function PrologueScreen({ onNext }) {
  const [page, setPage] = useState(0);
  return (
    <div className="page fade" key={page}>
      <div className="prologue-wrap">
        {/* ↓ 프롤로그 일러스트 이미지 교체 위치
            IMAGES.prologue 에 경로 입력하거나 아래 img 태그 직접 수정
            예: <img src="/assets/prologue_mountain.png" className="prologue-illust" /> */}
        {IMAGES.prologue
          ? <img src={IMAGES.prologue} className="prologue-illust" alt="프롤로그" />
          : <div className="prologue-illust-placeholder">🏔️</div>
        }
        <p className="prologue-text">{PROLOGUE_PAGES[page]}</p>
        <div className="prologue-dots">
          {PROLOGUE_PAGES.map((_,i) => <div key={i} className={`dot${i===page?" a":""}`}/>)}
        </div>
      </div>
      <div className="bottom-nav">
        <button className="btn-prev" onClick={() => setPage(p=>p-1)}
          style={{ visibility: page>0?"visible":"hidden" }}>이전</button>
        {page < PROLOGUE_PAGES.length-1
          ? <button className="btn-next" onClick={() => setPage(p=>p+1)}>다음</button>
          : <button className="btn-next" onClick={onNext}>다음</button>}
      </div>
    </div>
  );
}

// ============================================================
// 이름 입력 화면
// 이미지: IMAGES.playerAvatar — 플레이어 아바타
// ============================================================
function NameScreen({ onNext }) {
  const [name, setName] = useState("");
  return (
    <div className="page fade">
      <div className="name-wrap">
        <p className="name-desc">
          당신은 그런 희종을 어린 시절부터 지켜본<br/>희종의 또 다른 숙부 OO대군이다.
        </p>
        {/* ↓ 플레이어 아바타 이미지 교체 위치
            IMAGES.playerAvatar 에 경로 입력
            예: "/assets/player_avatar.png" */}
        <div className="name-avatar-wrap">
          {IMAGES.playerAvatar
            ? <img src={IMAGES.playerAvatar} alt="플레이어" />
            : <div className="name-avatar-placeholder">?</div>
          }
        </div>
        <div className="name-row">
          <span className="name-label">이름:</span>
          <input className="name-input" placeholder="(직접 입력) 대군"
            value={name} onChange={e=>setName(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&name.trim()&&onNext(name.trim())} />
        </div>
        <button className="btn-start" onClick={()=>name.trim()&&onNext(name.trim())}
          disabled={!name.trim()}>채팅 시작하기</button>
      </div>
    </div>
  );
}

// ============================================================
// 최종 목표 화면
// 이미지: IMAGES.phoenix — 봉황 일러스트
// ============================================================
function GoalScreen({ onNext, onPrev }) {
  return (
    <div className="page fade">
      <div className="goal-wrap">
        <div className="goal-title">최종 목표</div>
        {/* ↓ 봉황 이미지 교체 위치
            IMAGES.phoenix 에 경로 입력
            예: "/assets/phoenix.png" */}
        {IMAGES.phoenix
          ? <img src={IMAGES.phoenix} className="goal-illust" alt="봉황"/>
          : <div className="goal-illust-placeholder">🦅</div>
        }
        <div className="goal-box">
          <p>8주 동안 좌절에 빠진 희종을 설득하여<br/>태황 대군의 폭정 아래에서 위기에 빠진 조선을 구하라.</p>
        </div>
      </div>
      <BottomNav onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

// ============================================================
// 스탯 소개 화면
// 이미지: IMAGES.statAffection / IMAGES.statSoldier / IMAGES.statMinsim
// ============================================================
function StatIntroScreen({ onNext, onPrev }) {
  const stats = [
    { key:"statAffection", label:"호감도", fallback:"🤝",
      detail:"시작 0 → 목표 90 이상", danger:"0 이하 → 베드엔딩" },
    { key:"statSoldier",   label:"무력",   fallback:"⚔️",
      detail:"시작 50명 → 목표 1,000명 이상", danger:"부족 → 전장 사망 엔딩" },
    { key:"statMinsim",    label:"민심",   fallback:"🏮",
      detail:"시작 100 → 8주 안에 복위 완료", danger:"매주 5 감소, 8주차 -60" },
  ];
  return (
    <div className="page fade">
      <div className="stat-wrap">
        <div className="stat-title">스탯 시스템</div>
        <div className="stat-box">
          <p className="stat-box-desc">대화와 미니게임을 통해 스탯을 향상시킬 수 있습니다.</p>
          <div className="stat-icons-row">
            {stats.map(s => (
              <div className="stat-item-wrap" key={s.label}>
                {/* ↓ 각 스탯 아이콘 이미지 교체 위치
                    IMAGES[s.key] 에 경로 입력
                    예: IMAGES.statAffection = "/assets/stat_affection.png" */}
                {IMAGES[s.key]
                  ? <img src={IMAGES[s.key]} className="stat-item-img" alt={s.label}/>
                  : <div className="stat-item-placeholder">{s.fallback}</div>
                }
                <div className="stat-item-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

// ============================================================
// 주차 전환 화면
// ============================================================
function WeekTransitionScreen({ week, onNext }) {
  const info = WEEK_NARRATIVES[week];
  return (
    <div className="page fade">
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#0e0a04 0%,#1a1208 60%,#2d1f0e 100%)"}}/>
      {/* ↓ 배경 이미지 교체 위치
          예: <img src="/assets/week_bg.png" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.35}} /> */}
      <div style={{position:"relative",zIndex:2,width:"100%",maxWidth:520,
        background:"rgba(20,14,6,0.9)",border:"1px solid rgba(201,168,76,0.3)",
        borderRadius:12,padding:"32px 28px",textAlign:"center",margin:"0 20px"}}>
        <div style={{fontSize:28,fontWeight:700,color:"#e8c97a",marginBottom:18,letterSpacing:"0.08em"}}>
          ─ {info.title} ─
        </div>
        <div style={{fontSize:14,lineHeight:2.1,color:"rgba(253,248,240,0.85)",whiteSpace:"pre-line",marginBottom:28}}>
          {info.text}
        </div>
        <button className="btn-next" style={{width:"100%"}} onClick={onNext}>대화 시작하기</button>
      </div>
    </div>
  );
}

// ============================================================
// 채팅 화면 (반응형 — 모바일/PC)
// 이미지: IMAGES.heejongLow/Mid/High, IMAGES.tyrant
// ============================================================
function ChatScreen({ week, playerName, stats, onStatsChange, onDialogComplete, isBoss=false, badFaction="죽" }) {
  const info = WEEK_NARRATIVES[week];
  const maxDialog = info.cnt;
  const openLines = {1:"숙부님이... 여기까지는 웬일이십니까?",2:"...다시 오셨군요.",3:"요즘도 백성들의 이야기가 들려오는군요.",4:"서신이 잘 전달되었다 하더군요.",6:"시간이 많지 않다는 것을 알고 있소.",7:"이제 얼마 남지 않았군요.",8:"거사가 코 앞이오."};
  const openLine = isBoss ? "형님이 요즘 수상한 짓을 꾸민다더군요." : (openLines[week]||"...");

  const [messages, setMessages] = useState([{role:"npc",text:openLine}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogCount, setDialogCount] = useState(0);
  const [bossHp, setBossHp] = useState(20);
  const [bossDelta, setBossDelta] = useState(null);
  const [recAnswers, setRecAnswers] = useState(INIT_RECS[week]||[]);
  const [recLoading, setRecLoading] = useState(false);
  const [narrOpen, setNarrOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  useEffect(()=>{
    if(isBoss) fetch("http://localhost:8000/tyrant/start",{method:"POST"}).catch(()=>{});
    return ()=>{ if(isBoss) fetch("http://localhost:8000/tyrant/end",{method:"POST"}).catch(()=>{}); };
  },[isBoss]);

  const charImg = isBoss ? IMAGES.tyrant : getHeejongImage(stats.affection);
  const npcName = isBoss ? "태황대군" : "희종";
  const hpPct = (bossHp/30)*100;

  async function handleBackendResponse(data, nc) {
    setMessages(m=>[...m,{role:"npc",text:data.대사}]);
    if(Array.isArray(data.추천답변)) setRecAnswers(data.추천답변);
    setDialogCount(nc);
    if(isBoss){
      const delta = data.stats?.폭군심기변화||0;
      const newHp = Math.max(0,Math.min(30,bossHp+delta));
      setBossHp(newHp); setBossDelta(delta); setLoading(false);
      if(newHp<=0){onDialogComplete("bossKill");return;}
      if(nc>=maxDialog){onDialogComplete("bossSurvive");return;}
    } else {
      onStatsChange({affection:data.stats?.호감도변화||0});
      setLoading(false);
      if(data.bad_ending){onDialogComplete("badAffection");return;}
      if(nc>=maxDialog){onDialogComplete("complete");return;}
    }
  }

  async function sendMessage(text) {
    if(!text.trim()||loading) return;
    setLoading(true);
    setMessages(m=>[...m,{role:"user",text}]);
    setInput("");
    try {
      const data = await callBackend(text);
      await handleBackendResponse(data, dialogCount+1);
    } catch { setLoading(false); }
  }

  async function sendRecommended(text) {
    if(loading||recLoading) return;
    setLoading(true);
    setMessages(m=>[...m,{role:"user",text}]);
    try {
      const data = await callBackend(text);
      await handleBackendResponse(data, dialogCount+1);
    } catch { setLoading(false); }
  }

  return (
    <div className={`chat${isBoss?" boss":""}`}>

      {/* 모바일 상단바 */}
      <div className="mob-topbar">
        <div className="wchip">{info.title}</div>
        <div className="schips">
          {isBoss
            ? <div className="schip">심기 <b style={{color:"#ff6b6b"}}>{bossHp}</b></div>
            : <><div className="schip">❤️<b>{stats.affection}</b></div>
                <div className="schip">⚔️<b>{stats.soldiers}</b></div>
                <div className="schip">🏮<b>{stats.minsim}</b></div></>
          }
        </div>
        <div className="cthumb" onClick={()=>setShowModal(true)}>
          {charImg ? <img src={charImg} alt={npcName}/> : (isBoss?"👑":"🧑")}
        </div>
      </div>

      {/* 모바일 보스 HP바 */}
      {isBoss && (
        <div className="mob-bossbar">
          <span className="bblbl">심기</span>
          <div className="bbtrk"><div className="bbfil" style={{width:`${hpPct}%`}}/></div>
          <span className="bbval">{bossHp}/30
            {bossDelta!==null&&<span style={{fontSize:10,color:bossDelta>=0?"#69f0ae":"#ff5252",marginLeft:4}}>
              {bossDelta>=0?`+${bossDelta}`:bossDelta}</span>}
          </span>
        </div>
      )}

      {/* 모바일 나레이션 */}
      <div className="mob-narr" onClick={()=>setNarrOpen(o=>!o)}>
        <div className="mob-narrtx">{narrOpen?info.text:info.text.slice(0,55)+(info.text.length>55?"...":"")}</div>
        <div className="mob-narr-arr">{narrOpen?"▲":"▼"}</div>
      </div>

      {/* PC 왼쪽 패널 - 일반 채팅 */}
      {!isBoss && (
        <div className="pcl" style={{display:"none"}}>
          <div className="pcwk">{info.title}</div>
          <div className="pccharimg">
            {/* ↓ 희종 캐릭터 이미지 교체 위치
                IMAGES.heejongLow / heejongMid / heejongHigh 에 경로 입력
                호감도에 따라 자동으로 바뀜 */}
            {charImg
              ? <img src={charImg} alt="희종"/>
              : <><span style={{fontSize:36}}>🧑</span>
                  <span>(호감도별 변화 이미지)</span></>
            }
          </div>
          <div className="pccharimg-label">(호감도 별 변화 이미지)</div>
          <div className="pcsts">
            {[{n:"호감도",v:stats.affection},{n:"민심",v:stats.minsim},{n:"사병",v:stats.soldiers}].map(s=>(
              <div className="pcst" key={s.n}>
                <div className="pcstn">{s.n}</div>
                <div className="pcstv">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="pcdcnt">{dialogCount} / {maxDialog} 대화</div>
        </div>
      )}

      {/* PC 왼쪽 패널 - 보스 채팅 (나레이션) */}
      {isBoss && (
        <div className="boss-pcl" style={{display:"none"}}>
          <div className="boss-pcl-inner">
            <div className="boss-pcl-title">태황대군과의<br/>대화</div>
            <div className="boss-pcl-desc">{info.text}</div>
            {info.tip && <div className="boss-pcl-tip">*Tip: {info.tip}</div>}
          </div>
        </div>
      )}

      {/* 가운데 채팅 영역 */}
      <div className="pcc" style={{display:"contents"}}>
        <div className="pcchdr" style={{display:"none"}}>
          {isBoss ? "⚠️ 태황대군과의 대화 — 심기를 건드리지 마세요!" : `*${maxDialog}번의 대화가 진행되면 다음 주차로 넘어갑니다.`}
        </div>
        <div className="msgs">
          {messages.map((m,i)=>(
            <div key={i} className={`msg ${m.role==="npc"?"npc":"usr"} fade`}>
              {m.role==="npc"&&<div className="mname">{npcName}</div>}
              <div className="bub">{m.text}</div>
            </div>
          ))}
          {loading&&<div className="msg npc"><div className="bub"><span className="spin"/></div></div>}
          <div ref={endRef}/>
        </div>
        <div className="dcnt">{dialogCount} / {maxDialog} 대화</div>
        <div className="inrow">
          <input className="ci" placeholder="답변을 입력하세요..." value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&sendMessage(input)} disabled={loading}/>
          <button className="sbtn" onClick={()=>sendMessage(input)} disabled={loading}>
            {loading?<span className="spin"/>:"➤"}
          </button>
        </div>
      </div>

      {/* 모바일 추천 답변 */}
      {!isBoss&&(
        <div className="recbar">
          <div className="recscr">
            {recLoading&&<div className="recgen"><span className="spin"/>생성 중...</div>}
            {recAnswers.map((a,i)=>(
              <button key={i} className="rchip" onClick={()=>sendRecommended(a)}
                disabled={loading||recLoading}>{a}</button>
            ))}
          </div>
        </div>
      )}

      {/* PC 오른쪽 패널 - 일반 채팅 (나레이션+추천답변) */}
      {!isBoss&&(
        <div className="pcr" style={{display:"none"}}>
          <div className="scroll-frame">
            <div className="scroll-title">📜 나레이션</div>
            <p style={{fontSize:12,lineHeight:1.9,whiteSpace:"pre-line"}}>{info.text}</p>
            {info.tip&&<p className="tip-text">*Tip: {info.tip}</p>}
          </div>
          <div className="scroll-frame">
            <div className="scroll-title">💬 추천 답변
              {recLoading&&<span style={{fontSize:10,color:"#8a7050"}}> 생성 중...</span>}
            </div>
            <div className="pcrec-list">
              {recAnswers.map((a,i)=>(
                <button key={i} className="pcrec-btn" onClick={()=>sendRecommended(a)}
                  disabled={loading||recLoading}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PC 오른쪽 패널 - 보스 채팅 (캐릭터+심기) */}
      {isBoss&&(
        <div className="boss-pcr" style={{display:"none"}}>
          <div className="boss-pcr-charimg">
            {/* ↓ 태황대군 이미지 교체 위치
                IMAGES.tyrant 에 경로 입력
                예: "/assets/tyrant.png" */}
            {IMAGES.tyrant
              ? <img src={IMAGES.tyrant} alt="태황대군" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
              : <span style={{fontSize:14}}>태황대군 이미지</span>
            }
          </div>
          <div className="boss-pcr-hp">
            <div className="boss-pcr-hplbl">심기</div>
            <div className="boss-pcr-hpval">{bossHp}</div>
            {bossDelta!==null&&(
              <div className="boss-pcr-delta" style={{color:bossDelta>=0?"#69f0ae":"#ff5252"}}>
                {bossDelta>=0?`+${bossDelta}`:bossDelta}
              </div>
            )}
            <div className="boss-pcr-track"><div className="boss-pcr-fill" style={{width:`${hpPct}%`}}/></div>
          </div>
        </div>
      )}

      {/* 모바일 캐릭터 모달 */}
      {showModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,
          display:"flex",alignItems:"center",justifyContent:"center"}}
          onClick={()=>setShowModal(false)}>
          <div style={{background:"#f5ead6",borderRadius:12,padding:20,maxWidth:260,
            width:"90%",textAlign:"center"}} onClick={e=>e.stopPropagation()}>
            <div style={{width:150,height:190,background:"#d4c4a0",borderRadius:8,
              margin:"0 auto 12px",overflow:"hidden",display:"flex",
              alignItems:"center",justifyContent:"center",fontSize:12,color:"#8a7050"}}>
              {/* ↓ 모바일 모달 캐릭터 이미지 */}
              {charImg
                ? <img src={charImg} alt={npcName} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
                : "캐릭터 이미지"
              }
            </div>
            <div style={{fontSize:14,color:"#2c1a0e",marginBottom:8,fontWeight:700}}>{npcName}</div>
            {isBoss&&<div style={{fontSize:13,color:"#c62828"}}>심기: {bossHp}/30</div>}
            <button className="btn-prev" style={{marginTop:12,width:"100%"}} onClick={()=>setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 미니게임: 협력 세력
// ============================================================
function MiniAlly({ onResult, badFaction="죽" }) {
  const OPTIONS=["매","난","국","죽"];
  const [selected,setSelected]=useState(null);
  const [revealed,setRevealed]=useState(false);
  const [success,setSuccess]=useState(null);

  async function choose(opt){
    setSelected(opt);setRevealed(true);
    try{
      const r=await fetch("http://localhost:8000/minigame",{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({type:"협력세력_1차",choice:opt})});
      const data=await r.json();
      setSuccess(data.success);
      setTimeout(()=>onResult(data.success?"allyOk":"evil"),1400);
    } catch {
      setTimeout(()=>onResult(opt===badFaction?"evil":"allyOk"),1400);
    }
  }

  return (
    <div className="mini">
      <div className="mboard">
        <div className="rope"/>
        <div className="mtitle">협력 세력 고르기</div>
        <p className="mdesc">복위를 위해 협력 세력을 모을 차례입니다.<br/>다음 네 세력 중 한 세력을 제외하고 모두 복위에 우호적입니다.<br/>반(反)희종 세력을 피해 포섭할 하나의 협력 세력을 선택하세요.</p>
        <div className="mopts">
          {OPTIONS.map(opt=>(
            <button key={opt}
              className={`mbtn${revealed&&opt===selected?(success===null?"":(success?" sel":" wrong")):""}` }
              onClick={()=>!revealed&&choose(opt)} disabled={revealed}>
              '{opt}' 세력
            </button>
          ))}
        </div>
        {revealed&&success!==null&&(
          <p style={{marginTop:14,fontSize:13,fontWeight:700,color:success?"#2e7d32":"#c62828"}}>
            {success?"✅ 현명한 선택입니다!":"❌ 반(反)희종 세력이었습니다!"}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 미니게임: 비밀 서신
// ============================================================
function MiniLetter({ onResult }) {
  const OPTIONS=["A","B","C","D"];
  const [selected,setSelected]=useState(null);
  const [revealed,setRevealed]=useState(false);
  const [success,setSuccess]=useState(null);

  async function choose(opt){
    setSelected(opt);setRevealed(true);
    try{
      const r=await fetch("http://localhost:8000/minigame",{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({type:"비밀서신",choice:opt})});
      const data=await r.json();
      setSuccess(data.success);
      setTimeout(()=>onResult(data.success?"letterOk":"userDeath"),1400);
    } catch {
      const fallbackBad=OPTIONS[Math.floor(Math.random()*OPTIONS.length)];
      setTimeout(()=>onResult(opt===fallbackBad?"userDeath":"letterOk"),1400);
    }
  }

  return (
    <div className="mini">
      <div className="mboard">
        <div className="rope"/>
        <div className="mtitle">비밀 서신 전달하기</div>
        <p className="mdesc">희종의 복위 작전이 담긴 서신을 협력세력에게 전달해야 합니다.<br/>네 개의 길 중 한 개의 길에는 태황대군의 심복이 매복 중입니다.<br/>태황대군에게 발각되지 않을 길을 선택하여 서신을 전달해 주세요.</p>
        <div className="mopts">
          {OPTIONS.map(opt=>(
            <button key={opt}
              className={`mbtn${revealed&&opt===selected?(success===null?"":(success?" sel":" wrong")):""}`}
              onClick={()=>!revealed&&choose(opt)} disabled={revealed}>
              {opt}
            </button>
          ))}
        </div>
        {revealed&&success!==null&&(
          <p style={{marginTop:14,fontSize:13,fontWeight:700,color:success?"#2e7d32":"#c62828"}}>
            {success?"✅ 서신을 안전하게 전달했습니다!":"❌ 심복이 매복한 길이었습니다!"}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 미니게임: 사병 키우기
// ============================================================
function getSoldierConfig(week){
  const configs={
    3:{min:100,max:800,baseSafe:600,label:"느슨한",hint:"이번엔 넉넉하게 모아도 될 것 같습니다."},
    5:{min:100,max:500,baseSafe:250,label:"매우 철저한",hint:"지금은 단속이 심하니 소규모로만 움직이십시오."},
    8:{min:100,max:700,baseSafe:350,label:"철저한",hint:"거사를 앞두고 단속이 강화되어 있습니다. 신중하게."},
  };
  const base=configs[week]||configs[3];
  const variance=Math.floor(Math.random()*161)-80;
  const safeMax=Math.max(base.min+80,Math.min(base.max-50,base.baseSafe+variance));
  return{...base,safeMax};
}

function MiniSoldier({ week, currentSoldiers, onResult }) {
  const [input,setInput]=useState("");
  const [error,setError]=useState("");
  const [cfg]=useState(()=>getSoldierConfig(week));
  const needed=Math.max(0,1000-currentSoldiers);

  async function submit(){
    const n=parseInt(input);
    if(isNaN(n)||n<cfg.min||n>cfg.max){setError(`${cfg.min}~${cfg.max} 사이 숫자를 입력해주세요.`);return;}
    const roundKey=week<=3?"사병키우기_1차":week<=6?"사병키우기_2차":"사병키우기_3차";
    try{
      const r=await fetch("http://localhost:8000/minigame",{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({type:roundKey,choice:String(n)})});
      const data=await r.json();
      if(data.success) onResult("soldierOk",n); else onResult("soldierCaught");
    } catch {
      if(n>cfg.safeMax) onResult("soldierCaught"); else onResult("soldierOk",n);
    }
  }

  return (
    <div className="mini">
      <div className="mboard">
        <div className="rope"/>
        <div className="mtitle">사병 키우기</div>
        <p className="mdesc">복위를 위한 필수 단계인 사병 모으기입니다.<br/>태황대군의 단속을 피해 세 차례에 걸쳐 최소 <b>1,000명</b>의 사병을 모아야 합니다.<br/>이번에는 몇 명의 사병을 모집할까요?</p>
        <p className="mred">*지금은 사병 단속이 <b>{cfg.label}</b> 기간입니다.</p>
        <p style={{fontSize:12,color:"#7a5a2a",marginBottom:4,fontStyle:"italic"}}>"{cfg.hint}"</p>
        <p style={{fontSize:12,color:"#5a4a2a",marginBottom:14}}>입력 범위: {cfg.min}~{cfg.max}명</p>
        <input className="minp" type="number" min={cfg.min} max={cfg.max}
          placeholder={`${cfg.min}~${cfg.max}`} value={input}
          onChange={e=>{setInput(e.target.value);setError("");}}
          onKeyDown={e=>e.key==="Enter"&&submit()}/>
        <button className="msub" onClick={submit}>확인</button>
        {error&&<p style={{color:"#c62828",marginTop:8,fontSize:12}}>{error}</p>}
        <div style={{marginTop:12,fontSize:12,color:"#5a4a2a",display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <span>현재: <b>{currentSoldiers}명</b></span>
          <span>목표까지: <b style={{color:needed>0?"#c62828":"#2e7d32"}}>{needed>0?`${needed}명 부족`:"달성!"}</b></span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 엔딩 화면
// 이미지: IMAGES.endingSuccess / endingFail / endingDeath / endingEvil
// ============================================================
function EndingScreen({ endingKey, onRestart }) {
  const ending = ENDINGS[endingKey]||ENDINGS.failPersuade;
  const endImg = getEndingImage(endingKey);
  return (
    <div className="ending fade">
      <div className="etitle">{ending.title}</div>
      <div className="eimg-wrap">
        {/* ↓ 엔딩 이미지 교체 위치
            IMAGES.endingSuccess / endingFail / endingDeath / endingEvil 에 경로 입력
            엔딩 종류에 따라 자동으로 다른 이미지가 표시됩니다 */}
        {endImg
          ? <img src={endImg} alt="엔딩"/>
          : <span style={{color:"rgba(201,168,76,0.4)",fontSize:11}}>(엔딩 이미지)</span>
        }
      </div>
      <div className="scroll-ending">
        <div className="scroll-ending-poles">
          <div className="scroll-pole-l"/>
          <div className="scroll-body">{ending.text}</div>
          <div className="scroll-pole-r"/>
        </div>
      </div>
      <button className="btn-next" style={{maxWidth:280,width:"100%"}} onClick={onRestart}>
        처음부터 다시하기
      </button>
    </div>
  );
}

// ============================================================
// 메인 게임 엔진
// ============================================================
export default function HeejongGame() {
  const [screen,setScreen]=useState("prologue");
  const [playerName,setPlayerName]=useState("");
  const [week,setWeek]=useState(1);
  const [stats,setStats]=useState({...INITIAL_STATS});
  const [endingKey,setEndingKey]=useState(null);
  const [badFaction]=useState(()=>ALL_FACTIONS[Math.floor(Math.random()*4)]);

  function updateStats(delta){
    setStats(s=>({
      affection:Math.max(-20,Math.min(100,s.affection+(delta.affection||0))),
      soldiers:s.soldiers+(delta.soldiers||0),
      minsim:Math.max(0,s.minsim+(delta.minsim||0)),
    }));
  }
  function triggerEnding(key){setEndingKey(key);setScreen("ending");}
  function handleDialogComplete(result){
    if(result==="badAffection"){triggerEnding("badAffection");return;}
    if(result==="bossKill"){triggerEnding("deathBoss");return;}
    if(result==="bossSurvive"){setScreen("mini_soldier");return;}
    const miniMap={1:null,2:"mini_ally",3:"mini_soldier",4:"mini_letter",5:null,6:null,7:"mini_ally",8:"mini_soldier"};
    const mini=miniMap[week];
    if(mini) setScreen(mini); else advanceWeek();
  }
  function advanceWeek(){
    if(week>=8){
      if(stats.affection<90) triggerEnding("failPersuade");
      else if(stats.soldiers<1000) triggerEnding("deathBattle");
      else triggerEnding("success");
      return;
    }
    updateStats({minsim:week===7?-60:-5});
    setWeek(w=>w+1);
    setScreen("week_transition");
  }
  function handleMiniResult(result,value){
    if(result==="evil"){triggerEnding("evil");return;}
    if(result==="soldierCaught"){triggerEnding("soldierCaught");return;}
    if(result==="userDeath"){triggerEnding("userDeath");return;}
    if(result==="allyOk"||result==="letterOk"){advanceWeek();return;}
    if(result==="soldierOk"){updateStats({soldiers:value});advanceWeek();return;}
  }

  return (
    <>
      <style>{styles}</style>
      <div>
        {screen==="prologue"&&<PrologueScreen onNext={()=>setScreen("goal")}/>}
        {screen==="goal"&&<GoalScreen onNext={()=>setScreen("stat_intro")} onPrev={()=>setScreen("prologue")}/>}
        {screen==="stat_intro"&&<StatIntroScreen onNext={()=>setScreen("name")} onPrev={()=>setScreen("goal")}/>}
        {screen==="name"&&<NameScreen onNext={name=>{setPlayerName(name);setScreen("week_transition");}}/>}
        {screen==="week_transition"&&<WeekTransitionScreen week={week} onNext={()=>setScreen("chat")}/>}
        {screen==="chat"&&<ChatScreen week={week} playerName={playerName} stats={stats}
          onStatsChange={updateStats} onDialogComplete={handleDialogComplete}
          isBoss={week===5} badFaction={badFaction}/>}
        {screen==="mini_ally"&&<MiniAlly badFaction={badFaction} onResult={handleMiniResult}/>}
        {screen==="mini_letter"&&<MiniLetter onResult={handleMiniResult}/>}
        {screen==="mini_soldier"&&<MiniSoldier week={week} currentSoldiers={stats.soldiers} onResult={handleMiniResult}/>}
        {screen==="ending"&&<EndingScreen endingKey={endingKey} onRestart={()=>{setScreen("prologue");setWeek(1);setStats({...INITIAL_STATS});setPlayerName("");setEndingKey(null);}}/>}
      </div>
    </>
  );
}

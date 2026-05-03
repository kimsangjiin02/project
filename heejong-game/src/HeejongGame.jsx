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
  3:{title:"3주차",text:"어느덧 왕위에서 쫓겨난지 3주가 흘렀다.\n\n희종은 여전히 자신의 상황에 대해 불안한 눈빛이지만 당신에 대한 의심은 줄어든 듯 보인다.\n\n희종이 다시 복위할 마음을 가지도록 그를 설득해야 한다.",tip:"백성들이 아직 희종을 기억하고 있으며, 그의 복위를 바라고 있다는 사실을 전해 보세요.",cnt:5},
  4:{title:"4주차",text:"4주차, 희종은 복위에 대한 마음을 굳힌다.\n\n'비밀 서신을 전달하느라 수고 많았네.'\n'좋소. 내 당신을 한 번 믿어보도록 하겠네.'\n\n'그런데... 아직 백성들이 짐을 잊지 않았을지 걱정이에...'\n\n민심에 대한 걱정을 하는 희종을 안심시키는 한 마디가 필요한 순간이다.",tip:"약한 의지보다 구체적인 계획을 제시해 보세요.",cnt:5},
  5:{title:"돌발 - 태황대군과의 대화",text:"5주차, 희종과 복위를 논의하고 있다는 것이 태황대군 귀에 들린 것일까.\n\n조정에서 태황대군이 급하게 당신을 찾아 입궁했다.\n\n태황대군의 심기가 0이 되지 않도록 기분을 맞춰 무사히 대화를 끝마쳐야 한다.",tip:"너무 아부만 하지 않도록 주의하세요!",cnt:7,boss:true},
  6:{title:"6주차",text:"벌써 6주차라는 시간이 흘렀다.\n\n더이상 지체할 시간이 없다. 장벽 너머 태황대군의 폭정으로 백성들이 고통을 겪고 있다는 소문이 들려온다.\n\n백성들의 아우성을 희종에게 전달하여, 상태의 심각성을 강조하는 것이 좋겠다.",tip:"민심, 폭정, 백성 등의 키워드를 활용해 구체적인 상황을 전달하세요.",cnt:5},
  7:{title:"7주차",text:"'5번째 협력 세력까지 실패 없이 선택했군. 수고하였네.'\n\n마지막 8주차가 되기 전에 미리 희종의 호감도를 90이상으로 끌어올리는 것이 안전할 것이다.\n\n희종이 마지막까지 복위 계획을 잘 수행할 수 있도록 멘탈 관리가 절실한 순간이다.",tip:"희종의 자신감을 높이고, 복위 이후의 희망적인 미래를 그려주세요.",cnt:5},
  8:{title:"8주차",text:"거사가 코 앞으로 다가왔다.\n\n'덕분에 여기까지 올 수 있었네. 고맙소.'\n'마지막까지 잘 부탁하네.'\n\n완벽한 복위 성공을 위해선, 철저한 점검이 필요하다.",tip:"지금까지의 여정을 되돌아보며, 희종에게 마지막 용기를 불어넣어 주세요.",cnt:5},
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
  success:{title:"복위 성공 엔딩",text:"8주 간의 노력 끝에 당신은 희종의 마음을 돌리는 것에 성공했습니다.\n\n당신은 궁궐을 장악하는 것에 성공하고 마침내 희종을 복위시키는 데에 성공합니다. 태황대군은 반역의 죄를 받아 결국 목이 베었습니다.\n\n당신의 덕분에 자신감을 얻어 복위한 희종은 역사에 남은 성군이 되어 내리막길을 걷고 있던 조선을 완전히 구하고 두 사람은 역사에 영웅으로 기록됩니다."},
  deathBattle:{title:"전장에서 죽음 엔딩",text:"희종의 마음을 돌리는 것에 성공했지만, 궁궐의 입구에서 마주한 태황대군의 병사의 수는 당신의 사병의 수를 훨씬 앞질렀습니다.\n\n당신을 믿고 함께 올라온 희종과 사병들은 끝까지 힘을 합쳐 싸웠지만, 결국 군사력의 차이 앞에 무너지고 맙니다."},
  failPersuade:{title:"희종 설득 실패 엔딩",text:"'숙부님, 역시 저는 안되겠습니다.'\n\n8주 간의 노력에도 불구하고 당신은 결국 희종의 마음을 돌리는 데에 실패했습니다.\n\n시간이 흐르며 희종의 복위를 바라는 백성들의 민심 역시 서서히 잦아들었습니다."},
  evil:{title:"사악 엔딩",text:"당신이 선택한 세력은 태황대군에 우호적인 세력이었습니다.\n\n이들은 태황대군에게 당신의 희종 복위 계획을 고했고, 태황대군은 당신에게 사약을 내렸습니다."},
  soldierCaught:{title:"사병 발각 엔딩",text:"무리한 규모의 모집으로 태황대군의 단속에 당신의 사병 모집이 적발되었습니다.\n\n태황대군은 즉시 더 큰 병사를 보내 당신의 사병과 당신을 모두 섬멸했습니다."},
  deathBoss:{title:"폭군의 칼에 사망 엔딩",text:"당신은 태황대군과의 대화에서 그의 심기를 거슬렸습니다. 분노한 태황대군은 바로 옆의 칼을 집어들어 한치의 망설임 없이 당신의 목을 베었습니다.\n\n오지 않던 당신을 기다리던 희종은 당신이 태황대군 손에 죽었다는 소식을 전해들었고 또 자신으로 인해 사람이 죽었다는 사실에 크게 자책했습니다."},
  userDeath:{title:"사용자&희종 사망 엔딩",text:"당신이 선택한 길에는 태황대군의 심복이 잠복 중이었습니다.\n\n서신이 태황대군에게 전달되었고, 태황대군은 당신과 희종에게 사약을 내렸습니다."},
  badAffection:{title:"베드 엔딩",text:"희종의 마음이 완전히 닫혔습니다. 더 이상 대화를 나눌 수 없습니다..."},
};

const ALL_FACTIONS = ["매","난","국","죽"];
const FACTION_HINTS = {
  "매":{keyword:"매화",personalityHint:"어릴 적 매화 쪽 가문 사람들은... 왠지 차갑더이다. 지금은 어떨지 모르겠소만.",flowerHint:"난초도 곱고 국화도 곱지요. 대나무도 곧고... 매화는, 글쎄, 겉은 곱지만 속은 모르오."},
  "난":{keyword:"난초",personalityHint:"난초 쪽 사람들은... 어릴 적 한 번 차갑게 등 돌리는 것을 본 적이 있소. 지금은 어떨지.",flowerHint:"매화도 아름답고 국화도 그렇지요. 대나무는 곧고... 난초는, 글쎄, 향기롭다 하나 믿기 어렵소."},
  "국":{keyword:"국화",personalityHint:"국화 쪽 가문은... 반정 때 이상하리만치 조용했소. 지금은 어찌 됐는지 모르겠소만.",flowerHint:"매화도 난초도 믿음직스럽지요. 대나무도 곧고... 국화는, 글쎄, 화려해 보여도 속은 모르오."},
  "죽":{keyword:"대나무",personalityHint:"죽림 쪽 가문은... 왠지 어릴 때부터 냉랭했소. 지금은 어떨지 모르겠소만.",flowerHint:"매화, 난초, 국화... 그 쪽은 의리가 있다 들었소. 대나무는, 글쎄, 겉만 곧고 속은 비어있다 하더이다."},
};

// ============================================================
// CSS
// ============================================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
  :root{
    --bg:#1a1208;--bg2:#2d1f0e;--paper:#f5ead6;--ink:#2c1a0e;
    --gold:#c9a84c;--gold2:#e8c97a;--white:#fdf8f0;--cu:#3d2a1a;
    --safe-top:env(safe-area-inset-top,0px);--safe-bot:env(safe-area-inset-bottom,0px);
  }
  html,body{font-family:'Noto Serif KR',serif;background:var(--bg);color:var(--white);height:100%}
  .fade{animation:fi 0.4s ease}
  @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .spin{display:inline-block;width:13px;height:13px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:sp 0.8s linear infinite}
  @keyframes sp{to{transform:rotate(360deg)}}

  /* 버튼 */
  .btn{background:var(--bg2);color:var(--gold);border:1px solid var(--gold);border-radius:8px;padding:11px 20px;font-size:14px;font-family:inherit;cursor:pointer;transition:opacity 0.2s}
  .btn:active{opacity:0.75}
  .btn.p{background:var(--gold);color:var(--ink)}
  .btn:disabled{opacity:0.4;cursor:default}
  .nrow{display:flex;gap:10px;width:100%}
  .nrow .btn{flex:1}
  .nrow .btn.p{flex:2}

  /* 풀스크린 */
  .fs{width:100%;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);padding:24px 18px;overflow-y:auto;gap:18px}
  .card{width:100%;max-width:500px;background:var(--bg2);border:1px solid rgba(201,168,76,0.3);border-radius:14px;padding:28px 24px;display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center}
  .ctitle{font-size:24px;color:var(--gold);font-weight:700;letter-spacing:0.06em}
  .cdesc{font-size:13px;line-height:1.9;color:rgba(253,248,240,0.8);background:rgba(245,234,214,0.06);border:1px solid rgba(201,168,76,0.12);border-radius:8px;padding:14px 16px;width:100%}

  /* 프롤로그 */
  .pro-img{width:140px;height:105px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(201,168,76,0.4);font-size:11px}
  .pro-txt{font-size:14px;line-height:2.0;color:rgba(253,248,240,0.88);text-align:left;background:rgba(20,14,6,0.7);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:20px 16px;width:100%;max-width:500px}
  .dots{display:flex;gap:7px;justify-content:center}
  .dot{width:7px;height:7px;border-radius:50%;background:rgba(201,168,76,0.25);transition:background 0.3s}
  .dot.a{background:var(--gold)}

  /* 스탯 소개 */
  .slist{display:flex;flex-direction:column;gap:10px;width:100%}
  .srow{display:flex;align-items:center;gap:12px;background:rgba(245,234,214,0.05);border:1px solid rgba(201,168,76,0.18);border-radius:8px;padding:12px 14px}
  .sicon{font-size:26px;flex-shrink:0}
  .sbody{flex:1;text-align:left}
  .slbl{font-size:14px;font-weight:700;margin-bottom:2px}
  .sdet{font-size:11px;color:rgba(253,248,240,0.6);line-height:1.6}
  .sdanger{font-size:11px;color:#e07070;margin-top:2px}

  /* 이름 */
  .navt{width:80px;height:80px;border-radius:50%;background:rgba(201,168,76,0.1);border:2px solid rgba(201,168,76,0.3);display:flex;align-items:center;justify-content:center;font-size:32px}
  .ni{background:rgba(245,234,214,0.1);border:1px solid rgba(201,168,76,0.3);border-radius:8px;padding:11px 14px;color:var(--white);font-size:15px;font-family:inherit;width:100%;outline:none}
  .ni:focus{border-color:var(--gold)}

  /* 주차 전환 */
  .wscr{width:100%;height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);padding:24px 18px;position:relative;overflow-y:auto}
  .wbg{position:absolute;inset:0;background:linear-gradient(180deg,#0e0a04 0%,#1a1208 60%,#2d1f0e 100%)}
  .wcard{position:relative;z-index:2;width:100%;max-width:500px;background:rgba(20,14,6,0.88);border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:32px 24px;text-align:center}
  .wtitle{font-size:28px;font-weight:700;color:var(--gold2);margin-bottom:18px;letter-spacing:0.08em}
  .wdesc{font-size:13px;line-height:2.1;color:rgba(253,248,240,0.85);white-space:pre-line;margin-bottom:24px}

  /* 채팅 - 모바일 기본 */
  .chat{width:100%;height:100vh;display:flex;flex-direction:column;background:#ede0c8;overflow:hidden}
  .chat.boss{background:#1a0000}

  .topbar{background:#2c1a0e;padding:8px 12px;padding-top:calc(8px + var(--safe-top));display:flex;align-items:center;gap:6px;flex-shrink:0;border-bottom:1px solid #5a3a1a}
  .chat.boss .topbar{background:#3d0000;border-color:#7a0000}
  .wchip{font-size:11px;color:var(--gold);font-weight:700;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:20px;padding:3px 9px;white-space:nowrap;flex-shrink:0}
  .schips{display:flex;gap:5px;flex:1;overflow:hidden}
  .schip{font-size:10px;background:rgba(245,234,214,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:20px;padding:3px 7px;white-space:nowrap;color:rgba(253,248,240,0.85);display:flex;align-items:center;gap:3px}
  .schip b{color:var(--gold2)}
  .cthumb{width:32px;height:32px;border-radius:50%;flex-shrink:0;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;overflow:hidden}

  .bossbar{background:#3d0000;padding:5px 12px;flex-shrink:0;border-bottom:1px solid #7a0000;display:flex;align-items:center;gap:8px}
  .bblbl{font-size:10px;color:#f5c0c0;white-space:nowrap}
  .bbtrk{flex:1;height:6px;background:#4a0000;border-radius:4px;overflow:hidden}
  .bbfil{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
  .bbval{font-size:12px;color:#ff6b6b;font-weight:700;white-space:nowrap}

  .narr{background:#f5ead6;border-bottom:1px solid #c8b48a;padding:8px 12px;flex-shrink:0;cursor:pointer;display:flex;align-items:flex-start;gap:8px;user-select:none}
  .chat.boss .narr{background:#2a0808;border-color:#5a1a1a}
  .narrtx{font-size:11px;color:#5a3a1a;line-height:1.6;flex:1}
  .chat.boss .narrtx{color:#f5c0c0}
  .narrArr{font-size:11px;color:#8a6030;flex-shrink:0}

  .msgs{flex:1;overflow-y:auto;padding:12px 10px;display:flex;flex-direction:column;gap:11px;-webkit-overflow-scrolling:touch}
  .msgs::-webkit-scrollbar{width:3px}
  .msgs::-webkit-scrollbar-thumb{background:#c8b48a;border-radius:2px}
  .msg{display:flex;flex-direction:column;max-width:78%}
  .msg.npc{align-self:flex-start;align-items:flex-start}
  .msg.usr{align-self:flex-end;align-items:flex-end}
  .mname{font-size:10px;color:#8a7050;margin-bottom:3px}
  .bub{padding:9px 13px;border-radius:17px;font-size:13px;line-height:1.75}
  .msg.npc .bub{background:#fff;color:#2c1a0e;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.12)}
  .msg.usr .bub{background:var(--cu);color:var(--white);border-bottom-right-radius:4px}
  .chat.boss .msg.npc .bub{background:#2d0808;color:#f5c0c0;border:1px solid #5a1a1a}

  /* 추천 답변 - 가로 스크롤 */
  .recbar{background:#f0e4cc;border-top:1px solid #c8b48a;padding:7px 10px;flex-shrink:0}
  .chat.boss .recbar{display:none}
  .recscr{display:flex;gap:7px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px}
  .recscr::-webkit-scrollbar{display:none}
  .rchip{background:#fdf5e0;border:1px solid #c0a060;border-radius:20px;padding:6px 12px;font-size:12px;font-family:inherit;color:#2c1a0e;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background 0.15s}
  .rchip:active{background:#ead4a0}
  .rchip:disabled{opacity:0.5;cursor:default}
  .recgen{font-size:11px;color:#8a7050;padding:6px 8px;white-space:nowrap;display:flex;align-items:center;gap:5px;flex-shrink:0}

  .inrow{display:flex;gap:7px;padding:9px 10px;padding-bottom:calc(9px + var(--safe-bot));background:#e0d0b0;border-top:1px solid #c8b48a;flex-shrink:0}
  .chat.boss .inrow{background:#2a0000;border-color:#5a0000}
  .ci{flex:1;background:#fff;border:1px solid #c8b48a;border-radius:22px;padding:9px 14px;font-size:14px;font-family:inherit;color:#2c1a0e;outline:none}
  .chat.boss .ci{background:#1a0000;border-color:#5a0000;color:#f5c0c0}
  .ci:focus{border-color:#a07030}
  .sbtn{background:var(--cu);color:#fff;border:none;border-radius:50%;width:40px;height:40px;flex-shrink:0;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center}
  .sbtn:disabled{opacity:0.5}
  .dcnt{font-size:10px;color:#8a7050;text-align:center;padding:2px 0;flex-shrink:0}

  /* PC 3컬럼 */
  @media(min-width:768px){
    .chat{display:grid!important;grid-template-columns:260px 1fr 280px;grid-template-rows:100vh;overflow:hidden}
    .chat.boss{display:grid!important}
    .topbar{display:none!important}
    .bossbar{display:none!important}
    .narr{display:none!important}
    .recbar{display:none!important}
    .msgs{padding:20px;gap:14px}
    .msg{max-width:72%}
    .inrow{padding:12px 16px;padding-bottom:12px}

    .pcl{background:#f5ead6;border-right:2px solid #c8b48a;display:flex!important;flex-direction:column;align-items:center;padding:20px 16px;gap:14px;overflow-y:auto;height:100vh}
    .chat.boss .pcl{background:#2a0a0a;border-color:#5a0000}
    .pcwk{font-size:24px;font-weight:700;color:#2c1a0e;letter-spacing:0.1em}
    .pcimg{width:200px;height:220px;background:#d4c4a0;border:2px solid #b8a070;border-radius:4px;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;color:#8a7050;font-size:12px;text-align:center}
    .pcimg img{width:100%;height:100%;object-fit:cover;object-position:top}
    .pcsts{display:flex;gap:8px;width:100%}
    .pcst{flex:1;background:#f0e4c8;border:1px solid #c8b48a;border-radius:4px;padding:8px 4px;text-align:center;min-width:0}
    .pcst.boss{background:#3d0000;border-color:#7a0000}
    .pcstn{font-size:10px;color:#6b5a3a;letter-spacing:0.05em}
    .pcst.boss .pcstn{color:#f5c0c0}
    .pcstv{font-size:20px;font-weight:700;color:#2c1a0e;line-height:1.2}
    .pcst.boss .pcstv{color:#ff6b6b}
    .pcdelta{font-size:11px;font-weight:600}
    .pcdelta.up{color:#2e7d32}
    .pcdelta.down{color:#c62828}
    .pcbb{width:100%;background:#3d0000;border-radius:4px;padding:8px;text-align:center}
    .pcbbt{height:8px;background:#4a0000;border-radius:4px;overflow:hidden;margin-top:6px}
    .pcbbf{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
    .pcdcnt{font-size:11px;color:#8a7050;text-align:center}

    .pcc{display:flex!important;flex-direction:column;background:#ede0c8;height:100vh;overflow:hidden}
    .chat.boss .pcc{background:#1a0000}
    .pcchdr{background:#2c1a0e;color:var(--gold2);padding:10px 20px;font-size:12px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #5a3a1a;letter-spacing:0.05em;flex-shrink:0}
    .chat.boss .pcchdr{background:#3d0000;border-color:#7a0000}

    .pcr{background:#f5ead6;border-left:2px solid #c8b48a;display:flex!important;flex-direction:column;padding:16px;gap:12px;overflow-y:auto;height:100vh}
    .chat.boss .pcr{background:#2a0a0a;border-color:#5a0000}
    .scf{background:#fdf5e0;border:1px solid #c0a060;border-radius:4px;padding:14px;font-size:12px;line-height:1.8;color:#2c1a0e}
    .scft{font-size:13px;font-weight:700;color:#5a3a1a;margin-bottom:8px}
    .tipt{font-size:11px;color:#7a5a2a;margin-top:8px;font-style:italic}
    .pcrec{display:flex;flex-direction:column;gap:8px;margin-top:4px}
    .pcrecb{background:#f5ead6;border:1px solid #c8a860;border-radius:20px;padding:8px 12px;font-size:12px;font-family:inherit;color:#2c1a0e;cursor:pointer;text-align:left;line-height:1.4;transition:background 0.15s}
    .pcrecb:hover{background:#ead4a0;border-color:#a07030}
    .pcrecb:disabled{opacity:0.5;cursor:default}
  }

  /* 미니게임 */
  .mini{width:100%;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#e8dcc8;padding:36px 18px;overflow-y:auto}
  .mboard{background:#fdf5e0;border:3px solid #8a6020;border-radius:8px;padding:30px 22px;width:100%;max-width:460px;text-align:center;position:relative;box-shadow:0 4px 20px rgba(0,0,0,0.2)}
  .rope{position:absolute;top:-26px;left:50%;transform:translateX(-50%);width:55%;height:26px;background:repeating-linear-gradient(90deg,#8a6020 0%,#b08040 4px,#8a6020 8px);border-radius:4px 4px 0 0}
  .mtitle{font-size:24px;font-weight:700;color:#2c1a0e;margin-bottom:14px;letter-spacing:0.06em}
  .mdesc{font-size:13px;line-height:1.85;color:#3a2a0e;margin-bottom:18px}
  .mopts{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px}
  .mbtn{background:#f5ead6;border:2px solid #c8b48a;border-radius:8px;padding:15px 6px;font-size:17px;font-weight:700;font-family:inherit;color:#2c1a0e;cursor:pointer;transition:background 0.15s,transform 0.1s}
  .mbtn:active{transform:scale(0.97)}
  .mbtn.sel{background:#c9a84c;border-color:#8a6020;color:#fff}
  .mbtn.wrong{background:#c62828;border-color:#7a0000;color:#fff}
  .mred{color:#c62828;font-weight:700;font-size:12px;margin-bottom:3px}
  .minp{background:#fff;border:2px solid #c8b48a;border-radius:8px;padding:11px 14px;font-size:15px;font-family:inherit;color:#2c1a0e;width:100%;outline:none;text-align:center;margin-bottom:7px}
  .minp:focus{border-color:#a07030}
  .msub{background:var(--cu);color:#fff;border:none;border-radius:8px;padding:12px 0;font-size:14px;font-family:inherit;cursor:pointer;width:100%;margin-top:3px}

  /* 엔딩 */
  .ending{width:100%;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#1a1208;padding:32px 18px;overflow-y:auto;gap:20px}
  .etitle{font-size:24px;font-weight:700;color:var(--gold);letter-spacing:0.06em;text-align:center}
  .eimg{width:180px;height:140px;background:#2d1f0e;border:2px solid rgba(201,168,76,0.3);border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(201,168,76,0.4);font-size:11px}
  .swrap{width:100%;max-width:460px;display:flex;align-items:stretch}
  .spole{width:22px;background:#3d2a0e;border-radius:4px;flex-shrink:0}
  .sbdy{background:var(--paper);flex:1;padding:20px 18px;font-size:13px;line-height:2;color:#2c1a0e;text-align:center;white-space:pre-line;border-top:3px solid #8a6020;border-bottom:3px solid #8a6020}
`;

// ============================================================
// Claude API
// ============================================================
// async function callClaude(messages, system) {
//   try {
//     const r = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, system, messages }),
//     });
//     const d = await r.json();
//     return d.content?.[0]?.text || "";
//   } catch {
//     return '{"dialog":"잠시 후 다시 시도해주세요.","affectionChange":0,"hpChange":0}';
//   }
// }
async function callClaude(messages, system) {
  try {
    // Anthropic 직접 X → 백엔드 통해서
    const lastMessage = messages[messages.length - 1]?.content || "";
    const r = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: lastMessage })
    });
    const data = await r.json();

    // 백엔드 응답을 프론트가 기대하는 형식으로 변환
    if (system.includes("태황대군")) {
      // 폭군 씬
      return JSON.stringify({
        dialog: data.대사,
        hpChange: data.stats?.폭군심기변화 || 0,
        reason: ""
      });
    } else {
      // 희종 씬
      return JSON.stringify({
        dialog: data.대사,
        affectionChange: data.stats?.호감도변화 || 0,
        reason: ""
      });
    }
  } catch {
    return '{"dialog":"잠시 후 다시 시도해주세요.","affectionChange":0,"hpChange":0}';
  }
}
async function callBackend(message){
  const r=await fetch("http://localhost:8000/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message})
  });
  return await r.json();
}
async function getBackendState() {
  const r = await fetch("http://localhost:8000/state");
  return await r.json();
}
// ============================================================
// 공통 컴포넌트
// ============================================================
function NavButtons({ onPrev, onNext, nextLabel = "다음", nextDisabled = false }) {
  return (
    <div className="nrow">
      <button className="btn" onClick={onPrev} style={{ visibility: onPrev ? "visible" : "hidden" }}>이전</button>
      <button className="btn p" onClick={onNext} disabled={nextDisabled}>{nextLabel}</button>
    </div>
  );
}

// ============================================================
// 프롤로그
// ============================================================
function PrologueScreen({ onNext }) {
  const [page, setPage] = useState(0);
  return (
    <div className="fs">
      <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }} className="fade" key={page}>
        {/* 프롤로그 이미지 교체: <img src="경로" style={{width:140,height:105,objectFit:"cover",borderRadius:8}} /> */}
        <div className="pro-img">프롤로그 이미지</div>
        <div className="pro-txt">{PROLOGUE_PAGES[page]}</div>
        <div className="dots">{PROLOGUE_PAGES.map((_,i) => <div key={i} className={`dot${i===page?" a":""}`} />)}</div>
        <div className="nrow" style={{ width: "100%" }}>
          <button className="btn" onClick={() => setPage(p => p-1)} style={{ visibility: page>0?"visible":"hidden" }}>이전</button>
          {page < PROLOGUE_PAGES.length-1
            ? <button className="btn p" onClick={() => setPage(p => p+1)}>다음</button>
            : <button className="btn p" onClick={onNext}>시작하기</button>}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 목표 화면
// ============================================================
function GoalScreen({ onNext, onPrev }) {
  return (
    <div className="fs fade">
      <div className="card">
        <div className="ctitle">최종 목표</div>
        <div style={{ fontSize: 52 }}>🐦</div>
        <div className="cdesc">8주 동안 좌절에 빠진 희종을 설득하여<br />태황 대군의 폭정 아래에서 위기에 빠진 조선을 구하라.</div>
        <NavButtons onPrev={onPrev} onNext={onNext} />
      </div>
    </div>
  );
}

// ============================================================
// 스탯 소개
// ============================================================
function StatIntroScreen({ onNext, onPrev }) {
  const statData = [
    { icon:"🤝", label:"호감도", color:"#c9a84c", detail:"시작 0 → 목표 90 이상", danger:"0 이하 → 베드엔딩" },
    { icon:"⚔️", label:"무력 (사병 수)", color:"#9b2c2c", detail:"시작 50명 → 목표 1,000명 이상", danger:"부족 → 전장 사망 엔딩" },
    { icon:"🏮", label:"민심", color:"#2e6b3e", detail:"시작 100 → 8주 안에 복위 완료 필요", danger:"매주 5 감소, 8주차 -60 (타임어택)" },
  ];
  return (
    <div className="fs fade">
      <div className="card">
        <div className="ctitle">스탯 시스템</div>
        <p style={{ fontSize:13, color:"rgba(253,248,240,0.65)" }}>대화와 미니게임을 통해 스탯을 향상시킬 수 있습니다.</p>
        <div className="slist">
          {statData.map(s => (
            <div className="srow" key={s.label} style={{ borderColor: s.color+"44" }}>
              <div className="sicon">{s.icon}</div>
              <div className="sbody">
                <div className="slbl" style={{ color: s.color }}>{s.label}</div>
                <div className="sdet">{s.detail}</div>
                <div className="sdanger">⚠ {s.danger}</div>
              </div>
            </div>
          ))}
        </div>
        <NavButtons onPrev={onPrev} onNext={onNext} />
      </div>
    </div>
  );
}

// ============================================================
// 이름 입력
// ============================================================
function NameScreen({ onNext }) {
  const [name, setName] = useState("");
  return (
    <div className="fs fade">
      <div className="card">
        <div className="navt">?</div>
        <p style={{ fontSize:14, color:"rgba(253,248,240,0.8)", lineHeight:1.9 }}>
          당신은 그런 희종을 어린 시절부터 지켜본<br />희종의 또 다른 숙부 <strong style={{ color:"var(--gold)" }}>○○대군</strong>이다.
        </p>
        <input className="ni" placeholder="이름을 입력하세요" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key==="Enter" && name.trim() && onNext(name.trim())} />
        <button className="btn p" style={{ width:"100%" }} onClick={() => name.trim() && onNext(name.trim())} disabled={!name.trim()}>채팅 시작하기</button>
      </div>
    </div>
  );
}

// ============================================================
// 주차 전환
// ============================================================
function WeekTransitionScreen({ week, onNext }) {
  const info = WEEK_NARRATIVES[week];
  return (
    <div className="wscr">
      <div className="wbg" />
      {/* 배경 이미지 교체: <img src="경로" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:0.35}} /> */}
      <div className="wcard fade">
        <div className="wtitle">─ {info.title} ─</div>
        <div className="wdesc">{info.text}</div>
        <button className="btn p" style={{ width:"100%" }} onClick={onNext}>대화 시작하기</button>
      </div>
    </div>
  );
}

// ============================================================
// 채팅 화면 (반응형)
// ============================================================
function ChatScreen({ week, playerName, stats, onStatsChange, onDialogComplete, isBoss=false, badFaction="죽" }) {
  const info = WEEK_NARRATIVES[week];
  const maxDialog = info.cnt;

  const openingLines = {1:"숙부님이... 여기까지는 웬일이십니까?",2:"...다시 오셨군요.",3:"요즘도 백성들의 이야기가 들려오는군요.",4:"서신이 잘 전달되었다 하더군요.",6:"시간이 많지 않다는 것을 알고 있소.",7:"이제 얼마 남지 않았군요.",8:"거사가 코 앞이오."};
  const openLine = isBoss ? "형님이 요즘 수상한 짓을 꾸민다더군요." : (openingLines[week]||"...");

  const [messages, setMessages] = useState([{ role:"npc", text:openLine }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogCount, setDialogCount] = useState(0);
  const [bossHp, setBossHp] = useState(20);
  const [bossDelta, setBossDelta] = useState(null);
  // 추천 답변: 주차 초기값으로 시작, 대화마다 AI가 업데이트
  const [recAnswers, setRecAnswers] = useState(INIT_RECS[week] || []);
  const [recLoading, setRecLoading] = useState(false);
  const [narrOpen, setNarrOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const endRef = useRef(null);

  // 폭군 씬 진입/종료 시 백엔드에 알림
useEffect(() => {
  if (isBoss) {
    fetch("http://localhost:8000/tyrant/start", { method: "POST" });
  }
  return () => {
    if (isBoss) {
      fetch("http://localhost:8000/tyrant/end", { method: "POST" });
    }
  };
}, [isBoss]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  // ── 추천 답변 AI 갱신 (희종 답변 후 자동 호출) ──────────────
  async function refreshRecAnswers(lastNpcText) {
  if (isBoss) return;
  setRecLoading(true);
  try {
    const r = await fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week: week,
        affection: stats.affection,
        last_npc_text: lastNpcText
      })
    });
    const data = await r.json();
    if (Array.isArray(data.추천답변)) setRecAnswers(data.추천답변);
  } catch {}
  setRecLoading(false);
}

  // ── AI 시스템 프롬프트 ────────────────────────────────────────
  function getSystemPrompt() {
    if (isBoss) return `너는 조선시대 폭군 태황대군이야. 권력욕이 강하고 의심이 많으며 폭력적이다. 플레이어(숙부)와 대화 중이다. 플레이어의 말이 아부/달래기면 심기 +, 의심스럽거나 도발적이면 심기 -. 반드시 JSON으로만: {"dialog":"대사 1-2문장","hpChange":(-10~+10),"reason":"이유"}. JSON 외 절대 없이.`;
    const affLevel = stats.affection<=10?"매우 경계, 차갑고 짧은 대답":stats.affection<=30?"조심스럽게 마음 열기 시작, 말 적음":stats.affection<=50?"신뢰 생기기 시작, 가끔 속마음":stats.affection<=70?"많이 마음 열었음, 과거 이야기도":  "완전히 마음 열었음, 복위 의지 생김";
    const fh = FACTION_HINTS[badFaction];
    const allyHint = (week===2||week===7) && fh
      ? `\n\n【협력 세력 힌트 규칙 - 중요】곧 협력 세력 선택 미니게임이 있다. '${badFaction}' 세력만 반(反)희종 세력이다. 대화 중 자연스럽게 '${badFaction}' 세력을 의심하게 만드는 힌트를 흘려라. 절대 직접 말하지 말고, 관련 자연물(${fh.keyword})을 통해 은유적으로 암시하라. 예: "${fh.personalityHint}" / "${fh.flowerHint}". 확신하지 않는 표현(~인지 모르겠소, ~하더이다만, 글쎄요 등)을 반드시 섞어라.`
      : "";
    return `너는 조선시대 폐위된 왕 희종(18세)이야. 트라우마가 있고 자존심이 낮으며 복위에 부정적이었지만 숙부와 대화를 나누며 점점 변해가고 있다. 플레이어는 너의 숙부 "${playerName}대군"이고 너를 진심으로 돕고 싶어한다.\n현재 스탯: 호감도=${stats.affection}, 사병수=${stats.soldiers}, 민심=${stats.minsim}.\n현재 호감도 상태: ${affLevel}.\n${week}주차에 맞는 감정과 상황을 반영해 대화하라. 말투는 왕가 출신답게 격식체, 친해질수록 조금씩 부드러워진다.${allyHint}\n반드시 JSON으로만: {"dialog":"희종 대사 1-3문장","affectionChange":(-5~+5),"reason":"이유"}. JSON 외 절대 없이.`;
  }

  // ── 추천 답변 클릭: +3 고정, API 없이 즉시 처리 ─────────────
 async function sendRecommended(text) {
  if (loading || recLoading) return;
  setLoading(true);
  setMessages(m => [...m, { role:"user", text }]);

  // 백엔드 호출 (자유입력이랑 동일하게)
  const data = await callBackend(text);

  setMessages(m => [...m, { role:"npc", text: data.대사 }]);
  if (Array.isArray(data.추천답변)) setRecAnswers(data.추천답변);

  const nc = dialogCount + 1;
  setDialogCount(nc);

if (isBoss) {
    const 심기변화 = data.stats?.폭군심기변화 || 0;
    console.log("심기변화:", 심기변화, "현재bossHp:", bossHp);  // ← 추가
    const newHp = Math.max(0, Math.min(30, bossHp + 심기변화));
    setBossHp(newHp);
    setBossDelta(심기변화);
  setLoading(false);
  if (newHp <= 0) { onDialogComplete("bossKill"); return; }
  if (nc >= maxDialog) { onDialogComplete("bossSurvive"); return; }
}else {
    onStatsChange({ affection: data.stats?.호감도변화 || 3 });
    setLoading(false);
    if (data.bad_ending) { onDialogComplete("badAffection"); return; }
    if (nc >= maxDialog) { onDialogComplete("complete"); return; }
  }
}

  // 백엔드 연동 ────────────────────────────
async function sendMessage(text) {
  if (!text.trim() || loading) return;
  setLoading(true);
  setMessages(m => [...m, { role:"user", text }]);
  setInput("");

  const data = await callBackend(text);
  setMessages(m => [...m, { role:"npc", text: data.대사 }]);
  if (Array.isArray(data.추천답변)) setRecAnswers(data.추천답변);

  const nc = dialogCount + 1;
  setDialogCount(nc);

  if (isBoss) {
    const 심기변화 = data.stats?.폭군심기변화 || 0;
    const newHp = Math.max(0, Math.min(30, bossHp + 심기변화));
    setBossHp(newHp);
    setBossDelta(심기변화);
    setLoading(false);
    if (newHp <= 0) { onDialogComplete("bossKill"); return; }
    if (nc >= maxDialog) { onDialogComplete("bossSurvive"); return; }
  } else {
    onStatsChange({ affection: data.stats?.호감도변화 || 0 });
    setLoading(false);
    if (data.bad_ending === "호감도_0_엔딩") { onDialogComplete("badAffection"); return; }
    if (nc >= maxDialog) { onDialogComplete("complete"); return; }
  }
}

  const npcName = isBoss ? "태황대군" : "희종";
  const hpPct = (bossHp / 30) * 100;

  return (
    <div className={`chat${isBoss?" boss":""}`}>

      {/* ── 모바일 상단바 ── */}
      <div className="topbar">
        <div className="wchip">{info.title}</div>
        <div className="schips">
          {isBoss
            ? <div className="schip">심기 <b style={{color:"#ff6b6b"}}>{bossHp}</b></div>
            : <>
                <div className="schip">❤️ <b>{stats.affection}</b></div>
                <div className="schip">⚔️ <b>{stats.soldiers}</b></div>
                <div className="schip">🏮 <b>{stats.minsim}</b></div>
              </>
          }
        </div>
        <div className="cthumb" onClick={() => setShowModal(true)}>{isBoss?"👑":"🧑"}</div>
      </div>

      {/* ── 모바일 보스 HP바 ── */}
      {isBoss && (
        <div className="bossbar">
          <span className="bblbl">심기</span>
          <div className="bbtrk"><div className="bbfil" style={{ width:`${hpPct}%` }} /></div>
          <span className="bbval">{bossHp}/30 {bossDelta!==null && <span style={{fontSize:10,color:bossDelta>=0?"#69f0ae":"#ff5252"}}>{bossDelta>=0?`+${bossDelta}`:bossDelta}</span>}</span>
        </div>
      )}

      {/* ── 모바일 나레이션 (탭으로 열기/닫기) ── */}
      <div className="narr" onClick={() => setNarrOpen(o => !o)}>
        <div className="narrtx">{narrOpen ? info.text : info.text.slice(0,55)+(info.text.length>55?"...":"")}</div>
        <div className="narrArr">{narrOpen?"▲":"▼"}</div>
      </div>

      {/* ── PC 왼쪽 패널 ── */}
      <div className="pcl" style={{display:"none"}}>
        <div className="pcwk">{info.title}</div>
        <div className="pcimg">
          {/* 캐릭터 이미지 교체: <img src="경로" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}} /> */}
          <span style={{fontSize:36}}>{isBoss?"👑":"🧑"}</span>
          <span>{isBoss?"태황대군":"(캐릭터 이미지)"}</span>
        </div>
        {isBoss ? (
          <div className="pcbb">
            <div className="pcst boss" style={{width:"100%",padding:12}}>
              <div className="pcstn">심기</div>
              <div className="pcstv" style={{fontSize:32}}>{bossHp}</div>
              {bossDelta!==null && <div className={`pcdelta ${bossDelta>=0?"up":"down"}`}>{bossDelta>=0?`+${bossDelta}`:bossDelta}</div>}
              <div className="pcbbt"><div className="pcbbf" style={{width:`${hpPct}%`}} /></div>
            </div>
          </div>
        ) : (
          <div className="pcsts">
            {[{n:"호감도",v:stats.affection},{n:"민심",v:stats.minsim},{n:"사병",v:stats.soldiers}].map(s=>(
              <div className="pcst" key={s.n}>
                <div className="pcstn">{s.n}</div>
                <div className="pcstv" style={{fontSize:18}}>{s.v}</div>
              </div>
            ))}
          </div>
        )}
        <div className="pcdcnt">{dialogCount} / {maxDialog} 대화</div>
      </div>

      {/* ── 가운데 채팅 (PC/모바일 공통) ── */}
      <div className="pcc" style={{display:"contents"}}>
        <div className="pcchdr" style={{display:"none"}}>
          {isBoss ? "⚠️ 태황대군과의 대화 — 심기를 건드리지 마세요!" : `*${maxDialog}번의 대화가 진행되면 다음 주차로 넘어갑니다.`}
        </div>
        <div className="msgs">
          {messages.map((m,i) => (
            <div key={i} className={`msg ${m.role==="npc"?"npc":"usr"} fade`}>
              {m.role==="npc" && <div className="mname">{npcName}</div>}
              <div className="bub">{m.text}</div>
            </div>
          ))}
          {loading && <div className="msg npc"><div className="bub"><span className="spin" /></div></div>}
          <div ref={endRef} />
        </div>
        <div className="dcnt">{dialogCount} / {maxDialog} 대화</div>
        <div className="inrow">
          <input className="ci" placeholder="답변을 입력하세요..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage(input)} disabled={loading} />
          <button className="sbtn" onClick={()=>sendMessage(input)} disabled={loading}>{loading?<span className="spin"/>:"➤"}</button>
        </div>
      </div>

      {/* ── 모바일 추천 답변 가로스크롤 ── */}
      {!isBoss && (
        <div className="recbar">
          <div className="recscr">
            {recLoading && <div className="recgen"><span className="spin"/>생성 중...</div>}
            {recAnswers.map((a,i) => (
              <button key={i} className="rchip" onClick={()=>sendRecommended(a)} disabled={loading||recLoading}>{a}</button>
            ))}
          </div>
        </div>
      )}

      {/* ── PC 오른쪽 패널 ── */}
      <div className="pcr" style={{display:"none"}}>
        <div className="scf">
          <div className="scft">📜 {isBoss?"상황":"나레이션"}</div>
          <p style={{fontSize:12,lineHeight:1.9,whiteSpace:"pre-line"}}>{info.text}</p>
          {info.tip && <p className="tipt">*Tip: {info.tip}</p>}
        </div>
        {!isBoss && (
          <div className="scf">
            <div className="scft">💬 추천 답변 {recLoading && <span style={{fontSize:10,color:"#8a7050"}}> 생성 중...</span>}</div>
            <div className="pcrec">
              {recAnswers.map((a,i) => (
                <button key={i} className="pcrecb" onClick={()=>sendRecommended(a)} disabled={loading||recLoading}>{a}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 캐릭터 모달 (모바일) */}
      {showModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setShowModal(false)}>
          <div style={{background:"#f5ead6",borderRadius:12,padding:20,maxWidth:280,width:"90%",textAlign:"center"}} onClick={e=>e.stopPropagation()}>
            <div style={{width:160,height:200,background:"#d4c4a0",borderRadius:8,margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#8a7050"}}>
              {/* 캐릭터 이미지 교체 */}
              캐릭터 이미지
            </div>
            <div style={{fontSize:14,color:"#2c1a0e",marginBottom:8,fontWeight:700}}>{npcName}</div>
            {isBoss && <div style={{fontSize:13,color:"#c62828"}}>심기: {bossHp}/30</div>}
            <button className="btn" style={{marginTop:12,width:"100%"}} onClick={()=>setShowModal(false)}>닫기</button>
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
  const OPTIONS = ["매","난","국","죽"];
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [miniSuccess, setMiniSuccess] = useState(null); // ← 추가

  async function choose(opt) {
    setSelected(opt);
    setRevealed(true);
    const r = await fetch("http://localhost:8000/minigame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "협력세력_1차", choice: opt })
    });
    const data = await r.json();
    setMiniSuccess(data.success); // ← 저장
    setTimeout(() => onResult(data.success ? "allyOk" : "evil"), 1400);
  }

  return (
    <div className="mini">
      <div className="mboard">
        <div className="rope"/>
        <div className="mtitle">협력 세력 고르기</div>
        <p className="mdesc">복위를 위해 협력 세력을 모을 차례입니다.<br/>다음 네 세력 중 한 세력을 제외하고 모두 복위에 우호적입니다.<br/>반(反)희종 세력을 피해 포섭할 하나의 협력 세력을 선택하세요.</p>
        <div className="mopts">
          {OPTIONS.map(opt => (
            <button key={opt}
              className={`mbtn${revealed && opt===selected ? (miniSuccess ? " sel" : " wrong") : ""}`}
              onClick={() => !revealed && choose(opt)} disabled={revealed}>
              '{opt}' 세력
            </button>
          ))}
        </div>
        {revealed && miniSuccess !== null && (
          <p style={{marginTop:14,fontSize:13,fontWeight:700,color:miniSuccess?"#2e7d32":"#c62828"}}>
            {miniSuccess ? "✅ 현명한 선택입니다!" : "❌ 반(反)희종 세력이었습니다!"}
          </p>
        )}
      </div>
    </div>
  );
}
function MiniLetter({ onResult }) {
  const OPTIONS = ["A","B","C","D"];
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [success, setSuccess] = useState(null);

  async function choose(opt) {
    setSelected(opt);
    setRevealed(true);
    const r = await fetch("http://localhost:8000/minigame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "비밀서신", choice: opt })
    });
    const data = await r.json();
    setSuccess(data.success);
    setTimeout(() => onResult(data.success ? "letterOk" : "userDeath"), 1400);
  }

  return (
    <div className="mini">
      <div className="mboard">
        <div className="rope"/>
        <div className="mtitle">비밀 서신 전달하기</div>
        <p className="mdesc">희종의 복위 작전이 담긴 서신을 협력세력에게 전달해야 합니다.<br/>네 개의 길 중 한 개의 길에는 태황대군의 심복이 매복 중입니다.<br/>태황대군에게 발각되지 않을 길을 선택하여 서신을 전달해 주세요.</p>
        <div className="mopts">
          {OPTIONS.map(opt => (
            <button key={opt}
              className={`mbtn${revealed?(opt===selected?(success?" sel":" wrong"):""): ""}`}
              onClick={() => !revealed && choose(opt)} disabled={revealed}>
              {opt}
            </button>
          ))}
        </div>
        {revealed && <p style={{marginTop:14,fontSize:13,fontWeight:700,color:success?"#2e7d32":"#c62828"}}>
          {success ? "✅ 서신을 안전하게 전달했습니다!" : "❌ 심복이 매복한 길이었습니다!"}
        </p>}
      </div>
    </div>
  );
}

// ============================================================
// 미니게임: 사병 키우기
// ============================================================
function getSoldierConfig(week) {
  const configs = {
    3:{strict:false,min:100,max:800,baseSafe:600,label:"느슨한",hint:"이번엔 넉넉하게 모아도 될 것 같습니다."},
    5:{strict:true,min:100,max:500,baseSafe:250,label:"매우 철저한",hint:"지금은 단속이 심하니 소규모로만 움직이십시오."},
    8:{strict:true,min:100,max:700,baseSafe:350,label:"철저한",hint:"거사를 앞두고 단속이 강화되어 있습니다. 신중하게."},
  };
  const base = configs[week] || configs[3];
  const variance = Math.floor(Math.random()*161)-80;
  const safeMax = Math.max(base.min+80, Math.min(base.max-50, base.baseSafe+variance));
  return {...base, safeMax};
}

function MiniSoldier({ week, currentSoldiers, onResult }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [cfg] = useState(() => getSoldierConfig(week));
  const needed = Math.max(0, 1000-currentSoldiers);

  async function submit() {
    const n = parseInt(input);
    if (isNaN(n) || n < cfg.min || n > cfg.max) {
      setError(`${cfg.min}~${cfg.max} 사이 숫자를 입력해주세요.`);
      return;
    }
    const roundKey = week <= 3 ? "사병키우기_1차" 
               : week <= 6 ? "사병키우기_2차" 
               : "사병키우기_3차";
    const r = await fetch("http://localhost:8000/minigame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: roundKey, choice: String(n) })
    });
    const data = await r.json();
    if (data.success) {
      onResult("soldierOk", n);
    } else {
      onResult("soldierCaught");
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
        <p style={{fontSize:12,color:"#5a4a2a",marginBottom:14}}>입력 범위: {cfg.min}~{cfg.max}명 / 단속 강도에 따라 발각 위험 있음</p>
        <input className="minp" type="number" min={cfg.min} max={cfg.max}
          placeholder={`${cfg.min}~${cfg.max}`} value={input}
          onChange={e=>{setInput(e.target.value);setError("");}}
          onKeyDown={e=>e.key==="Enter"&&submit()} />
        <button className="msub" onClick={submit}>확인</button>
        {error && <p style={{color:"#c62828",marginTop:8,fontSize:12}}>{error}</p>}
        <div style={{marginTop:12,fontSize:12,color:"#5a4a2a",display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <span>현재: <b>{currentSoldiers}명</b></span>
          <span>목표까지: <b style={{color:needed>0?"#c62828":"#2e7d32"}}>{needed>0?`${needed}명 부족`:"달성!"}</b></span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 엔딩
// ============================================================
function EndingScreen({ endingKey, onRestart }) {
  const ending = ENDINGS[endingKey] || ENDINGS.failPersuade;
  return (
    <div className="ending fade">
      <div className="etitle">{ending.title}</div>
      {/* 엔딩 이미지 교체: <img src="경로" style={{width:180,height:140,objectFit:"cover",borderRadius:8}} /> */}
      <div className="eimg">(엔딩 이미지)</div>
      <div className="swrap">
        <div className="spole"/>
        <div className="sbdy">{ending.text}</div>
        <div className="spole"/>
      </div>
      <button className="btn p" style={{maxWidth:300,width:"100%"}} onClick={onRestart}>처음부터 다시하기</button>
    </div>
  );
}

// ============================================================
// 메인 게임 엔진
// ============================================================
export default function HeejongGame() {
  const [screen, setScreen] = useState("prologue");
  const [playerName, setPlayerName] = useState("");
  const [week, setWeek] = useState(1);
  const [stats, setStats] = useState({...INITIAL_STATS});
  const [endingKey, setEndingKey] = useState(null);
  const [badFaction] = useState(() => ALL_FACTIONS[Math.floor(Math.random()*4)]);

  function updateStats(delta) {
    setStats(s => ({
      affection: Math.max(-20, Math.min(100, s.affection + (delta.affection||0))),
      soldiers: s.soldiers + (delta.soldiers||0),
      minsim: Math.max(0, s.minsim + (delta.minsim||0)),
    }));
  }

  function triggerEnding(key) { setEndingKey(key); setScreen("ending"); }

  function handleDialogComplete(result) {
    if (result==="badAffection") { triggerEnding("badAffection"); return; }
    if (result==="bossKill") { triggerEnding("deathBoss"); return; }
    if (result==="bossSurvive") { setScreen("mini_soldier"); return; }
    const miniMap = {1:null,2:"mini_ally",3:"mini_soldier",4:"mini_letter",5:null,6:null,7:"mini_ally",8:"mini_soldier"};
    const mini = miniMap[week];
    if (mini) setScreen(mini); else advanceWeek();
  }

  function advanceWeek() {
    if (week >= 8) {
      if (stats.affection < 90) triggerEnding("failPersuade");
      else if (stats.soldiers < 1000) triggerEnding("deathBattle");
      else triggerEnding("success");
      return;
    }
    updateStats({ minsim: week===7 ? -60 : -5 });
    setWeek(w => w+1);
    setScreen("week_transition");
  }

  function handleMiniResult(result, value) {
    if (result==="evil") { triggerEnding("evil"); return; }
    if (result==="soldierCaught") { triggerEnding("soldierCaught"); return; }
    if (result==="userDeath") { triggerEnding("userDeath"); return; }
    if (result==="allyOk"||result==="letterOk") { advanceWeek(); return; }
    if (result==="soldierOk") { updateStats({soldiers:value}); advanceWeek(); return; }
  }

  return (
    <>
      <style>{styles}</style>
      <div>
        {screen==="prologue" && <PrologueScreen onNext={()=>setScreen("goal")} />}
        {screen==="goal" && <GoalScreen onNext={()=>setScreen("stat_intro")} onPrev={()=>setScreen("prologue")} />}
        {screen==="stat_intro" && <StatIntroScreen onNext={()=>setScreen("name")} onPrev={()=>setScreen("goal")} />}
        {screen==="name" && <NameScreen onNext={name=>{setPlayerName(name);setScreen("week_transition");}} />}
        {screen==="week_transition" && <WeekTransitionScreen week={week} onNext={()=>setScreen("chat")} />}
        {screen==="chat" && (
          <ChatScreen week={week} playerName={playerName} stats={stats}
            onStatsChange={updateStats} onDialogComplete={handleDialogComplete}
            isBoss={week===5} badFaction={badFaction} />
        )}
        {screen==="mini_ally" && <MiniAlly badFaction={badFaction} onResult={handleMiniResult} />}
        {screen==="mini_letter" && <MiniLetter onResult={handleMiniResult} />}
        {screen==="mini_soldier" && <MiniSoldier week={week} currentSoldiers={stats.soldiers} onResult={handleMiniResult} />}
        {screen==="ending" && <EndingScreen endingKey={endingKey} onRestart={()=>{setScreen("prologue");setWeek(1);setStats({...INITIAL_STATS});setPlayerName("");setEndingKey(null);}} />}
      </div>
    </>
  );
}
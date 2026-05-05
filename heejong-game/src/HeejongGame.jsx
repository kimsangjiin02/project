

// import { useState, useEffect, useRef } from "react";

// // ============================================================
// // 게임 상수
// // ============================================================
// const INITIAL_STATS = { affection: 0, soldiers: 50, minsim: 100 };

// const PROLOGUE_PAGES = [
//   "1400년대의 조선, 12세의 어린 나이에 제 6대 왕 희종이 즉위하게 된다. 그러나 즉위 1년 만에 숙부인 태황대군이 난을 일으켜 정권을 장악하여 실권을 강제로 빼앗기게 된다. 왕위에서 쫓겨난 희종은 시골의 어느 마을로 유배를 가게 된다.",
//   "한편, 왕위를 장악한 태황대군은 조선의 역사에 없었던 폭정을 휘두른다. 궐에서는 날마다 사람이 죽어나가고, 태황대군의 사치로 궐의 곳간 역시 빠르게 비게 된다. 당연하게 백성들의 민심은 나날이 흉흉해졌다. 심지어는 곳곳에서 희종의 복위를 바라는 목소리 역시 들려오기 시작했다.",
//   "반정으로 인해 희종은 자신 때문에 충신들이 모두 죽임 당했다는 극심한 죄책감에 시달리고 있다. 왕으로서의 모든 자존심도, 자신감도 사라진 상태이다. 희종은 이제 유배지에서 죽을 날만을 하루하루 기다리며 무기력하게 살고 있다.",
//   "당신은 그런 희종을 어린 시절부터 지켜본 희종의 또 다른 숙부이다. 당신은 8주 이내에 좌절에 빠진 희종을 설득하여 희종을 복위시키고, 태황 대군의 폭정 아래에서 위기에 빠진 조선을 구하라.",
// ];

// const WEEK_NARRATIVES = {
//   1:{title:"1주차",text:"당신은 희종이 머무는 유배지에 처음 발을 들입니다.\n\n그는 반정 이후, 누구도 믿지 못한 채 스스로를 단절시키고 있습니다. 조심스럽게 거리를 좁히며, 경계를 허물 대화를 시도해 보세요.",tip:"처음부터 목적을 드러내기보다는, 안부를 묻거나 과거를 회상하는 등 부담 없는 이야기로 시작해 보세요.",cnt:5},
//   2:{title:"2주차",text:"태황대군 세력에 의해 반정을 당한 뒤 2주가 지났다.\n\n여전히 희종은 당신을 완전히는 믿지 못하겠다는 표정이다.\n\n희종에게 당신에 대한 신뢰도를 높일 수 있도록 대화를 시도해보자.",tip:"복위나 권력에 대한 이야기보다는, 희종의 현재 삶과 감정에 공감해 보세요.",cnt:5},
//   3:{title:"3주차",text:"어느덧 왕위에서 쫓겨난지 3주가 흘렀다.\n\n희종은 여전히 자신의 상황에 대해 불안한 눈빛이지만 당신에 대한 의심은 줄어든 듯 보인다.",tip:"백성들이 아직 희종을 기억하고 있으며, 그의 복위를 바라고 있다는 사실을 전해 보세요.",cnt:5},
//   4:{title:"4주차",text:"4주차, 희종은 복위에 대한 마음을 굳힌다.\n\n'비밀 서신을 전달하느라 수고 많았네.'\n'좋소. 내 당신을 한 번 믿어보도록 하겠네.'\n\n민심에 대한 걱정을 하는 희종을 안심시키는 한 마디가 필요한 순간이다.",tip:"약한 의지보다 구체적인 계획을 제시해 보세요.",cnt:5},
//   5:{title:"돌발 - 태황대군과의 대화",text:"5주차, 희종과 복위를 논의하고 있다는 것이 태황대군 귀에 들린 것일까.\n\n조정에서 태황대군이 급하게 당신을 찾아 입궁했다.\n\n태황대군의 심기가 0이 되지 않도록 기분을 맞춰 무사히 대화를 끝마쳐야 한다.",tip:"너무 아부만 하지 않도록 주의하세요!",cnt:7,boss:true},
//   6:{title:"6주차",text:"벌써 6주차라는 시간이 흘렀다.\n\n더이상 지체할 시간이 없다. 백성들의 아우성을 희종에게 전달하여, 상태의 심각성을 강조하는 것이 좋겠다.",tip:"민심, 폭정, 백성 등의 키워드를 활용해 구체적인 상황을 전달하세요.",cnt:5},
//   7:{title:"7주차",text:"마지막 8주차가 되기 전에 미리 희종의 호감도를 90이상으로 끌어올리는 것이 안전할 것이다.\n\n희종이 마지막까지 복위 계획을 잘 수행할 수 있도록 멘탈 관리가 절실한 순간이다.",tip:"희종의 자신감을 높이고, 복위 이후의 희망적인 미래를 그려주세요.",cnt:5},
//   8:{title:"8주차",text:"거사가 코 앞으로 다가왔다.\n\n'덕분에 여기까지 올 수 있었네. 고맙소.'\n'마지막까지 잘 부탁하네.'",tip:"지금까지의 여정을 되돌아보며, 희종에게 마지막 용기를 불어넣어 주세요.",cnt:5},
// };

// const INIT_RECS = {
//   1:["오랜만입니다, 전하.","어떻게 지내고 계십니까?","몸 상하신 곳은 없으십니까?","잠자리는 편안하신지요?","소인이 전하를 도우러 왔습니다."],
//   2:["밤새 눈이 많이 내렸습니다. 창 밖을 한번 보시지요.","마당에 매화가 피었습니다.","귀한 서책을 가져왔습니다.","반찬을 준비해 봤습니다.","귀한 떡차를 구했습니다."],
//   3:["백성들은 아직 전하를 잊지 않았습니다.","조정의 폭정으로 눈물 흘리는 백성이 너무 많습니다.","백성들에게 유일한 빛은 전하입니다.","민심이 천심이라 하였습니다.","백성들의 손을 닦아줄 수 있는 손은 오직 전하뿐입니다."],
//   4:["유배지 인근 산세에 사병들을 매복시켜 두었습니다.","궁궐 내 근군 병장과 교감을 마쳤습니다.","미리 준비한 복위 조서를 배포할 것입니다.","전하께서는 앞장서 걷기만 하십시오.","태황대군이 연회를 여는 보름날을 노리는 것이 좋을 것 같습니다."],
//   5:["아, 그저 옛 이야기나 나누었을 뿐입니다.","태황대군 형님의 치세가 참으로 훌륭하십니다.","소인이 감히 무슨...그저 문안 인사를 드렸을 뿐입니다.","형님의 뜻을 따를 뿐이옵니다."],
//   6:["백성들의 아우성이 이미 도성을 넘어섰습니다.","조정의 폭정으로 논밭이 황폐해지고 있습니다.","아이들이 굶주리고 있다는 소식을 들었습니다.","민심이 이미 태황대군을 떠났습니다.","지금 행동하지 않으면 조선이 무너질 것입니다."],
//   7:["전하께서는 이미 충분히 준비되어 있습니다.","복위 후의 조선은 분명 빛날 것입니다.","많은 이들이 전하를 믿고 기다리고 있습니다.","전하의 결단이 조선의 미래를 바꿀 것입니다."],
//   8:["지금까지의 준비는 완벽했습니다.","전하와 함께라면 반드시 성공할 것입니다.","마지막까지 소인이 곁에 있겠습니다.","조선의 백성들이 전하를 기다리고 있습니다."],
// };

// const ENDINGS = {
//   success:{title:"복위 성공 엔딩",text:"8주 간의 노력 끝에 당신은 희종의 마음을 돌리는 것에 성공했습니다.\n\n당신은 궁궐을 장악하는 것에 성공하고 마침내 희종을 복위시키는 데에 성공합니다. 태황대군은 반역의 죄를 받아 결국 목이 베었습니다.\n\n당신의 덕분에 자신감을 얻어 복위한 희종은 역사에 남은 성군이 되어 두 사람은 역사에 영웅으로 기록됩니다."},
//   deathBattle:{title:"전장에서 죽음 엔딩",text:"희종의 마음을 돌리는 것에 성공했지만, 궁궐의 입구에서 마주한 태황대군의 병사의 수는 당신의 사병의 수를 훨씬 앞질렀습니다.\n\n당신을 믿고 함께 올라온 희종과 사병들은 끝까지 힘을 합쳐 싸웠지만, 결국 군사력의 차이 앞에 무너지고 맙니다."},
//   failPersuade:{title:"희종 설득 실패 엔딩",text:"'숙부님, 역시 저는 안되겠습니다.'\n\n8주 간의 노력에도 불구하고 당신은 결국 희종의 마음을 돌리는 데에 실패했습니다."},
//   evil:{title:"사악 엔딩",text:"당신이 선택한 세력은 태황대군에 우호적인 세력이었습니다.\n\n이들은 태황대군에게 당신의 희종 복위 계획을 고했고, 태황대군은 당신에게 사약을 내렸습니다."},
//   soldierCaught:{title:"사병 발각 엔딩",text:"무리한 규모의 모집으로 태황대군의 단속에 당신의 사병 모집이 적발되었습니다.\n\n태황대군은 즉시 더 큰 병사를 보내 당신의 사병과 당신을 모두 섬멸했습니다."},
//   deathBoss:{title:"폭군의 칼에 사망 엔딩",text:"당신은 태황대군과의 대화에서 그의 심기를 거슬렸습니다. 분노한 태황대군은 바로 옆의 칼을 집어들어 한치의 망설임 없이 당신의 목을 베었습니다."},
//   userDeath:{title:"사용자&희종 사망 엔딩",text:"당신이 선택한 길에는 태황대군의 심복이 잠복 중이었습니다.\n\n서신이 태황대군에게 전달되었고, 태황대군은 당신과 희종에게 사약을 내렸습니다."},
//   badAffection:{title:"베드 엔딩",text:"희종의 마음이 완전히 닫혔습니다. 더 이상 대화를 나눌 수 없습니다..."},
//   poison:{title:"사약 엔딩",text:"태황대군은 당신의 행동이 수상하다는 것을 눈치채고 있었습니다.\n\n결국 당신에게 사약을 내렸습니다. 희종을 복위시키려던 모든 계획은 물거품이 되었습니다."},
// };

// const ALL_FACTIONS = ["매","난","국","죽"];
// const API = process.env.REACT_APP_API_URL || "http://localhost:8000";

// // ============================================================
// // 이미지 경로 설정 — 나중에 이 부분만 바꾸면 됩니다!
// // src/assets/ 폴더에 파일 넣고 경로 수정
// // ============================================================
// const IMAGES = {
//   // 프롤로그: 4장 배경 이미지 (각 페이지별)
//   prologue1:      "/assets/images/prologue1.png",
//   prologue2:      "/assets/images/prologue2.png",
//   prologue3:      "/assets/images/prologue3.png",
//   prologue4:      "/assets/images/prologue.png",

//   playerAvatar:   "/assets/images/player_avatar.png",
//   phoenix:        "/assets/images/phoenix.png",
//   statAffection:  "/assets/images/stat_affection.png",
//   statSoldier:    "/assets/images/stat_soldier.png",
//   statMinsim:     "/assets/images/stat_minsim.png",
//   weekBg:         "/assets/images/week_bg.png",
//   heejongLow:     "/assets/images/heejong_low.png",
//   heejongMid:     "/assets/images/heejong_mid.png",
//   heejongHigh:    "/assets/images/heejong_high.png",

//   // 태황대군: 심기 구간별 (0~30 분노, 31~60 평상, 61~100 기분좋음)
//   tyrantAngry:    "/assets/images/tyrant_angry.png",
//   tyrantNormal:   "/assets/images/tyrant_normal.png",
//   tyrantHappy:    "/assets/images/tyrant_happy.png",

//   // 미니게임 배경 (각각 다른 이미지)
//   miniBgAlly:       "/assets/images/mini_ally.png",
//   miniBgLetter:     "/assets/images/mini_letter.png",
//   miniBgSoldier:    "/assets/images/mini_soldier.png",

//   // 미니게임 결과 화면 배경
//   miniResultAllyOk:      "/assets/images/mini_result_ally_ok.png",      // 협력세력 성공
//   miniResultAllyFail:    "/assets/images/mini_result_ally_fail.png",     // 협력세력 실패
//   miniResultLetterOk:    "/assets/images/mini_result_letter_ok.png",     // 서신 성공
//   miniResultLetterFail:  "/assets/images/mini_result_letter_fail.png",   // 서신 실패
//   miniResultSoldierOk:   "/assets/images/mini_result_soldier_ok.png",    // 사병 성공
//   miniResultSoldierFail: "/assets/images/mini_result_soldier_fail.png",  // 사병 실패

//   scrollBg:       "/assets/images/scroll.png",
//   bossLeftBg:     "/assets/images/boss_left.png",

//   // 엔딩: 전체 배경 이미지
//   endingSuccess:  "/assets/images/ending_success.png",
//   endingFail:     "/assets/images/ending_fail.png",
//   endingDeath:    "/assets/images/ending_death.png",
//   endingEvil:     "/assets/images/ending_evil.png",
//   endingCaught:   "/assets/images/ending_caught.png",
//   endingBoss:     "/assets/images/ending_boss.png",
//   endingUserDead: "/assets/images/ending_userdead.png",
//   endingBad:      "/assets/images/ending_fail.png",
//   endingPoison:   "/assets/images/ending_poison.png",
// };

// // 호감도에 따른 희종 이미지 선택 함수
// function getHeejongImage(affection) {
//   if (affection >= 70 && IMAGES.heejongHigh) return IMAGES.heejongHigh;
//   if (affection >= 30 && IMAGES.heejongMid) return IMAGES.heejongMid;
//   return IMAGES.heejongLow;
// }


// // 태황대군: 심기에 따라 이미지 선택
// function getTyrantImage(hp) {
//   if (hp <= 30) return IMAGES.tyrantAngry;
//   if (hp <= 60) return IMAGES.tyrantNormal;
//   return IMAGES.tyrantHappy;
// }

// // 엔딩 키에 따라 이미지 선택
// function getEndingImage(key) {
//   const map = {
//     success:       IMAGES.endingSuccess,
//     deathBattle:   IMAGES.endingDeath,
//     failPersuade:  IMAGES.endingFail,
//     evil:          IMAGES.endingEvil,
//     soldierCaught: IMAGES.endingCaught,
//     deathBoss:     IMAGES.endingBoss,
//     userDeath:     IMAGES.endingUserDead,
//     badAffection:  IMAGES.endingBad,
//     poison:        IMAGES.endingPoison,
//   };
//   return map[key] || null;
// }

// // ============================================================
// // CSS — 이미지 기반 디자인 (제공된 스크린샷 기준)
// // ============================================================
// const styles = `
//   @font-face {
//     font-family: 'ShillaCulture';
//     src: url('/assets/fonts/Shilla_Culture(M).ttf') format('truetype');
//     font-weight: 400;
//   }
//   @font-face {
//     font-family: 'ShillaCulture';
//     src: url('/assets/fonts/Shilla_Culture(B).ttf') format('truetype');
//     font-weight: 700;
//   }
//   *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
//   *{font-family:'ShillaCulture',serif !important}
//   :root{
//     --bg:#2b1d0f;
//     --gray:#d9d5ce;
//     --gray-dark:#c8c4bc;
//     --paper:#f5ead6;
//     --paper-light:#fdf8ee;
//     --ink:#2c1a0e;
//     --gold:#c9a84c;
//     --gold2:#e8c97a;
//     --white:#fdf8f0;
//     --safe-top:env(safe-area-inset-top,0px);
//     --safe-bot:env(safe-area-inset-bottom,0px);
//   }
//   html,body{background:var(--bg);color:var(--white);height:100%;overflow:hidden}
//   .fade{animation:fi 0.4s ease}
//   @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1}}
//   .spin{display:inline-block;width:13px;height:13px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:sp 0.8s linear infinite}
//   @keyframes sp{to{transform:rotate(360deg)}}

//   /* ── 버튼 ── */
//   .btn-prev{background:#5c5248;color:#d8ccc0;border:none;border-radius:6px;padding:10px 24px;font-size:15px;cursor:pointer;letter-spacing:0.03em}
//   .btn-next{background:#3a2c1a;color:#e8c97a;border:2px solid #c9a84c;border-radius:6px;padding:10px 28px;font-size:15px;cursor:pointer;letter-spacing:0.03em}
//   .btn-next:disabled{opacity:0.4;cursor:default}
//   .btn-start{background:#5a4420;color:#e8c97a;border:2px solid #c9a84c;border-radius:6px;padding:9px 0;font-size:14px;cursor:pointer;width:75%;max-width:200px;letter-spacing:0.04em}
//   .btn-start:disabled{opacity:0.4;cursor:default}

//   /* ── 풀스크린 (프롤로그/목표/스탯/이름) ── */
//   .page{width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#2b1d0f;padding:0;overflow:hidden;position:relative}
//   .bottom-nav{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:18px 26px;padding-bottom:calc(18px + var(--safe-bot))}
//   .prologue-wrap{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#2b1d0f}
//   .prologue-illust{width:180px;height:140px;object-fit:contain;margin-bottom:28px;flex-shrink:0}
//   .prologue-illust-placeholder{width:180px;height:140px;margin-bottom:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:rgba(201,168,76,0.3);font-size:12px}
//   .prologue-text{font-size:15px;line-height:2.1;color:rgba(253,248,240,0.9);text-align:center;max-width:640px;padding:0 36px;flex-shrink:0}
//   .prologue-dots{display:flex;gap:8px;justify-content:center;margin-top:24px;margin-bottom:80px}
//   .dot{width:7px;height:7px;border-radius:50%;background:rgba(201,168,76,0.25);transition:background 0.3s}
//   .dot.a{background:var(--gold)}
//   .name-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;max-width:340px;padding:0 20px}
//   .name-desc{font-size:14px;color:rgba(253,248,240,0.88);text-align:center;line-height:1.9}
//   .name-avatar-wrap{width:130px;height:130px;border-radius:50%;background:#3a2a1a;border:2px solid #6a5030;display:flex;align-items:center;justify-content:center;overflow:hidden}
//   .name-avatar-wrap img{width:100%;height:100%;object-fit:cover}
//   .name-avatar-placeholder{font-size:36px;color:#6a5030}
//   .name-row{display:flex;align-items:center;gap:8px;width:100%}
//   .name-label{font-size:14px;color:rgba(253,248,240,0.8);white-space:nowrap;flex-shrink:0}
//   .name-input{flex:1;background:#ffffff;border:1px solid #c8b48a;border-radius:4px;padding:8px 12px;color:#2c1a0e;font-size:14px;outline:none}
//   .name-input::placeholder{color:#a09080}
//   .name-input:focus{border-color:var(--gold)}
//   .goal-wrap,.stat-wrap{display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:480px;padding:0 24px}
//   .goal-title,.stat-title{font-size:28px;font-weight:700;color:var(--white);letter-spacing:0.1em}
//   .goal-illust{width:120px;height:100px;object-fit:contain}
//   .goal-illust-placeholder,.stat-item-placeholder{display:flex;align-items:center;justify-content:center;font-size:40px}
//   .goal-illust-placeholder{width:120px;height:100px}
//   .goal-box,.stat-box{background:var(--paper-light);border-radius:6px;padding:22px 24px;width:100%}
//   .goal-box p,.stat-box-desc{font-size:14px;color:var(--ink);line-height:2.0;text-align:center}
//   .stat-box-desc{margin-bottom:20px}
//   .stat-icons-row{display:flex;justify-content:space-around;align-items:flex-end;gap:12px}
//   .stat-item-wrap{display:flex;flex-direction:column;align-items:center;gap:10px}
//   .stat-item-img{width:80px;height:80px;object-fit:contain}
//   .stat-item-placeholder{width:80px;height:80px}
//   .stat-item-label{font-size:14px;color:var(--ink);font-weight:500}

//   /* ── 주차 전환 ── */
//   .week-screen{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
//   .week-card{
//     position:relative;z-index:2;
//     width:80%;max-width:600px;
//     background:rgba(220,225,230,0.88);
//     border-radius:4px;
//     padding:32px 28px;
//     text-align:center;
//     max-height:85vh;
//     overflow-y:auto;
//   }
//   .week-card-title{font-size:28px;font-weight:700;color:#1a1208;margin-bottom:18px;letter-spacing:0.06em}
//   .week-card-text{font-size:14px;line-height:1.9;color:#1a1208;white-space:pre-line;margin-bottom:24px}
//   @media(min-width:768px){
//     .week-card{width:58%;max-width:800px;padding:48px 56px}
//     .week-card-title{font-size:36px;margin-bottom:28px}
//     .week-card-text{font-size:16px;line-height:2.2;margin-bottom:32px}
//   }

//   /* ── 채팅 공통 ── */
//   .chat{width:100vw;height:100vh;overflow:hidden;display:flex;flex-direction:column}

//   /* 모바일 상단바 */
//   .mob-topbar{background:#1e1008;padding:8px 12px;padding-top:calc(8px + var(--safe-top));display:flex;align-items:center;gap:6px;flex-shrink:0;border-bottom:1px solid #3a2010}
//   .chat.boss .mob-topbar{background:#4a0000;border-color:#7a0000}
//   .wchip{font-size:11px;color:var(--gold);font-weight:700;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:20px;padding:3px 9px;white-space:nowrap;flex-shrink:0}
//   .schips{display:flex;gap:5px;flex:1;overflow:hidden}
//   .schip{font-size:10px;background:rgba(245,234,214,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:20px;padding:3px 7px;white-space:nowrap;color:rgba(253,248,240,0.85);display:flex;align-items:center;gap:3px}
//   .schip b{color:var(--gold2)}
//   .cthumb{width:32px;height:32px;border-radius:50%;flex-shrink:0;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;overflow:hidden}
//   .cthumb img{width:100%;height:100%;object-fit:cover}
//   .mob-bossbar{background:#5a0000;padding:5px 12px;flex-shrink:0;border-bottom:1px solid #8a0000;display:flex;align-items:center;gap:8px}
//   .bblbl{font-size:10px;color:#f5c0c0;white-space:nowrap}
//   .bbtrk{flex:1;height:6px;background:#3a0000;border-radius:4px;overflow:hidden}
//   .bbfil{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
//   .bbval{font-size:12px;color:#ff6b6b;font-weight:700;white-space:nowrap}
//   .mob-narr{background:var(--gray);border-bottom:1px solid #b0a898;padding:8px 12px;flex-shrink:0;cursor:pointer;display:flex;align-items:flex-start;gap:8px;user-select:none}
//   .chat.boss .mob-narr{background:#300808;border-color:#6a0000}
//   .mob-narrtx{font-size:11px;color:#4a3a28;line-height:1.6;flex:1}
//   .chat.boss .mob-narrtx{color:#f5c0c0}
//   .mob-narr-arr{font-size:11px;color:#6a5838;flex-shrink:0}

//   /* 메시지 - 전체 회색 */
//   .msgs{flex:1;overflow-y:auto;padding:12px 10px;display:flex;flex-direction:column;gap:12px;-webkit-overflow-scrolling:touch;background:var(--gray)}
//   .chat.boss .msgs{background:#1a0000}
//   .msgs::-webkit-scrollbar{width:3px}
//   .msgs::-webkit-scrollbar-thumb{background:#b0a898;border-radius:2px}
//   .msg{display:flex;flex-direction:column;max-width:78%}
//   .msg.npc{align-self:flex-start;align-items:flex-start}
//   .msg.usr{align-self:flex-end;align-items:flex-end}
//   .mname{font-size:10px;color:#6a5838;margin-bottom:3px}
//   .bub{padding:9px 14px;border-radius:18px;font-size:13px;line-height:1.75}
//   .msg.npc .bub{background:#4a3828;color:#f5ead6;border-bottom-left-radius:4px}
//   .msg.usr .bub{background:#f0ece4;color:#2c1a0e;border-bottom-right-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.1)}
//   .chat.boss .msg.npc .bub{background:#3d0808;color:#f5c0c0;border:1px solid #6a0000}

//   /* 추천답변 - 회색 배경 */
//   .recbar{background:var(--gray-dark);border-top:1px solid #b0a898;padding:7px 10px;flex-shrink:0}
//   .chat.boss .recbar{display:none}
//   .recscr{display:flex;gap:7px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px}
//   .recscr::-webkit-scrollbar{display:none}
//   .rchip{background:#fff;border:1px solid #d0c8b8;border-radius:20px;padding:7px 14px;font-size:12px;color:#3a2a1a;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background 0.15s;box-shadow:0 1px 2px rgba(0,0,0,0.06)}
//   .rchip:active{background:#f0e8d0}
//   .rchip:disabled{opacity:0.5;cursor:default}
//   .recgen{font-size:11px;color:#8a7050;padding:6px 8px;white-space:nowrap;display:flex;align-items:center;gap:5px;flex-shrink:0}

//   /* 입력창 - 회색 */
//   .inrow{display:flex;gap:7px;padding:8px 10px;padding-bottom:calc(8px + var(--safe-bot));background:var(--gray-dark);border-top:1px solid #b0a898;flex-shrink:0}
//   .chat.boss .inrow{background:#280808;border-color:#5a0000}
//   .ci{flex:1;background:#f0ece4;border:1px solid #c0b8a8;border-radius:20px;padding:9px 14px;font-size:14px;color:#2c1a0e;outline:none}
//   .chat.boss .ci{background:#1a0808;border-color:#5a0000;color:#f5c0c0}
//   .ci:focus{border-color:#a07030}
//   .sbtn{background:#2c1a0e;color:#fff;border:none;border-radius:6px;width:44px;height:36px;flex-shrink:0;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}
//   .sbtn:disabled{opacity:0.5}
//   .dcnt{font-size:10px;color:#6a5838;text-align:center;padding:2px 0;flex-shrink:0;background:var(--gray-dark)}
//   .chat.boss .dcnt{background:#280808;color:#f5c0c0}

//   /* ── PC 3컬럼 — 전체 회색(#d9d5ce) ── */
//   @media(min-width:768px){
//     /* 일반 채팅 — 전체 회색 */
//     .chat:not(.boss){
//       display:grid!important;
//       grid-template-columns:220px 1fr 270px;
//       grid-template-rows:100vh;
//       background:var(--gray);
//     }
//     .chat:not(.boss) .mob-topbar,.chat:not(.boss) .mob-narr,.chat:not(.boss) .recbar{display:none!important}
//     .chat:not(.boss) .msgs{padding:16px;gap:14px;background:var(--gray)}
//     .chat:not(.boss) .msg{max-width:70%}
//     .chat:not(.boss) .inrow{padding:10px 14px;padding-bottom:10px;background:var(--gray-dark);border-top:1px solid #b0a898}
//     .chat:not(.boss) .dcnt{background:var(--gray-dark)}

//     /* 보스 채팅 */
//     .chat.boss{display:grid!important;grid-template-columns:220px 1fr 200px;grid-template-rows:100vh;background:#1a0000}
//     .chat.boss .mob-topbar,.chat.boss .mob-bossbar,.chat.boss .mob-narr{display:none!important}
//     .chat.boss .msgs{padding:16px;gap:14px}
//     .chat.boss .msg{max-width:72%}
//     .chat.boss .inrow{padding:12px 16px;padding-bottom:12px}
//     .chat.boss .dcnt{background:#1a0000}

//     /* PC 왼쪽 — 회색 배경 */
//     .pcl{
//       display:flex!important;flex-direction:column;align-items:center;
//       padding:16px 12px;gap:10px;overflow-y:auto;height:100vh;
//       background:var(--gray);border-right:1px solid #b8b4ac;
//     }
//     /* 주차 뱃지 — 이미지처럼 한지색 배경 */
//     .pcwk{
//       font-size:30px;font-weight:700;color:var(--ink);
//       background:rgba(245,234,214,0.9);border:1px solid #c0a870;
//       border-radius:4px;padding:4px 12px;width:100%;text-align:left;
//     }
//     /* 캐릭터 이미지 */
//     .pccharimg{
//       width:100%;height:280px;border:1px solid #b8a070;border-radius:4px;
//       overflow:hidden;background:rgba(245,234,214,0.8);
//       display:flex;align-items:center;justify-content:center;
//       flex-direction:column;gap:6px;color:#8a7050;font-size:11px;text-align:center;
//       flex-shrink:0;
//     }
//     .pccharimg img{width:100%;height:100%;object-fit:cover;object-position:top}
//     .pccharimg-label{font-size:10px;color:#6a5030;padding:4px 8px;background:rgba(201,168,76,0.12);width:100%;text-align:center}
//     /* 스탯 카드 3개 — 회색 배경 */
//     .pcsts{display:flex;gap:5px;width:100%}
//     .pcst{flex:1;background:rgba(245,234,214,0.8);border:1px solid #c0a870;border-radius:4px;padding:6px 3px;text-align:center;min-width:0}
//     .pcstn{font-size:9px;color:#6b5a3a;letter-spacing:0.02em;margin-bottom:1px}
//     .pcstv{font-size:17px;font-weight:700;color:var(--ink);line-height:1.2}
//     .pcst-sub{font-size:8px;color:#8a6030}
//     .pcdcnt{font-size:11px;color:#6a5838;text-align:center}

//     /* 보스 왼쪽 */
//     .boss-pcl{display:flex!important;flex-direction:column;padding:0;overflow-y:auto;height:100vh;background:var(--paper);position:relative;overflow:hidden}
//     .boss-pcl-inner{padding:20px 16px;flex:1;position:relative;z-index:1}
//     .boss-pcl-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;z-index:0}
//     .boss-pcl-inner{padding:20px 16px;flex:1}
//     .boss-pcl-title{font-size:24px;font-weight:700;color:#6a0000;letter-spacing:0.05em;margin-bottom:12px;line-height:1.4}
//     .boss-pcl-desc{font-size:13px;line-height:2.0;color:#3a1a0a;margin-bottom:12px;white-space:pre-line}
//     .boss-pcl-tip{font-size:12px;color:#8a2020;font-style:italic}

//     /* PC 가운데 */
//     .pcc{display:flex!important;flex-direction:column;height:100vh;overflow:hidden}
//     .pcchdr{padding:8px 16px;font-size:11px;text-align:center;letter-spacing:0.04em;flex-shrink:0;background:#1e1008;color:var(--gold2);border-bottom:1px solid #3a2010}
//     .chat.boss .pcchdr{background:#4a0000;border-color:#7a0000;color:#f5c0c0}

//     /* PC 오른쪽 — 회색 배경 */
//     .pcr{
//       display:flex!important;flex-direction:column;
//       padding:0;gap:0;overflow-y:auto;height:100vh;
//       background:var(--gray);border-left:1px solid #b8b4ac;
//       position:relative;
//     }
//     .pcr-scroll-img{width:100%;flex-shrink:0}
//     .pcr-scroll-img img{width:100%;height:auto;object-fit:contain;display:block}
//     /* 두루마리 없을 때 텍스트 박스 */
//     .pcr-scroll-fallback{
//       background:rgba(245,234,214,0.9);border:1px solid #c0a060;
//       margin:12px;border-radius:4px;padding:14px 12px;
//       font-size:12px;line-height:1.85;color:var(--ink);
//     }
//     .scroll-title{font-size:13px;font-weight:700;color:#5a3a1a;margin-bottom:8px}
//     .tip-text{font-size:11px;color:#7a5a2a;margin-top:8px;font-style:italic}
//     .pcr-content{padding:8px 12px;display:flex;flex-direction:column;gap:0}
//     /* 추천답변 버튼 — 이미지처럼 흰 배경 둥근 직사각형 */
//     .pcrec-wrap{padding:8px 12px;display:flex;flex-direction:column;gap:8px}
//     .pcrec-btn{
//       background:#fff;border:1px solid #d0c8b8;border-radius:8px;
//       padding:10px 14px;font-size:13px;color:#3a2a1a;
//       cursor:pointer;text-align:left;line-height:1.4;
//       transition:background 0.15s;box-shadow:0 1px 2px rgba(0,0,0,0.06);
//     }
//     .pcrec-btn:hover{background:#f5edd8;border-color:#b0a070}
//     .pcrec-btn:disabled{opacity:0.5;cursor:default}

//     /* 보스 오른쪽 */
//     .boss-pcr{display:flex!important;flex-direction:column;align-items:center;padding:0;height:100vh;overflow:hidden;background:#2a0000;border-left:2px solid #5a0000}
//     .boss-pcr-charimg{width:100%;flex:1;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#1a0000;color:#5a2020;font-size:12px}
//     .boss-pcr-charimg img{width:100%;height:100%;object-fit:cover;object-position:top}
//     .boss-pcr-hp{width:100%;padding:16px;background:#3d0000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-top:2px solid #6a0000}
//     .boss-pcr-hplbl{font-size:16px;color:#f5c0c0;letter-spacing:0.08em}
//     .boss-pcr-hpval{font-size:52px;font-weight:700;color:#fff;line-height:1}
//     .boss-pcr-delta{font-size:13px;font-weight:600}
//     .boss-pcr-track{width:80%;height:8px;background:#1a0000;border-radius:4px;overflow:hidden;margin-top:4px}
//     .boss-pcr-fill{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
//   }

//   /* ── 미니게임 — 전체 배경 + 상단 판자 + 하단 버튼 ── */
//   .mini{
//     width:100vw;height:100vh;position:relative;
//     display:flex;flex-direction:column;align-items:center;justify-content:center;
//     overflow:hidden;background:#1a1208;
//   }
//   /* 전체 배경 이미지 */
//   .mini-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
//   /* 콘텐츠 영역 */
//   .mini-inner{
//     position:relative;z-index:1;
//     width:90%;max-width:780px;
//     display:flex;flex-direction:column;align-items:center;gap:20px;
//   }
//   /* 상단 한지 판자 — 제목+설명 */
//   .mboard{
//     width:100%;
//     background:rgba(245,234,210,0.82);
//     border-radius:6px;
//     padding:28px 36px;
//     text-align:center;
//     position:relative;
//   }
//   .rope{position:absolute;top:-22px;left:50%;transform:translateX(-50%);width:40%;height:22px;background:repeating-linear-gradient(90deg,#8a6020 0%,#b08040 4px,#8a6020 8px);border-radius:4px 4px 0 0}
//   .mtitle{font-size:28px;font-weight:700;color:var(--ink);margin-bottom:14px;letter-spacing:0.06em}
//   .mdesc{font-size:14px;line-height:1.9;color:#3a2a0e}
//   /* 하단 버튼 그리드 */
//   .mopts{display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%}
//   .mbtn{
//     background:rgba(240,235,225,0.82);
//     border:1px solid rgba(200,180,140,0.5);
//     border-radius:10px;
//     padding:22px 12px;
//     font-size:20px;font-weight:700;
//     color:var(--ink);cursor:pointer;
//     transition:background 0.15s,transform 0.1s;
//     backdrop-filter:blur(4px);
//   }
//   .mbtn:active{transform:scale(0.97)}
//   .mbtn.sel{background:rgba(201,168,76,0.85);border-color:#8a6020;color:#fff}
//   .mbtn.wrong{background:rgba(198,40,40,0.85);border-color:#7a0000;color:#fff}
//   .mred{color:#c62828;font-weight:700;font-size:13px;margin-top:8px}
//   /* 사병 입력 영역 */
//   .mini-input-row{display:flex;gap:10px;justify-content:center;align-items:center;width:100%;margin-top:8px}
//   .minp{
//     background:rgba(255,255,255,0.9);
//     border:1px solid #c8b48a;border-radius:8px;
//     padding:11px 14px;font-size:15px;color:var(--ink);
//     outline:none;text-align:center;flex:1;max-width:300px;
//   }
//   .minp:focus{border-color:#a07030}
//   .msub{
//     background:#3d2510;color:#fff;border:none;border-radius:8px;
//     padding:12px 20px;font-size:14px;cursor:pointer;flex-shrink:0;
//   }
//   /* 미니게임 결과 화면 */
//   .mini-result{
//     width:100vw;height:100vh;position:relative;
//     display:flex;flex-direction:column;align-items:center;justify-content:center;
//     overflow:hidden;background:#1a1208;
//   }
//   .mini-result-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
//   /* 한지 판자 — 가로로 넓게, 중앙 */
//   .mini-result-card{
//     position:relative;z-index:1;
//     width:82%;max-width:1100px;
//     background:rgba(245,234,210,0.85);
//     border-radius:4px;
//     padding:44px 60px;
//     text-align:center;
//   }
//   .mini-result-title{font-size:36px;font-weight:700;color:var(--ink);margin-bottom:20px;letter-spacing:0.04em}
//   .mini-result-desc{font-size:16px;line-height:2.0;color:#3a2a0e;white-space:pre-line}
//   /* 채팅 계속하기 버튼 — 우하단 고정 */
//   .mini-result-btn{
//     position:absolute;bottom:32px;right:36px;z-index:2;
//     background:rgba(110,90,40,0.88);color:#e8c97a;
//     border:1px solid #c9a84c;border-radius:4px;
//     padding:12px 28px;font-size:15px;cursor:pointer;letter-spacing:0.04em;
//   }
//   @media(max-width:767px){
//     .mini-result-card{width:90%;padding:28px 22px}
//     .mini-result-title{font-size:24px;margin-bottom:14px}
//     .mini-result-desc{font-size:13px}
//     .mini-result-btn{bottom:18px;right:18px;padding:10px 18px;font-size:13px}
//   }

//   /* ── 엔딩 ── */
//   .ending{width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--gray);padding:32px 18px;overflow-y:auto;gap:16px}
//   .etitle{font-size:26px;font-weight:700;color:var(--ink);letter-spacing:0.08em;text-align:center}
//   .eimg-wrap{width:180px;height:140px;background:#1a1208;border:2px solid #3a2a0e;border-radius:4px;display:flex;align-items:center;justify-content:center;color:rgba(201,168,76,0.4);font-size:11px;overflow:hidden}
//   .eimg-wrap img{width:100%;height:100%;object-fit:cover}
//   .scroll-ending{width:100%;max-width:560px}
//   .scroll-ending-poles{display:flex;align-items:stretch;width:100%}
//   .scroll-pole-l,.scroll-pole-r{width:28px;background:#2a1a08;border-radius:4px;flex-shrink:0;box-shadow:2px 0 6px rgba(0,0,0,0.4)}
//   .scroll-pole-r{box-shadow:-2px 0 6px rgba(0,0,0,0.4)}
//   .scroll-body{flex:1;background:var(--paper-light);padding:22px 20px;font-size:13px;line-height:2.1;color:var(--ink);text-align:center;white-space:pre-line;border-top:4px solid #8a6020;border-bottom:4px solid #8a6020}
// `;

// // ============================================================
// // 백엔드 연동
// // ============================================================
// async function callBackend(message, sessionId) {
//  const r = await fetch(`${API}/chat`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message, session_id: sessionId })
//   });
//   const data = await r.json();

//   if(data.대사) {
//     let 대사 = data.대사;
//     const braceIdx = 대사.indexOf('{"');
//     if(braceIdx > 0) 대사 = 대사.slice(0, braceIdx).trim();
//     data.대사 = 대사;
//   }

//   // 이미지 URL 생성
//   if(data.이미지파일) {
//     data.이미지URL = `${API}/images/${data.이미지파일}`;
//   }

//   return data;
// }

// // ============================================================
// // 공통: 하단 이전/다음 버튼
// // ============================================================
// function BottomNav({ onPrev, onNext, nextLabel = "다음", nextDisabled = false }) {
//   return (
//     <div className="bottom-nav">
//       <button className="btn-prev" onClick={onPrev}
//         style={{ visibility: onPrev ? "visible" : "hidden" }}>이전</button>
//       <button className="btn-next" onClick={onNext} disabled={nextDisabled}>{nextLabel}</button>
//     </div>
//   );
// }

// // ============================================================
// // 프롤로그 화면
// // 이미지: IMAGES.prologue — src/assets/ 폴더에 파일 넣고 경로 수정
// // ============================================================
// function PrologueScreen({ onNext }) {
//   const [page, setPage] = useState(0);
//   const prologueImages = [IMAGES.prologue1, IMAGES.prologue2, IMAGES.prologue3, IMAGES.prologue4];
//   const currentBg = prologueImages[page];
//   return (
//     <div style={{width:"100vw",height:"100vh",position:"relative",overflow:"hidden",background:"#1a1208"}}>
//       {/* 배경 이미지 전체화면 */}
//       {currentBg && (
//         <img src={currentBg} alt={`프롤로그 ${page+1}`}
//           style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}/>
//       )}
//       {/* 어두운 오버레이 */}
//       <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1}}/>
//       {/* 글 — 중앙 하단 */}
//       <div style={{position:"absolute",left:0,right:0,bottom:"120px",zIndex:2,
//         display:"flex",justifyContent:"center",padding:"0 40px"}}>
//         <p style={{fontSize:16,lineHeight:2.1,color:"rgba(253,248,240,0.95)",
//           textAlign:"center",maxWidth:680,textShadow:"0 2px 8px rgba(0,0,0,0.8)"}}>
//           {PROLOGUE_PAGES[page]}
//         </p>
//       </div>
//       {/* 페이지 점 */}
//       <div style={{position:"absolute",left:0,right:0,bottom:"80px",zIndex:2,
//         display:"flex",justifyContent:"center",gap:8}}>
//         {PROLOGUE_PAGES.map((_,i)=>(
//           <div key={i} style={{width:7,height:7,borderRadius:"50%",
//             background:i===page?"#c9a84c":"rgba(201,168,76,0.3)",transition:"background 0.3s"}}/>
//         ))}
//       </div>
//       {/* 이전/다음 버튼 */}
//       <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:10,
//         display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}>
//         <button className="btn-prev" onClick={()=>setPage(p=>p-1)}
//           style={{visibility:page>0?"visible":"hidden"}}>이전</button>
//         {page < PROLOGUE_PAGES.length-1
//           ? <button className="btn-next" onClick={()=>setPage(p=>p+1)}>다음</button>
//           : <button className="btn-next" onClick={onNext}>다음</button>}
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // 이름 입력 화면
// // 이미지: IMAGES.playerAvatar — 플레이어 아바타
// // ============================================================
// function NameScreen({ onNext }) {
//   const [name, setName] = useState("");
//   return (
//     <div className="page fade">
//       <div className="name-wrap">
//         <p className="name-desc">
//           당신은 그런 희종을 어린 시절부터 지켜본<br/>희종의 또 다른 숙부 OO대군이다.
//         </p>
//         {/* ↓ 플레이어 아바타 이미지 교체 위치
//             IMAGES.playerAvatar 에 경로 입력
//             예: "/assets/player_avatar.png" */}
//         <div className="name-avatar-wrap">
//           {IMAGES.playerAvatar
//             ? <img src={IMAGES.playerAvatar} alt="플레이어" />
//             : <div className="name-avatar-placeholder">?</div>
//           }
//         </div>
//         <div className="name-row">
//           <span className="name-label">이름:</span>
//           <input className="name-input" placeholder="(직접 입력) 대군"
//             value={name} onChange={e=>setName(e.target.value)}
//             onKeyDown={e=>e.key==="Enter"&&name.trim()&&onNext(name.trim())} />
//         </div>
//         <button className="btn-start" onClick={()=>name.trim()&&onNext(name.trim())}
//           disabled={!name.trim()}>채팅 시작하기</button>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // 최종 목표 화면
// // 이미지: IMAGES.phoenix — 봉황 일러스트
// // ============================================================
// function GoalScreen({ onNext, onPrev }) {
//   return (
//     <div className="page fade">
//       <div className="goal-wrap">
//         <div className="goal-title">최종 목표</div>
//         {/* ↓ 봉황 이미지 교체 위치
//             IMAGES.phoenix 에 경로 입력
//             예: "/assets/phoenix.png" */}
//         {IMAGES.phoenix
//           ? <img src={IMAGES.phoenix} className="goal-illust" alt="봉황"/>
//           : <div className="goal-illust-placeholder">🦅</div>
//         }
//         <div className="goal-box">
//           <p>8주 동안 좌절에 빠진 희종을 설득하여<br/>태황 대군의 폭정 아래에서 위기에 빠진 조선을 구하라.</p>
//         </div>
//       </div>
//       <BottomNav onPrev={onPrev} onNext={onNext} />
//     </div>
//   );
// }

// // ============================================================
// // 스탯 소개 화면
// // 이미지: IMAGES.statAffection / IMAGES.statSoldier / IMAGES.statMinsim
// // ============================================================
// function StatIntroScreen({ onNext, onPrev }) {
//   const stats = [
//     { key:"statAffection", label:"호감도", fallback:"🤝",
//       detail:"시작 0 → 목표 90 이상", danger:"0 이하 → 베드엔딩" },
//     { key:"statSoldier",   label:"무력",   fallback:"⚔️",
//       detail:"시작 50명 → 목표 1,000명 이상", danger:"부족 → 전장 사망 엔딩" },
//     { key:"statMinsim",    label:"민심",   fallback:"🏮",
//       detail:"시작 100 → 8주 안에 복위 완료", danger:"매주 5 감소, 8주차 -60" },
//   ];
//   return (
//     <div className="page fade">
//       <div className="stat-wrap">
//         <div className="stat-title">스탯 시스템</div>
//         <div className="stat-box">
//           <p className="stat-box-desc">대화와 미니게임을 통해 스탯을 향상시킬 수 있습니다.</p>
//           <div className="stat-icons-row">
//             {stats.map(s => (
//               <div className="stat-item-wrap" key={s.label}>
//                 {/* ↓ 각 스탯 아이콘 이미지 교체 위치
//                     IMAGES[s.key] 에 경로 입력
//                     예: IMAGES.statAffection = "/assets/stat_affection.png" */}
//                 {IMAGES[s.key]
//                   ? <img src={IMAGES[s.key]} className="stat-item-img" alt={s.label}/>
//                   : <div className="stat-item-placeholder">{s.fallback}</div>
//                 }
//                 <div className="stat-item-label">{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <BottomNav onPrev={onPrev} onNext={onNext} />
//     </div>
//   );
// }

// // ============================================================
// // 주차 전환 화면
// // ============================================================
// function WeekTransitionScreen({ week, onNext }) {
//   const info = WEEK_NARRATIVES[week];
//   return (
//     <div className="week-screen">
//       {/* 배경 이미지 전체화면 */}
//       {IMAGES.weekBg
//         ? <img src={IMAGES.weekBg} alt="배경"
//             style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}/>
//         : <div style={{position:"absolute",inset:0,background:"#2b1d0f",zIndex:0}}/>
//       }
//       {/* 반투명 카드 — 텍스트 바로 위에 표시 */}
//       <div className="week-card fade">
//         <div className="week-card-title">─{info.title}─</div>
//         <div className="week-card-text">{info.text}</div>
//         <button className="btn-next" style={{width:"160px"}} onClick={onNext}>대화 시작하기</button>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // 채팅 화면 (반응형 — 모바일/PC)
// // 이미지: IMAGES.heejongLow/Mid/High, IMAGES.tyrant
// // ============================================================
// function ChatScreen({ week, playerName, stats, onStatsChange, onDialogComplete, isBoss=false, badFaction="죽", sessionId }) {
//   const info = WEEK_NARRATIVES[week];
//   const maxDialog = info.cnt;
//   const openLines = {1:"숙부님이... 여기까지는 웬일이십니까?",2:"...다시 오셨군요.",3:"요즘도 백성들의 이야기가 들려오는군요.",4:"서신이 잘 전달되었다 하더군요.",6:"시간이 많지 않다는 것을 알고 있소.",7:"이제 얼마 남지 않았군요.",8:"거사가 코 앞이오."};
//   const openLine = isBoss ? "형님이 요즘 수상한 짓을 꾸민다더군요." : (openLines[week]||"...");

//   const [messages, setMessages] = useState([{role:"npc",text:openLine}]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [dialogCount, setDialogCount] = useState(0);
//   const dialogCompleteRef = useRef(false);
//   const [bossHp, setBossHp] = useState(20);
//   const [bossDelta, setBossDelta] = useState(null);
//   const [affDelta, setAffDelta] = useState(null);  // 호감도 변화 표시용
//   const [recAnswers, setRecAnswers] = useState(INIT_RECS[week]||[]);
//   const recLoading = false;
//   const [narrOpen, setNarrOpen] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const endRef = useRef(null);

//   useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

//   useEffect(()=>{
//     if(isBoss) fetch(`${API}/tyrant/start`,{
//       method:"POST",
//       headers:{"Content-Type":"application/json"},
//       body:JSON.stringify({session_id:sessionId})
//     }).catch(()=>{});
//     return ()=>{
//       if(isBoss) fetch(`${API}/tyrant/end`,{
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({session_id:sessionId})
//       }).catch(()=>{});
//     };
//   },[isBoss, sessionId]);

//   const [currentCharImg, setCurrentCharImg] = useState(null); // 백엔드가 주는 이미지 URL
//   const charImg = isBoss
//     ? getTyrantImage(bossHp)
//     : (currentCharImg || getHeejongImage(stats.affection)); // 백엔드 URL 우선, 없으면 호감도 기반 로컬 이미지
//   const npcName = isBoss ? "태황대군" : "희종";
//   const hpPct = (bossHp/30)*100;

//   async function handleBackendResponse(data, nc) {
//     // 대사만 추출 (JSON 형식이 그대로 노출되지 않도록)
//     let 대사 = data.대사 || "";
//     // 혹시 대사 안에 JSON 형식이 포함된 경우 제거
//     if(대사.includes('{"') || 대사.includes('"호감도변화"')) {
//       try {
//         const parsed = JSON.parse(대사);
//         대사 = parsed.대사 || 대사;
//       } catch {
//         // 파싱 실패면 중괄호 이전까지만 사용
//         const braceIdx = 대사.indexOf('{');
//         if(braceIdx > 0) 대사 = 대사.slice(0, braceIdx).trim();
//       }
//     }
//     setMessages(m=>[...m,{role:"npc",text:대사}]);
//     if(Array.isArray(data.추천답변)) setRecAnswers(data.추천답변);
//     setDialogCount(nc);
//     setLoading(false);

//     // ★ 백엔드가 이미지 URL을 주면 바로 적용
//     // 백엔드 응답에서 가능한 모든 이미지 URL 필드 탐색
//     if(!isBoss) {
//       const imgUrl = data.이미지URL
//         || data.image_url
//         || data.imageUrl
//         || data.character_image
//         || data.캐릭터이미지
//         || null;
//       if(imgUrl) {
//         // 상대경로면 백엔드 주소 붙이기
//         const fullUrl = imgUrl.startsWith("http") ? imgUrl : `${API}${imgUrl}`;
//         setCurrentCharImg(fullUrl);
//       } else {
//         // 백엔드 URL 없으면 호감도 기반 이미지로 fallback
//         setCurrentCharImg(null);
//       }
//     }

//     if(isBoss){
//       const delta = data.stats?.폭군심기변화||0;
//       const newHp = Math.max(0,Math.min(30,bossHp+delta));
//       setBossHp(newHp); setBossDelta(delta);
//       if(newHp<=0){ setTimeout(()=>{ if(!dialogCompleteRef.current){dialogCompleteRef.current=true;onDialogComplete("bossKill");} },1500); return;}
//       if(nc>=maxDialog){ setTimeout(()=>{ if(!dialogCompleteRef.current){dialogCompleteRef.current=true;onDialogComplete("bossSurvive");} },1500); return;}
//     } else {
//       const affDelta = data.stats?.호감도변화||0;
//       setAffDelta(affDelta);
//       onStatsChange({affection:affDelta});
//       // ★ 베드엔딩: 백엔드 bad_ending 무시하고 호감도 수치로만 판단
//       // 호감도가 -20 이하로 내려갔을 때만 베드엔딩 (한두 번 실수는 괜찮음)
//       // stats.affection은 아직 업데이트 전이라 delta 더해서 계산
//       const newAff = stats.affection + affDelta;
//       if(newAff <= -20){ setTimeout(()=>{ if(!dialogCompleteRef.current){dialogCompleteRef.current=true;onDialogComplete("badAffection");} },1500); return;}
//       if(nc>=maxDialog){ setTimeout(()=>{ if(!dialogCompleteRef.current){dialogCompleteRef.current=true;onDialogComplete("complete");} },1500); return;}
//     }
//   }

//   async function sendMessage(text) {
//     if(!text.trim()||loading) return;
//     setLoading(true);
//     setMessages(m=>[...m,{role:"user",text}]);
//     setInput("");
//     try {
//       const data = await callBackend(text, sessionId);
//       await handleBackendResponse(data, dialogCount+1);
//     } catch { setLoading(false); }
//   }

//   // 추천 답변: 백엔드 호출하되 호감도 변화는 프론트에서 강제 고정
//   // 백엔드 응답의 호감도변화 값은 무시하고 +3 고정 적용
//   const NPC_REC_REPLIES = [
//     "...그렇군요. 오랜만이오.",
//     "수고가 많으십니다, 숙부님.",
//     "...고맙소. 그런 말을 들으니 조금 마음이 편해지는 것 같소.",
//     "흠... 그런 생각을 해주시다니.",
//     "...잘 오셨소. 사실 이야기 나눌 사람이 필요했소.",
//     "그리 말씀해 주시니... 감사하오.",
//   ];
//   const BOSS_REC_REPLIES = [
//     "...그래. 그 정도면 봐주지.",
//     "흠, 말이라도 그렇게 해야지.",
//     "...알겠다. 물러가거라.",
//   ];

//   async function sendRecommended(text) {
//     if(loading||recLoading) return;
//     setLoading(true);
//     setMessages(m=>[...m,{role:"user",text}]);

//     // 백엔드 호출 시도 (대사와 추천답변 갱신 목적)
//     // 단, 호감도/심기 변화는 프론트에서 고정값 사용
//     try {
//       const data = await callBackend(text, sessionId);
//       const npcText = data.대사 || (isBoss
//         ? BOSS_REC_REPLIES[Math.floor(Math.random()*BOSS_REC_REPLIES.length)]
//         : NPC_REC_REPLIES[Math.floor(Math.random()*NPC_REC_REPLIES.length)]);

//       setMessages(m=>[...m,{role:"npc",text:npcText}]);
//       if(Array.isArray(data.추천답변)) setRecAnswers(data.추천답변);

//       // 이미지 업데이트
//       if(!isBoss){
//         const imgUrl = data.이미지URL || data.image_url || null;
//         if(imgUrl) setCurrentCharImg(imgUrl);
//       }

//       const nc = dialogCount+1;
//       setDialogCount(nc);

//       if(isBoss){
//         // 보스: 추천 답변 → 심기 +5 고정
//         const newHp = Math.min(30, bossHp+5);
//         setBossHp(newHp); setBossDelta(5);
//         setLoading(false);
//         if(newHp<=0){ setTimeout(()=>{ if(!dialogCompleteRef.current){dialogCompleteRef.current=true;onDialogComplete("bossKill");} },1500); return;}
//         if(nc>=maxDialog){ setTimeout(()=>{ if(!dialogCompleteRef.current){dialogCompleteRef.current=true;onDialogComplete("bossSurvive");} },1500); return;}
//       } else {
//         // 일반: 추천 답변 → 호감도 +3 고정 (절대 마이너스 없음)
//         setAffDelta(3);
//         onStatsChange({affection:3});
//         setLoading(false);
//         if(nc>=maxDialog){ setTimeout(()=>{ if(!dialogCompleteRef.current){dialogCompleteRef.current=true;onDialogComplete("complete");} },1500); return;}
//       }
//     } catch {
//       // 백엔드 오류시 기본 대사로
//       const npcText = isBoss
//         ? BOSS_REC_REPLIES[Math.floor(Math.random()*BOSS_REC_REPLIES.length)]
//         : NPC_REC_REPLIES[Math.floor(Math.random()*NPC_REC_REPLIES.length)];
//       setMessages(m=>[...m,{role:"npc",text:npcText}]);
//       const nc = dialogCount+1;
//       setDialogCount(nc);
//       if(isBoss){
//         const newHp = Math.min(30,bossHp+5);
//         setBossHp(newHp); setBossDelta(5);
//       } else {
//         setAffDelta(3);
//         onStatsChange({affection:3});
//       }
//       setLoading(false);
//       if(nc>=maxDialog){ setTimeout(()=>onDialogComplete(isBoss?"bossSurvive":"complete"),1500); return;}
//     }
//   }

//   return (
//     <div className={`chat${isBoss?" boss":""}`}>

//       {/* 모바일 상단바 */}
//       <div className="mob-topbar">
//         <div className="wchip">{info.title}</div>
//         <div className="schips">
//           {isBoss
//             ? <div className="schip">심기 <b style={{color:"#ff6b6b"}}>{bossHp}</b></div>
//             : <><div className="schip">❤️<b>{stats.affection}</b></div>
//                 <div className="schip">⚔️<b>{stats.soldiers}</b></div>
//                 <div className="schip">🏮<b>{stats.minsim}</b></div></>
//           }
//         </div>
//         <div className="cthumb" onClick={()=>setShowModal(true)}>
//           {charImg ? <img src={charImg} alt={npcName}/> : (isBoss?"👑":"🧑")}
//         </div>
//       </div>

//       {/* 모바일 보스 HP바 */}
//       {isBoss && (
//         <div className="mob-bossbar">
//           <span className="bblbl">심기</span>
//           <div className="bbtrk"><div className="bbfil" style={{width:`${hpPct}%`}}/></div>
//           <span className="bbval">{bossHp}/30
//             {bossDelta!==null&&<span style={{fontSize:10,color:bossDelta>=0?"#69f0ae":"#ff5252",marginLeft:4}}>
//               {bossDelta>=0?`+${bossDelta}`:bossDelta}</span>}
//           </span>
//         </div>
//       )}

//       {/* 모바일 나레이션 */}
//       <div className="mob-narr" onClick={()=>setNarrOpen(o=>!o)}>
//         <div className="mob-narrtx">{narrOpen?info.text:info.text.slice(0,55)+(info.text.length>55?"...":"")}</div>
//         <div className="mob-narr-arr">{narrOpen?"▲":"▼"}</div>
//       </div>

//       {/* PC 왼쪽 패널 - 일반 채팅 */}
//       {!isBoss && (
//         <div className="pcl" style={{display:"none"}}>
//           <div className="pcwk">{info.title}</div>
//           <div className="pccharimg">
//             {/* ↓ 희종 캐릭터 이미지 교체 위치
//                 IMAGES.heejongLow / heejongMid / heejongHigh 에 경로 입력
//                 호감도에 따라 자동으로 바뀜 */}
//             {charImg
//               ? <img src={charImg} alt="희종"/>
//               : <><span style={{fontSize:36}}>🧑</span>
//                   <span>(호감도별 변화 이미지)</span></>
//             }
//           </div>
//           <div className="pccharimg-label">(호감도 별 변화 이미지)</div>
//           <div className="pcsts">
//             <div className="pcst">
//               <div className="pcstn">호감도</div>
//               <div className="pcstv">{stats.affection}</div>
//               <div style={{fontSize:10,fontWeight:700,minHeight:14,
//                 color:affDelta>0?"#2e7d32":affDelta<0?"#c62828":"transparent"}}>
//                 {affDelta!==null&&affDelta!==0?(affDelta>0?`+${affDelta}`:affDelta):""}
//               </div>
//             </div>
//             <div className="pcst">
//               <div className="pcstn">민심</div>
//               <div className="pcstv">{stats.minsim}</div>
//             </div>
//             <div className="pcst">
//               <div className="pcstn">사병</div>
//               <div className="pcstv">{stats.soldiers}</div>
//               <div className="pcst-sub">/1000</div>
//             </div>
//           </div>
//           <div className="pcdcnt">{dialogCount} / {maxDialog} 대화</div>
//         </div>
//       )}

//       {/* PC 왼쪽 패널 - 보스 채팅 (나레이션) */}
//       {isBoss && (
//         <div className="boss-pcl" style={{display:"none"}}>
//           {IMAGES.bossLeftBg && <img src={IMAGES.bossLeftBg} alt="보스패널" className="boss-pcl-bg"/>}
//           <div className="boss-pcl-inner">
//             <div className="boss-pcl-title">태황대군과의<br/>대화</div>
//             <div className="boss-pcl-desc">{info.text}</div>
//             {info.tip && <div className="boss-pcl-tip">*Tip: {info.tip}</div>}
//           </div>
//         </div>
//       )}

//       {/* 가운데 채팅 영역 */}
//       <div className="pcc" style={{display:"contents"}}>
//         <div className="pcchdr" style={{display:"none"}}>
//           {isBoss ? "⚠️ 태황대군과의 대화 — 심기를 건드리지 마세요!" : `*${maxDialog}번의 대화가 진행되면 다음 주차로 넘어갑니다.`}
//         </div>
//         <div className="msgs">
//           {messages.map((m,i)=>(
//             <div key={i} className={`msg ${m.role==="npc"?"npc":"usr"} fade`}>
//               {m.role==="npc"&&<div className="mname">{npcName}</div>}
//               <div className="bub">{m.text}</div>
//             </div>
//           ))}
//           {loading&&<div className="msg npc"><div className="bub"><span className="spin"/></div></div>}
//           <div ref={endRef}/>
//         </div>
//         <div className="dcnt">{dialogCount} / {maxDialog} 대화</div>
//         <div className="inrow">
//           <input className="ci" placeholder="답변을 입력하세요..." value={input}
//             onChange={e=>setInput(e.target.value)}
//             onKeyDown={e=>e.key==="Enter"&&sendMessage(input)} disabled={loading}/>
//           <button className="sbtn" onClick={()=>sendMessage(input)} disabled={loading}>
//             {loading?<span className="spin"/>:"➤"}
//           </button>
//         </div>
//       </div>

//       {/* 모바일 추천 답변 */}
//       {!isBoss&&(
//         <div className="recbar">
//           <div className="recscr">
//             {recLoading&&<div className="recgen"><span className="spin"/>생성 중...</div>}
//             {recAnswers.map((a,i)=>(
//               <button key={i} className="rchip" onClick={()=>sendRecommended(a)}
//                 disabled={loading||recLoading}>{a}</button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* PC 오른쪽 패널 - 일반 채팅 (나레이션+추천답변) */}
//       {!isBoss&&(
//         <div className="pcr" style={{display:"none"}}>
//           {/* ↓ 두루마리 배경 이미지 교체 위치
//               IMAGES.scrollBg 에 경로 입력하면 오른쪽 패널 상단에 두루마리 이미지 표시
//               예: IMAGES.scrollBg = "/assets/images/scroll_bg.png" */}
//           {/* 두루마리 이미지: IMAGES.scrollBg 에 경로 입력시 표시 */}
//           {IMAGES.scrollBg
//             ? <div className="pcr-scroll-img"><img src={IMAGES.scrollBg} alt="두루마리" /></div>
//             : <div className="pcr-scroll-fallback">
//                 <div className="scroll-title">📜 나레이션</div>
//                 <p style={{fontSize:12,lineHeight:1.9,whiteSpace:"pre-line"}}>{info.text}</p>
//                 {info.tip&&<p className="tip-text">*Tip: {info.tip}</p>}
//               </div>
//           }
//           <div className="pcr-content">
//           <div className="pcrec-wrap">
//             {recLoading&&<div style={{fontSize:11,color:"#8a7050",padding:"4px 0"}}> 생성 중...</div>}
//             {recAnswers.map((a,i)=>(
//               <button key={i} className="pcrec-btn" onClick={()=>sendRecommended(a)}
//                 disabled={loading||recLoading}>{a}</button>
//             ))}
//           </div>
//           </div>
//         </div>
//       )}

//       {/* PC 오른쪽 패널 - 보스 채팅 (캐릭터+심기) */}
//       {isBoss&&(
//         <div className="boss-pcr" style={{display:"none"}}>
//           <div className="boss-pcr-charimg">
//             {/* ↓ 태황대군 이미지 교체 위치
//                 IMAGES.tyrant 에 경로 입력
//                 예: "/assets/tyrant.png" */}
//             {charImg
//               ? <img src={charImg} alt="태황대군" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
//               : <span style={{fontSize:14}}>태황대군 이미지</span>
//             }
//           </div>
//           <div className="boss-pcr-hp">
//             <div className="boss-pcr-hplbl">심기</div>
//             <div className="boss-pcr-hpval">{bossHp}</div>
//             {bossDelta!==null&&(
//               <div className="boss-pcr-delta" style={{color:bossDelta>=0?"#69f0ae":"#ff5252"}}>
//                 {bossDelta>=0?`+${bossDelta}`:bossDelta}
//               </div>
//             )}
//             <div className="boss-pcr-track"><div className="boss-pcr-fill" style={{width:`${hpPct}%`}}/></div>
//           </div>
//         </div>
//       )}

//       {/* 모바일 캐릭터 모달 */}
//       {showModal&&(
//         <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,
//           display:"flex",alignItems:"center",justifyContent:"center"}}
//           onClick={()=>setShowModal(false)}>
//           <div style={{background:"#f5ead6",borderRadius:12,padding:20,maxWidth:260,
//             width:"90%",textAlign:"center"}} onClick={e=>e.stopPropagation()}>
//             <div style={{width:150,height:190,background:"#d4c4a0",borderRadius:8,
//               margin:"0 auto 12px",overflow:"hidden",display:"flex",
//               alignItems:"center",justifyContent:"center",fontSize:12,color:"#8a7050"}}>
//               {/* ↓ 모바일 모달 캐릭터 이미지 */}
//               {charImg
//                 ? <img src={charImg} alt={npcName} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
//                 : "캐릭터 이미지"
//               }
//             </div>
//             <div style={{fontSize:14,color:"#2c1a0e",marginBottom:8,fontWeight:700}}>{npcName}</div>
//             {isBoss&&<div style={{fontSize:13,color:"#c62828"}}>심기: {bossHp}/30</div>}
//             <button className="btn-prev" style={{marginTop:12,width:"100%"}} onClick={()=>setShowModal(false)}>닫기</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================
// // 미니게임: 협력 세력
// // ============================================================
// function MiniAlly({ onResult, badFaction="죽", sessionId }) {
//   const OPTIONS=["매","난","국","죽"];
//   const [selected,setSelected]=useState(null);
//   const [revealed,setRevealed]=useState(false);
//   const [success,setSuccess]=useState(null);
//   const [showResult,setShowResult]=useState(false);

//   async function choose(opt){
//     setSelected(opt);setRevealed(true);
//     try{
//       const r=await fetch(`${API}/minigame`,{method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({type:"협력세력_1차",choice:opt,session_id:sessionId})});
//       const data=await r.json();
//       setSuccess(data.success);
//       setTimeout(()=>setShowResult(true),800);
//     } catch {
//       alert("서버 연결 오류. 다시 시도해주세요.");
//       setRevealed(false); setSelected(null);
//     }
//   }

//   if(showResult) return (
//     <div className="mini-result">
//       {success
//         ? IMAGES.miniResultAllyOk && <img src={IMAGES.miniResultAllyOk} className="mini-result-bg" alt="결과"/>
//         : IMAGES.miniResultAllyFail && <img src={IMAGES.miniResultAllyFail} className="mini-result-bg" alt="결과"/>
//       }
//       <div className="mini-result-card">
//         <div className="mini-result-title">{success?"성공하셨습니다":"실패하셨습니다"}</div>
//         <p className="mini-result-desc">
//           {success
//             ? "복위에 우호적인 세력을 선택했습니다.\n\n선택하신 세력은 훗날 복위 작전에서\n당신에게 큰 힘이 되어줄 것입니다."
//             : "반(反)희종 세력을 선택하고 말았습니다.\n\n이들은 태황대군에게 당신의 계획을 고하고\n당신에게 사약을 내렸습니다."
//           }
//         </p>
//       </div>
//       <button className="mini-result-btn" onClick={()=>onResult(success?"allyOk":"evil")}>
//         {success?"채팅 계속하기":"결과 확인"}
//       </button>
//     </div>
//   );

//   return (
//     <div className="mini">
//       {IMAGES.miniBgAlly && <img src={IMAGES.miniBgAlly} className="mini-bg" alt="배경"/>}
//       <div className="mini-inner">
//         <div className="mboard">
//           <div className="rope"/>
//           <div className="mtitle">협력 세력 고르기</div>
//           <p className="mdesc">복위를 위해 협력 세력을 모을 차례입니다.<br/>다음 네 세력 중 한 세력을 제외하고 모두 복위에 우호적입니다.<br/>반(反)희종 세력을 피해 포섭할 하나의 협력 세력을 선택하세요.</p>
//         </div>
//         <div className="mopts">
//           {OPTIONS.map(opt=>(
//             <button key={opt}
//               className={`mbtn${revealed&&opt===selected?(success===null?"":(success?" sel":" wrong")):""}` }
//               onClick={()=>!revealed&&choose(opt)} disabled={revealed}>
//               '{opt}' 세력
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// function MiniLetter({ onResult, sessionId }) {
//   const OPTIONS=["A","B","C","D"];
//   const [selected,setSelected]=useState(null);
//   const [revealed,setRevealed]=useState(false);
//   const [success,setSuccess]=useState(null);
//   const [showResult,setShowResult]=useState(false);

//   async function choose(opt){
//     setSelected(opt);setRevealed(true);
//     try{
//       const r=await fetch(`${API}/minigame`,{method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({type:"비밀서신",choice:opt,session_id:sessionId})});
//       const data=await r.json();
//       setSuccess(data.success);
//       setTimeout(()=>setShowResult(true),800);
//     } catch {
//       alert("서버 연결 오류. 다시 시도해주세요.");
//       setRevealed(false); setSelected(null);
//     }
//   }

//   if(showResult) return (
//     <div className="mini-result">
//       {success
//         ? IMAGES.miniResultLetterOk && <img src={IMAGES.miniResultLetterOk} className="mini-result-bg" alt="결과"/>
//         : IMAGES.miniResultLetterFail && <img src={IMAGES.miniResultLetterFail} className="mini-result-bg" alt="결과"/>
//       }
//       <div className="mini-result-card">
//         <div className="mini-result-title">{success?"성공하셨습니다":"실패하셨습니다"}</div>
//         <p className="mini-result-desc">
//           {success
//             ? "서신을 안전하게 전달했습니다.\n\n협력 세력은 복위 작전을 위해\n준비를 시작할 것입니다."
//             : "심복이 매복한 길을 선택하고 말았습니다.\n\n서신이 태황대군에게 전달되었고\n당신과 희종에게 사약이 내려졌습니다."
//           }
//         </p>
//       </div>
//       <button className="mini-result-btn" onClick={()=>onResult(success?"letterOk":"userDeath")}>
//         {success?"채팅 계속하기":"결과 확인"}
//       </button>
//     </div>
//   );

//   return (
//     <div className="mini">
//       {IMAGES.miniBgLetter && <img src={IMAGES.miniBgLetter} className="mini-bg" alt="배경"/>}
//       <div className="mini-inner">
//         <div className="mboard">
//           <div className="rope"/>
//           <div className="mtitle">비밀 서신 전달하기</div>
//           <p className="mdesc">희종의 복위 작전이 담긴 서신을 협력세력에게 전달해야 합니다.<br/>네 개의 길 중 한 개의 길에는 태황대군의 심복이 매복 중입니다.<br/>태황대군에게 발각되지 않을 길을 선택하여 서신을 전달해 주세요.</p>
//         </div>
//         <div className="mopts">
//           {OPTIONS.map(opt=>(
//             <button key={opt}
//               className={`mbtn${revealed&&opt===selected?(success===null?"":(success?" sel":" wrong")):""}`}
//               onClick={()=>!revealed&&choose(opt)} disabled={revealed}>
//               {opt}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // 미니게임: 사병 키우기
// // ============================================================
// function getSoldierConfig(week){
//   const configs={
//     3:{min:100,max:800,baseSafe:600,label:"느슨한",hint:"이번엔 넉넉하게 모아도 될 것 같습니다."},
//     5:{min:100,max:500,baseSafe:250,label:"매우 철저한",hint:"지금은 단속이 심하니 소규모로만 움직이십시오."},
//     8:{min:100,max:700,baseSafe:350,label:"철저한",hint:"거사를 앞두고 단속이 강화되어 있습니다. 신중하게."},
//   };
//   const base=configs[week]||configs[3];
//   return{...base};
// }

// function MiniSoldier({ week, currentSoldiers, onResult, sessionId }) {
//   const [input,setInput]=useState("");
//   const [error,setError]=useState("");
//   const [cfg]=useState(()=>getSoldierConfig(week));
//   const needed=Math.max(0,1000-currentSoldiers);
//   const [showResult,setShowResult]=useState(false);
//   const [resultSuccess,setResultSuccess]=useState(false);
//   const [resultCount,setResultCount]=useState(0);

//   async function submit(){
//     const n=parseInt(input);
//     if(isNaN(n)||n<cfg.min||n>cfg.max){setError(`${cfg.min}~${cfg.max} 사이 숫자를 입력해주세요.`);return;}
//     const roundKey=week<=3?"사병키우기_1차":week<=6?"사병키우기_2차":"사병키우기_3차";
//     try{
//       const r=await fetch(`${API}/minigame`,{method:"POST",
//         headers:{"Content-Type":"application/json"},
//         body:JSON.stringify({type:roundKey,choice:String(n),session_id:sessionId})});
//       const data=await r.json();
//       if(data.success){ setResultSuccess(true); setResultCount(n); setShowResult(true); }
//       else { setResultSuccess(false); setShowResult(true); }
//     } catch {
//       alert("서버 연결 오류. 다시 시도해주세요.");
//     }
//   }

//   if(showResult) return (
//     <div className="mini-result">
//       {resultSuccess
//         ? IMAGES.miniResultSoldierOk && <img src={IMAGES.miniResultSoldierOk} className="mini-result-bg" alt="결과"/>
//         : IMAGES.miniResultSoldierFail && <img src={IMAGES.miniResultSoldierFail} className="mini-result-bg" alt="결과"/>
//       }
//       <div className="mini-result-card">
//         <div className="mini-result-title">{resultSuccess?"성공하셨습니다":"발각되었습니다"}</div>
//         <p className="mini-result-desc">
//           {resultSuccess
//             ? `${resultCount}명의 사병을 성공적으로 모집했습니다.\n\n이들은 훗날 복위 작전의 중요한 전력이\n될 것입니다.`
//             : "무리한 규모의 모집으로 태황대군의 단속에\n사병 모집이 적발되었습니다."
//           }
//         </p>
//       </div>
//       <button className="mini-result-btn" onClick={()=>resultSuccess?onResult("soldierOk",resultCount):onResult("soldierCaught")}>
//         {resultSuccess?"채팅 계속하기":"결과 확인"}
//       </button>
//     </div>
//   );

//   return (
//     <div className="mini">
//       {IMAGES.miniBgSoldier && <img src={IMAGES.miniBgSoldier} className="mini-bg" alt="배경"/>}
//       <div className="mini-inner">
//         <div className="mboard">
//           <div className="rope"/>
//           <div className="mtitle">사병 키우기</div>
//           <p className="mdesc">복위를 위한 필수 단계인 사병 모으기입니다.<br/>태황대군의 단속을 피해 세 차례에 걸쳐 최소 <b>1,000명</b>의 사병을 모아야 합니다.<br/>이번에는 몇 명의 사병을 모집할까요?</p>
//           <p className="mred">*지금은 사병 단속이 <b>{cfg.label}</b> 기간입니다.</p>
//           <p style={{fontSize:12,color:"#5a4a2a",marginTop:4}}>*{cfg.min}~{cfg.max} 입력 가능</p>
//         </div>
//         <div className="mini-input-row">
//           <input className="minp" type="number" min={cfg.min} max={cfg.max}
//             placeholder={`${cfg.min}~${cfg.max}`} value={input}
//             onChange={e=>{setInput(e.target.value);setError("");}}
//             onKeyDown={e=>e.key==="Enter"&&submit()}/>
//           <button className="msub" onClick={submit}>확인</button>
//         </div>
//         {error&&<p style={{fontSize:13,fontWeight:700,color:"#ff6b6b",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>{error}</p>}
//         <p style={{fontSize:13,color:"rgba(255,255,255,0.8)",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>
//           현재 <b>{currentSoldiers}명</b> · 목표까지 <b style={{color:needed>0?"#ff6b6b":"#69f0ae"}}>{needed>0?`${needed}명 부족`:"달성!"}</b>
//         </p>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // 엔딩 화면
// // 이미지: IMAGES.endingSuccess / endingFail / endingDeath / endingEvil
// // ============================================================
// function EndingScreen({ endingKey, onRestart }) {
//   const ending = ENDINGS[endingKey]||ENDINGS.failPersuade;
//   const endImg = getEndingImage(endingKey);
//   return (
//     <div style={{width:"100vw",height:"100vh",position:"relative",overflow:"hidden",background:"#1a1208"}}>
//       {/* 엔딩 배경 이미지 전체화면 */}
//       {endImg
//         ? <img src={endImg} alt={ending.title}
//             style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}/>
//         : <div style={{position:"absolute",inset:0,zIndex:0,display:"flex",flexDirection:"column",
//             alignItems:"center",justifyContent:"center",gap:20,padding:32,background:"#1a1208"}}>
//             <div style={{fontSize:26,fontWeight:700,color:"#c9a84c"}}>{ending.title}</div>
//             <div style={{fontSize:14,lineHeight:2,color:"#fdf8f0",textAlign:"center",
//               whiteSpace:"pre-line",maxWidth:500}}>{ending.text}</div>
//           </div>
//       }
//       {/* 다시하기 버튼 — 우하단 */}
//       <div style={{position:"absolute",bottom:32,right:32,zIndex:10}}>
//         <button className="btn-next" onClick={onRestart}>처음부터 다시하기</button>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // 메인 게임 엔진
// // ============================================================
// export default function HeejongGame() {
//   // 탭/브라우저 열 때마다 새 세션 → 재접속하면 새 게임
//   const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));

//   const [screen,setScreen]=useState("prologue");
//   const [playerName,setPlayerName]=useState("");
//   const [week,setWeek]=useState(1);
//   const [stats,setStats]=useState({...INITIAL_STATS});
//   const [endingKey,setEndingKey]=useState(null);
//   const [badFaction]=useState('');  // 백엔드에서 판정

//   function updateStats(delta){
//     setStats(s=>({
//       // 호감도 최솟값 -20 (한두 번 실수로 바로 베드엔딩 안 됨)
//       // 베드엔딩은 -20 이하일 때만 발생
//       affection:Math.max(-20,Math.min(100,s.affection+(delta.affection||0))),
//       soldiers:s.soldiers+(delta.soldiers||0),
//       minsim:Math.max(0,s.minsim+(delta.minsim||0)),
//     }));
//   }
//   function triggerEnding(key){setEndingKey(key);setScreen("ending");}
//   function handleDialogComplete(result){
//     if(result==="badAffection"){triggerEnding("badAffection");return;}
//     if(result==="bossKill"){triggerEnding("deathBoss");return;}
//     if(result==="bossSurvive"){setScreen("mini_soldier");return;}
//     const miniMap={1:null,2:"mini_ally",3:"mini_soldier",4:"mini_letter",5:null,6:null,7:"mini_ally",8:"mini_soldier"};
//     const mini=miniMap[week];
//     if(mini) setScreen(mini); else advanceWeek();
//   }
//   function advanceWeek(){
//     if(week>=8){
//       if(stats.affection<90) triggerEnding("failPersuade");
//       else if(stats.soldiers<1000) triggerEnding("deathBattle");
//       else triggerEnding("success");
//       return;
//     }
//     updateStats({minsim:week===7?-60:-5});
//     setWeek(w=>w+1);
//     setTimeout(()=>setScreen("week_transition"), 0);
//   }
//   function handleMiniResult(result,value){
//     if(result==="evil"){triggerEnding("evil");return;}
//     if(result==="soldierCaught"){triggerEnding("soldierCaught");return;}
//     if(result==="userDeath"){triggerEnding("userDeath");return;}
//     if(result==="allyOk"||result==="letterOk"){advanceWeek();return;}
//     if(result==="soldierOk"){updateStats({soldiers:value});advanceWeek();return;}
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div>
//         {screen==="prologue"&&<PrologueScreen onNext={()=>setScreen("goal")}/>}
//         {screen==="goal"&&<GoalScreen onNext={()=>setScreen("stat_intro")} onPrev={()=>setScreen("prologue")}/>}
//         {screen==="stat_intro"&&<StatIntroScreen onNext={()=>setScreen("name")} onPrev={()=>setScreen("goal")}/>}
//         {screen==="name"&&<NameScreen onNext={name=>{setPlayerName(name);setScreen("week_transition");}}/>}
//         {screen==="week_transition"&&<WeekTransitionScreen week={week} onNext={()=>setScreen("chat")}/>}
//         {screen==="chat"&&<ChatScreen key={week} week={week} playerName={playerName} stats={stats}
//           onStatsChange={updateStats} onDialogComplete={handleDialogComplete}
//           isBoss={week===5} badFaction={badFaction} sessionId={sessionId}/>}
//         {screen==="mini_ally"&&<MiniAlly badFaction={badFaction} onResult={handleMiniResult} sessionId={sessionId}/>}
//         {screen==="mini_letter"&&<MiniLetter onResult={handleMiniResult} sessionId={sessionId}/>}
//         {screen==="mini_soldier"&&<MiniSoldier week={week} currentSoldiers={stats.soldiers} onResult={handleMiniResult} sessionId={sessionId}/>}
//         {screen==="ending"&&<EndingScreen endingKey={endingKey} onRestart={()=>{setScreen("prologue");setWeek(1);setStats({...INITIAL_STATS});setPlayerName("");setEndingKey(null);}}/>}
//       </div>
//     </>
//   );
// }



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
  poison:{title:"사약 엔딩",text:"태황대군은 당신의 행동이 수상하다는 것을 눈치채고 있었습니다.\n\n결국 당신에게 사약을 내렸습니다. 희종을 복위시키려던 모든 계획은 물거품이 되었습니다."},
};

const ALL_FACTIONS = ["매","난","국","죽"];
const RAW_API = process.env.REACT_APP_API_URL || "http://localhost:8000";
const API = RAW_API.replace(/\/+$/, "");

// ============================================================
// 이미지 경로 설정 — 나중에 이 부분만 바꾸면 됩니다!
// src/assets/ 폴더에 파일 넣고 경로 수정
// ============================================================
const IMAGES = {
  // 프롤로그: 4장 배경 이미지 (각 페이지별)
  prologue1:      "/assets/images/prologue1.png",
  prologue2:      "/assets/images/prologue2.png",
  prologue3:      "/assets/images/prologue3.png",
  prologue4:      "/assets/images/prologue4.png",

  playerAvatar:   "/assets/images/player_avatar.png",
  phoenix:        "/assets/images/phoenix.png",
  statAffection:  "/assets/images/stat_affection.png",
  statSoldier:    "/assets/images/stat_soldier.png",
  statMinsim:     "/assets/images/stat_minsim.png",
  weekBg:         "/assets/images/week_bg.png",
  heejong0:  "/assets/images/희종_0.png",
  heejong30: "/assets/images/희종_30.png",
  heejong50: "/assets/images/희종_50.png",
  heejong70: "/assets/images/희종_70.png",

  // 태황대군: 심기 구간별 (0~30 분노, 31~60 평상, 61~100 기분좋음)
  tyrantAngry:    "/assets/images/폭군_분노.png",
  tyrantNormal:   "/assets/images/폭군_의심.png",
  tyrantHappy:    "/assets/images/폭군_호탕.png",

  // 미니게임 배경 (각각 다른 이미지)
  miniBgAlly:       "/assets/images/mini_allys.png",
  miniBgLetter:     "/assets/images/mini_letters.png",
  miniBgSoldier:    "/assets/images/mini_soldiers.png",
  paper: "/assets/images/paper.png",

  // 미니게임 결과 화면 배경
  miniResultAllyOk:      "/assets/images/mini_result_ally_okk.png",      // 협력세력 성공
  miniResultAllyFail:    "/assets/images/mini_result_ally_fail.png",     // 협력세력 실패
  miniResultLetterOk:    "/assets/images/mini_result_letter_okk.png",     // 서신 성공
  miniResultLetterFail:  "/assets/images/mini_result_letter_fail.png",   // 서신 실패
  miniResultSoldierOk:   "/assets/images/mini_result_soldier_okk.png",    // 사병 성공
  miniResultSoldierFail: "/assets/images/mini_result_soldier_fail.png",  // 사병 실패

  scrollBg:       "/assets/images/scroll.png",
  bossLeftBg:     "/assets/images/boss_left.png",

  // 엔딩: 전체 배경 이미지
  endingSuccess:  "/assets/images/ending_success.png",
  endingFail:     "/assets/images/ending_fail.png",
  endingDeath:    "/assets/images/ending_death.png",
  endingEvil:     "/assets/images/ending_evil.png",
  endingCaught:   "/assets/images/ending_caught.png",
  endingBoss:     "/assets/images/ending_boss.png",
  endingUserDead: "/assets/images/ending_userdead.png",
  endingBad:      "/assets/images/ending_fail.png",
  endingPoison:   "/assets/images/ending_poison.png",
};

// 호감도에 따른 희종 이미지 선택 함수
function getHeejongImage(affection) {
  if (affection >= 70 && IMAGES.heejong70) return IMAGES.heejong70;
  if (affection >= 50 && IMAGES.heejong50) return IMAGES.heejong50;
  if (affection >= 30 && IMAGES.heejong30) return IMAGES.heejong30;
  return IMAGES.heejong0;
}


// 태황대군: 심기에 따라 이미지 선택
function getTyrantImage(hp) {
  if (hp <= 30) return IMAGES.tyrantAngry;
  if (hp <= 60) return IMAGES.tyrantNormal;
  return IMAGES.tyrantHappy;
}

// 엔딩 키에 따라 이미지 선택
function getEndingImage(key) {
  const map = {
    success:       IMAGES.endingSuccess,
    deathBattle:   IMAGES.endingDeath,
    failPersuade:  IMAGES.endingFail,
    evil:          IMAGES.endingEvil,
    soldierCaught: IMAGES.endingCaught,
    deathBoss:     IMAGES.endingBoss,
    userDeath:     IMAGES.endingUserDead,
    badAffection:  IMAGES.endingBad,
    poison:        IMAGES.endingPoison,
  };
  return map[key] || null;
}

const AFFECTION_NARRATIONS = [
  {
    min: 70,
  
    text: "희종은 마침내 경계를 풀고, 말을 이어갑니다. 그의 눈에는 이전과는 다른 결심이 서려 있습니다. 이제 그는 도망치지 않으려 합니다. 그러나 결심만으로는 부족합니다. 복위를 이루기 위해 치밀한 준비가 필요합니다. 당신의 말 한마디가 앞으로를 좌우하게 될 것입니다.",
    tip: "막연한 의지보다 구체적인 계획을 제시해 보세요.",
  },
  {
    min: 50,
  
    text: "희종은 당신의 말에 귀를 기울이기 시작합니다. 완전히 마음을 연 것은 아니나, 대화를 피하지는 않습니다. 그는 자신의 처지를 외면하기보다는, 마주하려는 기색을 보입니다. 지금이야말로 그를 설득하여 다시 일어설 수 있도록 이끌어야 할 때입니다.",
    tip: "백성들이 여전히 희종을 기억하고 있으며, 그의 복위를 바라고 있다는 사실을 전해 보세요. 존재의 의미를 일깨워 주는 것이 중요합니다.",
  },
  {
    min: 30,

    text: "희종은 당신의 말을 완전히 외면하지는 않습니다. 짧은 대답이나마 건네기 시작했으나, 그 눈빛에는 여전히 의심이 남아 있습니다. 조금의 실수로도 쌓아온 신뢰는 쉽게 무너질 수 있습니다.",
    tip: "복위나 권력에 대한 이야기만을 이어가기보다는, 희종의 현재 삶과 감정에 공감해 보세요.",
  },
  {
    min: 0,

    text: "당신은 희종이 머무는 유배지에 처음 발을 들입니다. 초라한 초가 안, 희종은 인기척에도 모습을 드러내지 않습니다. 그는 반정 이후, 누구도 믿지 못한 채 스스로를 단절시키고 있습니다. 섣부른 말이 오히려 그의 마음을 닫게 만들 수 있습니다. 조심스럽게 거리를 좁히며 대화를 시도해 보세요.",
    tip: "안부를 묻거나 과거를 회상하는 등 부담 없는 이야기로 시작해 보세요.",
  },
];

function getAffectionNarration(affection) {
  return AFFECTION_NARRATIONS.find(item => affection >= item.min) || AFFECTION_NARRATIONS[AFFECTION_NARRATIONS.length - 1];
}

function resolveImageUrl(data, fallbackAffection) {
  if (data?.이미지파일) {
    return `${API}/images/${encodeURIComponent(data.이미지파일)}`;
     // 없으면 호감도 기반 로컬 이미지
  return getHeejongImage(fallbackAffection);
  }

  const rawUrl = data?.이미지URL || data?.image_url || data?.imageUrl || data?.character_image || data?.캐릭터이미지 || null;
  if (rawUrl) {
    if (rawUrl.startsWith("http")) return rawUrl;
    return `${API}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
  }

  return getHeejongImage(fallbackAffection);
}

function resolveBossImageUrl(data, fallbackHp = 20) {
  if (data?.이미지파일) {
    return `${API}/images/${encodeURIComponent(data.이미지파일)}`;
  }

 
  if (fallbackHp <= 10) return IMAGES.tyrantAngry;
  if (fallbackHp <= 20) return IMAGES.tyrantSuspicious;
  return IMAGES.tyrantHappy;
}

// ============================================================
// CSS — 이미지 기반 디자인 (제공된 스크린샷 기준)
// ============================================================

const styles = `

  @font-face {
    font-family: 'ShillaCulture';
    src: url('/assets/fonts/Shilla_Culture(M).ttf') format('truetype');
    font-weight: 400;
  }
  @font-face {
    font-family: 'ShillaCulture';
    src: url('/assets/fonts/Shilla_Culture(B).ttf') format('truetype');
    font-weight: 700;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
  *{font-family:'ShillaCulture',serif !important}
  :root{
    --bg:#2b1d0f;
    --gray:#d9d5ce;
    --gray-dark:#c8c4bc;
    --paper:#f5ead6;
    --paper-light:#fdf8ee;
    --ink:#2c1a0e;
    --gold:#c9a84c;
    --gold2:#e8c97a;
    --white:#fdf8f0;
    --safe-top:env(safe-area-inset-top,0px);
    --safe-bot:env(safe-area-inset-bottom,0px);
  }
  html,body,#root{background:var(--bg);color:var(--white);width:100%,height:100%;overflow:hidden}
  .fade{animation:fi 0.4s ease}
  @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1}}
  .spin{display:inline-block;width:13px;height:13px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:sp 0.8s linear infinite}
  @keyframes sp{to{transform:rotate(360deg)}}

  /* ── 버튼 ── */
  .btn-prev{background:#5c5248;color:#d8ccc0;border:none;border-radius:6px;padding:10px 24px;font-size:15px;cursor:pointer;letter-spacing:0.03em}
  .btn-next{background:#3a2c1a;color:#e8c97a;border:2px solid #c9a84c;border-radius:6px;padding:10px 28px;font-size:15px;cursor:pointer;letter-spacing:0.03em}
  .btn-next:disabled{opacity:0.4;cursor:default}
  .btn-start{background:#5a4420;color:#e8c97a;border:2px solid #c9a84c;border-radius:6px;padding:9px 0;font-size:14px;cursor:pointer;width:75%;max-width:200px;letter-spacing:0.04em}
  .btn-start:disabled{opacity:0.4;cursor:default}

  /* ── 풀스크린 (프롤로그/목표/스탯/이름) ── */
  .page{width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#2b1d0f;padding:0;overflow:hidden;position:relative}
  .bottom-nav{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:18px 26px;padding-bottom:calc(18px + var(--safe-bot))}
  .prologue-wrap{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#2b1d0f}
  .prologue-illust{width:180px;height:140px;object-fit:contain;margin-bottom:28px;flex-shrink:0}
  .prologue-illust-placeholder{width:180px;height:140px;margin-bottom:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:rgba(201,168,76,0.3);font-size:12px}
  .prologue-text{font-size:15px;line-height:2.1;color:rgba(253,248,240,0.9);text-align:center;max-width:640px;padding:0 36px;flex-shrink:0}
  .prologue-dots{display:flex;gap:8px;justify-content:center;margin-top:24px;margin-bottom:80px}
  .dot{width:7px;height:7px;border-radius:50%;background:rgba(201,168,76,0.25);transition:background 0.3s}
  .dot.a{background:var(--gold)}
  .name-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;max-width:340px;padding:0 20px}
  .name-desc{font-size:14px;color:rgba(253,248,240,0.88);text-align:center;line-height:1.9}
  .name-avatar-wrap{width:130px;height:130px;border-radius:50%;background:#3a2a1a;border:2px solid #6a5030;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .name-avatar-wrap img{width:100%;height:100%;object-fit:cover}
  .name-avatar-placeholder{font-size:36px;color:#6a5030}
  .name-row{display:flex;align-items:center;gap:8px;width:100%}
  .name-label{font-size:14px;color:rgba(253,248,240,0.8);white-space:nowrap;flex-shrink:0}
  .name-input{flex:1;background:#ffffff;border:1px solid #c8b48a;border-radius:4px;padding:8px 12px;color:#2c1a0e;font-size:14px;outline:none}
  .name-input::placeholder{color:#a09080}
  .name-input:focus{border-color:var(--gold)}
  .goal-wrap,.stat-wrap{display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;max-width:480px;padding:0 24px}
  .goal-title,.stat-title{font-size:28px;font-weight:700;color:var(--white);letter-spacing:0.1em}
  .goal-illust{width:120px;height:100px;object-fit:contain}
  .goal-illust-placeholder,.stat-item-placeholder{display:flex;align-items:center;justify-content:center;font-size:40px}
  .goal-illust-placeholder{width:120px;height:100px}
  .goal-box,.stat-box{background:var(--paper-light);border-radius:6px;padding:22px 24px;width:100%}
  .goal-box p,.stat-box-desc{font-size:14px;color:var(--ink);line-height:2.0;text-align:center}
  .stat-box-desc{margin-bottom:20px}
  .stat-icons-row{display:flex;justify-content:space-around;align-items:flex-end;gap:12px}
  .stat-item-wrap{display:flex;flex-direction:column;align-items:center;gap:10px}
  .stat-item-img{width:80px;height:80px;object-fit:contain}
  .stat-item-placeholder{width:80px;height:80px}
  .stat-item-label{font-size:14px;color:var(--ink);font-weight:500}

  
  /* ── 주차 전환 ── */
  .week-screen{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
  .week-card{
    position:relative;z-index:2;
    width:80%;max-width:600px;
    background:rgba(220,225,230,0.88);
    border-radius:4px;
    padding:32px 28px;
    text-align:center;
    max-height:85vh;
    overflow-y:auto;
  }
  .week-card-title{font-size:28px;font-weight:700;color:#1a1208;margin-bottom:18px;letter-spacing:0.06em}
  .week-card-text{font-size:14px;line-height:1.9;color:#1a1208;white-space:pre-line;margin-bottom:24px}
  @media(min-width:768px){
    .week-card{width:58%;max-width:800px;padding:48px 56px}
    .week-card-title{font-size:36px;margin-bottom:28px}
    .week-card-text{font-size:16px;line-height:2.2;margin-bottom:32px}
  }

  /* ── 채팅 공통 ── */
  .chat{width:100vw;height:100vh;overflow:hidden;display:flex;flex-direction:column}

  /* 모바일 상단바 */
  .mob-topbar{background:#1e1008;padding:8px 12px;padding-top:calc(8px + var(--safe-top));display:flex;align-items:center;gap:6px;flex-shrink:0;border-bottom:1px solid #3a2010}
  .chat.boss .mob-topbar{background:#4a0000;border-color:#7a0000}
  .wchip{font-size:11px;color:var(--gold);font-weight:700;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:20px;padding:3px 9px;white-space:nowrap;flex-shrink:0}
  .schips{display:flex;gap:5px;flex:1;overflow:hidden}
  .schip{font-size:10px;background:rgba(245,234,214,0.1);border:1px solid rgba(201,168,76,0.2);border-radius:20px;padding:3px 7px;white-space:nowrap;color:rgba(253,248,240,0.85);display:flex;align-items:center;gap:3px}
  .schip b{color:var(--gold2)}
  .cthumb{width:32px;height:32px;border-radius:50%;flex-shrink:0;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.3);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;overflow:hidden}
  .cthumb img{width:100%;height:100%;object-fit:cover}
  .mob-bossbar{background:#5a0000;padding:5px 12px;flex-shrink:0;border-bottom:1px solid #8a0000;display:flex;align-items:center;gap:8px}
  .bblbl{font-size:10px;color:#f5c0c0;white-space:nowrap}
  .bbtrk{flex:1;height:6px;background:#3a0000;border-radius:4px;overflow:hidden}
  .bbfil{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
  .bbval{font-size:12px;color:#ff6b6b;font-weight:700;white-space:nowrap}
  .mob-narr{background:var(--gray);border-bottom:1px solid #b0a898;padding:8px 12px;flex-shrink:0;cursor:pointer;display:flex;align-items:flex-start;gap:8px;user-select:none}
  .chat.boss .mob-narr{background:#300808;border-color:#6a0000}
  .mob-narrtx{font-size:11px;color:#4a3a28;line-height:1.6;flex:1}
  .chat.boss .mob-narrtx{color:#f5c0c0}
  .mob-narr-arr{font-size:11px;color:#6a5838;flex-shrink:0}

  /* 메시지 - 전체 회색 */
  .msgs{flex:1;overflow-y:auto;padding:12px 10px;display:flex;flex-direction:column;gap:12px;-webkit-overflow-scrolling:touch;background:var(--gray)}
  .chat.boss .msgs{background:#1a0000}
  .msgs::-webkit-scrollbar{width:3px}
  .msgs::-webkit-scrollbar-thumb{background:#b0a898;border-radius:2px}
  .msg{display:flex;flex-direction:column;max-width:78%}
  .msg.npc{align-self:flex-start;align-items:flex-start}
  .msg.usr{align-self:flex-end;align-items:flex-end}
  .mname{font-size:10px;color:#6a5838;margin-bottom:3px}
  .bub{padding:9px 14px;border-radius:18px;font-size:13px;line-height:1.75}
  .msg.npc .bub{background:#4a3828;color:#f5ead6;border-bottom-left-radius:4px}
  .msg.usr .bub{background:#f0ece4;color:#2c1a0e;border-bottom-right-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,0.1)}
  .chat.boss .msg.npc .bub{background:#3d0808;color:#f5c0c0;border:1px solid #6a0000}

  /* 추천답변 - 회색 배경 */
  .recbar{background:var(--gray-dark);border-top:1px solid #b0a898;padding:7px 10px;flex-shrink:0}
  .chat.boss .recbar{display:none}
  .recscr{display:flex;gap:7px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px}
  .recscr::-webkit-scrollbar{display:none}
  .rchip{background:#fff;border:1px solid #d0c8b8;border-radius:20px;padding:7px 14px;font-size:12px;color:#3a2a1a;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background 0.15s;box-shadow:0 1px 2px rgba(0,0,0,0.06)}
  .rchip:active{background:#f0e8d0}
  .rchip:disabled{opacity:0.5;cursor:default}
  .recgen{font-size:11px;color:#8a7050;padding:6px 8px;white-space:nowrap;display:flex;align-items:center;gap:5px;flex-shrink:0}

  /* 입력창 - 회색 */
  .inrow{display:flex;gap:7px;padding:8px 10px;padding-bottom:calc(8px + var(--safe-bot));background:var(--gray-dark);border-top:1px solid #b0a898;flex-shrink:0}
  .chat.boss .inrow{background:#280808;border-color:#5a0000}
  .ci{flex:1;background:#f0ece4;border:1px solid #c0b8a8;border-radius:20px;padding:9px 14px;font-size:14px;color:#2c1a0e;outline:none}
  .chat.boss .ci{background:#1a0808;border-color:#5a0000;color:#f5c0c0}
  .ci:focus{border-color:#a07030}
  .sbtn{background:#2c1a0e;color:#fff;border:none;border-radius:6px;width:44px;height:36px;flex-shrink:0;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}
  .sbtn:disabled{opacity:0.5}
  .dcnt{font-size:10px;color:#6a5838;text-align:center;padding:2px 0;flex-shrink:0;background:var(--gray-dark)}
  .chat.boss .dcnt{background:#280808;color:#f5c0c0}

  /* ── PC 3컬럼 — 전체 회색(#d9d5ce) ── */
  @media(min-width:768px){
    /* 일반 채팅 — 전체 회색 */
    .chat:not(.boss){
      display:grid!important;
      grid-template-columns:220px 1fr 400px;
      grid-template-rows:100vh;
      background:var(--gray);
    }
    .chat:not(.boss) .mob-topbar,.chat:not(.boss) .mob-narr,.chat:not(.boss) .recbar{display:none!important}
    .chat:not(.boss) .msgs{padding:16px;gap:14px;background:var(--gray)}
    .chat:not(.boss) .msg{max-width:70%}
    .chat:not(.boss) .inrow{padding:10px 14px;padding-bottom:10px;background:var(--gray-dark);border-top:1px solid #b0a898}
    .chat:not(.boss) .dcnt{background:var(--gray-dark)}

    /* 보스 채팅 */
    .chat.boss{display:grid!important;grid-template-columns:220px 1fr 200px;grid-template-rows:100vh;background:#1a0000}
    .chat.boss .mob-topbar,.chat.boss .mob-bossbar,.chat.boss .mob-narr{display:none!important}
    .chat.boss .msgs{padding:16px;gap:14px}
    .chat.boss .msg{max-width:72%}
    .chat.boss .inrow{padding:12px 16px;padding-bottom:12px}
    .chat.boss .dcnt{background:#1a0000}

    /* PC 왼쪽 — 회색 배경 */
    .pcl{
      display:flex!important;flex-direction:column;align-items:center;
      padding:16px 12px;gap:10px;overflow-y:auto;height:100vh;
      background:var(--gray);border-right:1px solid #b8b4ac;
    }
    /* 주차 뱃지 — 이미지처럼 한지색 배경 */
    .pcwk{
      font-size:30px;font-weight:700;color:var(--ink);
      background:rgba(245,234,214,0.9);border:1px solid #c0a870;
      border-radius:4px;padding:4px 12px;width:100%;text-align:left;
    }
    /* 캐릭터 이미지 */
    .pccharimg{
      width:100%;height:280px;border:1px solid #b8a070;border-radius:4px;
      overflow:hidden;background:rgba(245,234,214,0.8);
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:6px;color:#8a7050;font-size:11px;text-align:center;
      flex-shrink:0;
    }
    .pccharimg img{width:100%;height:100%;object-fit:cover;object-position:top}
    .pccharimg-label{font-size:10px;color:#6a5030;padding:4px 8px;background:rgba(201,168,76,0.12);width:100%;text-align:center}
    /* 스탯 카드 3개 — 회색 배경 */
    .pcsts{display:flex;gap:5px;width:100%}
    .pcst{flex:1;background:rgba(245,234,214,0.8);border:1px solid #c0a870;border-radius:4px;padding:6px 3px;text-align:center;min-width:0}
    .pcstn{font-size:9px;color:#6b5a3a;letter-spacing:0.02em;margin-bottom:1px}
    .pcstv{font-size:17px;font-weight:700;color:var(--ink);line-height:1.2}
    .pcst-sub{font-size:8px;color:#8a6030}
    .pcdcnt{font-size:11px;color:#6a5838;text-align:center}

    /* 보스 왼쪽 */
   .boss-pcl{
  display:flex!important;
  flex-direction:column;
  padding:0;
  overflow:hidden;
  height:100vh;
  background:var(--paper);
  position:relative;
}


    /* PC 가운데 */
    .pcc{display:flex!important;flex-direction:column;height:100vh;overflow:hidden}
    .pcchdr{padding:8px 16px;font-size:11px;text-align:center;letter-spacing:0.04em;flex-shrink:0;background:#1e1008;color:var(--gold2);border-bottom:1px solid #3a2010}
    .chat.boss .pcchdr{background:#4a0000;border-color:#7a0000;color:#f5c0c0}

    /* PC 오른쪽 — 회색 배경 */
   .pcr{
  display:flex!important;
  flex-direction:column;
  padding:0;
  gap:0;
  overflow:hidden;  /* ← scroll → hidden */
  height:100vh;
  background:var(--gray);
  border-left:1px solid #b8b4ac;
  position:relative;
}
    .pcr-scroll-img{width:100%;flex-shrink:0}
    .pcr-scroll-img img{width:100%;height:auto;object-fit:contain;display:block}
    .pcr-scroll-overlay{padding:12px 16px;background:rgba(245,234,214,0.92);border:1px solid #c0a060;margin:0 12px 8px;border-radius:4px;color:var(--ink)}
    .pcr-scroll-overlay-title{font-size:14px;font-weight:700;color:#5a3a1a;margin-bottom:8px}
    .pcr-scroll-overlay-text{font-size:12px;line-height:1.85;white-space:pre-line}
    .pcr-scroll-overlay-tip{font-size:11px;line-height:1.7;color:#7a5a2a;margin-top:8px;font-style:italic}
    /* 두루마리 없을 때 텍스트 박스 */
    .pcr-scroll-fallback{
      background:rgba(245,234,214,0.9);border:1px solid #c0a060;
      margin:12px;border-radius:4px;padding:14px 12px;
      font-size:12px;line-height:1.85;color:var(--ink);
    }
    .scroll-title{font-size:13px;font-weight:700;color:#5a3a1a;margin-bottom:8px}
    .tip-text{font-size:11px;color:#7a5a2a;margin-top:8px;font-style:italic}
    .pcr-content{padding:8px 12px;display:flex;flex-direction:column;gap:0}
    /* 추천답변 버튼 — 이미지처럼 흰 배경 둥근 직사각형 */
    .pcrec-wrap{padding:8px 12px;display:flex;flex-direction:column;gap:8px}
    .pcrec-btn{
      background:#fff;border:1px solid #d0c8b8;border-radius:8px;
      padding:10px 14px;font-size:13px;color:#3a2a1a;
      cursor:pointer;text-align:left;line-height:1.4;
      transition:background 0.15s;box-shadow:0 1px 2px rgba(0,0,0,0.06);
    }
    .pcrec-btn:hover{background:#f5edd8;border-color:#b0a070}
    .pcrec-btn:disabled{opacity:0.5;cursor:default}

    /* 보스 오른쪽 */
  .boss-pcr{
  display:flex!important;
  flex-direction:column;
  align-items:center;
  padding:16px 12px;
  height:100vh;
  overflow:hidden;
  background:#2a0000;
  border-left:2px solid #5a0000;
  gap:16px;
}

.boss-pcr-charimg{
  width:100%;
  height:260px;
  overflow:hidden;
  display:flex;
  align-items:flex-start;
  justify-content:center;
  background:#1a0000;
  flex-shrink:0;
  border-radius:6px;
}

.boss-pcr-charimg img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:center top;
}

.boss-pcr-hp{
  width:100%;
  padding:16px;
  background:#3d000;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:8px;
  border-radius:6px;
  border: 2px solid #ffffff;
  flex-shrink:0;
}
    .boss-pcr-hplbl{font-size:16px;color:#f5c0c0;letter-spacing:0.08em}
    .boss-pcr-hpval{font-size:52px;font-weight:700;color:#fff;line-height:1}
    .boss-pcr-delta{font-size:13px;font-weight:600}
    .boss-pcr-track{width:80%;height:8px;background:#1a0000;border-radius:4px;overflow:hidden;margin-top:4px}
    .boss-pcr-fill{height:100%;background:linear-gradient(90deg,#c62828,#ff5252);transition:width 0.4s}
  }
.mini{
  position:fixed;
  inset:0;
  width:100vw;
  height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  background:#1a1208;
}

.mini-bg{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  z-index:0;
}

.mini-inner{
  position:relative;
  z-index:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:6px;
  width:min(90vw, 800px);
}

/* 한지 이미지 컨테이너 */
.mboard{
  position:relative;
  width:100%;
  text-align:center;
}

/* paper.png를 배경으로 */
.mboard-paper{
  position:relative;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
   padding:250px 200px 150px;
  min-height:800px;
  margin-bottom:-20px;
}

.mboard-paper-img{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:fill;
  z-index:0;
}

.mboard-content{
  position:relative;
  z-index:1;
  width:100%;
}

.mtitle{
  font-size:40px;
  font-weight:800;
  color:#2c1a0e;
  margin-bottom:20px;
  margin-top:20px;
  letter-spacing:0.06em;
}

.mdesc{
  font-size:20px;
  line-height:1.9;
  color:#3a2a0e;
  margin-bottom:10px;
  white-space:pre-line;
  word-break:keep-all;
}

.mred{
  color:#c62828;
  font-weight:700;
  font-size:15px;
  margin-top:10px;
}

/* 버튼 그리드 - paper 밖 아래 */
.mopts{
  width:100%;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px 14px;
}

.mbtn{
  background:rgba(240,235,225,0.92);
  border:1px solid rgba(200,180,140,0.6);
  border-radius:8px;
  padding:16px 12px;
  font-size:18px;
  font-weight:700;
  color:#2c1a0e;
  cursor:pointer;
  transition:background 0.15s, transform 0.1s;
  backdrop-filter:blur(4px);
}

.mbtn:active{transform:scale(0.97)}
.mbtn.sel{background:rgba(201,168,76,0.85);border-color:#8a6020;color:#fff}
.mbtn.wrong{background:rgba(198,40,40,0.85);border-color:#7a0000;color:#fff}

/* 사병 입력 - paper 밖 아래 */
.mini-input-row{
  display:flex;
  gap:10px;
  justify-content:center;
  align-items:center;
  width:80%;
}

.minp{
  background:rgba(255,255,255,0.92);
  border:1px solid #c8b48a;
  border-radius:8px;
  padding:12px 14px;
  font-size:15px;
  color:#2c1a0e;
  outline:none;
  text-align:center;
  flex:1;
}

.minp:focus{border-color:#a07030}

.msub{
  background:#3d2510;
  color:#fff;
  border:none;
  border-radius:8px;
  padding:12px 20px;
  font-size:14px;
  cursor:pointer;
  flex-shrink:0;
}

/* 결과 화면 수정 */
.mini-result{
position:fixed;
  width:100vw;
  height:100vh;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  background:#1a1208;
}
.mini-result-bg{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  width:100%;
  height:100%;
  object-fit:cover;
  z-index:0;
}

.mini-result-btn{
  position:absolute;
  bottom:clamp(16px, 4vh, 40px);
  right:clamp(16px, 4vw, 48px);
  z-index:2;
  background:rgba(110,90,40,0.88);
  color:#e8c97a;
  border:1px solid #c9a84c;
  border-radius:4px;
  padding:clamp(8px,1.5vh,14px) clamp(14px,2.5vw,32px);
  font-size:clamp(12px,1.5vw,16px);
  cursor:pointer;
  letter-spacing:0.04em;
}

@media(max-width:767px){
  .mini-inner{ width:92vw; gap:12px; }
  .mboard-paper{ padding:40px 28px 36px; }
  .mtitle{ font-size:20px; margin-bottom:12px; }
  .mdesc{ font-size:12px; }
  .mbtn{ padding:13px 8px; font-size:15px; }
  .mini-result-card{ width:90%; padding:28px 22px; }
  .mini-result-title{ font-size:20px; }
  .mini-result-desc{ font-size:12px; }
}
  /* ── 엔딩 ── */
  .ending{width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--gray);padding:32px 18px;overflow-y:auto;gap:16px}
  .etitle{font-size:26px;font-weight:700;color:var(--ink);letter-spacing:0.08em;text-align:center}
  .eimg-wrap{width:180px;height:140px;background:#1a1208;border:2px solid #3a2a0e;border-radius:4px;display:flex;align-items:center;justify-content:center;color:rgba(201,168,76,0.4);font-size:11px;overflow:hidden}
  .eimg-wrap img{width:100%;height:100%;object-fit:cover}
  .scroll-ending{width:100%;max-width:560px}
  .scroll-ending-poles{display:flex;align-items:stretch;width:100%}
  .scroll-pole-l,.scroll-pole-r{width:28px;background:#2a1a08;border-radius:4px;flex-shrink:0;box-shadow:2px 0 6px rgba(0,0,0,0.4)}
  .scroll-pole-r{box-shadow:-2px 0 6px rgba(0,0,0,0.4)}
  .scroll-body{flex:1;background:var(--paper-light);padding:22px 20px;font-size:13px;line-height:2.1;color:var(--ink);text-align:center;white-space:pre-line;border-top:4px solid #8a6020;border-bottom:4px solid #8a6020}
`;

// ============================================================
// 백엔드 연동
// ============================================================
async function callBackend(message, sessionId) {
  const r = await fetch(`${API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId })
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    throw new Error(data?.detail || data?.error || `chat request failed: ${r.status}`);
  }

  if (data.대사) {
    let 대사 = data.대사;
    const braceIdx = 대사.indexOf('{"');
    if (braceIdx > 0) 대사 = 대사.slice(0, braceIdx).trim();
    data.대사 = 대사;
  }

  // 백엔드 BASE_URL 설정과 무관하게 현재 API 기준으로 이미지 URL을 만든다.
  if (data.이미지파일) {
    data.이미지URL = `${API}/images/${encodeURIComponent(data.이미지파일)}`;
  }

  return data;
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
  const prologueImages = [IMAGES.prologue1, IMAGES.prologue2, IMAGES.prologue3, IMAGES.prologue4];
  const currentBg = prologueImages[page];
  return (
    <div style={{width:"100vw",height:"100vh",position:"relative",overflow:"hidden",background:"#1a1208"}}>
      {/* 배경 이미지 전체화면 */}
      {currentBg && (
        <img src={currentBg} alt={`프롤로그 ${page+1}`}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}/>
      )}
      {/* 어두운 오버레이 */}
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1}}/>
      {/* 글 — 중앙 하단 */}
      <div style={{position:"absolute",left:0,right:0,bottom:"120px",zIndex:2,
        display:"flex",justifyContent:"center",padding:"0 40px"}}>
        <p style={{fontSize:16,lineHeight:2.1,color:"rgba(253,248,240,0.95)",
          textAlign:"center",maxWidth:680,textShadow:"0 2px 8px rgba(0,0,0,0.8)"}}>
          {PROLOGUE_PAGES[page]}
        </p>
      </div>
      {/* 페이지 점 */}
      <div style={{position:"absolute",left:0,right:0,bottom:"80px",zIndex:2,
        display:"flex",justifyContent:"center",gap:8}}>
        {PROLOGUE_PAGES.map((_,i)=>(
          <div key={i} style={{width:7,height:7,borderRadius:"50%",
            background:i===page?"#c9a84c":"rgba(201,168,76,0.3)",transition:"background 0.3s"}}/>
        ))}
      </div>
      {/* 이전/다음 버튼 */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:10,
        display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}>
        <button className="btn-prev" onClick={()=>setPage(p=>p-1)}
          style={{visibility:page>0?"visible":"hidden"}}>이전</button>
        {page < PROLOGUE_PAGES.length-1
          ? <button className="btn-next" onClick={()=>setPage(p=>p+1)}>다음</button>
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
    <div className="week-screen">
      {/* 배경 이미지 전체화면 */}
      {IMAGES.weekBg
        ? <img src={IMAGES.weekBg} alt="배경"
            style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}/>
        : <div style={{position:"absolute",inset:0,background:"#2b1d0f",zIndex:0}}/>
      }
      {/* 반투명 카드 — 텍스트 바로 위에 표시 */}
      <div className="week-card fade">
        <div className="week-card-title">─{info.title}─</div>
        <div className="week-card-text">{info.text}</div>
        <button className="btn-next" style={{width:"160px"}} onClick={onNext}>대화 시작하기</button>
      </div>
    </div>
  );
}

// ============================================================
// 채팅 화면 (반응형 — 모바일/PC)
// 이미지: IMAGES.heejongLow/Mid/High, IMAGES.tyrant
// ============================================================
function ChatScreen({ week, playerName, stats, onStatsChange, onDialogComplete, isBoss=false, badFaction="죽", sessionId }) {
  const info = WEEK_NARRATIVES[week];
  const maxDialog = info.cnt;
  const openLines = {1:"숙부님이... 여기까지는 웬일이십니까?",2:"...다시 오셨군요.",3:"요즘도 백성들의 이야기가 들려오는군요.",4:"내 편들의 이야기가 들리는 듯 하오.",6:"시간이 많지 않다는 것을 알고 있소.",7:"이제 얼마 남지 않았군요.",8:"거사가 코 앞이오."};
  const openLine = isBoss ? "형님이 요즘 수상한 짓을 꾸민다더군요." : (openLines[week]||"...");

  const [messages, setMessages] = useState([{role:"npc",text:openLine}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogCount, setDialogCount] = useState(0);
  const dialogCompleteRef = useRef(false);
  const [bossHp, setBossHp] = useState(20);
  const [bossDelta, setBossDelta] = useState(null);
  const [affDelta, setAffDelta] = useState(null);  // 호감도 변화 표시용
  const [recAnswers, setRecAnswers] = useState(INIT_RECS[week]||[]);
  const recLoading = false;
  const [narrOpen, setNarrOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const endRef = useRef(null);
const [currentBossImg, setCurrentBossImg] = useState(IMAGES.tyrantNormal);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

useEffect(() => {
  if (!isBoss) return;

  let cancelled = false;

  fetch(`${API}/tyrant/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId })
  })
    .then(r => r.json())
    .then(data => {
      if (!cancelled && typeof data?.심기 === "number") {
        setBossHp(data.심기);
      }
    })
    .catch(() => {});

  return () => {
    cancelled = true;
  };
}, [isBoss, sessionId]);

  const [currentCharImg, setCurrentCharImg] = useState(null); // 백엔드가 주는 이미지 URL
const charImg = isBoss
  ? (currentBossImg || IMAGES.tyrantSuspicious): getHeejongImage(stats.affection);

  const npcName = isBoss ? "태황대군" : "희종";
  const hpPct = (bossHp/30)*100;
  const currentNarration = getAffectionNarration(stats.affection);

async function handleBackendResponse(data, nc) {
  // 1) 대사 정리
  let 대사 = data.대사 || "";

  if (대사.includes('{"') || 대사.includes('"호감도변화"') || 대사.includes('"심기변화"')) {
    try {
      const parsed = JSON.parse(대사);
      대사 = parsed.대사 || 대사;
    } catch {
      const braceIdx = 대사.indexOf("{");
      if (braceIdx > 0) 대사 = 대사.slice(0, braceIdx).trim();
    }
  }

  setMessages(m => [...m, { role: "npc", text: 대사 }]);

  if (Array.isArray(data.추천답변)) {
    setRecAnswers(data.추천답변);
  }

  setDialogCount(nc);
  setLoading(false);

  // 2) 폭군 장면 처리
  if (isBoss) {
    const bossDelta = data.stats?.폭군심기변화 ?? data.심기변화 ?? 0;

    const newBossHp =
      typeof data.stats?.폭군심기 === "number"
        ? data.stats.폭군심기
        : Math.max(0, Math.min(30, bossHp + bossDelta));

    setBossHp(newBossHp);
    setBossDelta(bossDelta);

    // 백엔드가 rag.py로 골라준 폭군 이미지를 우선 사용
    setCurrentBossImg(resolveBossImageUrl(data, newBossHp));

    if (newBossHp <= 0) {
      setTimeout(() => finishBossScene("bossKill"), 1500);
      return;
    }

    if (nc >= maxDialog) {
      setTimeout(() => finishBossScene("bossSurvive"), 1500);
      return;
    }

    return;
  }

  // 3) 희종 장면 처리
  const affDelta = data.stats?.호감도변화 ?? 0;

  const newAffection =
    typeof data.stats?.호감도 === "number"
      ? data.stats.호감도
      : stats.affection + affDelta;

  setAffDelta(affDelta);
  onStatsChange({ affection: affDelta });



  if (newAffection <= -20) {
    setTimeout(() => {
      if (!dialogCompleteRef.current) {
        dialogCompleteRef.current = true;
        onDialogComplete("badAffection");
      }
    }, 1500);
    return;
  }

  if (nc >= maxDialog) {
    setTimeout(() => {
      if (!dialogCompleteRef.current) {
        dialogCompleteRef.current = true;
        onDialogComplete("complete");
      }
    }, 1500);
    return;
  }
}

  async function finishBossScene(result) {
  try {
    await fetch(`${API}/tyrant/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId })
    });
  } catch {}

  if (!dialogCompleteRef.current) {
    dialogCompleteRef.current = true;
    onDialogComplete(result);
  }
}

  async function sendMessage(text) {
    if(!text.trim()||loading) return;
    setLoading(true);
    setMessages(m=>[...m,{role:"user",text}]);
    setInput("");
    try {
      const data = await callBackend(text, sessionId);
      await handleBackendResponse(data, dialogCount+1);
    } catch { setLoading(false); }
  }

  // 추천 답변: 백엔드 호출하되 호감도 변화는 프론트에서 강제 고정
  // 백엔드 응답의 호감도변화 값은 무시하고 +3 고정 적용
  const NPC_REC_REPLIES = [
    "...그렇군요. 오랜만이오.",
    "수고가 많으십니다, 숙부님.",
    "...고맙소. 그런 말을 들으니 조금 마음이 편해지는 것 같소.",
    "흠... 그런 생각을 해주시다니.",
    "...잘 오셨소. 사실 이야기 나눌 사람이 필요했소.",
    "그리 말씀해 주시니... 감사하오.",
  ];
  const BOSS_REC_REPLIES = [
    "...그래. 그 정도면 봐주지.",
    "흠, 말이라도 그렇게 해야지.",
    "...알겠다. 물러가거라.",
  ];

  async function sendRecommended(text) {
    if(loading||recLoading) return;
    setLoading(true);
    setMessages(m=>[...m,{role:"user",text}]);

    // 백엔드 호출 시도 (대사와 추천답변 갱신 목적)
    // 단, 호감도/심기 변화는 프론트에서 고정값 사용
    try {
      const data = await callBackend(text, sessionId);
      const npcText = data.대사 || (isBoss
        ? BOSS_REC_REPLIES[Math.floor(Math.random()*BOSS_REC_REPLIES.length)]
        : NPC_REC_REPLIES[Math.floor(Math.random()*NPC_REC_REPLIES.length)]);

      setMessages(m=>[...m,{role:"npc",text:npcText}]);
      if(Array.isArray(data.추천답변)) setRecAnswers(data.추천답변);

      // 이미지 업데이트
      if(!isBoss){
        const nextAffection = typeof data.stats?.호감도 === "number"
          ? data.stats.호감도
          : stats.affection + affDelta;
        setCurrentCharImg(resolveImageUrl(data, nextAffection));
      }

      const nc = dialogCount+1;
      setDialogCount(nc);

      if(isBoss){
        // 보스: 추천 답변 → 심기 +5 고정
        const newHp = Math.min(30, bossHp+5);
        setBossHp(newHp); setBossDelta(5);
        setLoading(false);
      if (newHp <= 0) {
  setTimeout(() => finishBossScene("bossKill"), 1500);
  return;
}

if (nc >= maxDialog) {
  setTimeout(() => finishBossScene("bossSurvive"), 1500);
  return;
}      } else {
        const affDelta = data.stats?.호감도변화 ?? 0;

        setAffDelta(affDelta);
        onStatsChange({ affection: affDelta });
        setLoading(false);

        if (nc >= maxDialog) {
          setTimeout(() => {
            if (!dialogCompleteRef.current) {
              dialogCompleteRef.current = true;
              onDialogComplete("complete");
            }
          }, 1500);
          return;
        }
      }
    } catch {
      // 백엔드 오류시 기본 대사로
      const npcText = isBoss
        ? BOSS_REC_REPLIES[Math.floor(Math.random()*BOSS_REC_REPLIES.length)]
        : NPC_REC_REPLIES[Math.floor(Math.random()*NPC_REC_REPLIES.length)];
      setMessages(m=>[...m,{role:"npc",text:npcText}]);
      const nc = dialogCount+1;
      setDialogCount(nc);
      if(isBoss){
        const newHp = Math.min(30,bossHp+5);
        setBossHp(newHp); setBossDelta(5);
      } else {
        setAffDelta(0);
        onStatsChange({affection:0});
      }
      setLoading(false);
      if (nc >= maxDialog) {
  if (isBoss) {
    setTimeout(() => finishBossScene("bossSurvive"), 1500);
  } else {
    setTimeout(() => onDialogComplete("complete"), 1500);
  }
  return;
} }
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
        <div className="mob-narrtx">
          {isBoss
            ? (narrOpen ? info.text : info.text.slice(0,55)+(info.text.length>55?"...":""))
            : (narrOpen
                ? `${currentNarration.title}
${currentNarration.text}

*Tip
${currentNarration.tip}`
                : currentNarration.text.slice(0,55)+(currentNarration.text.length>55?"...":""))}
        </div>
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
         
          <div className="pcsts">
            <div className="pcst">
              <div className="pcstn">호감도</div>
              <div className="pcstv">{stats.affection}</div>
              <div style={{fontSize:10,fontWeight:700,minHeight:14,
                color:affDelta>0?"#2e7d32":affDelta<0?"#c62828":"transparent"}}>
                {affDelta!==null&&affDelta!==0?(affDelta>0?`+${affDelta}`:affDelta):""}
              </div>
            </div>
            <div className="pcst">
              <div className="pcstn">민심</div>
              <div className="pcstv">{stats.minsim}</div>
            </div>
            <div className="pcst">
              <div className="pcstn">사병</div>
              <div className="pcstv">{stats.soldiers}</div>
              <div className="pcst-sub">/1000</div>
            </div>
          </div>
          <div className="pcdcnt">{dialogCount} / {maxDialog} 대화</div>
        </div>
      )}

      {/* PC 왼쪽 패널 - 보스 채팅 (나레이션) */}
      {isBoss && (
        <div className="boss-pcl" style={{display:"none"}}>
          {IMAGES.bossLeftBg && <img src={IMAGES.bossLeftBg} alt="보스패널" className="boss-pcl-bg"/>}
         
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
          {/* ↓ 두루마리 배경 이미지 교체 위치
              IMAGES.scrollBg 에 경로 입력하면 오른쪽 패널 상단에 두루마리 이미지 표시
              예: IMAGES.scrollBg = "/assets/images/scroll_bg.png" */}
          {/* 두루마리 이미지: IMAGES.scrollBg 에 경로 입력시 표시 */}
        {IMAGES.scrollBg ? (
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "900px",
      height: "400px",
      margin: "10px auto 8px",
      flexShrink: 0,
      overflow: "hidden",
    }}
  >
    <img
      src={IMAGES.scrollBg}
      alt="두루마리"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "120%",
        objectFit: "fill",
        display: "block",
        pointerEvents: "none",
        userSelect: "none",
      }}
    />

    {/* 실제 글씨가 들어가는 종이 안쪽 영역 */}
    <div
      style={{
        position: "absolute",
        left: "25%",
        right: "25%",
        top: "25%",
        bottom: "15%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: 900,
          color: "#5a3a1a",
          marginBottom: "6px",
          textAlign: "center",
          lineHeight: 1.6,
          flexShrink: 0,
          width: "90%",
        }}
      >
        {currentNarration.title}
      </div>

      <div
        style={{
          fontSize: "15px",
          lineHeight: 1.2,
          color: "#3a2a0e",
          whiteSpace: "pre-line",
          textAlign: "center",
          width: "90%",
          marginbottom:"10px",
          overflow: "hidden",
          display: "-webkit-box",
          flex:1,
          WebkitBoxOrient: "vertical",
          wordBreak: "keep-all",
        }}
      >
        {currentNarration.text}
      </div>

      <div
        style={{
          fontSize: "14px",
          lineHeight: 1.35,
          color: "#7a5a2a",
          marginTop: "1px",
          fontStyle: "italic",
          textAlign: "center",
          width: "100%",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          wordBreak: "keep-all",
          flexShrink: 0,
        }}
      >
        *Tip: {currentNarration.tip}
      </div>
    </div>
  </div>
) : (
  <div className="pcr-scroll-fallback">
    <div className="scroll-title">📜 {currentNarration.title}</div>
    <p style={{ fontSize: 12, lineHeight: 1.9, whiteSpace: "pre-line" }}>
      {currentNarration.text}
    </p>
    <p className="tip-text">*Tip: {currentNarration.tip}</p>
  </div>
)
}
          <div className="pcr-content">
          <div className="pcrec-wrap">
            {recLoading&&<div style={{fontSize:11,color:"#8a7050",padding:"4px 0"}}> 생성 중...</div>}
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
            {charImg
              ? <img src={charImg} alt="태황대군" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
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
function MiniAlly({ onResult, badFaction="죽", sessionId }) {
  const OPTIONS=["매","난","국","죽"];
  const [selected,setSelected]=useState(null);
  const [revealed,setRevealed]=useState(false);
  const [success,setSuccess]=useState(null);
  const [showResult,setShowResult]=useState(false);

  async function choose(opt){
    setSelected(opt);setRevealed(true);
    try{
      const r=await fetch(`${API}/minigame`,{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({type:"협력세력_1차",choice:opt,session_id:sessionId})});
      const data=await r.json();
      setSuccess(data.success);
      setTimeout(()=>setShowResult(true),800);
    } catch {
      alert("서버 연결 오류. 다시 시도해주세요.");
      setRevealed(false); setSelected(null);
    }
  }

  if(showResult) return (
    <div className="mini-result">
      {success
        ? IMAGES.miniResultAllyOk && <img src={IMAGES.miniResultAllyOk} className="mini-result-bg" alt="결과"/>
        : IMAGES.miniResultAllyFail && <img src={IMAGES.miniResultAllyFail} className="mini-result-bg" alt="결과"/>
      }
      {/* <div className="mini-result-card">
        <div className="mini-result-title">{success?"성공하셨습니다":"실패하셨습니다"}</div>
        <p className="mini-result-desc">
          {success
            ? "복위에 우호적인 세력을 선택했습니다.\n\n선택하신 세력은 훗날 복위 작전에서\n당신에게 큰 힘이 되어줄 것입니다."
            : "반(反)희종 세력을 선택하고 말았습니다.\n\n이들은 태황대군에게 당신의 계획을 고하고\n당신에게 사약을 내렸습니다."
          }
        </p>
      </div> */}
      <button className="mini-result-btn" onClick={()=>onResult(success?"allyOk":"evil")}>
        {success?"채팅 계속하기":"결과 확인"}
      </button>
    </div>
  );
return (
  <div className="mini">
    {IMAGES.miniBgAlly && <img src={IMAGES.miniBgAlly} className="mini-bg" alt="배경"/>}
    <div className="mini-inner">
      <div className="mboard">
        <div className="mboard-paper">
          {IMAGES.paper && <img src={IMAGES.paper} className="mboard-paper-img" alt="한지"/>}
          <div className="mboard-content">
            <div className="mtitle">협력 세력 고르기</div>
            <p className="mdesc">복위를 위해 협력 세력을 모을 차례입니다.<br/>다음 네 세력 중 한 세력을 제외하고 모두 복위에 우호적입니다.<br/>반(反)희종 세력을 피해 포섭할 하나의 협력 세력을 선택하세요.</p>
          </div>
        </div>
      </div>
      <div className="mopts">
        {OPTIONS.map(opt=>(
          <button key={opt}
            className={`mbtn${revealed&&opt===selected?(success===null?"":(success?" sel":" wrong")):""}` }
            onClick={()=>!revealed&&choose(opt)} disabled={revealed}>
            '{opt}' 세력
          </button>
        ))}
      </div>
    </div>
  </div>
);
}
function MiniLetter({ onResult, sessionId }) {
  const OPTIONS=["A","B","C","D"];
  const [selected,setSelected]=useState(null);
  const [revealed,setRevealed]=useState(false);
  const [success,setSuccess]=useState(null);
  const [showResult,setShowResult]=useState(false);

  async function choose(opt){
    setSelected(opt);setRevealed(true);
    try{
      const r=await fetch(`${API}/minigame`,{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({type:"비밀서신",choice:opt,session_id:sessionId})});
      const data=await r.json();
      setSuccess(data.success);
      setTimeout(()=>setShowResult(true),800);
    } catch {
      alert("서버 연결 오류. 다시 시도해주세요.");
      setRevealed(false); setSelected(null);
    }
  }

  if(showResult) return (
    <div className="mini-result">
      {success
        ? IMAGES.miniResultLetterOk && <img src={IMAGES.miniResultLetterOk} className="mini-result-bg" alt="결과"/>
        : IMAGES.miniResultLetterFail && <img src={IMAGES.miniResultLetterFail} className="mini-result-bg" alt="결과"/>
      }
      {/* <div className="mini-result-card">
        <div className="mini-result-title">{success?"성공하셨습니다":"실패하셨습니다"}</div>
        <p className="mini-result-desc">
          {success
            ? "서신을 안전하게 전달했습니다.\n\n협력 세력은 복위 작전을 위해\n준비를 시작할 것입니다."
            : "심복이 매복한 길을 선택하고 말았습니다.\n\n서신이 태황대군에게 전달되었고\n당신과 희종에게 사약이 내려졌습니다."
          }
        </p>
      </div> */}
      <button className="mini-result-btn" onClick={()=>onResult(success?"letterOk":"userDeath")}>
        {success?"채팅 계속하기":"결과 확인"}
      </button>
    </div>
  );

return (
  <div className="mini">
    {IMAGES.miniBgLetter && <img src={IMAGES.miniBgLetter} className="mini-bg" alt="배경"/>}
    <div className="mini-inner">
      <div className="mboard">
        <div className="mboard-paper">
          {IMAGES.paper && <img src={IMAGES.paper} className="mboard-paper-img" alt="한지"/>}
          <div className="mboard-content">
            <div className="mtitle">비밀 서신 전달하기</div>
            <p className="mdesc">{"희종의 복위 작전이 담긴 서신을 협력세력에게 전달해야 합니다.\n네 개의 길 중 한 개의 길에는 태황대군의 심복이 매복 중입니다.\n태황대군에게 발각되지 않을 길을 선택하여 서신을 전달해 주세요."}</p>
          </div>
        </div>
      </div>
      <div className="mopts">
        {OPTIONS.map(opt=>(
          <button key={opt}
            className={`mbtn${revealed&&opt===selected?(success===null?"":(success?" sel":" wrong")):""}`}
            onClick={()=>!revealed&&choose(opt)} disabled={revealed}>
            {opt}
          </button>
        ))}
      </div>
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
  return{...base};
}

function MiniSoldier({ week, currentSoldiers, onResult, sessionId }) {
  const [input,setInput]=useState("");
  const [error,setError]=useState("");
  const [cfg]=useState(()=>getSoldierConfig(week));
  const needed=Math.max(0,1000-currentSoldiers);
  const [showResult,setShowResult]=useState(false);
  const [resultSuccess,setResultSuccess]=useState(false);
  const [resultCount,setResultCount]=useState(0);

  async function submit(){
    const n=parseInt(input);
    if(isNaN(n)||n<cfg.min||n>cfg.max){setError(`${cfg.min}~${cfg.max} 사이 숫자를 입력해주세요.`);return;}
    const roundKey=week<=3?"사병키우기_1차":week<=6?"사병키우기_2차":"사병키우기_3차";
    try{
      const r=await fetch(`${API}/minigame`,{method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({type:roundKey,choice:String(n),session_id:sessionId})});
      const data=await r.json();
      if(data.success){ setResultSuccess(true); setResultCount(n); setShowResult(true); }
      else { setResultSuccess(false); setShowResult(true); }
    } catch {
      alert("서버 연결 오류. 다시 시도해주세요.");
    }
  }

  if(showResult) return (
    <div className="mini-result">
      {resultSuccess
        ? IMAGES.miniResultSoldierOk && <img src={IMAGES.miniResultSoldierOk} className="mini-result-bg" alt="결과"/>
        : IMAGES.miniResultSoldierFail && <img src={IMAGES.miniResultSoldierFail} className="mini-result-bg" alt="결과"/>
      }
      {/* <div className="mini-result-card">
        <div className="mini-result-title">{resultSuccess?"성공하셨습니다":"발각되었습니다"}</div>
        <p className="mini-result-desc">
          {resultSuccess
            ? `${resultCount}명의 사병을 성공적으로 모집했습니다.\n\n이들은 훗날 복위 작전의 중요한 전력이\n될 것입니다.`
            : "무리한 규모의 모집으로 태황대군의 단속에\n사병 모집이 적발되었습니다."
          }
        </p>
      </div> */}
      <button className="mini-result-btn" onClick={()=>resultSuccess?onResult("soldierOk",resultCount):onResult("soldierCaught")}>
        {resultSuccess?"채팅 계속하기":"결과 확인"}
      </button>
    </div>
  );

return (
  <div className="mini">
    {IMAGES.miniBgSoldier && <img src={IMAGES.miniBgSoldier} className="mini-bg" alt="배경"/>}
    <div className="mini-inner">
      <div className="mboard">
        <div className="mboard-paper">
          {IMAGES.paper && <img src={IMAGES.paper} className="mboard-paper-img" alt="한지"/>}
          <div className="mboard-content">
            <div className="mtitle">사병 키우기</div>
            <p className="mdesc">복위를 위한 필수 단계인 사병 모으기입니다.<br/>태황대군의 단속을 피해 세 차례에 걸쳐 최소 <b>1,000명</b>의 사병을 모아야 합니다.<br/>이번에는 몇 명의 사병을 모집할까요?</p>
            <p className="mred">*지금은 사병 단속이 <b>{cfg.label}</b> 기간입니다.</p>
            <p style={{fontSize:12,color:"#5a4a2a",marginTop:4}}>*{cfg.min}~{cfg.max} 입력 가능</p>
            <p style={{fontSize:13,color:"#5a4a2a",marginTop:16}}>
        현재 <b>{currentSoldiers}명</b> · 목표까지 <b style={{color:needed>0?"#ff6b6b":"#69f0ae"}}>{needed>0?`${needed}명 부족`:"달성!"}</b>
      </p>
          </div>
        </div>
      </div>
      {/* paper 아래 input */}
      <div className="mini-input-row">
        <input className="minp" type="number" min={cfg.min} max={cfg.max}
          placeholder={`${cfg.min}~${cfg.max}`} value={input}
          onChange={e=>{setInput(e.target.value);setError("");}}
          onKeyDown={e=>e.key==="Enter"&&submit()}/>
        <button className="msub" onClick={submit}>확인</button>
      </div>
      {error&&<p style={{fontSize:13,fontWeight:700,color:"#ff6b6b",textShadow:"0 1px 4px rgba(0,0,0,0.8)"}}>{error}</p>}
      
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
    <div style={{width:"100vw",height:"100vh",position:"relative",overflow:"hidden",background:"#1a1208"}}>
      {/* 엔딩 배경 이미지 전체화면 */}
      {endImg
        ? <img src={endImg} alt={ending.title}
            style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}/>
        : <div style={{position:"absolute",inset:0,zIndex:0,display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",gap:20,padding:32,background:"#1a1208"}}>
            <div style={{fontSize:26,fontWeight:700,color:"#c9a84c"}}>{ending.title}</div>
            <div style={{fontSize:14,lineHeight:2,color:"#fdf8f0",textAlign:"center",
              whiteSpace:"pre-line",maxWidth:500}}>{ending.text}</div>
          </div>
      }
      {/* 다시하기 버튼 — 우하단 */}
      <div style={{position:"absolute",bottom:32,right:32,zIndex:10}}>
        <button className="btn-next" onClick={onRestart}>처음부터 다시하기</button>
      </div>
    </div>
  );
}

// ============================================================
// 메인 게임 엔진
// ============================================================
export default function HeejongGame() {
  // 탭/브라우저 열 때마다 새 세션 → 재접속하면 새 게임
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));

  const [screen,setScreen]=useState("prologue");
  const [playerName,setPlayerName]=useState("");
  const [week,setWeek]=useState(1);
  const [stats,setStats]=useState({...INITIAL_STATS});
  const [endingKey,setEndingKey]=useState(null);
  const [badFaction]=useState('');  // 백엔드에서 판정

  function updateStats(delta){
    setStats(s=>({
      // 호감도 최솟값 -20 (한두 번 실수로 바로 베드엔딩 안 됨)
      // 베드엔딩은 -20 이하일 때만 발생
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
    setTimeout(()=>setScreen("week_transition"), 0);
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
        {screen==="chat"&&<ChatScreen key={week} week={week} playerName={playerName} stats={stats}
          onStatsChange={updateStats} onDialogComplete={handleDialogComplete}
          isBoss={week===5} badFaction={badFaction} sessionId={sessionId}/>}
        {screen==="mini_ally"&&<MiniAlly badFaction={badFaction} onResult={handleMiniResult} sessionId={sessionId}/>}
        {screen==="mini_letter"&&<MiniLetter onResult={handleMiniResult} sessionId={sessionId}/>}
        {screen==="mini_soldier"&&<MiniSoldier week={week} currentSoldiers={stats.soldiers} onResult={handleMiniResult} sessionId={sessionId}/>}
        {screen==="ending"&&<EndingScreen endingKey={endingKey} onRestart={()=>{fetch(`${API}/reset`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:sessionId})}).catch(()=>{});setScreen("prologue");setWeek(1);setStats({...INITIAL_STATS});setPlayerName("");setEndingKey(null);}}/>}
      </div>
    </>
  );
}


(this["webpackJsonphigh-performance-teams-game"]=this["webpackJsonphigh-performance-teams-game"]||[]).push([[0],[,,,,function(e,t,n){e.exports={roundList:"Actions_roundList__1eXTE",roundVisibleToggle:"Actions_roundVisibleToggle__1R4cj",roundActionList:"Actions_roundActionList__3KY_i",action:"Actions_action__2Me2d",disabled:"Actions_disabled__1_qfh",missingDep:"Actions_missingDep__6ylGs",actionImage:"Actions_actionImage__BHeO6",actionIcon:"Actions_actionIcon__3AhOt",actionSelected:"Actions_actionSelected__1b36j",arrow:"Actions_arrow__QUeg2",overlay:"Actions_overlay__1oAsV",overlayInner:"Actions_overlayInner__chZ-k",closeOverlay:"Actions_closeOverlay___0tEl",overlayTitle:"Actions_overlayTitle__2w_bm",requiresTitle:"Actions_requiresTitle__2wHur",requiresList:"Actions_requiresList__3Ax-b"}},function(e,t,n){e.exports={cap:"Status_cap__gr-F0",sign:"Status_sign__2-nEE",status:"Status_status__1LWe8",title:"Status_title__d3A6m",capThisRound:"Status_capThisRound__Pelkl",userStoryWarning:"Status_userStoryWarning__1BBoS",userStoryCritical:"Status_userStoryCritical__-kvV5"}},function(e,t,n){e.exports={number:"Round_number__37fTP",title:"Round_title__1HpVm",description:"Round_description__3f1zj",center:"Round_center__3U3MJ",rows:"Round_rows__1AIUt",row:"Round_row__2qnAP",userStoryIcons:"Round_userStoryIcons__mYpKQ",userStoryDescription:"Round_userStoryDescription__Sgm0s",userStoryChanceList:"Round_userStoryChanceList__2gq3g"}},,,,,,function(e,t,n){e.exports={tabs:"Tabs_tabs__33r_k",tab:"Tabs_tab__1XZ6E",tabActive:"Tabs_tabActive__s9p5d"}},,,function(e,t,n){e.exports={button:"Button_button__2Ce79",primary:"Button_primary__10Br9"}},,,function(e,t,n){e.exports={header:"Header_header__3mObx"}},function(e,t,n){e.exports={content:"Content_content__mFJ5h"}},,,,,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(1),a=n.n(i),c=n(16),s=n.n(c),o=(n(27),n(2)),l=n(3),u=Symbol("EFFECT_HIDDEN");function d(e){return null!==e}function m(e){return e.title!==u}function h(e){return Object.getOwnPropertyNames(e).includes("capacity")}function p(e){return Object.getOwnPropertyNames(e).includes("userStoryChance")}var b,j,f="data:image/jpeg;base64,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",O={1:{title:"Team, welcome to the World\u2019s Smallest Online Bookstore",description:Object(r.jsx)("p",{children:"We hired you because you\u2019re the best individuals in your respective areas. Please remember that we\u2019re Vulture Capital funded and we have only a few months runway, so you must deliver. This first Sprint, the company really needs you to prove that you can deliver a working \u2026"}),effect:function(){return{capacity:10,title:u}},actions:{ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION:{image:"https://placekitten.com/100/100",name:"Protected from Outside Distraction",description:Object(r.jsx)("p",{children:"ScrumMaster protects the team from outside distraction. Example: A manager asking a team member to do them a small favour as it will only take an hour."}),cost:1,effect:function(){return{userStoryChance:10}}},ACTION_REMOTE_TEAM_AVATARS:{icon:"\ud83d\udc4b",name:"Remote Team Avatars",description:Object(r.jsx)("p",{children:"Remote Teams suffer from the start, in that team members don't get know about their colleagues easily. To counter this run a short get to know you session. Get team members to share things like - working hours, city they live in, timezone, contact info. If people are open share some personal details such as hobbies, family status, favorite food and beverage. Some teams even create a wiki or site to share this information"}),cost:1,effect:function(){return{capacity:1}}},ACTION_WORKING_AGREEMENTS:{image:f,type:"COMMUNICATION",name:"Working Agreements",description:Object(r.jsx)("p",{children:"Working Agreements are a simple, powerful way of creating explicit guidelines for what kind of work culture you want for your Team. They are a reminder for everyone about how they can commit to respectful behaviour and communication"}),cost:1,effect:function(){return{capacity:1,userStoryChance:10}}},ACTION_BUILD_SERVER:{image:f,type:"ENGINEERING",name:"Build Server",description:Object(r.jsx)("p",{children:"Setup Build Server and Continuous Integration. This is required to make future engineering improvements"}),cost:2},ACTION_TEAMS_ON_SAME_FLOOR:{image:f,name:"Team Members On SameFloor",type:"COMMUNICATION",description:"Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions",cost:3,effect:function(e){return e<5?{capacity:e+1,title:"".concat(this.name," active since ").concat(e+1," rounds")}:{capacity:5,title:"".concat(this.name," active since 5 or more rounds")}}}}},2:{title:"Failed Expectations",description:Object(r.jsx)("p",{children:"Your team didn't met our expectations that you would complete 10 User Stories in the last round. Our vulture capitalists are becoming concerned and ask if you can really deliver?"}),actions:{ACTION_ELIMINATE_LONG_LIVED_FEATURE_BRANCHES:{image:f,type:"ENGINEERING",name:"All Work is done on Main or Trunk",description:Object(r.jsx)("p",{children:"When teams use Feature Branches \u2013 then they\u2019re not really using Continuous integration. Feature branching optimizes for the individual while harming the Team"}),cost:2,effect:function(){return{capacity:1}}},ACTION_UNIT_TESTING:{icon:"\ud83c\udfd7",type:"ENGINEERING",name:"Unit Testing",available:{requires:"ACTION_BUILD_SERVER"},description:Object(r.jsx)("p",{children:"TODO: SOME DESCRIPTION"}),cost:2,effect:function(){return{capacity:2}}},ACTION_SOCIAL_TIME:{image:f,name:"Social Time",description:Object(r.jsx)("p",{children:"Setting aside some time during the working day to talk to your peers outside of the work itself."}),cost:1,effect:function(){return{capacity:1,title:"This benefits the team, as team members get to know each other not just as doers of work."}}},ACTION_FIRE_FIGHTER_AWARD:{image:f,name:"Fire Fighter Award",description:Object(r.jsx)("p",{children:"Offer a firefighter award to any team member who solves big problem"}),cost:1,effect:function(){return{capacity:-1,title:"Promoting a firefighter culture promotes individual behavior and, surprisingly, the starting of fires."}}}}},3:{title:"Work Harder",description:Object(r.jsx)("p",{children:"Things are slowly improving. You are getting better. *Please* work harder in the next Sprint."}),actions:{ACTION_OBSERVE_PEOPLE_AND_RELATIONSHIPS:{image:f,name:"Observe People + Relationships",description:Object(r.jsx)("p",{children:"ScrumMaster spends time observing people, how they interact, and the quality of their relationship."}),cost:1,effect:function(){return{capacity:1,title:"Watching the Team tells you where to put your coaching energy."}}},ACTION_ONE_ON_ONES:{image:f,name:"One on One",description:Object(r.jsx)("p",{children:"ScrumMaster meets with all team members for a regular one-on-one. Once \u2018Gremlins\u2019 start to popup, this action mitigates the worst of the effects, because you already have a deeper understanding of team member needs."}),cost:1},ACTION_PAIR_PROGRAMMING:{image:f,type:"ENGINEERING",name:"Pair Programming",description:Object(r.jsx)("p",{children:"Two team members \u2013 one computer"}),cost:2,effect:function(){return{capacity:2,title:"Team Members working in pairs have a lower defect rate, simpler code and learn from each other."}}},ACTION_TEST_DRIVEN_DEVELOPMENT:{image:f,type:"ENGINEERING",name:"Test Driven Development",available:{requires:"ACTION_BUILD_SERVER"},description:Object(r.jsx)("p",{children:"Writing Unit level Tests before writing the code"}),cost:2,effect:function(){return{capacity:2,title:"By writing the tests before the code \u2013 the Developer is forced to consider the simplest solution to their problem. Result: Less code; simpler design and fewer defects"}}}}},4:{title:"Go Live Soon",description:Object(r.jsx)("p",{children:"We must go live with an early version of the product this round, for a tradeshow. Due to your limited productivity in past rounds, management are prepared to offer some options to help you out. We will provide an extra \u20184\u2019 points of capacity for anything that helps. Another team member? Overtime?"}),effect:function(e,t){return 4===t?{capacity:4,title:"Management is paying overtime"}:null},actions:{ACTION_INFORMAL_CROSS_SKILLING:{image:f,name:"Informal Cross Skilling",description:"Informal cross-skilling for existing team members in an area the team is weak. This is often achieved through Pair Programming, Learning Time, etc (Testing anyone?)",cost:1,effect:function(){return{capacity:1}}},ACTION_FORMAL_CROSS_TRAINING:{image:f,name:"Formal Cross-Training",description:"Take an outside course to improve the skills of one existing team members in an area the team is weak. (Testing anyone?)",cost:3,effect:function(){return{capacity:2}}}}},5:{title:"We're live and we have real Customers",description:Object(r.jsx)("p",{children:"Congratulations our product is live in the market. People are using it and they're finding bugs. We will have to do deal with those bugs this Sprint."}),actions:{}}},y={3:{name:"Management yells at a team member in public",description:Object(r.jsx)("p",{children:"Management yells at a team member in public for not pulling their weight. The team member who was yelled at feels their personal status was reduced. The whole team fears they will be next.\xa0 If you have already implemented: Protection from Outside Distraction - this will eliminate the effect."}),effect:function(e,t){return t.includes("ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION")?null:{capacity:-2,title:"Management yells at a team member in public"}}},4:{name:"Emergency on other team",description:Object(r.jsx)("p",{children:"Your best tester is needed by another team for a while.\xa0 If you have already implemented: Cross Skilling and Protection from Outside Distraction, they will reduce effects."}),effect:function(e,t){if(e>=3||t.includes("ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION")&&e>=2)return null;var n=-3;return t.includes("ACTION_INFORMAL_CROSS_SKILLING")&&(n+=1),t.includes("ACTION_FORMAL_CROSS_TRAINING")&&(n+=1),{capacity:n,title:"We\u2019ve had an emergency on another team, we need your best tester for a while."}}},5:{name:"Team member isn't pulling their weight",description:Object(r.jsx)("p",{children:"One of the people on your team isn\u2019t pulling their weight - not even close. However, nothing seems to get done about it. The rest of the team is pulling together and taking this person\u2019s work on, but it\u2019s harming morale and productivity. \xa0 If you have already implemented: A ScrumMaster conducts one on ones - you will be working on the problem already; Cross Skilling - the problem person is more likely to grow because they see others and learn from them."}),effect:function(e,t){var n=-2;return(t.includes("ACTION_ONE_ON_ONES")||t.includes("ACTION_INFORMAL_CROSS_SKILLING"))&&(n=-1),{capacity:n,title:"Team member isn't pulling their weight"}}},8:{name:"Team Member consistently late or misses Daily Scrum",description:Object(r.jsx)("p",{children:"When one team member is consistently late or worse missing, they signal disrespect to their team. Other team members are annoyed that this person feels that them. \xa0 ScrumMaster conducts one on ones - you will become aware of the problem early; Working Agreements - because they empower team members to raise the issue."}),effect:function(e,t){var n=-1;return(t.includes("ACTION_ONE_ON_ONES")||t.includes("ACTION_WORKING_AGREEMENTS"))&&(n=0),{capacity:n,title:"Team Member consistently late or misses Daily Scrum"}}}},A=n(14),g={technicalDebtDrag:function(e){var t,n=0,r=Object(A.a)(e);try{for(r.s();!(t=r.n()).done;){if(t.value.selectedGameActionIds.map(D).find((function(e){return"ENGINEERING"===e.type})))break;n+=1}}catch(i){r.e(i)}finally{r.f()}return 0===n?null:{capacity:-n,title:"TechnicalDebt Drag Effect Title",description:"No Engineering improvement for ".concat(n," round").concat(n>1?"s":"")}},communicationDebtDrag:function(e){var t,n=0,r=Object(A.a)(e);try{for(r.s();!(t=r.n()).done;){if(t.value.selectedGameActionIds.map(D).find((function(e){return"COMMUNICATION"===e.type})))break;n+=1}}catch(i){r.e(i)}finally{r.f()}return 0===n?null:{capacity:-n,title:"Communication Drag Effect Title",description:"No Communication improvement for ".concat(n," round").concat(n>1?"s":"")}}};var v=null===(b=O[1])||void 0===b||null===(j=b.effect)||void 0===j?void 0:j.call(b,[],1),x=v&&h(v)?v.capacity:0;function R(){return Math.random()}var I=n(8);function N(e,t){var n=0;return e.forEach((function(e){n+=e[t]})),n}function S(e,t){var n=[];return e.forEach((function(e){n.push.apply(n,Object(I.a)(e[t]))})),n}function _(){return 1+Math.floor(6*R())}function E(e){return"number"===typeof e&&e>=1&&e<=12}function T(e){return e.map((function(e){return e.gremlinRoll})).filter(E)}function w(e){if(!(e<2))return _()+_()}Symbol("GAME_STATE");var C={currentRound:{selectedGameActionIds:[]},pastRounds:[]};function k(e){var t=e.length,n=function(e){for(var t=e.length,n=[],r=0;r<=t;r++){var i,a=O[r+1];if(a){var c=e.slice(0,r);n.push((null===(i=a.effect)||void 0===i?void 0:i.call(a,c,t+1))||null)}}return n}(e);if(!e.length)return n.filter(d);var r=S(e,"selectedGameActionIds"),i=e.reduce((function(n,i,a){var c=t-(a+1),s=T(e.slice(0,a)),o=function(e,t,n,r){return e.selectedGameActionIds.map((function(e){return V(e,t,n)})).concat(e.gremlinRoll&&!r.includes(e.gremlinRoll)?function(e,t,n){var r;return(null===(r=y[e])||void 0===r?void 0:r.effect(t,n))||null}(e.gremlinRoll,t,n):[])}(i,c,r,s);return n.concat(o)}),[]),a=Object.values(g).map((function(t){return t(e)}));return n.concat(i).concat(a).filter(d)}function G(e){return e.filter(h).reduce((function(e,t){return e+t.capacity}),0)}function B(e,t){switch(t.type){case"SELECT_GAME_ACTION":return Object(o.a)(Object(o.a)({},e),{},{currentRound:Object(o.a)(Object(o.a)({},e.currentRound),{},{selectedGameActionIds:[].concat(Object(I.a)(e.currentRound.selectedGameActionIds),[t.payload])})});case"UNSELECT_GAME_ACTION":return Object(o.a)(Object(o.a)({},e),{},{currentRound:Object(o.a)(Object(o.a)({},e.currentRound),{},{selectedGameActionIds:e.currentRound.selectedGameActionIds.filter((function(e){return e!==t.payload}))})});case"NEXT_ROUND":return Object(o.a)(Object(o.a)({},e),{},{pastRounds:[].concat(Object(I.a)(e.pastRounds),[t.payload]),currentRound:{selectedGameActionIds:[]}})}}var F=Object.entries(O).reduce((function(e,t){var n=Object(l.a)(t,2),r=n[0],i=n[1];return e.concat(Object.entries(i.actions).map((function(e){var t=Object(l.a)(e,2),n=t[0],i=t[1];return Object(o.a)(Object(o.a)({},i),{},{round:parseInt(r),id:n})})))}),[]);function D(e){return F.find((function(t){return e===t.id}))}var L=Symbol("UNIQUE");function U(e,t,n){return F.map((function(r){var i;if(e<r.round)return null;var a=function(e){var t,n=null===(t=e.available)||void 0===t?void 0:t.requires;return n?Array.isArray(n)?n:[n]:[]}(r),c=a.filter((function(e){return!t.includes(e)})),s=a.map(D).map((function(e){return Object(o.a)(Object(o.a)({},e),{},{missing:c.includes(e.id)})}));if(c.length)return{gameAction:r,status:{type:"MISSING_DEP",dependencies:s}};var l=!1===(null===(i=r.available)||void 0===i?void 0:i.unique)?n.filter((function(e){return e===r.id})).length:L;return l===L&&t.includes(r.id)?{gameAction:r,status:{type:"FINISHED",dependencies:s}}:{gameAction:r,status:n.includes(r.id)?{type:"SELECTED",times:l,dependencies:s}:{type:"AVAILABLE",times:l,dependencies:s}}})).filter((function(e){return null!==e}))}function V(e,t,n){var r,i=D(e),a=(null===(r=i.effect)||void 0===r?void 0:r.call(i,t,n))||null;if(null===a)return null;var c="".concat(i.name," active");return Object(o.a)({title:c},a)}function M(e){return Object.getOwnPropertyNames(e).includes("icon")}function W(e){return N(e.selectedGameActionIds.map((function(e){return{cost:(t=D(e),t.cost)};var t})),"cost")}function P(e){var t=k(e.pastRounds),n=G(k(e.pastRounds))-W(e.currentRound),r=S(e.pastRounds,"selectedGameActionIds"),i=e.currentRound.selectedGameActionIds.map((function(e){return V(e,0,r)})).filter(d),a=30+N(t.concat(i).filter(p),"userStoryChance");return Object(o.a)(Object(o.a)({},e.currentRound),{},{gremlinRoll:w(e.pastRounds.length+1),storiesCompleted:n<=0?0:Array.from({length:n}).filter((function(){return function(e){return 100*R()<e}(a)})).length})}function Q(){var e,t,n=Object(i.useReducer)(B,C),r=Object(l.a)(n,2),a=r[0],c=r[1],s=k(a.pastRounds),o=G(s),u=S(a.pastRounds,"selectedGameActionIds"),h=a.currentRound.selectedGameActionIds.map((function(e){return V(e,0,u)})).filter(d).filter(p),b=s.concat(h).filter(m),j=o-W(a.currentRound),f=a.pastRounds.length+1;return[{availableGameActions:U(f,S(a.pastRounds,"selectedGameActionIds"),a.currentRound.selectedGameActionIds),currentRound:{selectedGameActions:a.currentRound.selectedGameActionIds.map(D),title:null===(e=O[f])||void 0===e?void 0:e.title,description:null===(t=O[f])||void 0===t?void 0:t.description,gremlin:function(e){var t=Object(I.a)(e),n=t.pop(),r=T(t);if(n&&n.gremlinRoll&&!r.includes(n.gremlinRoll))return y[n.gremlinRoll]}(a.pastRounds),number:f,capacity:{available:j,total:o},activeEffects:b},result:{storiesCompleted:N(a.pastRounds,"storiesCompleted")},pastRounds:a.pastRounds.map((function(e,t){return{number:t+1}}))},c,function(){return P(a)}]}function H(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Results"}),Object(r.jsxs)("p",{children:["Completed ",e.storiesCompleted," user stories"]})]})}var K=n(11),q=n(7),Z=n.n(q),J=n(15),Y=n.n(J);function X(e){var t=e.primary,n=e.className,i=Object(K.a)(e,["primary","className"]);return Object(r.jsx)("button",Object(o.a)({className:Z()(n,Y.a.button,t&&Y.a.primary)},i))}var z=n(6),$=n.n(z);function ee(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(X,{onClick:e.onBack,children:"\u25c0 Back"}),Object(r.jsx)(X,{primary:!0,onClick:e.onNext,children:"Complete Round"}),e.children]})}function te(e){var t=Object(i.useState)("welcome"),n=Object(l.a)(t,2),a=n[0],c=n[1],s=Object(i.useState)(),o=Object(l.a)(s,2),u=o[0],d=o[1],m=e.currentRound.description?Object(r.jsx)("div",{className:$.a.description,children:e.currentRound.description}):null,h=e.currentRound.activeEffects.filter(p);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h4",{className:$.a.number,children:["Round ",e.currentRound.number," of ",6]}),e.currentRound.title&&Object(r.jsx)("h2",{className:$.a.title,children:e.currentRound.title}),"welcome"===a&&Object(r.jsxs)(r.Fragment,{children:[m,e.currentRound.gremlin&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h3",{children:["\u26a0\ufe0f ",e.currentRound.gremlin.name]}),e.currentRound.gremlin.description]}),Object(r.jsx)("div",{className:$.a.center,children:Object(r.jsx)(X,{primary:!0,onClick:function(){return c("actions")},children:"Start Round"})})]}),"actions"===a&&Object(r.jsxs)(ee,{onNext:function(){return c("results")},onBack:function(){return c("welcome")},children:[Object(r.jsx)("div",{ref:e.overlayRef}),Object(r.jsxs)("div",{className:$.a.rows,children:[Object(r.jsx)("div",{className:$.a.row,children:e.row1}),Object(r.jsx)("div",{className:$.a.row,children:e.row2})]})]}),"results"===a&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{children:"What is the chance that each User Story will successfully be built?"}),Object(r.jsx)("h3",{children:"Calculation"}),Object(r.jsxs)("ul",{className:$.a.userStoryChanceList,children:[Object(r.jsxs)("li",{children:["\xa0\xa0\xa0",30,"% base chance"]}),h.map((function(e){return Object(r.jsxs)("li",{children:[e.userStoryChance>0?"+":"-"," ",e.userStoryChance.toString().replace(/^-/,""),"%"," ",e.title]},e.title)})),Object(r.jsxs)("li",{children:["="," ",30+N(h,"userStoryChance"),"% chance to successful finish user-story"]}),Object(r.jsx)("li",{children:"---"}),!u&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("li",{children:["x \xa0 ",e.currentRound.capacity.available," capacity to spend on user stories"]}),Object(r.jsx)("li",{children:"\xa0"})]}),u&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("li",{children:[e.currentRound.capacity.available," user stories attempted"]}),Object(r.jsxs)("li",{children:[u.storiesCompleted," user stories completed"]})]})]}),Object(r.jsx)("ul",{className:$.a.userStoryIcons,children:Array(e.currentRound.capacity.available).fill("").map((function(e,t){return Object(r.jsx)("li",{children:u?t<u.storiesCompleted?"\u2705":"\u274c":"\u2753"},t)}))}),Object(r.jsxs)("div",{className:$.a.center,children:[Object(r.jsx)(X,{disabled:!!u,onClick:function(){d(e.closeRound())},children:"Roll for User Stories"}),Object(r.jsx)(X,{primary:!0,disabled:!u,onClick:function(){if(!u)throw new Error("Can not go to next round without closing this one");e.dispatch({type:"NEXT_ROUND",payload:u})},children:"Next Round"})]})]})]})}var ne=n(4),re=n.n(ne),ie=n(33);function ae(e){var t,n=e.referenceElement,a=e.onClose,c=Object(i.useRef)(null),s=Object(i.useState)(null),u=Object(l.a)(s,2),d=u[0],m=u[1];Object(i.useEffect)((function(){var e=function(e){d&&e.target&&(d.contains(e.target)||a())};return window.addEventListener("click",e),function(){return window.removeEventListener("click",e)}}),[d,a]),c.current=d;var h=Object(i.useState)(null),p=Object(l.a)(h,2),b=p[0],j=p[1],f=Object(ie.a)(n,d,{placement:"bottom-end",modifiers:[{name:"offset",options:{offset:[0,8]}},{name:"flip",options:{fallbackPlacements:["bottom","bottom-start","top-end","top","top-start","right"]}},{name:"preventOverflow"},{name:"arrow",options:{element:b}}]});return Object(r.jsxs)("div",Object(o.a)(Object(o.a)({"data-popper-placement":null===(t=f.state)||void 0===t?void 0:t.placement,ref:m,className:re.a.overlay,style:f.styles.popper},f.attributes),{},{children:[Object(r.jsx)("div",{ref:j,style:f.styles.arrow,className:re.a.arrow}),Object(r.jsxs)("div",{className:re.a.overlayInner,children:[Object(r.jsx)("button",{className:re.a.closeOverlay,onClick:function(){return e.onClose()},children:"\u2573"}),Object(r.jsx)("h3",{className:re.a.overlayTitle,children:e.title}),e.children]})]}))}function ce(e){var t,n=Object(i.useState)(null),a=Object(l.a)(n,2),c=a[0],s=a[1],o=Object(i.useRef)(),u=e.gameAction,d="AVAILABLE"===e.status.type&&u.cost>e.availableCapacity||["MISSING_DEP","FINISHED"].includes(e.status.type);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("button",{ref:s,onClick:function(){o.current&&clearTimeout(o.current),o.current=setTimeout((function(){return e.onOpen(!0)}),300)},onDoubleClick:function(){d||(o.current&&clearTimeout(o.current),e.onSelect("AVAILABLE"===e.status.type))},className:Z()(re.a.action,d&&re.a.disabled,"MISSING_DEP"===e.status.type&&re.a.missingDep,["SELECTED","FINISHED"].includes(e.status.type)&&re.a.actionSelected),children:[(t=u,Object.getOwnPropertyNames(t).includes("image")&&Object(r.jsx)("span",{className:re.a.actionImage,style:{backgroundImage:"url(".concat(u.image,")")}})),M(u)&&Object(r.jsx)("span",{className:re.a.actionIcon,children:u.icon}),Object(r.jsx)("span",{children:e.gameAction.name})]}),e.isOpen&&Object(r.jsxs)(ae,{referenceElement:c,title:e.gameAction.name,onClose:function(){return e.onOpen(!1)},children:[e.status.dependencies.length?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h4",{className:re.a.requiresTitle,children:"Requires"}),Object(r.jsx)("ul",{className:re.a.requiresList,children:e.status.dependencies.map((function(e){return Object(r.jsxs)("li",{children:[e.missing?"\u274c":"\u2705"," ",e.name]},e.id)}))})]}):null,e.gameAction.description,Object(r.jsxs)("p",{children:[Object(r.jsx)("b",{children:"Cost"}),": ",e.gameAction.cost]}),!d&&Object(r.jsx)(X,{primary:"AVAILABLE"===e.status.type,onClick:function(){e.onOpen(!1),e.onSelect("AVAILABLE"===e.status.type)},children:"SELECTED"===e.status.type?"Remove":"Select"}),d&&"FINISHED"===e.status.type&&Object(r.jsx)(X,{primary:!0,disabled:!0,children:"Finished"})]})]})}function se(e){var t=Object(i.useState)(e.initialVisible),n=Object(l.a)(t,2),a=n[0],c=n[1];return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("li",{children:[Object(r.jsxs)("button",{className:re.a.roundVisibleToggle,onClick:function(){return c(!a)},children:["Round ",e.round," ",a?"\u25b2":"\u25bc"]}),a&&Object(r.jsx)("ul",{className:re.a.roundActionList,children:e.actionsWithStatus.map((function(t){return Object(r.jsx)("li",{children:Object(r.jsx)(ce,Object(o.a)(Object(o.a)({},t),{},{availableCapacity:e.availableCapacity,isOpen:e.openGameActionId===t.gameAction.id,onOpen:function(n){return e.onOpen(n,t.gameAction.id)},onSelect:function(n){return e.onSelect(n,t.gameAction.id)}}))},t.gameAction.id)}))})]})})}function oe(e){var t=Object(i.useState)(),n=Object(l.a)(t,2),a=n[0],c=n[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Available Actions"}),Object(r.jsxs)("p",{children:["Select one or more actions to take this round.",Object(r.jsx)("br",{}),"Previous rounds actions are still available, click the \u25ba to open the round"]}),Object(r.jsx)("ul",{className:re.a.roundList,children:Array(e.currentRound).fill("").map((function(t,n){var i,s=e.currentRound-n;return Object(r.jsx)(se,{availableCapacity:e.availableCapacity,onOpen:function(e,t){c(e?t:void 0)},openGameActionId:a,onSelect:function(t,n){return e.dispatch(t?{type:"SELECT_GAME_ACTION",payload:n}:{type:"UNSELECT_GAME_ACTION",payload:n})},initialVisible:s===e.currentRound,round:s,actionsWithStatus:e.availableGameActions.filter((i=s,function(e){return e.gameAction.round===i}))},s)}))})]})}var le=n(5),ue=n.n(le);function de(e){var t=e.capacity.available/e.capacity.total,n=t<.5?"CRITICAL":t<.7?"WARNING":"OK";return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Capacity Breakdown"}),Object(r.jsxs)("ul",{className:ue.a.status,children:[Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{className:ue.a.cap,children:x})," Start Capacity"]}),0!==e.activeEffects.length&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("li",{className:ue.a.title,children:"Active Effects"}),e.activeEffects.filter(h).map((function(e){return Object(r.jsxs)("li",{children:[Object(r.jsxs)("span",{className:ue.a.cap,children:[Object(r.jsx)("span",{className:ue.a.sign,children:e.capacity>0?"+":"-"}),String(e.capacity).replace(/^-/,"")]}),e.title]},e.title)}))]}),Object(r.jsxs)("li",{className:ue.a.capThisRound,children:[Object(r.jsxs)("span",{className:ue.a.cap,children:[Object(r.jsx)("span",{className:ue.a.sign,children:"="})," ",e.capacity.total]})," ","Capacity available this round"]}),0!==e.selectedGameActions.length&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("li",{className:ue.a.title,children:"Selected Actions"}),e.selectedGameActions.map((function(e){return Object(r.jsxs)("li",{children:[Object(r.jsxs)("span",{className:ue.a.cap,children:[Object(r.jsx)("span",{className:ue.a.sign,children:"-"})," ",e.cost]}),e.name]},e.id)}))]}),Object(r.jsx)("li",{className:ue.a.title,children:"User Stories"}),Object(r.jsxs)("li",{className:Z()("WARNING"===n&&ue.a.userStoryWarning,"CRITICAL"===n&&ue.a.userStoryCritical),children:[Object(r.jsxs)("span",{className:ue.a.cap,children:[Object(r.jsx)("span",{className:ue.a.sign,children:"-"})," ",e.capacity.available]})," ","spent on User Stories"]}),Object(r.jsxs)("li",{className:ue.a.title,children:["WARNING"===n&&Object(r.jsx)(r.Fragment,{children:'\ud83e\uddd1\u200d\ud83d\udcbc: "feature work needs more priority"'}),"CRITICAL"===n&&Object(r.jsx)(r.Fragment,{children:'\ud83e\uddd1\u200d\ud83d\udcbc: "not enough time spent on feature work"'})]})]})]})}var me=n(18),he=n.n(me);function pe(e){return Object(r.jsxs)("div",{className:he.a.header,children:[Object(r.jsx)("h1",{children:"High-Performance Team Game "}),e.children]})}function be(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Welcome"}),Object(r.jsxs)("p",{children:["Purpose: To spark a discussion among your real team about\xa0improvements they can make. To that end the game is best played in a single web browser where everyone can see what is happening and discuss the options.",Object(r.jsx)("em",{children:"Eventually each action will link to a blog post or section of our reference library with more material."})]}),Object(r.jsx)("p",{children:"Your team is working on the World\u2019s Smallest Online Bookstore, a site that provides the best results (just a few) for every search, not every result on earth. We\u2019re a vulture capital funded company, so if we don\u2019t deliver, our funding will be cut. My goal is to help you see the effects of choices/tradeoffs on productivity and team cohesion. While some of the benefits of Agile happen at the individual level, there are many things that affect the relationships between team members, and therefore the overall cohesion and productivity of the team."}),Object(r.jsx)("h2",{children:"Rules"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"Rounds represent 6 weeks or 3 Sprints in the life of your team. This has no effect on game play, the length was selected because most improvements take a more than 2 weeks to take root."}),Object(r.jsx)("li",{children:"The game lasts 10 rounds or 30 weeks"}),Object(r.jsx)("li",{children:"Your team starts with a Capacity of 10 pontsi"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"This Capacity can be spent on User Stories"}),Object(r.jsx)("li",{children:"This Capacity can also be spent on Improvements (aka Actions). These improvements cost the team Capacity this round and may provide benefit in future rounds."})]}),Object(r.jsx)("li",{children:"Teams that fail to improve both Communications and Engineering Practice will eventually be penalized."}),Object(r.jsx)("li",{children:"If you play well your team's capacity will increase round by round"})]}),Object(r.jsx)("h2",{children:"Rounds"}),Object(r.jsx)("p",{children:"Each round consists of a series of steps:"}),Object(r.jsxs)("ol",{children:[Object(r.jsxs)("li",{children:["You get a round description. Click ",Object(r.jsx)("b",{children:"Start Round"})]}),Object(r.jsxs)("li",{children:["Select Improvements or Actions that will affect the team. Once selected the actions cost will be taken away from the teams Capacity Click. ",Object(r.jsx)("b",{children:"Complete Round"})]}),Object(r.jsxs)("li",{children:["The Game tells you how much capacity there is to spend on User Stories. Click ",Object(r.jsx)("b",{children:"Roll for User Stories"})]}),Object(r.jsxs)("li",{children:["The rolls a die for each User Story to determine how many are actually completed. Click ",Object(r.jsx)("b",{children:"Next Round"})]}),Object(r.jsx)("li",{children:'At the end of each round the game also checks to see if your team was affected by a Gremlin - example - "Manager yells at a team member"'})]}),Object(r.jsx)("p",{children:"Notice each round your Capacity increases or decreases depending on the improvements you have made and the gremlins that affect you. After round 1 the game displays the active effects of Improvements that were previously made."}),Object(r.jsx)("p",{children:"Hint play the game as often as you want. So if you want to run experiments to see what works go for it."})]})}var je=n(19),fe=n.n(je);function Oe(e){return Object(r.jsx)("div",{className:fe.a.content,children:e.children})}var ye=n(12),Ae=n.n(ye);function ge(e){return Object(r.jsx)("div",{className:Ae.a.tabs,children:e.children})}function ve(e){var t=e.active,n=e.className,i=Object(K.a)(e,["active","className"]);return Object(r.jsx)("button",Object(o.a)({className:Z()(Ae.a.tab,n,t&&Ae.a.tabActive)},i))}function xe(){var e=Q(),t=Object(l.a)(e,3),n=t[0],a=t[1],c=t[2],s=Object(i.useState)("rules"),u=Object(l.a)(s,2),d=u[0],m=u[1],h=Object(i.useRef)(null);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(pe,{children:Object(r.jsxs)(ge,{children:[Object(r.jsx)(ve,{active:"play"===d,onClick:function(){return m("play")},children:"Play"}),Object(r.jsx)(ve,{active:"rules"===d,onClick:function(){return m("rules")},children:"Rules"})]})}),Object(r.jsxs)(Oe,{children:[Object(r.jsx)("div",{style:{display:"play"===d?"block":"none"},children:n.currentRound.number>6?Object(r.jsx)(H,{storiesCompleted:n.result.storiesCompleted}):Object(r.jsx)(te,{dispatch:a,currentRound:n.currentRound,closeRound:c,overlayRef:h,row1:Object(r.jsx)(oe,{overlay:h,currentRound:n.currentRound.number,availableCapacity:n.currentRound.capacity.available,availableGameActions:n.availableGameActions,dispatch:a}),row2:Object(r.jsx)(de,Object(o.a)({},n.currentRound))},n.currentRound.number)}),"rules"===d&&Object(r.jsx)(be,{})]})]})}s.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(xe,{})}),document.getElementById("root"))}],[[28,1,2]]]);
//# sourceMappingURL=main.934fa348.chunk.js.map
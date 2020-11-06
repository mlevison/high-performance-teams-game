(this["webpackJsonphigh-performance-teams-game"]=this["webpackJsonphigh-performance-teams-game"]||[]).push([[0],{15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(2),c=n.n(i),a=n(8),o=n.n(a),s=(n(15),n(3)),u=n(1);function l(){return 1+Math.floor(6*Math.random())>=3}var d=n(4);function f(e,t){var n=0;return e.forEach((function(e){n+=e[t]})),n}function m(e,t){var n=[];return e.forEach((function(e){n.push.apply(n,Object(d.a)(e[t]))})),n}function p(e){return function(t){return t>=e}}function O(){return function(e,t,n,r){return![].concat(Object(d.a)(t),Object(d.a)(n)).includes(r)}}function h(e){return function(){for(var t=0;t<e.length;t++){var n=e[t];if(!n.apply(void 0,arguments))return!1}return!0}}function b(){return null}var j,v={PROTECTED_FROM_OUTSIDE_DISTRACTION:{name:"Protected from Outside Distraction",available:O(),description:"ScrumMaster protects the team from outside distraction",cost:1,effect:b},WORKING_AGREEMENTS:{name:"Working Agreements",available:O(),description:"Create Team Working Agreements",cost:1,effect:function(){return{capacity:1,title:"TODO: Working Agreements active"}}},ELIMINATE_LONG_LIVED_FEATURE_BRANCHES:{type:"ENGINEERING",name:"All Work is done on Main or Trunk",available:O(),description:"When teams use Feature Branches \u2013 then they\u2019re not really using Continuous integration. Feature branching optimizes for the individual while harming the Team",cost:2,effect:function(){return{capacity:1,title:"TODO: All Work is done on Main or Trunk active"}}},GAME_ACTION_BUILD_SERVER:{type:"ENGINEERING",name:"Build Server",available:O(),description:"Setup Build Server and Continuous Integration. This is required to make future engineering improvements",cost:2,effect:b},GAME_ACTION_TEAMS_ON_SAME_FLOOR:{name:"Team Members On SameFloor",available:O(),description:"Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions",cost:3,effect:function(e){return e<5?{capacity:e+1,title:"TODO: Team on same floor since ".concat(e+1," rounds")}:{capacity:5,title:"TODO: Team on same floor since 5 or more rounds"}}},GAME_ACTION_UNIT_TESTING:{type:"ENGINEERING",name:"Unit Testing",available:h([O(),p(2),(j="GAME_ACTION_BUILD_SERVER",function(e,t){return t.includes(j)})]),description:"TODO: SOME DESCRIPTION",cost:2,effect:function(){return{capacity:2,title:"TODO: Unit Testing active"}}},GAME_ACTION_INFORMAL_CROSS_TRAINING:{name:"Informal Cross Training",available:h([O(),p(3)]),description:"Informal cross-training for existing team members in an area the team is weak. (Testing anyone?)",cost:1,effect:function(){return{capacity:1,title:"TODO: Informal Cross Training active"}}},GAME_ACTION_FORMAL_CROSS_TRAINING:{name:"Formal Cross-Training",available:h([O(),p(3)]),description:"Formal cross-training for existing team members in an area the team is weak. (Testing anyone?)",cost:3,effect:function(){return{capacity:3,title:"TODO: Informal Cross Training active"}}}},R=Object.entries(v).map((function(e){var t=Object(s.a)(e,2),n=t[0],r=t[1];return Object(u.a)(Object(u.a)({},r),{},{id:n})}));function E(e){return R.find((function(t){return e===t.id}))}var T={EMERGENCY_ON_ANOTHER_TEAM:{occurs:function(){return Math.random()<=.1},effect:function(e,t){if(e>=3||t.includes("PROTECTED_FROM_OUTSIDE_DISTRACTION")&&e>=2)return null;var n=-3;return t.includes("GAME_ACTION_INFORMAL_CROSS_TRAINING")&&(n+=1),t.includes("GAME_ACTION_FORMAL_CROSS_TRAINING")&&(n+=1),{capacity:n,title:"We\u2019ve had an emergency on another team, we need your best tester for a while."}}}},g=Object.entries(T).map((function(e){var t=Object(s.a)(e,2),n=t[0],r=t[1];return Object(u.a)(Object(u.a)({},r),{},{id:n})}));function I(e){var t;if(!(e.currentRound.number<2))return null===(t=g.filter((function(e){return e.occurs()})).sort((function(){return Math.random()-.5}))[0])||void 0===t?void 0:t.id}function y(e,t,n){return e.selectedGameActionIds.map((function(e){return function(e,t,n){return E(e).effect(t,n)}(e,t,n)})).concat(function(e,t,n){return e?T[e].effect(t,n):null}(e.gremlin,t,n))}function A(e){return f(e.selectedGameActionIds.map((function(e){return{cost:(t=E(e),t.cost)};var t})),"cost")}var N=Symbol("EFFECT_HIDDEN"),_=n(9),C=[function(e){var t,n=0,r=Object(_.a)(e);try{for(r.s();!(t=r.n()).done;){if(t.value.selectedGameActionIds.map(E).find((function(e){return"ENGINEERING"===e.type})))break;n+=1}}catch(i){r.e(i)}finally{r.f()}return 0===n?null:{capacity:-n,title:"TODO: TechnicalDebt Drag Effect Title",description:"No Engineering improvement for ".concat(n," round").concat(n>1?"s":"")}}];function G(e){return null!==e}function x(e){return e.title!==N}var M={1:{description:Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Team, welcome to the World\u2019s Smallest Online Bookstore"}),Object(r.jsx)("p",{children:"We hired you because you\u2019re the best individuals in your respective areas. Please remember that we\u2019re Vulture Capital funded and we have only a few months runway, so you must deliver. This first Sprint, the company really needs you to prove that you can deliver a working \u2026"})]}),effect:function(){return{capacity:10,title:N}}},3:{description:Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"We must go live with an early version of the product this round, for CES"}),Object(r.jsx)("p",{children:"Due to your limited productivity in past rounds, management are prepared to offer some options to help you out. We will pay an extra \u20184\u2019 points for anything that helps. Another team member? Overtime?"})]}),effect:function(e){return 3===e?{capacity:4,title:"Management is paying overtime"}:null}}};var S={currentRound:{selectedGameActionIds:[]},pastRounds:[]};function D(e){var t=e.length,n=function(e){for(var t=e.length,n=[],r=0;r<=t;r++){var i,c=M[r+1];if(c){var a=e.slice(0,r);n.push((null===(i=c.effect)||void 0===i?void 0:i.call(c,t+1,a))||null)}}return n}(e);if(!e.length)return n.filter(G);var r=m(e,"selectedGameActionIds"),i=e.reduce((function(e,n,i){var c=y(n,t-(i+1),r);return e.concat(c)}),[]),c=C.map((function(t){return t(e)}));return n.concat(i).concat(c).filter(G)}function F(e){return e.reduce((function(e,t){return e+t.capacity}),0)}function k(e,t){switch(t.type){case"SELECT_GAME_ACTION":return Object(u.a)(Object(u.a)({},e),{},{currentRound:Object(u.a)(Object(u.a)({},e.currentRound),{},{selectedGameActionIds:[].concat(Object(d.a)(e.currentRound.selectedGameActionIds),[t.payload])})});case"NEXT_ROUND":var n;return Object(u.a)(Object(u.a)({},e),{},{pastRounds:[].concat(Object(d.a)(e.pastRounds),[(r=e.currentRound,i=F(D(e.pastRounds))-A(e.currentRound),c=null===(n=t.payload)||void 0===n?void 0:n.gremlin,Object(u.a)(Object(u.a)({},r),{},{gremlin:c,storiesCompleted:i<=0?0:Array(i).fill("").filter(l).length}))]),currentRound:{selectedGameActionIds:[]}})}var r,i,c}function w(){var e,t,n,r,c=Object(i.useReducer)(k,S),a=Object(s.a)(c,2),o=a[0],u=a[1],l=D(o.pastRounds),d=F(l),p=l.filter(x),O=d-A(o.currentRound),h=o.pastRounds.length+1;return[{availableGameActions:(t=h,n=m(o.pastRounds,"selectedGameActionIds"),r=o.currentRound.selectedGameActionIds,R.filter((function(e){return e.available(t,n,r,e.id)}))),currentRound:{description:null===(e=M[h])||void 0===e?void 0:e.description,number:h,capacity:{available:O,total:d},activeEffects:p},result:{storiesCompleted:f(o.pastRounds,"storiesCompleted")},pastRounds:o.pastRounds.map((function(e,t){return{number:t+1}}))},u]}function L(){var e=w(),t=Object(s.a)(e,2),n=t[0],i=t[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h1",{children:"High-Performance Team Game "}),n.currentRound.number>6?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Results"}),Object(r.jsxs)("p",{children:["Completed ",n.result.storiesCompleted," user stories"]})]}):Object(r.jsxs)(r.Fragment,{children:[0!==n.pastRounds.length&&Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("h2",{children:["Round: ",n.pastRounds.slice(-1)[0].number," results"]})}),Object(r.jsxs)("h2",{children:["Round ",n.currentRound.number," of 6"]}),n.currentRound.description,Object(r.jsxs)("p",{children:["Capacity: ",n.currentRound.capacity.available," /"," ",n.currentRound.capacity.total]}),0!==n.currentRound.activeEffects.length&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h3",{children:"Active Effects"}),n.currentRound.activeEffects.map((function(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h4",{children:e.title}),Object(r.jsxs)("p",{children:["Capacity: ",e.capacity]}),e.description&&Object(r.jsx)("p",{children:e.description})]})}))]}),Object(r.jsx)("button",{onClick:function(){return i({type:"NEXT_ROUND",payload:{gremlin:I(n)}})},children:"Complete Round"}),Object(r.jsx)("h2",{children:"Available Actions"}),n.availableGameActions.map((function(e){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:e.name}),Object(r.jsx)("p",{children:e.description}),Object(r.jsxs)("p",{children:["Cost: ",e.cost]}),Object(r.jsx)("button",{onClick:function(){return i({type:"SELECT_GAME_ACTION",payload:e.id})},children:"Commit"})]},e.id)}))]})]})}o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(L,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.7d6f4927.chunk.js.map
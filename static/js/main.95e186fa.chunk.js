(this["webpackJsonphigh-performance-teams-game"]=this["webpackJsonphigh-performance-teams-game"]||[]).push([[0],[,,,,function(e,t,n){e.exports={roundList:"Actions_roundList__1eXTE",roundVisibleToggle:"Actions_roundVisibleToggle__1R4cj",roundActionList:"Actions_roundActionList__3KY_i",action:"Actions_action__2Me2d",disabled:"Actions_disabled__1_qfh",missingDep:"Actions_missingDep__6ylGs",actionImage:"Actions_actionImage__BHeO6",actionIcon:"Actions_actionIcon__3AhOt",actionSelected:"Actions_actionSelected__1b36j",arrow:"Actions_arrow__QUeg2",overlay:"Actions_overlay__1oAsV",overlayInner:"Actions_overlayInner__chZ-k",closeOverlay:"Actions_closeOverlay___0tEl",overlayTitle:"Actions_overlayTitle__2w_bm",requiresTitle:"Actions_requiresTitle__2wHur",requiresList:"Actions_requiresList__3Ax-b"}},function(e,t,n){e.exports={cap:"Status_cap__gr-F0",sign:"Status_sign__2-nEE",status:"Status_status__1LWe8",title:"Status_title__d3A6m",capThisRound:"Status_capThisRound__Pelkl",userStoryWarning:"Status_userStoryWarning__1BBoS",userStoryCritical:"Status_userStoryCritical__-kvV5"}},function(e,t,n){e.exports={number:"Round_number__37fTP",title:"Round_title__1HpVm",description:"Round_description__3f1zj",center:"Round_center__3U3MJ",rows:"Round_rows__1AIUt",row:"Round_row__2qnAP",userStoryIcons:"Round_userStoryIcons__mYpKQ",userStoryDescription:"Round_userStoryDescription__Sgm0s"}},,,,,,function(e,t,n){e.exports={tabs:"Tabs_tabs__33r_k",tab:"Tabs_tab__1XZ6E",tabActive:"Tabs_tabActive__s9p5d"}},,function(e,t,n){e.exports={button:"Button_button__2Ce79",primary:"Button_primary__10Br9"}},,,,function(e,t,n){e.exports={header:"Header_header__3mObx"}},function(e,t,n){e.exports={content:"Content_content__mFJ5h"}},,,,,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(1),a=n.n(i),c=n(15),s=n.n(c),o=(n(27),n(2)),l=n(3),u=Symbol("EFFECT_HIDDEN"),d=n(16),m="data:image/jpeg;base64,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";function p(){return null}var h={GAME_ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION:{image:"https://placekitten.com/100/100",name:"Protected from Outside Distraction",available:{round:1},description:"ScrumMaster protects the team from outside distraction. Example: A manager asking a team member to do them a small favour as it will only take an hour.",cost:1,effect:p},GAME_ACTION_REMOTE_TEAM_AVATARS:{icon:"\ud83d\udc4b",name:"Remote Team Avatars",available:{round:1},description:"Remote Teams suffer from the start, in that team members don't get know about their colleagues easily. To counter this run a short get to know you session. Get team members to share things like - working hours, city they live in, timezone, contact info. If people are open share some personal details such as hobbies, family status, favorite food and beverage. Some teams even create a wiki or site to share this information ",cost:1,effect:function(){return{capacity:1}}},GAME_ACTION_WORKING_AGREEMENTS:{image:m,name:"Working Agreements",available:{round:1},description:"Working Agreements are a simple, powerful way of creating explicit guidelines for what kind of work culture you want for your Team. They are a reminder for everyone about how they can commit to respectful behaviour and communication",cost:1,effect:function(){return{capacity:1}}},GAME_ACTION_BUILD_SERVER:{image:m,type:"ENGINEERING",name:"Build Server",available:{round:1},description:"Setup Build Server and Continuous Integration. This is required to make future engineering improvements",cost:2,effect:p},GAME_ACTION_TEAMS_ON_SAME_FLOOR:{image:m,name:"Team Members On SameFloor",available:{round:1},description:"Getting Team Members on the same floor reduces the cost of communication as they don't have to go far to ask questions",cost:3,effect:function(e){return e<5?{capacity:e+1,title:"".concat(this.name," active since ").concat(e+1," rounds")}:{capacity:5,title:"".concat(this.name," active since 5 or more rounds")}}},GAME_ACTION_ELIMINATE_LONG_LIVED_FEATURE_BRANCHES:{image:m,type:"ENGINEERING",name:"All Work is done on Main or Trunk",available:{round:2},description:"When teams use Feature Branches \u2013 then they\u2019re not really using Continuous integration. Feature branching optimizes for the individual while harming the Team",cost:2,effect:function(){return{capacity:1}}},GAME_ACTION_UNIT_TESTING:{image:m,type:"ENGINEERING",name:"Unit Testing",available:{round:2,requires:"GAME_ACTION_BUILD_SERVER"},description:"TODO: SOME DESCRIPTION",cost:2,effect:function(){return{capacity:2}}},GAME_ACTION_SOCIAL_TIME:{image:m,name:"Social Time",available:{round:2},description:"Setting aside some time during the working day to talk to your peers outside of the work itself.",cost:1,effect:function(){return{capacity:1,title:"This benefits the team, as team members get to know each other not just as doers of work."}}},GAME_ACTION_FIRE_FIGHTER_AWARD:{image:m,name:"Fire Fighter Award",available:{round:2},description:"Offer a firefighter award to any team member who solves big problem",cost:1,effect:function(){return{capacity:-1,title:"Promoting a firefighter culture promotes individual behavior and, surprisingly, the starting of fires."}}},GAME_ACTION_OBSERVE_PEOPLE_AND_RELATIONSHIPS:{image:m,name:"Observe People + Relationships",available:{round:3},description:"ScrumMaster spends time observing people, how they interact, and the quality of their relationship.",cost:1,effect:function(){return{capacity:1,title:"Watching the Team tells you where to put your coaching energy."}}},GAME_ACTION_ONE_ON_ONES:{image:m,name:"One on One",available:{round:3},description:"ScrumMaster meets with all team members for a regular one-on-one. Once \u2018Gremlins\u2019 start to popup, this action mitigates the worst of the effects, because you already have a deeper understanding of team member needs.",cost:1,effect:p},GAME_ACTION_PAIR_PROGRAMMING:{image:m,type:"ENGINEERING",name:"Pair Programming",available:{round:3},description:"Two team members \u2013 one computer",cost:2,effect:function(){return{capacity:2,title:"Team Members working in pairs have a lower defect rate, simpler code and learn from each other."}}},GAME_ACTION_TEST_DRIVEN_DEVELOPMENT:{image:m,type:"ENGINEERING",name:"Test Driven Development",available:{round:3,requires:"GAME_ACTION_BUILD_SERVER"},description:"Writing Unit level Tests before writing the code",cost:2,effect:function(){return{capacity:2,title:"By writing the tests before the code \u2013 the Developer is forced to consider the simplest solution to their problem. Result: Less code; simpler design and fewer defects"}}},GAME_ACTION_INFORMAL_CROSS_TRAINING:{image:m,name:"Informal Cross Training",available:{round:4},description:"Informal cross-training for existing team members in an area the team is weak. (Testing anyone?)",cost:1,effect:function(){return{capacity:1}}},GAME_ACTION_FORMAL_CROSS_TRAINING:{image:m,name:"Formal Cross-Training",available:{round:4},description:"Formal cross-training for existing team members in an area the team is weak. (Testing anyone?)",cost:3,effect:function(){return{capacity:3}}}},b=Object.entries(h).map((function(e){var t=Object(l.a)(e,2),n=t[0],r=t[1];return Object(o.a)(Object(o.a)({},r),{},{id:n})}));function j(e){return b.find((function(t){return e===t.id}))}var f=Symbol("UNIQUE");function O(e,t,n){return b.map((function(r){if(e<r.available.round)return null;var i,a=(i=r.available.requires)?Array.isArray(i)?i:[i]:[],c=a.filter((function(e){return!t.includes(e)})),s=a.map(j).map((function(e){return Object(o.a)(Object(o.a)({},e),{},{missing:c.includes(e.id)})}));if(c.length)return{gameAction:r,status:{type:"MISSING_DEP",dependencies:s}};var l=!1===r.available.unique?n.filter((function(e){return e===r.id})).length:f;return l===f&&t.includes(r.id)?{gameAction:r,status:{type:"FINISHED",dependencies:s}}:{gameAction:r,status:n.includes(r.id)?{type:"SELECTED",times:l,dependencies:s}:{type:"AVAILABLE",times:l,dependencies:s}}})).filter((function(e){return null!==e}))}function A(e){return Object.getOwnPropertyNames(e).includes("icon")}var g=[function(e){var t,n=0,r=Object(d.a)(e);try{for(r.s();!(t=r.n()).done;){if(t.value.selectedGameActionIds.map(j).find((function(e){return"ENGINEERING"===e.type})))break;n+=1}}catch(i){r.e(i)}finally{r.f()}return 0===n?null:{capacity:-n,title:"TODO: TechnicalDebt Drag Effect Title",description:"No Engineering improvement for ".concat(n," round").concat(n>1?"s":"")}}];function y(e){return null!==e}function v(e){return e.title!==u}var R,E,_,x={1:{title:"Team, welcome to the World\u2019s Smallest Online Bookstore",description:Object(r.jsx)("p",{children:"We hired you because you\u2019re the best individuals in your respective areas. Please remember that we\u2019re Vulture Capital funded and we have only a few months runway, so you must deliver. This first Sprint, the company really needs you to prove that you can deliver a working \u2026"}),effect:function(){return{capacity:10,title:u}}},2:{title:"Failed Expectations",description:Object(r.jsx)("p",{children:"Your team didn't met our expectations that you would complete 10 User Stories in the last round. Our vulture capitalists are becoming concerned and ask if you can really deliver?"})},3:{title:"Work Harder",description:Object(r.jsx)("p",{children:"Things are slowly improving. You are getting better. *Please* work harder in the next Sprint."})},4:{title:"Go Live Soon",description:Object(r.jsx)("p",{children:"We must go live with an early version of the product this round, for a tradeshow. Due to your limited productivity in past rounds, management are prepared to offer some options to help you out. We will provide an extra \u20184\u2019 points of capacity for anything that helps. Another team member? Overtime?"}),effect:function(){return{capacity:4,title:"Management is paying overtime"}}},5:{title:"We're live and we have real Customers",description:Object(r.jsx)("p",{children:"Congratulations our product is live in the market. People are using it and they're finding bugs. We will have to do deal with those bugs this Sprint."})}};var N=(null===(R=x[1])||void 0===R||null===(E=R.effect)||void 0===E||null===(_=E.call(R,[]))||void 0===_?void 0:_.capacity)||0;function I(){return 1+Math.floor(6*Math.random())}function S(){return I()>=3}var T=n(8);function w(e,t){var n=0;return e.forEach((function(e){n+=e[t]})),n}function C(e,t){var n=[];return e.forEach((function(e){n.push.apply(n,Object(T.a)(e[t]))})),n}function G(e){return"number"===typeof e&&e>=1&&e<=12}function k(e){return e.map((function(e){return e.gremlinRoll})).filter(G)}var B={4:{name:"Emergency on other team",description:Object(r.jsx)("p",{children:"TODO description: Your best tester is needed by another team for a while. Cross training and protection from outside distraction will reduce effects"}),effect:function(e,t){if(e>=3||t.includes("GAME_ACTION_PROTECTED_FROM_OUTSIDE_DISTRACTION")&&e>=2)return null;var n=-3;return t.includes("GAME_ACTION_INFORMAL_CROSS_TRAINING")&&(n+=1),t.includes("GAME_ACTION_FORMAL_CROSS_TRAINING")&&(n+=1),{capacity:n,title:"We\u2019ve had an emergency on another team, we need your best tester for a while."}}}};function F(e){if(!(e<2))return I()+I()}Symbol("GAME_STATE");var M={currentRound:{selectedGameActionIds:[]},pastRounds:[]};function V(e){var t=e.length,n=function(e){for(var t=e.length,n=[],r=0;r<=t;r++){var i,a=x[r+1];if(a){var c=e.slice(0,r);n.push((null===(i=a.effect)||void 0===i?void 0:i.call(a,c))||null)}}return n}(e);if(!e.length)return n.filter(y);var r=C(e,"selectedGameActionIds"),i=e.reduce((function(n,i,a){var c=t-(a+1),s=k(e.slice(0,a)),l=function(e,t,n,r){return e.selectedGameActionIds.map((function(e){return function(e,t,n){var r=j(e),i=r.effect(t,n);return null===i?null:Object(o.a)({title:"".concat(r.name," active")},i)}(e,t,n)})).concat(e.gremlinRoll&&!r.includes(e.gremlinRoll)?function(e,t,n){var r;return(null===(r=B[e])||void 0===r?void 0:r.effect(t,n))||null}(e.gremlinRoll,t,n):[])}(i,c,r,s);return n.concat(l)}),[]),a=g.map((function(t){return t(e)}));return n.concat(i).concat(a).filter(y)}function D(e){return e.reduce((function(e,t){return e+t.capacity}),0)}function U(e,t){switch(t.type){case"SELECT_GAME_ACTION":return Object(o.a)(Object(o.a)({},e),{},{currentRound:Object(o.a)(Object(o.a)({},e.currentRound),{},{selectedGameActionIds:[].concat(Object(T.a)(e.currentRound.selectedGameActionIds),[t.payload])})});case"UNSELECT_GAME_ACTION":return Object(o.a)(Object(o.a)({},e),{},{currentRound:Object(o.a)(Object(o.a)({},e.currentRound),{},{selectedGameActionIds:e.currentRound.selectedGameActionIds.filter((function(e){return e!==t.payload}))})});case"NEXT_ROUND":return Object(o.a)(Object(o.a)({},e),{},{pastRounds:[].concat(Object(T.a)(e.pastRounds),[t.payload]),currentRound:{selectedGameActionIds:[]}})}}function L(e){return w(e.selectedGameActionIds.map((function(e){return{cost:(t=j(e),t.cost)};var t})),"cost")}function W(){var e,t,n=Object(i.useReducer)(U,M),r=Object(l.a)(n,2),a=r[0],c=r[1],s=V(a.pastRounds),u=D(s),d=s.filter(v),m=u-L(a.currentRound),p=a.pastRounds.length+1;return[{availableGameActions:O(p,C(a.pastRounds,"selectedGameActionIds"),a.currentRound.selectedGameActionIds),currentRound:{selectedGameActions:a.currentRound.selectedGameActionIds.map(j),title:null===(e=x[p])||void 0===e?void 0:e.title,description:null===(t=x[p])||void 0===t?void 0:t.description,gremlin:function(e){var t=Object(T.a)(e),n=t.pop(),r=k(t);if(n&&n.gremlinRoll&&!r.includes(n.gremlinRoll))return B[n.gremlinRoll]}(a.pastRounds),number:p,capacity:{available:m,total:u},activeEffects:d},result:{storiesCompleted:w(a.pastRounds,"storiesCompleted")},pastRounds:a.pastRounds.map((function(e,t){return{number:t+1}}))},c,function(){return function(e){var t=D(V(e.pastRounds))-L(e.currentRound);return Object(o.a)(Object(o.a)({},e.currentRound),{},{gremlinRoll:F(e.pastRounds.length+1),storiesCompleted:t<=0?0:Array(t).fill("").filter(S).length})}(a)}]}function Q(e){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Results"}),Object(r.jsxs)("p",{children:["Completed ",e.storiesCompleted," user stories"]})]})}var P=n(11),H=n(7),q=n.n(H),K=n(14),Z=n.n(K);function J(e){var t=e.primary,n=e.className,i=Object(P.a)(e,["primary","className"]);return Object(r.jsx)("button",Object(o.a)({className:q()(n,Z.a.button,t&&Z.a.primary)},i))}var Y=n(6),X=n.n(Y);function z(e){var t=Object(i.useState)(!1),n=Object(l.a)(t,2),a=n[0],c=n[1];return Object(r.jsxs)(r.Fragment,{children:[e.description&&a&&e.description,e.description&&Object(r.jsxs)(J,{onClick:function(){return c(!a)},children:[a?"Hide":"Show"," Description"]}),Object(r.jsx)(J,{primary:!0,onClick:e.onNext,children:"Complete Round"}),e.children]})}function $(e){var t=Object(i.useState)("welcome"),n=Object(l.a)(t,2),a=n[0],c=n[1],s=Object(i.useState)(),o=Object(l.a)(s,2),u=o[0],d=o[1],m=e.currentRound.description?Object(r.jsx)("div",{className:X.a.description,children:e.currentRound.description}):null;return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h4",{className:X.a.number,children:["Round ",e.currentRound.number," of ",6]}),e.currentRound.title&&Object(r.jsx)("h2",{className:X.a.title,children:e.currentRound.title}),"welcome"===a&&Object(r.jsxs)(r.Fragment,{children:[m,e.currentRound.gremlin&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h3",{children:["\u26a0\ufe0f ",e.currentRound.gremlin.name]}),e.currentRound.gremlin.description]}),Object(r.jsx)("div",{className:X.a.center,children:Object(r.jsx)(J,{primary:!0,onClick:function(){return c("actions")},children:"Start Round"})})]}),"actions"===a&&Object(r.jsxs)(z,{onNext:function(){return c("results")},description:m,children:[Object(r.jsx)("div",{ref:e.overlayRef}),Object(r.jsxs)("div",{className:X.a.rows,children:[Object(r.jsx)("div",{className:X.a.row,children:e.row1}),Object(r.jsx)("div",{className:X.a.row,children:e.row2})]})]}),"results"===a&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("ul",{className:X.a.userStoryIcons,children:Array(e.currentRound.capacity.available).fill("").map((function(e,t){return Object(r.jsx)("li",{children:u?t<u.storiesCompleted?"\u2705":"\u274c":"\u2753"},t)}))}),!u&&Object(r.jsxs)("p",{className:X.a.userStoryDescription,children:[e.currentRound.capacity.available," capacity to spend on user stories",Object(r.jsx)("br",{}),Object(r.jsx)("br",{})]}),u&&Object(r.jsxs)("p",{className:X.a.userStoryDescription,children:[e.currentRound.capacity.available," user stories attempted",Object(r.jsx)("br",{}),u.storiesCompleted," user stories completed"]}),Object(r.jsxs)("div",{className:X.a.center,children:[Object(r.jsx)(J,{disabled:!!u,onClick:function(){d(e.closeRound())},children:"Roll for User Stories"}),Object(r.jsx)(J,{primary:!0,disabled:!u,onClick:function(){if(!u)throw new Error("Can not go to next round without closing this one");e.dispatch({type:"NEXT_ROUND",payload:u})},children:"Next Round"})]})]})]})}var ee=n(4),te=n.n(ee),ne=n(33);function re(e){var t,n=e.referenceElement,a=e.onClose,c=Object(i.useRef)(null),s=Object(i.useState)(null),u=Object(l.a)(s,2),d=u[0],m=u[1];Object(i.useEffect)((function(){var e=function(e){d&&e.target&&(d.contains(e.target)||a())};return window.addEventListener("click",e),function(){return window.removeEventListener("click",e)}}),[d,a]),c.current=d;var p=Object(i.useState)(null),h=Object(l.a)(p,2),b=h[0],j=h[1],f=Object(ne.a)(n,d,{placement:"bottom-end",modifiers:[{name:"offset",options:{offset:[0,8]}},{name:"flip",options:{fallbackPlacements:["bottom","bottom-start","top-end","top","top-start","right"]}},{name:"preventOverflow"},{name:"arrow",options:{element:b}}]});return Object(r.jsxs)("div",Object(o.a)(Object(o.a)({"data-popper-placement":null===(t=f.state)||void 0===t?void 0:t.placement,ref:m,className:te.a.overlay,style:f.styles.popper},f.attributes),{},{children:[Object(r.jsx)("div",{ref:j,style:f.styles.arrow,className:te.a.arrow}),Object(r.jsxs)("div",{className:te.a.overlayInner,children:[Object(r.jsx)("button",{className:te.a.closeOverlay,onClick:function(){return e.onClose()},children:"\u2573"}),Object(r.jsx)("h3",{className:te.a.overlayTitle,children:e.title}),e.children]})]}))}function ie(e){var t,n=Object(i.useState)(null),a=Object(l.a)(n,2),c=a[0],s=a[1],o=Object(i.useRef)(),u=e.gameAction,d=["MISSING_DEP","FINISHED"].includes(e.status.type);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("button",{ref:s,onClick:function(){o.current&&clearTimeout(o.current),o.current=setTimeout((function(){return e.onOpen(!0)}),300)},onDoubleClick:function(){d||(o.current&&clearTimeout(o.current),e.onSelect("AVAILABLE"===e.status.type))},className:q()(te.a.action,d&&te.a.disabled,"MISSING_DEP"===e.status.type&&te.a.missingDep,["SELECTED","FINISHED"].includes(e.status.type)&&te.a.actionSelected),children:[(t=u,Object.getOwnPropertyNames(t).includes("image")&&Object(r.jsx)("span",{className:te.a.actionImage,style:{backgroundImage:"url(".concat(u.image,")")}})),A(u)&&Object(r.jsx)("span",{className:te.a.actionIcon,children:u.icon}),Object(r.jsx)("span",{children:e.gameAction.name})]}),e.isOpen&&Object(r.jsxs)(re,{referenceElement:c,title:e.gameAction.name,onClose:function(){return e.onOpen(!1)},children:[e.status.dependencies.length?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h4",{className:te.a.requiresTitle,children:"Requires"}),Object(r.jsx)("ul",{className:te.a.requiresList,children:e.status.dependencies.map((function(e){return Object(r.jsxs)("li",{children:[e.missing?"\u274c":"\u2705"," ",e.name]},e.id)}))})]}):null,Object(r.jsx)("p",{children:e.gameAction.description}),Object(r.jsxs)("p",{children:[Object(r.jsx)("b",{children:"Cost"}),": ",e.gameAction.cost]}),!d&&Object(r.jsx)(J,{primary:"AVAILABLE"===e.status.type,onClick:function(){return e.onSelect("AVAILABLE"===e.status.type)},children:"SELECTED"===e.status.type?"Remove":"Select"}),d&&"FINISHED"===e.status.type&&Object(r.jsx)(J,{primary:!0,disabled:!0,children:"Finished"})]})]})}function ae(e){var t=Object(i.useState)(e.initialVisible),n=Object(l.a)(t,2),a=n[0],c=n[1];return Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("li",{children:[Object(r.jsxs)("button",{className:te.a.roundVisibleToggle,onClick:function(){return c(!a)},children:["Round ",e.round," ",a?"\u25b2":"\u25bc"]}),a&&Object(r.jsx)("ul",{className:te.a.roundActionList,children:e.actionsWithStatus.map((function(t){return Object(r.jsx)("li",{children:Object(r.jsx)(ie,Object(o.a)(Object(o.a)({},t),{},{isOpen:e.openGameActionId===t.gameAction.id,onOpen:function(n){return e.onOpen(n,t.gameAction.id)},onSelect:function(n){return e.onSelect(n,t.gameAction.id)}}))},t.gameAction.id)}))})]})})}function ce(e){var t=Object(i.useState)(),n=Object(l.a)(t,2),a=n[0],c=n[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Available Actions"}),Object(r.jsx)("ul",{className:te.a.roundList,children:Array(e.currentRound).fill("").map((function(t,n){var i,s=e.currentRound-n;return Object(r.jsx)(ae,{onOpen:function(e,t){c(e?t:void 0)},openGameActionId:a,onSelect:function(t,n){return e.dispatch(t?{type:"SELECT_GAME_ACTION",payload:n}:{type:"UNSELECT_GAME_ACTION",payload:n})},initialVisible:s===e.currentRound,round:s,actionsWithStatus:e.availableGameActions.filter((i=s,function(e){return e.gameAction.available.round===i}))},s)}))})]})}var se=n(5),oe=n.n(se);function le(e){var t=e.capacity.available/e.capacity.total,n=t<.5?"CRITICAL":t<.7?"WARNING":"OK";return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Capacity Breakdown"}),Object(r.jsxs)("ul",{className:oe.a.status,children:[Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{className:oe.a.cap,children:N})," Start Capacity"]}),0!==e.activeEffects.length&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("li",{className:oe.a.title,children:"Active Effects"}),e.activeEffects.map((function(e){return Object(r.jsxs)("li",{children:[Object(r.jsxs)("span",{className:oe.a.cap,children:[Object(r.jsx)("span",{className:oe.a.sign,children:e.capacity>0?"+":"-"}),String(e.capacity).replace(/^-/,"")]}),e.title]},e.title)}))]}),Object(r.jsxs)("li",{className:oe.a.capThisRound,children:[Object(r.jsxs)("span",{className:oe.a.cap,children:[Object(r.jsx)("span",{className:oe.a.sign,children:"="})," ",e.capacity.total]})," ","Capacity available this round"]}),0!==e.selectedGameActions.length&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("li",{className:oe.a.title,children:"Selected Actions"}),e.selectedGameActions.map((function(e){return Object(r.jsxs)("li",{children:[Object(r.jsxs)("span",{className:oe.a.cap,children:[Object(r.jsx)("span",{className:oe.a.sign,children:"-"})," ",e.cost]}),e.name]},e.id)}))]}),Object(r.jsx)("li",{className:oe.a.title,children:"User Stories"}),Object(r.jsxs)("li",{className:q()("WARNING"===n&&oe.a.userStoryWarning,"CRITICAL"===n&&oe.a.userStoryCritical),children:[Object(r.jsxs)("span",{className:oe.a.cap,children:[Object(r.jsx)("span",{className:oe.a.sign,children:"-"})," ",e.capacity.available]})," ","spent on User Stories"]}),Object(r.jsxs)("li",{className:oe.a.title,children:["WARNING"===n&&Object(r.jsx)(r.Fragment,{children:'\ud83e\uddd1\u200d\ud83d\udcbc: "feature work needs more priority"'}),"CRITICAL"===n&&Object(r.jsx)(r.Fragment,{children:'\ud83e\uddd1\u200d\ud83d\udcbc: "not enough time spent on feature work"'})]})]})]})}var ue=n(18),de=n.n(ue);function me(e){return Object(r.jsxs)("div",{className:de.a.header,children:[Object(r.jsx)("h1",{children:"High-Performance Team Game "}),e.children]})}function pe(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("h2",{children:"Welcome"}),Object(r.jsx)("p",{children:"Your team is working on the World\u2019s Smallest Online Bookstore, a site that provides the best results (just a few) for every search, not every result on earth. We\u2019re a vulture capital funded company, so if we don\u2019t deliver, our funding will be cut. My goal is to help you see the effects of choices/tradeoffs on productivity and team cohesion. While some of the benefits of Agile happen at the individual level, there are many things that affect the relationships between team members, and therefore the overall cohesion and productivity of the team."}),Object(r.jsx)("h2",{children:"Rules"}),Object(r.jsxs)("p",{children:[Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"Rounds represent 6 weeks or 3 Sprints in the life of your team"}),Object(r.jsx)("li",{children:"The game lasts 10 rounds or 30 weeks"}),Object(r.jsx)("li",{children:"Your team starts with a Capacity of 10 pontsi"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"This Capacity can be spent on User Stories"}),Object(r.jsx)("li",{children:"This Capacity can also be spent on Improvements (aka Actions). These improvements cost the team Capacity this round and may provide benefit in future rounds."})]}),Object(r.jsx)("li",{children:"Teams that fail to improve both Communications and Engineering Practice will eventually be penalized."}),Object(r.jsx)("li",{children:"If you play well your team's capacity will increase round by round"})]}),Object(r.jsx)("h2",{children:"Rounds"}),"Each round consists of a series of steps:",Object(r.jsxs)("ol",{children:[Object(r.jsxs)("li",{children:["You get a round description. Click ",Object(r.jsx)("b",{children:"Start Round"})]}),Object(r.jsxs)("li",{children:["Select Improvements or Actions that will affect the team. Once selected the actions cost will be taken away from the teams Capacity Click. ",Object(r.jsx)("b",{children:"Complete Round"})]}),Object(r.jsxs)("li",{children:["The Game tells you how much capacity there is to spend on User Stories. Click ",Object(r.jsx)("b",{children:"Roll for User Stories"})," "]}),Object(r.jsxs)("li",{children:["The rolls a die for each User Story to determine how many are actually completed. Click ",Object(r.jsx)("b",{children:"Next Round"})]}),Object(r.jsx)("li",{children:'At the end of each round the game also checks to see if your team was affected by a Gremlin - example - "Manager yells at a team member"'})]}),"Notice each round your Capacity increases or decreases depending on the improvements you have made and the gremlins that affect you. After round 1 the game displays the active effects of Improvements that were previously made. Hint - play the game as often as you want. So if you want to run experiments to see what works - go for it."]})]})}var he=n(19),be=n.n(he);function je(e){return Object(r.jsx)("div",{className:be.a.content,children:e.children})}var fe=n(12),Oe=n.n(fe);function Ae(e){return Object(r.jsx)("div",{className:Oe.a.tabs,children:e.children})}function ge(e){var t=e.active,n=e.className,i=Object(P.a)(e,["active","className"]);return Object(r.jsx)("button",Object(o.a)({className:q()(Oe.a.tab,n,t&&Oe.a.tabActive)},i))}function ye(){var e=W(),t=Object(l.a)(e,3),n=t[0],a=t[1],c=t[2],s=Object(i.useState)("play"),u=Object(l.a)(s,2),d=u[0],m=u[1],p=Object(i.useRef)(null);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(me,{children:Object(r.jsxs)(Ae,{children:[Object(r.jsx)(ge,{active:"play"===d,onClick:function(){return m("play")},children:"Play"}),Object(r.jsx)(ge,{active:"rules"===d,onClick:function(){return m("rules")},children:"Rules"})]})}),Object(r.jsxs)(je,{children:["play"===d&&Object(r.jsx)(r.Fragment,{children:n.currentRound.number>6?Object(r.jsx)(Q,{storiesCompleted:n.result.storiesCompleted}):Object(r.jsx)($,{dispatch:a,currentRound:n.currentRound,closeRound:c,overlayRef:p,row1:Object(r.jsx)(ce,{overlay:p,currentRound:n.currentRound.number,availableGameActions:n.availableGameActions,dispatch:a}),row2:Object(r.jsx)(le,Object(o.a)({},n.currentRound))},n.currentRound.number)}),"rules"===d&&Object(r.jsx)(pe,{})]})]})}s.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(ye,{})}),document.getElementById("root"))}],[[28,1,2]]]);
//# sourceMappingURL=main.95e186fa.chunk.js.map
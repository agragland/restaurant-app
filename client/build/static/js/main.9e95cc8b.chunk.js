(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{47:function(e,t,n){},48:function(e,t,n){},69:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},92:function(e,t,n){},93:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(39),s=n.n(r),i=(n(47),n(48),n(2)),o=n.n(i),u=n(4),l=n(13),d=n(14),j=n(16),b=n(15),O=n(40),m=n.n(O).a.create({baseURL:"http://localhost:3000/api"}),h={insertItem:function(e){return m.post("/item",e)},getAllItems:function(){return m.get("/items")},insertCustomer:function(e){return m.post("/customer",e)},getItemById:function(e){return m.get("/item/".concat(e))},createOrder:function(e){return m.post("/order",e)},getAllOrders:function(){return m.get("/orders")},getOrder:function(e){return m.get("/order/".concat(e))},updateOrder:function(e,t){return m.put("/order/".concat(e),t)},deleteOrder:function(e){return m.delete("/order/".concat(e))},updateTable:function(e,t){return m.put("/table/".concat(e),t)},getTables:function(){return m.get("/tables")},getTableByNum:function(e){return m.get("/table/".concat(e))}},x=n(0),f=(c.Component,function(e){var t=e.name,n=e.category,c=e.price;return Object(x.jsx)("div",{children:Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:t}),Object(x.jsx)("p",{children:n}),Object(x.jsx)("p",{children:c})]})})}),p=(c.Component,n(20)),v=n(25),g=n(5),k=n(3),y=[{title:"Lobby",url:"#",cName:"nav-links"},{title:"Kitchen",url:"#",cName:"nav-links"},{title:"Manager",url:"#",cName:"nav-links"},{title:"Customer",url:"#",cName:"nav-links"}];n(69);function N(e){var t=e.show,n=e.children;return t?Object(x.jsx)("div",{className:"modal-background",children:Object(x.jsx)("section",{className:"modal-main",children:n})}):null}n(70);var C={status:"Available",orders:[[]],drinks:[],assistance:!1},w=[C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C];function S(){var e=Object(c.useState)(w),t=Object(k.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)("1"),s=Object(k.a)(r,2),i=s[0],l=s[1],d=Object(c.useState)({status:"Available",orders:[],drinks:[],assistance:!1}),j=Object(k.a)(d,2),b=j[0],O=j[1];Object(c.useEffect)((function(){m();var e=setInterval((function(){m()}),1e4);return function(){clearInterval(e)}}),[]);var m=function(){var e=Object(u.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(t=[],n=0;n<20;n++)t=[].concat(Object(g.a)(t),[{status:"Available",orders:[],drinks:[],assistance:!1}]);return e.next=4,h.getTables().then((function(e){var n=e.data.data;console.log(n),n.map((function(e){t[e.table_num-1].status=e.status,t[e.table_num-1].assistance=e.assistance,t[e.table_num-1].drinks=e.refills}))}));case 4:f(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getAllOrders().then((function(e){var n=e.data.data;console.log(n),n.map((function(e){var n=e.table-1;"Created"!==e.status&&"Cooking"!==e.status&&"Ready"!==e.status&&"Delivered"!==e.status||(t[n].orders=[].concat(Object(g.a)(t[n].orders),[e]))})),a(t)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.updateOrder(t._id,t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.updateTable(t.table_num,t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(e){var t=e.target;t.dataset.index&&(l((function(){return t.dataset.index})),O((function(){return n[t.dataset.index-1]})))},C=Object(c.useState)(!1),S=Object(k.a)(C,2),R=S[0],_=S[1],D=function(e){var t=e.target;y({target:t}),_((function(e){return!e}))},T=Object(c.useState)(!1),P=Object(k.a)(T,2),M=P[0],H=P[1],I=function(e){var t=e.target;y({target:t}),_((function(e){return!e})),H((function(e){return!e}))},F=function(e){var t=e.target,n=b.orders[t.dataset.orderindex],c=n.order_items[t.dataset.itemindex].price;n.commped[t.dataset.itemindex]=!0,n.subtotal-=c,n.tax-=.0825*c,n.total-=1.085*c,p(n),H((function(){return!1})),_((function(){return!0}))};function A(e){var t=e.tableNum;if(!t)return Object(x.jsx)(x.Fragment,{});var c=n[t-1];return"Order Ready"===c.status?Object(x.jsx)("div",{children:Object(x.jsx)("p",{children:"Order ready to be delivered."})}):0!==c.drinks.length?Object(x.jsxs)("div",{children:["Refill requested for:",c.drinks.map((function(e){return Object(x.jsx)("p",{children:e})}))]}):!0===c.assistance?Object(x.jsx)("div",{children:Object(x.jsx)("p",{children:"Wait staff requested."})}):null}var E="black";function L(e){if(void 0!==e){var t=e.status;E="Order Ready"===t?"pink":0!==e.drinks.length?"lightblue":!0===e.assistance?"#ffc87c":"Occupied"===t?"lightgreen":"white"}}function B(e){if(void 0!==e){var t=e.status;return"Order Ready"===t?"Order Ready":0!==e.drinks.length?"Refill":!0===e.assistance?"Assistance Requested":"Occupied"===t?"Occupied":"Available"}}return Object(x.jsxs)("div",{className:"lobby",children:[Object(x.jsx)("p",{className:"lobby-title",children:"Lobby"}),n.map((function(e,t){return Object(x.jsxs)(x.Fragment,{children:[L(e),Object(x.jsxs)("button",{className:"tableButton","data-index":t+1,onClick:D,style:{background:E},children:["Table ",t+1,Object(x.jsx)("br",{}),B(e)]})]})})),Object(x.jsxs)(N,{show:R,children:[Object(x.jsx)("button",{onClick:D,children:"X"}),Object(x.jsx)("button",{className:"orderButton",onClick:I,disabled:!b.orders[0],children:"Show Order"}),Object(x.jsxs)("p",{children:["Table ",i]}),Object(x.jsx)(A,{tableNum:i}),Object(x.jsx)("button",{onClick:function(){if("Order Ready"===b.status)b.orders.map((function(e,t){if("Ready"===e.status){0===e.subtotal?e.status="Paid":e.status="Delivered",p(e);var n=Object(g.a)(b.orders);n.splice(t,1);var c=b;c.orders=n,c.status="Occupied",O(c)}}));else if(0!==b.drinks.length){var e=b;e.drinks=[],O(e)}else if(!0===b.assistance){var t=b;t.assistance=!1,O(t)}v({table_num:i,status:"Occupied",refills:b.drinks,assistance:b.assistance}),_((function(){return!1}))},disabled:!("Order Ready"===b.status||0!==b.drinks.length||b.assistance),children:"Complete Request"})]}),Object(x.jsxs)(N,{show:M,children:[Object(x.jsx)("button",{onClick:I,children:"X"}),Object(x.jsxs)("p",{children:["Table ",i," Order"]}),b.orders.map((function(e,t){return e.order_items.map((function(n,c){return Object(x.jsxs)("p",{children:[n.name,", $",n.price,Object(x.jsx)("button",{"data-orderindex":t,"data-itemindex":c,disabled:e.commped[c],onClick:F,children:"Remove"})]})}))}))]})]})}n(71);function R(){var e=Object(c.useState)([]),t=Object(k.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)([]),s=Object(k.a)(r,2),i=s[0],l=s[1],d=Object(c.useState)([[]]),j=Object(k.a)(d,2),b=j[0],O=j[1];Object(c.useEffect)((function(){m();var e=setInterval((function(){m()}),1e4);return function(){clearInterval(e)}}),[]);var m=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getAllOrders().then((function(e){var t=e.data.data;console.log(t);var n=[],c=[],r=[],s=[];t.map((function(e){"Created"===e.status?c=[].concat(Object(g.a)(c),[e]):"Cooking"===e.status&&(n=[].concat(Object(g.a)(n),[e]),e.order_items.map((function(){r=[].concat(Object(g.a)(r),["working"])})),s=[].concat(Object(g.a)(s),[r]),r=[])})),l(n),a(c),O(s)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.updateOrder(t._id,t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.updateTable(t,{table_num:t,status:"Order Ready",refills:[],assistance:!1});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(e){var t=e.target.value;n[t].status="Cooking",l((function(e){return e.concat(n[t])})),f(n[t]);var c=Object(g.a)(n);c.splice(t,1),a((function(){return c}))},y=function(e){var t=e.target.value;i[t].status="Ready",f(i[t]),p(i[t].table);var n=Object(g.a)(i);n.splice(t,1),l((function(){return n}));var c=Object(g.a)(b);c.splice(t,1),O((function(){return c}))},N=function(e){var t=new Date(e),n=t.getHours(),c=t.getMinutes(),a=t.getSeconds();return(n<10?"0":"")+n+":"+(c<10?"0":"")+c+":"+(a<10?"0":"")+a};return Object(x.jsxs)("div",{className:"kitchen",children:[Object(x.jsx)("p",{className:"kitchen-title",children:"Kitchen"}),Object(x.jsxs)("section",{className:"order-queue",children:[Object(x.jsx)("h1",{className:"queue-title",children:"Queue"}),n.map((function(e,t){return Object(x.jsx)("p",{children:Object(x.jsxs)("button",{value:t,className:"queue-button",onClick:v,children:["Table ",e.table,Object(x.jsx)("br",{}),N(e.createdAt)]})})}))]}),Object(x.jsxs)("section",{className:"active-orders",children:[Object(x.jsx)("h1",{children:"Active"}),i.map((function(e,t){return Object(x.jsxs)("section",{className:"order",children:[Object(x.jsxs)("h3",{className:"order-table",children:["Table ",e.table]}),e.order_items.map((function(e,n){return Object(x.jsxs)("div",{className:"item",children:[Object(x.jsxs)("p",{className:"item-name",children:["\u2003\xa0",e.name]}),Object(x.jsxs)("p",{className:"item-comments",children:["\u2003\u2003-",i[t].comments[n]]}),Object(x.jsx)("br",{})]})})),Object(x.jsx)("br",{}),Object(x.jsx)("p",{className:"order-time",children:N(e.createdAt)}),Object(x.jsx)("button",{value:t,className:"ready-button",onClick:y,children:"Ready"})]})}))]})]})}var _=n(8),D=n(6),T=n(41),P=n.n(T);n(36),n(37),n(78);function M(){return Object(x.jsx)("div",{className:"Time",children:Object(x.jsxs)("h3",{children:["Current Time:"," ",Object(x.jsx)(P.a,{className:"clock-display",format:"HH:mm:ss",ticking:!0})]})})}n(79);function H(){return Object(x.jsxs)("div",{className:"ChangeLog",children:[Object(x.jsx)("h1",{children:"Change Log"}),Object(x.jsx)("div",{className:"logDisplay"})]})}n(80),n(82);function I(){var e=Object(c.useState)("0"),t=Object(k.a)(e,2),n=(t[0],t[1],Object(c.useState)("0")),a=Object(k.a)(n,2);a[0],a[1];return Object(x.jsxs)("div",{className:"ConsumerSettings",children:[Object(x.jsx)("h1",{children:"Consumer Settings"}),Object(x.jsx)("p",{children:"Adjust the time orders will be accepted"}),Object(x.jsx)("div",{})]})}n(83);var F={menu_id:0,price:0,amountPurchased:0,itemProfit:0},A=[];function E(){var e=Object(c.useState)(A),t=Object(k.a)(e,2),n=t[0],a=(t[1],Object(c.useState)({dict:F})),r=Object(k.a)(a,2),s=(r[0],r[1],Object(c.useState)(0)),i=Object(k.a)(s,2),o=(i[0],i[1],Object(c.useState)(0)),u=Object(k.a)(o,2),l=(u[0],u[1],0);function d(e){if(void 0!==e){var t=e.dict.price*e.dict.amountPurchased;l+=t}}new Date;return Object(x.jsxs)("div",{className:"DSR",children:[Object(x.jsx)("h1",{children:"DSR"}),Object(x.jsxs)("div",{className:"DSR-visual",children:[Object(x.jsx)("h3",{className:"header",children:"Item\u2003\u2003\u2003|\u2003\u2002Qty\u2002\u2003|\u2003\u2002Price\u2002\u2003|\u2003\u2003Total Profit\u2002"}),Object(x.jsx)("div",{className:"body",children:n.map((function(e,t){return Object(x.jsx)(x.Fragment,{children:d(e)})}))})]}),Object(x.jsxs)("div",{className:"DSR-date",children:[Object(x.jsxs)("p",{children:["Date:",Object(x.jsx)("br",{}),Object(x.jsx)("p",{className:"block",children:"TIME"})]}),Object(x.jsxs)("p",{children:["Number of Items Ordered:",Object(x.jsx)("br",{}),Object(x.jsx)("p",{className:"block"})]}),Object(x.jsxs)("p",{children:["Total Profit:",Object(x.jsx)("br",{}),Object(x.jsxs)("p",{className:"block",children:["$",l]})]})]})]})}function L(){return Object(x.jsx)("div",{children:Object(x.jsx)(S,{style:{transform:"scale(0.5, 0.5)"}})})}n(84);function B(){return Object(x.jsx)("nav",{className:"MgrNavbarTabs",children:Object(x.jsxs)("ul",{className:"mgr-nav-tab",children:[Object(x.jsx)("li",{class:"mgr-nav-link",children:Object(x.jsx)(_.b,{className:"mgr-tab-text",to:"/ConsumerSettings",children:"Consumer Settings"})}),Object(x.jsx)("li",{class:"mgr-nav-link",children:Object(x.jsx)(_.b,{className:"mgr-tab-text",to:"/DailySalesReport",children:"DSR"})}),Object(x.jsx)("li",{class:"mgr-nav-link",children:Object(x.jsx)(_.b,{className:"mgr-tab-text",to:"/ChangeLog",children:"Change Log"})}),Object(x.jsx)("li",{class:"mgr-nav-link",children:Object(x.jsx)(_.b,{className:"mgr-tab-text",to:"/LobbyView",children:"Lobby View"})})]})})}n(88);function X(){return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("div",{className:"manager",children:Object(x.jsxs)(_.a,{children:[Object(x.jsx)(M,{}),Object(x.jsx)("div",{className:"manager-title",children:"Manager"}),Object(x.jsxs)("div",{className:"manager-body",children:[Object(x.jsx)(B,{}),Object(x.jsx)(D.a,{exact:!0,path:"/ConsumerSettings",component:I}),Object(x.jsx)(D.a,{exact:!0,path:"/DailySalesReport",component:E}),Object(x.jsx)(D.a,{exact:!0,path:"/ChangeLog",component:H}),Object(x.jsx)(D.a,{exact:!0,path:"/LobbyView",component:L})]})]})})})}n(89);var q={order_id:"",paymentReady:!1},W=function(e){var t=e.item;return e.comp?Object(x.jsx)("div",{children:Object(x.jsxs)("p",{children:[t.name," 0.00"]})}):Object(x.jsx)("div",{children:Object(x.jsxs)("p",{children:[t.name," ",t.price]})})},K=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var c;return Object(l.a)(this,n),(c=t.call(this,e)).componentDidMount=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getOrder(q.order_id).then((function(e){"Delivered"===e.data.data.status&&c.setState({order:e.data.data,paymentReady:!0,modal_2:0})})).catch((function(e){c.setState({paymentReady:!1,modal_2:0})}));case 2:console.log(c.state);case 3:case"end":return e.stop()}}),e)}))),c.cardModal=function(){return 0===c.state.modal_2?Object(x.jsxs)(N,{show:c.state.cardModal,children:[Object(x.jsx)("button",{onClick:c.cardPaymentHandler,children:"X"}),Object(x.jsx)("p",{children:"Please insert Card"}),Object(x.jsx)("button",{onClick:function(){c.tipModalHandler(1)},children:"Insert Card"})]}):1===c.state.modal_2?Object(x.jsxs)(N,{show:c.state.cardModal,children:[Object(x.jsx)("button",{onClick:c.cardPaymentHandler,children:"X"}),Object(x.jsx)("h1",{children:"Select your tip"}),Object(x.jsx)("button",{onClick:function(){c.tipHandler(.1)},children:"10% tip"}),Object(x.jsx)("button",{onClick:function(){c.tipHandler(.15)},children:"15% tip"}),Object(x.jsx)("button",{onClick:function(){c.tipHandler(.2)},children:"20% tip"}),Object(x.jsx)("input",{type:"number",onChange:c.handleCustomTipValue}),Object(x.jsx)("button",{children:"Submit Custom Tip"})]}):2===c.state.modal_2?Object(x.jsxs)(N,{show:c.state.cardModal,children:[Object(x.jsxs)("h1",{children:["You Paid $",c.state.order.total.toFixed(2)]}),Object(x.jsx)("h1",{children:"Time for a chance to win a free dessert!"}),c.freeDessertHandler()]}):void 0},c.freeDessertHandler=function(){return 0===c.state.freeDessert?Object(x.jsx)("button",{onClick:c.dessertRandomizer,children:"Click for a chance to win!"}):1===c.state.freeDessert?Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h1",{children:"Congrats! You Won!"}),Object(x.jsx)("h1",{children:"Please select a dessert from the list below!"})]}):2===c.state.freeDessert?Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h1",{children:"Sorry! You Did Not Win!"}),Object(x.jsx)("h1",{children:"Thanks for Visiting Taco Palace"}),Object(x.jsx)("button",{children:"Complete Order"})]}):void 0},c.dessertRandomizer=function(){Math.random()<=.33?c.setState({freeDessert:1}):c.setState({freeDessert:2})},c.tipHandler=function(){var e=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=c.state.order).tip=n.total*t,n.total=n.total+n.tip,n.status="Paid",c.setState({order:n}),e.next=7,h.updateOrder(n._id,n).then((function(e){return c.tipModalHandler(2)}));case 7:console.log(c.state);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c.tipModalHandler=function(e){c.setState({modal_2:e})},c.handleCustomTipValue=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c.cardPaymentHandler=function(){c.setState((function(e){return{cardModal:!e.cardModal}}))},c.paymentStatusHandler=function(){return c.state.paymentReady?Object(x.jsxs)("div",{children:[c.state.order.order_items.map((function(e,t){return Object(x.jsx)("div",{children:Object(x.jsx)(W,{item:e,comp:c.state.order.commped[t]},t)})})),Object(x.jsxs)("h1",{children:["Subtotal: ",c.state.order.subtotal.toFixed(2)]}),Object(x.jsxs)("h1",{children:["Tax: ",(.0825*c.state.order.subtotal).toFixed(2)]}),Object(x.jsxs)("h1",{children:["Total: ",c.state.order.total.toFixed(2)]}),Object(x.jsx)("button",{onClick:c.cardPaymentHandler,children:"Pay with Card"}),Object(x.jsx)("button",{children:"Pay with Cash"}),Object(x.jsx)("button",{children:"Split Check"})]}):Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h1",{children:"No order placed"}),Object(x.jsx)("h1",{children:"Go place an order!"})]})},c.state={order_id:"",order:{},paymentReady:!1,cardModal:!1,modal_2:0,freeDessert:0},c}return Object(d.a)(n,[{key:"render",value:function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h1",{children:"Payment"}),this.paymentStatusHandler(),this.cardModal()]})}}]),n}(a.a.Component),V={items:[],comments:[],commped:[],subtotal:0,tip:0,total:0,status:"Waiting",table:8},z=function(){return V.table},Y=function(e,t){"Waiting"===V.status&&(V.items.push(e._id),V.comments.push(t),V.commped.push(!1)),console.log(V)},$=function(e){var t=e.item,n=e.comment;return e.comp?Object(x.jsxs)("div",{children:[Object(x.jsxs)("p",{children:[t.name," 0.00"]}),Object(x.jsx)("p",{children:n})]}):Object(x.jsxs)("div",{children:[Object(x.jsxs)("p",{children:[t.name," ",t.price]}),Object(x.jsx)("p",{children:n})]})},G=function(e){Object(j.a)(n,e);var t=Object(b.a)(n);function n(e){var c;return Object(l.a)(this,n),(c=t.call(this,e)).componentDidMount=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:V.items.map((function(e,t){h.getItemById(e).then((function(e){c.setState((function(n){return{items:[].concat(Object(g.a)(n.items),[e.data.data]),comments:[].concat(Object(g.a)(n.comments),[V.comments[t]]),commped:[].concat(Object(g.a)(n.commped),[V.commped[t]]),subtotal:n.subtotal+e.data.data.price}})),c.setState({tax:.0825*c.state.subtotal,total:1.0825*c.state.subtotal})}))}));case 1:case"end":return e.stop()}}),e)}))),c.handleRemoveFromOrder=function(e){var t=Object(g.a)(c.state.items),n=Object(g.a)(c.state.comments),a=Object(g.a)(c.state.commped),r=t.indexOf(e);-1!==r&&(t.splice(r,1),n.splice(r,1),a.splice(r,1),V.items.splice(V.items.indexOf(e._id),1),V.comments.splice(V.items.indexOf(e._id),1),V.commped.splice(V.items.indexOf(e._id),1),c.setState((function(c){return{items:t,comments:n,commped:a,subtotal:c.subtotal-e.price}})),c.setState((function(e){return{tax:.0825*e.subtotal,total:1.0825*e.subtotal}})))},c.OrderStatusHandler=function(){return"Waiting"===V.status?Object(x.jsx)("button",{onClick:c.placeOrderHandler,children:"Place Order"}):"Created"===V.status?Object(x.jsx)("h1",{children:"Order Placed! Ready for Payment"}):void 0},c.EditRemoveButtons=function(e){return"Waiting"===V.status?Object(x.jsx)("button",{onClick:function(){return c.handleRemoveFromOrder(e)},children:"X"}):"Created"===V.status?null:void 0},c.placeOrderHandler=Object(u.a)(o.a.mark((function e(){var t,n,a,r,s,i,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return V.status="Created",c.setState({status:"Created"}),t=c.state,n=t.items,a=t.comments,r=t.commped,s=t.subtotal,i=t.total,u={order_items:n,comments:a,commped:r,subtotal:s,total:i,status:"Created",table:V.table},e.next=6,h.createOrder(u).then((function(e){var t;window.alert("Order created successfully"),t=e.data.id,q.order_id=t,q.paymentReady=!0}));case 6:case"end":return e.stop()}}),e)}))),c.state={items:[],comments:[],commped:[],subtotal:0,tax:0,total:0,status:"",table:0},c}return Object(d.a)(n,[{key:"render",value:function(){var e=this;return Object(x.jsxs)("div",{children:[Object(x.jsx)("h1",{children:"Your Order"}),Object(x.jsx)("div",{children:this.state.items.map((function(t,n){return Object(x.jsxs)("div",{children:[Object(x.jsx)($,{item:t,comment:e.state.comments[n],comp:e.state.commped[n]},n),e.EditRemoveButtons(t)]})}))}),Object(x.jsxs)("h1",{children:["Subtotal: $",this.state.subtotal.toFixed(2)]}),this.OrderStatusHandler()]})}}]),n}(a.a.Component);n(90);function J(){var e=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getTableByNum(z());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=Object(u.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.updateTable(t.table_num,t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n=Object(c.useState)([]),a=Object(k.a)(n,2),r=a[0],s=a[1],i=Object(c.useState)(!1),l=Object(k.a)(i,2),d=l[0],j=l[1],b=Object(c.useState)([]),O=Object(k.a)(b,2),m=O[0],f=O[1],p=Object(c.useState)([]),v=Object(k.a)(p,2),y=v[0],C=v[1],w=function(e){var t=e.target,n=Object(g.a)(m);n[t.value]=!0,f(n),C((function(e){return[].concat(Object(g.a)(e),[r[t.value].name])}))},S=Object(c.useState)(!1),R=Object(k.a)(S,2),D=R[0],T=R[1],P=function(){T((function(e){return!e}))},M=function(e){var t;t=e,V.table=t,T(!1)};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("nav",{className:"CstNavbarTabs",children:[Object(x.jsxs)("ul",{className:"cst-nav-tab",children:[Object(x.jsx)("li",{children:Object(x.jsx)("button",{className:"cst-nav-button",onClick:function(){j(!0),s([]),V.items.map((function(e){h.getItemById(e).then((function(e){"drinks"===e.data.data.category&&s((function(t){return[].concat(Object(g.a)(t),[e.data.data])}))}))}));for(var e=[],t=0;t<r.length;t++)e=[].concat(Object(g.a)(e),[!1]);f(e)},children:"Refills"})}),Object(x.jsxs)("li",{children:[Object(x.jsx)("button",{className:"cst-nav-button",onClick:function(){e().then((function(e){var n=e.data.data;n.assistance=!0,t(n)}))},children:"Call Staff"})," "]}),Object(x.jsx)("li",{className:"cst-nav-link",children:Object(x.jsx)(_.b,{className:"cst-tab-text",to:"/Rewards",children:"Rewards"})}),Object(x.jsx)("li",{className:"cst-nav-link",children:Object(x.jsx)(_.b,{className:"cst-tab-text",to:"/Menu",children:"Menu"})}),Object(x.jsx)("li",{className:"cst-nav-link",children:Object(x.jsx)(_.b,{className:"cst-tab-text",to:"/Order",children:"Order"})}),Object(x.jsx)("li",{className:"cst-nav-link",children:Object(x.jsx)(_.b,{className:"cst-tab-text",to:"/Payment",children:"Payment"})}),Object(x.jsx)("li",{className:"cst-nav-link",children:Object(x.jsx)(_.b,{className:"cst-tab-text",to:"/KidsCorner",children:"Kids Corner"})}),Object(x.jsxs)("li",{children:[Object(x.jsx)("button",{className:"cst-nav-button",onClick:P,children:"Change table"})," "]})]}),Object(x.jsxs)("label",{className:"cst-table",children:["Table: ",z()]})]}),Object(x.jsxs)(N,{show:D,children:[Object(x.jsx)("button",{onClick:P,className:"x-button",children:"X"}),Object(x.jsx)("br",{}),[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((function(e){return Object(x.jsx)("button",{onClick:function(){return M(e)},className:"table-num-button",children:e})}))]}),Object(x.jsxs)(N,{show:d,children:[Object(x.jsx)("button",{onClick:function(){j(!1),e().then((function(e){var n=e.data.data;n.refills=y,C([]),t(n).then()}))},className:"x-button",children:"X"}),Object(x.jsx)("br",{}),r.map((function(e,t){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("button",{onClick:w,value:t,disabled:m[t],children:e.name}),Object(x.jsx)("br",{})]})}))]})]})}n(91);var Q=[],U=function(e){var t=e.item,n=Object(c.useState)(!1),a=Object(k.a)(n,2),r=a[0],s=a[1],i="";return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(N,{show:r,children:[Object(x.jsx)("button",{onClick:function(){return s(!r)},className:"x-button",children:"X"}),Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:t.name}),Object(x.jsx)("p",{children:t.price}),Object(x.jsx)("ul",{children:t.ingredients.map((function(e,t){return Object(x.jsx)("li",{children:e},t)}))}),Object(x.jsxs)("form",{children:[Object(x.jsx)("label",{children:"Comments:"}),Object(x.jsx)("input",{type:"text",onChange:function(e){i=e.target.value}})]}),Object(x.jsx)("button",{onClick:function(){Y(t,i),s(!r)},children:"Add to Order"})]})]}),Object(x.jsx)("div",{className:"item-display",children:Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:t.name}),Object(x.jsx)("p",{children:t.price}),Object(x.jsx)("ul",{children:t.ingredients.map((function(e,t){return Object(x.jsx)("li",{children:e},t)}))}),Object(x.jsx)("button",{onClick:function(){return Y(t,"")},children:"Add to Order"}),Object(x.jsx)("button",{onClick:function(){return s(!r)},children:"Customize"})]})})]})};function Z(e){var t=e.show,n=e.children;return t?Object(x.jsx)("div",{className:"grid-display",children:n}):null}function ee(){Object(c.useEffect)((function(){e()}),[]);var e=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getAllItems().then((function(e){Q=e.data.data}));case 2:console.log(Q);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=Object(c.useState)(!1),n=Object(k.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)(!1),i=Object(k.a)(s,2),l=i[0],d=i[1],j=Object(c.useState)(!1),b=Object(k.a)(j,2),O=b[0],m=b[1],f=Object(c.useState)(!1),p=Object(k.a)(f,2),v=p[0],g=p[1],y=Object(c.useState)(!1),N=Object(k.a)(y,2),C=N[0],w=N[1],S=Object(c.useState)(!1),R=Object(k.a)(S,2),_=R[0],D=R[1];return Object(x.jsx)("div",{className:"full-menu-box",children:Object(x.jsxs)("div",{className:"menu-box",children:[Object(x.jsx)("h1",{children:"Menu"}),Object(x.jsx)("button",{onClick:function(){d((function(e){return!e}))},children:"Appetizers"}),Object(x.jsx)(Z,{show:l,children:Q.map((function(e,t){return"appetizers"===e.category?Object(x.jsx)(U,{item:e},t):null}))}),Object(x.jsx)("button",{onClick:function(){r((function(e){return!e}))},children:"Entrees"}),Object(x.jsx)(Z,{show:a,children:Q.map((function(e,t){return"entrees"===e.category?Object(x.jsx)(U,{item:e},t):null}))}),Object(x.jsx)("button",{onClick:function(){m((function(e){return!e}))},children:"Sides"}),Object(x.jsx)(Z,{show:O,children:Q.map((function(e,t){return"sides"===e.category?Object(x.jsx)(U,{item:e},t):null}))}),Object(x.jsx)("button",{onClick:function(){g((function(e){return!e}))},children:"Kids Meals"}),Object(x.jsx)(Z,{show:v,children:Q.map((function(e,t){return"kids"===e.category?Object(x.jsx)(U,{item:e},t):null}))}),Object(x.jsx)("button",{onClick:function(){w((function(e){return!e}))},children:"Desserts"}),Object(x.jsx)(Z,{show:C,children:Q.map((function(e,t){return"desserts"===e.category?Object(x.jsx)(U,{item:e},t):null}))}),Object(x.jsx)("button",{onClick:function(){D((function(e){return!e}))},children:"Drinks"}),Object(x.jsx)(Z,{show:_,children:Q.map((function(e,t){return"drinks"===e.category?Object(x.jsx)(U,{item:e},t):null}))})]})})}function te(){var e=Object(c.useState)(!0),t=Object(k.a)(e,2);t[0],t[1];return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("div",{className:"customer",children:Object(x.jsxs)(_.a,{children:[Object(x.jsx)(M,{}),Object(x.jsx)("div",{className:"customer-title",children:"Customer"}),Object(x.jsxs)("div",{className:"customer-body",children:[Object(x.jsx)(J,{}),Object(x.jsx)(D.a,{exact:!0,path:"/Rewards"}),Object(x.jsx)(D.a,{exact:!0,path:"/Menu",component:ee}),Object(x.jsx)(D.a,{exact:!0,path:"/Order",component:G}),Object(x.jsx)(D.a,{exact:!0,path:"/Payment",component:K})]})]})})})}n(92);function ne(e){var t=e.show,n=e.children;return t?Object(x.jsxs)("div",{className:"modal-background",children:[Object(x.jsx)("section",{className:"modal-main-staff"}),n]}):null}var ce=function(){var e,t=Object(c.useState)(!1),n=Object(k.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)(Object(x.jsx)(te,{})),i=Object(k.a)(s,2),l=i[0],d=i[1],j=Object(c.useState)(!1),b=Object(k.a)(j,2),O=b[0],m=b[1],f=Object(c.useState)([]),N=Object(k.a)(f,2),C=N[0],w=N[1],_=Object(c.useState)({emp_id:""}),D=Object(k.a)(_,2),T=D[0],P=D[1],M=Object(c.useState)(""),H=Object(k.a)(M,2),I=H[0],F=H[1],A=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getEmployees().then((function(e){var t=e.data.data;console.log(t);var n=[];t.map((function(e){"lobby"===e.role&&(n=[].concat(Object(g.a)(n),[e]))})),console.log(n),w(n)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.getEmployees().then((function(e){var t=e.data.data;console.log(t);var n=[];t.map((function(e){"kitchen"===e.role&&(n=[].concat(Object(g.a)(n),[e]))})),console.log(n),w(n)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(e){e.preventDefault(),r((function(){return!a}));var t=e.target.name;"Lobby"===t?(d((function(){return Object(x.jsx)(S,{})})),B(),A()):"Kitchen"===t?(d((function(){return Object(x.jsx)(R,{})})),B(),E()):"Manager"===t?d((function(){return Object(x.jsx)(X,{})})):"Customer"===t&&(d((function(){return Object(x.jsx)(te,{})})),m((function(){return!1})))},B=function(){m((function(){return!O}))};return Object(x.jsxs)("div",{children:[Object(x.jsx)(ne,{show:O,children:Object(x.jsx)("form",{className:"signin-form",onSubmit:function(e){var t;e.preventDefault(),t=T,console.log(t),C.map((function(e){t.emp_id==e.emp_id?B():F("Credentials do not match. Please try again.")})),console.log(I)},children:Object(x.jsxs)("div",{className:"form-inner",children:[Object(x.jsx)("h2",{children:"Employee Login"}),I,Object(x.jsxs)("div",{className:"form-group",children:[Object(x.jsx)("label",{htmlFor:"empoyee id",children:"Employee ID:"}),Object(x.jsx)("input",{type:"text",placeholder:"Enter Employee ID here",value:T.emp_id,onChange:(e="emp_id",function(t){var n=t.target.value;P((function(t){return Object(v.a)(Object(v.a)({},t),{},Object(p.a)({},e,n))}))})})]}),Object(x.jsx)("input",{type:"submit",value:"LOGIN"}),Object(x.jsx)("br",{}),Object(x.jsx)("button",{name:"Customer",onClick:L,children:"Back To Customer"})]})})}),l,Object(x.jsxs)("nav",{className:"NavbarPages",children:[Object(x.jsx)("h1",{className:"employee-id",children:"Taco Palace"})," ",Object(x.jsx)("ul",{className:a?"nav-page active":"nav-page",children:y.map((function(e,t){return Object(x.jsx)("li",{children:Object(x.jsx)("a",{className:e.cName,href:e.url,name:e.title,onClick:L,children:e.title})},t)}))})]})]})};var ae=function(){return Object(x.jsxs)("div",{className:"App",children:[Object(x.jsx)("div",{className:"bg"}),Object(x.jsx)(ce,{})]})};s.a.render(Object(x.jsx)(ae,{}),document.getElementById("root"))}},[[93,1,2]]]);
//# sourceMappingURL=main.9e95cc8b.chunk.js.map
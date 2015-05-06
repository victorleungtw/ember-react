define("example/app",["exports","ember","ember/resolver","ember/load-initializers","example/config/environment"],function(e,t,a,r,n){"use strict";t["default"].MODEL_FACTORY_INJECTIONS=!0;var i=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,podModulePrefix:n["default"].podModulePrefix,Resolver:a["default"]});r["default"](i,n["default"].modulePrefix),e["default"]=i}),define("example/components/gravatar-display",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Component.extend({size:80,d:"identicon",email:null,tagName:"img",attributeBindings:["url:src","size:width","size:height"],emailHash:function(){var e=this.get("email");return e&&md5(e)}.property("email"),url:function(){var e=this.get("emailHash"),t=this.get("size"),a=this.get("d");return"http://www.gravatar.com/avatar/"+e+"?s="+t+"&d="+a}.property("emailHash","size")})}),define("example/components/react-outlet",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Component.extend({elementId:"react-outlet",didInsertElement:function(){var e=this.get("element");window.didInsertReactOutlet(e),this._super()},willDestroyElement:function(){var e=this.get("element");window.willDestroyReactOutlet(e),this._super()}})}),define("example/components/syntax-highlight",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Component.extend({language:"markup",tagName:"pre",languageClass:function(){return"language-"+this.get("language")}.property("language"),didInsertElement:function(){this._super();var e=this.$("code")[0];Prism.highlightElement(e)}})}),define("example/controllers/profiles/index",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({profiles:t["default"].computed.alias("model"),queryParams:["page"],nextPage:function(){var e=this.get("page")||1;return parseInt(e)+1}.property("page"),prevPage:function(){var e=this.get("page");return e>1&&parseInt(e)-1}.property("page"),emberVersion:function(){return t["default"].VERSION}.property(),selection:t["default"].computed.filterBy("profiles","isSelected")})}),define("example/controllers/profiles/item",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Controller.extend({isSelected:!1})}),define("example/helpers/time-ago",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Handlebars.makeBoundHelper(function(e){return moment(e).fromNow()})}),define("example/initializers/app-version",["exports","example/config/environment","ember"],function(e,t,a){"use strict";var r=a["default"].String.classify,n=!1;e["default"]={name:"App Version",initialize:function(e,i){if(!n){var l=r(i.toString());a["default"].libraries.register(l,t["default"].APP.version),n=!0}}}}),define("example/initializers/export-application-global",["exports","ember","example/config/environment"],function(e,t,a){"use strict";function r(e,r){var n=t["default"].String.classify(a["default"].modulePrefix);a["default"].exportApplicationGlobal&&!window[n]&&(window[n]=r)}e.initialize=r,e["default"]={name:"export-application-global",initialize:r}}),define("example/models/profile",["exports","ember","example/models/tag"],function(e,t,a){"use strict";var r=t["default"].Object.extend({name:null,email:null,createdAt:null,tags:null}),n=[];r.reopenClass({load:function(e){if(e=e||1,n[e])return n[e];for(var t=[],a=0;100>a;a++)t.push(this.generate());return n[e]=t},generate:function(){for(var e=[],t=6*Math.random(),r=0;t>r;r++)e.push(a["default"].generate());return this.create({name:faker.name.findName(),email:faker.internet.email(),createdAt:faker.date.recent(),tags:e})}}),e["default"]=r}),define("example/models/tag",["exports","ember"],function(e,t){"use strict";var a=t["default"].Object.extend({name:null});a.reopenClass({generate:function(){return this.create({name:faker.company.bsAdjective()})}}),e["default"]=a}),define("example/react/example",["exports"],function(e){"use strict";e["default"]=React.createClass({displayName:"example",render:function(){return React.createElement("p",null,"This text is rendered with React")}})}),define("example/react/gravatar-display",["exports"],function(e){"use strict";e["default"]=React.createClass({displayName:"gravatar-display",getDefaultProps:function(){return{size:80,d:"identicon"}},getUrl:function(){var e=md5(this.props.email),t=this.props.size,a=this.props.d;return"http://www.gravatar.com/avatar/"+e+"?s="+t+"&d="+a},render:function(){return React.createElement("img",{className:"gravatar-display-component",src:this.getUrl(),width:this.props.size,height:this.props.size})}})}),define("example/react/profiles/index",["exports","example/react/profiles/item","example/models/profile"],function(e,t,a){"use strict";var r=ReactRouter.Link;e["default"]=React.createClass({displayName:"index",getInitialState:function(){return{selection:[],profiles:[]}},getPage:function(){return parseInt(this.props.query.page||1)},componentWillMount:function(){this.setState({profiles:a["default"].load(this.getPage())})},componentWillReceiveProps:function(e){this.setState({profiles:a["default"].load(parseInt(e.query.page))})},renderPrev:function(){var e=this.getPage(),t=e-1;return t>0?React.createElement(r,{to:"profiles",query:{page:t}},"prev page"):void 0},renderNext:function(){var e=this.getPage(),t=e+1;return React.createElement(r,{to:"profiles",query:{page:t}},"next page")},handleSelect:function(e,t){var a=this.state.selection;t?a.push(e):a.removeObject(e),this.forceUpdate()},render:function(){var e=this.state.selection;return React.createElement("div",{className:"profiles-index react"},React.createElement("header",null,React.createElement("h1",null,"Profiles Rendered With React ",React.version),React.createElement("div",{className:"subheader"},React.createElement("div",{className:"selection"},e.length," Selected"),React.createElement("div",{className:"pagination"},this.renderPrev()," ",this.renderNext()))),React.createElement("ul",{className:"profiles"},this.state.profiles.map(function(a){var r=-1!==e.indexOf(a);return React.createElement(t["default"],{model:a,selected:r,onChange:this.handleSelect.bind(this,a)})},this)))}})}),define("example/react/profiles/item",["exports","example/react/gravatar-display","example/react/time-ago"],function(e,t,a){"use strict";e["default"]=React.createClass({displayName:"item",getDefaultProps:function(){return{selected:!1,onChange:function(){}}},handleChange:function(e){var t=e.target.checked;this.props.onChange(t)},render:function(){var e=this.props.selected?"selected":"",r=this.props.model;return React.createElement("li",{className:e},React.createElement("input",{type:"checkbox",checked:this.props.selected,onChange:this.handleChange}),React.createElement(t["default"],{email:r.get("email"),size:"24"}),React.createElement("div",{className:"name"},r.get("name")),React.createElement("div",{className:"email"},r.get("email")),React.createElement("ul",{className:"tags"},r.get("tags").map(function(e){return React.createElement("li",null,e.get("name"))},this)),React.createElement(a["default"],{date:r.createdAt}))}})}),define("example/react/routing",["exports","example/react/syntax-highlight"],function(e,t){"use strict";e["default"]=React.createClass({displayName:"routing",render:function(){return React.createElement("div",{className:"content"},React.createElement("h1",null,"Routing"),React.createElement("p",null,"Ember-React extends Ember.Route with support for rendering the route's template as a react component. Specifically, Ember-React adds an additional ",React.createElement("code",null,"react:")," hash parameter to the ",React.createElement("code",null,"render()")," function:"),React.createElement(t["default"],{language:"javascript"},"renderTemplate: function() { this.render({react: ...}); }"),React.createElement("p",null,"Ember-React also plays well with ",React.createElement("a",{href:"https://github.com/rackt/react-router"},"React-Router"),". Simply pass in a react class containing a <Routes> component. See the source of this example."))}})}),define("example/react/syntax-highlight",["exports"],function(e){"use strict";e["default"]=React.createClass({displayName:"syntax-highlight",getDefaultProps:function(){return{language:"markup"}},componentDidMount:function(){Prism.highlightElement(this.refs.code.getDOMNode())},componentDidUpdate:function(){Prism.highlightElement(this.refs.code.getDOMNode())},render:function(){var e="language-"+this.props.language;return React.createElement("pre",null,React.createElement("code",{ref:"code",className:e},this.props.children))}})}),define("example/react/time-ago",["exports"],function(e){"use strict";e["default"]=React.createClass({displayName:"time-ago",render:function(){var e=this.props.date;return React.createElement("time",{datetime:e},moment(e).fromNow())}})}),define("example/router",["exports","ember","example/config/environment","example/react/profiles/index","example/react/routing"],function(e,t,a,r,n){"use strict";var i=t["default"].Router.extend({location:a["default"].locationType,updateReactRouter:function(){var e=this.location.location,t=e.pathname+e.search;l&&l.Handler.match(t)&&l.state.path!==t&&l.Handler.transitionTo(t)}.on("didTransition")});i.map(function(){this.resource("ember",function(){this.route("react-components"),this.resource("profiles",function(){this.resource("profile",{path:"/:profile_id"})})}),this.resource("react",function(){this.route("route",{path:"/*_"})})});var l,d=React.createClass({displayName:"Root",render:function(){return React.createElement(ReactRouter.RouteHandler,this.props)}}),c=ReactRouter.Route,o=React.createElement(c,{handler:d,path:"/ember-react/"},React.createElement(c,{name:"profiles",path:"react/profiles",handler:r["default"]}),React.createElement(c,{name:"routing",path:"react/routing",handler:n["default"]}));window.didInsertReactOutlet=function(e){ReactRouter.run(o,ReactRouter.HistoryLocation,function(e,t){l={Handler:e,state:t};var a=document.getElementById("react-outlet");React.render(React.createElement(e,{query:t.query}),a)})},window.willDestroyReactOutlet=function(e){React.unmountComponentAtNode(e)},e["default"]=i}),define("example/routes/profiles/index",["exports","ember","example/models/profile"],function(e,t,a){"use strict";e["default"]=t["default"].Route.extend({queryParams:{page:{refreshModel:!0}},model:function(e){return a["default"].load(e.page||1)}})}),define("example/templates/application",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Getting Started");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("React Components");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),a=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Index Page w/ Ember");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),r=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Index Page w/ React");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),n=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("Routing");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","container");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","left");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("header"),i=e.createTextNode("\n      ");e.appendChild(n,i);var i=e.createElement("h2"),l=e.createElement("span");e.setAttribute(l,"class","ember");var d=e.createTextNode("Ember");e.appendChild(l,d),e.appendChild(i,l);var l=e.createTextNode("-");e.appendChild(i,l);var l=e.createElement("span");e.setAttribute(l,"class","react");var d=e.createTextNode("React");e.appendChild(l,d),e.appendChild(i,l),e.appendChild(n,i);var i=e.createTextNode("\n    ");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("nav"),i=e.createTextNode("\n      ");e.appendChild(n,i);var i=e.createElement("ul"),l=e.createTextNode("\n        ");e.appendChild(i,l);var l=e.createElement("li"),d=e.createComment("");e.appendChild(l,d),e.appendChild(i,l);var l=e.createTextNode("\n        ");e.appendChild(i,l);var l=e.createElement("li"),d=e.createComment("");e.appendChild(l,d),e.appendChild(i,l);var l=e.createTextNode("\n        ");e.appendChild(i,l);var l=e.createElement("li"),d=e.createComment("");e.appendChild(l,d),e.appendChild(i,l);var l=e.createTextNode("\n        ");e.appendChild(i,l);var l=e.createElement("li"),d=e.createComment("");e.appendChild(l,d),e.appendChild(i,l);var l=e.createTextNode("\n        ");e.appendChild(i,l);var l=e.createElement("li"),d=e.createComment("");e.appendChild(l,d),e.appendChild(i,l);var l=e.createTextNode("\n        ");e.appendChild(i,l);var l=e.createElement("li"),d=e.createElement("a");e.setAttribute(d,"href","https://github.com/ghempton/ember-react");var c=e.createTextNode("Github");e.appendChild(d,c),e.appendChild(l,d),e.appendChild(i,l);var l=e.createTextNode("\n      ");e.appendChild(i,l),e.appendChild(n,i);var i=e.createTextNode("\n    ");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","right");var n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[0]),n=e.childAt(r,[1,3,1]),i=new Array(6);return i[0]=e.createMorphAt(e.childAt(n,[1]),0,0),i[1]=e.createMorphAt(e.childAt(n,[3]),0,0),i[2]=e.createMorphAt(e.childAt(n,[5]),0,0),i[3]=e.createMorphAt(e.childAt(n,[7]),0,0),i[4]=e.createMorphAt(e.childAt(n,[9]),0,0),i[5]=e.createMorphAt(e.childAt(r,[3]),1,1),i},statements:[["block","link-to",["index"],[],0,null],["block","link-to",["ember.react-components"],[],1,null],["block","link-to",["profiles"],[],2,null],["block","link-to",["react.route","profiles"],[],3,null],["block","link-to",["react.route","routing"],[],4,null],["content","outlet"]],locals:[],templates:[e,t,a,r,n]}}())}),define("example/templates/components/syntax-highlight",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("code"),r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[0]),n=new Array(2);return n[0]=e.createAttrMorph(r,"class"),n[1]=e.createMorphAt(r,0,0),n},statements:[["attribute","class",["concat",[["get","languageClass"]]]],["content","yield"]],locals:[],templates:[]}}())}),define("example/templates/ember/react-components",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    {{react componentName='example'}}\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("    {{react componentName='time-ago' date=date}}\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","content");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h1"),n=e.createTextNode("React Components");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("p"),n=e.createTextNode("Ember-React adds a new helper ");e.appendChild(r,n);var n=e.createElement("code"),i=e.createTextNode("{{react}}");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode(", which can be used to easily include a react component inside of a handlebars template.");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("p"),n=e.createTextNode("The above text is rendered using a react component named 'example':");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h2"),n=e.createTextNode("Bindings and Properties");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("p"),n=e.createTextNode("Properties passed into the ");e.appendChild(r,n);var n=e.createElement("code"),i=e.createTextNode("{{react}}");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode(" helper will be bound. When a property is updated, the ");e.appendChild(r,n);var n=e.createElement("code"),i=e.createTextNode("props");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode(" hash inside the React component will be updated and lifecycle events such as  ");e.appendChild(r,n);var n=e.createElement("code"),i=e.createTextNode("componentWillReceiveProps");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode(" will be called:");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[0]),n=new Array(3);return n[0]=e.createMorphAt(r,5,5),n[1]=e.createMorphAt(r,9,9),n[2]=e.createMorphAt(r,15,15),n},statements:[["inline","react",[],["componentName","example"]],["block","syntax-highlight",[],[],0,null],["block","syntax-highlight",[],[],1,null]],locals:[],templates:[e,t]}}())}),define("example/templates/index",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("bower install ember-react\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode('<script src="bower_components/ember-react/ember-react.global.js"></script>\n');return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),a=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("app.import('bower_components/ember-react/ember-react.global.js');\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","content");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("h1"),n=e.createTextNode("Getting Started");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("p"),n=e.createTextNode("The easiest way to get started is to use bower:");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("p"),n=e.createTextNode("Then include the following script file in your application:");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("p"),n=e.createTextNode("If you are using ");e.appendChild(r,n);var n=e.createElement("a");e.setAttribute(n,"href","http://www.ember-cli.com/");var i=e.createTextNode("ember-cli");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode(", simply import the script in your Brocfile:");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[0]),n=new Array(3);return n[0]=e.createMorphAt(r,5,5),n[1]=e.createMorphAt(r,9,9),n[2]=e.createMorphAt(r,13,13),n},statements:[["block","syntax-highlight",[],[],0,null],["block","syntax-highlight",[],[],1,null],["block","syntax-highlight",[],["language","javascript"],2,null]],locals:[],templates:[e,t,a]}}())}),define("example/templates/profiles/index",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("prev page");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=new Array(1);return r[0]=e.createMorphAt(t,1,1,a),r},statements:[["block","link-to",["profiles",["subexpr","query-params",[],["page",["get","prevPage"]]]],[],0,null]],locals:[],templates:[e]}}(),t=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("next page");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("          ");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=new Array(1);return r[0]=e.createMorphAt(t,1,1,a),r},statements:[["block","link-to",["profiles",["subexpr","query-params",[],["page",["get","nextPage"]]]],[],0,null]],locals:[],templates:[e]}}(),a=function(){var e=function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("            ");e.appendChild(t,a);var a=e.createElement("li"),r=e.createComment("");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=new Array(1);return r[0]=e.createMorphAt(e.childAt(t,[1]),0,0),r},statements:[["content","tagName.name"]],locals:["tagName"],templates:[]}}();return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("      ");e.appendChild(t,a);var a=e.createElement("li"),r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","name");var n=e.createComment("");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("div");e.setAttribute(r,"class","email");var n=e.createComment("");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n        ");e.appendChild(a,r);var r=e.createElement("ul");e.setAttribute(r,"class","tags");var n=e.createTextNode("\n");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("        ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n        ");e.appendChild(a,r);var r=e.createElement("time");e.setAttribute(r,"class","createdAt"),e.setAttribute(r,"datetime","createdAt");var n=e.createComment("");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n      ");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[1]),n=new Array(7);return n[0]=e.createAttrMorph(r,"class"),n[1]=e.createMorphAt(r,1,1),n[2]=e.createMorphAt(r,3,3),n[3]=e.createMorphAt(e.childAt(r,[5]),0,0),n[4]=e.createMorphAt(e.childAt(r,[7]),0,0),n[5]=e.createMorphAt(e.childAt(r,[9]),1,1),n[6]=e.createMorphAt(e.childAt(r,[11]),0,0),n},statements:[["attribute","class",["concat",[["subexpr","if",[["get","item.isSelected"],"selected"],[]]]]],["inline","input",[],["type","checkbox","checked",["subexpr","@mut",[["get","item.isSelected"]],[]]]],["inline","gravatar-display",[],["email",["subexpr","@mut",[["get","item.email"]],[]],"size","24"]],["content","item.name"],["content","item.email"],["block","each",[["get","item.tags"]],[],0,null],["inline","time-ago",[["get","item.createdAt"]],[]]],locals:["item"],templates:[e]}}();return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","profiles-index ember");var r=e.createTextNode("\n  ");e.appendChild(a,r);var r=e.createElement("header"),n=e.createTextNode("\n    ");e.appendChild(r,n);var n=e.createElement("h1"),i=e.createTextNode("Profiles Rendered With Ember.js ");e.appendChild(n,i);var i=e.createComment("");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode("\n\n    ");e.appendChild(r,n);var n=e.createElement("div");e.setAttribute(n,"class","subheader");var i=e.createTextNode("\n      ");e.appendChild(n,i);var i=e.createElement("div");e.setAttribute(i,"class","selection");var l=e.createTextNode("\n        ");e.appendChild(i,l);var l=e.createComment("");e.appendChild(i,l);var l=e.createTextNode(" Selected\n      ");e.appendChild(i,l),e.appendChild(n,i);var i=e.createTextNode("\n\n      ");e.appendChild(n,i);var i=e.createElement("div");e.setAttribute(i,"class","pagination");var l=e.createTextNode("\n");e.appendChild(i,l);var l=e.createComment("");e.appendChild(i,l);var l=e.createTextNode("\n");e.appendChild(i,l);var l=e.createComment("");e.appendChild(i,l);var l=e.createTextNode("      ");e.appendChild(i,l),e.appendChild(n,i);var i=e.createTextNode("\n    ");e.appendChild(n,i),e.appendChild(r,n);var n=e.createTextNode("\n  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n\n  ");e.appendChild(a,r);var r=e.createElement("ul");e.setAttribute(r,"class","profiles");var n=e.createTextNode("\n\n");e.appendChild(r,n);var n=e.createComment("");e.appendChild(r,n);var n=e.createTextNode("  ");e.appendChild(r,n),e.appendChild(a,r);var r=e.createTextNode("\n");e.appendChild(a,r),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=e.childAt(t,[0]),n=e.childAt(r,[1]),i=e.childAt(n,[3]),l=e.childAt(i,[3]),d=new Array(5);return d[0]=e.createMorphAt(e.childAt(n,[1]),1,1),d[1]=e.createMorphAt(e.childAt(i,[1]),1,1),d[2]=e.createMorphAt(l,1,1),d[3]=e.createMorphAt(l,3,3),d[4]=e.createMorphAt(e.childAt(r,[3]),1,1),d},statements:[["content","emberVersion"],["content","selection.length"],["block","if",[["get","prevPage"]],[],0,null],["block","if",[["get","nextPage"]],[],1,null],["block","each",[["get","profiles"]],[],2,null]],locals:[],templates:[e,t,a]}}())}),define("example/templates/react",["exports"],function(e){"use strict";e["default"]=Ember.HTMLBars.template(function(){return{isHTMLBars:!0,revision:"Ember@1.13.0-beta.1+canary.6f20f6a5",arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var r=new Array(1);return r[0]=e.createMorphAt(t,0,0,a),e.insertBoundary(t,0),r},statements:[["content","react-outlet"]],locals:[],templates:[]}}())}),define("example/config/environment",["ember"],function(e){var t="example";try{var a=t+"/config/environment",r=e["default"].$('meta[name="'+a+'"]').attr("content"),n=JSON.parse(unescape(r));return{"default":n}}catch(i){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests?require("example/tests/test-helper"):require("example/app")["default"].create({name:"example",version:"0.0.0.083b8b0b"});
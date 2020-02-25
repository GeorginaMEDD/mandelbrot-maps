(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{62:function(e){e.exports={a:"#"}},77:function(e,n,t){e.exports=t(91)},82:function(e,n,t){},83:function(e,n,t){},91:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(14),i=t.n(r),c=(t(82),t(8)),l=(t(83),t(144)),s=t(145),u=t(123),m=t(117),f=t(48),d=t(22),p=t.n(d),g=t(34),b=t(17),v=function(e){var n=e.maxI,t=void 0===n?300:n,a=e.AA,o=void 0===a?1:a,r=e.B,i=void 0===r?64:r,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{stroke:2,radius:100};return"\n// Created by inigo quilez - iq/2013\n// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.\n\n// See here for more information on smooth iteration count:\n// http://iquilezles.org/www/articles/mset_smooth/mset_smooth.htm\n\n// render parameters\n#define AA ".concat(o,"\n#define MAXI ").concat(t,"\n#define B ").concat(i.toFixed(1),"\n\n// crosshair parameters\n#define cross_stroke ").concat(c.stroke.toFixed(1),"\n#define cross_radius ").concat(c.radius.toFixed(1),'\n\n// set high float precision (lower than this may break colours on mobile)\nprecision highp float;\n\n// need to know the resolution of the canvas\nuniform vec2 resolution;\n\n// properties should be passed as uniforms\nuniform int   u_maxI;  \nuniform vec2  u_pos;\nuniform float u_zoom;\nuniform float u_theta;\n\nbool crosshair( float x, float y ) {\n    float abs_x = abs(2.0*x - resolution.x);\n    float abs_y = abs(2.0*y - resolution.y);\n\n    return \n    // crosshair in centre of screen\n    (abs_x <= cross_stroke || abs_y <= cross_stroke) &&\n    // crosshair size / "radius"\n    (abs_x <= cross_radius && abs_y <= cross_radius);\n}\n\nfloat mandelbrot( in vec2 c ) {\n    {\n        float c2 = dot(c, c);\n        // skip computation inside M1 - http://iquilezles.org/www/articles/mset_1bulb/mset1bulb.htm\n        if( 256.0*c2*c2 - 96.0*c2 + 32.0*c.x - 3.0 < 0.0 ) return 0.0;\n        // skip computation inside M2 - http://iquilezles.org/www/articles/mset_2bulb/mset2bulb.htm\n        if( 16.0*(c2+2.0*c.x+1.0) - 1.0 < 0.0 ) return 0.0;\n    }\n\n    float l = 0.0;\n    vec2 z  = vec2(0.0);\n    for( int i=0; i<MAXI; i++ )\n    {\n        z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;\n        if( dot(z,z)>(B*B) ) break;\n        l += 1.0;\n    }\n\n    // maxed out iterations\n    if( l>float(MAXI)-1.0 ) return 0.0;\n    \n    // optimized smooth interation count\n    l = l - log2(log2(dot(z,z))) + 4.0;\n\n    return l;\n}\n\nvoid main() {    \n    // set the initial colour to black\n    vec3 col = vec3(0.0);\n\n    // anti-aliasing\n    #if AA>1\n    for( int m=0; m<AA; m++ )\n    for( int n=0; n<AA; n++ )\n    {\n        // vec2 p = (-iResolution.xy + 2.0*(fragCoord.xy+vec2(float(m),float(n))/float(AA)))/iResolution.y;\n        vec2 p = (2.0*(gl_FragCoord.xy + vec2(float(m), float(n)) / float(AA) ) - resolution.xy)/resolution.y;\n        float w = float(AA*m+n);\n    #else    \n        // adjust pixels to range from [-1, 1]\n        vec2 p = (2.0*gl_FragCoord.xy - resolution.xy)/resolution.y;\n    #endif\n\n    // c is based on offset and grid position, z_0 = 0\n    vec2 c = u_pos + p/u_zoom;\n    \n    float l = mandelbrot(c);\n    col += 0.5 + 0.5*cos( 3.0 + l*0.15 + vec3(0.0,0.6,1.0));\n\n    // antialiasing\n    #if AA>1\n    }\n    col /= float(AA*AA);\n    #endif\n\n    // add crosshair\n    if (crosshair(gl_FragCoord.x, gl_FragCoord.y)) {\n        col = 1. - col;\n    }\n\n    // Output to screen\n    gl_FragColor = vec4( col, 1.0 );\n}\n')},h=t(2),z=t(32),E={position:{numComponents:3,data:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]}},y=t(37),x=o.a.forwardRef(function(e,n){var t=e.mini,r=void 0!==t&&t,i=Object(h.a)(e,["mini"]),c=i.glRef,l=Object(a.useRef)(null),s=Object(a.useRef)(null),u=Object(a.useRef)(null),m=i.u,f=i.fps,d=r?function(){return 1}:function(){return i.u.zoom.getValue()},p=Object(a.useRef)(d),g=i.dpr||1;Object(a.useEffect)(function(){p.current=i.u.zoom.getValue()},[i.u]),Object(a.useEffect)(function(){c.current=n.current.getContext("webgl"),s.current=z.a(c.current,E)},[c,n]);var v=Object(a.useRef)(0),x=Object(a.useRef)(0),j=Object(a.useRef)(0),w=Object(a.useCallback)(function(e){z.d(c.current.canvas,g),c.current.viewport(0,0,c.current.canvas.width,c.current.canvas.height);var n={resolution:[c.current.canvas.width,c.current.canvas.height],u_zoom:d(),u_c:void 0===m.c?0:m.c.getValue().map(function(e){return e*m.screenScaleMultiplier}),u_pos:Object(y.scale)(m.pos.getValue(),m.screenScaleMultiplier),u_maxI:m.maxI};c.current.useProgram(u.current.program),z.e(c.current,u.current,s.current),z.f(u.current,n),z.c(c.current,s.current),void 0!==f&&(x.current++,j.current+=e-v.current,v.current=e,j.current>=1e3&&(f((x.current*(1e3/j.current)).toFixed(1)),x.current=0,j.current-=1e3)),l.current=requestAnimationFrame(w)},[c,m,d,g,f,1e3]);return Object(a.useEffect)(function(){u.current=z.b(c.current,["\nattribute vec4 position;\n\nvoid main() {\n  gl_Position = position;\n}\n",i.fragShader])},[c,i.fragShader]),Object(a.useEffect)(function(){return l.current=requestAnimationFrame(w),function(){return cancelAnimationFrame(l.current)}},[w]),o.a.createElement(b.a.canvas,{id:i.id,className:"renderer",ref:n})});function j(e){var n=e.domTarget,t=e.posControl,a=e.zoomControl,o=e.screenScaleMultiplier,r=e.gl,i=Object(c.a)(t,2),l=i[0].pos,s=i[1],u=Object(c.a)(a,2),m=u[0],f=m.zoom,d=m.minZoom,b=m.maxZoom,v=u[1];return{binds:{onDragStart:function(e){return e.event.preventDefault()},onPinchStart:function(e){return e.event.preventDefault()},onPinch:function(e){var n=Object(c.a)(e.vdva,1)[0],t=e.down,a=Object(c.a)(e.delta,1)[0],o=e.origin,r=e.first,i=e.memo,s=void 0===i?[l.getValue()]:i,u=e.z,m=void 0===u?f.getValue():u;if(r)return[Object(c.a)(s,1)[0],o];var g=m*(1+.005*a),h=p.a.clamp(g,d.getValue(),b.getValue());return v({zoom:h,immediate:t,config:{velocity:10*n}}),s},onWheel:function(e){var n=Object(c.a)(e.movement,2)[1],t=e.active,a=e.z,o=void 0===a?f.getValue():a,r=o*(1-n*(n<0?3e-4:2e-4));return v({zoom:p.a.clamp(r,d.getValue(),b.getValue()),immediate:t,config:{}}),o},onDrag:function(e){var n=e.down,t=e.movement,a=e.velocity,i=e.direction,c=e.pinching,u=e.memo,m=void 0===u?l.getValue():u;if(!c){var d=r.current.canvas.height*f.getValue()*o,p=Object(y.scale)(t,-2/d),b=[p[0],-p[1]],v=[i[0],-i[1]];return s({pos:Object(g.a)(m,b),immediate:n,config:{velocity:Object(y.scale)(v,-a/d),decay:!0}}),m}}},config:{event:{passive:!1,capture:!1},domTarget:n}}}function w(e){var n=Object(a.useRef)(null),t=Object(a.useRef)(null),r=Object(a.useRef)(null),i=Object(a.useRef)(null),l=e.screenmult,s=Object(c.a)(e.controls.pos,1)[0].pos,u=Object(c.a)(e.controls.zoom,2),f=u[0].zoom,d=u[1],h=e.maxiter,z=e.aa?2:1,E=v({maxI:h,AA:z}),y=v({maxI:h,AA:2},{stroke:1,radius:30}),w=j({domTarget:n,posControl:e.controls.pos,zoomControl:e.controls.zoom,screenScaleMultiplier:l/e.dpr,gl:r}),O=Object(g.b)(w.binds,w.config);Object(a.useEffect)(O,[O]);var A=Object(a.useState)(0),_=Object(c.a)(A,2),S=_[0],C=_[1];return o.a.createElement("div",{className:"renderer",style:{position:"relative"}},e.showFps?o.a.createElement(m.a,{style:{position:"absolute",top:0,left:0,padding:4,margin:4}},o.a.createElement(b.a.div,{style:{fontFamily:"monospace"}},S)):null,o.a.createElement(x,{id:"mandelbrot",fragShader:E,dpr:e.dpr,touchBind:O,u:{zoom:f,pos:s,maxI:h,screenScaleMultiplier:l},ref:n,glRef:r,fps:C}),e.enableMini?o.a.createElement(b.a.div,{style:{position:"absolute",zIndex:2,margin:"0.5rem",left:0,bottom:0,height:e.miniSize[0],width:e.miniSize[0],borderRadius:e.miniSize[0],boxShadow:"0px 2px 10px 1px rgba(0, 0, 0, 0.4)",overflow:"hidden",opacity:f.interpolate(function(e){return p.a.clamp(e-1,0,1)}),display:f.interpolate(function(e){return 0===p.a.clamp(e-1,0,1)?"none":"block"})},onClick:function(){return d({zoom:1})}},o.a.createElement(x,{id:"mini-mandelbrot",fragShader:y,dpr:e.dpr,u:{zoom:f,pos:s,maxI:h,screenScaleMultiplier:l},ref:t,glRef:i,mini:!0})):o.a.createElement("div",null))}var O=function(e){var n=e.maxI,t=void 0===n?300:n,a=e.AA,o=void 0===a?1:a,r=e.B,i=void 0===r?64:r;return"\n\n#define AA ".concat(o,"\n#define MAXI ").concat(t,"\n#define B ").concat(i.toFixed(1),'\n\n// set high float precision (lower than this may break colours on mobile)\nprecision highp float;\n\n// need to know the resolution of the canvas\nuniform vec2 resolution;\n\n// properties should be passed as uniforms\nuniform int   u_maxI;\nuniform vec2  u_pos;\nuniform vec2  u_c;\nuniform float u_zoom;\nuniform float u_theta;\n\nfloat julia( vec2 z, vec2 c ) {\n\n  float l = 0.0;\n  for( int i=0; i<MAXI; i++ )\n  {\n      z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;\n      if( dot(z,z)>(B*B) ) break;\n      l += 1.0;\n  }\n\n  // maxed out iterations\n  if( l>float(MAXI)-1.0 ) return 0.0;\n\n  // equivalent optimized smooth interation count\n  l = l - log2(log2(dot(z,z))) + 4.0;\n\n  return l;\n}\n\nvoid main() {    \n  // set the initial colour to black\n  vec3 col = vec3(0.0);\n\n  // anti-aliasing\n  #if AA>1\n  for( int m=0; m<AA; m++ )\n  for( int n=0; n<AA; n++ )\n  {\n      vec2 p = (2.0*(gl_FragCoord.xy + vec2(float(m), float(n)) / float(AA) ) - resolution.xy)/resolution.y;\n      float w = float(AA*m+n);\n  #else    \n      // adjust pixels to range from [-1, 1]\n      vec2 p = (2.0*gl_FragCoord.xy - resolution.xy)/resolution.y;\n  #endif\n  \n  // constant "c" to add, based on mandelbrot position\n  vec2 c = u_c;\n  vec2 z = u_pos + p/u_zoom;\n\n  float l = julia(z, c);\n  col += 0.5 + 0.5*cos( 3.0 + l*0.15 + vec3(0.0,0.6,1.0));\n\n  // antialiasing\n  #if AA>1\n  }\n  col /= float(AA*AA);\n  #endif\n\n  // Output to screen\n  gl_FragColor = vec4( col, 1.0 );\n}\n')};function A(e){var n=Object(a.useRef)(null),t=Object(a.useRef)(null),r=Object(a.useRef)(null),i=Object(a.useRef)(null),l=e.screenmult,s=Object(c.a)(e.controls.pos,1)[0].pos,u=Object(c.a)(e.controls.zoom,2),m=u[0].zoom,f=u[1],d=e.maxiter,v=e.aa?2:1,h=O({maxI:d,AA:v}),z=O({maxI:d,AA:2}),E=j({domTarget:n,posControl:e.controls.pos,zoomControl:e.controls.zoom,screenScaleMultiplier:l/e.dpr,gl:r}),y=Object(g.b)(E.binds,E.config);return Object(a.useEffect)(y,[y]),o.a.createElement("div",{className:"renderer",style:{position:"relative"}},o.a.createElement(x,{id:"julia",fragShader:h,dpr:e.dpr,u:{zoom:m,pos:s,c:e.c,maxI:d,screenScaleMultiplier:l},ref:n,glRef:r}),e.enableMini?o.a.createElement(b.a.div,{style:{position:"absolute",zIndex:2,margin:20,left:0,bottom:0,height:e.miniSize[0],width:e.miniSize[0],borderRadius:e.miniSize[0],boxShadow:"0px 2px 10px 1px rgba(0, 0, 0, 0.4)",overflow:"hidden",opacity:m.interpolate(function(e){return p.a.clamp(e-1,0,1)}),display:m.interpolate(function(e){return 0===p.a.clamp(e-1,0,1)?"none":"block"})},onClick:function(){return f({zoom:1})}},o.a.createElement(x,{id:"mini-mandelbrot",fragShader:z,dpr:e.dpr,u:{zoom:m,pos:s,c:e.c,maxI:d,screenScaleMultiplier:l},ref:t,glRef:i,mini:!0})):o.a.createElement("div",null))}var _=t(128),S=t(120),C=t(121),k=t(92),I=t(143),R=t(124),M=t(125),F=t(126),B=t(127),V=t(59),N=t.n(V),T=t(61),q=t.n(T),D=t(60),L=t.n(D),P=Object(S.a)(function(e){return{root:{position:"absolute",bottom:e.spacing(2),right:e.spacing(2),display:"flex",flexDirection:"column",zIndex:2},button:{marginTop:10},sliderControl:{width:30}}});function X(e){var n=P(),t=o.a.useState(null),a=Object(c.a)(t,2),r=a[0],i=a[1];return o.a.createElement("div",{className:n.root},o.a.createElement(C.a,{"aria-controls":"menu",size:"small","aria-haspopup":"true",onClick:function(e){return i(e.currentTarget)},className:n.button},o.a.createElement(N.a,null)),o.a.createElement(k.a,{open:Boolean(r)},o.a.createElement(I.a,{id:"simple-menu",anchorEl:r,keepMounted:!0,open:Boolean(r),onClose:function(){return i(null)},anchorOrigin:{horizontal:"right",vertical:"bottom"},transformOrigin:{vertical:"bottom",horizontal:"right"}},o.a.createElement(u.a,{container:!0,direction:"column",style:{paddingLeft:"1.5em",paddingRight:"1.5em",paddingTop:"1em",paddingBottom:"1em"}},o.a.createElement(u.a,{item:!0,container:!0,alignItems:"center",justify:"space-around"},o.a.createElement(u.a,{item:!0},o.a.createElement(f.a,{variant:"h1",style:{fontSize:20,paddingLeft:20,paddingRight:20}},"Configuration")),o.a.createElement(R.a,{orientation:"vertical",flexItem:!0}),o.a.createElement(u.a,{item:!0},o.a.createElement(M.a,{"aria-label":"info",size:"medium",onClick:function(){e.toggleInfo(),i(null)}},o.a.createElement(L.a,{fontSize:"inherit"})))),e.settings.map(function(e){return o.a.createElement(u.a,{item:!0,key:e.title},o.a.createElement(R.a,{style:{marginTop:10,marginBottom:4}}),o.a.createElement(f.a,{variant:"overline",style:{fontSize:14,marginBottom:4}},e.title),o.a.createElement(F.a,null,Object.values(e.items).map(function(e){return o.a.createElement(B.a,{label:e.name,key:e.name,control:e.ctrl,labelPlacement:e.placement?e.placement:"end",style:e.placement?{marginLeft:0,marginRight:0}:{}})})))}),o.a.createElement(R.a,{style:{marginTop:10,marginBottom:4}}),o.a.createElement(_.a,{"aria-controls":"reset",onClick:function(){return e.reset()},className:n.button,startIcon:o.a.createElement(q.a,null)},"Reset position")))))}var Z=t(4),W=t(132),J=t(129),G=t(130),H=t(131),U=t(63),Q=t.n(U),$=t(133),K=t(140),Y=t(134),ee=t(66),ne=t(135),te=t(136),ae=t(137),oe=t(138),re=t(139),ie=t(142),ce=t(65),le=t.n(ce),se=t(64),ue=t.n(se),me=t(141),fe=t(62),de=Object(Z.a)(function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}})(function(e){var n=e.children,t=e.classes,a=e.onClose,r=Object(h.a)(e,["children","classes","onClose"]);return o.a.createElement(J.a,Object.assign({disableTypography:!0,className:t.root},r),o.a.createElement(f.a,{variant:"h1",style:{fontSize:30}},n),a?o.a.createElement(M.a,{"aria-label":"close",className:t.closeButton,onClick:a},o.a.createElement(Q.a,null)):null)}),pe=Object(Z.a)(function(e){return{root:{padding:e.spacing(2)}}})(G.a),ge=Object(Z.a)(function(e){return{root:{margin:0,padding:e.spacing(1)}}})(H.a);function be(e){return o.a.createElement(me.a,Object.assign({elevation:6,variant:"filled"},e))}function ve(e){var n=Object(c.a)(e.ctrl,2),t=n[0],r=n[1],i=Object(a.useState)(!1),l=Object(c.a)(i,2),s=l[0],u=l[1],m=function(){return r(!1)},d=window.jscd||{};return o.a.createElement(W.a,{onClose:m,"aria-labelledby":"customized-dialog-title",open:t},o.a.createElement(de,{id:"customized-dialog-title",onClose:m},o.a.createElement("img",{alt:"Mandelbrot Maps logo",width:60,src:"https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"}),"Mandelbrot Maps"),o.a.createElement(pe,{dividers:!0},o.a.createElement(f.a,{gutterBottom:!0},"Mandelbrot Maps is an interactive fractal explorer built using React and WebGL."),o.a.createElement(f.a,{gutterBottom:!0},"Mandelbrot set shader code adapted from ",o.a.createElement($.a,{href:"https://www.shadertoy.com/view/4df3Rn"},"Mandelbrot - smooth")," by ",o.a.createElement($.a,{href:"http://iquilezles.org/",target:"_blank"},"Inigo Quilez"),"."),o.a.createElement(R.a,{style:{marginTop:8,marginBottom:8}}),o.a.createElement(K.a,{style:{display:"flex"}},o.a.createElement(Y.a,{component:ee.a,style:{width:"auto",margin:"auto"}},o.a.createElement(ne.a,{size:"small","aria-label":"a dense table"},o.a.createElement(te.a,null,o.a.createElement(ae.a,null,o.a.createElement(oe.a,{align:"center",colSpan:2,variant:"head"},"Device properties"))),o.a.createElement(re.a,null,Object.entries(d).map(function(e){var n=Object(c.a)(e,2),t=n[0],a=n[1];return o.a.createElement(ae.a,{key:t},o.a.createElement(oe.a,null,t),o.a.createElement(oe.a,{align:"right",style:{fontFamily:"monospace"}},String(a)))})))))),o.a.createElement(ge,null,o.a.createElement(_.a,{onClick:function(){!function(e){try{navigator.clipboard.writeText(e),u(!0)}catch(n){window.prompt("Auto copy to clipboard failed, copy manually from below:",e)}}(JSON.stringify(d))},color:"primary",variant:"outlined",startIcon:o.a.createElement(ue.a,null)},"Copy"),o.a.createElement(ie.a,{open:s,autoHideDuration:5e3,onClose:function(){return u(!1)}},o.a.createElement(be,{onClose:function(){return u(!1)},severity:"info"},"Device properties copied!")),o.a.createElement(_.a,{autoFocus:!0,href:fe.a,color:"primary",variant:"outlined",startIcon:o.a.createElement(le.a,null)},"Feedback")))}var he=function(){var e=function(){var e="object"===typeof window,n=Object(a.useCallback)(function(){return{width:e?window.innerWidth:void 0,height:e?window.innerHeight:void 0}},[e]),t=Object(a.useState)(n),o=Object(c.a)(t,2),r=o[0],i=o[1];return Object(a.useEffect)(function(){if(!e)return function(){};function t(){i(n())}return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}},[n,e]),r}(),n={mass:1,tension:100,friction:200},t=Object(a.useState)(1),r=Object(c.a)(t,2),i=r[0],d=r[1],p=[-.74303,.126433],g=Object(a.useState)(100),v={pos:Object(b.b)(function(){return{pos:p.map(function(e){return e/1e-7}),config:n}}),rot:Object(b.b)(function(){return{theta:0,last_pointer_angle:0,itheta:0,config:n}}),zoom:Object(b.b)(function(){return{zoom:165,last_pointer_dist:0,minZoom:.5,maxZoom:1e5,config:{mass:1,tension:600,friction:50}}})},h={pos:Object(b.b)(function(){return{pos:[0,0],config:n}}),rot:Object(b.b)(function(){return{theta:0,last_pointer_angle:0,itheta:0,config:n}}),zoom:Object(b.b)(function(){return{zoom:.5,last_pointer_dist:0,minZoom:.5,maxZoom:1e5,config:{mass:1,tension:600,friction:50}}})},z={tension:200,friction:75},E={tension:300,friction:60},y=Object(a.useState)(!1),x=Object(c.a)(y,2),j=x[0],O=x[1],_={coords:Object(a.useState)(!1),miniViewer:Object(a.useState)(!0),maxI:Object(a.useState)(250),aa:Object(a.useState)(!1),dpr:Object(a.useState)(!1),fps:Object(a.useState)(!1)},S=function(e){var n=Object(c.a)(e,2),t=n[0];return(0,n[1])(!t)},C=[{title:"Interface",items:{miniViewer:{name:"Mini viewers",ctrl:o.a.createElement(l.a,{color:"primary",checked:_.miniViewer[0],onChange:function(){return S(_.miniViewer)}})},coords:{name:"Show coordinates",ctrl:o.a.createElement(l.a,{color:"primary",checked:_.coords[0],onChange:function(){return S(_.coords)}})}}},{title:"Graphics",items:{iterations:{name:"Iterations",ctrl:o.a.createElement(s.a,{min:5,max:1e3,step:5,defaultValue:250,valueLabelDisplay:"auto",value:_.maxI[0],marks:[{value:5,label:5},{value:250,label:250},{value:500,label:500},{value:750,label:750},{value:1e3,label:1e3}],onChange:function(e,n){return _.maxI[1](n)}}),placement:"top"},dpr:{name:"Use pixel ratio (".concat(window.devicePixelRatio||1,")"),ctrl:o.a.createElement(l.a,{checked:_.dpr[0],color:"primary",onChange:function(){var e=!_.dpr[0];d(e?window.devicePixelRatio:1),_.dpr[1](e)}})},aa:{name:"Anti-aliasing (slow)",ctrl:o.a.createElement(l.a,{color:"primary",checked:_.aa[0],onChange:function(){return S(_.aa)}})},fps:{name:"Show fps",ctrl:o.a.createElement(l.a,{color:"primary",checked:_.fps[0],onChange:function(){return S(_.fps)}})}}}];return o.a.createElement(u.a,{container:!0},o.a.createElement(u.a,{item:!0,container:!0,direction:e.width<e.height?"column-reverse":"row",justify:"center",className:"fullSize",style:{position:"absolute"}},o.a.createElement(m.a,{style:{width:"auto",position:"absolute",zIndex:2,right:0,top:0,margin:20,padding:8,display:_.coords[0]?"block":"none"}},o.a.createElement(f.a,{align:"right"},o.a.createElement(b.a.span,null,v.pos[0].pos.interpolate(function(e){return(1e-7*e).toFixed(7)}))," : x",o.a.createElement("br",null),o.a.createElement(b.a.span,null,v.pos[0].pos.interpolate(function(e,n){return(1e-7*n).toFixed(7)}))," : y")),o.a.createElement(u.a,{item:!0,xs:!0,className:"renderer"},o.a.createElement(w,{controls:v,maxiter:_.maxI[0],screenmult:1e-7,miniSize:g,enableMini:_.miniViewer[0],aa:_.aa[0],dpr:i,showFps:_.fps[0]})),o.a.createElement(u.a,{item:!0,xs:!0,className:"renderer"},o.a.createElement(A,{c:v.pos[0].pos,controls:h,maxiter:_.maxI[0],screenmult:1e-7,miniSize:g,enableMini:_.miniViewer[0],aa:_.aa[0],dpr:i}))),o.a.createElement(X,{settings:C,reset:function(){return v.pos[1]({pos:[0,0],config:z}),v.zoom[1]({zoom:1,config:E}),h.pos[1]({pos:[0,0],config:z}),void h.zoom[1]({zoom:1,config:E})},toggleInfo:function(){return O(!j)}}),o.a.createElement(ve,{ctrl:[j,O]}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[77,1,2]]]);
//# sourceMappingURL=main.838207e2.chunk.js.map
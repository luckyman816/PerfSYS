"use strict";(self.webpackChunkdeveloper_management_system=self.webpackChunkdeveloper_management_system||[]).push([[351],{91441:function(e,r,n){n.d(r,{Z:function(){return o}});var i=n(29439),t=n(20101),s=n(39705),a=n(46417);function o(e){var r,n,o,l,d=e.children,c=e.type,u=void 0===c?"scale":c,h=e.direction,p=void 0===h?"right":h,m=e.offset,x=void 0===m?10:m,Z=e.scale,g=void 0===Z?{hover:1.05,tap:.954}:Z;switch(p){case"up":case"left":o=x,l=0;break;default:o=0,l=x}var v=(0,t.n)(o,l),j=(0,i.Z)(v,2),f=j[0],y=j[1],L=(0,t.n)(o,l),b=(0,i.Z)(L,2),w=b[0],P=b[1];switch(u){case"rotate":return(0,a.jsx)(s.E.div,{animate:{rotate:360},transition:{repeat:1/0,repeatType:"loop",duration:2,repeatDelay:0},children:d});case"slide":return"up"===p||"down"===p?(0,a.jsx)(s.E.div,{animate:{y:void 0!==w?w:""},onHoverEnd:function(){return P()},onHoverStart:function(){return P()},children:d}):(0,a.jsx)(s.E.div,{animate:{x:void 0!==f?f:""},onHoverEnd:function(){return y()},onHoverStart:function(){return y()},children:d});default:return"number"===typeof g&&(g={hover:g,tap:g}),(0,a.jsx)(s.E.div,{whileHover:{scale:null===(r=g)||void 0===r?void 0:r.hover},whileTap:{scale:null===(n=g)||void 0===n?void 0:n.tap},children:d})}}},6351:function(e,r,n){n.r(r),n.d(r,{default:function(){return z}});var i=n(2135),t=n(9019),s=n(42832),a=n(61113),o=n(1229),l=n(47721),d=n(74165),c=n(45987),u=n(15861),h=n(29439),p=n(47313),m=n(15103),x=n(49914),Z=n(15480),g=n(41727),v=n(1550),j=n(9506),f=n(69099),y=n(21933),L=n(35604),b=n(6977),w=n(91441),P=n(79581),k=n(1129),C=n(82050),B=n(31741),H=n(44874),q=n(46417),E=["submit"],S=function(){var e=(0,o.Z)().register,r=(0,P.I0)(),n=(0,p.useState)(),i=(0,h.Z)(n,2),l=i[0],S=i[1],z=(0,p.useState)(!1),_=(0,h.Z)(z,2),R=_[0],I=_[1],M=function(){I(!R)},W=function(e){e.preventDefault()},D=function(e){var r=(0,C.X)(e);S((0,C.V)(r))};return(0,p.useEffect)((function(){D("")}),[]),(0,q.jsx)(q.Fragment,{children:(0,q.jsx)(L.J9,{initialValues:{username:"",realname:"",pcpassword:"",netkeyid:"",password:"",groupid:1,birthday:"",submit:null},validationSchema:y.Ry().shape({username:y.Z_().max(255).required("User Name is required"),realname:y.Z_().max(255).required("Real Name is required"),pcpassword:y.Z_().max(255).required("PC-password is required"),netkeyid:y.Z_().max(255).required("NetKeyID is required"),birthday:y.hT().required("Birthday is required"),password:y.Z_().max(255).required("Password is required"),groupid:y.Rx().max(100).required("GroupID must between 0-100").min(0).required("GroupID must between 1-10")}),onSubmit:function(){var n=(0,u.Z)((0,d.Z)().mark((function n(i,t){var s;return(0,d.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.setErrors,t.setStatus,t.setSubmitting,i.submit,s=(0,c.Z)(i,E);try{e(s)}catch(a){r((0,k.ss)({open:!0,message:a.errors[0].msg,variant:"alert",alert:{color:"error"},close:!1}))}case 3:case"end":return n.stop()}}),n)})));return function(e,r){return n.apply(this,arguments)}}(),children:function(e){var r=e.errors,n=e.handleBlur,i=e.handleChange,o=e.handleSubmit,d=e.isSubmitting,c=e.touched,u=e.values;return(0,q.jsx)("form",{noValidate:!0,onSubmit:o,children:(0,q.jsxs)(t.ZP,{container:!0,spacing:3,children:[(0,q.jsx)(t.ZP,{item:!0,xs:12,md:6,children:(0,q.jsxs)(s.Z,{spacing:1,children:[(0,q.jsx)(m.Z,{htmlFor:"username-signup",children:"User Name*"}),(0,q.jsx)(x.Z,{id:"username-signup",type:"username",value:u.username,name:"username",onBlur:n,onChange:i,placeholder:"John",fullWidth:!0,error:Boolean(c.username&&r.username)}),c.username&&r.username&&(0,q.jsx)(Z.Z,{error:!0,id:"helper-text-username-signup",children:r.username})]})}),(0,q.jsx)(t.ZP,{item:!0,xs:12,md:6,children:(0,q.jsxs)(s.Z,{spacing:1,children:[(0,q.jsx)(m.Z,{htmlFor:"realname-signup",children:"Real Name*"}),(0,q.jsx)(x.Z,{fullWidth:!0,error:Boolean(c.realname&&r.realname),id:"realname-signup",type:"realname",value:u.realname,name:"realname",onBlur:n,onChange:i,placeholder:"Doe",inputProps:{}}),c.realname&&r.realname&&(0,q.jsx)(Z.Z,{error:!0,id:"helper-text-realname-signup",children:r.realname})]})}),(0,q.jsxs)(t.ZP,{item:!0,xs:12,children:[(0,q.jsxs)(s.Z,{spacing:1,children:[(0,q.jsx)(m.Z,{htmlFor:"password-signup",children:"Password*"}),(0,q.jsx)(x.Z,{fullWidth:!0,error:Boolean(c.password&&r.password),id:"password-signup",type:R?"text":"password",value:u.password,name:"password",onBlur:n,onChange:function(e){i(e),D(e.target.value)},endAdornment:(0,q.jsx)(g.Z,{position:"end",children:(0,q.jsx)(b.Z,{"aria-label":"toggle password visibility",onClick:M,onMouseDown:W,edge:"end",color:"secondary",children:R?(0,q.jsx)(B.Z,{}):(0,q.jsx)(H.Z,{})})}),placeholder:"******",inputProps:{}}),c.password&&r.password&&(0,q.jsx)(Z.Z,{error:!0,id:"helper-text-password-signup",children:r.password})]}),(0,q.jsx)(v.Z,{fullWidth:!0,sx:{mt:2},children:(0,q.jsxs)(t.ZP,{container:!0,spacing:2,alignItems:"center",children:[(0,q.jsx)(t.ZP,{item:!0,children:(0,q.jsx)(j.Z,{sx:{bgcolor:null===l||void 0===l?void 0:l.color,width:85,height:8,borderRadius:"7px"}})}),(0,q.jsx)(t.ZP,{item:!0,children:(0,q.jsx)(a.Z,{variant:"subtitle1",fontSize:"0.75rem",children:null===l||void 0===l?void 0:l.label})})]})})]}),(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsxs)(s.Z,{spacing:1,children:[(0,q.jsx)(m.Z,{htmlFor:"netkeyid-signup",children:"NetKeyID*"}),(0,q.jsx)(x.Z,{fullWidth:!0,error:Boolean(c.netkeyid&&r.netkeyid),id:"netkeyid-signup",value:u.netkeyid,name:"netkeyid",onBlur:n,onChange:i,placeholder:"abc0123456",inputProps:{}}),c.netkeyid&&r.netkeyid&&(0,q.jsx)(Z.Z,{error:!0,id:"helper-text-netkeyid-signup",children:r.netkeyid})]})}),(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsxs)(s.Z,{spacing:1,children:[(0,q.jsx)(m.Z,{htmlFor:"pcpassword-signup",children:"PC-Password*"}),(0,q.jsx)(x.Z,{fullWidth:!0,error:Boolean(c.pcpassword&&r.pcpassword),id:"pcpassword-signup",type:"password",value:u.pcpassword,name:"pcpassword",onBlur:n,onChange:i,placeholder:"*******",inputProps:{}}),c.pcpassword&&r.pcpassword&&(0,q.jsx)(Z.Z,{error:!0,id:"helper-text-pcpassword-signup",children:r.pcpassword})]})}),(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsxs)(s.Z,{spacing:1,children:[(0,q.jsx)(m.Z,{htmlFor:"birthday-signup",children:"Birthday*"}),(0,q.jsx)(x.Z,{fullWidth:!0,error:Boolean(c.birthday&&r.birthday),id:"birthday-signup",type:"date",value:u.birthday,name:"birthday",onBlur:n,onChange:i,placeholder:"*******",inputProps:{}}),c.birthday&&r.birthday&&(0,q.jsx)(Z.Z,{error:!0,id:"helper-text-birthday-signup",children:r.birthday})]})}),(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsxs)(s.Z,{spacing:1,children:[(0,q.jsx)(m.Z,{htmlFor:"groupid-signup",children:"GroupID*"}),(0,q.jsx)(x.Z,{fullWidth:!0,error:Boolean(c.groupid&&r.groupid),id:"groupid-signup",type:"number",value:u.groupid,name:"groupid",onBlur:n,onChange:i,placeholder:"******",inputProps:{min:0,max:100}}),c.groupid&&r.groupid&&(0,q.jsx)(Z.Z,{error:!0,id:"helper-text-groupid-signup",children:r.groupid})]})}),r.submit&&(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsx)(Z.Z,{error:!0,children:r.submit})}),(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsx)(w.Z,{children:(0,q.jsx)(f.Z,{disableElevation:!0,disabled:d,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"primary",children:"Create Account"})})})]})})}})})},z=function(){var e=(0,o.Z)().isLoggedIn;return(0,q.jsx)(l.Z,{children:(0,q.jsxs)(t.ZP,{container:!0,spacing:3,children:[(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsxs)(s.Z,{direction:"row",justifyContent:"space-between",alignItems:"baseline",sx:{mb:{xs:-.5,sm:.5}},children:[(0,q.jsx)(a.Z,{variant:"h3",children:"Sign up"}),(0,q.jsx)(a.Z,{component:i.rU,to:e?"/auth/login":"/login",variant:"body1",sx:{textDecoration:"none"},color:"primary",children:"Already have an account?"})]})}),(0,q.jsx)(t.ZP,{item:!0,xs:12,children:(0,q.jsx)(S,{})})]})})}},47721:function(e,r,n){n.d(r,{Z:function(){return y}});var i=n(9506),t=n(9019),s=n(24813),a=n(47825),o=n(42832),l=n(61113),d=n(90891),c=n(46417),u=function(){var e=(0,s.Z)((function(e){return e.breakpoints.down("sm")}));return(0,c.jsx)(a.Z,{maxWidth:"xl",children:(0,c.jsxs)(o.Z,{direction:e?"column":"row",justifyContent:e?"center":"space-between",spacing:2,textAlign:e?"center":"inherit",children:[(0,c.jsxs)(l.Z,{variant:"subtitle2",color:"secondary",component:"span",children:["This site is protected by"," ",(0,c.jsx)(l.Z,{component:d.Z,variant:"subtitle2",href:"#mantis-privacy",target:"_blank",underline:"hover",children:"Privacy Policy"})]}),(0,c.jsxs)(o.Z,{direction:e?"column":"row",spacing:e?1:3,textAlign:e?"center":"inherit",children:[(0,c.jsx)(l.Z,{variant:"subtitle2",color:"secondary",component:d.Z,href:"https://codedthemes.com",target:"_blank",underline:"hover",children:"Terms and Conditions"}),(0,c.jsx)(l.Z,{variant:"subtitle2",color:"secondary",component:d.Z,href:"https://codedthemes.com",target:"_blank",underline:"hover",children:"Privacy Policy"}),(0,c.jsx)(l.Z,{variant:"subtitle2",color:"secondary",component:d.Z,href:"https://codedthemes.com",target:"_blank",underline:"hover",children:"CA Privacy Notice"})]})]})})},h=n(18283),p=n(1413),m=n(45987),x=n(20423),Z=["children"],g=function(e){var r=e.children,n=(0,m.Z)(e,Z);return(0,c.jsx)(x.Z,(0,p.Z)((0,p.Z)({sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{border:!1,boxShadow:!0,shadow:function(e){return e.customShadows.z1},children:(0,c.jsx)(i.Z,{sx:{p:{xs:2,sm:3,md:4,xl:5}},children:r})}))},v=n(19860),j=n(31491),f=function(){var e=(0,v.Z)();return(0,c.jsx)(i.Z,{sx:{position:"absolute",filter:"blur(18px)",zIndex:-1,bottom:0,transform:e.direction===j.xk.RTL?"rotate(180deg)":"inherit"},children:(0,c.jsxs)("svg",{width:"100%",height:"calc(100vh - 175px)",viewBox:"0 0 405 809",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,c.jsx)("path",{d:"M-358.39 358.707L-293.914 294.23L-293.846 294.163H-172.545L-220.81 342.428L-233.272 354.889L-282.697 404.314L-276.575 410.453L0.316589 687.328L283.33 404.314L233.888 354.889L230.407 351.391L173.178 294.163H294.48L294.547 294.23L345.082 344.765L404.631 404.314L0.316589 808.629L-403.998 404.314L-358.39 358.707ZM0.316589 0L233.938 233.622H112.637L0.316589 121.301L-112.004 233.622H-233.305L0.316589 0Z",fill:e.palette.primary.light}),(0,c.jsx)("path",{d:"M-516.39 358.707L-451.914 294.23L-451.846 294.163H-330.545L-378.81 342.428L-391.272 354.889L-440.697 404.314L-434.575 410.453L-157.683 687.328L125.33 404.314L75.8879 354.889L72.4068 351.391L15.1785 294.163H136.48L136.547 294.23L187.082 344.765L246.631 404.314L-157.683 808.629L-561.998 404.314L-516.39 358.707ZM-157.683 0L75.9383 233.622H-45.3627L-157.683 121.301L-270.004 233.622H-391.305L-157.683 0Z",fill:e.palette.success.light,opacity:"0.6"}),(0,c.jsx)("path",{d:"M-647.386 358.707L-582.91 294.23L-582.842 294.163H-461.541L-509.806 342.428L-522.268 354.889L-571.693 404.314L-565.571 410.453L-288.68 687.328L-5.66624 404.314L-55.1082 354.889L-58.5893 351.391L-115.818 294.163H5.48342L5.5507 294.23L56.0858 344.765L115.635 404.314L-288.68 808.629L-692.994 404.314L-647.386 358.707ZM-288.68 0L-55.0578 233.622H-176.359L-288.68 121.301L-401 233.622H-522.301L-288.68 0Z",fill:e.palette.error.lighter,opacity:e.palette.mode===j.hY.DARK?"0.9":"1"})]})})},y=function(e){var r=e.children;return(0,c.jsxs)(i.Z,{sx:{minHeight:"100vh"},children:[(0,c.jsx)(f,{}),(0,c.jsxs)(t.ZP,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[(0,c.jsx)(t.ZP,{item:!0,xs:12,sx:{ml:3,mt:3},children:(0,c.jsx)(h.Z,{})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,children:(0,c.jsx)(t.ZP,{item:!0,xs:12,container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:{xs:"calc(100vh - 210px)",sm:"calc(100vh - 134px)",md:"calc(100vh - 112px)"}},children:(0,c.jsx)(t.ZP,{item:!0,children:(0,c.jsx)(g,{children:r})})})}),(0,c.jsx)(t.ZP,{item:!0,xs:12,sx:{m:3,mt:1},children:(0,c.jsx)(u,{})})]})]})}},82050:function(e,r,n){n.d(r,{V:function(){return i},X:function(){return t}});var i=function(e){return e<2?{label:"Poor",color:"error.main"}:e<3?{label:"Weak",color:"warning.main"}:e<4?{label:"Normal",color:"warning.dark"}:e<5?{label:"Good",color:"success.main"}:e<6?{label:"Strong",color:"success.dark"}:{label:"Poor",color:"error.main"}},t=function(e){var r=0;return e.length>5&&(r+=1),e.length>7&&(r+=1),function(e){return new RegExp(/[0-9]/).test(e)}(e)&&(r+=1),function(e){return new RegExp(/[!#@$%^&*)(+=._-]/).test(e)}(e)&&(r+=1),function(e){return new RegExp(/[a-z]/).test(e)&&new RegExp(/[A-Z]/).test(e)}(e)&&(r+=1),r}},44874:function(e,r,n){n.d(r,{Z:function(){return l}});var i=n(1413),t=n(47313),s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"},a=n(20262),o=function(e,r){return t.createElement(a.Z,(0,i.Z)((0,i.Z)({},e),{},{ref:r,icon:s}))};o.displayName="EyeInvisibleOutlined";var l=t.forwardRef(o)},31741:function(e,r,n){n.d(r,{Z:function(){return l}});var i=n(1413),t=n(47313),s={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},a=n(20262),o=function(e,r){return t.createElement(a.Z,(0,i.Z)((0,i.Z)({},e),{},{ref:r,icon:s}))};o.displayName="EyeOutlined";var l=t.forwardRef(o)}}]);
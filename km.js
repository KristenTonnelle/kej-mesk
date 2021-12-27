var lizh =  ['A','A','A','A','A','A','A','A','A','A','A','A','A','A','A',
			'B','B','B','B','B','B','B','C','C','C','Ç','Ç','Ç',
			'D','D','D','D','D','D','D','D','D','D',
			'E','E','E','E','E','E','E','E','E','E','E','E',
			'E','E','E','E','E','E','E','E','E','E','E','E',
			'F','F','F','G','G','G','G','G','H','H','H','H',
			'I','I','I','I','J','J','K','K','K','K','K','K','K','K',	
			'L','L','L','L','L','L','L','L','L','L','L','M','M','M','M',
			'N','N','N','N','N','N','N','N','N','N','N','N','N','N',
			'Ñ','Ñ','Ñ','Ñ','Ñ','O','O','O','O','O','O','O','O','O','O','O',
			'P','P','P','P','P','R','R','R','R','R','R','R','R','R',
			'R','R','R','R','R','S','S','S','S','S','S','S','T','T',
			'T','T','T','T','T','T','T','T','T','U','U','U','U','U',
			'U','U','U','Ù','Ù','Ù','Ù','Ù','V','V','V','V','V',
			'W','W','W','Y','Y','Y','Z','Z','Z','Z','Z','Z'];		
	
var geriadur = []; 
var ger = '';	
var kinnig = [];
var tuiou = [-5, -4, -3, -1, 1, 3, 4, 5];
var busy = [];
var provo = [];
var da_gavout = [];
var bet_kavet = [];
var kudenn = [];
var hir_provo = 3;
var kavet = 0;
var chom = 0;
var taol_nv = 0;
var gwenn = [];
var diskouezet = 0;
var scores = [];
var live = 0;
var liveou = [3,4,5];
var live_skr = ['AES ', 'DIAES ', 'DIAOULEK ']; 
let kudennou_kent = [];
let kudenn_diwezha = [];
let kudenn_eil_diwezha = [];
/*
merañ ar bouton a ginnig ar sterniadur
*/
let deferredPrompt;
const installButton  = document.getElementById("install_button");

window.addEventListener ("beforeinstallprompt", e => {
	e.preventDefault();
	deferredPrompt = e;
	installButton.hidden = false;
	installButton.addEventListener("click", installApp);
});

function installApp() {
	deferredPrompt.prompt();
	installButton.disabled = true;
	deferredPrompt.userChoice.then (choiceResult => {
		if (choiceResult.outcome === "accepted") {
			installButton.hidden = true;
		}
		installButton.disabled = false;
		deferredPrompt = null;
	});
}

/*
diskas gwir mard ema an div gell a & b stok-ha-stok ; gaou mod all
*/
function ok(a, b) {
if ((b > - 1) && (b < 16) && (Math.abs((a % 4) - (b % 4)) != 3))
{return true;} else {return false;}
}

/*
diskas 1 ma c'h a d'ober 'ger' lizherennoù kenta ur poz er geriadur ; mod all
ma'z a d'ober ar poz en e bezh ez eo ouzhpennet d'an daolennad 'da_gavout'
*/
function dico(){
var respont = 0;
var max = geriadur.length;
var min = 0;
var hirder = ger.length;
do
{
 var kreiz = Math.floor ((max + min) / 2);
 var gerig = geriadur[kreiz].substring (0, hirder);
 if (ger == gerig) {
   respont = 1;
   e_barzh = geriadur.indexOf(ger);
   if ((e_barzh > -1) && (hirder_gwir(ger) >= liveou[live])) {da_gavout.push (ger);}
  }	
 if (ger > gerig) {min = kreiz;}
 if (ger < gerig) {max = kreiz;}
}
while ((max - min > 1) && (respont == 0));
return respont;
}

/*
merkout ar c'hilli ha n'int ket vak ken
*/
function set_busy(tra){
busy=[];
for (t=0 ; t < 16 ; t++) { arg = false;	busy[busy.length]=arg;}
lengz= tra.length;
for (c= 0 ; c < lengz ; c++){
 aman=tra[c];
 busy[aman]=true;
 }
}

/*
diwar an taolennad enni elfennoù n o hirder,
klask sevel un daolennad nevez enni elfennoù a hirder n + 1
*/
function da_heul (taol){ 
 hir = taol.length;	
 set_busy (taol);
 x = taol [hir - 1];					// an hini diwezha
 for (a= 0 ; a < 8 ; a++){				// war pep tu
 y=	x + tuiou[a];
 if ((ok (x,y)) && (!busy[y])){
  taol[taol.length]=y;					// ouzhpenna ul lizherenn 
  ger='';
  for (k = 0 ; k < (hir + 1) ; k++) {
   h = taol [k]; lizherenn = kinnig [h];
   ger = ger + lizherenn;}
  if (dico () > 0) {provo.push.apply (provo, taol);}
  taol.pop();							// lemel al lizherenn ouzhpennet
  }
 }
}

/*
adtap an daolennad krouet a-us gant 'da-heul', hag he laka e stumm
evit beza kaset en-dro
*/
function echui(){
 while (provo.length > 0){
 hedad =[];
 provo2 = $.merge([],provo);
 provo=[];
 var max = (provo2.length) / hir_provo;
 for (s = 0 ; s < max ; s++)
  {hedad = provo2.splice (0, hir_provo);
   da_heul (hedad);
  }
 hir_provo++; 
 }
}

/*
aoza an daolennad daouadoù diazez
*/
function klask(){
var tab= [];
for (i = 0 ; i < 16 ; i++) {
 for (j = 0 ; j < 8 ; j++) {
 q = i + tuiou [j];
 if (ok(i,q)){
  ger = kinnig [i]; ger += kinnig [q];
  if (dico() > 0) {
   tab [0] = i; tab [1] = q;
   da_heul (tab);
   }
  }
 }
}
echui();
kudenn = [... new Set (da_gavout)];
kudenn.sort(function (a, b) {return a.localeCompare(b);});
}
	
function kinnig_all() {
$('#kael p').css("color", "grey").css("font-weight", "normal").css("cursor", "pointer");
taol_nv = 0;
gwenn.length = 0;
$('#respont p:first-child').text('');
var warraok = document.getElementById("prog");
warraok.value= kavet;
warraok.max = chom;
}

function kemm(kaset){
var adkas = '';
switch (kaset) {
 case 'C':adkas = 'CH'; break;
 case 'Ç':adkas = "C'H"; break;
 case 'Ù':adkas = 'OÙ'; break;
 default :adkas = kaset;
 }
return adkas;
}

function kemennadur (){
var txt = kavet + ' diwar ' + chom;
$("#kemenn span").text(txt);
}

/* sav un daolenn HTML diwar un array javascript */
function make_table (tabloid, on_off){
var tamm_skrid = "BET ";    
taolennet = '<table>';
$.each(tabloid,function (i, val) {
var modus = i % 4;
switch (modus){
case 0: taolennet += '<tr>';
case 1:
case 2:taolennet += '<td>' + val + '</td>'; break;
case 3:taolennet += '<td>' + val + '</td></tr>';
}
})
taolennet += '</tr></table>';
niver = tabloid.length;
renk = Math.ceil (niver / 4) - 1;
$("#kavadenn").css ("height", 28 + (renk * 25.5));
(on_off == 0) ? tamm_skrid += 'KAVET' : tamm_skrid += "C'HWITET";
tamm_skrid= '<p id="toutouig">' + tamm_skrid + '<p>';    
$("#kavadenn").before(tamm_skrid) ; 
return taolennet;
}

function init() {
/*if (!localStorage.getItem('gertremen')) {document.location.href="https://www.parkallann.bzh/stripped/hezoug.html";}*/

geriaoueg.sort();
kudenn_eil_diwezha = JSON.parse(localStorage.getItem("eil_diwezha_kudenn")) || new Array();
kudenn_diwezha = JSON.parse(localStorage.getItem("diwezha_kudenn")) || new Array();
kudennou_kent = kudenn_diwezha.concat(kudenn_eil_diwezha);
geriadur = geriaoueg.filter(x => !kudennou_kent.includes(x));

$('#nevez').css("display", "none");
$('#live_').css("display", "none");	
$('#stalaf_kloz').css("display", "block");
scores = getHighScores();
if (scores[9]==null)
{for (var j = 0 ; j < 10 ; j++) {scores[j] = "0;--------;01-01-2000";}}
live= getLevel();
$('input:radio[name=rb]')[live].checked = true;
var va_live = document.getElementById('live_');
va_live.innerHTML = "<p>live " + live_skr[live] + "<p>";
do
{
kavet = 0; chom = 0; hir_provo = 3;
bet_kavet = []; kudenn = []; da_gavout = [];
kinnig_all();
	
for (var i = 0 ; i < 16 ; i++){
	kinnig [i] = lizh [Math.floor(Math.random() * 200)];
	var treuz = kemm (kinnig [i]);	
	document.getElementById('kael').getElementsByTagName('p')[i].innerHTML = treuz;
	}
klask();
chom = kudenn.length;}
while (chom < 10);
kudenn_eil_diwezha = kudenn_diwezha; localStorage.setItem("eil_diwezha_kudenn", JSON.stringify(kudenn_eil_diwezha));
kudenn_diwezha = kudenn; localStorage.setItem("diwezha_kudenn", JSON.stringify(kudenn_diwezha));
kemennadur();
$('#digor').css("display","none");
$('#leur').css("display","block");
$("progress").css("visibility", "visible");
}

function da_c_houde() {
//vider table
$('#toutouig').remove();
$('#echu').css("display", "none");
$('#kavadenn').css("opacity", "0").html('');
$('#leur,#traon').css("display","");  
$('#zikour').css("visibility","visible");
$('#betekhenn').css("visibility","hidden");
init();
} 

function dilezel() {	
$('#leur, #traon').css ("display","none");
$.each(kudenn, function(i, poz){
var regExpr;     
regExpr = /C/g; poz = poz.replace (regExpr, 'CH');
regExpr = /Ç/g; poz = poz.replace (regExpr, "C'H");
regExpr = /Ù/g; poz = poz.replace (regExpr, 'OÙ');	 
kudenn [i]= poz;
});	
$("#kavadenn").html (make_table(kudenn, 1));   
$('#kavadenn').css ("opacity","1");
$('#echu').css("display","block");
}

/* klik war ur c'hell*/
$('#kael p').click(function() {
 if (($(this).css("color")=='rgb(0, 128, 0)') || (taol_nv==0)) {
  tra = this.textContent;
  index = $('#kael p').index(this);
  gwenn[gwenn.length]= index;
  $(this).css ("color", "white");
  $('#respont p:first-child').append(tra);
  taol_nv++;
  $('#nevez').css("display", "block");
  $('#live_').css("display", "block");		
  $('#stalaf_kloz').css("display", "none");
  $('#kael p').css("color", "grey");
  $('#kael p').css("cursor", "crosshair");
  $.each(tuiou, function(i, val){
	x = index + val;
	if (ok(index, x))
	 {$("#kael p:eq("+x+")").css("color", "green").css("cursor", "pointer");}
	 });	
  $.each (gwenn, function (i, val){
  $("#kael p:eq("+val+")").css("color", "black").css("font-weight", "bold").css("cursor", "cell");		
  })	
 }
})
/* kas ur ger */
$('#respont p:last-child').click (function(){
ger = $('#respont p:first-child').text();
var gerig = ger;
var va_regExp;
va_regExpr = /CH/g; ger = ger.replace (va_regExpr, 'C');
va_regExpr = /C'H/g; ger = ger.replace (va_regExpr, 'Ç');
va_regExpr = /OÙ/g; ger = ger.replace (va_regExpr, 'Ù');
opala = kudenn.indexOf (ger);
if (opala > -1) {
 kavet++; kemennadur(); kloc_her ('kloc_hig.ogg');
 kudenn.splice (opala, 1);
 bet_kavet[bet_kavet.length]=gerig;
 bet_kavet.sort(function (a, b) {return a.localeCompare(b);});
 if (kavet==1){
 $('#zikour').css("visibility","hidden");
 $('#betekhenn').css ("visibility", "visible");}    
 } else {kloc_her('klogorenn.ogg');}
if (kavet==chom) {
 $('#leur').css ("display", "none");
 $('#kavadenn').css("opacity", "0");
 $('#betekhenn').css("visibility", "hidden");
 if (kavet > parseInt(scores[9])) {addScore(kavet);}
 else {var msg ='</br></br><p class="hi_sco">'+"Deuet eo ganeoc'h !";
       kloc_her ('strakadeg-daouarn.ogg'); $("#digor").html(msg);} 
 $('#zikour').css("visibility","hidden");
 $('#echu').css("display","block");
 $('#digor').css("display", ""); 
 } else {kinnig_all();}
})

$('#betekhenn').click(function() { 
if (diskouezet==0) {
 $('#leur').css ("display","none");
 $("#kavadenn").html (make_table(bet_kavet, 0));
 $('#kavadenn').css ("opacity","1");
 diskouezet = 1;
 } else
 {$('#leur').css ("display","block");
 $('#kavadenn').css ("opacity","0");
 $('#toutouig').remove();
 diskouezet = 0;
 }
})

$('#zikour').click (function() {
 $('#leur').css ("display","none");
 $('#kavadenn').css ("display","none");
 $('#stalaf_kloz').css ("display","none");
 $('#zikour').css("visibility","hidden");
 $('#distro').css("visibility","visible");
 $('#araez').css("display","block"); 
})
  
$('#distro').click (function() {
 $('#zikour').css("visibility","visible");
 $('#distro').css("visibility","hidden");
 $('#araez').css("display","none"); 
 $('#kavadenn').css("display","block");
 $('#stalaf_kloz').css ("display","block");
 $('#leur').css ("display","block");
})

function addScore(score){
kloc_her ('korn-boud.ogg');
swal({
  title: "Kavet ho-peus !",
  text: "hoc'h anv mar-plij:",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: false,
  animation: "slide-from-top",
  inputPlaceholder: "Yann C'hoarier"
},
function(inputValue){
  if (inputValue === false) return false;
  if (inputValue === "") {
    swal.showInputError("ret-mat reiñ hoc'h anv !");
    return false;
  }
  swal("Beuz!", "Bremañ, " + inputValue + ", emaout war ar roll a enor", "success");
  score = score + ';' + inputValue + ';' + hiziv(); 
  scores[scores.length]=score;
  scores = scores.sort(function(a,b){return parseInt(b)-parseInt(a)});
  scores = scores.slice(0,10);
  localStorage.setItem("ar_re_wella", JSON.stringify(scores));
  var linennad="<p class='hi_sco'>"+'Bolz a enor'+"</p><div class='flexy'>"; 
  for (var i = 0 ; i < 10 ; i++) {	
  var a = scores[i].split(';');
  linennad += '<div>'+ a[1]+'</div><div>'+a[2]+'</div><div>'+a[0]+'</div>';
  }
  $('#digor').html(linennad);
}); // swal
} //addScore()

function hiziv(){
var d = new Date();
var n = d.toJSON();
var deiz= n.substring (8, 10);
var miz = n.substring (5, 7);
var bloaz = n.substring (0,4);
n = deiz + '-' + miz + '-' + bloaz;
return n;
}

function getHighScores(){
return JSON.parse(localStorage.getItem("ar_re_wella")) || new Array(10);
}

function getLevel(){
return JSON.parse(localStorage.getItem("live_o_ren")) || 0;
}

function hirder_gwir(gerig)
{
 var lengz = gerig.length;
 var traou =["C", "Ç", "Ù"];
 for (var i=0; i < 3 ; i++) {
  etre= gerig.split(traou[i]);
  lengz += etre.length - 1;
  }
return lengz;
}
function handlezeClick(rb) {
live = document.querySelector('input[name=rb]:checked').value;
localStorage.setItem("live_o_ren", JSON.stringify(live));
init();
}
function kloc_her(brall)
{
var audio = document.getElementById('skignerez');
let doser = "son/";
brall= doser + brall;
audio.src = brall;
audio.play();
return (false);
}

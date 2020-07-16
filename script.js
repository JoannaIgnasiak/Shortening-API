var section_2_button=document.getElementById('section_2_button');
document.getElementById("section_2_label").style.display="none";

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.container-nav');
const handleClick = () => {
    hamburger.classList.toggle('hamburger--active');
    nav.classList.toggle('container-nav--active');
}

hamburger.addEventListener('click', handleClick) ;


window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        console.log(target.offsetTop);
        targetY += target.offsetTop;
        targetY-=10;
    } while (target = target.offsetParent);
    scroll = function(c, a, b, i) {
        console.log(targetY);
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

function copyfunction(){
    this.classList.add("clicked");
    this.innerHTML = "copied";
    const el = document.createElement('textarea');
    el.value = this.id;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function addelement(oldlink,newLink){
    console.log(newLink);
    newDiv = document.createElement("div");
    newDiv.classList.add("section_2_1_outputrow");
    newDivContainer = document.createElement("div");
    newDivContainer.classList.add("section_2_1_outputrow-container");
    document.getElementById("section_2_1").appendChild(newDiv);
    
    newText = document.createElement("div");
    newText.classList.add("section_2_1_longlink");

    let oldlink100letters = oldlink;
    if (oldlink.length>50){
        oldlink100letters = oldlink.substring(0, 50);
        oldlink100letters +="......."
    }
    newText.innerHTML = oldlink100letters;

    shortlink = document.createElement("a");
    shortlink.classList.add("section_2_1_shortlink");
    shortlink.setAttribute("id", "shortlink");
    shortlink.setAttribute("href", newLink);
    shortlink.setAttribute("target", "_blank");
    shortlink.innerHTML=newLink;

    newButton = document.createElement("button");
    newButton.classList.add("section_2_1_button");
    newButton.setAttribute("id", newLink);
    newButton.innerHTML = "copy";
    newDiv.appendChild(newText);
    newDiv.appendChild(newDivContainer);
    newDivContainer.appendChild(shortlink)
    newDivContainer.appendChild(newButton);
    
    newButton.addEventListener('click', copyfunction);
}

async function fetchNewLink(oldlink) {

    let newLinkJson = await postLink(document.getElementById('section_2--input').value);
    var myStatus = newLinkJson.status;
    if (newLinkJson.url == "Enter a valid URL."){
        console.log("upsssssss");
        return 
    }
    let newLink = await getShortLink(newLinkJson);
    newLink = newLink.toString();
    
    console.log(newLink);
    let shortlink = newLink;

    addelement(oldlink,newLink);
}
  
function postLink(input) {
return fetch('https://rel.ink/api/links/', {
    method: 'POST',
    body: JSON.stringify({
    url: input
    }),
    headers: {
     "Content-type": "application/json"
    }
    })
    .then(response => response.json())
    .then(json => json) 
}
  
function getShortLink(response) {
    var str1 ="https://rel.ink/";
    newLink=str1.concat((response.hashid).toString());
    return (newLink)
}

function checkurl(oldlink){
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(oldlink)) {
        document.getElementById("section_2_label").style.display="none";
        document.getElementById('section_2--input').classList.remove("wrong");
        return true;
    } 
        document.getElementById("section_2_label").style.display="block";
        document.getElementById('section_2--input').classList.add("wrong");
        return false;
}
 

function shorturl(){
    var shortlink;
    var oldlink = document.getElementById('section_2--input').value;
    var validurl =checkurl(oldlink); 
    if (validurl==true){
    shortlink = fetchNewLink(oldlink);
    console.log("ok");
    }
    else{}  
}

section_2_button.addEventListener('click', shorturl);
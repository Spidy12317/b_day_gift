let can2;
let can3;
let wd = 900;
let ht = 600;
let text_size = 14;
let type_speed = 75;
//let type_speed = 0;
 
let cur_pos;
let ip = "";

let st = false;
let fl = false;
let fire = false;

let files_length = 5;


let stm = [];
let number = 80;
let sna;
let cng = ["adsfjhalsfbwae","agddafgadf","afhqerhafhdgf","sdfa.select.asdfa.all.fasd"];

const fireworks = [];
let gravity;

let flow = {
  
  level : 0 + 3,
  ip_mode : false
  
};


function keyTyped(){
  if(flow.ip_mode && key != "Enter"){
    ip+= key;
  }  
}

function keyReleased(){
    if (keyCode == BACKSPACE && flow.ip_mode){
      ip = ip.substring(0, ip.length -1);
      can3.clear();
    }
}

function keyPressed(){
  
  if(flow.ip_mode){
    if(key == "Enter"){
      if(ip == sna[flow.level]){
        
        flow.ip_mode = false;
               
        var opt;
        if(flow.level < files_length-2){opt=0;}        
        else if ((flow.level - (files.length-1))<cng.length-1){opt = 1;}
        else{opt = 2;}
        
        if(flow.level > files_length-2){
          ip = ip +" "+ String.fromCharCode(0x2713);
          can2.text(ip,cur_pos.x,cur_pos.y);
        }
        
        
        switch(opt){
          
          case 0:
            flow.level +=1;
            can2_type(files[flow.level],10,20);
            break;
        
          case 1:  
            cur_pos.x = 0; 
            flow.level +=1;
            cur_pos.y += 20; 
            flow.ip_mode = false;
            open("./Challenge_"+(flow.level - (files.length-1)+1)+"_"+cng[flow.level - (files.length-1)]+"/"+cng[flow.level - (files.length-1)]+".html");
            can2_type([files[files.length-1][flow.level - (files.length-1)]],10,cur_pos.y);  
            break;
          
          case 2:
            fl = true;
            break;
          
        }     
        ip = "";
        
      }else{operation("error");}
    }    
  }
  
  if( (flow.level >= files_length-2) && keyIsDown(16) && keyIsDown(17) &&keyIsDown(82)){
    open("./Challenge_"+(flow.level - (files.length-1)+1)+"_"+cng[flow.level - (files.length-1)]+"/"+cng[flow.level - (files.length-1)]+".html");

  }
}

async function finale(){
  
  can3.rectMode(CENTER);
  can3.clear();
  can3.noFill();
  can3.stroke(7,256,150);
  can3.rect(wd/3,cur_pos.y+50,wd/5.7,50,40);
  
  if( (mouseX <850 && mouseX >680) && (mouseY>560 && mouseY<620 )){
     can3.fill(0,256,150);
     if(mouseIsPressed){
       fl = false;
       fire = true;
       operation("finale");
     }
  }
  can3.rect(wd/3,cur_pos.y+50,wd/6,40,40);
  can3.fill(7,256,150);
  if( (mouseX <850 && mouseX >680) && (mouseY>560 && mouseY<620 )){
    
    can3.fill(0);
  }
  can3.noStroke();
  can3.textAlign(CENTER,CENTER);
  can3.text("Finale",wd/3,cur_pos.y+50);
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  can2 = createGraphics(wd,ht);
  can3 = createGraphics(wd,ht);
  cur_pos = createVector(0,0);
  gravity = createVector(0, 0.2);
  operation("init");
}

function draw() {
  
  if(fl){finale();}
  
  imageMode(CENTER);
  rectMode(CENTER);
  stroke(0, 255, 150);

  operation("dynamic_bg");
  
  if (st){operation("fg");} else{operation("begin");}
    
  if(flow.ip_mode){operation("can3_type");}
}

sna = ["Streams","Error","","","jcrra","dktvjfca","ujtcffjc","lk"];

async function operation(opt){

  switch(opt) {
    case "init":
      for (let i = 0; i <round(number/2); i++) {
        stm.push(new streams());
      }
  
      setTimeout(()=> {
        for (let i = 0; i <round(number/2); i++) {
          stm.push(new streams());
        }
      }, 1000);
      can2.background(0);
      break;
  
    case "dynamic_bg":
      
      if(!fire){
        background(0, 155);
        for (let i = 0; i <stm.length; i++) {
          stm[i].show();
        }
      }else{
        colorMode(RGB);
        background(0, 0, 0, 25);
        
        if (random(1) < 0.04) {
          fireworks.push(new Firework());
        }
        
        for (let i = fireworks.length - 1; i >= 0; i--) {
          fireworks[i].update();
          fireworks[i].show();
          
          if (fireworks[i].done()) {
            fireworks.splice(i, 1);
          }
        }
      }
      break;
      
    case "fg":
      image(can2, width/2, height/2);
      image(can3, width/2, height/2);
      
      noFill();
      rect(width/2, height/2, wd, ht);
      break;
    
    case "start":
      can2.textSize(text_size);
      can2.fill(0, 255, 150);
      can2.noStroke();
      can2.textFont("Coiny");
      can2.scale(1.5);
      can3.scale(1.5);
      textAlign(CENTER,CENTER);
      for (let j = 0; j < files[2].length; j++) {
        cur_pos.x = wd/4.5;
        cur_pos.y = ht/3.5; 
        for (let i = 0; i < files[2][j].length; i++) {
          
          can2.text(files[2][j][i], cur_pos.x, cur_pos.y);
          await sleep(type_speed);
          cur_pos.x +=  textWidth(files[2][j][i]) + 0.5;
        }
        await sleep(1500);
        can2.background(0);
        can2.fill(0, 255, 150);
      }
      can2_type(files[flow.level],10,20);
      break;
    
    case "begin":
      textSize(50);
      textAlign(CENTER, CENTER);
  
      fill(0); 
  
      ellipse(width/2, height/2, 300);
  
      if ( pow((mouseX-width/2), 2) + pow((mouseY-height/2), 2) < pow(125, 2)) {
        fill(0, 255, 100);
        if (mouseIsPressed) {
          st = true;
          operation("start");
          
        }
      }
  
      ellipse(width/2, height/2, 250);
  
      fill(0);      
      text("START", width/2, height/2);
  
      break;
      
      case "can3_type":
        can3.textSize(text_size);
        can3.textFont("Coiny");
        can3.fill(0, 255, 150);
        can3.noStroke();
        can3.text(ip, cur_pos.x, cur_pos.y);
        break;   
    
    case "finale":
        await sleep(500);
        can3.clear();
        can2.background(0);
        fire = true;
        operation("fl_type");
        break;
        
    case "fl_type":
      can2.clear();
      
      can2.textSize(text_size);
      can2.fill(0, 255, 150);
      can2.noStroke();
      can2.textFont("Coiny");
      cur_pos.y = 20; 
      
      for (let j = 0; j < fl_file.length; j++) {
        cur_pos.x = 10;
        for (let i = 0; i < fl_file[j].length; i++) {
          can2.text(fl_file[j][i], cur_pos.x, cur_pos.y);
          await sleep(type_speed);
          can3.clear();
          cur_pos.x +=  textWidth(fl_file[j][i]) + 0.5;
        }
        cur_pos.y += 20;
        await sleep(type_speed);
      }
      cur_pos.x += textWidth("H") + 0.5;
      cur_pos.y -= 20;
      can2.stroke(0,256,100);
      for(let i=0; i<points.length ; i++){
        for(let j=0; j<points[i].length;j += 1){
          can2.line(points[i][j][0],points[i][j][1],points[i][j][0],points[i][j][1]);
          await sleep(15);
        }
      }
      break;
    
    case "error":
      
      can3.noFill();
      can3.textSize(19);
      flow.ip_mode = false;
      can3.stroke(255,25,50);
      can3.textFont("Coiny");
      can3.rectMode(CENTER,CENTER);
      can3.textAlign(CENTER,CENTER);
      
      can3.fill(0);
      can3.rect(wd/3,ht/3,wd/2,ht/6);      
      can3.fill(255, 25, 50);
      can3.text(files[1][floor(random(files[1].length))],wd/3,ht/3);
    
      setTimeout( ()=>{
        can3.clear();
        flow.ip_mode = true;
      }, 2500);
      
      can3.textAlign(LEFT,BASELINE);
      break;
      
      
  }
}

async function can2_type(string,temp_x,y){
  
  if(y == 20){can2.background(0);}  
  
  can2.textSize(text_size);
  can2.fill(0, 255, 150);
  can2.noStroke();
  can2.textFont("Coiny");

  cur_pos.y = y; 
  
  for (let j = 0; j < string.length; j++) {
    cur_pos.x = temp_x;
    for (let i = 0; i < string[j].length; i++) {
      can2.text(string[j][i], cur_pos.x, cur_pos.y);
      await sleep(type_speed);
      can3.clear();
      cur_pos.x +=  textWidth(string[j][i]) + 0.5;
    }
    cur_pos.y += 20;
    await sleep(type_speed);
  }
  cur_pos.x += textWidth("H") + 0.5;
  cur_pos.y -= 20;
  flow.ip_mode = true;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

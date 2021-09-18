let can;
let hint;
let text_size = 14;

function setup() {
  can = createCanvas(1, 1);
  
}

function keyPressed() {

  if (keyIsDown(13) && keyIsDown(SHIFT)) {

    resizeCanvas(1000, 500);
    can.parent("canvas");
    select("#remove").remove();
    can_type(challenges[0], 250, 210);
    select("#t").style('background', 'rgb(0,0,0)');
    select("#hint").style('position', 'absolute');
    select("#hint").style('bottom', '5px');
    select("#hint").style('color', 'rgb(0,0,0)');
    select("#hint").html("Your Eyes Looks Sore, You should have just coded a program to solve it...");

    rectMode(CENTER);
    noFill();
    stroke(0, 255, 150);
    rect(width/2, height/2, width/1.5, height/2);
    fill(0, 255, 150);
    noStroke();
  }
}

//function draw() {
//  background(0);
//}

async function can_type(string, temp_x, y) {

  let type_speed = 75;

  if (y == 20) {
    background(0);
  }  

  textSize(text_size);
  fill(0, 255, 150);
  noStroke();
  textFont("Coiny");


  for (let j = 0; j < string.length; j++) {
    x = temp_x;
    for (let i = 0; i < string[j].length; i++) {
      text(string[j][i], x, y);
      await sleep(type_speed);
      x +=  textWidth(string[j][i]) + 0.5;
    }
    y += 20;
    await sleep(1000);
  }
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

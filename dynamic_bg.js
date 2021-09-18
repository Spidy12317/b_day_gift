let S_text_size = 14;
let down_speed = 7;
let x_values = [];

class streams{
  
  constructor(){
    
    for(let i=0; i < width / S_text_size ; i++){
      x_values.push(i*S_text_size);
    }
    
    this.pos = createVector(x_values[floor(random()*x_values.length)],random(-height,0)-height/2);

    
    this.interval = random(0.1, 0.125);
    this.time = 0;
    this.str = this.getRandomString(round(random(6, 12)));
    
    
  }
  
  shuffle(array) {
  
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return(array);
  }  
  
  
  getRandomString(len)
    {
        let st = "";
        switch (floor(random(4))){
          
          case 0:
          
            for (let i = 0; i < len; i++)
            {
              st += (String.fromCharCode(0x30A0 + round(random(0, 96))));       
            }
            return st.split("");
          
          case 1:
            var char_list = files[0][floor(random(files[0].length))];
            return char_list.split("");
          
          case 2:
             char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
             for (var i = 0; i < len; i++) {
               st += char_list.charAt(Math.floor(Math.random() * char_list.length));
             }
             return st.split("");
             
          case 3:
             char_list = "0123456789";
             for ( i = 0; i < len; i++) {
               st += char_list.charAt(Math.floor(Math.random() * char_list.length));
             }
             return st.split("");
       }
    }
  
  
  show(){
    
    fill(0,255,150);
    //colorMode(HSB);
    //fill(132, 92, 82);
    textSize(S_text_size);
    
    for (let i = this.str.length-1; i >= 0; i--){
      text(this.str[i],this.pos.x,this.pos.y + ((this.str.length-i)*S_text_size));
    }
    colorMode(RGB);
    fill(256);
    text(this.str[0],this.pos.x,this.pos.y + this.str.length*S_text_size);
    
    if (this.time >= this.interval){
      this.str = this.shuffle(this.str);
      this.time = 0;
    }
    
    
    if(this.pos.y > height){
      this.str = this.getRandomString(round(random(6, 12)));
      this.pos = createVector(x_values[floor(random()*x_values.length)],-this.pos.y + height/2 + random(str.length));  
      
    }
    
    else{
      this.pos.y +=down_speed;
    }
    
    this.time += 1/frameRate();
  }
  
  
  
}//end of class

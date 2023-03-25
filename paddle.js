const Speed = 0.02;

export default class Paddle{
constructor(PaddleElement){
    this.PaddleElement=PaddleElement;
    this.reset();
}

get position(){
    return parseFloat(
        getComputedStyle(this.PaddleElement).getPropertyValue("--position"))
}
set position(value){
    this.PaddleElement.style.setProperty("--position", value);
}
rect(){
    return this.PaddleElement.getBoundingClientRect()
}

reset(){
   this.position = 50; 
}
Update(delta,ballHeight){
this.position += Speed * delta * (ballHeight-this.position);
}
} 
let ears
let legs
let nose
let eyes

function preload(){

ears=loadBytes('data/ears1000.bin');
legs=loadBytes('data/legs1000.bin');
nose=loadBytes('data/nose1000.bin')
eyes=loadBytes('data/eyes100.bin');
}

function setup(){
createCanvas(280,280);
background(0);

let total=100;


for(let n=0;n<total;n++){

let img= createImage(28,28);
img.loadPixels();
let offset= n*784;

for(let i=0;i<784;i++){
 let val= 255-(ears.bytes[i+offset]);
img.pixels[i*4+0]= val;
img.pixels[i*4+1]= val;
img.pixels[i*4+2]= val;
img.pixels[i*4+3]= 255;


		}

img.updatePixels();
let x=(n%10)*28;
let y= floor(n/10)*28;
image(img,x,y);
	}
}
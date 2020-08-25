const len=784;
const total_data=1000;

const EARS=0;
const EYES=1;
const LEGS=2;
const NOSE=3;


let ears_data;
let legs_data;
let nose_data;
let eyes_data;

let ears={};
let legs={};
let nose={};
let eyes={};


let ears.training=[];
let legs.training=[];
let nose.training=[];
let eyes.training=[];

let ears.testing=[];
let legs.testing=[];
let nose.testing=[];
let eyes.testing=[];

function preload(){

ears=loadBytes('data/ears1000.bin');
legs=loadBytes('data/legs1000.bin');
nose=loadBytes('data/nose1000.bin')
eyes=loadBytes('data/eyes100.bin');
}

function prepareData(category, data){
let offset;
let threshold;
for(let i=0;i<total_data;i++){
offset=i*len;
threshold= floor(0.8*total_data);
if(i<threshold){
category.training[i]= data.bytes.subarray(offset, offset+len);
}

else{
category.testing[i-threshold]=data.bytes.subarray(offset,offset+len);

}
}

}

function setup(){
createCanvas(280,280);
background(0);
prepareData(ears,ears_data);
prepareData(eyes,eyes_data);
prepareData(nose,nose_data);
prepareData(legs,legs_data);


//ears.training =[];


// let total=100;


// for(let n=0;n<total;n++){

// let img= createImage(28,28);
// img.loadPixels();
// let offset= n*784;

// for(let i=0;i<784;i++){
//  let val= 255-(ears.bytes[i+offset]);
// img.pixels[i*4+0]= val;
// img.pixels[i*4+1]= val;
// img.pixels[i*4+2]= val;
// img.pixels[i*4+3]= 255;


// 		}

// img.updatePixels();
// let x=(n%10)*28;
// let y= floor(n/10)*28;
// image(img,x,y);
// 	}
}
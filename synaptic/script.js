const len=784;
const total=1000;

const CATS=0;
const EYES=1;
const TRAINS=2;
const LEGS=3;


//let ears_data;
let eyes_data;
let cats_data;
let trains_data;
//let nose_data;
//let legs_data;

//let ears={};
let eyes={};
let cats={};
let trains={};
//let nose={};
//let legs={};

let trainingData = [];
let nn;
var myDeepNetwork;
var input,output;
var learningRate = 0.4;


function preload(){


	//ears_data= loadBytes('data/ears1000.bin');
	cats_data= loadBytes('data/cats1000.bin');
	eyes_data= loadBytes('data/eyes1000.bin');
	trains_data= loadBytes('data/trains1000.bin');
	//nose_data= loadBytes('data/nose1000.bin');
	//legs_data= loadBytes('data/legs1000.bin');
	
	//console.log(ears_data);  784000  1000*784
	//console.log(eyes_data);  784000  1000*784
	//console.log(nose_data);  784000  1000*784
	//console.log(legs_data);  784000  1000*784
	
}

function prepareData(category, data,label){

	category.training=[];
	category.testing=[];

	for(let i=0;i<total;i++){
		let offset=i*len;
		let threshold=floor(0.8*total);
		
			if(i<threshold){
				category.training[i]= data.bytes.subarray(offset,(offset+len));
				category.training[i].label=label;
			}
			else{
				category.testing[i-threshold]=data.bytes.subarray(offset,(offset+len));
				category.testing[i-threshold].label=label;
			}
		//console.log(category.training);
		//console.log(category.testing);
	}
}


function trainEpoch(training){

     
	//var myTrainer = new synaptic.Trainer(myDeepNetwork); // Create trainer

	//Training Neural Network for one epoch
	
	for(let i=0;i<training.length;i++){

		// let inputs=[];
		let data=training[i];
		// //console.log(training[i]);
		// for(let j=0;j<data.length;j++){
		// 	inputs[j]= data[j]/255.0;
		// }
		//console.log(inputs);
		let trainingSet=[];
		let inputs = Array.from(data).map(x => x/255);

		let label = training[i].label;

		let targets = [0,0,0];
		targets[label] = 1;
		
		input.activate(inputs);
        output.activate();
        output.propagate(learningRate, targets);


		//trainingSet.push({input: inputs, output: targets});

		//console.log(inputs);
		//console.log(targets);
// 		myTrainer.train(trainingSet, {
//     		rate: 0.1,
//     		iterations: 10000,
//     		shuffle: true
// }); // Train with training data

	 	//nn.train(inputs,targets);
	}


	
			


}
	


function testAll(testing){

	let correct =0;
	//Training Neural Network for one epoch
	
	for(let i=0;i<testing.length;i++){
		// for(let i=0;i<1;i++){


		// let inputs=[];
		let data=testing[i];
		// //console.log(training[i]);
		// for(let j=0;j<data.length;j++){
		// 	inputs[j]= data[j]/255.0;
		// }
		//console.log(inputs);
		
		let inputs = Array.from(data).map(x => x/255);
		let label = testing[i].label;
		
		//let guess = nn.predict(inputs);
		// var recommendations = myDeepNetwork.activate(inputs);
		// let classification = recommendations.indexOf(max(recommendations));
		//let classification = guess.indexOf(max(guess));
		

		input.activate(inputs); // Whistle
		var result = output.activate();
		let classification = result.indexOf(max(result));

		// console.log(guess);
		// console.log(classification);
		// console.log(label);
	 	
	 	if(classification===label){
	 		correct++;
	 	}


	}
		
		let percent = 100*(correct/testing.length);
	 	// console.log(percent);
	 	return percent;
}




function draw(){

strokeWeight(12);
stroke(0);

if(mouseIsPressed){
line(pmouseX, pmouseY, mouseX, mouseY);
}

}



function setup(){
	
	createCanvas(280,280);
	background(255);


	prepareData(cats,cats_data,CATS);
	prepareData(eyes,eyes_data,EYES);
	prepareData(trains,trains_data,TRAINS);
//	prepareData(legs,legs_data,LEGS);

	//Creating Neural Network

//	nn = new NeuralNetwork(784,64,3);


		input = new synaptic.Layer(784); // Two inputs
	 	output = new synaptic.Layer(3); // Three outputs
	 	input.project(output); // Connect input to output

//    myDeepNetwork = new synaptic.Architect.Perceptron(
//     784, // Input layer with 784 neurons
//     20, // First hidden layer with 20 neurons
//     3 // Output layer with 4 neurons
// );


	//Randomising

	let training=[];
	training = training.concat(cats.training);
	training = training.concat(eyes.training);
	training = training.concat(trains.training);
//	training = training.concat(legs.training);


	shuffle(training,true);
	//console.log(training);  3200
	

	let testing=[];
	testing = testing.concat(cats.testing);
	testing = testing.concat(eyes.testing);
	testing = testing.concat(trains.testing);
	//console.log(testing);


// for(let i=1;i<6;i++){
// 	trainEpoch(training);

// console.log("Epoch: "+i);


// 	let percent=testAll(testing);
// 	console.log("% Correct: "+percent);
// }


let trainButton = select('#train');
let testButton = select('#test');
let guessButton = select('#guess');
let clearButton = select('#clearit');

let epochCounter=0;

trainButton.mousePressed(function(){
	trainEpoch(training);
	epochCounter++;
	console.log("Epoch: "+ epochCounter);
});

testButton.mousePressed(function(){
	let percent= testAll(testing);
	console.log("Percent: " +nf(percent,2,2)+ "%");
});


guessButton.mousePressed(function(){
	let inputs = [];
	let img = get();
	img.resize(28,28);
	//console.log(img);
	img.loadPixels();
for(let i=0;i<len;i++){
	let bright = img.pixels[i*4];
	inputs[i]= (255-bright)/255.0;
	
}
	//console.log(inputs);
	
	
	//let guess= nn.predict(inputs);
	
	// var recommendations = myDeepNetwork.activate(inputs);
	// 	let classification = recommendations.indexOf(max(recommendations));
	//let classification = guess.indexOf(max(guess));
	

	input.activate(inputs); 
		var result = output.activate();
		let classification = result.indexOf(max(result));

	if(classification===CATS){
		console.log("CATS");
	}
	else if(classification===EYES){
		console.log("EYES");
	}
	else if(classification===TRAINS){
		console.log("TRAINS");
	}

});

clearButton.mousePressed(function(){
	background(255);
});



// 	//Training Neural Network for one epoch
	
// 	for(let i=0;i<training.length;i++){

// 		let inputs=[];
// 		let data=training[i];
// 		//console.log(training[i]);
// 		for(let j=0;j<data.length;j++){
// 			inputs[j]= data[j]/255.0;
// 		}
// 		//console.log(inputs);

// 		let label= training[i].label;
// 		let targets = [0,0,0];
// 		targets[label]=1;

// 		//console.log(inputs);
// 		//console.log(targets);

// 	 	nn.train(inputs,targets);
// 	}
	

// 		console.log("Trained for one epoch");


	// ears.training=[];
	// ears.testing=[];

	// for(let i=0;i<total;i++){
	// 	let offset=i*len;
	// 	let threshold=floor(0.8*total);
		
	// 		if(i<threshold){
	// 			ears.training[i]= ears_data.bytes.subarray(offset,offset+i);
	// 		}
	// 		else{
	// 			ears.testing[i-threshold]=ears_data.bytes.subarray(offset,offset+i);
	// 		}
		
	// }
	


	// let total= 100;
	

	//  for(let n=0;n<total;n++){

	//  	let img= createImage(28,28);

	//  	img.loadPixels();

	//  	let offset= n*784;

	//  	for(let i=0;i<784;i++){
	//  		let val= 255-ears.bytes[i + offset];
	//  		img.pixels[i * 4 + 0]=val;
	//  		img.pixels[i * 4 + 1]=val;
	//  		img.pixels[i * 4 + 2]=val;
	//  		img.pixels[i * 4 + 3]=255;
	//  	}

	//  	img.updatePixels();
	//  	let x= (n%10)*28;
	//  	let y= floor(n/10)*28;
	//  	image(img , x , y);
	//  }
}
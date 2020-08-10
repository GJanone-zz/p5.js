const boids = []; // Array para armazenar os veiculos

// sliders para regular forças
var alignSlider;
var coheSlider;
var sepSlider;

// paraa *palhaçada* dos pombos
var img;
var flag = false;

var cols;
var rows;
var scl = 20;   //escala que reduziremos o canvas

var flowfield = []; //para armezenar os vetores de força do campo vetorial

var zoff = 0; //offset no eixo Z

function preload() {
  img = loadImage('pombo.png'); //carrega a imagem do pombo
}

function setup() {
  createCanvas(400, 400);
  background(255);

  for (var i = 0; i < 200; i++) {
    boids.push(new Boid());         // cria 200 veículos (boids)
  }

  rows = floor(height / scl);     //escala as linhas do canvas
  cols = floor(width / scl);      // escala ascolunas do canvas

  flowfield = new Array(rows * cols);

  createP('Align:')
  alignSlider = createSlider(0, 2, 0.5, 0.1);
  createP('Cohesion:')
  coheSlider = createSlider(0, 2, 0.5, 0.1);
  createP('Separation:')
  sepSlider = createSlider(0, 2, 0.5, 0.1);

//   frameRate(30);
//   createLoop({
//     duration: 6,
//     gif: true
//   })
}

function draw() {
  // background(255);

  var yoff = 0;     //offset em Y para noise()
  for (var y = 0; y < rows; y++) {  //itera por todas as linhas
    var xoff = 0;   //offset em X para noise()
    for (var x = 0; x < cols; x++) {  //itera por todas as colunas
      var index = x + y * cols;   //mapeia os "blocos" de linha/coluna

      let angle = noise(xoff, yoff, zoff) * TWO_PI / 4 * 6; //gera um angulo baseado em noise()
      let v = p5.Vector.fromAngle(angle); //cria um vetor a partir do ângulo
      v.setMag(0.5);    //limita magnitude do vetor
      flowfield[index] = v; //guarda o vetor no array
      
      //desenha os vetores do flowfield
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // stroke(0, 80);
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();

      xoff += 0.1;    //incremento no offset de X
    }

    yoff += 0.1;  //incremento no offset de Y

  }

  zoff += 0.02;   //incremento no offset de Z

  for (let b of boids) {  //itera por todos os boids
    // b.behavior(boids);   //aplica os comportamentos de boid
    b.follow(flowfield);    //aplica o campo de força
    b.edges();              //toma conta das bordas do canvas
    b.show(flag);           // exibe os boids
    b.update();             //atualiza movimento
  }

}


//toma conta da palhaçada de transformar os veículos em pombos quando clica o mouse
// function mouseClicked() {

//   if (flag) {
//     flag = false;
//   } else {
//     flag = true;
//   }

//   for (let b of boids) {
//     b.show(flag);
//   }
// }

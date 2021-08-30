
// Get what we need
const innerSlider = document.querySelector('#inner-slider')
let sliderImg = document.querySelectorAll('.slider-img');



// Put colors into div's background -- Just for the demo -- Should be replace by Images
let colors = ['#27CEBB', '#81EFB8', '#547472', '#FEFBE8', '#386BAD'];

for(i = 0; i < colors.length; i++){
    sliderImg.forEach((img)=>{
        img.style.background = `${colors[i++]}`;
    })
};


// SLIDER
// This slider work only for one --
// --you will need to copy all if you want to add another slider--!

const interval = 1800; //----------------interval between each slide in ms------------!
let index = 1;
let slideId;
const firstClone = sliderImg[0].cloneNode(true);
const lastClone = sliderImg[sliderImg.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
innerSlider.append(firstClone);
innerSlider.prepend(lastClone);


let slideWidth = sliderImg[index].clientWidth;

//Recalculate slideWidth in case viewport change
window.addEventListener('resize',()=>{
    slideWidth = sliderImg[index].clientWidth;
});


innerSlider.style.transform = `translate(${-slideWidth -1}px)`

const getImg = ()=>document.querySelectorAll('.slider-img')

function startSlide(){

    slideId = setInterval(()=>{

        sliderImg = getImg()
        if(index >= sliderImg.length -1) return;
        index++;
        innerSlider.style.transform = `translate(${-slideWidth * index}px)`;
        innerSlider.style.transition = '1s cubic-bezier(.32,.32,.18,1)'; // -------- Slider transition--------!
    }, interval)
}

innerSlider.addEventListener('transitionend', ()=>{
    sliderImg = getImg();

    if(sliderImg[index].id === firstClone.id){
        innerSlider.style.transition = 'none';
        index = 1;
        innerSlider.style.transform = `translate(${-slideWidth * index}px)`;
    }

    if(sliderImg[index].id === lastClone.id){
        innerSlider.style.transition = 'none';
        index = sliderImg.length - innerSlider.children.length;
        innerSlider.style.transform = `translate(${-slideWidth * index}px)`;
    }
})

startSlide()

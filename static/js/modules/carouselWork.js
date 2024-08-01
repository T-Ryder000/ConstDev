export default function work(){
let collections = document.querySelectorAll('[data-carousel="collection"]')
let currentCollectionIndex = 0
const collectionData = []
let itemsPerSlide = 5

let prevent = (event)=>{
    event.preventDefault()
}
let translateSlider = (position) =>{
  const { state, carouselList}= collectionData[currentCollectionIndex]
  state.lastTranslatePosition = position //Salvar a posição que parou
  carouselList.style.transform = `translateX(${position}px)`
}

let animateTransition = (active)=>{
  const {carouselList}= collectionData[currentCollectionIndex]
  if(active){
    carouselList.style.transition = 'transform 0.3s'
  }else{
    carouselList.style.removeProperty('transition')
  }
}

let getCenterPosition = (SlideIndex) => {
  const { state, carouselItem } = collectionData[currentCollectionIndex];
  const item = carouselItem[state.currentItemIndex];
  let itemWidth = item.offsetWidth;
  let bodyWidth = document.body.clientWidth;
  let slideWidth = itemWidth * itemsPerSlide;
  let margin = (bodyWidth - slideWidth) / 2;
  return margin - (slideWidth * SlideIndex);
}

let getLastSlideIndex = ()=>{
  const {carouselItem}= collectionData[currentCollectionIndex]
  const lastItemSlide = carouselItem.length - 1
  return Math.floor(lastItemSlide / itemsPerSlide)
}

const activeVisibleCurrentItems = ()=>{
  const {carouselItem, state} = collectionData[currentCollectionIndex]
  carouselItem.forEach((item, itemIndex)=>{
    item.classList.remove('active')
    const firstItemIndex = state.currentSlideIndex * itemsPerSlide
    if(itemIndex >= firstItemIndex && itemIndex < firstItemIndex + itemsPerSlide){
      item.classList.add('active')
    }
  })
}

const setArrowButtonsDisplay = ()=>{
  const {btnLeft, btnRight, state}= collectionData[currentCollectionIndex]
  btnLeft.style.display = state.currentSlideIndex === 0 ? 'none' : 'block' //sumir seta de inicio
  btnRight.style.display = state.currentSlideIndex === getLastSlideIndex() ? 'none' : 'block' //sumir seta do final
}

let setVisibleSlide = (SlideIndex) => {
  const { state } = collectionData[currentCollectionIndex];
  const centerPosition = getCenterPosition(SlideIndex);
  state.currentSlideIndex = SlideIndex;
  activeVisibleCurrentItems();
  setArrowButtonsDisplay();
  animateTransition(true);
  translateSlider(centerPosition);
}

let forWardSlide = ()=>{
  const {state}= collectionData[currentCollectionIndex]
  const lastSlideIndex = getLastSlideIndex()
  if(state.currentSlideIndex < lastSlideIndex){
    setVisibleSlide(state.currentSlideIndex + 1)
  }else{
    setVisibleSlide(state.currentSlideIndex)
  }
}

let backWardSlide = ()=>{
  const {state}= collectionData[currentCollectionIndex]
  if(state.currentSlideIndex > 0){
  setVisibleSlide(state.currentSlideIndex - 1)
}else{
  setVisibleSlide(state.currentSlideIndex)
}
}

const onMouseDown = (event, itemIndex)=>{
  const {state} = collectionData[currentCollectionIndex]
  const item = event.currentTarget
  state.currentItemIndex = itemIndex
  state.mouseDownPosition = event.clientX
  state.currentSlidePosition = event.clientX - state.lastTranslatePosition
  item.addEventListener('mousemove', onMouseMove)
  animateTransition(false)
}
const onMouseMove = (event)=>{
  const {state}= collectionData[currentCollectionIndex]
  state.movement = event.clientX - state.mouseDownPosition
  const position = event.clientX - state.currentSlidePosition
  translateSlider(position)
}

const onMouseUp = (event)=>{
  const {state}= collectionData[currentCollectionIndex]
  if(state.movement > 150){
    backWardSlide()
  }else if(state.movement < -150){
   forWardSlide()
  }else{
    setVisibleSlide(state.currentSlideIndex)
  }
  state.movement = 0
  const item = event.currentTarget
  item.removeEventListener('mousemove', onMouseMove)
}

const onMouseLeave = (event)=>{
  const item = event.currentTarget
  item.removeEventListener('mousemove', onMouseMove)
}

const onTouchStart =(event, itemIndex)=>{
  const item = event.currentTarget
  item.addEventListener('touchmove', onTouchMove)
  event.clientX = event.touches[0].clientX
  onMouseDown(event, itemIndex)
}
const onTouchMove = (event)=>{
  event.clientX = event.touches[0].clientX
  onMouseMove(event)
}

const onTouchEnd = (event)=>{
  const item = event.currentTarget
  item.removeEventListener('touchmove', onTouchMove)
  onMouseUp(event)
}

const insertCollectionData = (collection)=>{
  collectionData.push({
    btnLeft: collection.querySelector('[data-carousel="left"]'),
    btnRight: collection.querySelector('[data-carousel="right"]'),
    carouselList: collection.querySelector('.movie_carousel_list'),
    carouselItem: collection.querySelectorAll('.movie_carousel_item'),
  
    state:{
      mouseDownPosition:0,
      movement:0,
      lastTranslatePosition:0,
      currentSlidePosition:0,
      currentItemIndex:0,
      currentSlideIndex:0}
})
}

const setItemsPerSlide = () => {
  if (document.body.clientWidth < 600) {
    itemsPerSlide = 2;
  } else if (document.body.clientWidth < 1024) {
    itemsPerSlide = 3;
  } else {
    itemsPerSlide = 5;
  }
};


const setWindowResizeListeners = ()=>{
    let resizeTimeOut;

   window.addEventListener('resize', function(event){

      clearTimeout(resizeTimeOut)
      resizeTimeOut = setTimeout(function(){
        setItemsPerSlide()
        collections.forEach((_, collectionIndex)=>{
          currentCollectionIndex = collectionIndex
          setVisibleSlide(0)
        })
      }, 1000)
    })
}

const setListeners = (collectionIndex)=>{

  const {btnLeft, btnRight, carouselItem} = collectionData[collectionIndex]
  btnLeft.addEventListener('click', ()=>{
    currentCollectionIndex = collectionIndex
    backWardSlide()})
  btnRight.addEventListener('click', ()=>{
    currentCollectionIndex = collectionIndex
    forWardSlide()})

  carouselItem.forEach((item, itemIndex)=>{

      const link = item.querySelector('.movie_carousel_link')
      link.addEventListener('click', prevent)
      let img = document.querySelectorAll('.movie_carousel_cover')
      img.forEach((e)=>{
        e.addEventListener('dragstart', prevent)

        /************************************************************** */
      item.addEventListener('mousedown', (event)=>{
        currentCollectionIndex = collectionIndex
        onMouseDown(event, itemIndex)})  
      item.addEventListener('mouseup', onMouseUp)  
      item.addEventListener('mouseleave', onMouseLeave)  
      item.addEventListener('touchstart', function(event){
        currentCollectionIndex = collectionIndex
        onTouchStart(event, itemIndex)
      })
      item.addEventListener('touchend', onTouchEnd)
      })
    })
}
setWindowResizeListeners()
setItemsPerSlide()

collections.forEach((collection, collectionIndex)=>{
  currentCollectionIndex = collectionIndex
  insertCollectionData(collection)
  setListeners(collectionIndex)
  setVisibleSlide(0)
})


}
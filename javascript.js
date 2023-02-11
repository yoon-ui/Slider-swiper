let images = [
  "https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=788&q=80",
  "https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1503001831666-8f3cf3a24544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1526306063970-d5498ad00f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
];

function imageSlider(parent,images){
  let currentImage = 0;
  let slider = {
    parent:parent,
    images:parent.querySelector(".images"),
    thumbnails:parent.querySelector(".thumbnails"),
    backBtn:parent.querySelector(".back-btn"),
    nextBtn:parent.querySelector(".next-btn")
    //이부분이 이해가 안갑니다  왜 따로 안하고 ? ㅎ-ㅎ 
  };
  
  //객체에 있는 imges 경로를 innerHTML로 넣어서 이미지를 쉽게 관리할 수 있음  
  slider.images.innerHTML = images.map(function(image){
    return `<img src="${image}"/>`
  }).join("");
  
  //images의 img가 맨 처음 나올때 active 클래스를 붙여서 보여줌 
  let imageNodes = slider.images.querySelectorAll("img");
  imageNodes[currentImage].classList.add("active");
  
  ////images와 thumbnails에 있는 image들을 동일하게 넣어줌 
  slider.thumbnails.innerHTML = slider.images.innerHTML;
  // console.log(slider.images.innerHTML);
  // console.log(slider.thumbnails.innerHTML);

  //thumbnail
  let thumbnailNodes = slider.thumbnails.querySelectorAll("img");
  //console.log(thumbnailNodes);
  //-->  NodeList(5) [img.active, img, img, img, img]

  //반복문을 통해서 images와 thumbnails의 i값을 맞춰서 active클래스값을 조정
  thumbnailNodes[currentImage].classList.add("active");
  for(let i=0;i<thumbnailNodes.length;i++){
    thumbnailNodes[i].addEventListener("click",function(){
      slider.thumbnails.querySelector("img.active").classList.remove("active");
      thumbnailNodes[i].classList.add("active");
      imageNodes[currentImage].classList.remove("active");
      currentImage = i;
      imageNodes[currentImage].classList.add("active");
    });
  }
  
  slider.backBtn.addEventListener("click",function(){
    imageNodes[currentImage].classList.remove("active");
    currentImage--;
    if(currentImage < 0){
      currentImage = images.length - 1;
    }
    imageNodes[currentImage].classList.add("active");
    slider.thumbnails.querySelector("img.active").classList.remove("active");
    thumbnailNodes[currentImage].classList.add("active");
  });
  
  slider.nextBtn.addEventListener("click",function(){
    imageNodes[currentImage].classList.remove("active");
    currentImage = (currentImage+1) % images.length;
    imageNodes[currentImage].classList.add("active");
    slider.thumbnails.querySelector("img.active").classList.remove("active");
    thumbnailNodes[currentImage].classList.add("active");
  });
}

imageSlider(document.querySelector(".image-slider"),images);
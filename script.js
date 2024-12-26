// var imageSets = {
//     "beta": ["./ttb/01.jpg", "./ttb/02.jpg", "./ttb/03.jpg", "./ttb/04.jpg", "./ttb/05.jpg"],
//     "SALNamecard": ["./SALNamecard/01.jpg", "./SALNamecard/02.jpg", "./SALNamecard/03.jpg", "./SALNamecard/04.jpg", "./SALNamecard/05.jpg"],
//     "fitnessIdeal": ["./fitnessIdeal/01.mp4", "./fitnessIdeal/02.jpg", "./fitnessIdeal/03.jpg", "./fitnessIdeal/04.jpg"]
// };

// var curImageIndex = 0;
// var intervalIds = {};

// function startImageCycle(el) {
//     var images = getImagesForElement(el);
//     cycleImage(el, images);

//     if (intervalIds[el]) {
//         clearInterval(intervalIds[el]);
//     }

//     intervalIds[el] = setInterval(function() {
//         cycleImage(el, images);
//     }, 300);
// }

// function stopImageCycle(el) {
//     if (intervalIds[el]) {
//         clearInterval(intervalIds[el]);
//         delete intervalIds[el];
//     }
//     $('.thumbnail-blank').empty();
// }

// function getImagesForElement(el) {
//     return imageSets[el] || [];
// }

// function cycleImage(element, images) {
//     curImageIndex++;
//     if (curImageIndex >= images.length) {
//         curImageIndex = 0;
//     }

//     var currentMedia = images[curImageIndex];
//     var $thumbnail = $('.thumbnail-blank');
//     $thumbnail.empty();

//     if (currentMedia.endsWith(".mp4")) {
//         var video = document.createElement("video");
//         video.src = currentMedia;
//         video.autoplay = true;
//         video.loop = true;
//         video.muted = true;
//         video.controls = true;  // 수동으로 재생해 보기 위해 controls 속성 추가
//         video.style.width = "100%";
//         video.style.height = "100%";
//         $thumbnail.append(video);
//     } else {
//         var img = document.createElement("img");
//         img.src = currentMedia;
//         img.style.width = "100%";
//         img.style.height = "100%";
//         $thumbnail.append(img);
//     }
// }

// $(document).ready(function() {
//     $('.two').on('mouseenter', function() {
//         var elementId = $(this).attr('id');
//         startImageCycle(elementId);
//     });

//     $('.two').on('mouseleave', function() {
//         var elementId = $(this).attr('id');
//         stopImageCycle(elementId);
//     });
// });
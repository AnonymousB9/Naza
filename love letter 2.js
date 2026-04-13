$(document).ready(function () {
  const envelope = $("#envelope");
  const btn_open = $("#open");
  const btn_reset = $("#reset");

  const music = document.getElementById("bg-music");

  /* BACKGROUND IMAGES */
  const bgImages = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];
  let bgIndex = 0;

  const body = document.body;
  const fadeLayer = document.getElementById("bg-fade");

  /* preload background images */
  bgImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  /* set first background */
  body.style.backgroundImage = `url('${bgImages[0]}')`;

  let bgInterval = null;

  /* OPEN */
  function openEnvelope() {
    envelope.addClass("open").removeClass("close");

    /* play music */
    music.volume = 0;
    music.play();

    /* fade in music */
    let vol = 0;
    const fade = setInterval(() => {
      if (vol < 1) {
        vol += 0.1;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 200);

    /* start background slideshow */
    if (!bgInterval) {
      bgInterval = setInterval(() => {
        bgIndex = (bgIndex + 1) % bgImages.length;

        fadeLayer.style.backgroundImage = `url('${bgImages[bgIndex]}')`;
        fadeLayer.style.opacity = 1;

        setTimeout(() => {
          body.style.backgroundImage = fadeLayer.style.backgroundImage;
          fadeLayer.style.opacity = 0;
        }, 1000);
      }, 2000);
    }
  }

  /* CLOSE */
  function closeEnvelope() {
    envelope.addClass("close").removeClass("open");

    music.pause();
    music.currentTime = 0;
  }

  /* EVENTS */
  envelope.click(openEnvelope);
  btn_open.click(openEnvelope);
  btn_reset.click(closeEnvelope);
});
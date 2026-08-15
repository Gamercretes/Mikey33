/* MIKEY33 overlay — minimal JS.
   The animation itself is pure CSS (GPU-friendly transforms/opacity).
   This script only:
   1) Keeps the shine mask locked to whatever file is actually loaded
      as the logo, so renaming assets/logo.png still works.
   2) Pauses the animation when the browser-source tab is hidden,
      to save CPU/GPU when the scene isn't visible (Moblin/OBS still
      render even off-screen tabs in some setups, so this helps). */

(function () {
  var img = document.getElementById('logoImg');
  var shine = document.getElementById('shine');
  var stage3d = document.getElementById('logo3d');

  function syncMaskToImage() {
    if (!img || !shine) return;
    var src = img.currentSrc || img.src;
    if (src) {
      shine.style.webkitMaskImage = 'url("' + src + '")';
      shine.style.maskImage = 'url("' + src + '")';
    }
  }

  if (img && img.complete) {
    syncMaskToImage();
  } else if (img) {
    img.addEventListener('load', syncMaskToImage, { once: true });
  }

  document.addEventListener('visibilitychange', function () {
    if (!stage3d) return;
    stage3d.style.animationPlayState = document.hidden ? 'paused' : 'running';
    if (shine) shine.style.animationPlayState = document.hidden ? 'paused' : 'running';
  });
})();

// ── YEAR ──
document.getElementById("yr").textContent = new Date().getFullYear();

// ── THEME ──
function toggleTheme(){
  var html = document.documentElement;
  var isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("themeLabel").textContent = isDark ? "Light" : "Dark";
  localStorage.setItem("ra-theme", isDark ? "light" : "dark");
}
(function(){
  var saved = localStorage.getItem("ra-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  document.getElementById("themeLabel").textContent = saved === "dark" ? "Dark" : "Light";
})();

// ── CURSOR ──
var cur  = document.getElementById("cur");
var ring = document.getElementById("cur-ring");
var mx = 0, my = 0, rx = 0, ry = 0;
var cursorMoved = false;

document.addEventListener("mousemove", function(e){
  mx = e.clientX;
  my = e.clientY;

  // Show cursor only after first mouse move
  if(!cursorMoved){
    cursorMoved = true;
    cur.style.opacity  = "1";
    ring.style.opacity = "1";
  }

  cur.style.left = mx + "px";
  cur.style.top  = my + "px";
});

// Ring animation loop
(function loop(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top  = ry + "px";
  requestAnimationFrame(loop);
})();

// Hover effect on clickable elements
document.querySelectorAll("a, button, .proj-card, .skill-card, .stat-box, input, textarea").forEach(function(el){
  el.addEventListener("mouseenter", function(){
    cur.style.width      = "22px";
    cur.style.height     = "22px";
    cur.style.background = "transparent";
    cur.style.border     = "2px solid var(--accent)";
    ring.style.width     = "52px";
    ring.style.height    = "52px";
  });
  el.addEventListener("mouseleave", function(){
    cur.style.width      = "10px";
    cur.style.height     = "10px";
    cur.style.background = "var(--accent)";
    cur.style.border     = "none";
    ring.style.width     = "38px";
    ring.style.height    = "38px";
  });
});

// ── NAV SCROLL ──
window.addEventListener("scroll", function(){
  var nav = document.getElementById("mainNav");
  if(nav) nav.classList.toggle("stuck", window.scrollY > 50);
});

// ── COUNT UP ──
document.querySelectorAll(".stat-n[data-count]").forEach(function(el){
  var target = parseInt(el.dataset.count);
  var done = false;
  var ob = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting && !done){
        done = true;
        var start = null;
        function step(ts){
          if(!start) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          el.textContent = Math.floor((1 - Math.pow(1-p, 3)) * target) + "+";
          if(p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        ob.unobserve(el);
      }
    });
  }, {threshold: 0.5});
  ob.observe(el);
});

// ── CV DOWNLOAD ──
function downloadCV(e){
  e.preventDefault();
  var cv = "RICHARD ANTHONY — FRONTEND WEB DEVELOPER\n"
    + "==========================================\n"
    + "Email:    richardchidi880@gmail.com\n"
    + "GitHub:   github.com/anthonytech05\n"
    + "Location: Lagos, Nigeria\n\n"
    + "SKILLS\n------\n"
    + "HTML5        — Semantic, accessible markup\n"
    + "CSS3         — Responsive layouts & animations\n"
    + "JavaScript   — Dynamic interactivity & logic\n"
    + "Bootstrap    — Mobile-first UI components\n"
    + "Git          — Version control & collaboration\n\n"
    + "PROJECTS\n--------\n"
    + "01. Smart Queue Management System\n    anthonysmartbankproject.netlify.app\n\n"
    + "02. Avenco E-Commerce Website\n    avencoproject.netlify.app\n\n"
    + "03. Renegduo\n    renegduoproject.netlify.app\n\n"
    + "04. School Website\n    schoolproject5.netlify.app\n\n"
    + "05. Insure Landing Page\n    anthonyinsureproject.netlify.app\n\n"
    + "06. Digital Banking\n    digitalbankingproject.netlify.app\n\n"
    + "EDUCATION\n---------\n"
    + "Cophild ICT Centre — Frontend Web Development\n\n"
    + "ABOUT\n-----\n"
    + "Passionate frontend developer trained at Cophild ICT Centre.\n"
    + "Building clean, responsive, and purposeful websites.\n"
    + "Available for freelance and full-time roles.";
  var blob = new Blob([cv], {type:"text/plain"});
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement("a");
  a.href = url;
  a.download = "Richard_Anthony_CV.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
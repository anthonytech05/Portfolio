// Year
document.getElementById("yr").textContent = new Date().getFullYear();

// Theme
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

// Cursor
var cur = document.getElementById("cur");
var ring = document.getElementById("cur-ring");
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener("mousemove", function(e){
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top  = my + "px";
});

function loopRing(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top  = ry + "px";
  requestAnimationFrame(loopRing);
}
loopRing();

document.querySelectorAll("a, button, .proj-card, .skill-card, .stat-box, input, textarea").forEach(function(el){
  el.addEventListener("mouseenter", function(){
    cur.style.width  = "20px";
    cur.style.height = "20px";
    cur.style.background = "transparent";
    cur.style.border = "2px solid var(--accent)";
    ring.style.width  = "50px";
    ring.style.height = "50px";
  });
  el.addEventListener("mouseleave", function(){
    cur.style.width  = "10px";
    cur.style.height = "10px";
    cur.style.background = "var(--accent)";
    cur.style.border = "none";
    ring.style.width  = "38px";
    ring.style.height = "38px";
  });
});

// Nav scroll
window.addEventListener("scroll", function(){
  document.getElementById("mainNav").classList.toggle("stuck", window.scrollY > 50);
});

// Count-up
document.querySelectorAll(".stat-n[data-count]").forEach(function(el){
  var target = parseInt(el.dataset.count);
  var ob = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var start = null;
        function step(ts){
          if(!start) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + "+";
          if(p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        ob.unobserve(el);
      }
    });
  }, {threshold: 0.6});
  ob.observe(el);
});

// Contact form
function handleForm(e){
  e.preventDefault();
  var btn = document.getElementById("cfBtn");
  btn.textContent = "Sent!";
  btn.style.background = "#2a9d5c";
  btn.style.borderColor = "#2a9d5c";
  setTimeout(function(){
    btn.textContent = "Send Message";
    btn.style.background = "";
    btn.style.borderColor = "";
    e.target.reset();
  }, 3000);
}

// CV download
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
    + "02. Avenco E-Commerce Website\n    avenco.vercel.app\n\n"
    + "03. Renegduo\n    renegduoproject.netlify.app\n\n"
    + "04. School Website\n    schoolwebsiteproject-alpha.vercel.app\n\n"
    + "05. Insure Landing Page\n    anthonytech05.github.io/Insure-landing-page-project\n\n"
    + "06. Digital Banking\n    anthonytech05.github.io/Digital-banking-project\n\n"
    + "EDUCATION\n---------\n"
    + "Cophild ICT Centre — Frontend Web Development\n\n"
    + "ABOUT\n-----\n"
    + "Passionate frontend developer trained at Cophild ICT Centre.\n"
    + "Building clean, responsive, and purposeful websites.\n"
    + "Available for freelance and full-time roles.";
  var blob = new Blob([cv], {type: "text/plain"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url; a.download = "Richard_Anthony_CV.txt";
  a.click(); URL.revokeObjectURL(url);
}

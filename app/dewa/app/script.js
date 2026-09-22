(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- accent palette + scrollspy ---------- */
  var palette = {
    violet: getComputedStyle(document.documentElement).getPropertyValue('--violet').trim(),
    teal:   getComputedStyle(document.documentElement).getPropertyValue('--teal').trim(),
    coral:  getComputedStyle(document.documentElement).getPropertyValue('--coral').trim()
  };
  var sections = document.querySelectorAll('section[data-accent]');
  var navLinks = document.querySelectorAll('.navlinks a');

  function setAccent(color){
    document.documentElement.style.setProperty('--accent', color);
  }

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var key = entry.target.getAttribute('data-accent');
          setAccent(palette[key] || palette.violet);
          navLinks.forEach(function(link){
            link.classList.toggle('active', link.getAttribute('data-nav') === entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(function(s){ io.observe(s); });
  }

  /* ---------- cycling hero word ---------- */
  var words = [
    { text:'AI', color: palette.violet },
    { text:'networks', color: palette.teal },
    { text:'systems', color: palette.coral }
  ];
  var wordEl = document.getElementById('cycle-word');
  var idx = 0;
  if(wordEl && !reduceMotion){
    setInterval(function(){
      idx = (idx + 1) % words.length;
      wordEl.style.opacity = 0;
      setTimeout(function(){
        wordEl.textContent = words[idx].text;
        wordEl.style.color = words[idx].color;
        wordEl.style.opacity = 1;
      }, 220);
    }, 2600);
    wordEl.style.transition = 'opacity .22s ease, color .3s ease';
  }

  /* ---------- work card tilt ---------- */
  if(!reduceMotion){
    document.querySelectorAll('.work-row').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(600px) rotateX(' + (-y*3) + 'deg) rotateY(' + (x*3) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transform = '';
      });
    });
  }

  /* ---------- magnetic contact items ---------- */
  if(!reduceMotion){
    document.querySelectorAll('[data-magnetic]').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'translate(' + (x*6) + 'px,' + (y*6) + 'px)';
      });
      el.addEventListener('mouseleave', function(){
        el.style.transform = '';
      });
    });
  }

  /* ---------- network canvas background ---------- */
  var canvas = document.getElementById('net-canvas');
  if(canvas && canvas.getContext){
    var ctx = canvas.getContext('2d');
    var hero = canvas.parentElement;
    var W, H, particles = [];
    var colors = [palette.violet, palette.teal, palette.coral];
    var mouse = { x:null, y:null };

    function resize(){
      W = canvas.width = hero.clientWidth;
      H = canvas.height = hero.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var count = Math.min(46, Math.floor((W*H)/22000));
    for(var i=0;i<count;i++){
      particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-0.5)*0.35,
        vy: (Math.random()-0.5)*0.35,
        r: 1.6 + Math.random()*1.8,
        c: colors[i % colors.length]
      });
    }

    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', function(){ mouse.x = null; mouse.y = null; });

    function hexToRgba(hex, a){
      var h = hex.replace('#','');
      var bigint = parseInt(h,16);
      var r = (bigint>>16)&255, g=(bigint>>8)&255, b=bigint&255;
      return 'rgba('+r+','+g+','+b+','+a+')';
    }

    function tick(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<particles.length;i++){
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if(mouse.x !== null){
          var dx = p.x - mouse.x, dy = p.y - mouse.y;
          var dist = Math.sqrt(dx*dx+dy*dy);
          if(dist < 90){
            p.x += dx/dist*0.6;
            p.y += dy/dist*0.6;
          }
        }
        if(p.x < 0) p.x = W; if(p.x > W) p.x = 0;
        if(p.y < 0) p.y = H; if(p.y > H) p.y = 0;
      }
      for(var i=0;i<particles.length;i++){
        for(var j=i+1;j<particles.length;j++){
          var a = particles[i], b = particles[j];
          var dx = a.x-b.x, dy = a.y-b.y;
          var d = Math.sqrt(dx*dx+dy*dy);
          if(d < 140){
            ctx.strokeStyle = hexToRgba(a.c, (1 - d/140) * 0.28);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }
      for(var i=0;i<particles.length;i++){
        var p = particles[i];
        ctx.fillStyle = hexToRgba(p.c, 0.85);
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      if(!reduceMotion) requestAnimationFrame(tick);
    }
    tick();
  }
})();

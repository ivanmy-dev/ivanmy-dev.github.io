let cielo = document.getElementById('cielo');
    let mar = document.getElementById('mar');
    let text = document.getElementById('text');
    let btn = document.getElementById('btn');
    let suelo = document.getElementById('suelo');
    let header = document.querySelector('header');

    function checkHeader() {
        let value = window.scrollY;
        let screenHeight = window.innerHeight;

        if (value >= screenHeight - 10) {
            header.classList.add("sticky");
            header.style.top = "0px";
        } else {
            header.classList.remove("sticky");
            header.style.top = value * 0.7 + 'px';
        }
    }

    // Ejecutamos al hacer scroll
    window.addEventListener('scroll', function(){
        let value = window.scrollY;
        
        cielo.style.top = value * 0.5 + 'px';
        text.style.marginLeft = value * 4 + 'px';
        text.style.marginTop = value * 1.5 + 'px';
        btn.style.marginLeft = value * 4 + 'px';
        btn.style.marginTop = value * 1.5 + 'px';

        let escala = 1 + (value / 5000); 
        suelo.style.transform = `scale(${escala})`;

        checkHeader();
    });
    window.addEventListener('load', checkHeader);
    window.addEventListener('hashchange', checkHeader);
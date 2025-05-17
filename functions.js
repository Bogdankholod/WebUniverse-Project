function save_json() {
    let jsonString = JSON.stringify(game_state);
    localStorage.setItem("gamestate", jsonString);
}
function load_json() {
    let jsonString = localStorage.getItem("gamestate");

    
    if (jsonString != "undefined" && jsonString != null) {
        game_state = JSON.parse(jsonString);
    }
    else {
        reset()
    }



    try_add_particle(game_state.main_level * 2 + game_state.autoclicker_level * 3)

    update_html()
    restart_autoclicker()

}
function reset() {
    


    const particlesInstance = pJSDom[0].pJS;

    game_state = {
        score: 0,
        main_level: 1,
        autoclicker_level: 1,
        autocliker_on: false,
        particle_count: 10
    }

    for (let i = 0; i < interval_ids.length; i++) {
        clearInterval(interval_ids[i]);
    }

    particlesInstance.fn.modes.removeParticles(particlesInstance.particles.array.length);

    try_add_particle(efrygfurfhrfy)

    interval_ids = [];

    update_html()
}


function main_btn_click() {
    game_state.score += game_state.main_level
    update_html()
}
function main_lvl_btn_click() {

    let lvl_price = calculate_level_price(game_state.main_level, 10)

    if (game_state.score >= lvl_price) {
        game_state.score -= lvl_price
        game_state.main_level++
        update_html()

        try_add_particle(2);
    }
}


function autoclicker_run() {
    game_state.score++
    update_html()
}
function autocliker_buy() {
    let auto_price = calculate_level_price(game_state.autoclicker_level, 100)

    if (game_state.score >= auto_price) {
        game_state.score -= auto_price
        game_state.autoclicker_level++
        interval_ids.push(setInterval(autoclicker_run, 1000))

        try_add_particle(3)
    }

    update_html()
}
function restart_autoclicker() {
    if (game_state.autoclicker_level > 1) {
        for (let i = 1; i < game_state.autoclicker_level; i++) {
            interval_ids.push(setInterval(autoclicker_run, 1000))
        }
    }
}


function update_html() {
    score_display.innerHTML = game_state.score + "$";

    let newExtraFontSize = game_state.score * 0.006

    let newFontSize = Math.min(baseSize + newExtraFontSize, maxSize);
    score_display.style.fontSize = newFontSize + "px";

    score_display.classList.remove("score-pop");
    void score_display.offsetWidth; // "перезапуск" анімації
    score_display.classList.add("score-pop");

    main_lvl_btn.innerHTML = "Наступний рівень: " + calculate_level_price(game_state.main_level, 10) + "$";
    auto_cliker_btn.innerHTML = "Прокачати автоклік: " + calculate_level_price(game_state.autoclicker_level, 100) + "$";
}

function calculate_level_price(level, base_price) {
    return Math.floor(base_price * Math.pow(1.5, level - 1))
}

function back_anim(part_number) {
    particlesJS("particles-js", {
        particles: {
            number: { value: part_number },
            // color: { value: "#00ffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 2
            }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "repulse" }
            }
        }
    });
}

function try_add_particle(count = 1) {
    const particlesInstance = pJSDom[0].pJS;

    particlesInstance.fn.modes.pushParticles(count);
}

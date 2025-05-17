let main_btn = document.getElementById("main-btn")
let main_lvl_btn = document.getElementById("main-lvl-btn")
let auto_cliker_btn = document.getElementById("autocliker-btn")
let btn_reset = document.getElementById("reset")
let score_display = document.getElementById("score-display")

back_anim(10)
load_json()




setInterval(save_json, 1500)

main_btn.onclick = main_btn_click
main_lvl_btn.onclick = main_lvl_btn_click
auto_cliker_btn.onclick = autocliker_buy
btn_reset.onclick = reset


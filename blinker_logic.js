// let element = HTMLElement

// TODO add function to increment and decrement for gamification

element = document.getElementsByClassName('great')

let show_once = function(dyn_element, content, time) {
    (setTimeout(function() {
        dyn_element.textContent = ""
    }, time))()
    dyn_element.textContent= content
    
}


let blinking_int = function(element, words_req_pool){
element.innerText = random_word(words_req_pool)
}

let words_req_pool = [] // from backend, somehow

//I highly recommend to optimaze it 
//considering monitor frequency
//if you really know how rendering works ^^ 
let frequency_per_minute = 500
let show_tick_time = 60000 / frequency_per_minute
let time_to_blink_msecs = 4000

let random_word = function(words_req_pool) {
    return words_req_pool[Math.floor(Math.random() * words_req_pool.length)]
}

let randint = Math.floor(Math.random() * Number) 




fetch('http://127.0.0.1:8000')
.then((response) => {
    console.debug(response)
    return response.json()
})
.then((l_t_json) => {
    console.debug(l_t_json)
    arg_json = l_t_json ? JSON.parse(l_t_json):{}
    let bl_el = document.getElementsByClassName('great')[0]
    let blink = setInterval(blinking_int, show_tick_time, bl_el,arg_json)
    
    fields = document.getElementsByClassName('choice')

    const fill_answers = function() {
        clearInterval(blink)
        document.getElementsByClassName('great')[0].style.display = 'none'
        let check_pool = [bl_el.textContent]
        while (check_pool.length < fields.length) {
            new_text_el = random_word(arg_json)
            if (!check_pool.includes(new_text_el)) {
            check_pool.push(new_text_el)
            }}

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
            }
        shuffle(check_pool)
        console.log(check_pool);
        [...fields].forEach(f => {f.innerHTML = check_pool.pop()})
    }


    const hide_answers = () => {
        [...fields].forEach(f => f.style.display = 'none')
    }

    const check_last = function(event) {
        hide_answers()
        result = document.createElement('h4')
        if (bl_el.textContent==event.target.textContent){
            result.innerText = 'Your right!'
        } else {
            result.innerText = "Wrong answer..."
        }
        blink_area = document.getElementsByTagName('h2')[1]
        document.body.insertBefore(result, blink_area)
    }
    for (const el of fields){
    el.onclick = check_last
    }

    setTimeout(fill_answers, time_to_blink_msecs)

})
.catch((error) => {
    console.error(error)
})



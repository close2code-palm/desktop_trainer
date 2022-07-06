// let element = HTMLElement

element = document.getElementsByClassName('great')

let show_once = function(dyn_element, content, time) {
    (setTimeout(function() {
        dyn_element.textContent = ""
    }, time))()
    dyn_element.textContent= content
    
}

//better realization in prepared pool  forEach method
let blink = function(words_req_pool, show_time, element) {
    setInterval(function() { 
        element.innerText = random_word(words_req_pool)
    }, show_time)
} 

let words_req_pool = [] // from backend, somehow

//I highly recommend to optimaze it 
//considering monitor frequency
//if you really know how rendering works ^^ 
let frequency_per_minute = 3000
let show_time = 60 / frequency_per_minute
let time_to_blink_secs = 7 

let random_word = function(words_req_pool) {
    return words_req_pool[Math.floor(Math.random() * words_req_pool.length)]
}

//main js

// blink()
// let last_word = random_word() 
// show_once(last_word)

let randint = Math.floor(Math.random() * Number) 

function checkin(area_partitions) {
    let check_pool = []
    for (i = 0; area_partitions - 1; i++) {
        check_pool.push(random_word())
    }
    check_pool[randint] = last
    check_pool.forEach(element => {
        let h3 = document.createElement('h3')
        h3.textContent = element
        document.body.appendChild(h3)
    });
}

// let get_wp_json = async function() {
//     const wp_json = await fetch('http://127.0.0.1:8000/', {
//     mode: 'no-cors',
//         })
//     return wp_json.json();
// }

// get_wp_json()
//     .then(words_req_pool => {
//         console.log(words_req_pool)
//         // blink(words_req_pool.JS, 400)
//         // then.checkin(12)
//     })
//     .catch((error) => {
//         console.log(error)
//     })
fetch('http://127.0.0.1:8000'//, {
        //mode: 'no-cors'
    //}
)
.then((response) => {
    console.debug(response)
    return response.json()
})
// .then((pre_parsed_json) => {
// resolve(pre_parsed_json? JSON.parse(pre_parsed_json) : {})
// })
.then((l_t_json) => {
    console.debug(l_t_json)
    arg_json = l_t_json ? JSON.parse(l_t_json):{}
    let bl_el = document.getElementsByClassName('great')[0]
    // need to specify runtime
    let start_time = Date.now()
    while ((Date.now() - start_time) < time_to_blink_secs){
    blink(arg_json ,show_time, bl_el)
}
clearInterval(blinking)
})
.then(function(out_json) {
    console.info('fetcch(', out_json);
    return out_json
})
.catch((error) => {
    console.error(error)
})


//Here is realisation of functionality of resotring big codes
//@param restore_rounds = input tries

let restore_rounds_default = 2
let default_length = 7

num_pool = "1234567890"

rus_pool = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
rus_cap_pool = rus_pool.toUpperCase()
eng_pool = "abcdefghijklmnopqrstuvwxyz"
eng_cap_pool = eng_pool.toUpperCase()

//pool 


chance.string()

function show_check_round(given, input) {
    for (i = 0; i < given.length; i++ ) {
        if (given[i]===input[i]) {
            out_coincidences[i].textContent = input[i]
        }
    }
}

//putting and getting(from filled) array of char inputs
//should create obj?
for (let guess_letter of code_guess) {
    
}

//Guessing code until rounds end or success
function restore_code () {
    while ((given != out_coincidences) && (restore_rounds > 0)) {
            show_check_round()
    }
}


//in addition to mob alternative, u can add 'shade switch' and '3d figures'
//'group of words remember' 'stereomeditation' 'all odd/even' 'false pair'
//and many many more....

//function renders 
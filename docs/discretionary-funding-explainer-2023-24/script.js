if (window.matchMedia("(max-width: 500px)").matches) {
    document.getElementById("step0").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_1_mobile.svg)"
    document.getElementById("step1").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_2_mobile.svg)"
    document.getElementById("step2").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_3_mobile.svg)"
    document.getElementById("step3").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_4_mobile.svg)"
    document.getElementById("step4").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_5_mobile.svg)"
    document.getElementById("step5").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_6_mobile.svg)"
    document.getElementById("step6").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_7_mobile.svg)"
    document.getElementById("step7").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_8_mobile.svg)"
    document.getElementById("step8").dataset.img = "url(https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2023/07/budgetExplainer_8_mobile.svg)"

    /* the viewport is less than or exactly 500 pixels wide */
    } else {
        console.log("desktop")
    /*  console.log(document.getElementById("step1").dataImg="url('https://missionloca.s3.amazonaws.com/mission/wp-content/uploads/2022/08/basemap_scroll1-1.svg')")
    /* the viewport is more than 500 pixels wide */
    }

    // DOM - document object model (section 1)
    var mainScrolly = document.querySelector("#mainScrolly");
    var scrolly = mainScrolly.querySelector("#scrolly");
    var sticky = scrolly.querySelector(".sticky-thing");
    var article1 = scrolly.querySelector("article");


    // initialize the scrollama
    var scroller = scrollama();

    // scrollama event handlers (1)
    function handleStepEnter(response) {
        var el = response.element;
        sticky.style.backgroundImage = el.dataset.img;
    }

    // define init function
    function init() {
        scroller
        .setup({
            step: "#scrolly article .step",
            offset: 1,
            debug: false
        })
    .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", scroller.resize);
}

// kick things off
init();
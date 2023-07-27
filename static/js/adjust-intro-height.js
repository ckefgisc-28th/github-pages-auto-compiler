const introHandleResize = () => {
    let introHeight;

    // introHeight = `${
    //     window.innerHeight - document.querySelector("header").getBoundingClientRect().height
    // }px`

    if (window.innerHeight < window.innerWidth * 0.75)
        introHeight = "80vh";
    else
        introHeight = "26em";

    document.querySelector("#intro > .jumbotron").style["height"] = introHeight;
}

window.addEventListener("resize", introHandleResize);
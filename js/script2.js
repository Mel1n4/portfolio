const text= document.querySelector("#front-end");
const textLoad = () => {
    setTimeout(() => {
        text.textContent= "Front-End Developer";
    }, 0);
    setTimeout(() => {
        text.textContent= "Aspirante Back-End Developer";
    }, 2000);
    setTimeout(() => {
        text.textContent= "Designer";
    }, 4000);
}
textLoad();
setInterval(textLoad, 6000);

$(document).ready(function(){
    $("#btns-port button").click(function(){
        $("#btns-port button").removeClass('active-cl');
        $(this).addClass('active-cl');

        //targeted 
        let targetedItems = $(this).data('target');
        if(targetedItems === 'all'){
            $('.port-item').show();
        }else{
        $('.port-item').hide(); //hide all
        $('.'+targetedItems).show(); //show targeted item
        }
    })
})

if (navigator.serviceWorker) {
	navigator.serviceWorker.register("sw.js")
}
;(function(){
	const selector = "new-account"
	let sticky = false
	let currentPosition = 0
	const imageCounter = parseInt($("[data-name='image-counter']").attr("content"))
	const email = "rentopa78@infinitummail.com"
	$("#new-account").on("submit", function(ev){
		ev.preventDefault()
		sendForm($(this))
		return false
	})

	$("#sticky-navigation").removeClass("hidden")
	$("#sticky-navigation").slideUp(0)
	$("#nav-control").on("click", toggleNav)
	$(".nav-link").on("click", toggleNav)
	setInterval(()=>{
		if (currentPosition < imageCounter) {
			currentPosition++
		} else {
			currentPosition = 0
		}
		$("#gallery .inner").css({
			left: "-"+currentPosition*100+"%"
		})
	},4750)

	$(window).scroll(checkScroll)
	function checkScroll() {
		const inBottom = isInBottom()

		if (inBottom && !sticky){
			// Mostrar la navegación sticky
			sticky = true
			stickNavigation()
		}
		if(!inBottom && sticky){
			// Ocultar la navegación sticky
			sticky = false
			unStickNavigation()
		}
	}
	function toggleNav() {
		$("#responsive-nav ul").toggleClass("active")
		$("#nav-control").toggleClass("glyphicon-menu-hamburger")
	}
	function stickNavigation(){
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp("slow")
		$("#sticky-navigation").slideDown("slow")
	}

	function unStickNavigation(){
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown("slow")
		$("#sticky-navigation").slideUp("slow")
	}
	function isInBottom(){
		const $description = $("#description")
		const descriptionHeight = $description.height()

		return $(window).scrollTop() > $(window).height() - (descriptionHeight * 2)
	}
	function sendForm(){
		let $form = $(selector)
		$.ajax({
    		url: 'https://formspree.io/rentopa78@infinitummail.com', 
    		method: "POST",
    		data: $form.formObject(),
    		dataType: "json",
    		success: function() {
                Push.create("Has creado tu cuenta!", {
                	body: "Tu cuenta en Tecnocursos.com ha sido creada correctamente.",
                	icon: "/imgs/ok.png",
                	timeout: 6000
                })
            }   
		})
	}
})()
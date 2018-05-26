;(function() {
	//$(".step:nth-child(1)").addClass("active")
	const selector = "new-account"
	$(".path-step").on("click", (ev)=>{
		const $current_circle = $(ev.target)
		focus_circle($current_circle)
		const position = $current_circle.index(".path-step") + 1
		let $test = $(".step:nth-child("+position+")")
		siguiente($test)
	})
	$(selector).find(".input").on("change", (ev)=>{
		const $input = $(ev.target)
		const $next_step = $input.parent().next(".step")
		const valid_form = es_valido()
		if (!valid_form && $next_step.length > 0) {
			siguiente($next_step)
		} else {
			validar()
		}
	})
	function validar(){
		if (es_valido()) {
			send_form
		} else {
			let $fieldset_invalido = $(selector).find(".input:invalid").first().parent()
			siguiente($fieldset_invalido)
			$(".path-step:nth-child(1)").addClass("red")
		}
	}
	function es_valido(){
		return document.querySelector(selector).checkValidity()
	}
	function siguiente($next_step){
		$(".step.active").removeClass("active")
		$next_step.addClass("active")
		$next_step.find(".input").focus()
		const position = $next_step.index(".step") + 1
		const $circle = $(".path-step:nth-child("+position+")")
		focus_circle($circle)
	}
	function focus_circle($circle){
		$(".path-step.active").removeClass("active")
		$circle.addClass("active")
	}
})()
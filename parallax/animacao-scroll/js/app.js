// 1 – Identificar quando o usuário utiliza o scroll
// 2 – Calcular a distância entre o topo da página e o scroll
// 3 – Calcular a distância entre o topo da página e o elemento que deseja animar
// 4 – Comparar as duas distâncias anteriores
// 5 – Adicionar uma classe com css animation ou transition ao elemento animado


// ========================================
// Debounce do Lodash
// ========================================
// Essa função ajudará a dimunuir as vezes em que uma 
// função é chamada. Neste caso específico, ela 
// ocasionará um atraso de 200ms na função animeScroll()
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


(function () {

    let $target = $('.anime'),
        animationClass = 'anime-start',
        _offset = $(window).height() * 3/4;

    function animeScroll(){

        //Calcular a distância entre o topo da página e o scroll
        let documentTop = $(document).scrollTop();

        // Pegar cada target separadamente (.anime)
        // each proporciona pegar item por item que possui
        // a class .anime, evitando que ao mover a scroll
        // todos os elementos com a class .anime seja ativiada
        // em todos os elementos
        // Dentro de each() eu escrevo a função
        $target.each(function(){
            // calculo da distância entre o item e o top
            let itemTop = $(this).offset().top;

            if(documentTop > itemTop - _offset){
                $(this).addClass(animationClass);
            }
            else{
                $(this).removeClass(animationClass);
            }
        });

    }

    // é necessário manter essa ativação inicial (pura), pois ao carregar
    // a página, já deve ser verificado se existe algum elemento
    // que pode ser animado, respeitando o valor da variável _offset
    animeScroll();

    // criando o evento para que a animação ocorra ao rolar o scroll
    $(document).scroll(debounce(
        function(){
            animeScroll();
            console.log('teste')
        }, 200
    ));

}());
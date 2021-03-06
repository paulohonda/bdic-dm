cart_buy = function(){
	var _init = function (){
	
		if(!sessionStorage.getItem('userName')){
			window.location = '/';
			return false;
		}	
		//carrega cabeçalho
		util.loadHeader();
		//carrega rodape
		util.loadFooter();

		//valida o tipo do usuário que logado
		$(".liLogged").hide();
		if($.sessionStorage.getItem('userType') == "client"){
			util.setNameUser();
			$(".lnkLogin").hide();
			$(".liLogged").show();
			
		}
		
		//identifica div como modal
		$('.modal-trigger').leanModal();
		
		//preenche os produtos na tabela
		cart = $.sessionStorage.getItem('cartProducts');
		if(!cart){
			tr = $('<tr/>');
			tr.append("<td colspan='5' class='center'>O carrinho está vazinho!</td>");
			$('table').append(tr);
			$('.pagamentofinalizacao').hide();
			return false;
		}
		var total = 0;
		$.each(JSON.parse(cart), function(index, item) {
			tr = $('<tr/>');
			tr.append("<td><img height='100px' src='"+item.imagem+"'/></td>");
			tr.append("<td>" + item.descricao + "</td>");
			tr.append("<td class='center'>" + item.quantidade + "</td>");
			//tr.append("<td><input type='number' class='center' min='1' max='100' value='"+item.quantidade+"'></td>");
			tr.append("<td class='right2'>" + item.valor + "</td>");
			valorCalc = item.valor;
			valorCalc = valorCalc.replace(".","");
			valorCalc = valorCalc.replace(",",".");
			subTotal = parseFloat(valorCalc)*parseFloat(item.quantidade);
			total+=subTotal;
			tr.append("<td class='right2'>" + util.formatReal(subTotal) + "</td>");
			$('table tbody').append(tr);
		});
			tr = $('<tr/>');
			tr.append("<td colspan='4' class='right2'><b>Total</b></td>");
			tr.append("<td class='right2'>" + util.formatReal(total) + "</td>");
			$('table').append(tr);
			$('.pagamentofinalizacao').show();
	}
	return {
		init:_init
	}
}();
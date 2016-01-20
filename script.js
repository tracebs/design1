function anichange (objName) {
  if ( $(objName).css('display') == 'none' ) {
    $(objName).animate({height: 'show'}, 400);
  } else {
    $(objName).animate({height: 'hide'}, 200);
  }
}

define(['jquery'], function($){
    var CustomWidget = function () {
    	var self = this; 	
		var arrfieldid = ['861122','861124'];
		var blok1name = 'Объединенные поля';
		
		this.callbacks = {
			render: function(){
				//console.log('render'); test 7zip
				w_code = self.get_settings().widget_code; //в данном случае w_code='new-widget'
				//JSON.parse = "";
				var template = '<div><h1>Design</h1>'+					
                    '<center><button class="button-input" id="designhtml">Click</button></center>'+					
                    '<div id="parsehtml1"></div>'+
                    '</div>'+
					'<link type="text/css" rel="stylesheet" href="/upl/'+w_code+'/widget/style.css" >';

                self.render_template({
                    caption:{
                        class_name:'js-ac-caption1',
                        html:''
                    },
                    body:'',
                    render :  template
                });
				$jsonurl = '/upl/'+w_code+'/widget/manifest.json';
				$.getJSON( $jsonurl, function( data ) {
					vers1901 = data.widget.version;
					$('#parsehtml1').html('v.'+vers1901);
					console.log('Design1 render:'+vers1901);
				});
				return true;
			},
			init: function(){
				console.log('Design1 init');
				//====Init================================
				if ($("#design1tab1").length) {
						//элемент есть
				} else {
					$('#edit_card').before('<div class="design1tab" id="design1tab1">Данные сделки</div>');
					$('#design1tab1').on('click', function(){
						anichange("#edit_card");
						//alert('Вы нажали на элемент "design1tab1"');
					});						
				}
				i1901 = 2;
				$('.company_contacts__head').each(function( index ) {
					varr19=""+$( this ).text();
					console.log('Start-OnClick-design each:'+varr19);
					$( this ).before('<div class="design2tab" id="design1tab'+i1901+'">Данные: '+varr19+'</div>');
					if (varr19=="Компания") {
						$('#design1tab'+i1901+'').on('click', function(){
							anichange("#companies_list");
						});	
					} else if (varr19=="Контакты") {
						$('#design1tab'+i1901+'').on('click', function(){
							anichange("#contacts_list");
						});	
					} else {
					//ничего
					}
						
					i1901 = i1901+1;
					//.before('<div class="design2tab">Данные</div>');
				});	
					
				//====Init================================
				return true;
			},
			bind_actions: function(){
				$('#designhtml').on('click', function(){
					//$.getJSON( "ajax/test.json", function( data ) {
					self.callbacks.getData();
					console.log('Start-OnClick-design');
					//получаем данные из таблички
					htmltable = "";
					for (var k15 = 0; k15 < arrfieldid.length; k15++) {
						tmphtml = "" + $('.tr_wrapper_'+arrfieldid[k15]).html();
						tmpclasses = "" + $('.tr_wrapper_'+arrfieldid[k15]).attr('class');
						htmltable = htmltable + '<tr class="'+tmpclasses+'" data-id="'+arrfieldid[k15]+'">'+tmphtml+'</tr>';
					}	
					
					//формируем окончательный html					
					htmlres = '<div class="design3tab" id="design1tab3">'+blok1name+'</div>'+					
					'<div id="design1tab4">'+
					'<table class="card-cf-table card-cf-table-main-entity "><tbody>'+
					htmltable+
					'</tbody></table>'+
					'</div>';					
					
					//мочим данные в табличке
					for (var k15 = 0; k15 < arrfieldid.length; k15++) {
						$('.tr_wrapper_'+arrfieldid[k15]).remove('');
					}
					//вставляем html
					$('#card_tags').before(htmlres);
					
					//вставляем обработчик
					$('#design1tab3').on('click', function(){
						anichange("#design1tab4");
					});
					
					console.log('Finish-OnClick-design');

				});

				//console.log(self.system().area);


				return true;
			},
			settings: function(){

				return true;
			},
			onSave: function(){

				return true;
			},
			destroy: function(){

			},
			contacts: {
					//select contacts in list and clicked on widget name
					selected: function(){

					}
				},
			leads: {
					//select leads in list and clicked on widget name
					selected: function(){

					}
				},
			tasks: {
					//select taks in list and clicked on widget name
					selected: function(){

					}
				},
			getData: function(){
					console.log('StartGetData');					
					
					console.log('FinishGetData');
			}
		};
		return this;
    };


return CustomWidget;
});
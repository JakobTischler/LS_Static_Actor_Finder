// JavaScript Document
// @Jakob Tischler, 2012
// @to find possible static actor error sources in an i3d map file

$(document).ready(function() {
	var textarea = $('textarea'),
		info = $('#info');
		
	/*
	var lvl_1_count = $('#tempXML > *').length,
		lvl_2_count = $('#tempXML > * > *').length,
		lvl_3_count = $('#tempXML > * > * > *').length,
		lvl_4_count = $('#tempXML > * > * > * > *').length;
	
	$('#tempXML > *').addClass("lvl_1");
	$('.lvl_1 > *').addClass('lvl_2');
	$('.lvl_2 > *').addClass('lvl_3');
	$('.lvl_3 > *').addClass('lvl_4');
	*/
	
	textarea.on("blur", function() {
		if ($(this).val() !== '' && $(this).hasClass("success")) { 
			$(this).addClass("blur"); 
		}
	});
	textarea.on("focus", function() {
		$(this).removeClass("blur");
	});
	
	
	$('#submit').on('click', function() {
		scene = $.trim(textarea.val());
		$('#info, #output1, #output2 ol').html(' ');
		
		validStarters = [ "<Scene", "<Camera", "<Light", "<Shape", "<TerrainTransformGroup", "<Layer", "<Foliage", "<Detail", "<TransformGroup" ];
		valid = false;
		for (i=0; i<validStarters.length; i++) {
			var term = validStarters[i],
				termLength = term.length;
			if (valid == false) {
				if (scene.substr(0, termLength) !== term) {
					valid = false;
				} else { 
					valid = true;
					break;
				};
				//console.log(term + " (" + termLength + "): valid = " + valid);
			};
		};
		
		if (scene == '' || valid == false) {
			textarea.addClass('error');
			info.addClass('error').text('Please enter valid <Scene> XML data.');	
		} else {
			textarea.removeClass('error').addClass('success blur');
			info.removeClass('error').addClass('success');
			sceneXML = $(scene), //convert to xml line
			tempXML = $('#tempXML');
			tempXML.html(sceneXML);
	
			tempXML.find('*').each(function() {
				var e = $(this),
					scaleAttr = e.attr('scale');
				
				if (typeof scaleAttr !== 'undefined' && scaleAttr !== false) {
					e.addClass('hasScale');
				};
				if (e.find('*').length > 0) { e.addClass('hasChildren'); };
			});
			$('.hasScale.hasChildren').each(function() {
				var e = $(this),
					staticAttr = e.find('*').attr('static');
					scaleAttrCh = e.find('*').attr('scale');
					
				if (typeof staticAttr !== 'undefined' && staticAttr !== false && !scaleAttrCh) {
					e.addClass('staticActor');
				};
			});
			//console.log('Static Actor Errors: ' + $('.staticActor').length);
			
			$.fn.outerHTML = function() {
				return $('<div>').append( this.eq(0).clone() ).html();
			};
			
			var outputList = $('#output2').find('ol');
			
			var staticActorsFound = $('.staticActor').length;
			
			if (staticActorsFound == 0) {
				$('#output1').html('<span class="tipp">No errors have been found. Good boy.</span>');
			} else {
				if (staticActorsFound == 1) { 
					resultText = "1 possible error has been found." 
				} else { 
					resultText = staticActorsFound + ' possible errors have been found.' 
				};
				$('#output1').html('<span class="tipp">' + resultText + '</span>');
			
				var i = 1;
				$('.staticActor').each(function() {
					var e = $(this),
						name = e.attr('name'),
						translation = e.attr('translation'),
						rotation = e.attr('rotation'),
						scale = e.attr('scale'),
						nodeid = e.attr('nodeid'),
						shapeid = e.attr('shapeid');
					e.children().removeAttr('class');
					var eXML = e.removeAttr('class').outerHTML();
						
					var outputText = 
					"<table><tbody>"+
					"<tr><td>Name</td><td>"+name+"</td></tr>"+
					"<tr><td>Translation</td><td>"+translation+"</td></tr>"+
					"<tr><td>Rotation</td><td>"+rotation+"</td></tr>"+
					"<tr><td>Scale</td><td>"+scale+"</td></tr>"+
					"<tr><td>Node ID</td><td>"+nodeid+"</td></tr>"+
					"<tr><td>Shape ID</td><td>"+shapeid+"</td></tr>"+
					"</tbody></table>"+
					"<div class='codeWrapper'><span class='mediumBold'>Code</span><pre class='xmlCode'></pre>"+
					"<div style='text-align:right;'>To find this in your map i3d, search for <code>shapeid=\""+shapeid+"\"</code></div></div>";
								
					outputList.append('<li id="item-'+i+'" class="item"></li>');
					$('#item-'+i).html(outputText).find('.xmlCode').text(e.outerHTML());
					i++;
					//console.log(e.outerHTML());
				});
			}; //endif staticActorsFound
			
			//$("textarea").snippet("xml",{style:"bright"});
			$("pre.xmlCode").snippet("xml",{style:"bright"});
			
			$('pre.xmlCode').find('.sh_type').each(function() {
				var e = $(this);
				if (e.text() == "scale" || e.text() == "static") {
					e.addClass('errorHighlight');
					e.nextUntil('.sh_type').addClass('errorHighlight');
				};
			});
		};
	});
	
	
});

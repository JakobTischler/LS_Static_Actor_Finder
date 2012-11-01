// @name: LS Static Actor Finder
// @version: v0.23
// @author: Jakob Tischler, 2012
// @desc: to find possible static actor error sources in an i3d map file

$(document).ready(function() {
	var currentVersion = '0.23 beta',
		versionDisplay = $('[rel="version"]'),
		textarea = $('textarea'),
		info = $('#info');
		
	versionDisplay.text('v' + currentVersion);
		
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
				if (scene.substr(0, termLength) == term) {
					valid = true;
					break;
				};
				//console.log(term + " (" + termLength + "): valid = " + valid);
			};
		};
		
		if (!scene || scene == '' || valid == false) {
			textarea.addClass('error');
			info.addClass('error').text('Please enter valid <Scene> XML data.');	
		} else {
			textarea.removeClass('error').addClass('success blur');
			info.removeClass('error').addClass('success');
			sceneXML = $(scene), //convert to xml line
			tempXML = $('#tempXML');
			tempXML.html(sceneXML);
	
			/* OLD:
 			tempXML.find('*:parent').each(function() {
				var e = $(this),
					scaleAttr = e.attr('scale');
				
				if (typeof scaleAttr !== 'undefined' && scaleAttr !== false) {
					e.addClass('hasScale hasChildren');
					children = e.find('[static]:not([scale])');
					if (children.length > 0) { e.addClass('staticActor'); };
				};
			});
			*/

			tempXML.find('*:parent[scale]').each(function() {
				var e = $(this);
				e.addClass('hasScale hasChildren');
				children = e.find('[static="true"]:not([scale])');
				if (children.length > 0) { e.addClass('staticActor'); };
			});


			
			$.fn.outerHTML = function() {
				return $('<div>').append( this.eq(0).clone() ).html();
			};
			
			var outputList = $('#output2').find('ol');
			
			var staticActorsFound = $('.staticActor').length;
			
			if (staticActorsFound == 0) {
				$('#output1').html('<span class="tipp">No errors have been found. Good boy.</span>');
			} else {
				if (staticActorsFound == 1) { 
					resultText = "1 possible error has been found. Go fix it. Now." 
				} else { 
					resultText = staticActorsFound + ' possible errors have been found. Not that there\'s anything wrong with that...' 
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
						
					var outputText = "<table><tbody>";
					if (name) { outputText += "<tr><td>Name</t+d><td>"+name+"</td></tr>" };
					if (translation) { outputText += "<tr><td>Translation</td><td>"+translation+"</td></tr>" };
					if (rotation) { outputText += "<tr><td>Rotation</td><td>"+rotation+"</td></tr>" };
					if (scale) { outputText += "<tr><td>Scale</td><td>"+scale+"</td></tr>" };
					if (nodeid) { outputText += "<tr><td>Node ID</td><td>"+nodeid+"</td></tr>" };
					if (shapeid) { outputText += "<tr><td>Shape ID</td><td>"+shapeid+"</td></tr>" };
					outputText += "</tbody></table>"+
					"<div class='codeWrapper'><span class='mediumBold'>Code</span><pre class='xmlCode'></pre>";
					if (nodeid) {
						outputText += "<div style='text-align:right;'>To find this section in your map i3d, search for <code>nodeid=\""+nodeid+"\"</code></div>";
					};
					outputText += "</div>";
								
					outputList.append('<li id="item-'+i+'" class="item"></li>');
					$('#item-'+i).html(outputText).find('.xmlCode').text(e.outerHTML());
					i++;
					//console.log(e.outerHTML());
				});
			}; //endif staticActorsFound

			tempXML.html('');
			
			
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

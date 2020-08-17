const onLoadMakeCollapsablesInert = function() {

	const collapsables = document.querySelectorAll( "[data-collapsed]" )
	if ( collapsables ) {
		collapsables.forEach( item => {
			item.inert = true
		})
	}
}

const handlePageNav = function() {
	const pageNav = document.querySelector( ".js-page-nav" )
	const pageNavToggle = document.querySelector( ".js-page-nav-toggle" )
	if ( pageNav && pageNavToggle ) {
		pageNavToggle.addEventListener("click", function() {
			var isCollapsed = pageNav.getAttribute('data-collapsed') === 'true';
			if ( isCollapsed ) {
				pageNav.setAttribute('data-collapsed', 'false')
				pageNav.classList.add( "is-open" )
				pageNav.inert = false
				this.setAttribute( "aria-expanded", "true" )
			} else {
				pageNav.setAttribute('data-collapsed', 'true')
				pageNav.classList.remove( "is-open" )
				pageNav.inert = true
				this.setAttribute( "aria-expanded", "false" )
			}
		})
	}
}

const handleSubmenusCollapsing = function() {
	const menuComponents = []
	let descendantButtons = []
	const submenuButtons = document.querySelectorAll( ".js-menu-button" )
	if ( submenuButtons ) {
		submenuButtons.forEach( item => {
			var itemHeader = item.parentNode
			var itemMenu = itemHeader.nextElementSibling
			var transitionDuration = parseFloat( window.getComputedStyle( itemMenu ).transitionDuration ) * 1000
			var itemButton = itemHeader.querySelector( ".js-menu-button" )
			let component = {
				menu: itemMenu,
				btn: itemButton,
				transitionDuration: transitionDuration,
				collapsed: true
			}
			menuComponents.push( component )
		})
	}
	menuComponents.forEach( component => {
		component.btn.addEventListener("click", function() {
			var listHeader = this.parentNode
			descendantButtons = listHeader.parentNode.querySelectorAll( ".js-menu-button" )
			if ( component.collapsed ) {
				expandSubmenu( component )
			} else {
				collapseDescendantSubmenus( descendantButtons )
				collapseSubmenu( component )
			}
		})
	})

	function collapseSubmenu( element ) {
		const menu = element.menu
		const btn = element.btn
		const listHeader = element.btn.parentNode
		const transitionDuration = element.transitionDuration

		// get the height of the element's inner content, regardless of its actual size
		var sectionHeight = menu.scrollHeight;
	
		// temporarily disable all css transitions
		var elementTransition = menu.style.transition;
		menu.style.transition = '';
	
		// on the next frame (as soon as the previous style change has taken effect),
		// explicitly set the element's height to its current pixel height, so we 
		// aren't transitioning out of 'auto'
		requestAnimationFrame(function() {
			menu.style.height = sectionHeight + 'px';
			menu.style.transition = elementTransition;
		
			// on the next frame (as soon as the previous style change has taken effect),
			// have the element transition to height: 0
			requestAnimationFrame(function() {
				menu.style.height = 0 + 'px';

				setTimeout(function() {
					element.collapsed = true
				}, transitionDuration)
			});
		});
	
		// mark the section as "currently collapsed"
		menu.setAttribute('data-collapsed', 'true');
		menu.classList.remove( "is-open" )
		menu.inert = true
		listHeader.querySelector( "a" ).setAttribute( "aria-expanded", "false" )
		listHeader.querySelector( "button" ).setAttribute( "aria-expanded", "false" )
	}

	function expandSubmenu( element ) {
		const menu = element.menu
		const btn = element.btn
		const listHeader = element.btn.parentNode
		const transitionDuration = element.transitionDuration

		// get the height of the element's inner content, regardless of its actual size
		var sectionHeight = menu.scrollHeight;
	
		// have the element transition to the height of its inner content
		menu.style.height = sectionHeight + 'px';
		
		// when the next css transition finishes (which should be the one we just triggered)
		menu.addEventListener('transitionend', function(e) {
			// remove this event listener so it only gets triggered once
			menu.removeEventListener('transitionend', arguments.callee);
		
			// remove "height" from the element's inline styles, so it can return to its initial value
			menu.style.height = null
		});

		setTimeout(function() {
			element.collapsed = false
		}, transitionDuration)
	
		// mark the section as "currently not collapsed"
		menu.setAttribute('data-collapsed', 'false')
		menu.classList.add( "is-open" )
		menu.inert = false
		listHeader.querySelector( "a" ).setAttribute( "aria-expanded", "true" )
		listHeader.querySelector( "button" ).setAttribute( "aria-expanded", "true" )
	}

	function collapseDescendantSubmenus( element ) {
		element.forEach( btn => {
			var menusToBeCollapsed = []
			menusToBeCollapsed.push( btn.parentNode.nextElementSibling )
			menusToBeCollapsed.forEach( menu => {
				var notCollapsed = menu.getAttribute('data-collapsed') === 'false'
				if ( notCollapsed ) {
					btn.click()
				}
			})
		})
	}
}

window.addEventListener("DOMContentLoaded", function() {
	onLoadMakeCollapsablesInert()
	handleSubmenusCollapsing()
	handlePageNav()
})

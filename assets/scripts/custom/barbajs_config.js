import barba from '@barba/core';
import 'regenerator-runtime/runtime';
import LocomotiveScroll from 'locomotive-scroll';

let scroll;

console.log("barba", barba);

// (function(){
// 	// document.documentElement.classList.remove('is-loaded');
// 	// document.documentElement.classList.add('is-loading');
// 	setTimeout(() => {
// 		// document.documentElement.classList.remove('is-ready');
// 		document.documentElement.classList.add("dom-is-loaded");
// 		document.documentElement.classList.add("has-ANYTHING-open");
// 	}, 300)
// })();

function smoothScroll(container) {
	setTimeout(() => {
		scroll = new LocomotiveScroll({
			el: container.querySelector('[data-scroll-container]'),
			smooth: true,
			getSpeed: true,
			getDirection: true,
			useKeyboard: true
		});
	}, 1000);
	// timeout is CRUCIAL. more content on the page = set a longer timeout
	// if timeout is not set the document will still be loading
	// when smoothScroll inits and the height calculation will be wrong
	// which will make elements snap in and out of the viewport while scrolling
}

function transitionCallbackFn(container, obj) {
	setTimeout(function() {
		scroll.destroy();
		// console.log("container", container);
		smoothScroll(container);
		document.documentElement.classList.remove("dom-is-loading");
		document.documentElement.classList.add("dom-is-loaded");
		obj.subFunction();
	}, 1050)
}

barba.init({
	debug: true,
	transitions: [
		{
			name: "Test transition",
			// sync: true,
			once( data ) {
				// console.log("O N C E", data.next.container);
				smoothScroll(data.next.container);
				document.documentElement.classList.add("dom-is-loading");
			},

			afterOnce( data ) {
				// console.log("after once", data.next.container);
				document.documentElement.classList.remove("dom-is-loading");
				document.documentElement.classList.add("dom-is-loaded");
				setTimeout(function() {
					document.documentElement.classList.add("dom-is-animated");
				}, 1050)
			},

			leave( data ) {
				// console.log("L E A V E", data.current.container);
				document.documentElement.classList.remove("dom-is-loaded");
				document.documentElement.classList.remove("dom-is-animated");
				document.documentElement.classList.add("dom-is-loading");
			},

			enter( data ) {
				// console.log("E N T E R", data.next.container);
			},

			beforeEnter( data ) {
				const done = this.async();
				transitionCallbackFn(data.next.container, {
					subFunction: () => {
						done();
					}
				});
			},

			afterEnter( data ) {
				// console.log("after enter", data.next.container);
				document.documentElement.classList.remove("dom-is-loading");
				setTimeout(function() {
					document.documentElement.classList.add("dom-is-loaded");
					document.documentElement.classList.add("dom-is-animated");
				}, 1050)
			},
		},
	]
});

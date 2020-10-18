const cards = (function() {
    let items = null;
    const colors = ['#6F98A8','#2B8EAD','#2F454E','#2B8EAD','#2F454E','#BFBFBF','#BFBFBF','#6F98A8','#2F454E'];
    let shuffleBtn = null;
    let sortBtn = null;
    let gridContainer = null;
    let media = null;
    let isMobileDevice = true;
    const init = function () {
        getItems();
        cacheDom();
        observeMedia(media);
        bindEvents();
        generateGrid('shuffle');
    }
    function cacheDom() {
        shuffleBtn = document.querySelector('#shuffleBtn');
        sortBtn = document.querySelector('#sortBtn');
        gridContainer = document.getElementById("gridContainer");
        media = window.matchMedia("(min-width: 375px)");
    }
    function bindEvents() {
        shuffleBtn.addEventListener('click', () => {
            gridContainer.querySelectorAll('*').forEach(el => el.remove());
            getItems();
            generateGrid('shuffle');
        });
        sortBtn.addEventListener('click',() => {
            gridContainer.querySelectorAll('*').forEach(el => el.remove());
            getItems();
            generateGrid('sort');
        });
        media.addListener(observeMedia);
    }
    function render(element) {
        gridContainer.appendChild(element);
    }
    function getItems() {
        items = Array.from(Array(9).keys());
    }
    function generateGrid(decide){
		return decide === 'shuffle' ? shuffleCards() : sortCards();
	}
	function shuffleCards() {
		for (let i = items.length - 1; i >= 0; i--) {
			let random = items.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
			constructElement(random);
		}
	}
	function sortCards() {
		for (let i = 0;i < items.length; i++) {
			constructElement(i);
		}
    }
    function constructElement(i) {
		let divElement = document.createElement("p");
        divElement.classList.add("gridValues");
        divElement.setAttribute(
            "style", `
            text-align:center;
            width:100%;
            height:100%;
            box-sizing:border-box;
            `
        );
        if (isMobileDevice) {
            divElement.setAttribute(
                "style", `color:#000000;
                border: none;
                background-color:#EFEFEF;
                box-sizing:border-box;
                border-left:10px solid ${colors[i]}`
            );
        } else {
            divElement.setAttribute(
                "style", `color:#FFFFFF;
                border: 1px solid black;
                text-align:center;
                background-color:${colors[i]}`
            );
        }

		divElement.innerHTML = i+1;
		render(divElement);
    }
    function observeMedia(x) {
        let all = document.getElementsByClassName('gridValues');
        if (x.matches) {
            isMobileDevice = false;
            for (let i = 0; i < all.length; i++) {
                all[i].style.color = '#FFFFFF';
                all[i].style.border = '1px solid black';
                all[i].style['background-color'] = `${colors[i]}`;
            }
        } else {
            isMobileDevice = true;
            for (let i = 0; i < all.length; i++) {
                all[i].style.color = '#000000';
                all[i].style.border = 'none';
                all[i].style['background-color'] = '#EFEFEF';
                all[i].style['border-left'] = `10px solid ${colors[i]}`;
            }
        }
    }

    return { init };
})();

window.addEventListener('load', cards.init);
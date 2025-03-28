document.addEventListener('DOMContentLoaded', function () {

    // Fonction pour initialiser les sliders de comparaison
    function initializeSliders() {
        const sliders = document.querySelectorAll('.comparison-slider');

        sliders.forEach(slider => {
            const resizeElement = slider.querySelector('.resize');
            const img = resizeElement.querySelector('img');
            const divider = slider.querySelector('.divider');

            // Met à jour la largeur de l'image lors du redimensionnement
            function updateImageWidth() {
                //img.style.width = `${slider.offsetWidth}px`;
            }

            // Initialise le slider
            updateImageWidth();
            setupDrag(divider, resizeElement, slider);

            // Met à jour l'image lorsque la fenêtre est redimensionnée
            window.addEventListener('resize', updateImageWidth);
        });
    }

    // Fonction pour gérer le drag du slider
    function setupDrag(dragElement, resizeElement, container) {
        let isDragging = false;
        let isTouch = false;

        // Détecte si l'utilisateur utilise un touch
        window.addEventListener('touchstart', () => { isTouch = true; });
        window.addEventListener('touchend', () => { isTouch = false; });

        function onMouseMoveOrTouchMove(e) {
            if (!isDragging) return;

            const pageX = e.pageX || e.touches[0].pageX;
            const containerRect = container.getBoundingClientRect();
            const dragWidth = dragElement.offsetWidth;
            const containerOffsetLeft = containerRect.left;
            const containerWidth = containerRect.width;
            const minLeft = containerOffsetLeft + 10;
            const maxLeft = containerOffsetLeft + containerWidth - dragWidth - 10;
            let leftValue = pageX - containerOffsetLeft - (dragWidth / 2);

            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            const widthPercentage = ((leftValue + dragWidth / 2 - containerOffsetLeft) / containerWidth) * 100 + '%';

            dragElement.style.left = widthPercentage;
            resizeElement.style.width = widthPercentage;
        }

        function onMouseDownOrTouchStart(e) {
            isDragging = true;
            dragElement.classList.add('draggable');
            resizeElement.classList.add('resizable');
            document.addEventListener('mousemove', onMouseMoveOrTouchMove);
            document.addEventListener('touchmove', onMouseMoveOrTouchMove);
        }

        function onMouseUpOrTouchEnd() {
            isDragging = false;
            dragElement.classList.remove('draggable');
            resizeElement.classList.remove('resizable');
            document.removeEventListener('mousemove', onMouseMoveOrTouchMove);
            document.removeEventListener('touchmove', onMouseMoveOrTouchMove);
        }

        dragElement.addEventListener('mousedown', onMouseDownOrTouchStart);
        dragElement.addEventListener('touchstart', onMouseDownOrTouchStart);
        document.addEventListener('mouseup', onMouseUpOrTouchEnd);
        document.addEventListener('touchend', onMouseUpOrTouchEnd);
    }

    initializeSliders();
});

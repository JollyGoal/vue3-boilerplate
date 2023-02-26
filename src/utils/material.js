export function useMaterial() {
    const handleMenuRipple = (e) => {
        const target =
            e.target || e.relatedTarget || e.toElement || e.currentTarget;

        const d = Math.max(target.clientWidth, target.clientHeight);
        const rippleDiv = document.createElement("div");
        target.appendChild(rippleDiv);
        // Do not forget to apply .ripple class and it's animation keyframes,
        // .ripple {
        //     pointer-events: none;
        //     border-radius: 50%;
        //     position: absolute;
        //     animation: rippleEffect 0.4s linear;
        //     opacity: 0;
        //   }
        //   @keyframes rippleEffect {
        //     0% {
        //       transform: scale(0);
        //       opacity: 1;
        //     }
        //     100% {
        //       transform: scale(2);
        //       opacity: 0;
        //     }
        //   }
        // Also set `pointer-events: none` to all child elements and set `overflow: hidden`
        rippleDiv.classList.add("ripple");
        rippleDiv.style.width = rippleDiv.style.height = d + "px";
        rippleDiv.style.left = e.layerX - d / 2 + "px";
        rippleDiv.style.top = e.layerY - d / 2 + "px";

        // If `data-color` attribute is set, set the color of the ripple
        // e.g. data-color="#FF0000"
        // else it takes the color of the element or default 'cyan'
        rippleDiv.style.backgroundColor = target.dataset.color ?? target.style.color ?? "cyan";

        // Remove ripple after animation is finished (default 0.4s)
        setTimeout(
            (val) => {
                val.remove();
            },
            400,
            rippleDiv
        );
    };

    const removePrevElement = (e) => {
        const target = e.target || e.relatedTarget || e.toElement || e.currentTarget;
        const prevElement = target.previousElementSibling;
        if (prevElement) {
            prevElement.remove();
        }
    };

    return {
        handleMenuRipple, removePrevElement
    }
}
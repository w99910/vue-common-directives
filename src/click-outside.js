import {Random} from "js-utils";

function trigger(element, binding, event) {
    const elementRect = element.getBoundingClientRect();
    const targetElementRect = event.target.getBoundingClientRect();
    if (window.disableClickOutside) {
        return;
    }
    if (targetElementRect.left >= elementRect.left && targetElementRect.right <= elementRect.right && targetElementRect.top >= elementRect.top && targetElementRect.bottom <= elementRect.bottom) {
        return;
    }
    binding.value(event)
}

let callback = null;

export default {
    mounted(el, binding) {
        if (typeof binding.value === 'function') {
            el.id = Random.string();
            callback = trigger.bind(null, el, binding)
            document.addEventListener('click', callback, true)
        }
    },
    unmounted(el, binding) {
        if (typeof binding.value === 'function') {
            document.removeEventListener('click', callback, true)
        }
    }
}

export default {
    count: 0,
    mounted(el, binding) {
        if (typeof binding.value === 'function') {
            let count = 0;
            el.addEventListener('click', (e) => {
                setTimeout(() => {
                    if (count === 2) {
                        binding.value(e)
                    }
                    count = 0;
                }, 300)
                count++;
            })
        }
    },
    unmounted(el, binding) {
        if (typeof binding.value === 'function') {
            el.removeEventListener('click', (e) => {
                this.count++;
                setTimeout(() => {
                    if (this.count === 1) {
                        console.log('click')
                        binding.value(e)
                    }
                    this.count = 0;
                }, 300)
            })
        }
    }
}

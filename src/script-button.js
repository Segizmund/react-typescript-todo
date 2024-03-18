const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');
console.log('asdasdasd');

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
};
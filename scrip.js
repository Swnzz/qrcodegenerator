const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

   if (url==='' ) {
    alert('Please enter URL')
   } else {
    showSpinner();

   /*  show spinner just for one second & generate */
    setTimeout( () => {
        hideSpinner();
/*         which then put the qr code on the screen*/
        generateQRcode(url, size);

        setTimeout( () => { 
            const saveUrl = qr.querySelector('img').src;
            createSaveBtn(saveUrl);
        },50);
    }, 1000)
   }
};

/* qrcodejs library via git
 */
const generateQRcode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

/* call this before anything - when you change the size, it clears the UI first & old button*/
const clearUI = () => {
    qr.innerHTML = '';
    const saveBtn = document.getElementById('save-link');
    if (saveBtn) saveBtn.remove();
};

const createSaveBtn =  (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();
form.addEventListener('submit', onGenerateSubmit);
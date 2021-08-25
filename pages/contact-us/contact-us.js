import './contact-us.scss';

document.addEventListener('DOMContentLoaded', function() {

    /**
     * @type {HTMLButtonElement}
     */
    const button = document.querySelector('.contact__form-submit');

    /**
     * @type {HTMLElement}
     */
    const submit = document.getElementById('submit');

    /**
     * @type {NodeListOf<HTMLInputElement>}
     */
    const controls = document.querySelectorAll('input, textarea');

    /**
     * @type {HTMLFormElement}
     */
    const form = document.querySelector('.contact__form');

    /**
     * @type {NodeListOf<HTMLButtonElement>}
     */
    const closeButtons = document.querySelectorAll('.mkz-close_mkz, .dialog__button-close');
    const dialog = document.querySelector('.dialog');

    controls.forEach(control => {
        control.onblur = () => {
            control.classList.add('touched')
        }
    });

    closeButtons.forEach(button => {
        button.onclick = () => {
            dialog.classList.remove('active');
            dialog.ontransitionend = () => {
                dialog.style.display = 'none';
                dialog.ontransitionend = () => undefined;
            };
        }
    });

    function sendToTelegram() {
        button.disabled = true;
        const nameInput = document.querySelector('[name="userName"]');
        const phoneInput = document.querySelector('[name="phone"]');
        const mailInput = document.querySelector('[name="email"]');
        const messageInput = document.querySelector('[name="message"]');
        const url = new URL('https://api.telegram.org/bot1762035496:AAFRJLtB-_4BSAllHvMDcxBA1GRq2j_gsUU/sendMessage');
        const chatId = '-1001563537478';
        let text = '';
        text += '<b>Имя: </b>' + nameInput.value + '\n';
        text += '<b>Телефон: </b>' + phoneInput.value + '\n';
        text += '<b>Email: </b>' + mailInput.value + '\n';
        text += '<b>Сообщение: </b>' + messageInput.value;
        url.searchParams.append('chat_id', chatId);
        url.searchParams.append('parse_mode', 'html');
        url.searchParams.append('text', text);

        const clear = () => {
            nameInput.value = '';
            phoneInput.value = '';
            mailInput.value = '';
            messageInput.value = '';
            button.disabled = false;

            controls.forEach(control => {
                control.classList.remove('touched');
            });
        }

        fetch(url.toString())
            .then(response => response.json())
            .then(() => {
                dialog.style.display = 'flex';
                setTimeout(() => {
                    dialog.classList.add('active');
                });
                clear();
            })
            .catch(() => {
                alert('An error occurred, please try again!');
                clear();
            });
    }

    button.onclick = () => {
        submit.click();
    };

    form.onsubmit = e => {
        e.preventDefault();
        sendToTelegram();
    }
    setTimeout(() => {
        dialog.style.transition = '0.5s ease-in'
    }, 1000)
}, false);

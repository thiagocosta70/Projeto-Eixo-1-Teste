const formSection = document.querySelector('.mensagem');
const loginButton = document.getElementById('BtnEntrar');
const emailInput = document.getElementById('email_user');

function createAlertMessage(alertType, message) {
    return `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            <strong></strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}

function redirectToIndex(message) {
    const successMessage = createAlertMessage('success', message);
    formSection.insertAdjacentHTML('afterbegin', successMessage);
}
    

loginButton.addEventListener('click', function(element) {
    element.preventDefault();

    const existingAlert = formSection.querySelector('.alert');
    if (existingAlert) {
        formSection.removeChild(existingAlert);
    }

    const email = emailInput.value.trim();

    if (!email) {
        const alertMessage = createAlertMessage('warning', 'O campo de e-mail não pode ser vazio.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        return;
    }

    let userInfo = JSON.parse(localStorage.getItem(email));

    if (userInfo) {
        // Aqui solicitamos a nova senha e a confirmação
        let newPassword = prompt("Digite sua nova senha:");

        // Verifica se a nova senha tem pelo menos 8 caracteres
        while (newPassword.length < 6) {
            newPassword = prompt("A senha deve ter no mínimo 6 caracteres. Digite novamente:");
        }
        const confirmPassword = prompt("Confirme sua nova senha:");

        // Verificamos se as senhas são iguais
        if (newPassword !== confirmPassword) {
            const alertMessage = createAlertMessage('danger', 'As senhas não coincidem. Tente novamente.');
            formSection.insertAdjacentHTML('afterbegin', alertMessage);
            return;
        }

        // Verificamos se a nova senha é diferente da senha anterior
        if (newPassword === userInfo.password) {
            const alertMessage = createAlertMessage('danger', 'A nova senha não pode ser igual à senha anterior.');
            formSection.insertAdjacentHTML('afterbegin', alertMessage);
            return;
        }
            

        // Atualizamos a senha no localStorage
        userInfo.password = newPassword;
        localStorage.setItem(email, JSON.stringify(userInfo));

        const alertMessage = createAlertMessage('success', 'Senha atualizada com sucesso.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        return;
    }

    const alertMessage = createAlertMessage('danger', 'E-mail não encontrado. Cadastre uma conta.');
    formSection.insertAdjacentHTML('afterbegin', alertMessage);
});

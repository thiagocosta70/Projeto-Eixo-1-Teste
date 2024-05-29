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

function showPasswordForm(email) {
    const formHTML = `
        <form id="passwordForm">
            <div class="mb-3">
                <label for="newPassword" class="form-label">Nova senha</label>
                <input type="password" class="form-control" id="newPassword" required>
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmar nova senha</label>
                <input type="password" class="form-control" id="confirmPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Atualizar Senha</button>
        </form>
    `;
    formSection.insertAdjacentHTML('afterbegin', formHTML);

    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            const alertMessage = createAlertMessage('danger', 'As senhas digitadas não coincidem.');
            formSection.insertAdjacentHTML('afterbegin', alertMessage);
            return;
        }

        if (newPassword.length < 6) {
            const alertMessage = createAlertMessage('danger', 'A nova senha deve ter pelo menos 6 caracteres.');
            formSection.insertAdjacentHTML('afterbegin', alertMessage);
            return;
        }

        let userInfo = JSON.parse(localStorage.getItem(email));

        // Verificar se a nova senha é diferente da senha anterior do usuário
        if (userInfo.password === newPassword) {
            const alertMessage = createAlertMessage('danger', 'A nova senha deve ser diferente da senha anterior.');
            formSection.insertAdjacentHTML('afterbegin', alertMessage);
            return;
        }

        // Você pode continuar aqui com a lógica para verificar a senha e atualizar no localStorage
        // Por enquanto, vamos apenas exibir uma mensagem de sucesso
        const alertMessage = createAlertMessage('success', 'Senha atualizada com sucesso.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        
        // Você também pode remover o formulário depois de exibir a mensagem de sucesso, se desejar
        passwordForm.remove();
    });
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
        showPasswordForm(email); // Mostra o formulário de senha
    } else {
        const alertMessage = createAlertMessage('danger', 'E-mail não encontrado. Cadastre uma conta.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
    }
});

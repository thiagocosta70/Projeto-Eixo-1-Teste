const authenticatedUser = JSON.parse(sessionStorage.getItem('authenticatedUser') || '[]');
if (authenticatedUser.length != 0) {
    redirectToIndex();
}

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
            <button type="submit" class="btn btn-primary">Atualizar Senha</button>
        </form>
    `;
    formSection.insertAdjacentHTML('afterbegin', formHTML);

    const passwordForm = document.getElementById('passwordForm');
    passwordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        // Atualize a senha no localStorage ou onde quer que esteja armazenando as informações do usuário
        localStorage.setItem(email, JSON.stringify({ password: newPassword }));
        redirectToIndex('Senha atualizada com sucesso!');
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

    const userInfo = JSON.parse(localStorage.getItem(email));

    if (userInfo && userInfo.password) {
        const alertMessage = createAlertMessage('success', 'Por favor, insira sua nova senha.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
        showPasswordForm(email);
    } else {
        const alertMessage = createAlertMessage('danger', 'E-mail não encontrado. Cadastre uma conta.');
        formSection.insertAdjacentHTML('afterbegin', alertMessage);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const API_BASE_URL = 'http://localhost:2210';
    const saveButton = document.getElementById('saveButton');
    /*
      const surnameInput = document.querySelector('#sobrenome');
      const indicationInput = document.querySelector('#indication');
      const religionI = document.querySelector('#religion');
      const birthdayInput = document.querySelector('#nasc');
      const cpfInput = document.querySelector('#cpf');
  
      const cepI = document.querySelector('#CEP');
      const stateI = document.querySelector('#state');
      const cityI = document.querySelector('#city');
      const bairroI = document.querySelector('#bairro');
      const streetI = document.querySelector('#street');
      const numberI = document.querySelector('#number');
      const complementI = document.querySelector('#complement');
      const aptI = document.querySelector('#apt');
      const blockI = document.querySelector('#block');
     */
    const aside = document.querySelector('#aside');
    const cpfInput = document.querySelector('#cpf');
    const emailInput = document.querySelector('#email');
    const emailValid = /^[A-Za-z\._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(
        emailInput.value
    )
    const phoneInput = document.querySelector('#phonenumber')
    cpfInput.addEventListener('input', e => {
        let value = e.target.value;
        let cpfPattern = value.replace(/\D/g, '');
        cpfPattern = cpfPattern.replace(/(\d{3})(\d)/, '$1.$2');
        cpfPattern = cpfPattern.replace(/(\d{3})(\d)/, '$1.$2');
        cpfPattern = cpfPattern.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = cpfPattern;
    });
    phoneInput.addEventListener('input', e => {
        let value = e.target.value;
        let phonePattern = value.replace(/\D/g, '');
        phonePattern = phonePattern.substring(0, 11);
        if (value.length > 10) {
            phonePattern = phonePattern.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (phonePattern.length > 6) {
            phonePattern = phonePattern.replace(
                /(\d{2})(\d{4})(\d{0,4})/,
                '($1) $2-$3'
            );
        } else if (phonePattern.length > 2) {
            phonePattern = phonePattern.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        e.target.value = phonePattern;
    });
    emailInput.addEventListener('input', e => {
        let value = e.target.value
        if (!value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
            emailInput.style.borderColor = 'red';
            return false;
        }
        emailInput.style.borderColor = '';
        return true;
    });
    saveButton.addEventListener('click', saveContent);
    document.addEventListener('keyup', findKey);

    async function saveContent(e) {
        /*
            //Em desuso
            console.log('Save button clicked')
            let name = nameInput.value;
            let surname = surnameInput.value;
            let cpf = cpfInput.value;
            let birthday = birthdayInput.value;
            let indication = indicationInput.value;
            let religion = religionI.value;
            let cep = cepI.value;
            let state = stateI.value;
            let city = cityI.value;
            let bairro = bairroI.value;
            let street = streetI.value;
            let number = numberI.value;
            let complement = complementI.value;
            let apt = aptI.value;
            let block = blockI.value;
            */
        const keys = [
            'name',
            'surname',
            'cpf',
            'birthday',
            'profession',
            'occupation',
            'indication',
            'religion',
            'cep',
            'state',
            'city',
            'district',
            'street',
            'number',
            'complement',
            'phonenumber',
            'email'
        ];
        let data = {}
        let allFilled = true
        for (let key of keys) {
            const input = document.getElementById(key)
            if (input && input.value.trim() !== '') {
                data[key] = input.value
            } else {
                allFilled = false
            }
        };


        const emailValid = /^[A-Za-z\._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(emailInput.value);

        if (allFilled && emailValid) {
            try {
                const response = await fetch(`${API_BASE_URL}/save-file`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const json = await response.json();
                console.log(json);
                alert(json);
            } catch (err) {
                alert('erro ao salvar os dados');
                console.error(err);
            }


        } else if (!emailValid) {
            alert('o email é inválido');

        } else {
            alert('preencha todos os dados');
            console.log(data);

        };
    };
    const homeButton = document.querySelector('#home');

    homeButton.addEventListener('click', () => {
        window.location.href = '../../main.html';
        console.log('clicou');
    });

    function findKey(e) {
        if (e.key == 'Enter') {
            saveContent();
        };
    };
});

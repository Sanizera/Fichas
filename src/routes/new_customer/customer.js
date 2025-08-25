const qs = (el)=> document.querySelector(el);
document.addEventListener('DOMContentLoaded', async () => {
  const API_BASE_URL = 'http://localhost:2210'
  const saveButton = document.getElementById('saveButton')

  const aside = qs('#aside')
  const cpfInput = qs('#cpf')
  const emailInput = qs('#email')
  const emailValid = /^[A-Za-z\._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(
    emailInput.value
  )
  const phoneInput = qs('#phonenumber')
  cpfInput.addEventListener('input', e => {
    let value = e.target.value
    let cpfPattern = value.replace(/\D/g, '')
    cpfPattern = cpfPattern.replace(/(\d{3})(\d)/, '$1.$2')
    cpfPattern = cpfPattern.replace(/(\d{3})(\d)/, '$1.$2')
    cpfPattern = cpfPattern.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    e.target.value = cpfPattern
  })
  phoneInput.addEventListener('input', e => {
    let value = e.target.value
    let phonePattern = value.replace(/\D/g, '')
    phonePattern = phonePattern.substring(0, 11)
    if (value.length > 10) {
      phonePattern = phonePattern.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else if (phonePattern.length > 6) {
      phonePattern = phonePattern.replace(
        /(\d{2})(\d{4})(\d{0,4})/,
        '($1) $2-$3'
      )
    } else if (phonePattern.length > 2) {
      phonePattern = phonePattern.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    }
    e.target.value = phonePattern
  })
  emailInput.addEventListener('input', e => {
    let value = e.target.value
    if (!value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      emailInput.style.borderColor = 'red'
      return false
    }
    emailInput.style.borderColor = ''
    return true
  })
  const pressureopitions = qsAll('input[name ="pressure"]')
  const medicationDiv = qs('#medicationdiv')
  const specDivs = [
    'cranialdiv',
    'spinediv',
    'heartdiv',
    'surgerydiv',
    'diabetesdiv'
  ]
  const checkboxes = [
    'cranialLesion',
    'spineLesion',
    'heartLesion',
    'surgery',
    'diabetes'
  ]
  saveButton.addEventListener('click', saveContent)
  document.addEventListener('keyup', findKey)

  for (opition of pressureopitions) {
    opition.addEventListener('change', e => {
      if (e.target.value === 'Alta' || e.target.value === 'Baixa') {
        showhide(e.target.checked, medicationDiv)
      } else {
        showhide(false, medicationDiv)
      }
    })
  }
  for (let checkboxKey of checkboxes) {
    let checkbox = document.getElementById(`${checkboxKey}`)
    let divIndex = checkboxes.indexOf(`${checkboxKey}`)
    let div = document.getElementById(`${specDivs[divIndex]}`)
    checkbox.addEventListener('change', e => {
      showhide(e.target.checked, div)
    })
    
  }
  function showhide (i, div) {
    if (i) {
      div.style.display = 'block'
    } else {
      div.style.display = 'none'
    }
  }
  async function saveContent (e) {

           let keys = [
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
           ]

    for (divId of specDivs) {
      let div = document.getElementById(divId);
      let specInputs = div.querySelectorAll('input')
      specInputs.forEach(specInput => {
        if (specInput.value !== '') {
          keys.push(specInput.id)
          
        }
      })
    }

    let data = {}
    let allFilled = true
    for (let key of keys) {
      const input = document.getElementById(key)
      if (input && input.value.trim() !== '') {
        data[key] = input.value
      } else {
        allFilled = false
      }
    }

    const emailValid = /^[A-Za-z\._\-0-9]+@[A-Za-z]+\.[a-z]{2,4}$/.test(
      emailInput.value
    )

    if (allFilled && emailValid) {
      try {
        const response = await fetch(`${API_BASE_URL}/save-file`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const json = await response.json()
        console.log(json)
        alert(json)
      } catch (err) {
        alert('erro ao salvar os dados')
        console.error(err)
      }
    } else if (!emailValid) {
      alert('o email é inválido')
    } else {
      alert('preencha todos os dados')
      console.log(data)
    }
  }
  const homeButton = qs('#home')

  homeButton.addEventListener('click', () => {
    window.location.href = '../../main.html'
  
  })

  function findKey (e) {
    if (e.key == 'Enter') {
      saveContent()
    }
  }
})

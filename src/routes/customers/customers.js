//querySelector shortcut
const qs = el => document.querySelector(el)

//main code
document.addEventListener('DOMContentLoaded', e => {
  //select elements
  const searchInput = qs('#searchInput')
  const resultsDiv = qs('#results')

  //set customer list and filter logic
  let customers = []
  searchInput.addEventListener('input', e => {
    resultsDiv.innerHTML = ''
    customers
      .filter(customer => {
        // Search by name and surname
        const fullName = `${customer.name} ${customer.surname}`.toLowerCase()
        return fullName.includes(e.target.value.toLowerCase())
      })
      .forEach(customer => addHTML(customer))
  })

  //open customer modal and fill info
  function addHTML (customer) {
    const a = document.createElement('a')
    a.innerHTML = `${customer.name} ${customer.surname}`
    a.href = ''
    a.addEventListener('click', e => {
      e.preventDefault()
      fillModal(customer)
      qs('.customerModal').style.display = 'flex'
    })
    resultsDiv.append(a)
  }

  // Fill modal fields with customer data
  function fillModal(customer) {
    qs('.customerName span').textContent = customer.name || '--'
    qs('.cpf span').textContent = customer.cpf || '--'
    qs('.birthday span').textContent = customer.birthday || '--'
    qs('.profession span').textContent = customer.profession || '--'
    qs('.occupation span').textContent = customer.occupation || '--'
    qs('.indication span').textContent = customer.indication || '--'
    qs('.religion span').textContent = customer.religion || '--'
    qs('.cep span').textContent = customer.cep || '--'
    qs('.state span').textContent = customer.state || '--'
    qs('.city span').textContent = customer.city || '--'
    qs('.district span').textContent = customer.district || '--'
    qs('.street span').textContent = customer.street || '--'
    qs('.number span').textContent = customer.number || '--'
    qs('.complement span').textContent = customer.complement || '--'
    qs('.phonenumber span').textContent = customer.phonenumber || '--'
    qs('.email span').textContent = customer.email || '--'
  }

  //close customer modal
  qs('.closeButton').addEventListener(
    'click',
    () => (qs('.customerModal').style.display = 'none')
  )

  //fetch customers list
  fetch(`http://localhost:2210/search`)
    .then(data => data.json())
    .then(users => {
      users.forEach(user => {
        addHTML(user)
        customers.push(user)
      })
    })

  //home button logic
  const homeButton = document.getElementById('home')
  homeButton.addEventListener('click', () => {
    window.location.href = '../../main.html'
  })
})

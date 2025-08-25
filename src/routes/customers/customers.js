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
        return customer.toLowerCase().includes(e.target.value.toLowerCase())
      })
      .forEach(customer => addHTML(customer))
  })
  //open customer modal
  function addHTML (item) {
    const a = document.createElement('a')
    a.innerHTML = item
    a.href = ''
    a.addEventListener('click', e => {
      e.preventDefault()
      console.log('clicou')
      qs('.customerModal').style.display = 'flex'
    })
    resultsDiv.append(a)
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
        addHTML(`${user.name} ${user.surname}`)
        customers.push(`${user.name} ${user.surname}`)
      })
    })

  //home button logic
  const homeButton = document.getElementById('home')
  homeButton.addEventListener('click', () => {
    window.location.href = '../../main.html'
  })
})

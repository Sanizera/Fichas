document.addEventListener('DOMContentLoaded', e => {
  const schedulebutton = document.querySelector('#schedule')
  const newcustomerbutton = document.querySelector('#newcustomer')
  const loginbutton = document.querySelector('#login')

  schedulebutton.addEventListener('click', () => {
    window.location.href = 'routes/schedule/schedule.html'
    console.log('clicou')
  })

  newcustomerbutton.addEventListener('click', () => {
    window.location.href = 'routes/new_customer/customer.html'
    console.log('clicou')
  })

  loginbutton.addEventListener('click', () => {
    window.location.href = 'routes/login/login.html'
    console.log('clicou')
  })
})

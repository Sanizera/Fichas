document.addEventListener('DOMContentLoaded', e => {
  const schedulebutton = document.querySelector('#schedule');
  const newcustomerbutton = document.querySelector('#newcustomer');
  const loginbutton = document.querySelector('#login');
 const customersbutton = document.querySelector('#customers');
  schedulebutton.addEventListener('click', () => {
    window.location.href = 'routes/schedule/schedule.html'
    
  })

  newcustomerbutton.addEventListener('click', () => {
    window.location.href = 'routes/new_customer/customer.html'
    
  })

  customersbutton.addEventListener('click', ()=>{
    window.location.href = 'routes/customers/customers.html'
  } )

  loginbutton.addEventListener('click', () => {
    window.location.href = 'routes/login/login.html'
    
  })
});

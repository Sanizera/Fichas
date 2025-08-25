const qs = (el)=> document.querySelector(el);
document.addEventListener('DOMContentLoaded', e => {
  const schedulebutton = qs('#schedule');
  const newcustomerbutton = qs('#newcustomer');
  const loginbutton = qs('#login');
 const customersbutton = qs('#customers');
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

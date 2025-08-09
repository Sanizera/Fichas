document.addEventListener('DOMContentLoaded', e => {
  
  const searchInput = document.querySelector('#searchInput')
  const searchButton = document.querySelector('#searchButton')
  const resultsDiv = document.querySelector('#results')
  let customers = [];
  searchInput.addEventListener('input', e=>{
      resultsDiv.innerHTML = '';
      customers
      .filter((customer)=>{
        return customer.toLowerCase().includes(e.target.value.toLowerCase());
      })
      .forEach(customer => addHTML(customer));
  })

    fetch(`http://localhost:2210/search`)
    .then((data)=>data.json())
    .then((users)=>{
      users.forEach(user => {
      addHTML(`${user.name} ${user.surname}`);
        customers.push(`${user.name} ${user.surname}`);
        
      });
    })
    function addHTML(item){
      const div = document.createElement('div');
      div.innerHTML = item;
      resultsDiv.append(div);
    }
  const homeButton = document.getElementById('home')
  homeButton.addEventListener('click', () => {
    window.location.href = '../../main.html'
  })

})

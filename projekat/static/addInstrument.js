function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

  

    
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            instrument: document.getElementById('instrument').value,
            price: document.getElementById('price').value,
            type: document.getElementById('type').value,
            
        };


        document.getElementById('instrument').value = '';
        document.getElementById('price').value = '';
        document.getElementById('type').value = '';

        fetch('http://localhost:8300/api/instruments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
          
    });

    /* document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    }); */

}
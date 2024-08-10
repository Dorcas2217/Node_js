const readAllMenu = async () => {
    try {
        const response = await fetch('/api/pizzas');
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

        
        return response.json(); // Retourne les données une fois qu'elles sont prêtes
    } catch (error) {
        console.error(error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
};


const addOneMenu = (menu) => {
    fetch('/api/pizzas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)
    }).then((response) => {
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        return response.json();
    })
};

export { readAllMenu, addOneMenu };
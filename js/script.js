
let porezUkupno = null;

let dugme = document.querySelector('#btnPrikazi');
let tabela = document.querySelector('.tabela');



dugme.addEventListener('click', () =>{
    
    let doprinosUradjeno = document.querySelector('#doprinosIznos').value;
    let porezNaProjekat = document.querySelector('#porezProjekatIznos').value;
    let porezNaIzgradnju = document.querySelector('#porezIzgradnjaIznos').value;
    
    if(doprinosUradjeno == "") doprinosUradjeno = 0;
    if(porezNaProjekat == "") porezNaProjekat = 0;
    if(porezNaIzgradnju == "") porezNaIzgradnju = 0;

    document.querySelector('#porukaGreske').style = 'visibility: hidden';
    tabela.style = 'visibility: hidden';
    document.querySelector('#iznosPoreza').innerHTML = "";
    document.querySelector('#procenatPopusta').innerHTML = "";
    document.querySelector('#iznosPopusta').innerHTML = "";
    document.querySelector('#iznosNaknade').innerHTML = "";


    porezUkupno = parseInt(porezNaProjekat) + parseInt(porezNaIzgradnju);
    let popustProcenat = [0 , 0 , 0];
    let y = [parseInt(porezNaProjekat), parseInt(porezNaIzgradnju), porezUkupno];

    if(doprinosUradjeno < porezUkupno) {
        document.querySelector('#porukaGreske').innerHTML = 'Pogrešno unete vrednosti!';
        document.querySelector('#porukaGreske').style = 'visibility: visible';
        return;
    }

    for(let i = 0; i< 3; i++){

        if(y[i] == 0){
            popustProcenat[i] = 0;
        }
        else if(y[i] < 0.2 * parseInt(doprinosUradjeno)){
            popustProcenat[i] = 0.45;
        } else if(y[i] < 0.3 * parseInt(doprinosUradjeno)){
            popustProcenat[i] = 0.50;
        } else if(y[i] < 0.6 * parseInt(doprinosUradjeno)){
            popustProcenat[i] = 0.55;
        } else {
            y[i] = 'Donacija?'
        }

    }
    
    
    
    document.querySelector('#iznosPoreza').insertAdjacentHTML('beforeend' ,`
                                            <td>Iznos poreza</td><td class="samoProjekat">${porezNaProjekat}</td>
                                            <td class="samoIzgradnja">${porezNaIzgradnju }</td>
                                            <td class="oba">${porezUkupno}</td>`);
    document.querySelector('#procenatPopusta').insertAdjacentHTML('beforeend' ,`
                                            <td>Procenat popusta</td><td class="samoProjekat">${Math.round(popustProcenat[0] * 100)}%</td>
                                            <td class="samoIzgradnja">${Math.round(popustProcenat[1] * 100)}%</td>
                                            <td class="oba">${Math.round(popustProcenat[2] * 100)}%</td>`);
    document.querySelector('#iznosPopusta').insertAdjacentHTML('beforeend' ,`
                                            <td>Iznos popusta</td><td class="samoProjekat"> ${Math.round((parseInt(doprinosUradjeno) - parseInt(y[0] ))*popustProcenat[0])}</td>
                                            <td class="samoIzgradnja"> ${Math.round(popustProcenat[1] * (parseInt(doprinosUradjeno) - parseInt(y[1] )))}</td>
                                            <td class="oba"> ${Math.round(popustProcenat[2] * (parseInt(doprinosUradjeno) - parseInt(porezUkupno)))}</td>`);
    document.querySelector('#iznosNaknade').insertAdjacentHTML('beforeend' ,`
                                            <td>Iznos naknade</td><td class="samoProjekat"> ${Math.round((parseInt(doprinosUradjeno) - parseInt(y[0] ))*(1-popustProcenat[0]))}</td>
                                            <td class="samoIzgradnja"> ${Math.round((1-popustProcenat[1]) * (parseInt(doprinosUradjeno) - parseInt(y[1] )))}</td>
                                            <td class="oba"> ${Math.round((1-popustProcenat[2]) * (parseInt(doprinosUradjeno) - parseInt(porezUkupno)))}</td>`);                                        
                                        

    tabela.style = 'visibility: visible';
});




function mostrarTodosCasos(){
    selecionado()
    const url = "https://covid19-brazil-api.now.sh/api/report/v1";
        const t = fetch (url).then(resposta =>{
            return resposta.json()
        }).then(corpo =>{
            

            var linha = "";
            linha += "<thead>"
            linha += "<tr>"
            linha += "<th>UF</th>"
            linha += "<th '>Estado</th>"
            linha += "<th>Casos</th>"
            linha += "<th>Mortes</th>"
           
            linha += "</tr>"
            linha += " </thead>"
            
            for(let i=0;i<27;i++){                

                    linha += "<tr>"        
                    linha += "<td>" +corpo['data'][i]['uf'] + "</td>"
                    
                    linha += "<td>" +corpo['data'][i]['state'] + "</td>"
                  
                    const internationalNumberFormat = new Intl.NumberFormat('en-US')
                    const casos = corpo['data'][i]['cases']
                    const mortes = corpo['data'][i]['deaths']
                    linha += "<td>" +internationalNumberFormat.format(casos) + "</td>"
                    linha += "<td>" +internationalNumberFormat.format(mortes) + "</td>"                    
                    linha += "</tr>"
            }

            let tabela = document.getElementById('tabela');
            tabela.innerHTML = linha;
            
            
    })
}




async function mostrarUmCaso(estado){
    var nomeDoEstado = estado;
    var testeDeNome;

    const url = "https://covid19-brazil-api.now.sh/api/report/v1";
    const t = fetch (url).then(resposta =>{
        return resposta.json()
    }).then(corpo =>{

        for(let i=0;i<27;i++){            

            if(corpo['data'][i]['state'] == nomeDoEstado){
                testeDeNome = nomeDoEstado;
                
                var linha = "";
                linha += "<thead>"
                linha += "<tr>"
                linha += "<th>UF</th>"
                linha += "<th>Estado</th>"
                linha += "<th>Casos</th>"
                linha += "<th>Mortes</th>"
                linha += "</tr>"
                linha += " </thead>"

                linha += "<tr>"        
                linha += "<td>" +corpo['data'][i]['uf'] + "</td>"
                linha += "<td>" +corpo['data'][i]['state'] + "</td>"


                const internationalNumberFormat = new Intl.NumberFormat('en-US')
                const casos = corpo['data'][i]['cases']
                const mortes = corpo['data'][i]['deaths']

                linha += "<td>" +internationalNumberFormat.format(casos) + "</td>"
                linha += "<td id='idMortes'>" +internationalNumberFormat.format(mortes) + "</td>"                
                linha += "</tr>"

                mostrarUmHabitante(corpo['data'][i]['deaths'],corpo['data'][i]['cases'], nomeDoEstado)
                let tabela = document.getElementById('tabela');

                tabela.innerHTML = linha;
            }    
            
        }
})
    return  testeDeNome;
}
 
function mostrarUmHabitante(mortes, casos, estado){
    var nomeDoEstado = estado;
    const url = "https://servicodados.ibge.gov.br/api/v3/agregados/7358/periodos/2018/variaveis/606?localidades=N3[all]&classificacao=2[6794]|287[100362]|1933[49037]";
        const t = fetch (url).then(resposta =>{
            return resposta.json()
        }).then(corpo =>{
            const dados = corpo[0]['resultados'][0]['series'];



                for(var j =0;j<27;j++){
                   const nome = dados[j]['localidade']['nome'];
                    const habitantes = dados[j]['serie']['2018']                
                    
                    if(nome == nomeDoEstado){
                        var linha = "";
                        linha += "<thead>"
                        linha += "<tr>"
                        linha += "<th>Habitantes</th>"
                        linha += "<th>Porcentagem de Mortes</th>"
                        linha += "<th>Porcentagem de Casos</th>"
                        linha += "<th>Taxa de Letalidade</th>"
                        const internationalNumberFormat = new Intl.NumberFormat('en-US')

                        linha += "<tr>"        
                        linha += "<td>" +internationalNumberFormat.format(habitantes) + "</td>"


                        var pMortes = (mortes*100)/habitantes
                        linha += "<td>" +(pMortes).toFixed(2)+"%"+ "</td>"


                        var pCasos = (casos*100)/habitantes
                        linha += "<td>" + (pCasos).toFixed(2)+"%"+ "</td>"

                        const letalidade = (mortes*100)/casos;
                        linha += "<td>" +(letalidade).toFixed(2)+"%"+ "</td>"

                        let tabela = document.getElementById('tabela2');

                        tabela.innerHTML = linha;
                       
                    }
    
    
                }

           
    })
    
}



function selecionado() {   
    var nome;
    var states = document.getElementsByClassName("estado")
    
    for(var i = 0; i < states.length; i++) {
      states[i].onclick = function() {
       
        document.getElementById("info").innerHTML = this.getAttribute('name');
        
        nome = this.getAttribute('name');

        mostrarUmCaso(nome);
      }
    }
    
   
};



mostrarTodosCasos()
mostrarUmCaso()



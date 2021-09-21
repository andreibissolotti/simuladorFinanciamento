function on(element){
    element.classList.remove("off");
}

function off(element){
    element.classList.add("off");
}

function abrePainel(element){
    let sobrePagina = document.querySelector("#sobrePagina")
    let sobreAutor = document.querySelector("#sobreAutor")
    let markPagina = document.querySelector("#markPagina")
    let markAutor = document.querySelector("#markAutor")
    let id =element.id
    switch (id){
        case "pagina":
            off(sobreAutor);
            markAutor.classList.remove("mark-up")
            markAutor.classList.add("mark-down")
            
            if (sobrePagina.classList.contains("off")){
                on(sobrePagina)
                markPagina.classList.remove("mark-down")
                markPagina.classList.add("mark-up")
            }else{
                off(sobrePagina)
                markPagina.classList.remove("mark-up")
                markPagina.classList.add("mark-down")
            }
            break
        case "autor":
            off(sobrePagina);
            markPagina.classList.remove("mark-up")
            markPagina.classList.add("mark-down")

            if (sobreAutor.classList.contains("off")){
                on(sobreAutor)
                markAutor.classList.remove("mark-down")
                markAutor.classList.add("mark-up")
            }else{
                off(sobreAutor)
                markAutor.classList.remove("mark-up")
                markAutor.classList.add("mark-down")
            }
            break
    }
}

function calculoParcela(){
    let valor = parseFloat(document.querySelector("#valor").value)
    let prazoAno = parseFloat(document.querySelector("#prazoAno").value)
    let ja = parseFloat(document.querySelector("#jurosAno").value)
    let prazoMes = prazoAno*12
    let amortizacao = valor/prazoMes
    let jm = ((1+ja)**(1/12))-1
    let juroAcumulado = 0
    let saldoDevedor = []
    let juros = []
    let parcela = []

    for (let i=0;i<prazoMes; i++){
        saldoDevedor.push(valor - i*amortizacao)
        juros.push(saldoDevedor[i]*jm)
        parcela.push((amortizacao+juros[i]).toFixed(2))
        juroAcumulado += juros[i]
    }

    return [parcela, juros, saldoDevedor, juroAcumulado, prazoMes, jm, amortizacao]
}//        [   0       1          2             3            4      5]

function mostrarResult(){
    let resultado = document.querySelector("#resultado")
    let parcelas = document.querySelector("#parcelas")
    let botTabComp = document.querySelector("#botTabComp")

    on(botTabComp); on(parcelas); on(resultado)
}

function simular(){

    mostrarResult()
    lista = calculoParcela();
    
    document.querySelector("#prazoMes").value = lista[4]
    document.querySelector("#jurosMes").value = lista[5]
    document.querySelector("#jurosAcum").value = lista[3].toFixed(2)

    let tabela = document.querySelector(".tabelaParc")
    tabela.innerHTML = "<tr><th>Prestação</th><th>Amortização</th><th>Juros</th><th>Total</th></tr>"

    for (let j=0; j<5; j++){
        tabela.innerHTML += "<tr><td>"+(j+1)+"</td><td>"+lista[6].toFixed(2)+"</td><td>"+(lista[1][j].toFixed(2))+"</td><td>"+lista[0][j]+"</td></tr>"
    }

    let tabelaComp = document.querySelector("#tabelaComp")
    tabelaComp.innerHTML = "<tr class='topoTabela'><th>Prestação</th><th>Amortização</th><th>Juros</th><th>Total</th></tr>"

    let total = 0
    for (let g=0; g<lista[1].length ; g++){
        tabelaComp.innerHTML += "<tr><td>"+(g+1)+"</td><td>"+lista[6].toFixed(2)+"</td><td>"+(lista[1][g].toFixed(2))+"</td><td>"+lista[0][g]+"</td></tr>"
        total += parseFloat(lista[0][g]) 
    }
    let valor = document.querySelector("#valor").value
    tabelaComp.innerHTML += "<tr><th>Total:</th><th>"+valor+"</th><th>"+lista[3].toFixed(2)+"</th><th>"+total.toFixed(2)+"</th></tr>"
}

function tabelaCompleta(){
    let resultado = document.querySelector("#resultado")
    let parcelas = document.querySelector("#parcelas")
    let botTabComp = document.querySelector("#botTabComp")
    let entradas = document.querySelector("#entrada")
    off(resultado);off(parcelas);off(botTabComp);off(entradas)
    let comp = document.querySelector("#comp")
    on(comp);
}
function fecharTabComp(){
    let resultado = document.querySelector("#resultado")
    let parcelas = document.querySelector("#parcelas")
    let botTabComp = document.querySelector("#botTabComp")
    let entradas = document.querySelector("#entrada")
    on(resultado);on(parcelas);on(botTabComp);on(entradas)
    let comp = document.querySelector("#comp")
    off(comp);
}
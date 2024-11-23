import { useEffect, useState } from "react";
import ListarProdutos from "./ListarProdutos";
import Loading from "./Loading";

export default function Home() {

    const [lista, setLista] = useState([]);

    useEffect(() => {
        
        const receberListaProdutos = async () => {
            try{
                const resposta = await fetch('https://fakestoreapi.com/products');
                const dados = await resposta.json();
                setLista(dados);
            }catch{
                alert('Ocorreu um erro na comunicação com o servidor!');
            }
        }
        receberListaProdutos();
}, []);

if (lista.length === 0) {
    return (
        <Loading></Loading>
    )
}

    const orderAz = () =>{
     const ListaAux = [...lista].sort((a,b) => a.title.localeCompare(b.title));
     setLista(ListaAux);
}

    const orderZa = () =>{
    let ListaAux = [...lista].sort((a,b) => a.title.localeCompare(b.title));
    ListaAux = ListaAux.reverse();
    setLista(ListaAux);
}

const orderPriceAsc = () => {
    const listaOrdenada = [...lista].sort((a, b) => a.price - b.price);
    setLista(listaOrdenada);
  };

  const orderPriceDesc = () => {
    const listaOrdenada = [...lista].sort((a, b) => b.price - a.price);
    setLista(listaOrdenada);
  };

    return (
      <>
       <h1>★Lista de Produtos★</h1>
       <button onClick={()=> orderAz()} >Az</button>
       <button onClick={()=> orderZa()} >Za</button>
       <button onClick={orderPriceAsc}>Preço: Menor para Maior</button>
      <button onClick={orderPriceDesc}>Preço: Maior para Menor</button>
       <ListarProdutos produtos={lista}/>
    </>
  );
}
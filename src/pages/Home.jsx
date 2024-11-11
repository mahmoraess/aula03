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

    return (
      <>
       <h1>★Lista de Produtos★</h1>
       <ListarProdutos produtos={lista}/>
    </>
  );
}
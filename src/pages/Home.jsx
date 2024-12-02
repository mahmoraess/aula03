import { useEffect, useState } from "react";
import ListarProdutos from "./ListarProdutos";
import Loading from "./Loading";
import styles from '../styles/listaProdutos.module.css'


export default function Home() {
    const [lista, setLista] = useState([]);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        const receberListaProdutos = async () => {
            try {
                const resposta = await fetch('https://fakestoreapi.com/products');
                const dados = await resposta.json();
                setLista(dados);
            } catch {
                alert('Ocorreu um erro na comunicação com o servidor!');
            }
        };
        receberListaProdutos();
    }, []);

    if (lista.length === 0) {
        return <Loading />;
    }

    const orderAz = () => {
        const ListaAux = [...lista].sort((a, b) => a.title.localeCompare(b.title));
        setLista(ListaAux);
    };

    const orderZa = () => {
        const ListaAux = [...lista].sort((a, b) => a.title.localeCompare(b.title));
        ListaAux.reverse();
        setLista(ListaAux);
    };

    const orderPriceAsc = () => {
        const listaOrdenada = [...lista].sort((a, b) => a.price - b.price);
        setLista(listaOrdenada);
    };

    const orderPriceDesc = () => {
        const listaOrdenada = [...lista].sort((a, b) => b.price - a.price);
        setLista(listaOrdenada);
    };

    // Aqui você usa includes ao invés de startsWith para uma busca mais flexível
    const pesquisar = lista.filter((produto) =>
        produto.title.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <>
            <h1>★Lista de Produtos★</h1>

            <input
    type="text"
    placeholder="Buscar produto..."
    className={styles.searchInput}  // Usando o estilo do CSS Module
    value={filtro}
    onChange={(e) => setFiltro(e.target.value)} 
/>

            <button onClick={orderAz}>Az</button>
            <button onClick={orderZa}>Za</button>
            <button onClick={orderPriceAsc}>Preço: Menor para Maior</button>
            <button onClick={orderPriceDesc}>Preço: Maior para Menor</button>

            {/* Verifique se 'pesquisar' tem resultados antes de passar para o componente */}
            {pesquisar.length > 0 ? (
                <ListarProdutos produtos={pesquisar} />
            ) : (
                <p>Nenhum produto encontrado</p>
            )}
        </>
    );
}

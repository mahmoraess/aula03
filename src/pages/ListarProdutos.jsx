import styles from '../styles/listaProdutos.module.css'

export default function ListarProdutos({produtos}){
    return (
        <>
          <ul className={styles.bloco}> 
           {produtos.map(produto => (
              <li key={produto.id}>
                <h2>{produto.title}</h2>
                <p>{produto.description}</p>
                <h3>Preço: R${produto.price}</h3>
                <img src={produto.image} alt={produto.title} width={200} />
              </li>
           ) )}
           </ul>
        </>
    )
}
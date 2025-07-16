import { GlobalStyle } from './styles'
import Header from './components/Header'
import Produtos from './containers/Produtos'

import { useGetProdutosQuery } from './store/api'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { adicionar } from './store/cartSlice'
import { toggleFavorito } from './store/favoritosSlice'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const { data: produtos = [], isLoading, error } = useGetProdutosQuery()

  const carrinho = useSelector((state: RootState) => state.cart.itens)
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)

  const dispatch = useDispatch<AppDispatch>()

  function adicionarAoCarrinho(produto: (typeof produtos)[0]) {
    const existe = carrinho.find((p) => p.id === produto.id)
    if (existe) alert('Item já adicionado')
    else dispatch(adicionar(produto))
  }

  function favoritar(produto: (typeof produtos)[0]) {
    dispatch(toggleFavorito(produto))
  }

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar produtos</p>

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App

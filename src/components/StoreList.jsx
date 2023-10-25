import '../styles/store.css'
import data from '../data.json'
import StoreItem from './StoreItem'



export default function StoreList() {
  return (
        <div className='store-container'>
        {
            data.map(item => {
                return <StoreItem key={item.id}
                    id={item.id}
                    price={item.price}
                    name={item.name}
                    imgUrl={item.imgUrl}
                    category={item.category}
                    description={item.description}
                />
                })
        }
        
        </div>

  )
}

import { useContext } from "react"
import { DataContextApi } from "../store/datacontext"
export default function ProductLIst() {
    const { products } = useContext(DataContextApi)
    return (
        <div>
            {
                products.map((ele) => {
                    return <div>
                        <div className="card post-card" style={{ width: "18rem" }}>
                            <img src={`http://localhost:3044/uploads/${ele.image}`} className="card-img-top  img-fluid" alt="..." style={{width:"200px",height:"200px"}} />
                            <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <p className="card-text"> {ele.price}</p>
                                <p className="card-text">{ele.description}</p>
                
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
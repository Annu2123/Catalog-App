import { useEffect, useState } from "react"
import axios from 'axios'
import { Tabs } from 'antd'
export default function MyAccount() {
    const [error, setError] = useState('')
    const [myDetail, setMyDetail] = useState({})
    console.log('my', myDetail)
    useEffect(() => {

        if (localStorage.getItem('token')) {
            (async () => {
                try {
                    const response = await axios.get('http://localhost:3044/api/account', {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                    // console.log("detail",response.data)
                    setMyDetail(response.data)
                    setError('')
                } catch (err) {
                    setError("server error")
                    console.log(err)
                }
            })()
        } else {
            setError("login ise require")
        }
    }, [])
    return (
        <div className="container">
            <Tabs
                defaultActiveKey="1"
                centered
                items={new Array(1).fill(null).map((_, i) => {
                    const id = String(i + 1);
                    return {
                        
                        label: `Tab `,
                        key: id,
                        children: `Content of Tab Pane `,
                    };
                })}
            />
            {error ? error : <div> <p>{myDetail.username}</p>{myDetail.email}<p>{myDetail.role}</p></div>}
        </div>
    )
}
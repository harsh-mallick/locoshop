import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css'
import { useCookies } from 'react-cookie';

const Singleproduct = () => {
    const history = useNavigate()
    const [Data, setData] = useState({});

    const callsinglepage = async () => {
        try {
            const res = await fetch("/singleproduct", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content": "application/json",
                },
                credentials: "include"
            })

            const data = await res.json();
            setData(data)
            console.log(Data)

            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (error) {
            history('/seller-login')
            console.log(error)
        }
    }
    useEffect(() => {
        callsinglepage();
    });


return (
    <section1>
            <div className="sections1" >
                    {Array.isArray(Data) && Data.map(datas => {
                        return (
                            <div key={datas._id} style = {{display: "inline-flex", marginRight: "0px", width: "78rem", marginLeft: "140px", marginTop: "5px"}}>
                              <img src={datas.pimage} className="card-img-top" alt="..." />
                                <div className="card" style={{ width: "88rem", height: "42rem", marginLeft: "0px" }}>
                                    <div className="card-body" style={{fontSize: "x-large"}}>
                                        <h5 className="card-title"><b> Name: </b> &nbsp;&nbsp; {datas.pname}</h5>
                                        <p className="card-text"><b>Model:</b> &nbsp; {datas.pmodel}</p>
                                        <p className="card-text"><b>Size:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {datas.psize}</p>
                                        <p className="card-text"><b>Price:</b> &nbsp;&nbsp;&nbsp; {datas.pprice}</p>
                                        <p className="card-text"><b>Description:</b>&nbsp;&nbsp;&nbsp; {datas.pdescription}</p><br/><br/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </section1>
  )
}

export default Singleproduct

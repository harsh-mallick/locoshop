import React, { useEffect, useState } from 'react';
import userpng from '../Components/user.png';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css'
import axios from 'axios'
import { useCookies } from 'react-cookie';

export default function Contactus() {
    const history = useNavigate()
    const [userData, setUserData] = useState({});
    const [cookies, setCookie] = useCookies(['name']);

    const callShoppage = async () => {
        try {
            const res = await fetch("/getShopdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json();
            console.log(data)
            setUserData(data)

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
        callShoppage();
    });

    return (
        <section>
            <div className="sections1" >
                <h3 className="h3" style={{ alignSelf: "center", marginLeft: "650px" }}>All Shops</h3><br /><br />
                <div className="grid grid-4-col" style={{ marginLeft: "50px" }}>
                    {Array.isArray(userData) && userData.map(datas => {
                        const handleOutput = () => {
                            const id = datas._id;
                            setCookie('itemid', id, {path: "/"}, {expires: new Date(Date.now() + 25892000000)}, {httpOnly: true});
                            history(`/all-shops/${id}`);
                        }
                        return (
                                
                            <div key={datas._id}  >
                                <div className="card" style={{ width: "18rem"}}>
                                    <img src={datas.pimage} className="card-img-top" alt="..." />
                                    <div className="card-body" onClick = {handleOutput} style = {{cursor: "pointer"}}>
                                        <h5 className="card-title"> Shop Name: {datas.name}</h5>
                                        <p className="card-text">Address: {datas.shop},{datas.lane}, {datas.locality}, {datas.state}, {datas.pincode}</p>
                                        <p className="card-text">Phone number: {datas.phonenumber}</p>
                                        <p className="card-text">email: {datas.email}</p><br/><br/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

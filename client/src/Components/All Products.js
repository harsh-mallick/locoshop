import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/Parentreg.css'
import addimage from '../Images/Adding-Products.png'

const Schoolreg = () => {
    const history = useNavigate()
    const [user, setUser] = useState({
        pname: "",
        pmodel: "",
        psize: "",
        price: "",
    });

    let name, value;
    const handleInput = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }


    const postData = async (e) => {
        e.preventDefault();
        const { pname, pmodel, psize, pprice, pdescription } = user

        const res = await fetch("/getshoplist", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const data = await res.json();
        console.log(data)
        console.log(res.status)
        if (res.status === 422 || res.status === 404 || !data) {

            window.alert("Cannot Data added")
            console.log("Cannot Data added")
            history('/seller-login')

        } else if (res.status === 500) {
            window.alert("Internal Server Error")
            console.log("Internal Server Error")
        } else {
            window.alert("Data added Successful");
            console.log("Data added Successful");
            document.getElementById("addform").reset()
            document.getElementById("pname").innerText = "";
            document.getElementById("pmodel").innerText = "";
            document.getElementById("psize").innerHTML = "";
            document.getElementById("pprice").innerText = "";
            document.getElementById("pdescription").innerText = "";
            setUser("")
        };
    }

    var onresize = function (e) {
        const screenwidth = window.innerWidth;
        console.log(typeof screenwidth, screenwidth);

        if (screenwidth < 1536) {
            document.getElementById("contten").style.flexDirection = "column"
            document.getElementById("contten").style.height = "953px"
            document.getElementById("consumerreg_section").style.height = "1153px"
            document.getElementById("contten").style.background = "var(--background)"
            document.getElementById("form").style.borderRight = "none"
            document.getElementById('name_consumer').style.width = "275px"
            document.getElementById('lane').style.width = "275px"
            document.getElementById('locality').style.width = "275px"
            document.getElementById('state').style.width = "275px"
            document.getElementById('house').style.width = "275px"
            document.getElementById('pincode').style.width = "275px"
            document.getElementById('phonenumber').style.width = "275px"
            document.getElementById('schoolpassword').style.width = "275px"
            document.getElementById('schoolemail').style.width = "275px"
            document.getElementById('label1').style.marginLeft = "0"
            document.getElementById('label2').style.marginLeft = "0"
            document.getElementById('label3').style.marginLeft = "0"
            document.getElementById('label4').style.marginLeft = "0"
            document.getElementById('label5').style.marginLeft = "0"
        }
    }
    // const [selectedImage, setselectedImage] = useState()

    // const imagechange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setselectedImage(e.target.files[0])
    //     }
    // }

    window.addEventListener("resize", onresize);
    return (
        <>
            <div className='section' id='consumerreg_section'>
                <div className='h1'>Add your product</div>
                <div className="conntan" id='contten'>
                    <div className="form" id='form'>
                        <form action="" method='POST' id='addform'>
                            <div className="label" id='label1'>&nbsp;&nbsp;&nbsp; Name of Product:</div>
                            <i className='fas fa-solid fa-user'></i>&nbsp;<input type="text" name="pname" id="pname" className="schoolname" required placeholder='Enter Name of Product.....' value={user.pname} onChange={handleInput} /><br /><br />

                            <div className="label" id='label2'> Model of Product:</div>
                            <i className='fas fa-solid fa-location-arrow'></i>&nbsp;<input type="text" name="pmodel" id="pmodel" className="schooladdress" required placeholder='Enter Model of product.....' value={user.pmodel} onChange={handleInput} /><br /><br />

                            <div className="label" id='label3'> Size (if any):</div>
                            <i className='fas fa-solid fa-phone'></i>&nbsp;<input type="text" name="psize" id="psize" className="schooladdress" required placeholder='Enter size of Product.....' value={user.psize} onChange={handleInput} /><br /><br />

                            <div className="label" id='label4'> Price of product:</div>
                            <i className='fas fa-solid fa-envelope'></i>&nbsp;<input type="email" name="pprice" id="pprice" className="schooladdress" required placeholder='Enter Price of Product.....' value={user.pprice} onChange={handleInput} /><br /><br />
                            {/* <input type="file" accept="image/jpeg, image/png" name='pimage' id='pimage' value={user.pimage} onChange={imagechange && handleInput} /><br /><br /> */}
                            
                            <div className="label" id='label3'> Description :</div>
                            &nbsp;<textarea name="pdescription" id="pdescription" className="schooladdress" required placeholder='Enter description of Product.....' value={user.pdescription} onChange={handleInput}  style = {{height: "195px"}} /><br /><br /><br />

                            <button type="submit" className='registerbtn' onClick={postData}>Add Product</button>
                        </form>
                    </div>
                    <div className="image">
                            <div>
                                <img src={addimage} alt="Product image" />
                            </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Schoolreg
//import { useEffect, useState } from "react";

//function MakeList() {
//    const [make, setMake] = useState([]);
//    function GetMakes() {
//        fetch("https://localhost:7038/api/Brand/GetAll").then((res) => res.json()).then((data) => {
//            setMake(data);
//        })
//    }

//    useEffect(() => {
//        GetMakes();
//    },[])
//    return (
//        <>
//            {make.map((data) => (
//                <h1>{data.name}</h1>
//            ))}
//        </>
//  );
//}

//export default MakeList;
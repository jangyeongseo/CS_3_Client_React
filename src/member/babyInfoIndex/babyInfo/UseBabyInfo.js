import { useEffect, useState } from "react";
import { caxios } from "../../../config/config";

function useBabyInfo(){
    const baby_seq = sessionStorage((state) => state.babySeq);
    const [data,setData] = useState({});
    
    useEffect(()=>{
        caxios.post("/baby/babyMypage", {baby_seq : baby_seq})
        .then(resp=>{
            setData(resp.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    
    return{
        data
    }
}
export default useBabyInfo();
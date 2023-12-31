// OrderSuccessMessage.js
import React from 'react';
import "../components/OrderSuccessMessage.css";
import { useNavigate } from 'react-router-dom';



const OrderSuccessMessage = () => {
  const navigate = useNavigate();
  return (

<div class="SuccessContainer ">
<div className="order-success-message">
<div>
<div className="animation-ctn">
  	<div className="icon icon--order-success svg">
          <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">  
            <g fill="none" stroke="#22AE73" strokeWidth="2"> 
              <circle cx="77" cy="77" r="72" style={{strokeDasharray: '480px, 480px', strokeDashoffset: '960px'}}></circle>
              <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style={{strokeDasharray: '480px, 480px', strokeDashoffset: '960px'}}></circle>
              <polyline className="st0" stroke="#fff" strokeWidth="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style={{strokeDasharray: '100px, 100px', strokeDashoffset: '200px'}}/>   
            </g> 
          </svg>
          <h3 className="animate-h3">Order successful</h3> {/* Add a class to apply animation */}
          <button onClick={()=>navigate("/Orders") } className="animate-h3 button-5" style={{marginTop:'10px'}}>My Orders</button>
        </div>
</div>


</div>
    </div>
    </div>
  );
};

export default OrderSuccessMessage;

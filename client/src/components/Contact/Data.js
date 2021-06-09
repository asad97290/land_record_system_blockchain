import React from 'react';

function Data(props) {
    return (
        <div>
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-4 offset-md-1">
                        <h5>Our Address</h5>
                        <address style={{fontSize: "100%",}}>
                       Rawalpindi, Pakistan<br />
                   
                            <i className="fa fa-phone fa-lg"></i>: +92 123456<br />
                            <i className="fa fa-fax fa-lg"></i>: +92 123 4567890<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a
                                href="mailto:talha_khan_87@hotmail.com">talha_khan_87@hotmail.com</a>
                        </address>
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default Data;

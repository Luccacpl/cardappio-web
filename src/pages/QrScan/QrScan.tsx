import React, { useState } from 'react';
import Qr from 'react-qr-scanner'




function QrScan() {



    const [data, setData] = useState('')


    const previewStyle = {
        height: 240,
        width: 320,
    }

    const handleScan = (data: any) => {
        if(data !== null){const {text} = data; console.log(text);setData(text)}
        
      };

    return (
        <div>
            <Qr
                delay={10000}
                style={previewStyle}
                onError={() => {
                    alert('deu ruim lek')
                }}
                onScan={handleScan}
            />
            <p>{data}</p>
        </div>
    )
}

export default QrScan;
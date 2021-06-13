import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Qr from 'react-qr-scanner'
import api from 'services/api';




function QrScan() {

  const history = useHistory()

  const [data, setData] = useState('')
  const [scanned, setScanned] = useState(false)


  const previewStyle = {
    height: 240,
    width: 320,
  }


  const handleScan = (data: any) => {

    if (scanned === false) {
      if (data !== null) {
        setScanned(true)
        const { text } = data
        console.log(text)
        setData(text)
        api.post(`/customercommand/${text}`)
          .then(response => {
            console.log(response)
            localStorage.setItem('TOKEN', response.data.authorization)
            history.push("/client")
          })
          .catch(error => {
            alert(text)
            alert(error.message)
            setScanned(false)
          })
      }

    }

    console.log(data)

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
        facingMode="rear"
      />
      <p>{data}</p>
    </div>
  )
}

export default QrScan;
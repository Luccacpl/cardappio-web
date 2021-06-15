import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Qr from 'react-qr-scanner'
import api from 'services/api';
import { Title, P } from '../../components/Text/text'
import Loader from "components/Loader";
import { useEffect } from 'react';



function QrScan() {

  const history = useHistory()

  // const [data, setData] = useState('')
  const [scanned, setScanned] = useState(false)
  const [showLoader, setShowLoader] = useState(false)


  function verifyToken() {
    if (localStorage.getItem('TOKEN'))
      history.push('/client')
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }

  useEffect(() => {
    verifyToken()
  }, [])


  const handleScan = (data: any) => {

    if (scanned === false) {
      if (data !== null) {
        setScanned(true)
        setShowLoader(true)
        const { text } = data
        console.log(text)
        // setData(text)
        api.post(`/customercommand/${text}`)
          .then(response => {
            console.log(response)
            localStorage.setItem('TOKEN', response.data.authorization)
            history.push("/client")
            setShowLoader(false)
          })
          .catch(error => {
            alert(text)
            alert(error.message)
            setScanned(false)
            setShowLoader(false)
          })
      }

    }

    console.log(data)

  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#202020"
      }}
    >
      <Title marginTop="64px" color="#FC8533">
        Cardappio
      </Title>
      <Qr
        delay={10000}
        style={previewStyle}
        onError={(error: any) => {
          alert(error.message)
        }}
        onScan={handleScan}
        facingMode="rear"
      />
      <P marginBottom="64px" color="#B2DA5A" fontWeight="bold" textAlign="center">
        Aponte a câmera para o QRCode na mesa <br /> para abrir uma comanda!
      </P>

      {showLoader && (<Loader />)}
    </div>
  )
}

export default QrScan;